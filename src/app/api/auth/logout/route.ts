import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully.',
    timestamp: new Date().toISOString(),
  });

  // Clear HttpOnly Session Cookie by setting maxAge to 0 and path to '/'
  response.cookies.set('voiceos_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
