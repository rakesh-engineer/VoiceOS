'use client';

import React from 'react';

export default function TrustedPlatform() {
  return (
    <section className="bg-zinc-950 py-12 border-t border-b border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-zinc-500 text-center">
            Powering Voice Operations for Enterprise Teams Globally
          </p>
          <div className="w-full flex flex-wrap items-center justify-center gap-x-16 gap-y-6 opacity-40 select-none">
            <span className="text-sm font-semibold tracking-widest text-zinc-400 font-mono">ACME CORP</span>
            <span className="text-sm font-semibold tracking-widest text-zinc-400 font-mono">GLOBEX</span>
            <span className="text-sm font-semibold tracking-widest text-zinc-400 font-mono">INITECH</span>
            <span className="text-sm font-semibold tracking-widest text-zinc-400 font-mono">UMBRELLA</span>
            <span className="text-sm font-semibold tracking-widest text-zinc-400 font-mono">Hooli</span>
            <span className="text-sm font-semibold tracking-widest text-zinc-400 font-mono">VEHEMENT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
