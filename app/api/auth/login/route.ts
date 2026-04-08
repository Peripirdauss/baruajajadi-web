import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { setSessionCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Auto-migrate users table if it doesn't exist on cPanel
    try {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password TEXT NOT NULL,
          role VARCHAR(50) NOT NULL DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Sync users from JSON to Database (Upsert logic)
      console.log('Syncing users from users.json...');
      const usersFile = path.join(process.cwd(), 'data', 'users.json');
      const fileData = await fs.readFile(usersFile, 'utf8');
      const defaultUsers = JSON.parse(fileData);
      
      for (const u of defaultUsers) {
        const [existing] = await db.select().from(users).where(eq(users.email, u.email)).limit(1);
        const hashedPassword = await bcrypt.hash(u.password, 10);
        
        if (existing) {
          // Update existing user to match JSON (in case password/role changed)
          await db.update(users)
            .set({ 
              firstName: u.firstName, 
              lastName: u.lastName, 
              password: hashedPassword, 
              role: u.role 
            })
            .where(eq(users.email, u.email));
        } else {
          // Insert new user
          await db.insert(users).values({
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            password: hashedPassword,
            role: u.role
          });
        }
      }
    } catch(dbErr) {
      console.warn("DB setup for users failed:", dbErr);
    }

    // Find user in MySQL
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      console.warn(`[Login Failed] User not found: ${email}`);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Compare Password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.warn(`[Login Failed] Invalid password: ${email}`);
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Login successful
    console.log(`[Login Success] User: ${email} (${user.role})`);
    
    // Create JWT Session and set Cookie via lib/auth
    await setSessionCookie({ 
      id: user.id, 
      email: user.email, 
      firstName: user.firstName, 
      role: user.role 
    });
    
    return NextResponse.json({ 
      success: true,
      role: user.role
    });

  } catch (error: any) {
    console.error('[Login Internal Error]', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message || String(error) 
    }, { status: 500 });
  }
}
