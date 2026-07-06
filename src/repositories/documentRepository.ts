import { IDocumentRepository } from './interfaces';
import { Document } from '@/types';
import { db } from '@/database/client';

export class DocumentRepository implements IDocumentRepository {
  private inMemoryDocs: Document[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    this.inMemoryDocs.push({
      id: 'doc_seed_1',
      knowledgeSourceId: 'ks_default',
      title: 'Company_Policy_Guidelines_2026.pdf',
      content: 'Standard operating guidelines for company policy and employee support guidelines.',
      metadata: { size: '1.2MB', pages: 14, extension: 'pdf' },
      createdAt: new Date().toISOString()
    });
    this.inMemoryDocs.push({
      id: 'doc_seed_2',
      knowledgeSourceId: 'ks_default',
      title: 'VoiceOS_REST_API_Reference.md',
      content: 'API specifications and schema layouts for outbound REST webhooks integrations.',
      metadata: { size: '345KB', extension: 'md' },
      createdAt: new Date().toISOString()
    });
  }

  async findByOrgId(orgId: string): Promise<Document[]> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Document>(
        `SELECT d.id, d.knowledge_source_id as "knowledgeSourceId", d.title, d.content, d.vector_id as "vectorId", d.metadata, d.created_at as "createdAt"
         FROM documents d
         JOIN knowledge_sources k ON d.knowledge_source_id = k.id
         WHERE k.organization_id = $1`,
        [orgId]
      );
      return result.rows;
    }

    return this.inMemoryDocs;
  }

  async create(doc: Omit<Document, 'id' | 'createdAt'>): Promise<Document> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<Document>(
        `INSERT INTO documents (knowledge_source_id, title, content, vector_id, metadata)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, knowledge_source_id as "knowledgeSourceId", title, content, vector_id as "vectorId", metadata, created_at as "createdAt"`,
        [
          doc.knowledgeSourceId,
          doc.title,
          doc.content,
          doc.vectorId || null,
          JSON.stringify(doc.metadata)
        ]
      );
      return result.rows[0];
    }

    const newDoc: Document = {
      ...doc,
      id: `doc_${Math.random().toString(36).substring(2, 11)}`,
      createdAt: new Date().toISOString()
    };
    this.inMemoryDocs.push(newDoc);
    return newDoc;
  }

  async delete(id: string): Promise<boolean> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      await db.query('DELETE FROM documents WHERE id = $1', [id]);
      return true;
    }

    const docIndex = this.inMemoryDocs.findIndex((d) => d.id === id);
    if (docIndex > -1) {
      this.inMemoryDocs.splice(docIndex, 1);
      return true;
    }
    return false;
  }
}
