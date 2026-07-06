import { IChannelRepository } from './interfaces';
import { Channel } from '@/types';
import { memoryDb, db } from '@/database/client';

export class ChannelRepository implements IChannelRepository {
  async findByOrgId(orgId: string): Promise<Channel[]> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Channel>(
        `SELECT id, organization_id as "organizationId", workspace_id as "workspaceId", 
         name, type, is_active as "isActive", config, 
         created_at as "createdAt", updated_at as "updatedAt" FROM channels WHERE organization_id = $1`,
        [orgId]
      );
      return result.rows;
    }

    // Default seeded channels in Memory if empty
    const orgChannels = memoryDb.employees
      .filter(emp => emp.organizationId === orgId)
      .map((emp, idx) => ({
        id: `chan_seed_${idx}_${orgId}`,
        organizationId: orgId,
        workspaceId: emp.workspaceId,
        name: idx === 0 ? 'Twilio Office Support' : 'WhatsApp Outreach',
        type: idx === 0 ? 'Voice' as const : 'WhatsApp' as const,
        isActive: true,
        config: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

    return orgChannels;
  }

  async create(channel: Omit<Channel, 'id' | 'createdAt' | 'updatedAt'>): Promise<Channel> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Channel>(
        `INSERT INTO channels (organization_id, workspace_id, name, type, is_active, config)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, organization_id as "organizationId", workspace_id as "workspaceId", 
                   name, type, is_active as "isActive", config, 
                   created_at as "createdAt", updated_at as "updatedAt"`,
        [
          channel.organizationId,
          channel.workspaceId,
          channel.name,
          channel.type,
          channel.isActive,
          JSON.stringify(channel.config)
        ]
      );
      return result.rows[0];
    }

    const newChannel: Channel = {
      ...channel,
      id: `chan_${Math.random().toString(36).substring(2, 11)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return newChannel;
  }

  async updateStatus(id: string, isActive: boolean): Promise<Channel | null> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Channel>(
        `UPDATE channels SET is_active = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 
         RETURNING id, organization_id as "organizationId", workspace_id as "workspaceId", 
                   name, type, is_active as "isActive", config, 
                   created_at as "createdAt", updated_at as "updatedAt"`,
        [isActive, id]
      );
      return result.rows[0] || null;
    }

    return null;
  }
}
