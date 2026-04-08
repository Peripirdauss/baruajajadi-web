import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/auth'

// 1. Specify protected and public routes
const protectedRoutes = ['/admin', '/api/admin']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const cookie = req.cookies.get('session')?.value
  let session = null
  
  if (cookie) {
    try {
      session = await decrypt(cookie)
    } catch (e) {
      console.error('Session decryption failed', e)
    }
  }

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  // 5. Check role for admin routes
  if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
    if (session?.user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }
  }

  // 6. Redirect to /admin if the user is authenticated and trying to access login
  if (
    isPublicRoute &&
    session?.user?.role === 'admin' &&
    !path.startsWith('/admin') &&
    path !== '/'
  ) {
    return NextResponse.redirect(new URL('/admin', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|.*\\.png$).*)'],
}
