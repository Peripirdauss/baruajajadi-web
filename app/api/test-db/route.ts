import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'baruajajadi',
  }

  try {
    const connection = await mysql.createConnection(config)
    const [rows]: any = await connection.execute('SELECT VERSION() as version')
    const [tables]: any = await connection.execute('SHOW TABLES')
    const [dbUsers]: any = await connection.execute('SELECT email, role FROM users LIMIT 10')
    await connection.end()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database check successful!',
      version: rows[0].version,
      tables: tables,
      users: dbUsers,
      env_check: {
        host: !!process.env.DB_HOST,
        user: !!process.env.DB_USER,
        pass: !!process.env.DB_PASSWORD,
        name: !!process.env.DB_NAME
      }
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      code: error.code
    }, { status: 500 })
  }
}
