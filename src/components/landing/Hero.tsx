'use client';

import React from 'react';
import { Play, Pause, PhoneCall, Sparkles, Database, MessageSquare, Calendar, ArrowRight } from 'lucide-react';
import { mockTranscript } from '@/constants/landingData';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useCallSimulation } from '@/hooks/useCallSimulation';
import { Button } from '@/components/ui/Button';

export default function Hero() {
  const scrollTo = useScrollTo();
  
  const {
    isPlaying,
    currentLineIndex,
    activeActions,
    toggleSimulation,
  } = useCallSimulation({
    lines: mockTranscript,
    lineDelay: 3200,
    restartDelay: 5000,
  });

  return (
    <section className="relative min-h-screen pt-32 pb-24 flex items-center justify-center bg-zinc-950 overflow-hidden">
      {/* Background Gradients and Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
              <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-ping"></span>
              <span className="text-zinc-300">VoiceOS v2.0 is Live</span>
              <Sparkles className="h-3 w-3 text-violet-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              The Enterprise AI <br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Workforce Platform
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-400 max-w-xl font-normal leading-relaxed">
              Deploy intelligent AI employees that answer calls, automate workflows, integrate with enterprise systems, and operate 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo('demo')}
              >
                Book Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={toggleSimulation}
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-5 w-5 fill-zinc-200 text-zinc-200" />
                    Pause Live Demo
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5 fill-zinc-200 text-zinc-200" />
                    Watch Live Demo
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-zinc-900">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">99.8%</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">Intent Accuracy</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">&lt; 1.2s</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">Response Latency</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white">10x</p>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-semibold">Cost Reduction</p>
              </div>
            </div>
          </div>

          {/* Call Simulation Visualizer */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-[420px] rounded-[2.5rem] border-[6px] border-zinc-800 bg-zinc-950 p-4 shadow-2xl shadow-indigo-950/20">
              
              {/* Screen Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-xl z-20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-850 mr-2"></div>
                <div className="w-10 h-1 bg-zinc-850 rounded-full"></div>
              </div>

              <div className="relative rounded-[2rem] bg-zinc-900/90 h-[520px] overflow-hidden border border-zinc-800 flex flex-col justify-between">
                
                {/* Simulated Header */}
                <div className="p-6 pt-8 flex items-center justify-between border-b border-zinc-800/40">
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-medium text-zinc-400">Agent: Active Call</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">00:{currentLineIndex >= 0 ? mockTranscript[currentLineIndex].time.split(':')[1] : '00'}</span>
                </div>

                {/* Call Simulation Area */}
                <div className="flex-1 px-4 py-3 overflow-y-auto flex flex-col justify-end space-y-3 font-sans">
                  {currentLineIndex === -1 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <div className="h-16 w-16 rounded-full bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 animate-bounce">
                        <PhoneCall className="h-6 w-6" />
                      </div>
                      <h4 className="text-white font-semibold text-sm">Simulate a VoiceOS Call</h4>
                      <p className="text-zinc-500 text-xs mt-1.5 max-w-[220px]">
                        Click &quot;Watch Live Demo&quot; to run a customer call and observe workflows triggering automatically.
                      </p>
                      <button
                        onClick={toggleSimulation}
                        className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-md text-xs font-semibold hover:bg-violet-500 transition-all cursor-pointer"
                      >
                        Start Simulation
                      </button>
                    </div>
                  ) : (
                    mockTranscript.slice(0, currentLineIndex + 1).map((line, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[85%] ${
                          line.sender === 'customer' ? 'self-end items-end' : 'self-start items-start'
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                            line.sender === 'customer'
                              ? 'bg-zinc-800 text-zinc-100 rounded-tr-none'
                              : 'bg-gradient-to-tr from-violet-600/90 to-indigo-600/90 text-white rounded-tl-none'
                          }`}
                        >
                          {line.text}
                        </div>
                        <span className="text-[10px] text-zinc-500 mt-1 px-1">{line.sender === 'customer' ? 'Customer' : 'VoiceOS'} • {line.time}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Animated Audio Waveform when active */}
                {isPlaying && currentLineIndex >= 0 && (
                  <div className="px-4 py-2 border-t border-zinc-800/40 bg-zinc-900/50 flex items-center justify-center space-x-1 h-10">
                    <div className="w-1 bg-violet-500 rounded-full animate-[pulse_0.8s_infinite] h-4"></div>
                    <div className="w-1 bg-violet-400 rounded-full animate-[pulse_1s_infinite] h-6"></div>
                    <div className="w-1 bg-indigo-500 rounded-full animate-[pulse_0.6s_infinite] h-3"></div>
                    <div className="w-1 bg-indigo-400 rounded-full animate-[pulse_1.2s_infinite] h-7"></div>
                    <div className="w-1 bg-cyan-400 rounded-full animate-[pulse_0.9s_infinite] h-5"></div>
                    <div className="w-1 bg-violet-500 rounded-full animate-[pulse_0.7s_infinite] h-3"></div>
                  </div>
                )}

                {/* Workflow Real-Time Indicators */}
                <div className="p-3 bg-zinc-950 border-t border-zinc-800/80 grid grid-cols-4 gap-1.5 text-center">
                  <div
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-300 ${
                      activeActions.calendar
                        ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-md shadow-emerald-500/10'
                        : 'border-zinc-800 bg-zinc-900/30 text-zinc-600'
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5 mb-1" />
                    <span className="text-[9px] font-semibold font-mono">Calendar</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-300 ${
                      activeActions.crm
                        ? 'border-violet-500/50 bg-violet-500/10 text-violet-400 shadow-md shadow-violet-500/10'
                        : 'border-zinc-800 bg-zinc-900/30 text-zinc-600'
                    }`}
                  >
                    <Database className="h-3.5 w-3.5 mb-1" />
                    <span className="text-[9px] font-semibold font-mono">CRM</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-300 ${
                      activeActions.whatsapp
                        ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400 shadow-md shadow-cyan-500/10'
                        : 'border-zinc-800 bg-zinc-900/30 text-zinc-600'
                    }`}
                  >
                    <MessageSquare className="h-3.5 w-3.5 mb-1" />
                    <span className="text-[9px] font-semibold font-mono">WhatsApp</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-300 ${
                      activeActions.n8n
                        ? 'border-amber-500/50 bg-amber-500/10 text-amber-400 shadow-md shadow-amber-500/10'
                        : 'border-zinc-800 bg-zinc-900/30 text-zinc-600'
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5 mb-1" />
                    <span className="text-[9px] font-semibold font-mono">n8n Flow</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
