'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PhoneCall, Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center space-x-2 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md">
              <PhoneCall className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Voice<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">OS</span>
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight pt-4">Reset password</h2>
          <p className="text-sm text-zinc-400">Recover access to your enterprise AI operator dashboard</p>
        </div>

        {/* Card */}
        <div className="border border-zinc-850 bg-zinc-900/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="flex justify-center text-emerald-450">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Check your email</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  We have dispatched a password recovery token link to <strong className="text-white">{email}</strong>. Please check your spam folder if it doesn&apos;t arrive in 5 minutes.
                </p>
              </div>
              <div className="pt-4">
                <Link href="/login" className="inline-flex items-center space-x-2 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to sign in</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-zinc-400 leading-relaxed mb-2">
                Enter your work email address below. If an account is registered with this email, we will send password reset link instructions.
              </p>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    className="pl-11"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-2.5 mt-2 flex items-center justify-center space-x-2"
                disabled={loading || !email}
              >
                {loading ? 'Sending link...' : 'Send Recovery Link'}
                <Send className="h-4 w-4 ml-1.5" />
              </Button>

              <div className="pt-2 text-center">
                <Link href="/login" className="inline-flex items-center space-x-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
