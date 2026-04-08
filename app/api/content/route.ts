import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { siteConfig } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { getGlobalContent } from '@/lib/content'
import { getSession } from '@/lib/auth'

const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json')

export async function GET() {
  try {
    const data = await getGlobalContent()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading data:', error)
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 })
  }
}


export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    // Ensure table exists
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS site_config (
        id VARCHAR(255) PRIMARY KEY,
        data LONGTEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Upsert the data
    const existing = await db.select().from(siteConfig).where(eq(siteConfig.id, 'global'));
    
    if (existing.length === 0) {
      await db.insert(siteConfig).values({
        id: 'global',
        data: JSON.stringify(data)
      });
    } else {
      await db.update(siteConfig)
        .set({ data: JSON.stringify(data) })
        .where(eq(siteConfig.id, 'global'));
    }
    
    // Also save to file as backup if possible
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
    } catch(e) {
      console.warn("Could not backup to JSON file, running solely on DB.")
    }
    
    // Purge the cache for the home page and other relevant routes
    revalidatePath('/')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
