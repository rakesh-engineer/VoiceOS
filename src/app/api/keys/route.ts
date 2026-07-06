import { NextResponse, NextRequest } from 'next/server';
import { AuthService } from '@/services/authService';
import { db } from '@/database/client';
import crypto from 'crypto';

const authService = new AuthService();

// Memory store fallback for API keys
interface MockApiKey {
  id: string;
  organizationId: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
}
const memoryApiKeys: MockApiKey[] = [
  {
    id: 'key_1',
    organizationId: 'org_seed',
    name: 'n8n Production Sync Webhook',
    keyPrefix: 'sk_live_v1',
    createdAt: new Date().toLocaleDateString()
  }
];

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

    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      const result = await db.query<{ id: string; name: string; key_prefix: string; created_at: string }>(
        'SELECT id, name, key_prefix as "keyPrefix", created_at as "createdAt" FROM api_keys WHERE organization_id = $1 ORDER BY created_at DESC',
        [session.orgId]
      );
      return NextResponse.json({ success: true, data: result.rows });
    }

    const filtered = memoryApiKeys.filter((k) => k.organizationId === session.orgId || k.organizationId === 'org_seed');
    return NextResponse.json({ success: true, data: filtered });
  } catch (error: unknown) {
    console.error('[API Keys GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
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

    // RBAC: require Developer role or higher to create API keys
    if (session.role !== 'Developer' && session.role !== 'Admin' && session.role !== 'Owner') {
      return NextResponse.json({ success: false, error: 'Forbidden. You lack Developer permissions.' }, { status: 403 });
    }

    const { name } = await request.json();
    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required.' }, { status: 400 });
    }

    const randomSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const plaintextKey = `sk_live_v1_${randomSecret}`;
    const keyPrefix = 'sk_live_v1';
    
    // Hash key for secure matching
    const keyHash = crypto.createHash('sha256').update(plaintextKey).digest('hex');

    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      const result = await db.query<{ id: string; name: string; key_prefix: string; created_at: string }>(
        `INSERT INTO api_keys (organization_id, name, key_prefix, key_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, key_prefix as "keyPrefix", created_at as "createdAt"`,
        [session.orgId, name, keyPrefix, keyHash]
      );
      
      return NextResponse.json({
        success: true,
        data: {
          key: result.rows[0],
          plaintextKey
        }
      });
    }

    const newKey: MockApiKey = {
      id: `key_${Math.random().toString(36).substring(2, 11)}`,
      organizationId: session.orgId,
      name,
      keyPrefix,
      createdAt: new Date().toLocaleDateString()
    };
    memoryApiKeys.push(newKey);

    return NextResponse.json({
      success: true,
      data: {
        key: newKey,
        plaintextKey
      }
    });
  } catch (error: unknown) {
    console.error('[API Keys POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
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

    // RBAC: require Admin or Owner role to revoke API keys
    if (session.role !== 'Admin' && session.role !== 'Owner') {
      return NextResponse.json({ success: false, error: 'Forbidden. You lack Admin/Owner permissions.' }, { status: 403 });
    }

    const url = new URL(request.url);
    const keyId = url.searchParams.get('id');
    if (!keyId) {
      return NextResponse.json({ success: false, error: 'Missing ID parameter.' }, { status: 400 });
    }

    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      await db.query('DELETE FROM api_keys WHERE id = $1 AND organization_id = $2', [keyId, session.orgId]);
      return NextResponse.json({ success: true });
    }

    const keyIndex = memoryApiKeys.findIndex((k) => k.id === keyId);
    if (keyIndex > -1) {
      memoryApiKeys.splice(keyIndex, 1);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'API key not found.' }, { status: 404 });
  } catch (error: unknown) {
    console.error('[API Keys DELETE] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
