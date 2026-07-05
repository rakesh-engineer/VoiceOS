import { NextResponse } from 'next/server';
import { config } from '@/config';
import { DemoRequestData } from '@/types';

/**
 * Next.js API Route Handler proxying demo request submissions to external systems (n8n).
 * Hides internal webhooks from client browsers to prevent DDoS and credential leaks.
 */
export async function POST(request: Request) {
  try {
    const body: DemoRequestData = await request.json();

    // 1. Server-side Validation
    const { name, company, email, phone } = body;
    if (!name || !company || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required field parameters.' },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // 2. n8n Routing
    // Check for server-side webhook URL first (fallback to client-safe env var if configured)
    const targetWebhook = config.server.n8nServerWebhookUrl || config.n8n.demoWebhookUrl;

    if (!targetWebhook) {
      // Offline fallback: simulate server connection
      console.warn(
        'Server-side n8n webhook URL is not configured. Request logged locally:',
        body
      );

      // Simulate slight processing overhead
      await new Promise((resolve) => setTimeout(resolve, 600));

      return NextResponse.json({
        success: true,
        message: 'Request processed locally. Ready for webhook integration.',
        timestamp: new Date().toISOString(),
      });
    }

    // Forwarding payload to n8n
    const response = await fetch(targetWebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...body,
        source: 'VoiceOS Secure API Proxy',
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`External service responded with status: ${response.status}`);
    }

    const result = await response.json().catch(() => ({}));

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('Secure proxy submission error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Server failed to process submission.';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
