import { DemoRequest, DemoRequestData, Organization, User, UserRole, AIEmployee, Workspace, Channel, Document } from '@/types';

export interface IDemoRepository {
  save(data: DemoRequestData): Promise<DemoRequest>;
  getAll(): Promise<DemoRequest[]>;
  updateStatus(id: string, status: string): Promise<DemoRequest | null>;
}

export interface IOrganizationRepository {
  findById(id: string): Promise<Organization | null>;
  findBySlug(slug: string): Promise<Organization | null>;
  create(name: string, slug: string): Promise<Organization>;
  getWorkspaces(orgId: string): Promise<Workspace[]>;
  createWorkspace(orgId: string, name: string, slug: string): Promise<Workspace>;
  addMember(orgId: string, userId: string, role: UserRole): Promise<void>;
  getMembers(orgId: string): Promise<Array<{ user: User; role: UserRole }>>;
}

export interface IEmployeeRepository {
  findById(id: string): Promise<AIEmployee | null>;
  findByOrgId(orgId: string): Promise<AIEmployee[]>;
  findByWorkspaceId(workspaceId: string): Promise<AIEmployee[]>;
  create(employee: Omit<AIEmployee, 'id' | 'createdAt' | 'updatedAt'>): Promise<AIEmployee>;
  update(id: string, updates: Partial<AIEmployee>): Promise<AIEmployee | null>;
  delete(id: string): Promise<boolean>;
}

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(email: string, passwordHash: string, name: string): Promise<User>;
}

export interface IChannelRepository {
  findByOrgId(orgId: string): Promise<Channel[]>;
  create(channel: Omit<Channel, 'id' | 'createdAt' | 'updatedAt'>): Promise<Channel>;
  updateStatus(id: string, isActive: boolean): Promise<Channel | null>;
}

export interface IDocumentRepository {
  findByOrgId(orgId: string): Promise<Document[]>;
  create(doc: Omit<Document, 'id' | 'createdAt'>): Promise<Document>;
  delete(id: string): Promise<boolean>;
}
