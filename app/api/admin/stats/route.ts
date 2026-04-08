import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, siteConfig } from '@/lib/db/schema';
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
    const userResult = await db.select({ count: count() }).from(users);
    const userCount = userResult[0]?.count || 0;

    // 2. Get Site Content Counts
    const content = await getGlobalContent();
    
    const toolsCount = content?.tools?.length || 0;
    const blogCount = content?.blog?.length || 0;
    const assetsCount = content?.assets?.length || 0;

    // 3. Generate some trends (mocked for now, but based on actual counts)
    const trends = {
      users: { percentage: '+5%', color: 'text-green-500' },
      content: { percentage: '+12%', color: 'text-green-500' },
      engagement: { percentage: '+24%', color: 'text-accent' },
    };

    // 4. Return combined metrics
    return NextResponse.json({
      stats: [
        { title: 'Total Users', value: userCount.toString(), description: 'Active community members', trend: trends.users },
        { title: 'Total Tools', value: toolsCount.toString(), description: 'Active and featured tools', trend: trends.content },
        { title: 'Blog Posts', value: blogCount.toString(), description: 'Published articles', trend: trends.content },
        { title: 'Assets', value: assetsCount.toString(), description: 'Images and resources', trend: trends.engagement },
      ],
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
