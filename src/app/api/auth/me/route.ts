import { NextResponse, NextRequest } from 'next/server';
import { AuthService } from '@/services/authService';

const authService = new AuthService();

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('voiceos_session');

    if (!sessionCookie?.value) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. No session found.' },
        { status: 401 }
      );
    }

    const payload = await authService.verifySession(sessionCookie.value);

    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Session is invalid or expired.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        userId: payload.userId,
        email: payload.email,
        orgId: payload.orgId,
        role: payload.role,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('[Session Check API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify session.' },
      { status: 500 }
    );
  }
}
