import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Hero from '@/components/landing/Hero';
import TrustedPlatform from '@/components/landing/TrustedPlatform';
import Problem from '@/components/landing/Problem';
import Features from '@/components/landing/Features';
import Solution from '@/components/landing/Solution';
import AIEmployees from '@/components/landing/AIEmployees';
import Industries from '@/components/landing/Industries';
import Integrations from '@/components/landing/Integrations';
import Architecture from '@/components/landing/Architecture';
import AnalyticsPreview from '@/components/landing/AnalyticsPreview';
import Security from '@/components/landing/Security';
import CustomerJourney from '@/components/landing/CustomerJourney';
import FAQ from '@/components/landing/FAQ';
import DemoForm from '@/components/landing/DemoForm';

export default function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans flex flex-col scroll-smooth">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-grow animate-[fadeIn_0.6s_ease-out]">
        {/* 1. Hero */}
        <Hero />
        
        {/* 2. Trusted Enterprise Platform */}
        <TrustedPlatform />
        
        {/* 3. Business Problems */}
        <Problem />
        
        {/* 4. VoiceOS Platform */}
        <Features />
        
        {/* 5. How VoiceOS Works */}
        <Solution />
        
        {/* 6. AI Employees */}
        <AIEmployees />
        
        {/* 7. Industries */}
        <Industries />
        
        {/* 8. Integrations */}
        <Integrations />
        
        {/* 9. Architecture */}
        <Architecture />
        
        {/* 10. Analytics Dashboard Preview */}
        <AnalyticsPreview />
        
        {/* 11. Enterprise Security */}
        <Security />
        
        {/* 12. Customer Journey */}
        <CustomerJourney />
        
        {/* 13. FAQ */}
        <FAQ />
        
        {/* 14. Book Demo */}
        <DemoForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
