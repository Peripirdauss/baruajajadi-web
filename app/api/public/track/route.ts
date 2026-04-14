import { NextResponse } from 'next/server';
import { trackVisit } from '@/lib/analytics';

export async function POST() {
  await trackVisit();
  return NextResponse.json({ success: true });
}
