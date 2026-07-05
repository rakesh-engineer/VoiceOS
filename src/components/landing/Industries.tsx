'use client';

import React, { useState } from 'react';
import { Plane, HeartPulse, Building2, GraduationCap, Headphones, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { industries } from '@/constants/landingData';
import { useScrollTo } from '@/hooks/useScrollTo';

const iconMap: Record<string, React.ReactNode> = {
  'plane': <Plane className="h-5 w-5" />,
  'heart-pulse': <HeartPulse className="h-5 w-5" />,
  'building-2': <Building2 className="h-5 w-5" />,
  'graduation-cap': <GraduationCap className="h-5 w-5" />,
  'headphones': <Headphones className="h-5 w-5" />,
};

export default function Industries() {
  const [activeTab, setActiveTab] = useState(industries[0].id);
  const scrollTo = useScrollTo();

  const selectedIndustry = industries.find((ind) => ind.id === activeTab)!;

  return (
    <section id="industries" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            Tailored Industry Solutions
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Adapts To Your Industry Context
          </h3>
          <p className="text-base sm:text-lg text-zinc-400">
            VoiceOS comes pre-trained with domain-specific vocabulary and workflows for major industrial verticals.
          </p>
        </div>

        {/* Industry Selector layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selector Buttons */}
          <div className="lg:col-span-4 space-y-3">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                  activeTab === ind.id
                    ? 'border-violet-500/50 bg-violet-500/10 text-white shadow-lg shadow-violet-500/5'
                    : 'border-zinc-900 bg-zinc-900/10 text-zinc-450 hover:bg-zinc-900/30 hover:border-zinc-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center border ${
                    activeTab === ind.id ? 'bg-violet-600 border-violet-500 text-white' : 'bg-zinc-950 border-zinc-850 text-zinc-450'
                  }`}>
                    {iconMap[ind.iconId] || <Headphones className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{ind.name}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{ind.useCase}</p>
                  </div>
                </div>
                <ArrowRight className={`h-4 w-4 transition-transform duration-200 ${
                  activeTab === ind.id ? 'translate-x-1 text-violet-400' : 'text-zinc-600'
                }`} />
              </button>
            ))}
          </div>

          {/* Right Column: Active Industry Deep Dive */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-zinc-850 bg-zinc-900/20 p-6 sm:p-8 space-y-6 min-h-[400px] flex flex-col justify-between">
              
              {/* Top part: Description */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-violet-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Ready-to-Deploy Template</span>
                </div>
                <h4 className="text-2xl font-bold text-white tracking-tight">{selectedIndustry.name}</h4>
                <p className="text-zinc-450 text-sm leading-relaxed">{selectedIndustry.description}</p>
              </div>

              {/* Middle: Simulated Dialog Snippet */}
              <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-4 sm:p-6 space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-2">Simulated Live Interaction</span>
                
                {/* Customer */}
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold shrink-0">C</div>
                  <div className="bg-zinc-900 border border-zinc-850 rounded-r-xl rounded-bl-xl p-3 text-xs text-zinc-300 leading-relaxed">
                    &quot;{selectedIndustry.dialogCustomer}&quot;
                  </div>
                </div>

                {/* VoiceOS */}
                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-gradient-to-r from-violet-600/90 to-indigo-600/90 text-white rounded-l-xl rounded-br-xl p-3 text-xs leading-relaxed max-w-[85%]">
                    &quot;{selectedIndustry.dialogVoiceOS}&quot;
                  </div>
                  <div className="h-6 w-6 rounded-full bg-violet-600 flex items-center justify-center text-[10px] text-white font-bold shrink-0">V</div>
                </div>
              </div>

              {/* Bottom: Integration Outcome */}
              <div className="border-t border-zinc-900/80 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs">
                <div>
                  <span className="text-zinc-500 font-semibold uppercase tracking-wider block">Automation Outcome</span>
                  <span className="text-white mt-0.5 block font-mono font-medium">{selectedIndustry.outcome}</span>
                </div>
                <button
                  onClick={() => scrollTo('demo')}
                  className="inline-flex items-center space-x-2 text-violet-400 hover:text-violet-300 transition-colors font-bold cursor-pointer"
                >
                  <span>Build this workflow</span>
                  <Play className="h-3 w-3 fill-current" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
