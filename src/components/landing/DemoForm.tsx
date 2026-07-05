'use client';

import React, { useState } from 'react';
import { submitDemoRequest } from '@/services/demoService';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';

export default function DemoForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot spam bot check
    if (honeypot) {
      setStatus('loading');
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      setHoneypot('');
      return;
    }
    
    // Quick validation
    if (!formData.name || !formData.company || !formData.email || !formData.phone) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await submitDemoRequest(formData);
      if (response.success) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(response.error || 'Something went wrong. Please try again.');
      }
    } catch (err: unknown) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit. Please check your network.';
      setErrorMessage(errorMessage);
    }
  };

  return (
    <section id="demo" className="relative py-24 bg-zinc-950 border-t border-zinc-900 overflow-hidden">
      {/* Background visual highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full inline-block">
              Request Access
            </h2>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              See VoiceOS in Action
            </h3>
            <p className="text-base text-zinc-400 leading-relaxed font-normal">
              Schedule a personal 1-on-1 architecture call with our founding engineers. We will show you:
            </p>
            <ul className="space-y-3.5 text-zinc-300 text-sm">
              <li className="flex items-center space-x-3">
                <div className="h-5 w-5 rounded-full bg-violet-950 border border-violet-850 flex items-center justify-center text-violet-400 text-xs font-bold font-mono">1</div>
                <span>How to customize the LLM persona for your business</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="h-5 w-5 rounded-full bg-violet-950 border border-violet-850 flex items-center justify-center text-violet-400 text-xs font-bold font-mono">2</div>
                <span>Integrating VoiceOS with your HubSpot CRM and Calendars</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="h-5 w-5 rounded-full bg-violet-950 border border-violet-850 flex items-center justify-center text-violet-400 text-xs font-bold font-mono">3</div>
                <span>Connecting live webhooks to triggers in n8n pipelines</span>
              </li>
            </ul>
            <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/60 text-xs text-zinc-500">
              <p>
                <strong>Developer Notice:</strong> This form routes through the secure proxy Route Handler (`/api/demo`). Set the `N8N_DEMO_WEBHOOK_URL` environment variable inside your `.env.local` to process requests server-side.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-850 bg-zinc-900/10 p-6 sm:p-10 shadow-2xl relative">
              {status === 'success' ? (
                <div className="text-center py-12 space-y-4">
                  <div className="h-16 w-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Request Received Successfully!</h4>
                  <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                    Thanks for reaching out! One of our founding engineers will email you within 2 hours to coordinate a live demo.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setStatus('idle')}
                    className="mt-6"
                  >
                    Send another request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Hidden honeypot input for bot prevention */}
                  <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 rounded-lg bg-red-950/20 border border-red-500/20 text-red-400 text-xs flex items-center space-x-2.5">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5 text-left">
                      <Label htmlFor="name" required>Full Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        disabled={status === 'loading'}
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5 text-left">
                      <Label htmlFor="company" required>Company Name</Label>
                      <Input
                        type="text"
                        name="company"
                        id="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div className="space-y-1.5 text-left">
                      <Label htmlFor="email" required>Work Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        disabled={status === 'loading'}
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5 text-left">
                      <Label htmlFor="phone" required>Phone Number</Label>
                      <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        disabled={status === 'loading'}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5 text-left">
                    <Label htmlFor="message">Additional Requirements / Message</Label>
                    <Textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your call volume, CRM systems, and workflow goals..."
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={status === 'loading'}
                    className="w-full"
                  >
                    Submit Request
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
