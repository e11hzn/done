import { NextResponse, NextRequest } from 'next/server';

export const COOKIE_KEY = 'done-todos-config';

export function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  if (cookieStore.has(COOKIE_KEY)) {
    return NextResponse.next();
  }

  const cookieValue = JSON.stringify({
    lists: [{ '1': [] }],
    locale: request.headers.get('Accept-Language')?.split(',')[0] ?? 'en-US',
  });

  return NextResponse.redirect(request.nextUrl, {
    headers: {
      'Set-Cookie': `${COOKIE_KEY}=${cookieValue}`,
    },
  });
}
