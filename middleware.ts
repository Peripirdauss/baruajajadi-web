import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Analytics Tracking (exclude static assets and API routes)
  if (!pathname.startsWith('/api') && !pathname.startsWith('/_next') && !pathname.includes('.')) {
    // We fire and forget the analytics hit to keep it fast
    // Since we are in a middleware, we can't easily wait for DB
    // But we can trigger a tracking endpoint
    try {
      fetch(`${request.nextUrl.origin}/api/public/track`, { method: 'POST' });
    } catch (e) {
      // Ignore background fetch errors
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
