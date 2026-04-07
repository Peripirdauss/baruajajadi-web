import { db } from '@/lib/db'
import { siteConfig } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import path from 'path'
import fs from 'fs/promises'

const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json')

export async function getGlobalContent() {
  try {
    // Ensure table exists on cPanel
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS site_config (
        id VARCHAR(255) PRIMARY KEY,
        data LONGTEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Check if we have data
    const existing = await db.select().from(siteConfig).where(eq(siteConfig.id, 'global'));
    if (existing.length === 0) {
      // If table is empty, seed from JSON file
      console.log('Seeding site_config from file...');
      const fileContents = await fs.readFile(DATA_FILE, 'utf8')
      const data = JSON.parse(fileContents)
      await db.insert(siteConfig).values({
        id: 'global',
        data: JSON.stringify(data)
      })
      return data;
    }
    const resultData = existing[0].data;
    return typeof resultData === 'string' ? JSON.parse(resultData) : resultData;
  } catch (error) {
    console.error('Migration error:', error)
    // Fallback to file if DB fails
    try {
      const fileContents = await fs.readFile(DATA_FILE, 'utf8')
      return JSON.parse(fileContents);
    } catch(e) {
      return null;
    }
  }
}
