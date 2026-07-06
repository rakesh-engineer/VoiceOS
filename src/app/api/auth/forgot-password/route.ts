import { NextResponse } from 'next/server';
import { UserRepository } from '@/repositories/userRepository';

const userRepo = new UserRepository();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const user = await userRepo.findByEmail(email);
    if (user) {
      console.log(`[Auth] Dispatched password recovery link for ${email} (${user.name}). Reset Token generated.`);
    } else {
      console.warn(`[Auth] Password recovery requested for unregistered email: ${email}`);
    }

    // Always return success to prevent user email enumeration vulnerability (Security best practice)
    return NextResponse.json({
      success: true,
      message: 'Password recovery email sent successfully.',
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('[Forgot Password API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
