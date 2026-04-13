import { NextRequest, NextResponse } from 'next/server';
import { handleOptions, validateApiKey, withCors } from '../_cors';
import { db } from '@/lib/db';
import { purchases } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

/**
 * GET /api/public/verify?userId=...&toolSlug=...
 * Called by buy.baruajajadi.com to check if a user has paid for a tool.
 *
 * Query Parameters:
 *   userId   — the buyer's email or ID
 *   toolSlug — the tool slug to check
 *
 * Response:
 * {
 *   hasPurchased: boolean,
 *   purchase?: { orderId, amount, status, createdAt }
 * }
 */
export async function GET(req: NextRequest) {
  const { valid, origin, response } = validateApiKey(req);
  if (!valid) return response;

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const toolSlug = searchParams.get('toolSlug');

  if (!userId || !toolSlug) {
    return withCors(
      NextResponse.json(
        { error: 'Missing query parameters: userId and toolSlug are required' },
        { status: 400 }
      ),
      origin
    );
  }

  try {
    const records = await db
      .select()
      .from(purchases)
      .where(
        and(
          eq(purchases.userId, userId),
          eq(purchases.toolSlug, toolSlug),
          eq(purchases.status, 'paid')
        )
      )
      .limit(1);

    const hasPurchased = records.length > 0;
    const purchase = hasPurchased
      ? {
          orderId: records[0].midtransOrderId,
          amount: records[0].amount,
          currency: records[0].currency,
          status: records[0].status,
          paymentType: records[0].midtransPaymentType,
          createdAt: records[0].createdAt,
        }
      : undefined;

    return withCors(
      NextResponse.json({ success: true, hasPurchased, purchase }),
      origin
    );
  } catch (error: any) {
    console.error('[Public API /verify] Error:', error);
    return withCors(
      NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 }),
      origin
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}
