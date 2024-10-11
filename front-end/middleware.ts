import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isCompany = request.cookies.get('companyName')?.value;
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  // console.log(`Requesting: ${pathname}, Token: ${token}`);

  if (token) {
    if (pathname === '/signin' || pathname === '/signup') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (!isCompany && pathname === '/company-profile') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (pathname === '/dashboard') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/signin', '/signup', '/company-profile', '/'],
};
