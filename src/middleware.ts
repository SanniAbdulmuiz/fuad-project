import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('ker_active_auth_token');
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard'];
  const authRoutes = ['/signin', '/reset', '/reset-password'];

  if (!token && protectedRoutes.some(path => pathname.startsWith(path))) {
    const url = request.nextUrl.clone();
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  if (token && authRoutes.some(path => pathname.startsWith(path))) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/signin',
    '/reset',
    '/reset-password',
  ],
}
