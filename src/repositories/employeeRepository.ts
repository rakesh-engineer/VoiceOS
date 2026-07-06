import { IEmployeeRepository } from './interfaces';
import { AIEmployee } from '@/types';
import { memoryDb, db } from '@/database/client';

export class EmployeeRepository implements IEmployeeRepository {
  async findById(id: string): Promise<AIEmployee | null> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<AIEmployee>(
        `SELECT id, organization_id as "organizationId", workspace_id as "workspaceId", 
         name, role_title as "roleTitle", avatar_url as "avatarUrl", status, 
         llm_model as "llmModel", system_prompt as "systemPrompt", temperature, 
         created_at as "createdAt", updated_at as "updatedAt" FROM ai_employees WHERE id = $1`,
        [id]
      );
      return result.rows[0] || null;
    }

    return memoryDb.employees.find((emp) => emp.id === id) || null;
  }

  async findByOrgId(orgId: string): Promise<AIEmployee[]> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<AIEmployee>(
        `SELECT id, organization_id as "organizationId", workspace_id as "workspaceId", 
         name, role_title as "roleTitle", avatar_url as "avatarUrl", status, 
         llm_model as "llmModel", system_prompt as "systemPrompt", temperature, 
         created_at as "createdAt", updated_at as "updatedAt" FROM ai_employees WHERE organization_id = $1`,
        [orgId]
      );
      return result.rows;
    }

    return memoryDb.employees.filter((emp) => emp.organizationId === orgId);
  }

  async findByWorkspaceId(workspaceId: string): Promise<AIEmployee[]> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const result = await db.query<AIEmployee>(
        `SELECT id, organization_id as "organizationId", workspace_id as "workspaceId", 
         name, role_title as "roleTitle", avatar_url as "avatarUrl", status, 
         llm_model as "llmModel", system_prompt as "systemPrompt", temperature, 
         created_at as "createdAt", updated_at as "updatedAt" FROM ai_employees WHERE workspace_id = $1`,
        [workspaceId]
      );
      return result.rows;
    }

    return memoryDb.employees.filter((emp) => emp.workspaceId === workspaceId);
  }

  async create(employee: Omit<AIEmployee, 'id' | 'createdAt' | 'updatedAt'>): Promise<AIEmployee> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const queryText = `
        INSERT INTO ai_employees (organization_id, workspace_id, name, role_title, avatar_url, status, llm_model, system_prompt, temperature)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id, organization_id as "organizationId", workspace_id as "workspaceId", 
                  name, role_title as "roleTitle", avatar_url as "avatarUrl", status, 
                  llm_model as "llmModel", system_prompt as "systemPrompt", temperature, 
                  created_at as "createdAt", updated_at as "updatedAt"
      `;
      const result = await db.query<AIEmployee>(queryText, [
        employee.organizationId,
        employee.workspaceId,
        employee.name,
        employee.roleTitle,
        employee.avatarUrl || null,
        employee.status,
        employee.llmModel,
        employee.systemPrompt,
        employee.temperature,
      ]);
      return result.rows[0];
    }

    const newEmp: AIEmployee = {
      ...employee,
      id: `emp_${Math.random().toString(36).substring(2, 11)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryDb.employees.push(newEmp);
    return newEmp;
  }

  async update(id: string, updates: Partial<AIEmployee>): Promise<AIEmployee | null> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      const keys = Object.keys(updates) as Array<keyof AIEmployee>;
      if (keys.length === 0) return this.findById(id);

      const dbFieldsMap: Partial<Record<keyof AIEmployee, string>> = {
        organizationId: 'organization_id',
        workspaceId: 'workspace_id',
        name: 'name',
        roleTitle: 'role_title',
        avatarUrl: 'avatar_url',
        status: 'status',
        llmModel: 'llm_model',
        systemPrompt: 'system_prompt',
        temperature: 'temperature',
      };

      const setClauses: string[] = [];
      const values: unknown[] = [];
      let index = 1;

      for (const key of keys) {
        const dbField = dbFieldsMap[key] || key;
        setClauses.push(`${dbField} = $${index}`);
        values.push(updates[key]);
        index++;
      }

      values.push(id);
      const queryText = `
        UPDATE ai_employees
        SET ${setClauses.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $${index}
        RETURNING id, organization_id as "organizationId", workspace_id as "workspaceId", 
                  name, role_title as "roleTitle", avatar_url as "avatarUrl", status, 
                  llm_model as "llmModel", system_prompt as "systemPrompt", temperature, 
                  created_at as "createdAt", updated_at as "updatedAt"
      `;

      const result = await db.query<AIEmployee>(queryText, values);
      return result.rows[0] || null;
    }

    const empIndex = memoryDb.employees.findIndex((e) => e.id === id);
    if (empIndex > -1) {
      const updated = {
        ...memoryDb.employees[empIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      memoryDb.employees[empIndex] = updated;
      return updated;
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    const dbUrl = process.env.DATABASE_URL;

    if (dbUrl) {
      await db.query('DELETE FROM ai_employees WHERE id = $1', [id]);
      return true;
    }

    const empIndex = memoryDb.employees.findIndex((e) => e.id === id);
    if (empIndex > -1) {
      memoryDb.employees.splice(empIndex, 1);
      return true;
    }
    return false;
  }
}
