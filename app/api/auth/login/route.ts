import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Sync users from JSON to Database only if empty (Initial seed)
    try {
      const [{ value: userCount }] = await db.select({ value: count() }).from(users);
      if (userCount === 0) {
        console.log('Database empty, seeding default users from data/users.json...');
        const usersFile = path.join(process.cwd(), 'data', 'users.json');
        const fileData = await fs.readFile(usersFile, 'utf8');
        const defaultUsers = JSON.parse(fileData);

        for (const u of defaultUsers) {
          const hashedPassword = await bcrypt.hash(u.password, 10);
          await db.insert(users).values({
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            password: hashedPassword,
            role: u.role,
          });
        }
      }
    } catch (dbErr: any) {
      console.error('Critical: Database sync/connection error:', dbErr.message);
    }

    // Find user in MySQL
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      return NextResponse.json({ error: 'invalid credentials' }, { status: 401 });
    }

    // Compare Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'invalid credentials' }, { status: 401 });
    }

    // Login successful
    console.log(`[Login Success] User: ${email} (${user.role})`);

    // Create JWT Session and set Cookie via lib/auth
    await setSessionCookie({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      role: user.role,
    });

  } catch (error: any) {
    console.error('[Login Internal Error]', error);
    return NextResponse.json({
      error: 'Internal Server Error',
      details: error.message || String(error),
    }, { status: 500 });
  }
}
