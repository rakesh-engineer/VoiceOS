import { IDemoRepository } from './interfaces';
import { DemoRequest, DemoRequestData } from '@/types';
import { memoryDb, db } from '@/database/client';

export class DemoRepository implements IDemoRepository {
  async save(data: DemoRequestData): Promise<DemoRequest> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const queryText = `
        INSERT INTO demo_requests (name, company, email, phone, message, status)
        VALUES ($1, $2, $3, $4, $5, 'Pending')
        RETURNING id, name, company, email, phone, message, status, db_created_at as "dbCreatedAt"
      `;
      const result = await db.query<DemoRequest>(queryText, [
        data.name,
        data.company,
        data.email,
        data.phone,
        data.message || '',
      ]);
      return result.rows[0];
    }

    // In-memory fallback
    const newDemo: DemoRequest = {
      id: `dem_${Math.random().toString(36).substring(2, 11)}`,
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      message: data.message || '',
      status: 'Pending',
      dbCreatedAt: new Date().toISOString(),
    };
    memoryDb.demoRequests.push(newDemo);
    return newDemo;
  }

  async getAll(): Promise<DemoRequest[]> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<DemoRequest>('SELECT id, name, company, email, phone, message, status, db_created_at as "dbCreatedAt" FROM demo_requests ORDER BY db_created_at DESC');
      return result.rows;
    }

    return memoryDb.demoRequests;
  }

  async updateStatus(id: string, status: string): Promise<DemoRequest | null> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<DemoRequest>(
        'UPDATE demo_requests SET status = $1 WHERE id = $2 RETURNING id, name, company, email, phone, message, status, db_created_at as "dbCreatedAt"',
        [status, id]
      );
      return result.rows[0] || null;
    }

    const demo = memoryDb.demoRequests.find((d) => d.id === id);
    if (demo) {
      demo.status = status;
      return demo;
    }
    return null;
  }
}
