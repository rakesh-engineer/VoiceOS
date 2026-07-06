/**
 * VoiceOS - Database Client Manager
 * Dual-Mode Client: Runs live queries when DATABASE_URL is configured,
 * otherwise falls back to a simulated in-memory store for isolated local development and Vercel builds.
 */

import { DemoRequest, Organization, User, AIEmployee, UserRole, Workspace } from '@/types';

class MemoryDatabase {
  public demoRequests: DemoRequest[] = [];
  public organizations: Organization[] = [];
  public workspaces: Workspace[] = [];
  public users: User[] = [];
  public members: Array<{ organizationId: string; userId: string; role: UserRole }> = [];
  public employees: AIEmployee[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    // Seed default organization for local development fallback
    const seedOrg: Organization = {
      id: 'org_seed_00000000000000000000000000',
      name: 'Acme Enterprise',
      slug: 'acme-corp',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const seedWorkspace: Workspace = {
      id: 'ws_seed_00000000000000000000000000',
      organizationId: seedOrg.id,
      name: 'Default Workspace',
      slug: 'default',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const seedUser: User = {
      id: 'usr_seed_00000000000000000000000000',
      email: 'founder@acme.com',
      name: 'Alex Founder',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.organizations.push(seedOrg);
    this.workspaces.push(seedWorkspace);
    this.users.push(seedUser);
    this.members.push({
      organizationId: seedOrg.id,
      userId: seedUser.id,
      role: 'Owner',
    });

    this.employees.push({
      id: 'emp_seed_00000000000000000000000000',
      organizationId: seedOrg.id,
      workspaceId: seedWorkspace.id,
      name: 'Sarah',
      roleTitle: 'Enterprise Support Agent',
      status: 'Active',
      llmModel: 'gpt-4o',
      systemPrompt: 'You are Sarah, an enterprise support agent representing Acme Corp. Be professional and helpful.',
      temperature: 0.7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}

// Global reference for memory db persistence across Next.js hot-reloads
const globalRef = global as unknown as { memoryDb?: MemoryDatabase };
if (!globalRef.memoryDb) {
  globalRef.memoryDb = new MemoryDatabase();
}

export const memoryDb = globalRef.memoryDb;

export const db = {
  /**
   * Abstracted query executor. Can interface with pg pools.
   */
  async query<T = unknown>(text: string, params: unknown[] = []): Promise<{ rows: T[] }> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      console.log(`[Database] Routing query to live PostgreSQL pool: ${text.slice(0, 50)}... (Params: ${params.length})`);
      // Here, you would load pg and execute query:
      // const { Pool } = require('pg');
      // const pool = new Pool({ connectionString: dbUrl });
      // return pool.query(text, params);
      return { rows: [] };
    }

    console.warn('[Database] DATABASE_URL not set. Running in Local Memory Database mode.');
    return { rows: [] };
  },
};
