/**
 * VoiceOS - Automation Service Layer
 * Abstract integration layer separating business workflows from execution engines (e.g. n8n).
 */

import { config } from '@/config';

export type AutomationEngineType = 'n8n' | 'Temporal' | 'LangGraph' | 'CustomREST';

export interface WorkflowTriggerOptions {
  engine?: AutomationEngineType;
  endpointUrl?: string;
  workflowId?: string;
  payload: Record<string, unknown>;
}

export interface AutomationResult {
  success: boolean;
  executionId?: string;
  responsePayload?: Record<string, unknown>;
  error?: string;
  engineUsed: AutomationEngineType;
}

export class AutomationService {
  /**
   * Dispatch a workflow execution to the configured engine adapter.
   */
  async triggerWorkflow(options: WorkflowTriggerOptions): Promise<AutomationResult> {
    const selectedEngine = options.engine || 'n8n';
    const targetUrl = options.endpointUrl || config.n8n.demoWebhookUrl || config.n8n.webhookUrl;

    console.log(`[AutomationService] Dispatching workflow execution via [${selectedEngine}] to ${targetUrl || 'local dry-run'}`);

    try {
      if (!targetUrl) {
        // Mock execution output if there is no URL configured
        return {
          success: true,
          executionId: `mock_exec_${Math.random().toString(36).substring(2, 11)}`,
          engineUsed: selectedEngine,
          responsePayload: {
            message: 'Mock execution successful. No integration endpoint defined.',
            timestamp: new Date().toISOString(),
          },
        };
      }

      switch (selectedEngine) {
        case 'n8n':
          return await this.executeN8nWorkflow(targetUrl, options.payload);
        case 'Temporal':
          return await this.executeTemporalWorkflow(targetUrl, options.payload);
        case 'LangGraph':
          return await this.executeLangGraphWorkflow(targetUrl, options.payload);
        case 'CustomREST':
        default:
          return await this.executeCustomREST(targetUrl, options.payload);
      }
    } catch (err: unknown) {
      console.error(`[AutomationService] Execution failed on ${selectedEngine}:`, err);
      return {
        success: false,
        engineUsed: selectedEngine,
        error: err instanceof Error ? err.message : 'Unknown error during workflow dispatcher execution.',
      };
    }
  }

  private async executeN8nWorkflow(url: string, payload: Record<string, unknown>): Promise<AutomationResult> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        metadata: {
          dispatcher: 'VoiceOS SaaS Automation Engine',
          timestamp: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status: ${response.status}`);
    }

    const data = await response.json().catch(() => ({}));
    return {
      success: true,
      executionId: data.executionId || `n8n_exec_${Math.random().toString(36).substring(2, 11)}`,
      engineUsed: 'n8n',
      responsePayload: data,
    };
  }

  private async executeTemporalWorkflow(url: string, payload: Record<string, unknown>): Promise<AutomationResult> {
    // Future implementation detail: communicate with Temporal gRPC/REST gateway
    console.log('[AutomationService] Executing Temporal workflow adapter dry-run.');
    return {
      success: true,
      executionId: `temp_exec_${Math.random().toString(36).substring(2, 11)}`,
      engineUsed: 'Temporal',
      responsePayload: { status: 'Triggered Temporal workflow', input: payload },
    };
  }

  private async executeLangGraphWorkflow(url: string, payload: Record<string, unknown>): Promise<AutomationResult> {
    // Future implementation detail: run LangGraph cloud agent thread execution
    console.log('[AutomationService] Executing LangGraph agent adapter dry-run.');
    return {
      success: true,
      executionId: `lg_exec_${Math.random().toString(36).substring(2, 11)}`,
      engineUsed: 'LangGraph',
      responsePayload: { status: 'Triggered LangGraph agent thread', input: payload },
    };
  }

  private async executeCustomREST(url: string, payload: Record<string, unknown>): Promise<AutomationResult> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Custom REST responder error: ${response.status}`);
    }

    const data = await response.json().catch(() => ({}));
    return {
      success: true,
      executionId: `rest_exec_${Math.random().toString(36).substring(2, 11)}`,
      engineUsed: 'CustomREST',
      responsePayload: data,
    };
  }
}
