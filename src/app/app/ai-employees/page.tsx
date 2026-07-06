'use client';

import React, { useState } from 'react';
import {
  BrainCircuit,
  Database,
  Network,
  Plus,
  Play,
  Pause,
  AlertCircle,
  Globe,
  Loader2,
  FileText,
  UserCheck,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { AIEmployee } from '@/types';

type TabType = 'overview' | 'knowledge' | 'channels' | 'analytics' | 'configuration';

export default function AIEmployeesPage() {
  const [employees, setEmployees] = useState<AIEmployee[]>(() => [
    {
      id: 'emp_sarah',
      organizationId: 'org_seed',
      workspaceId: 'ws_seed',
      name: 'Sarah',
      roleTitle: 'Outbound Sales Agent',
      status: 'Active',
      llmModel: 'gpt-4o',
      systemPrompt: 'You are Sarah, an outbound sales coordinator. Your goal is to qualify leads and schedule a callback demo. Be friendly, polite, and direct. Keep responses short.',
      temperature: 0.7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  const [selectedEmp, setSelectedEmp] = useState<AIEmployee | null>(() => {
    const defaultList = [
      {
        id: 'emp_sarah',
        organizationId: 'org_seed',
        workspaceId: 'ws_seed',
        name: 'Sarah',
        roleTitle: 'Outbound Sales Agent',
        status: 'Active' as const,
        llmModel: 'gpt-4o',
        systemPrompt: 'You are Sarah, an outbound sales coordinator. Your goal is to qualify leads and schedule a callback demo. Be friendly, polite, and direct. Keep responses short.',
        temperature: 0.7,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    return defaultList[0];
  });
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Form states for creating new employee
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [llmModel, setLlmModel] = useState('gpt-4o');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch employees
  const loadEmployees = async () => {
    try {
      const res = await fetch('/api/employees');
      if (res.ok) {
        const result = await res.json();
        setEmployees(result.data as AIEmployee[]);
      }
    } catch (e) {
      console.error('Failed to load employees:', e);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !roleTitle || !systemPrompt) {
      setFormError('Please fill in required fields.');
      return;
    }

    setLoading(true);
    setFormError('');

    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, roleTitle, systemPrompt, temperature, llmModel }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to deploy employee.');
      }

      await loadEmployees();
      setSelectedEmp(result.data as AIEmployee);
      setShowCreateModal(false);
      setName('');
      setRoleTitle('');
      setSystemPrompt('');
      setTemperature(0.7);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Deployment failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (emp: AIEmployee) => {
    const nextStatus: AIEmployee['status'] = emp.status === 'Active' ? 'Paused' : 'Active';
    try {
      const res = await fetch('/api/employees', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: emp.id, status: nextStatus }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to update employee status.');
      }
      const updated = result.data as AIEmployee;
      setEmployees(employees.map(e => e.id === emp.id ? updated : e));
      setSelectedEmp(updated);
    } catch (e) {
      console.error('Failed to toggle status:', e);
    }
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <BrainCircuit className="h-6 w-6 text-violet-400 mr-2" />
            AI Employee Workforce
          </h1>
          <p className="text-xs text-zinc-400">Configure, monitor, and deploy digital workers across channels.</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Deploy Worker</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Employees List (Col span 4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 p-4 space-y-3">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Digital Workers</h3>
            {employees.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center">No AI Employees deployed yet.</p>
            ) : (
              <div className="space-y-2">
                {employees.map((emp) => {
                  const isSelected = selectedEmp?.id === emp.id;
                  return (
                    <button
                      key={emp.id}
                      onClick={() => {
                        setSelectedEmp(emp);
                        setActiveTab('overview');
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-violet-500/30 bg-violet-600/5 text-white'
                          : 'border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-zinc-800'
                      }`}
                    >
                      <div className="min-w-0 flex-1 space-y-1">
                        <p className="text-sm font-bold truncate text-white">{emp.name}</p>
                        <p className="text-[10px] text-zinc-500 truncate font-semibold uppercase">{emp.roleTitle}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        emp.status === 'Active' ? 'bg-emerald-950/40 text-emerald-450 border border-emerald-500/20' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                      }`}>
                        {emp.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Employee Panel Details (Col span 8) */}
        <div className="lg:col-span-8">
          {selectedEmp ? (
            <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-6">
              {/* Panel Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-5 gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="h-12 w-12 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-lg">
                    {selectedEmp.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">{selectedEmp.name}</h2>
                    <p className="text-xs text-zinc-400">{selectedEmp.roleTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleStatusToggle(selectedEmp)}
                    className="flex items-center space-x-1.5"
                  >
                    {selectedEmp.status === 'Active' ? (
                      <>
                        <Pause className="h-3.5 w-3.5 text-zinc-400" />
                        <span>Pause Agent</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 text-emerald-450 animate-pulse" />
                        <span>Activate</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Tabs Selector */}
              <div className="flex border-b border-zinc-900 gap-1 overflow-x-auto pb-px">
                {(['overview', 'knowledge', 'channels', 'analytics', 'configuration'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 border-b-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? 'border-violet-500 text-white'
                        : 'border-transparent text-zinc-500 hover:text-zinc-350'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="pt-2">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-900 space-y-1">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Engine Model</span>
                        <p className="text-sm font-semibold text-white">{selectedEmp.llmModel}</p>
                      </div>
                      <div className="bg-zinc-950/40 p-4 rounded-xl border border-zinc-900 space-y-1">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Language Settings</span>
                        <p className="text-sm font-semibold text-white flex items-center">
                          <Globe className="h-3.5 w-3.5 text-violet-400 mr-1.5" />
                          English (US - Neutral Outbound)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">System Prompt Guidelines</h4>
                      <div className="bg-zinc-950/70 p-4 rounded-xl border border-zinc-900 text-xs text-zinc-400 font-mono leading-relaxed whitespace-pre-wrap">
                        {selectedEmp.systemPrompt}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'knowledge' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3.5 bg-zinc-950/40 border border-zinc-900 p-4 rounded-xl">
                      <Database className="h-5 w-5 text-indigo-400" />
                      <div>
                        <p className="text-xs font-bold text-white">Default Knowledge Store Connected</p>
                        <p className="text-[10px] text-zinc-555">Active semantic RAG references enabled for this digital employee.</p>
                      </div>
                    </div>
                    <div className="divide-y divide-zinc-900 border border-zinc-900 rounded-xl overflow-hidden bg-zinc-950/20">
                      <div className="p-3.5 text-xs text-zinc-400 flex items-center justify-between">
                        <span className="flex items-center"><FileText className="h-4 w-4 text-zinc-500 mr-2" /> Company_Policy_Guidelines_2026.pdf</span>
                        <span className="text-[10px] text-zinc-500 uppercase font-semibold">Enabled</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'channels' && (
                  <div className="space-y-4">
                    <p className="text-xs text-zinc-400">Assigned communications gateways for this AI worker:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Network className="h-5 w-5 text-violet-400" />
                          <div>
                            <p className="text-xs font-bold text-white">Office Telephony</p>
                            <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Voice Gateway</p>
                          </div>
                        </div>
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" title="Healthy"></span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 text-center">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Calls Resolved</span>
                        <p className="text-xl font-bold text-white mt-1">42</p>
                      </div>
                      <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 text-center">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Average Sentiment</span>
                        <p className="text-xl font-bold text-emerald-450 mt-1">0.82</p>
                      </div>
                      <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 text-center">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Lead Hand-offs</span>
                        <p className="text-xl font-bold text-white mt-1">11</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'configuration' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label>LLM Model</Label>
                        <Input value={selectedEmp.llmModel} readOnly className="bg-zinc-900 text-zinc-400" />
                      </div>
                      <div className="space-y-1">
                        <Label>Temperature Setting</Label>
                        <Input value={selectedEmp.temperature.toString()} readOnly className="bg-zinc-900 text-zinc-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 py-16 text-center text-zinc-500">
              Select or deploy an AI employee to inspect configuration panels.
            </div>
          )}
        </div>
      </div>

      {/* Deploy Employee Modal Drawer */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-lg border border-zinc-850 bg-zinc-950 rounded-2xl p-6 shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center">
                <BrainCircuit className="h-5 w-5 text-violet-400 mr-2" />
                Deploy AI Operator Card
              </h3>
              <p className="text-xs text-zinc-400">Specify details to launch a new digital agent in the active workspace.</p>
            </div>

            {formError && (
              <div className="flex items-center space-x-2 bg-red-950/20 border border-red-900/30 text-red-400 p-3 rounded-lg text-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="empName">Agent name</Label>
                  <Input
                    id="empName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="roleTitle">Role title</Label>
                  <Input
                    id="roleTitle"
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    placeholder="Outbound Lead Qualifier"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="model">LLM Model</Label>
                  <select
                    id="model"
                    value={llmModel}
                    onChange={(e) => setLlmModel(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                  >
                    <option value="gpt-4o">GPT-4o (OpenAI)</option>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash (Google)</option>
                    <option value="claude-3-haiku">Claude 3 Haiku (Anthropic)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="temp">Temperature ({temperature})</Label>
                  <Input
                    id="temp"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="prompt">System prompt instruction template</Label>
                <Textarea
                  id="prompt"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Describe agent guidelines, response boundaries, and system parameters..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={loading}
                  className="flex items-center space-x-1.5"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Deploying...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4" />
                      <span>Deploy Agent</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
