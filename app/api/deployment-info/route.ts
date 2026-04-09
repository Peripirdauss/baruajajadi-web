import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'deployed',
    timestamp: '2026-04-09T14:30:00Z',
    theme: 'Starlight Quantum',
    build: 'Mission Control Alpha'
  });
}
