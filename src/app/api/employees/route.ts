import { NextResponse, NextRequest } from 'next/server';
import { AuthService } from '@/services/authService';
import { EmployeeRepository } from '@/repositories/employeeRepository';
import { OrganizationRepository } from '@/repositories/orgRepository';
import { UserRole } from '@/types';

const authService = new AuthService();
const employeeRepo = new EmployeeRepository();
const orgRepo = new OrganizationRepository();

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

    const employees = await employeeRepo.findByOrgId(session.orgId);

    return NextResponse.json({
      success: true,
      data: employees,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('[Employees API GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve AI employees.' }, { status: 500 });
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

    // Role-based Access Control (RBAC): require Developer role or higher to create employees
    const isAuthorized = authService.hasRoleRequired(session.role, 'Developer' as UserRole);
    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: 'Forbidden. You lack Developer permissions to deploy AI employees.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, roleTitle, systemPrompt, temperature, workspaceId } = body;

    if (!name || !roleTitle || !systemPrompt) {
      return NextResponse.json(
        { success: false, error: 'Missing required configuration fields.' },
        { status: 400 }
      );
    }

    // Fetch workspaces to bind or default to first workspace in org
    let targetWorkspaceId = workspaceId;
    if (!targetWorkspaceId) {
      const workspaces = await orgRepo.getWorkspaces(session.orgId);
      if (workspaces.length === 0) {
        // Automatically provision default workspace
        const newWs = await orgRepo.createWorkspace(session.orgId, 'Default Workspace', 'default');
        targetWorkspaceId = newWs.id;
      } else {
        targetWorkspaceId = workspaces[0].id;
      }
    }

    const newEmployee = await employeeRepo.create({
      organizationId: session.orgId,
      workspaceId: targetWorkspaceId,
      name,
      roleTitle,
      status: 'Draft',
      llmModel: body.llmModel || 'gpt-4o',
      systemPrompt,
      temperature: typeof temperature === 'number' ? temperature : 0.70,
      avatarUrl: body.avatarUrl || null,
    });

    return NextResponse.json({
      success: true,
      data: newEmployee,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('[Employees API POST] Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create AI employee.' },
      { status: 500 }
    );
  }
}
