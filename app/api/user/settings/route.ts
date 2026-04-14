import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getSession, setSessionCookie } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { firstName, lastName, email, password, currentPassword } = await request.json();
    const userId = session.user.id;

    // Fetch current user from DB
    const currentUser = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!currentUser.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updates: any = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) updates.email = email;

    // If password change is requested
    if (password) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Current password is required to change password' }, { status: 400 });
      }

      const isMatch = await bcrypt.compare(currentPassword, currentUser[0].password);
      if (!isMatch) {
        return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
      }

      updates.password = await bcrypt.hash(password, 10);
    }

    // Update DB
    await db.update(users)
      .set(updates)
      .where(eq(users.id, userId));

    // Get updated user data
    const updatedUser = {
      ...session.user,
      firstName: firstName || session.user.firstName,
      lastName: lastName || session.user.lastName,
      email: email || session.user.email,
    };

    // Refresh session cookie
    await setSessionCookie(updatedUser);

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
