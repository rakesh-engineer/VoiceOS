'use client';

import React, { useState } from 'react';
import {
  Workflow,
  Plus,
  GitBranch,
  RefreshCw,
  Clock,
  CheckCircle2,
  Database,
  ArrowRight,
  WorkflowIcon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface WorkflowItem {
  id: string;
  name: string;
  isActive: boolean;
  lastRun: string;
  successRate: string;
  executionCount: number;
  trigger: string;
  destination: string;
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<WorkflowItem[]>(() => [
    {
      id: 'flow_1',
      name: 'Demo Intake CRM Sync & WhatsApp Notify',
      isActive: true,
      lastRun: '15 mins ago',
      successRate: '100%',
      executionCount: 14,
      trigger: 'Demo Request Submitted',
      destination: 'Salesforce & WhatsApp'
    },
    {
      id: 'flow_2',
      name: 'Inbound Customer Call Ticket Logger',
      isActive: true,
      lastRun: '2 hours ago',
      successRate: '98.5%',
      executionCount: 412,
      trigger: 'Voice Call Ended',
      destination: 'HubSpot & Slack'
    }
  ]);

  const toggleWorkflow = (id: string) => {
    setWorkflows(workflows.map(w => w.id === id ? { ...w, isActive: !w.isActive } : w));
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <Workflow className="h-6 w-6 text-violet-400 mr-2" />
            Automation Workflows
          </h1>
          <p className="text-xs text-zinc-400">Sync with n8n, LangGraph, and webhook pipelines to orchestrate systems.</p>
        </div>
        <Button disabled variant="secondary" size="sm" className="flex items-center space-x-1.5 opacity-50 cursor-not-allowed">
          <Plus className="h-4 w-4" />
          <span>New Workflow</span>
        </Button>
      </div>

      {/* Connected Workflows List */}
      <div className="grid grid-cols-1 gap-6">
        {workflows.map((flow) => (
          <div key={flow.id} className="border border-zinc-900 bg-zinc-900/10 rounded-2xl p-6 space-y-6 hover:border-zinc-850 transition-all">
            {/* Title & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900/60">
              <div className="flex items-center space-x-3.5">
                <div className="h-10 w-10 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400 flex items-center justify-center">
                  <WorkflowIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">{flow.name}</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Automation adapter: n8n engine</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${flow.isActive ? 'bg-emerald-500' : 'bg-zinc-700'}`}></span>
                <span className="text-[10px] text-zinc-450 font-bold uppercase mr-4">{flow.isActive ? 'Active' : 'Inactive'}</span>
                <Button
                  variant="secondary"
                  className="py-1 px-3 text-[11px]"
                  onClick={() => toggleWorkflow(flow.id)}
                >
                  {flow.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </div>

            {/* Pipeline Visualizer Representation */}
            <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-900 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs select-none">
              <div className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 font-bold text-zinc-350">
                {flow.trigger}
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-700 hidden sm:block" />
              <div className="px-3 py-1.5 rounded-lg border border-violet-900/30 bg-violet-650/5 font-bold text-violet-400 flex items-center gap-1.5">
                <GitBranch className="h-3.5 w-3.5" />
                <span>n8n Orchestrator</span>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-700 hidden sm:block" />
              <div className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 font-bold text-zinc-350">
                {flow.destination}
              </div>
            </div>

            {/* Telemetry Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
              <div className="space-y-1">
                <span className="text-zinc-555 block font-bold uppercase tracking-wider text-[9px] flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> Last Triggered
                </span>
                <p className="text-zinc-300 font-semibold">{flow.lastRun}</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-555 block font-bold uppercase tracking-wider text-[9px] flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-450" /> Success Rate
                </span>
                <p className="text-emerald-450 font-extrabold">{flow.successRate}</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-555 block font-bold uppercase tracking-wider text-[9px] flex items-center">
                  <RefreshCw className="h-3 w-3 mr-1" /> Executions
                </span>
                <p className="text-zinc-300 font-semibold">{flow.executionCount} runs</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-555 block font-bold uppercase tracking-wider text-[9px] flex items-center">
                  <Database className="h-3 w-3 mr-1" /> Endpoint URL
                </span>
                <p className="text-violet-400 font-mono text-[10px] truncate" title="https://your-n8n.com/webhook/voice-os-demo">
                  https://your-n8n.com/webhook/voice-os-demo
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
