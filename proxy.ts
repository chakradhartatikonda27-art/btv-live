import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Skip auth check for login page and API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  if (pathname.startsWith('/admin')) {
    const adminAuth = req.cookies.get('admin_auth');
    if (!adminAuth || adminAuth.value !== 'btv_admin_2026') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
