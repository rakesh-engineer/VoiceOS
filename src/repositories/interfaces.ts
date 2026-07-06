import { DemoRequest, DemoRequestData, Organization, User, UserRole, AIEmployee, Workspace } from '@/types';

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
