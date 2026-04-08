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
    console.log('Attempting DB connection with:', { ...config, password: '***' })
    const connection = await mysql.createConnection(config)
    const [rows] = await connection.execute('SELECT VERSION() as version')
    const [tables] = await connection.execute('SHOW TABLES')
    await connection.end()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful!',
      version: (rows as any)[0].version,
      tables: tables,
      env_check: {
        host: !!process.env.DB_HOST,
        user: !!process.env.DB_USER,
        pass: !!process.env.DB_PASSWORD,
        name: !!process.env.DB_NAME
      }
    })
  } catch (error: any) {
    console.error('DB Connection Debug Error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      code: error.code,
      errno: error.errno,
      syscall: error.syscall,
      hostname: error.hostname,
      env_check: {
        host: !!process.env.DB_HOST,
        user: !!process.env.DB_USER,
        pass: !!process.env.DB_PASSWORD,
        name: !!process.env.DB_NAME
      }
    }, { status: 500 })
  }
}
