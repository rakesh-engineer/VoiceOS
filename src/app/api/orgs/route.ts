import { NextResponse, NextRequest } from 'next/server';
import { AuthService } from '@/services/authService';
import { OrganizationRepository } from '@/repositories/orgRepository';

const authService = new AuthService();
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
    console.error('[Orgs API] Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
