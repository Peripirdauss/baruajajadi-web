import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, siteConfig, analytics } from '@/lib/db/schema';
import { sql, count, eq } from 'drizzle-orm';
import { getGlobalContent } from '@/lib/content';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Get User Count
    const [{ count: userCount }] = await db.select({ count: count() }).from(users);

    // 2. Get Traffic Stats
    const [{ totalVisits }] = await db.select({ totalVisits: sql<number>`SUM(total_visits)` }).from(analytics);

    // 3. Get Site Content Counts (Using JSON functions for accuracy if possible, otherwise fallback)
    let toolsCount = 0;
    let blogCount = 0;
    let assetsCount = 0;

    try {
      const counts = await db.select({
        tools: sql<number>`JSON_LENGTH(JSON_EXTRACT(data, '$.tools'))`,
        blog: sql<number>`JSON_LENGTH(JSON_EXTRACT(data, '$.blog'))`,
        assets: sql<number>`JSON_LENGTH(JSON_EXTRACT(data, '$.assets'))`
      }).from(siteConfig).where(eq(siteConfig.id, 'global'));

      if (counts.length > 0) {
        toolsCount = counts[0].tools || 0;
        blogCount = counts[0].blog || 0;
        assetsCount = counts[0].assets || 0;
      }
    } catch (e) {
      console.warn("SQL JSON count failed, using JS fallback:", e);
      const content = await getGlobalContent();
      toolsCount = content?.tools?.length || 0;
      blogCount = content?.blog?.length || 0;
      assetsCount = content?.assets?.length || 0;
    }

    // 4. Return combined metrics
    return NextResponse.json({
      stats: [
        { title: 'Total Users', value: userCount.toString(), description: 'Active community members', trend: { percentage: '+5%', color: 'text-green-500' } },
        { title: 'Total Tools', value: toolsCount.toString(), description: 'Active and featured tools', trend: { percentage: '+12%', color: 'text-green-500' } },
        { title: 'Blog Posts', value: blogCount.toString(), description: 'Published articles', trend: { percentage: '+12%', color: 'text-green-500' } },
        { title: 'Total Traffic', value: (totalVisits || 0).toString(), description: 'Images and resources', trend: { percentage: '+24%', color: 'text-accent' } },
      ],
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
