import { NextResponse, NextRequest } from 'next/server';
import { AuthService } from '@/services/authService';
import { DocumentRepository } from '@/repositories/documentRepository';
import { db } from '@/database/client';

const authService = new AuthService();
const docRepo = new DocumentRepository();

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('voiceos_session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const session = await authService.verifySession(sessionCookie.value);
    if (!session || !session.orgId) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const docs = await docRepo.findByOrgId(session.orgId);
    return NextResponse.json({ success: true, data: docs });
  } catch (error: unknown) {
    console.error('[Documents API GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve documents.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('voiceos_session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const session = await authService.verifySession(sessionCookie.value);
    if (!session || !session.orgId || !session.role) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    // RBAC: require Developer role or higher to upload documents
    if (session.role !== 'Developer' && session.role !== 'Admin' && session.role !== 'Owner') {
      return NextResponse.json({ success: false, error: 'Forbidden. You lack Developer permissions.' }, { status: 403 });
    }

    const body = await request.json();
    const { title, content, metadata } = body;

    if (!title || !content) {
      return NextResponse.json({ success: false, error: 'Title and content are required.' }, { status: 400 });
    }

    let knowledgeSourceId = 'ks_default';
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      // Find or provision a default knowledge source for the active organization
      const ksResult = await db.query<{ id: string }>(
        'SELECT id FROM knowledge_sources WHERE organization_id = $1 LIMIT 1',
        [session.orgId]
      );
      knowledgeSourceId = ksResult.rows[0]?.id || '';

      if (!knowledgeSourceId) {
        const insertKs = await db.query<{ id: string }>(
          "INSERT INTO knowledge_sources (organization_id, name, type) VALUES ($1, 'Default Source', 'RAG') RETURNING id",
          [session.orgId]
        );
        knowledgeSourceId = insertKs.rows[0].id;
      }
    }

    const newDoc = await docRepo.create({
      knowledgeSourceId,
      title,
      content,
      metadata: metadata || {}
    });

    return NextResponse.json({
      success: true,
      data: newDoc,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('[Documents API POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload document.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('voiceos_session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const session = await authService.verifySession(sessionCookie.value);
    if (!session || !session.orgId || !session.role) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    // RBAC: require Developer role or higher to delete documents
    if (session.role !== 'Developer' && session.role !== 'Admin' && session.role !== 'Owner') {
      return NextResponse.json({ success: false, error: 'Forbidden. You lack Developer permissions.' }, { status: 403 });
    }

    const url = new URL(request.url);
    const docId = url.searchParams.get('id');

    if (!docId) {
      return NextResponse.json({ success: false, error: 'Missing ID parameter.' }, { status: 400 });
    }

    // Optional verification of owner could be added.
    await docRepo.delete(docId);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('[Documents API DELETE] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete document.' }, { status: 500 });
  }
}
