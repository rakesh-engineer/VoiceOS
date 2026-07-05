'use client';

import React from 'react';
import { securityFeatures } from '@/constants/landingData';
import { Shield, Check } from 'lucide-react';

export default function Security() {
  return (
    <section id="security" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-zinc-900/50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            Compliance & Trust
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none flex items-center justify-center gap-2">
            <Shield className="h-7 w-7 text-violet-450" />
            Enterprise-Grade Security
          </h3>
          <p className="text-base sm:text-lg text-zinc-400">
            VoiceOS protects client data with bank-grade encryption protocols and strict compliance governance.
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((sec, index) => (
            <div
              key={index}
              className="group border border-zinc-900 bg-zinc-950 p-6 rounded-xl hover:border-zinc-800 transition-colors"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-6 w-6 rounded-full bg-violet-950 border border-violet-850 flex items-center justify-center text-violet-450 shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {sec.title}
                </h4>
              </div>
              <p className="text-xs text-zinc-450 leading-relaxed font-normal">
                {sec.description}
              </p>
            </div>
          ))}
        </div>

        {/* Audit / Compliance badges */}
        <div className="mt-16 pt-8 border-t border-zinc-900 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Designed for Compliance Architecture
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-[11px] font-bold text-zinc-400 select-none">
            <span className="border border-zinc-800 px-3 py-1 rounded bg-zinc-950">SOC 2 COMPLIANT PATH</span>
            <span className="border border-zinc-800 px-3 py-1 rounded bg-zinc-950">HIPAA COMPLIANT ARCHITECTURE</span>
            <span className="border border-zinc-800 px-3 py-1 rounded bg-zinc-950">ISO 27001 FRAMEWORK</span>
            <span className="border border-zinc-800 px-3 py-1 rounded bg-zinc-950">GDPR & CCPA COMPLIANT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
