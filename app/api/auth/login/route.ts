import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, count, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Admin Bootstrapping from Environment Variables
    try {
      // 1. Database Schema Sync (Auto-migration)
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password TEXT NOT NULL,
          role VARCHAR(50) NOT NULL DEFAULT 'user',
          status VARCHAR(50) NOT NULL DEFAULT 'active',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Ensure status column exists if table was created earlier
      try {
        await db.execute(sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'active' AFTER role`);
      } catch (e) {
        // Silently skip if column already exists
      }

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS analytics (
          id INT AUTO_INCREMENT PRIMARY KEY,
          date VARCHAR(20) NOT NULL UNIQUE,
          total_visits INT DEFAULT 0,
          active_users INT DEFAULT 0,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // 2. Admin Bootstrapping from Environment Variables
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPass = process.env.ADMIN_PASSWORD;

      if (adminEmail && adminPass) {
        const [existingAdmin] = await db.select().from(users).where(eq(users.email, adminEmail)).limit(1);
        if (!existingAdmin) {
          console.log(`Initial boot: Admin ${adminEmail} not found. Creating...`);
          const hashedPassword = await bcrypt.hash(adminPass, 10);
          await db.insert(users).values({
            firstName: 'Admin',
            lastName: 'User',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
          });
          console.log('Admin account bootstrapped successfully.');
        }
      }
      
      // Legacy seeding (only if table completely empty and no env vars)
      const [{ value: userCount }] = await db.select({ value: count() }).from(users);
      if (userCount === 0 && !adminEmail) {
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
          // users.json missing is expected in production
        }
      }
    } catch (dbErr: any) {
      console.error('Critical: Admin bootstrapping/seeding error:', dbErr.message);
    }

    // Find user in MySQL
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      return NextResponse.json({ error: 'invalid credentials' }, { status: 401 });
    }

    if (user.status === 'suspended') {
      return NextResponse.json({ error: 'Your account has been suspended. Please contact support.' }, { status: 403 });
    }

    if (user.status === 'pending') {
      return NextResponse.json({ error: 'Your account is awaiting approval from an admin.' }, { status: 403 });
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
