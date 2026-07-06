import { NextResponse, NextRequest } from 'next/server';
import { AuthService } from '@/services/authService';
import { db, memoryDb } from '@/database/client';
import { ChannelRepository } from '@/repositories/channelRepository';

export const dynamic = 'force-dynamic';

const authService = new AuthService();
const channelRepo = new ChannelRepository();

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
      // 1. Fetch AI Employees Count
      const employeesRes = await db.query<{ count: string }>(
        'SELECT COUNT(*) as count FROM ai_employees WHERE organization_id = $1',
        [session.orgId]
      );
      const employeesCount = parseInt(employeesRes.rows[0]?.count || '0');

      // 2. Fetch Workspaces Count
      const workspacesRes = await db.query<{ count: string }>(
        'SELECT COUNT(*) as count FROM workspaces WHERE organization_id = $1',
        [session.orgId]
      );
      const workspacesCount = parseInt(workspacesRes.rows[0]?.count || '0');

      // 3. Fetch Active Channels Count
      const channelsRes = await db.query<{ count: string }>(
        'SELECT COUNT(*) as count FROM channels WHERE organization_id = $1 AND is_active = true',
        [session.orgId]
      );
      const channelsCount = parseInt(channelsRes.rows[0]?.count || '0');

      // 4. Fetch Call Count (Empty database returns 0)
      const callsRes = await db.query<{ count: string }>(
        'SELECT COUNT(*) as count FROM calls WHERE organization_id = $1',
        [session.orgId]
      ).catch(() => ({ rows: [{ count: '0' }] }));
      const callsCount = parseInt(callsRes.rows[0]?.count || '0');

      // 5. Fetch Workflow Executions Count
      const workflowsRes = await db.query<{ count: string }>(
        'SELECT COUNT(*) as count FROM workflow_executions WHERE organization_id = $1',
        [session.orgId]
      ).catch(() => ({ rows: [{ count: '0' }] }));
      const workflowsCount = parseInt(workflowsRes.rows[0]?.count || '0');

      // 6. Fetch Recent Audit Logs
      const auditRes = await db.query<{ type: string; details: string; createdAt: string }>(
        'SELECT action as type, details, created_at as "createdAt" FROM audit_logs WHERE organization_id = $1 ORDER BY created_at DESC LIMIT 4',
        [session.orgId]
      ).catch(() => ({ rows: [] as Array<{ type: string; details: string; createdAt: string }> }));
      
      const activities = auditRes.rows.map((row, idx) => ({
        id: `act_${idx}`,
        time: 'Just now',
        type: row.type,
        details: row.details
      }));

      return NextResponse.json({
        success: true,
        data: {
          employeesCount,
          workspacesCount,
          channelsCount,
          callsCount,
          workflowsCount,
          activities
        }
      });
    }

    // Local dry-run simulated data fallback - MUST calculate counts dynamically from memoryDb collections
    const employeesCount = memoryDb.employees.filter((e) => e.organizationId === session.orgId).length;
    const workspacesCount = memoryDb.workspaces.filter((w) => w.organizationId === session.orgId).length;
    const allChannels = await channelRepo.findByOrgId(session.orgId);
    const channelsCount = allChannels.filter((c) => c.isActive).length;

    return NextResponse.json({
      success: true,
      data: {
        employeesCount,
        workspacesCount,
        channelsCount,
        callsCount: 0,
        workflowsCount: 0,
        activities: []
      }
    });
  } catch (error: unknown) {
    console.error('[Dashboard API GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
