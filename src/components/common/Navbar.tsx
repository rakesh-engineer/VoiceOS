'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { useScrollTo } from '@/hooks/useScrollTo';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollTo('top')}>
            <div className="relative mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <PhoneCall className="h-5 w-5 animate-pulse" />
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-30 blur-sm"></div>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Voice<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">OS</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollTo('problem')}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Challenges
            </button>
            <button
              onClick={() => scrollTo('solution')}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Solution
            </button>
            <button
              onClick={() => scrollTo('features')}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo('architecture')}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Architecture
            </button>
            <button
              onClick={() => scrollTo('industries')}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Industries
            </button>
            <button
              onClick={() => scrollTo('why-voiceos')}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Why Us
            </button>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => scrollTo('demo')}
            >
              Book Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-screen opacity-100 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-lg'
            : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-start">
          <button
            onClick={() => { setIsOpen(false); scrollTo('problem'); }}
            className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
          >
            Challenges
          </button>
          <button
            onClick={() => { setIsOpen(false); scrollTo('solution'); }}
            className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
          >
            Solution
          </button>
          <button
            onClick={() => { setIsOpen(false); scrollTo('features'); }}
            className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
          >
            Features
          </button>
          <button
            onClick={() => { setIsOpen(false); scrollTo('architecture'); }}
            className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
          >
            Architecture
          </button>
          <button
            onClick={() => { setIsOpen(false); scrollTo('industries'); }}
            className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
          >
            Industries
          </button>
          <button
            onClick={() => { setIsOpen(false); scrollTo('why-voiceos'); }}
            className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
          >
            Why Us
          </button>
          <div className="pt-4 pb-2 px-3 w-full">
            <Button
              variant="primary"
              className="w-full py-3"
              onClick={() => { setIsOpen(false); scrollTo('demo'); }}
            >
              Book Demo
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
