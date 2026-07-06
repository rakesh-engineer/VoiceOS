import { NextResponse } from 'next/server';
import { DemoRequestData } from '@/types';
import { DemoRepository } from '@/repositories/demoRepository';
import { AutomationService } from '@/services/automationService';

const demoRepo = new DemoRepository();
const automationService = new AutomationService();

/**
 * Next.js API Route Handler proxying demo request submissions to external systems (n8n).
 * Hides internal webhooks from client browsers to prevent DDoS and credential leaks.
 */
export async function POST(request: Request) {
  try {
    const body: DemoRequestData = await request.json();

    // 1. Server-side Validation
    const { name, company, email, phone, message } = body;
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

    // 2. Database Insertion (Real Postgres DDL or Memory DB Fallback)
    const savedRecord = await demoRepo.save({
      name,
      company,
      email,
      phone,
      message: message || '',
    });

    // 3. Automation Layer Dispatcher (n8n, Temporal, or LangGraph adapter)
    const automationResult = await automationService.triggerWorkflow({
      engine: 'n8n', // Configurable engine
      payload: {
        id: savedRecord.id,
        name: savedRecord.name,
        company: savedRecord.company,
        email: savedRecord.email,
        phone: savedRecord.phone,
        message: savedRecord.message,
        status: savedRecord.status,
        dbCreatedAt: savedRecord.dbCreatedAt,
      },
    });

    if (!automationResult.success) {
      console.error('[Demo API] Workflow trigger failed but DB record was saved:', automationResult.error);
      // Update status to failed in DB for auditing
      await demoRepo.updateStatus(savedRecord.id, 'Failed');
      return NextResponse.json({
        success: true,
        data: {
          id: savedRecord.id,
          status: 'Failed',
          dbCreatedAt: savedRecord.dbCreatedAt,
          warning: 'Database saved but workflow trigger failed.',
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Update status to Processed in DB
    const processedRecord = await demoRepo.updateStatus(savedRecord.id, 'Processed');

    return NextResponse.json({
      success: true,
      data: {
        id: processedRecord?.id || savedRecord.id,
        status: processedRecord?.status || 'Processed',
        dbCreatedAt: processedRecord?.dbCreatedAt || savedRecord.dbCreatedAt,
        executionId: automationResult.executionId,
      },
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
