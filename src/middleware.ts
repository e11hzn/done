import { NextResponse, NextRequest } from 'next/server';
import { COOKIE_KEY } from './utils/cookieClient';

export function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  if (cookieStore.has(COOKIE_KEY)) {
    return NextResponse.next();
  }

  const cookieValue = JSON.stringify({
    list: [],
    locale: request.headers.get('Accept-Language')?.split(',')[0] ?? 'en-US',
  });

  return NextResponse.redirect(request.nextUrl, {
    headers: {
      'Set-Cookie': `${COOKIE_KEY}=${cookieValue}`,
    },
  });
}
