'use client';

import React from 'react';
import { journeySteps } from '@/constants/landingData';

export default function CustomerJourney() {
  return (
    <section id="journey" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-violet-900/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-left space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            Process Timeline
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
            The Customer Journey Lifecycle
          </h3>
          <p className="text-lg text-zinc-450 leading-relaxed font-normal">
            Trace the exact execution path triggered by a phone call down to downstream integrations and dashboard telemetry.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical line (mobile) or Horizontal line (desktop) */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-zinc-900 lg:left-0 lg:right-0 lg:top-[15px] lg:bottom-auto lg:h-px pointer-events-none"></div>

          {/* Timeline Nodes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-8 lg:gap-4 relative z-10">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="flex flex-row lg:flex-col items-start gap-4 lg:gap-6 group">
                
                {/* Step Circle Marker */}
                <div className="h-8 w-8 rounded-full border border-zinc-800 bg-zinc-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 group-hover:border-violet-500 group-hover:text-violet-400 transition-all shadow-lg duration-300">
                  {idx + 1}
                </div>

                {/* Step Text Details */}
                <div className="space-y-1.5 pt-0.5 lg:pt-0">
                  <h4 className="text-xs font-bold text-white tracking-tight group-hover:text-violet-400 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-zinc-500 leading-relaxed font-normal max-w-[200px]">
                    {step.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
