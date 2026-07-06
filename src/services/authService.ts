import { User, UserRole, Organization } from '@/types';
import { hashPassword, comparePasswords } from '@/utils/security';
import { signJwt, verifyJwt } from '@/utils/jwt';
import { memoryDb, db } from '@/database/client';

const JWT_SECRET = process.env.JWT_SECRET || 'voiceos_super_jwt_secret_dev';

export interface TokenPayload {
  userId: string;
  email: string;
  orgId?: string;
  role?: UserRole;
}

export class AuthService {
  /**
   * Registers a new user and provisions an organization for them.
   */
  async signup(email: string, passwordPlain: string, name: string, companyName: string): Promise<{ user: User; org: Organization; token: string }> {
    const passwordHash = hashPassword(passwordPlain);
    const dbUrl = process.env.DATABASE_URL;

    let user: User;
    let org: Organization;

    if (dbUrl) {
      // 1. Create Organization
      const orgSlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const orgResult = await db.query<Organization>(
        'INSERT INTO organizations (name, slug) VALUES ($1, $2) RETURNING id, name, slug, created_at as "createdAt", updated_at as "updatedAt"',
        [companyName, orgSlug]
      );
      org = orgResult.rows[0];

      // 2. Create User
      const userResult = await db.query<User>(
        'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at as "createdAt", updated_at as "updatedAt"',
        [email, passwordHash, name]
      );
      user = userResult.rows[0];

      // 3. Bind Role (Owner)
      await db.query(
        'INSERT INTO memberships (organization_id, user_id, role) VALUES ($1, $2, $3)',
        [org.id, user.id, 'Owner' as UserRole]
      );
    } else {
      // Local memory fallback
      const orgSlug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      org = {
        id: `org_${Math.random().toString(36).substring(2, 11)}`,
        name: companyName,
        slug: orgSlug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      user = {
        id: `usr_${Math.random().toString(36).substring(2, 11)}`,
        email,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      memoryDb.organizations.push(org);
      memoryDb.users.push({ ...user, password_hash: passwordHash } as User & { password_hash: string });
      memoryDb.members.push({ organizationId: org.id, userId: user.id, role: 'Owner' });
    }

    const token = signJwt({ userId: user.id, email: user.email, orgId: org.id, role: 'Owner' }, JWT_SECRET);

    return { user, org, token };
  }

  /**
   * Authenticates user and retrieves their active organization.
   */
  async login(email: string, passwordPlain: string): Promise<{ user: User; org: Organization | null; role: UserRole | null; token: string } | null> {
    const dbUrl = process.env.DATABASE_URL;
    let dbUser: (User & { password_hash: string }) | null = null;
    let org: Organization | null = null;
    let role: UserRole | null = null;

    if (dbUrl) {
      const userResult = await db.query<User & { password_hash: string }>(
        'SELECT id, email, password_hash, name, created_at as "createdAt", updated_at as "updatedAt" FROM users WHERE email = $1',
        [email]
      );
      dbUser = userResult.rows[0] || null;

      if (dbUser) {
        // Fetch membership
        const memResult = await db.query<{ organization_id: string; role: UserRole }>(
          'SELECT organization_id, role FROM memberships WHERE user_id = $1 LIMIT 1',
          [dbUser.id]
        );
        const membership = memResult.rows[0];
        if (membership) {
          role = membership.role;
          const orgResult = await db.query<Organization>(
            'SELECT id, name, slug, created_at as "createdAt", updated_at as "updatedAt" FROM organizations WHERE id = $1',
            [membership.organization_id]
          );
          org = orgResult.rows[0] || null;
        }
      }
    } else {
      const memUser = memoryDb.users.find((u) => u.email === email) as (User & { password_hash: string }) | undefined;
      if (memUser) {
        dbUser = memUser;
        const membership = memoryDb.members.find((m) => m.userId === dbUser!.id);
        if (membership) {
          role = membership.role;
          org = memoryDb.organizations.find((o) => o.id === membership.organizationId) || null;
        }
      }
    }

    if (!dbUser || !comparePasswords(passwordPlain, dbUser.password_hash)) {
      return null;
    }

    const token = signJwt(
      { userId: dbUser.id, email: dbUser.email, orgId: org?.id, role },
      JWT_SECRET
    );

    const userObj: User = {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      createdAt: dbUser.createdAt,
      updatedAt: dbUser.updatedAt,
    };

    return { user: userObj, org, role, token };
  }

  /**
   * Verifies an active JWT session token and returns metadata.
   */
  async verifySession(token: string): Promise<TokenPayload | null> {
    return verifyJwt<TokenPayload>(token, JWT_SECRET);
  }

  /**
   * Enforces role requirements. Returns true if authorized.
   */
  hasRoleRequired(userRole: UserRole, requiredRole: UserRole): boolean {
    const rolesOrder: UserRole[] = ['Viewer', 'Operator', 'Developer', 'Admin', 'Owner'];
    const userIndex = rolesOrder.indexOf(userRole);
    const requiredIndex = rolesOrder.indexOf(requiredRole);

    return userIndex >= requiredIndex;
  }
}
