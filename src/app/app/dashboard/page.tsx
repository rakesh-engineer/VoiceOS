'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BrainCircuit,
  Phone,
  MessageSquare,
  Activity,
  Workflow,
  Sparkles,
  Link2,
  Users,
  ShieldAlert,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<MetricCard[]>(() => [
    { title: 'AI Employees Deployed', value: '0', change: 'Operational', isPositive: true, icon: <BrainCircuit className="h-5 w-5 text-violet-400" /> },
    { title: 'Active Channels Connected', value: '0', change: 'Operational', isPositive: true, icon: <Link2 className="h-5 w-5 text-indigo-400" /> },
    { title: "Today's Call Engagements", value: '0', change: 'Operational', isPositive: true, icon: <Phone className="h-5 w-5 text-emerald-450" /> },
    { title: "Today's Workspaces Partition", value: '0', change: 'Operational', isPositive: true, icon: <MessageSquare className="h-5 w-5 text-cyan-400" /> },
    { title: 'Workflow Actions Run', value: '0', change: 'Operational', isPositive: true, icon: <Workflow className="h-5 w-5 text-amber-400" /> },
  ]);

  const [latestActivity, setLatestActivity] = useState<Array<{ id: string; time: string; type: string; details: string }>>(() => []);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch('/api/dashboard');
        if (res.ok) {
          const result = await res.json();
          const d = result.data;
          
          setMetrics([
            { title: 'AI Employees Deployed', value: String(d.employeesCount), change: 'Draft to Active', isPositive: true, icon: <BrainCircuit className="h-5 w-5 text-violet-400" /> },
            { title: 'Active Channels Connected', value: String(d.channelsCount), change: 'Voice & WhatsApp', isPositive: true, icon: <Link2 className="h-5 w-5 text-indigo-400" /> },
            { title: "Today's Call Engagements", value: String(d.callsCount), change: 'Live queries', isPositive: true, icon: <Phone className="h-5 w-5 text-emerald-450" /> },
            { title: "Today's Workspaces Partition", value: String(d.workspacesCount), change: 'Workspace slots', isPositive: true, icon: <MessageSquare className="h-5 w-5 text-cyan-400" /> },
            { title: 'Workflow Actions Run', value: String(d.workflowsCount), change: '99.8% Success Rate', isPositive: true, icon: <Workflow className="h-5 w-5 text-amber-400" /> },
          ]);

          setLatestActivity(d.activities);
        }
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      }
    }
    loadDashboard();
  }, []);

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-violet-950/20 to-indigo-950/10 border border-zinc-900 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center">
            Hello Workspace Admin <Sparkles className="h-5 w-5 text-violet-400 ml-2 animate-pulse" />
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">Your autonomous digital workforce is active and operating 24/7.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/app/ai-employees" className="inline-flex items-center space-x-2 text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md">
            <span>Configure AI Employee</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="border border-zinc-900 bg-zinc-900/10 backdrop-blur-sm p-5 rounded-2xl space-y-4 hover:border-zinc-850 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-550">{metric.title}</span>
              <div className="h-9 w-9 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-center">
                {metric.icon}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-extrabold text-white tracking-tight">{metric.value}</p>
              <div className="flex items-center text-[10px] font-bold text-zinc-400 gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-450" />
                <span className="text-emerald-450 font-semibold">{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Layout (Two Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Recent logs and activities */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                <Activity className="h-4.5 w-4.5 text-violet-400 mr-2" />
                Latest Operations Log
              </h3>
              <Link href="/app/analytics" className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">
                <span>View Full Telemetry</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* List */}
            <div className="divide-y divide-zinc-900">
              {latestActivity.map((act) => (
                <div key={act.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <div className="h-2 w-2 rounded-full bg-violet-550 shrink-0 mt-2 animate-pulse"></div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{act.type}</span>
                      <span className="text-[10px] text-zinc-500 font-medium">{act.time}</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">{act.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Links & Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions Card */}
          <div className="border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Link href="/app/ai-employees" className="w-full text-left bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 px-4 py-3 rounded-xl text-xs font-bold text-white transition-colors flex justify-between items-center cursor-pointer">
                <span>Deploy New AI Agent</span>
                <BrainCircuit className="h-4 w-4 text-violet-400" />
              </Link>
              <Link href="/app/channels" className="w-full text-left bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 px-4 py-3 rounded-xl text-xs font-bold text-white transition-colors flex justify-between items-center cursor-pointer">
                <span>Link Phone / Twilio Number</span>
                <Link2 className="h-4 w-4 text-indigo-400" />
              </Link>
              <Link href="/app/team" className="w-full text-left bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 px-4 py-3 rounded-xl text-xs font-bold text-white transition-colors flex justify-between items-center cursor-pointer">
                <span>Invite Developers</span>
                <Users className="h-4 w-4 text-emerald-450" />
              </Link>
            </div>
          </div>

          {/* Security Alert Card */}
          <div className="border border-red-950/20 bg-red-950/5 p-6 rounded-2xl flex gap-3.5">
            <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">Production Guard Sandbox</h4>
              <p className="text-[11px] text-zinc-400 leading-normal">
                VoiceOS is currently running on the development sandbox API keys. Production telephone numbers require subscription verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
