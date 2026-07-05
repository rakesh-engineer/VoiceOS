'use client';

import React from 'react';
import { Phone, BrainCircuit, Zap, Users, ArrowUpRight } from 'lucide-react';
import { solutions } from '@/constants/landingData';
import { useScrollTo } from '@/hooks/useScrollTo';

const iconMap: Record<string, React.ReactNode> = {
  'phone': <Phone className="h-6 w-6 text-violet-400" />,
  'brain-circuit': <BrainCircuit className="h-6 w-6 text-indigo-400" />,
  'zap': <Zap className="h-6 w-6 text-cyan-400" />,
  'users': <Users className="h-6 w-6 text-emerald-400" />,
};

export default function Solution() {
  const scrollTo = useScrollTo();

  return (
    <section id="solution" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-20 text-left">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block mb-4">
            The Solution
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Supercharging Your Frontline Operations
          </h3>
          <p className="text-lg text-zinc-400 mt-4 leading-relaxed">
            VoiceOS works as a digital extension of your team. It doesn&apos;t just record voicemails or redirect calls; it converses, processes data, books appointments, and triggers action chains instantly.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((item, index) => (
            <div
              key={index}
              className="relative bg-zinc-900/10 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold text-zinc-800 font-mono tracking-tighter group-hover:text-zinc-700 transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="space-y-4">
                  <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                    {iconMap[item.iconId] || <Phone className="h-6 w-6 text-zinc-400" />}
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Sub-card decorative footer */}
              <div 
                onClick={() => scrollTo('features')}
                className="mt-8 pt-4 border-t border-zinc-900/50 flex items-center justify-between text-zinc-500 group-hover:text-zinc-300 transition-colors text-xs font-semibold cursor-pointer"
              >
                <span>Explore Tech Details</span>
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>

              {/* Background gradient on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Feature summary statement */}
        <div className="mt-20 p-8 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900/60 to-zinc-950 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white">Ready to witness the integration live?</h4>
            <p className="text-sm text-zinc-400">Set up a demo or test call to see how VoiceOS integrates directly into your custom technology stack.</p>
          </div>
          <button
            onClick={() => scrollTo('demo')}
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all shadow-md shadow-violet-500/10 cursor-pointer"
          >
            Get Started Now
          </button>
        </div>

      </div>
    </section>
  );
}
