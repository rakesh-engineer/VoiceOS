'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Key,
  CreditCard,
  Sliders,
  CheckCircle2,
  Copy,
  Trash2,
  Link2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface ApiKeyItem {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
}

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [generatedKey, setGeneratedKey] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'keys' | 'billing' | 'branding' | 'integrations'>('keys');

  const loadKeys = async () => {
    try {
      const res = await fetch('/api/keys');
      if (res.ok) {
        const result = await res.json();
        setApiKeys(result.data);
      }
    } catch (e) {
      console.error('Failed to load keys:', e);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadKeys();
  }, []);

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;

    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to generate key.');
      }
      setGeneratedKey(result.data.plaintextKey);
      await loadKeys();
      setNewKeyName('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      const res = await fetch(`/api/keys?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await loadKeys();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccessMsg('API Token copied to clipboard.');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-900 flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <Settings className="h-6 w-6 text-violet-400 mr-2" />
            Workspace Settings
          </h1>
          <p className="text-xs text-zinc-400">Configure workspace integrations, API tokens, and subscription billing.</p>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center space-x-2 bg-emerald-950/20 border border-emerald-900/30 text-emerald-450 p-4 rounded-xl text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Sub Tabs Selection */}
      <div className="flex border-b border-zinc-900 gap-2 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveSubTab('keys')}
          className={`px-4 py-2 border-b-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'keys' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-350'
          }`}
        >
          Developer API Keys
        </button>
        <button
          onClick={() => setActiveSubTab('billing')}
          className={`px-4 py-2 border-b-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'billing' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-350'
          }`}
        >
          Billing & Usage
        </button>
        <button
          onClick={() => setActiveSubTab('branding')}
          className={`px-4 py-2 border-b-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'branding' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-350'
          }`}
        >
          Custom Branding
        </button>
        <button
          onClick={() => setActiveSubTab('integrations')}
          className={`px-4 py-2 border-b-2 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'integrations' ? 'border-violet-500 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-350'
          }`}
        >
          Integrations Hub
        </button>
      </div>

      {/* Content */}
      <div className="pt-2">
        {activeSubTab === 'keys' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Create Key (Col span 5) */}
            <div className="lg:col-span-5 border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center">
                <Key className="h-4 w-4 text-violet-400 mr-1.5" />
                Generate API Credentials
              </h4>

              {generatedKey ? (
                <div className="space-y-4 p-4 rounded-xl border border-violet-900/30 bg-violet-650/5 text-xs">
                  <div className="space-y-1 text-zinc-300">
                    <p className="font-bold text-white">Save your Secret Token</p>
                    <p className="text-[10px] text-zinc-400 leading-normal">
                      For security, this token is only displayed once. Please copy and store it securely.
                    </p>
                  </div>
                  <div className="flex bg-zinc-950 p-2 border border-zinc-800 rounded-lg select-none items-center justify-between gap-2">
                    <span className="font-mono text-[10px] truncate text-violet-400">{generatedKey}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(generatedKey)}
                      className="text-zinc-500 hover:text-white"
                      title="Copy token"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setGeneratedKey('')} className="w-full">
                    Done
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleCreateKey} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="keyName">Token descriptive name</Label>
                    <Input
                      id="keyName"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="e.g. n8n Outbound integration"
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary" size="sm" disabled={!newKeyName} className="w-full py-2.5">
                    Generate Secret Key
                  </Button>
                </form>
              )}
            </div>

            {/* Keys list (Col span 7) */}
            <div className="lg:col-span-7 border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Active Workspace API Keys</h4>
              {apiKeys.length === 0 ? (
                <p className="text-xs text-zinc-500 py-6 text-center">No active API keys created.</p>
              ) : (
                <div className="divide-y divide-zinc-900">
                  {apiKeys.map((k) => (
                    <div key={k.id} className="py-3 flex items-center justify-between text-xs hover:bg-zinc-900/20 px-2 rounded-lg transition-colors gap-4">
                      <div>
                        <p className="font-bold text-white">{k.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Prefix: {k.keyPrefix} | Created: {k.createdAt}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteKey(k.id)}
                        className="text-zinc-650 hover:text-red-400 p-1.5 rounded hover:bg-zinc-900 transition-colors"
                        title="Revoke credentials"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeSubTab === 'billing' && (
          <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-6">
            <div className="flex justify-between items-start gap-4 pb-4 border-b border-zinc-900">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                  <CreditCard className="h-4.5 w-4.5 text-violet-400 mr-2" />
                  Subscription Plan Tier
                </h3>
                <p className="text-xs text-zinc-400">Manage payment profiles and usage metrics limits.</p>
              </div>
              <span className="text-xs font-bold bg-violet-600/10 border border-violet-500/20 text-violet-400 px-3 py-1 rounded-full uppercase">
                Developer Sandbox Plan
              </span>
            </div>

            {/* Usage meters */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-400">Monthly Concurrent Call Minutes</span>
                  <span className="text-white">124 / 1,000 minutes</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-950 border border-zinc-900 overflow-hidden">
                  <div className="h-full bg-violet-600 rounded-full" style={{ width: '12.4%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'branding' && (
          <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center">
              <Sliders className="h-4 w-4 text-violet-400 mr-1.5" />
              Corporate Layout Customizations
            </h4>
            <p className="text-xs text-zinc-400 leading-normal">
              Upgrade to the **Pro** or **Enterprise** subscription tier to unlock custom domains, white-labeled call dashboards, custom webhook routing schemas, and company logo uploads.
            </p>
          </div>
        )}

        {activeSubTab === 'integrations' && (
          <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center">
              <Link2 className="h-4 w-4 text-violet-400 mr-1.5" />
              Third-party SaaS Connectors
            </h4>
            <p className="text-xs text-zinc-400 leading-normal">
              VoiceOS supports standard outbound REST API mapping connectors for Salesforce, HubSpot, Zendesk, and Google Calendar. These integrations are configured dynamically inside n8n workflow triggers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
