// This file uses the routing config to handle i18n routing.
import { routing } from '@/i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
  // Skips i18n for files in /api, /_next, etc.
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
