import { IUserRepository } from './interfaces';
import { User } from '@/types';
import { memoryDb, db } from '@/database/client';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<User>(
        'SELECT id, email, name, created_at as "createdAt", updated_at as "updatedAt" FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    }

    return memoryDb.users.find((u) => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<User & { password_hash: string }>(
        'SELECT id, email, name, password_hash, created_at as "createdAt", updated_at as "updatedAt" FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0] || null;
    }

    return memoryDb.users.find((u) => u.email === email) || null;
  }

  async create(email: string, passwordHash: string, name: string): Promise<User> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<User>(
        'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name, created_at as "createdAt", updated_at as "updatedAt"',
        [email, passwordHash, name]
      );
      return result.rows[0];
    }

    const newUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 11)}`,
      email,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryDb.users.push({ ...newUser, password_hash: passwordHash } as User & { password_hash: string });
    return newUser;
  }
}
