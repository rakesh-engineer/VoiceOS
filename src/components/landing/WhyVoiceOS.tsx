'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { comparisonData } from '@/constants/landingData';

export default function WhyVoiceOS() {
  return (
    <section id="why-voiceos" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            Why VoiceOS
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed To Outperform Traditional Support
          </h3>
          <p className="text-base sm:text-lg text-zinc-400">
            Compare the operational overhead of a traditional, human-only customer line with a VoiceOS autonomous agent.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="border border-zinc-850 rounded-2xl overflow-hidden bg-zinc-900/10 backdrop-blur-sm">
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-zinc-850 p-6 bg-zinc-950/60 font-semibold text-sm">
            <div className="md:col-span-3 text-zinc-400 uppercase tracking-wider">Features</div>
            <div className="md:col-span-4.5 text-zinc-500 uppercase tracking-wider mt-4 md:mt-0">Traditional Call Center</div>
            <div className="md:col-span-4.5 text-violet-400 uppercase tracking-wider mt-4 md:mt-0 flex items-center">
              VoiceOS Digital Agent
              <span className="ml-2 text-[10px] bg-violet-600 text-white font-bold px-2 py-0.5 rounded">Standard</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-zinc-850/80">
            {comparisonData.map((row, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 p-6 items-center gap-4 transition-colors hover:bg-zinc-900/20">
                {/* Feature Column */}
                <div className="md:col-span-3 font-bold text-white text-base">
                  {row.feature}
                </div>

                {/* Traditional Column */}
                <div className="md:col-span-4.5 flex items-start space-x-3 text-sm text-zinc-450 pr-4">
                  <div className="h-5 w-5 rounded-full bg-red-950/20 border border-red-900/30 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
                    <X className="h-3 w-3" />
                  </div>
                  <span>{row.traditional.text}</span>
                </div>

                {/* VoiceOS Column */}
                <div className="md:col-span-4.5 flex items-start space-x-3 text-sm text-zinc-200 pl-0 md:pl-4 mt-2 md:mt-0">
                  <div className="h-5 w-5 rounded-full bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-center text-emerald-450 shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="font-medium">{row.voiceos.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic ROI Callout */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm">
            Save over <strong className="text-white">85% in operational costs</strong> from day one of deployment.
          </p>
        </div>

      </div>
    </section>
  );
}
