import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle authentication and route protection
 * @param {NextRequest} request - The incoming request
 * @returns {NextResponse} The response
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register');
  const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard') || 
                         request.nextUrl.pathname.startsWith('/admin') ||
                         request.nextUrl.pathname.startsWith('/finance');

  // Redirect to login if accessing protected pages without token
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if accessing auth pages with token
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/finance', request.url));
  }

  return NextResponse.next();
}

/**
 * Configure which routes the middleware should run on
 */
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/finance/:path*', '/login', '/register'],
}; 