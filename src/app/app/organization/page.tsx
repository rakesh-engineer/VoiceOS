'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  CheckCircle2,
  Loader2,
  FolderOpen,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

interface OrganizationState {
  id: string;
  name: string;
  slug: string;
}

interface WorkspaceItem {
  id: string;
  name: string;
  slug: string;
}

export default function OrganizationPage() {
  const [org, setOrg] = useState<OrganizationState | null>(null);
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [orgName, setOrgName] = useState('');
  const [orgSlug, setOrgSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Workspace creation
  const [newWsName, setNewWsName] = useState('');
  const [newWsSlug, setNewWsSlug] = useState('');
  const [wsLoading, setWsLoading] = useState(false);

  useEffect(() => {
    async function loadOrgData() {
      try {
        const res = await fetch('/api/orgs');
        if (res.ok) {
          const result = await res.json();
          setOrg(result.data.organization);
          setOrgName(result.data.organization.name);
          setOrgSlug(result.data.organization.slug);
          setWorkspaces(result.data.workspaces);
        }
      } catch (e) {
        console.error('Failed to load organization:', e);
      }
    }
    loadOrgData();
  }, []);

  const handleUpdateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (org) {
        setOrg({ ...org, name: orgName, slug: orgSlug });
      }
      setLoading(false);
      setSuccessMsg('Organization settings updated successfully.');
      setTimeout(() => setSuccessMsg(''), 2000);
    }, 800);
  };

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName) return;

    setWsLoading(true);
    setTimeout(() => {
      const slug = newWsSlug || newWsName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newWs: WorkspaceItem = {
        id: `ws_${Math.random().toString(36).substring(2, 11)}`,
        name: newWsName,
        slug
      };

      setWorkspaces([...workspaces, newWs]);
      setWsLoading(false);
      setNewWsName('');
      setNewWsSlug('');
    }, 800);
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-900">
        <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
          <Building2 className="h-6 w-6 text-violet-400 mr-2" />
          Organization Management
        </h1>
        <p className="text-xs text-zinc-400">Configure corporate identifiers, provision workspaces, and manage data parameters.</p>
      </div>

      {successMsg && (
        <div className="flex items-center space-x-2 bg-emerald-950/20 border border-emerald-900/30 text-emerald-450 p-4 rounded-xl text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Edit details (Col span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Company Profile</h3>

            <form onSubmit={handleUpdateOrg} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="orgName">Organization legal name</Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Acme Inc."
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="orgSlug">Workspace URL slug namespace</Label>
                <div className="flex rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                  <span className="px-3 py-2 text-xs font-semibold text-zinc-500 bg-zinc-900/40 select-none">
                    voiceos.ai/
                  </span>
                  <input
                    id="orgSlug"
                    value={orgSlug}
                    onChange={(e) => setOrgSlug(e.target.value)}
                    placeholder="acme-inc"
                    className="flex-1 bg-transparent px-3 py-2 text-xs font-semibold text-white focus:outline-none"
                    required
                  />
                </div>
              </div>

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
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Update Profile</span>
                )}
              </Button>
            </form>
          </div>

          {/* Delete Org Zone */}
          <div className="border border-red-950/20 bg-red-950/5 p-6 rounded-2xl space-y-4">
            <div className="flex items-center space-x-2 text-amber-500">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <h4 className="text-xs font-bold text-white">Danger Zone: Delete Organization</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Deleting this organization will permanently remove all digital AI Employees, active channel integrations, database records, and logs cascades. This action is irreversible.
            </p>
            <Button
              variant="secondary"
              className="border-red-900/40 hover:bg-red-950/10 text-red-400 text-xs py-2 px-4"
              disabled
            >
              Request Org Deletion
            </Button>
          </div>
        </div>

        {/* Right Column: Workspaces (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <FolderOpen className="h-4.5 w-4.5 text-violet-400 mr-2" />
              Workspaces ({workspaces.length})
            </h3>

            {/* List */}
            <div className="space-y-2">
              {workspaces.map((ws) => (
                <div key={ws.id} className="p-3 bg-zinc-950/40 border border-zinc-900 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{ws.name}</p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Namespace: {ws.slug}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Workspace Form */}
            <div className="pt-4 border-t border-zinc-900 space-y-4">
              <h4 className="text-xs font-bold text-white flex items-center">
                <Plus className="h-4 w-4 text-violet-400 mr-1.5" />
                Add Workspace Partition
              </h4>

              <form onSubmit={handleCreateWorkspace} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="wsName">Workspace name</Label>
                  <Input
                    id="wsName"
                    value={newWsName}
                    onChange={(e) => setNewWsName(e.target.value)}
                    placeholder="e.g., Customer Support Team"
                    className="py-1.5"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  disabled={wsLoading || !newWsName}
                  className="w-full py-2 text-xs flex justify-center items-center space-x-1.5"
                >
                  {wsLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <span>Create Workspace</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
