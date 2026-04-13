import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { purchases } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { createHash } from 'crypto';

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';
const MIDTRANS_STATUS_URL = MIDTRANS_IS_PRODUCTION
  ? 'https://api.midtrans.com/v2'
  : 'https://api.sandbox.midtrans.com/v2';

/**
 * POST /api/public/purchase/notify
 * Midtrans Payment Notification Webhook.
 *
 * Midtrans will POST to this URL when a payment status changes.
 * You must register this URL in your Midtrans Dashboard:
 *   https://dashboard.midtrans.com (or sandbox equivalent)
 *   → Settings → Configuration → Payment Notification URL:
 *   https://baruajajadi.com/api/public/purchase/notify
 *
 * This endpoint does NOT require the X-API-Key header — Midtrans
 * sends its own signature_key that we verify instead.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
      payment_type,
    } = body;

    // Verify Midtrans signature
    // signature = SHA512(order_id + status_code + gross_amount + server_key)
    const expectedSignature = createHash('sha512')
      .update(`${order_id}${status_code}${gross_amount}${MIDTRANS_SERVER_KEY}`)
      .digest('hex');

    if (signature_key !== expectedSignature) {
      console.warn('[Midtrans Notify] Invalid signature for order:', order_id);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    // Determine payment status
    let newStatus = 'pending';
    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      if (fraud_status === 'accept' || !fraud_status) {
        newStatus = 'paid';
      } else if (fraud_status === 'challenge') {
        newStatus = 'challenged';
      }
    } else if (['cancel', 'deny', 'expire'].includes(transaction_status)) {
      newStatus = 'failed';
    } else if (transaction_status === 'refund') {
      newStatus = 'refunded';
    }

    // Update purchase record in DB
    await db
      .update(purchases)
      .set({
        status: newStatus,
        midtransPaymentType: payment_type,
        updatedAt: new Date(),
      })
      .where(eq(purchases.midtransOrderId, order_id));

    console.log(`[Midtrans Notify] Order ${order_id} → ${newStatus}`);

    return NextResponse.json({ success: true, status: newStatus });
  } catch (error: any) {
    console.error('[Midtrans Notify] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET method: allow Midtrans to verify the endpoint is alive
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Midtrans notification endpoint is active.',
  });
}
