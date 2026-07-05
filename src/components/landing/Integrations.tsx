'use client';

import React, { useState } from 'react';
import { integrations } from '@/constants/landingData';
import { Link2, Code, ShieldCheck } from 'lucide-react';

export default function Integrations() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(integrations.map(item => item.category)))];

  const filteredIntegrations = activeCategory === 'All'
    ? integrations
    : integrations.filter(item => item.category === activeCategory);

  return (
    <section id="integrations" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            Connected Systems
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
            Enterprise Stack Integrations
          </h3>
          <p className="text-base sm:text-lg text-zinc-400">
            VoiceOS syncs out-of-the-box with your existing databases, communication tools, and workflow systems.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'border-violet-500 bg-violet-500/10 text-white shadow-md shadow-violet-500/5'
                  : 'border-zinc-900 bg-zinc-950 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredIntegrations.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between p-5 rounded-xl border border-zinc-900 bg-zinc-950 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/10 text-center min-h-[110px]"
            >
              <div className="flex justify-center text-zinc-550 group-hover:text-violet-400 transition-colors mb-3">
                <Link2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">{item.name}</h4>
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold block mt-1">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info banner */}
        <div className="mt-12 p-5 rounded-xl border border-zinc-900 bg-zinc-950/60 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2.5 text-zinc-400">
            <Code className="h-4 w-4 text-violet-400" />
            <span>Need a custom webhook, database, or API hook?</span>
          </div>
          <div className="flex items-center space-x-2 text-violet-400 font-bold">
            <ShieldCheck className="h-4 w-4" />
            <span>Fully Supported REST Gateway</span>
          </div>
        </div>

      </div>
    </section>
  );
}
