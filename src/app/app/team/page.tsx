'use client';

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  Loader2,
  Trash2,
  CheckCircle2,
  X,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { UserRole } from '@/types';

interface MemberItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Pending';
}

export default function TeamPage() {
  const [members, setMembers] = useState<MemberItem[]>(() => [
    { id: 'usr_seed_1', name: 'Alex Founder', email: 'founder@acme.com', role: 'Owner', status: 'Active' },
    { id: 'usr_seed_2', name: 'Jane Admin', email: 'jane@acme.com', role: 'Admin', status: 'Active' },
    { id: 'usr_seed_3', name: 'Bob Dev', email: 'bob@acme.com', role: 'Developer', status: 'Active' }
  ]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('Viewer');
  const [inviteName, setInviteName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    setLoading(true);
    setTimeout(() => {
      const newMember: MemberItem = {
        id: `mem_${Math.random().toString(36).substring(2, 11)}`,
        name: inviteName || 'Pending Invite',
        email: inviteEmail,
        role: inviteRole,
        status: 'Pending'
      };

      setMembers([...members, newMember]);
      setLoading(false);
      setSuccessMsg('Invitation successfully dispatched.');
      setInviteEmail('');
      setInviteName('');
      setInviteRole('Viewer');

      setTimeout(() => {
        setSuccessMsg('');
        setShowInviteModal(false);
      }, 1500);
    }, 800);
  };

  const handleRoleChange = (id: string, role: UserRole) => {
    setMembers(members.map(m => m.id === id ? { ...m, role } : m));
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const roleColors: Record<UserRole, string> = {
    Owner: 'bg-red-950/40 text-red-400 border-red-900/30',
    Admin: 'bg-amber-950/40 text-amber-400 border-amber-900/30',
    Developer: 'bg-violet-950/40 text-violet-400 border-violet-900/30',
    Operator: 'bg-cyan-950/40 text-cyan-400 border-cyan-900/30',
    Viewer: 'bg-zinc-900 text-zinc-400 border-zinc-800'
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <Users className="h-6 w-6 text-violet-400 mr-2" />
            Team Members & Access Control
          </h1>
          <p className="text-xs text-zinc-400">Invite developers, assign RBAC privileges, and audit active users.</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowInviteModal(true)}
          className="flex items-center space-x-1.5"
        >
          <UserPlus className="h-4 w-4" />
          <span>Invite Member</span>
        </Button>
      </div>

      {/* Members List Table */}
      <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 overflow-hidden">
        <div className="p-4 border-b border-zinc-900 text-xs font-bold text-zinc-555 uppercase tracking-wider">
          Workspace Users
        </div>

        <div className="divide-y divide-zinc-900">
          {members.map((member) => (
            <div key={member.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/10 transition-all">
              <div className="flex items-center space-x-3.5 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-center font-bold text-sm uppercase text-violet-400 shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate flex items-center">
                    {member.name}
                    {member.status === 'Pending' && (
                      <span className="ml-2 text-[8px] bg-zinc-900 text-zinc-500 font-bold px-1.5 py-0.5 rounded border border-zinc-800 uppercase">
                        Pending
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-zinc-500 truncate">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Role Switcher */}
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value as UserRole)}
                  disabled={member.role === 'Owner'}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none bg-zinc-950 ${roleColors[member.role]}`}
                >
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Developer">Developer</option>
                  <option value="Operator">Operator</option>
                  <option value="Viewer">Viewer</option>
                </select>

                {member.role !== 'Owner' && (
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="text-zinc-600 hover:text-red-400 p-2 rounded hover:bg-zinc-900 transition-colors"
                    title="Remove access"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md border border-zinc-850 bg-zinc-950 rounded-2xl p-6 shadow-2xl relative space-y-6">
            <button onClick={() => setShowInviteModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center">
                <UserPlus className="h-5 w-5 text-violet-400 mr-2" />
                Invite Workspace Developer
              </h3>
              <p className="text-xs text-zinc-400">Send an invitation to join the active tenant organization.</p>
            </div>

            {successMsg ? (
              <div className="flex items-center space-x-2 bg-emerald-950/20 border border-emerald-900/30 text-emerald-450 p-4 rounded-lg text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="memberName">Name (Optional)</Label>
                  <Input
                    id="memberName"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="memberEmail">Work email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                      id="memberEmail"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="john@company.com"
                      className="pl-11"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="memberRole">Assign Privilege Role</Label>
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <select
                      id="memberRole"
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as UserRole)}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/50 pl-11 pr-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                    >
                      <option value="Admin">Admin (Configure + Manage users)</option>
                      <option value="Developer">Developer (Deploy agents & workflows)</option>
                      <option value="Operator">Operator (Edit prompts & toggle status)</option>
                      <option value="Viewer">Viewer (Read-only reports)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                  <Button variant="secondary" size="sm" onClick={() => setShowInviteModal(false)}>Cancel</Button>
                  <Button type="submit" variant="primary" size="sm" disabled={loading} className="flex items-center space-x-1.5">
                    {loading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Invite</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
