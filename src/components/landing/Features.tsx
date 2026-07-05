'use client';

import React from 'react';
import {
  PhoneCall,
  MessageCircle,
  Database,
  TrendingUp,
  RefreshCw,
  Send,
  Calendar,
  Users,
  BarChart3,
  GitBranch
} from 'lucide-react';
import { features } from '@/constants/landingData';

const iconMap: Record<string, React.ReactNode> = {
  'phone-call': <PhoneCall className="h-5 w-5" />,
  'message-circle': <MessageCircle className="h-5 w-5" />,
  'database': <Database className="h-5 w-5" />,
  'trending-up': <TrendingUp className="h-5 w-5" />,
  'refresh-cw': <RefreshCw className="h-5 w-5" />,
  'send': <Send className="h-5 w-5" />,
  'calendar': <Calendar className="h-5 w-5" />,
  'users': <Users className="h-5 w-5" />,
  'bar-chart': <BarChart3 className="h-5 w-5" />,
  'git-branch': <GitBranch className="h-5 w-5" />,
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            Platform Capabilities
          </h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
            Built for Enterprise Scale
          </h3>
          <p className="text-base sm:text-lg text-zinc-400">
            A comprehensive suite of modules designed to deliver seamless customer interactions and autonomous business operations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl border bg-zinc-900/10 p-6 transition-all duration-300 hover:bg-zinc-900/30 hover:border-zinc-800 ${item.colorClass} ${item.glowClass}`}
            >
              {/* Feature Icon Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-center transition-transform group-hover:scale-105 duration-300 text-zinc-300">
                  {iconMap[item.iconId] || <PhoneCall className="h-5 w-5" />}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {item.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed min-h-[72px]">
                {item.description}
              </p>

              {/* Benefit Indicator */}
              <div className="mt-4 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-medium">Key Advantage</span>
                <span className="font-semibold text-zinc-300">{item.benefit}</span>
              </div>

              {/* Glowing highlight inside the card */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/0 to-white/[0.01] pointer-events-none"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
