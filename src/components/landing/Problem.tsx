'use client';

import React from 'react';
import { PhoneOff, FileInput, Clock, Users, ArrowRight } from 'lucide-react';
import { problems } from '@/constants/landingData';

const iconMap: Record<string, React.ReactNode> = {
  'phone-off': <PhoneOff className="h-6 w-6 text-red-400" />,
  'file-input': <FileInput className="h-6 w-6 text-amber-400" />,
  'clock': <Clock className="h-6 w-6 text-orange-400" />,
  'users': <Users className="h-6 w-6 text-yellow-400" />,
};

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-3 py-1 rounded-full inline-block">
            The Operational Bottleneck
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Traditional Customer Operations Are Leaking Revenue
          </h3>
          <p className="text-base sm:text-lg text-zinc-400">
            Scaling your team manually to handle 24/7 communications, updates, and workflows is a slow, expensive, and error-prone battle.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-zinc-900 hover:border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40 p-8 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card top */}
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {iconMap[item.iconId] || <PhoneOff className="h-6 w-6 text-zinc-400" />}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card bottom */}
              <div className="mt-8 pt-6 border-t border-zinc-900/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-zinc-500 block uppercase tracking-wider">
                    Stat Metric
                  </span>
                  <span className="text-sm font-bold text-white mt-1 block">
                    {item.metric}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-zinc-500 block uppercase tracking-wider">
                    Direct Impact
                  </span>
                  <span className="text-xs text-red-400/90 mt-1 block font-medium">
                    {item.impact}
                  </span>
                </div>
              </div>

              {/* Subtle hover border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-violet-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Inline transition CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 text-zinc-400 text-sm font-medium">
            <span>Scroll down to see how VoiceOS changes everything</span>
            <ArrowRight className="h-4 w-4 animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
