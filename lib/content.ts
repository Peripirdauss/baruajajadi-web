import { db } from '@/lib/db'
import { siteConfig } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import path from 'path'
import fs from 'fs/promises'

const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json')

export async function getGlobalContent() {
  try {
    // 1. Try DB first
    try {
      // Ensure table exists on cPanel
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS site_config (
          id VARCHAR(255) PRIMARY KEY,
          data LONGTEXT,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Check if we have data in DB
      const existing = await db.select().from(siteConfig).where(eq(siteConfig.id, 'global'));
      
      if (existing.length > 0) {
        const resultData = existing[0].data;
        return typeof resultData === 'string' ? JSON.parse(resultData) : resultData;
      }
      
      // If DB is empty, try seeding it from file (but this might fail if DB is RO)
      console.log('DB empty, seeding from file logic...');
    } catch (dbError) {
      console.warn('Database unavailable in getGlobalContent, falling back to JSON:', dbError);
    }

    // 2. Fallback to Local JSON file
    const fileContents = await fs.readFile(DATA_FILE, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Potentially try to seed the DB in background if it's just missing data
    return data;
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
