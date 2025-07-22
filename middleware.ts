import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'zh'];
const singleLanguageRoutes = ['writings', 'weeknotes'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  for (const locale of locales) {
    for (const route of singleLanguageRoutes) {
      if (pathname.startsWith(`/${locale}/${route}`)) {
        const newPath = pathname.replace(`/${locale}/`, '/');
        return NextResponse.redirect(new URL(newPath, request.url));
      }
    }
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/zh', request.url));
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (
    pathnameIsMissingLocale &&
    !singleLanguageRoutes.some((route) => pathname.startsWith(`/${route}`))
  ) {
    if (pathname.startsWith('/about') || pathname.startsWith('/projects')) {
      return NextResponse.redirect(new URL(`/zh${pathname}`, request.url));
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|file.svg|globe.svg|next.svg|vercel.svg|window.svg).*)',
  ],
};
