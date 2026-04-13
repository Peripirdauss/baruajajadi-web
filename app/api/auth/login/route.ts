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
      await db.execute(sql`SELECT 1`); // Simple ping to test connection
      console.log('Database connection verified.');

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
    } catch(dbErr: any) {
      console.error("DB setup for users failed:", dbErr);
      // Don't return yet, try to proceed with fallback if possible
      // but log the actual error message
    }

    // Find user in MySQL
    let user: any = null;
    try {
      const dbUsers = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (dbUsers.length > 0) user = dbUsers[0];
    } catch (dbError) {
      console.warn("DB lookup failed, checking users.json fallback...");
    }

    if (!user) {
      // Fallback to JSON file if not found in DB or DB is down
      const usersFile = path.join(process.cwd(), 'data', 'users.json');
      const fileData = await fs.readFile(usersFile, 'utf8');
      const defaultUsers = JSON.parse(fileData);
      user = defaultUsers.find((u: any) => u.email === email);
      
      if (user && user.password !== password) {
         // In JSON, password might be plaintext for local dev/seeding
         // If it's not bcrypted, compare directly
         user = null; // Reset if we can't verify
      }
      
      // Special case for local admin preview: allow plaintext adminpass from JSON
      const adminCandidate = defaultUsers.find((u: any) => u.email === email && u.password === password);
      if (adminCandidate) user = adminCandidate;
    }

    if (!user) {
      console.warn(`[Login Failed] User not found or invalid: ${email}`);
      return NextResponse.json({ 
        error: 'Account not found',
        reason: 'USER_NOT_FOUND',
        debug_email: email 
      }, { status: 401 });
    }

    // Compare Password (skipped for plaintext fallback above)
    if (user.password && user.password !== password && user.password.startsWith('$2')) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ 
          error: 'Incorrect security key',
          reason: 'PASSWORD_MISMATCH'
        }, { status: 401 });
      }
    } else if (user.password !== password) {
      // Direct comparison for non-bcrypt fallback
      return NextResponse.json({ 
        error: 'Incorrect security key (Plain)',
        reason: 'PASSWORD_MISMATCH_PLAIN'
      }, { status: 401 });
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
