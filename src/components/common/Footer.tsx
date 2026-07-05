'use client';

import React from 'react';
import { PhoneCall, Mail, ArrowUp } from 'lucide-react';
import { useScrollTo } from '@/hooks/useScrollTo';
import { config } from '@/config';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const scrollTo = useScrollTo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-900">
          
          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => scrollTo('top')}>
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
                <PhoneCall className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Voice<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">OS</span>
              </span>
            </div>
            <p className="text-zinc-400 text-sm max-w-sm font-normal leading-relaxed">
              The autonomous enterprise-grade AI voice platform acting as a 24/7 digital employee for scaling communication and automation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-3.5">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Product</h5>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('architecture')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Architecture
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('industries')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Industries
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Company</h5>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <button onClick={() => scrollTo('why-voiceos')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Why VoiceOS
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('demo')} className="hover:text-white transition-colors cursor-pointer text-left">
                    Book Demo
                  </button>
                </li>
                <li>
                  <a href={config.app.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Contact</h5>
            <div className="space-y-3 text-sm text-zinc-400">
              <a href={`mailto:${config.app.contactEmail}`} className="flex items-center space-x-2.5 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-zinc-500" />
                <span>{config.app.contactEmail}</span>
              </a>
              <div className="flex items-center space-x-2.5">
                <LinkedinIcon className="h-4 w-4 text-zinc-500" />
                <a
                  href={config.app.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom part */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © {currentYear} {config.app.name} Inc. All rights reserved. Built for venture-backed enterprise operations.
          </p>

          <button
            onClick={() => scrollTo('top')}
            className="p-2.5 rounded-lg border border-zinc-850 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer group"
            title="Scroll to top"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
