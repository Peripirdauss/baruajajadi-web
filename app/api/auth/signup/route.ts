import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;

    console.log(`[Signup Attempt] Email: ${email}`);

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      console.warn('[Signup Failed] Missing fields');
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user already exists
    const existingUsers = await db.select().from(users).where(eq(users.email, email));
    
    if (existingUsers.length > 0) {
      console.warn(`[Signup Failed] User already exists: ${email}`);
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in MySQL
    const [result] = await db.insert(users).values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: email === 'admin@baruajajadi.com' ? 'admin' : 'user',
    });

    console.log(`[Signup Success] Created user: ${email} (Insert ID: ${result.insertId})`);

    return NextResponse.json({ 
      success: true, 
      user: { 
        email, 
        firstName, 
        role: email === 'admin@baruajajadi.com' ? 'admin' : 'user' 
      } 
    });

  } catch (error) {
    console.error('[Signup Internal Error]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
