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

    // Sync users from JSON or Env to Database only if empty (Initial seed)
    try {
      const [{ value: userCount }] = await db.select({ value: count() }).from(users);
      if (userCount === 0) {
        console.log('Database empty, attempting to seed admin user...');
        
        // 1. Try Environment Variables (Most Secure)
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPass = process.env.ADMIN_PASSWORD;

        if (adminEmail && adminPass) {
          console.log(`Seeding admin from environment variables: ${adminEmail}`);
          const hashedPassword = await bcrypt.hash(adminPass, 10);
          await db.insert(users).values({
            firstName: 'Admin',
            lastName: 'User',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
          });
        } 
        // 2. Fallback to users.json (Local dev)
        else {
          try {
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
            console.log('Seeded users from data/users.json');
          } catch (fileErr) {
            console.warn('Neither env vars nor users.json found for seeding.');
          }
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
