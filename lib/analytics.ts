import { db } from './db';
import { analytics } from './db/schema';
import { sql, eq } from 'drizzle-orm';

/**
 * Tracks a visit for the current day.
 * If the day entry doesn't exist, it creates one.
 * If it exists, it increments the total_visits counter.
 */
export async function trackVisit() {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // Upsert logic for MySQL
    await db.execute(sql`
      INSERT INTO analytics (date, total_visits, active_users)
      VALUES (${today}, 1, 1)
      ON DUPLICATE KEY UPDATE 
        total_visits = total_visits + 1,
        active_users = GREATEST(active_users, 1)
    `);
  } catch (error) {
    console.error('[Analytics Error] Failed to track visit:', error);
  }
}

/**
 * Fetches analytics for the last X days.
 */
export async function getTrafficStats(days = 7) {
  try {
    const stats = await db.select()
      .from(analytics)
      .orderBy(sql`date DESC`)
      .limit(days);
    
    // Return in chronological order for the chart
    return stats.reverse().map(s => ({
      name: formatDay(s.date),
      total: s.totalVisits,
      active: s.activeUsers || Math.floor((s.totalVisits || 0) * 0.6) // active is rough estimate if not tracked precisely
    }));
  } catch (error) {
    console.error('[Analytics Error] Failed to fetch stats:', error);
    return [];
  }
}

function formatDay(dateStr: string) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(dateStr);
  return days[date.getDay()];
}
