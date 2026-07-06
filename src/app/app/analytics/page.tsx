'use client';

import React from 'react';
import {
  BarChart3,
  Phone,
  MessageSquare,
  TrendingUp,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';

interface MetricItem {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
}

export default function AnalyticsPage() {
  const cards: MetricItem[] = [
    { label: 'Total Call Engagements', value: '4,891', sub: 'Last 30 days summary', icon: <Phone className="h-5 w-5 text-emerald-450" /> },
    { label: 'SMS & WhatsApp Messages', value: '34,204', sub: 'Last 30 days summary', icon: <MessageSquare className="h-5 w-5 text-cyan-400" /> },
    { label: 'Automation Success Rate', value: '99.82%', sub: 'Last 30 days summary', icon: <Zap className="h-5 w-5 text-amber-400" /> },
    { label: 'Average Interaction Time', value: '2m 14s', sub: 'Outbound calls average', icon: <Clock className="h-5 w-5 text-violet-400" /> }
  ];

  // Componentized native CSS charts metrics
  const callDistribution = [
    { label: '08:00 AM', percentage: 35, count: 142 },
    { label: '11:00 AM', percentage: 75, count: 489 },
    { label: '02:00 PM', percentage: 95, count: 612 },
    { label: '05:00 PM', percentage: 55, count: 320 },
    { label: '08:00 PM', percentage: 20, count: 98 },
  ];

  const intentPerformance = [
    { name: 'Pricing & Tiers Queries', percentage: '94%', count: 1802 },
    { name: 'Meeting Scheduling requests', percentage: '88%', count: 1204 },
    { name: 'Feature Capabilities checks', percentage: '91%', count: 984 },
    { name: 'Human agent escalation triggers', percentage: '3.4%', count: 42 }
  ];

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <BarChart3 className="h-6 w-6 text-violet-400 mr-2" />
            Workspace Analytics & Telemetry
          </h1>
          <p className="text-xs text-zinc-400">Track concurrent call distribution, intent resolutions, and pipeline latency.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="border border-zinc-900 bg-zinc-900/10 p-5 rounded-2xl space-y-3 hover:border-zinc-850 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500">{card.label}</span>
              <div className="h-8 w-8 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-center">
                {card.icon}
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-white tracking-tight">{card.value}</p>
              <span className="text-[10px] text-zinc-555">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Native Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Call distribution over time (Col span 7) */}
        <div className="lg:col-span-7 border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <TrendingUp className="h-4.5 w-4.5 text-violet-400 mr-1.5" />
              Concurrent Call Loading (Today)
            </h3>
            <p className="text-xs text-zinc-500">Distribution of concurrent telephone calls active across outbound networks.</p>
          </div>

          {/* Graph bars */}
          <div className="flex items-end justify-between h-48 pt-6 border-b border-zinc-900 select-none">
            {callDistribution.map((col, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 space-y-3 group">
                <div className="relative w-full flex justify-center">
                  {/* Tooltip */}
                  <span className="absolute -top-7 scale-0 group-hover:scale-100 bg-zinc-900 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-zinc-800 transition-all z-10">
                    {col.count} calls
                  </span>
                  <div
                    className="w-8 sm:w-12 bg-gradient-to-t from-violet-600 to-indigo-500 rounded-t-lg transition-all duration-500 group-hover:from-violet-500 group-hover:to-indigo-400 shadow-lg shadow-indigo-550/10"
                    style={{ height: `${col.percentage * 1.5}px` }}
                  ></div>
                </div>
                <span className="text-[10px] text-zinc-500 font-bold font-mono tracking-tighter pb-2">{col.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Intent Resolutions (Col span 5) */}
        <div className="lg:col-span-5 border border-zinc-900 rounded-2xl bg-zinc-900/10 p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center">
              <Sparkles className="h-4.5 w-4.5 text-violet-400 mr-1.5 animate-pulse" />
              Intent Detection Performance
            </h3>
            <p className="text-xs text-zinc-500">Accuracy check of the LLM parser categorizing customer intents.</p>
          </div>

          <div className="space-y-4">
            {intentPerformance.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-350">{item.name}</span>
                  <span className="text-white font-mono">{item.percentage} ({item.count})</span>
                </div>
                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-zinc-950 border border-zinc-900 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full"
                    style={{ width: item.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
