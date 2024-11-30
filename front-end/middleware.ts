import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isCompany = request.cookies.get('companyName')?.value;
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  if (token) {
    if (pathname === '/signin' || pathname === '/signup') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (!isCompany) {
      // protected dashboard paths
      if (pathname.replace('/dashboard', '').startsWith('/company')) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      // protected wizards paths
      if (pathname === '/company-profile') {
        return NextResponse.redirect(new URL('/', request.url));
      }

      if (pathname === '/dashboard') {
        return NextResponse.redirect(new URL('/dashboard/client', request.url));
      }
    }
    if (isCompany) {
      if (pathname === '/dashboard') {
        return NextResponse.redirect(
          new URL('/dashboard/company', request.url)
        );
      }
    }
  } else {
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname.startsWith('/company')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/signin',
    '/signup',
    '/company-profile',
    '/dashboard/company/products',
    '/dashboard/company',
    '/dashboard/client',
    '/company-add-product',
  ],
};
