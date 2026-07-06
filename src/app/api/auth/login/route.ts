import { NextResponse } from 'next/server';
import { AuthService } from '@/services/authService';

const authService = new AuthService();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const loginResult = await authService.login(email, password);

    if (!loginResult) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password credentials.' },
        { status: 401 }
      );
    }

    const { user, org, role, token } = loginResult;

    const response = NextResponse.json({
      success: true,
      data: { user, org, role },
      timestamp: new Date().toISOString(),
    });

    response.cookies.set('voiceos_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 1 day
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    console.error('[Login API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal login error occurred.' },
      { status: 500 }
    );
  }
}
