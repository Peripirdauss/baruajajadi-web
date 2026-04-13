import { NextRequest, NextResponse } from 'next/server';
import { handleOptions, validateApiKey, withCors } from '../_cors';
import { db } from '@/lib/db';
import { purchases } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';
const MIDTRANS_BASE_URL = MIDTRANS_IS_PRODUCTION
  ? 'https://app.midtrans.com/snap/v1/transactions'
  : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

/**
 * POST /api/public/purchase
 * Called by buy.baruajajadi.com to create a Midtrans Snap payment token.
 *
 * Request body:
 * {
 *   toolSlug: string,
 *   priceIDR: number,
 *   buyerName: string,
 *   buyerEmail: string,
 *   buyerPhone?: string,
 *   userId: string  // Could be email or an ID from the buyer's auth system
 * }
 *
 * Response:
 * {
 *   success: true,
 *   snapToken: string,   // Use this with Midtrans Snap.js on the buy site
 *   orderId: string,
 *   redirectUrl: string  // Fallback redirect URL
 * }
 */
export async function POST(req: NextRequest) {
  const { valid, origin, response } = validateApiKey(req);
  if (!valid) return response;

  try {
    const body = await req.json();
    const { toolSlug, priceIDR, buyerName, buyerEmail, buyerPhone, userId } = body;

    // Validate required fields
    if (!toolSlug || !priceIDR || !buyerName || !buyerEmail || !userId) {
      return withCors(
        NextResponse.json(
          { error: 'Missing required fields: toolSlug, priceIDR, buyerName, buyerEmail, userId' },
          { status: 400 }
        ),
        origin
      );
    }

    // Ensure purchases table exists
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS purchases (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        tool_slug VARCHAR(255) NOT NULL,
        amount INT NOT NULL,
        currency VARCHAR(10) DEFAULT 'IDR',
        status VARCHAR(50) DEFAULT 'pending',
        midtrans_order_id VARCHAR(255),
        midtrans_token LONGTEXT,
        midtrans_payment_type VARCHAR(100),
        buyer_name VARCHAR(255),
        buyer_email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Generate a unique order ID
    const orderId = `BJJ-${toolSlug.toUpperCase().slice(0, 6)}-${Date.now()}`;

    // Create Midtrans Snap token
    const midtransPayload = {
      transaction_details: {
        order_id: orderId,
        gross_amount: Math.round(priceIDR),
      },
      customer_details: {
        first_name: buyerName,
        email: buyerEmail,
        phone: buyerPhone || '',
      },
      item_details: [
        {
          id: toolSlug,
          price: Math.round(priceIDR),
          quantity: 1,
          name: `BaruAjaJadi Tool: ${toolSlug}`,
        },
      ],
      callbacks: {
        finish: `https://buy.baruajajadi.com/success?order_id=${orderId}`,
        error: `https://buy.baruajajadi.com/failed?order_id=${orderId}`,
        pending: `https://buy.baruajajadi.com/pending?order_id=${orderId}`,
      },
    };

    const midtransAuth = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString('base64');
    const midtransRes = await fetch(MIDTRANS_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${midtransAuth}`,
      },
      body: JSON.stringify(midtransPayload),
    });

    if (!midtransRes.ok) {
      const errText = await midtransRes.text();
      console.error('[Public API /purchase] Midtrans error:', errText);
      return withCors(
        NextResponse.json({ error: 'Payment gateway error', details: errText }, { status: 502 }),
        origin
      );
    }

    const midtransData = await midtransRes.json();
    const snapToken = midtransData.token;
    const redirectUrl = midtransData.redirect_url;

    // Save pending purchase to DB
    await db.insert(purchases).values({
      userId,
      toolSlug,
      amount: Math.round(priceIDR),
      status: 'pending',
      midtransOrderId: orderId,
      midtransToken: snapToken,
      buyerName,
      buyerEmail,
    });

    return withCors(
      NextResponse.json({
        success: true,
        snapToken,
        orderId,
        redirectUrl,
        clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
        isSandbox: !MIDTRANS_IS_PRODUCTION,
      }),
      origin
    );
  } catch (error: any) {
    console.error('[Public API /purchase] Error:', error);
    return withCors(
      NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 }),
      origin
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}
