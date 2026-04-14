import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, desc, not } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

/**
 * GET: List all users
 */
export async function GET() {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const allUsers = await db.select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      role: users.role,
      status: users.status,
      createdAt: users.createdAt
    })
    .from(users)
    .where(not(eq(users.email, session.user.email))) // Don't list self
    .orderBy(desc(users.createdAt));

    return NextResponse.json({ users: allUsers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

/**
 * PATCH: Update user status (suspend/approve)
 */
export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) return NextResponse.json({ error: 'Missing data' }, { status: 400 });

    await db.update(users)
      .set({ status })
      .where(eq(users.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

/**
 * DELETE: Remove user
 */
export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await db.delete(users).where(eq(users.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Deletion failed' }, { status: 500 });
  }
}
