import { NextResponse } from 'next/server';
import { getGlobalContent } from '@/lib/content';
import { db } from '@/lib/db';
import { site_config } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json');

export async function GET() {
  try {
    const data = await getGlobalContent();
    return NextResponse.json({ categories: data.toolCategories || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { categories } = await request.json();
    const data = await getGlobalContent();
    const updatedData = { ...data, toolCategories: categories };

    // 1. Update Database
    await db.update(site_config)
      .set({ 
        content: JSON.stringify(updatedData),
        updated_at: new Date()
      })
      .execute();

    // 2. Fallback: Update JSON file
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf8');
    } catch (e) {
      console.error('File sync failed:', e);
    }

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update categories' }, { status: 500 });
  }
}
