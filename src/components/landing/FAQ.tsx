'use client';

import React, { useState } from 'react';
import { faqs } from '@/constants/landingData';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
            FAQS
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-sm text-zinc-400">
            Everything you need to know about the VoiceOS integration framework and voice performance limits.
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-zinc-900 rounded-xl bg-zinc-950/20 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-violet-400 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-violet-400' : ''
                  }`} />
                </button>

                {/* Collapsible Answer Pane */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[300px] border-t border-zinc-900/60 p-5' : 'max-h-0 overflow-hidden pointer-events-none'
                  }`}
                >
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
