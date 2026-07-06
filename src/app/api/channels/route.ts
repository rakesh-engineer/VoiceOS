import { NextResponse, NextRequest } from 'next/server';
import { AuthService } from '@/services/authService';
import { ChannelRepository } from '@/repositories/channelRepository';

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

    const channels = await channelRepo.findByOrgId(session.orgId);
    return NextResponse.json({ success: true, data: channels });
  } catch (error: unknown) {
    console.error('[Channels API GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to retrieve channels.' }, { status: 500 });
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

    // RBAC: require Developer role or higher to manage channels
    if (session.role !== 'Developer' && session.role !== 'Admin' && session.role !== 'Owner') {
      return NextResponse.json({ success: false, error: 'Forbidden. You lack Developer permissions.' }, { status: 403 });
    }

    const body = await request.json();
    const { action, id, name, type, isActive } = body;

    if (action === 'toggle_status') {
      if (!id) {
        return NextResponse.json({ success: false, error: 'Channel ID is required.' }, { status: 400 });
      }
      const updatedChannel = await channelRepo.updateStatus(id, isActive);
      return NextResponse.json({ success: true, data: updatedChannel });
    }

    // Creating channel
    if (!name || !type) {
      return NextResponse.json({ success: false, error: 'Name and type are required.' }, { status: 400 });
    }

    const newChannel = await channelRepo.create({
      organizationId: session.orgId,
      workspaceId: body.workspaceId || 'ws_seed',
      name,
      type,
      isActive: true,
      config: body.config || {}
    });

    return NextResponse.json({
      success: true,
      data: newChannel,
      timestamp: new Date().toISOString()
    });
  } catch (error: unknown) {
    console.error('[Channels API POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to manage channel.' }, { status: 500 });
  }
}
