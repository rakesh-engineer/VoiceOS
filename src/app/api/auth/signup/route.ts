import { NextResponse } from 'next/server';
import { AuthService } from '@/services/authService';

const authService = new AuthService();

export async function POST(request: Request) {
  try {
    const { email, password, name, companyName } = await request.json();

    if (!email || !password || !name || !companyName) {
      return NextResponse.json(
        { success: false, error: 'Missing registration details.' },
        { status: 400 }
      );
    }

    const { user, org, token } = await authService.signup(email, password, name, companyName);

    const response = NextResponse.json({
      success: true,
      data: { user, org },
      timestamp: new Date().toISOString(),
    });

    // Set HTTP-Only Cookie for session persistence (Production grade)
    response.cookies.set('voiceos_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 1 day
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    console.error('[Signup API] Error during registration:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Registration failed.' },
      { status: 500 }
    );
  }
}
