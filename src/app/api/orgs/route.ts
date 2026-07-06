import { NextResponse, NextRequest } from 'next/server';
import { AuthService } from '@/services/authService';
import { OrganizationRepository } from '@/repositories/orgRepository';
import { UserRepository } from '@/repositories/userRepository';

export const dynamic = 'force-dynamic';

const authService = new AuthService();
const orgRepo = new OrganizationRepository();
const userRepo = new UserRepository();

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

    const org = await orgRepo.findById(session.orgId);
    if (!org) {
      return NextResponse.json({ success: false, error: 'Organization not found.' }, { status: 444 });
    }

    const workspaces = await orgRepo.getWorkspaces(session.orgId);
    const members = await orgRepo.getMembers(session.orgId);

    return NextResponse.json({
      success: true,
      data: {
        organization: org,
        workspaces,
        members: members.map((m) => ({
          userId: m.user.id,
          name: m.user.name,
          email: m.user.email,
          role: m.role,
        })),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('[Orgs API GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('voiceos_session');
    if (!sessionCookie?.value) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const session = await authService.verifySession(sessionCookie.value);
    if (!session || !session.orgId || !session.role) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    // RBAC: require Admin or Owner role to edit organization details
    if (session.role !== 'Admin' && session.role !== 'Owner') {
      return NextResponse.json({ success: false, error: 'Forbidden. You lack Admin/Owner privileges.' }, { status: 403 });
    }

    const { name, slug } = await request.json();
    if (!name || !slug) {
      return NextResponse.json({ success: false, error: 'Missing name or slug parameters.' }, { status: 400 });
    }

    const updatedOrg = await orgRepo.update(session.orgId, name, slug);
    if (!updatedOrg) {
      return NextResponse.json({ success: false, error: 'Organization not found.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { organization: updatedOrg },
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('[Orgs API PUT] Error:', error);
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

    const body = await request.json();
    const { action, name, slug } = body;

    if (action === 'create_workspace') {
      // RBAC: require Developer role or higher to create workspaces
      if (session.role !== 'Developer' && session.role !== 'Admin' && session.role !== 'Owner') {
        return NextResponse.json({ success: false, error: 'Forbidden. You lack Developer privileges.' }, { status: 403 });
      }

      if (!name) {
        return NextResponse.json({ success: false, error: 'Workspace name is required.' }, { status: 400 });
      }

      const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newWs = await orgRepo.createWorkspace(session.orgId, name, generatedSlug);

      return NextResponse.json({
        success: true,
        data: { workspace: newWs },
        timestamp: new Date().toISOString(),
      });
    }

    if (action === 'invite_member') {
      // RBAC: require Admin or Owner role to invite members
      if (session.role !== 'Admin' && session.role !== 'Owner') {
        return NextResponse.json({ success: false, error: 'Forbidden. You lack Admin/Owner privileges.' }, { status: 403 });
      }

      const { email, role, name: memberName } = body;
      if (!email || !role) {
        return NextResponse.json({ success: false, error: 'Missing email or role parameters.' }, { status: 400 });
      }

      // Check if user already exists, otherwise create placeholder user
      let user = await userRepo.findByEmail(email);
      if (!user) {
        user = await userRepo.create(email, 'placeholder_invite_hashed_pass', memberName || 'Invited User');
      }

      await orgRepo.addMember(session.orgId, user.id, role);

      return NextResponse.json({
        success: true,
        data: {
          member: {
            userId: user.id,
            name: user.name,
            email: user.email,
            role,
          }
        },
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action parameter.' }, { status: 400 });
  } catch (error: unknown) {
    console.error('[Orgs API POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
