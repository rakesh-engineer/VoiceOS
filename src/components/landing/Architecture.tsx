'use client';

import React from 'react';
import {
  PhoneCall,
  Settings,
  Cpu,
  Workflow,
  Share2,
  ChevronRight,
  ChevronDown,
  Database,
  MessageSquare,
  CalendarDays
} from 'lucide-react';
import { nodes, outputs } from '@/constants/landingData';

const nodeIconMap: Record<string, React.ReactNode> = {
  'phone-call': <PhoneCall className="h-6 w-6" />,
  'settings': <Settings className="h-6 w-6" />,
  'cpu': <Cpu className="h-6 w-6" />,
  'workflow': <Workflow className="h-6 w-6" />,
};

const outputIconMap: Record<string, React.ReactNode> = {
  'database': <Database className="h-4 w-4" />,
  'message-square': <MessageSquare className="h-4 w-4" />,
  'calendar-days': <CalendarDays className="h-4 w-4" />,
};

export default function Architecture() {
  return (
    <section id="architecture" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            System Architecture
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How VoiceOS Automates Calls
          </h3>
          <p className="text-base sm:text-lg text-zinc-400">
            A real-time data orchestration pipeline designed to connect incoming voice queries with enterprise APIs in milliseconds.
          </p>
        </div>

        {/* Visual Workflow Nodes */}
        <div className="relative">
          {/* Main timeline grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch relative">
            
            {/* Step 1 to 4 */}
            {nodes.map((node, index) => (
              <div key={node.id} className="flex flex-col relative group">
                
                {/* Node Card */}
                <div className={`flex-1 rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] bg-zinc-900/10 hover:bg-zinc-900/30 ${node.colorClass}`}>
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-300">
                      {nodeIconMap[node.iconId] || <Settings className="h-6 w-6" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">{node.label}</h4>
                      <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">{node.subtitle}</p>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{node.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                    <span>Component</span>
                    <span className="font-mono">Step 0{index + 1}</span>
                  </div>
                </div>

                {/* Arrow to next node (desktop: right, mobile: down) */}
                {index < nodes.length && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-20 text-zinc-700 pointer-events-none">
                    <ChevronRight className="h-5 w-5 animate-[pulse_1.5s_infinite]" />
                  </div>
                )}

                {/* Mobile indicators */}
                <div className="flex lg:hidden justify-center my-4 text-zinc-700 last:hidden">
                  <ChevronDown className="h-6 w-6 animate-bounce" />
                </div>
              </div>
            ))}

            {/* Output Node (Step 5) */}
            <div className="flex flex-col relative group">
              <div className="flex-1 rounded-2xl border border-indigo-950/20 bg-indigo-950/10 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-950/20">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-indigo-400">
                    <Share2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">System Actions</h4>
                    <p className="text-xs text-indigo-400/80 font-semibold uppercase tracking-wider mt-0.5">API integrations</p>
                  </div>
                  
                  {/* Action Targets */}
                  <div className="space-y-2 pt-2">
                    {outputs.map((out, idx) => (
                      <div key={idx} className="flex items-center space-x-3 bg-zinc-950/80 border border-zinc-900 p-2 rounded-lg">
                        <div className="h-7 w-7 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                          {outputIconMap[out.iconId] || <Database className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{out.label}</p>
                          <p className="text-[9px] text-zinc-500">{out.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                  <span>Destinations</span>
                  <span className="font-mono">Step 05</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
