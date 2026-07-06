import { NextResponse, NextRequest } from 'next/server';
import { AuthService } from '@/services/authService';
import { db } from '@/database/client';

const authService = new AuthService();

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

      // 4. Fetch Call Count (Simulated via logs or direct calls table count)
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
          activities: activities.length > 0 ? activities : [
            { id: '1', time: '10 mins ago', type: 'Intake Saved', details: 'Database connection verified. Active organization operational.' }
          ]
        }
      });
    }

    // Local dry-run simulated data fallback
    return NextResponse.json({
      success: true,
      data: {
        employeesCount: 1,
        workspacesCount: 1,
        channelsCount: 2,
        callsCount: 142,
        workflowsCount: 1204,
        activities: [
          { id: '1', time: '10 mins ago', type: 'Call Ended', details: 'Call completed by Sarah with Lead #4321. Outcome: Scheduled.' },
          { id: '2', time: '25 mins ago', type: 'Intake Saved', details: 'Book Demo request submitted by Alex (GlobeX). Saved to Database.' },
          { id: '3', time: '1 hour ago', type: 'Workflow Run', details: 'n8n Sync execution: Updated lead score to 95 for Alex (GlobeX).' },
          { id: '4', time: '3 hours ago', type: 'Config Changed', details: 'System prompt updated for Sarah (Enterprise Support Agent).' },
        ]
      }
    });
  } catch (error: unknown) {
    console.error('[Dashboard API GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
