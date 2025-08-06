import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Define valid routes
  const validRoutes = new Set([
    '/',
    '/about',
    '/projects',
    '/writings',
    '/weeknotes',
    '/resume',
  ]);

  // Check if it's a dynamic route pattern
  const isDynamicRoute = (path: string) => {
    return path.startsWith('/writings/') || path.startsWith('/weeknotes/');
  };

  // Check if the current path is valid
  const isValidPath = validRoutes.has(pathname) || isDynamicRoute(pathname);

  // If path is not valid, redirect to home
  if (!isValidPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|file.svg|globe.svg|next.svg|vercel.svg|window.svg|images).*)',
  ],
};
