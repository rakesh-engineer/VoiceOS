'use client';

import React from 'react';
import { BarChart3, TrendingUp, Clock, Users, ArrowUpRight, Activity } from 'lucide-react';

export default function AnalyticsPreview() {
  return (
    <section id="analytics" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-violet-900/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            Management Portal
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            Real-time Operational Telemetry
          </h3>
          <p className="text-lg text-zinc-450 leading-relaxed font-normal">
            Track dialogue latency, agent concurrency, success metrics, and integration triggers from an administrative cockpit.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-950 shadow-2xl overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="px-6 py-4 border-b border-zinc-900 bg-zinc-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2.5">
              <Activity className="h-4.5 w-4.5 text-violet-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">VoiceOS Analytics Cockpit</span>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-mono text-zinc-550">
              <span>Environment: Production</span>
              <span className="h-3 w-px bg-zinc-900"></span>
              <span className="text-emerald-450">All Systems Operational</span>
            </div>
          </div>

          {/* Grid Layout inside Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-900">
            
            {/* Left 8 columns: Metrics & Chart */}
            <div className="lg:col-span-8 p-6 space-y-6">
              
              {/* Metric grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-zinc-900/10 border border-zinc-900 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-zinc-500 mb-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-[9px] uppercase font-bold tracking-wider">Today&apos;s Calls</span>
                  </div>
                  <p className="text-xl font-bold text-white font-mono">14,293</p>
                  <span className="text-[10px] text-emerald-400 mt-1 block font-mono">+12.4% vs yesterday</span>
                </div>

                <div className="bg-zinc-900/10 border border-zinc-900 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-zinc-500 mb-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-[9px] uppercase font-bold tracking-wider">Success Rate</span>
                  </div>
                  <p className="text-xl font-bold text-white font-mono">99.82%</p>
                  <span className="text-[10px] text-zinc-500 mt-1 block font-mono">Intent threshold: 95%</span>
                </div>

                <div className="bg-zinc-900/10 border border-zinc-900 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-zinc-500 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-[9px] uppercase font-bold tracking-wider">Response Time</span>
                  </div>
                  <p className="text-xl font-bold text-white font-mono">1.12s</p>
                  <span className="text-[10px] text-emerald-400 mt-1 block font-mono">-0.15s improvement</span>
                </div>

                <div className="bg-zinc-900/10 border border-zinc-900 p-4 rounded-xl">
                  <div className="flex items-center justify-between text-zinc-500 mb-2">
                    <Users className="h-4 w-4" />
                    <span className="text-[9px] uppercase font-bold tracking-wider">AI Staff Online</span>
                  </div>
                  <p className="text-xl font-bold text-white font-mono">72 / 100</p>
                  <span className="text-[10px] text-zinc-500 mt-1 block font-mono">Autoscaling enabled</span>
                </div>
              </div>

              {/* Chart Placeholder (using highly aesthetic pure CSS grid bars similar to Stripe dashboards) */}
              <div className="bg-zinc-900/10 border border-zinc-900 p-6 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-white tracking-tight">Call Volume Concurrency</h5>
                    <p className="text-[10px] text-zinc-500">Live call sessions handled simultaneously during peak intervals</p>
                  </div>
                  <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono px-2 py-0.5 rounded">
                    Max Spike: 480 calls
                  </span>
                </div>

                {/* Graph bars */}
                <div className="h-32 flex items-end justify-between gap-1.5 pt-4 border-b border-zinc-900">
                  <div className="w-full bg-zinc-900 rounded-t h-[40%] hover:bg-violet-600 transition-colors"></div>
                  <div className="w-full bg-zinc-900 rounded-t h-[30%] hover:bg-violet-600 transition-colors"></div>
                  <div className="w-full bg-zinc-900 rounded-t h-[20%] hover:bg-violet-600 transition-colors"></div>
                  <div className="w-full bg-zinc-900 rounded-t h-[50%] hover:bg-violet-600 transition-colors"></div>
                  <div className="w-full bg-zinc-900 rounded-t h-[70%] hover:bg-violet-600 transition-colors"></div>
                  <div className="w-full bg-zinc-900 rounded-t h-[65%] hover:bg-violet-600 transition-colors"></div>
                  <div className="w-full bg-violet-600/30 rounded-t h-[80%] hover:bg-violet-500 transition-colors"></div>
                  <div className="w-full bg-violet-600/50 rounded-t h-[95%] hover:bg-violet-500 transition-colors"></div>
                  <div className="w-full bg-violet-600 rounded-t h-[85%] hover:bg-violet-500 transition-colors"></div>
                  <div className="w-full bg-zinc-900 rounded-t h-[60%] hover:bg-violet-600 transition-colors"></div>
                  <div className="w-full bg-zinc-900 rounded-t h-[40%] hover:bg-violet-600 transition-colors"></div>
                  <div className="w-full bg-zinc-900 rounded-t h-[30%] hover:bg-violet-600 transition-colors"></div>
                </div>

                {/* Graph bottom indicators */}
                <div className="flex items-center justify-between text-[8px] font-mono font-bold text-zinc-650">
                  <span>08:00 AM</span>
                  <span>12:00 PM</span>
                  <span>04:00 PM</span>
                  <span>08:00 PM</span>
                </div>
              </div>

            </div>

            {/* Right 4 columns: Audit trail logs */}
            <div className="lg:col-span-4 p-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Live Automation Feed</h5>
                
                <div className="space-y-3.5 max-h-[230px] overflow-y-auto pr-1">
                  
                  <div className="text-[11px] leading-relaxed border-l-2 border-emerald-500 pl-3">
                    <p className="text-zinc-300 font-semibold">HubSpot CRM Synced</p>
                    <p className="text-zinc-550 text-[10px] mt-0.5">Lead scored: 95/100 (Hot) • 2s ago</p>
                  </div>

                  <div className="text-[11px] leading-relaxed border-l-2 border-violet-500 pl-3">
                    <p className="text-zinc-300 font-semibold">WhatsApp Dispatched</p>
                    <p className="text-zinc-550 text-[10px] mt-0.5">Booking confirmation & leaflet delivery • 12s ago</p>
                  </div>

                  <div className="text-[11px] leading-relaxed border-l-2 border-indigo-500 pl-3">
                    <p className="text-zinc-300 font-semibold">Epic EHR Updated</p>
                    <p className="text-zinc-550 text-[10px] mt-0.5">Appointment moved Wednesday 10:30 AM • 45s ago</p>
                  </div>

                  <div className="text-[11px] leading-relaxed border-l-2 border-amber-500 pl-3">
                    <p className="text-zinc-300 font-semibold">n8n Execution Successful</p>
                    <p className="text-zinc-550 text-[10px] mt-0.5">Triggered webhook route: voice-os-demo • 2m ago</p>
                  </div>

                </div>
              </div>

              {/* Action Call */}
              <div className="pt-6 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-550 hover:text-zinc-300 cursor-pointer transition-colors group">
                <span>View Full Telemetry Dashboard</span>
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
