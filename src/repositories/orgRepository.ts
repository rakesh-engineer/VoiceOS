import { IOrganizationRepository } from './interfaces';
import { Organization, User, UserRole, Workspace } from '@/types';
import { memoryDb, db } from '@/database/client';

export class OrganizationRepository implements IOrganizationRepository {
  async findById(id: string): Promise<Organization | null> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Organization>('SELECT id, name, slug, created_at as "createdAt", updated_at as "updatedAt" FROM organizations WHERE id = $1', [id]);
      return result.rows[0] || null;
    }

    return memoryDb.organizations.find((org) => org.id === id) || null;
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Organization>('SELECT id, name, slug, created_at as "createdAt", updated_at as "updatedAt" FROM organizations WHERE slug = $1', [slug]);
      return result.rows[0] || null;
    }

    return memoryDb.organizations.find((org) => org.slug === slug) || null;
  }

  async create(name: string, slug: string): Promise<Organization> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Organization>(
        'INSERT INTO organizations (name, slug) VALUES ($1, $2) RETURNING id, name, slug, created_at as "createdAt", updated_at as "updatedAt"',
        [name, slug]
      );
      return result.rows[0];
    }

    const newOrg: Organization = {
      id: `org_${Math.random().toString(36).substring(2, 11)}`,
      name,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryDb.organizations.push(newOrg);
    return newOrg;
  }

  async getWorkspaces(orgId: string): Promise<Workspace[]> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Workspace>(
        'SELECT id, organization_id as "organizationId", name, slug, created_at as "createdAt", updated_at as "updatedAt" FROM workspaces WHERE organization_id = $1',
        [orgId]
      );
      return result.rows;
    }

    return memoryDb.workspaces.filter((ws) => ws.organizationId === orgId);
  }

  async createWorkspace(orgId: string, name: string, slug: string): Promise<Workspace> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Workspace>(
        'INSERT INTO workspaces (organization_id, name, slug) VALUES ($1, $2, $3) RETURNING id, organization_id as "organizationId", name, slug, created_at as "createdAt", updated_at as "updatedAt"',
        [orgId, name, slug]
      );
      return result.rows[0];
    }

    const newWorkspace: Workspace = {
      id: `ws_${Math.random().toString(36).substring(2, 11)}`,
      organizationId: orgId,
      name,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryDb.workspaces.push(newWorkspace);
    return newWorkspace;
  }

  async addMember(orgId: string, userId: string, role: UserRole): Promise<void> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      await db.query(
        'INSERT INTO memberships (organization_id, user_id, role) VALUES ($1, $2, $3) ON CONFLICT (organization_id, user_id) DO UPDATE SET role = EXCLUDED.role',
        [orgId, userId, role]
      );
      return;
    }

    const existingIndex = memoryDb.members.findIndex(
      (m) => m.organizationId === orgId && m.userId === userId
    );

    if (existingIndex > -1) {
      memoryDb.members[existingIndex].role = role;
    } else {
      memoryDb.members.push({ organizationId: orgId, userId, role });
    }
  }

  async getMembers(orgId: string): Promise<Array<{ user: User; role: UserRole }>> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const queryText = `
        SELECT u.id, u.email, u.name, u.created_at as "createdAt", u.updated_at as "updatedAt", m.role
        FROM memberships m
        JOIN users u ON m.user_id = u.id
        WHERE m.organization_id = $1
      `;
      const result = await db.query<User & { role: UserRole }>(queryText, [orgId]);
      return result.rows.map((row) => ({
        user: {
          id: row.id,
          email: row.email,
          name: row.name,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        },
        role: row.role,
      }));
    }

    const relations = memoryDb.members.filter((m) => m.organizationId === orgId);
    return relations
      .map((rel) => {
        const user = memoryDb.users.find((u) => u.id === rel.userId);
        if (!user) return null;
        return {
          user,
          role: rel.role,
        };
      })
      .filter((item): item is { user: User; role: UserRole } => item !== null);
  }
}
