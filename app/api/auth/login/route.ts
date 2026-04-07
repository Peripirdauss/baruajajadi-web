import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

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

      // Seed if empty
      const existingUsers = await db.select().from(users).limit(1);
      if (existingUsers.length === 0) {
        console.log('Seeding users table from users.json...');
        const usersFile = path.join(process.cwd(), 'data', 'users.json');
        const fileData = await fs.readFile(usersFile, 'utf8');
        const defaultUsers = JSON.parse(fileData);
        
        for (const u of defaultUsers) {
          // ensure passwords are bcrypt hashed. In users.json 'adminpass' is plain.
          // Wait, if it's plainly 'adminpass', we must hash it. 
          // If it looks like 'gravity123...' we'll hash it.
          const hashed = await bcrypt.hash(u.password, 10);
          await db.insert(users).values({
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            password: hashed,
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
    
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id, 
        email: user.email, 
        firstName: user.firstName, 
        role: user.role 
      } 
    });

  } catch (error: any) {
    console.error('[Login Internal Error]', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message || String(error) 
    }, { status: 500 });
  }
}
