import { NextRequest, NextResponse } from 'next/server';
import { handleOptions, validateApiKey, withCors } from '../../_cors';
import { db } from '@/lib/db';
import { users, purchases } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

/**
 * POST /api/public/community/user
 * Called by baruajajadi.space for federated user identity.
 * Allows the community site to verify a BaruAjaJadi account
 * and retrieve the user's public profile data.
 *
 * Request body:
 * {
 *   email: string   — the user's email to look up
 * }
 *
 * Response:
 * {
 *   success: true,
 *   user: {
 *     id, firstName, lastName, role, createdAt,
 *     purchasedTools: string[]  — slugs of tools they own
 *   }
 * }
 *
 * NEVER returns passwords or sensitive session data.
 */
export async function POST(req: NextRequest) {
  const { valid, origin, response } = validateApiKey(req);
  if (!valid) return response;

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return withCors(
        NextResponse.json({ error: 'Missing required field: email' }, { status: 400 }),
        origin
      );
    }

    // Look up user (never return password)
    const [user] = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return withCors(
        NextResponse.json({ success: false, error: 'User not found' }, { status: 404 }),
        origin
      );
    }

    // Fetch their paid tool slugs
    const paidPurchases = await db
      .select({ toolSlug: purchases.toolSlug })
      .from(purchases)
      .where(
        eq(purchases.buyerEmail, email)
      );

    const purchasedTools = paidPurchases
      .filter((p) => p.toolSlug)
      .map((p) => p.toolSlug);

    return withCors(
      NextResponse.json({
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          createdAt: user.createdAt,
          purchasedTools,
        },
      }),
      origin
    );
  } catch (error: any) {
    console.error('[Public API /community/user] Error:', error);
    return withCors(
      NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }),
      origin
    );
  }
}

export async function OPTIONS(req: NextRequest) {
  return handleOptions(req);
}
