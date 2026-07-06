import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Retrieve active session token
  const sessionToken = request.cookies.get('voiceos_session')?.value;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/forgot-password');
  const isAppRoute = pathname.startsWith('/app');

  if (isAppRoute) {
    if (!sessionToken) {
      // Not logged in: redirect to login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Decode JWT payload on the edge using standard base64 decoding (atob)
      const tokenParts = sessionToken.split('.');
      if (tokenParts.length === 3) {
        const payloadB64 = tokenParts[1];
        // Convert base64url to base64
        const base64 = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(jsonPayload);

        // Check if token has expired
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
          const response = NextResponse.redirect(new URL('/login', request.url));
          // Clear invalid cookie
          response.cookies.delete('voiceos_session');
          return response;
        }
      } else {
        throw new Error('Invalid token structure');
      }
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('voiceos_session');
      return response;
    }
  }

  if (isAuthRoute && sessionToken) {
    // Already logged in: redirect auth attempts to app dashboard
    try {
      const tokenParts = sessionToken.split('.');
      if (tokenParts.length === 3) {
        const payloadB64 = tokenParts[1];
        const base64 = payloadB64.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp && payload.exp > now) {
          return NextResponse.redirect(new URL('/app/dashboard', request.url));
        }
      }
    } catch {
      // Session parsing error: let route proceed (invalid cookie will be cleared by /api calls)
    }
  }

  return NextResponse.next();
}

// Config to specify matching route filters
export const config = {
  matcher: ['/app/:path*', '/login', '/signup', '/forgot-password'],
};
