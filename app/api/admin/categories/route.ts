import { NextResponse } from 'next/server';
import { getGlobalContent } from '@/lib/content';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { siteConfig } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json');

export async function GET() {
  try {
    const data = await getGlobalContent();
    return NextResponse.json({ categories: data.assetCategories || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { categories } = await request.json();
    const data = await getGlobalContent();
    
    const updatedData = { ...data, assetCategories: categories };

    // Update DB
    try {
      await db.update(siteConfig)
        .set({ data: JSON.stringify(updatedData) })
        .where(eq(siteConfig.id, 'global'));
    } catch (e) {
      console.warn('DB update failed, using file fallback');
    }

    // Update File
    await fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf8');

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Error saving categories:', error);
    return NextResponse.json({ error: 'Failed to save categories' }, { status: 500 });
  }
}
