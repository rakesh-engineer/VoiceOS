'use client';

import React from 'react';
import { aiEmployees } from '@/constants/landingData';
import { Briefcase, Clock, Layers, ArrowUpRight } from 'lucide-react';
import { useScrollTo } from '@/hooks/useScrollTo';

export default function AIEmployees() {
  const scrollTo = useScrollTo();

  return (
    <section id="ai-employees" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            Specialized Agents
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            Deploy Pre-Trained AI Employees
          </h3>
          <p className="text-lg text-zinc-450 leading-relaxed font-normal">
            Autonomous digital staff capable of operating full voice trunks, updating backend databases, and syncing platforms 24/7/365.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiEmployees.map((emp, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-between transition-all duration-300 hover:border-zinc-850 hover:bg-zinc-900/10"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-zinc-500" />
                      {emp.role}
                    </h4>
                    <span className="text-[10px] text-zinc-500 flex items-center font-semibold uppercase tracking-wider">
                      <Clock className="h-3 w-3 mr-1 text-zinc-650" />
                      {emp.availability}
                    </span>
                  </div>
                  <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold px-2 py-0.5 rounded font-mono">
                    {emp.metric}
                  </span>
                </div>

                {/* Capabilities */}
                <p className="text-xs text-zinc-450 leading-relaxed min-h-[48px]">
                  {emp.capabilities}
                </p>

                {/* Integrations */}
                <div className="pt-4 border-t border-zinc-900/60 space-y-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-bold block flex items-center">
                    <Layers className="h-3 w-3 mr-1" />
                    Stack Integrations
                  </span>
                  <p className="text-xs text-zinc-300 font-mono">
                    {emp.integrations}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div
                onClick={() => scrollTo('demo')}
                className="mt-6 pt-4 border-t border-zinc-900/40 flex items-center justify-between text-[11px] font-bold text-zinc-550 group-hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <span>Deploy role</span>
                <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/0 to-white/[0.005] pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
