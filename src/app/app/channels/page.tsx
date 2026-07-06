'use client';

import React, { useState, useEffect } from 'react';
import {
  Network,
  Phone,
  MessageSquare,
  Mail,
  Plus,
  Link2,
  Trash2,
  Send,
  Loader2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Channel } from '@/types';

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedChannelType, setSelectedChannelType] = useState<'Voice' | 'WhatsApp' | 'Chat' | 'Email'>('Voice');
  const [channelName, setChannelName] = useState('');
  const [telephonyNumber, setTelephonyNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const loadChannels = async () => {
    try {
      const res = await fetch('/api/channels');
      if (res.ok) {
        const result = await res.json();
        setChannels(result.data);
      }
    } catch (e) {
      console.error('Failed to load channels:', e);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadChannels();
  }, []);

  const handleCreateChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const name = selectedChannelType === 'Voice' ? `${channelName} (${telephonyNumber})` : channelName;
      const res = await fetch('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type: selectedChannelType,
          config: { provider: selectedChannelType === 'Voice' ? 'Twilio' : 'Meta Business API', status: 'Healthy' }
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to create channel.');
      }

      await loadChannels();
      setShowConfigModal(false);
      setChannelName('');
      setTelephonyNumber('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleChannel = async (id: string) => {
    const channel = channels.find(c => c.id === id);
    if (!channel) return;

    try {
      const res = await fetch('/api/channels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle_status',
          id,
          isActive: !channel.isActive
        }),
      });

      if (res.ok) {
        await loadChannels();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const channelIcons: Record<string, React.ReactNode> = {
    Voice: <Phone className="h-5 w-5 text-emerald-450" />,
    WhatsApp: <MessageSquare className="h-5 w-5 text-cyan-400" />,
    Chat: <MessageSquare className="h-5 w-5 text-violet-400" />,
    Email: <Mail className="h-5 w-5 text-indigo-400" />
  };

  return (
    <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-zinc-900">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center">
            <Network className="h-6 w-6 text-violet-400 mr-2" />
            Integrations & Communication Channels
          </h1>
          <p className="text-xs text-zinc-400">Manage Twilio SIP connections, WhatsApp endpoints, and email routers.</p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowConfigModal(true)}
          className="flex items-center space-x-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Connect Channel</span>
        </Button>
      </div>

      {/* Connected Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((chan) => (
          <div key={chan.id} className="border border-zinc-900 bg-zinc-900/10 p-6 rounded-2xl space-y-4 hover:border-zinc-850 transition-all">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center">
                  {channelIcons[chan.type] || <Link2 className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">{chan.name}</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">{chan.type} Channel</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`h-2.5 w-2.5 rounded-full ${chan.isActive ? 'bg-emerald-500' : 'bg-zinc-700 animate-none'}`}></span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase">{chan.isActive ? 'Active' : 'Offline'}</span>
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-zinc-555 block font-bold uppercase tracking-wider text-[9px]">Provider</span>
                <p className="text-zinc-300 font-semibold">{String(chan.config.provider || 'SaaS Default')}</p>
              </div>
              <div className="space-y-1">
                <span className="text-zinc-555 block font-bold uppercase tracking-wider text-[9px]">Assigned Worker</span>
                <p className="text-violet-400 font-semibold">Sarah (Enterprise Agent)</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900 flex justify-between gap-2">
              <Button
                variant="secondary"
                className="py-1 px-3 text-[11px]"
                onClick={() => toggleChannel(chan.id)}
              >
                {chan.isActive ? 'Disable' : 'Enable'}
              </Button>
              <button className="text-zinc-500 hover:text-red-400 p-1.5 rounded hover:bg-zinc-900 transition-colors" title="Delete connection">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Future Roadmap Section */}
      <div className="border border-zinc-900 bg-zinc-950 p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Future Omnichannel Integrations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-40 select-none">
          <div className="p-4 rounded-xl border border-zinc-900 text-center space-y-2">
            <MessageSquare className="h-6 w-6 mx-auto text-zinc-500" />
            <p className="text-xs font-bold text-white">Slack App</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-900 text-center space-y-2">
            <MessageSquare className="h-6 w-6 mx-auto text-zinc-500" />
            <p className="text-xs font-bold text-white">Teams Webhook</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-900 text-center space-y-2">
            <MessageSquare className="h-6 w-6 mx-auto text-zinc-500" />
            <p className="text-xs font-bold text-white">Telegram bot</p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-900 text-center space-y-2">
            <Mail className="h-6 w-6 mx-auto text-zinc-500" />
            <p className="text-xs font-bold text-white">Twilio SMS Hub</p>
          </div>
        </div>
      </div>

      {/* Connect Channel Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md border border-zinc-850 bg-zinc-950 rounded-2xl p-6 shadow-2xl relative space-y-5">
            <button onClick={() => setShowConfigModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Network className="h-5 w-5 text-violet-400 mr-2" />
                Connect Communication Channel
              </h3>
              <p className="text-xs text-zinc-400">Configure new telephony credentials or API hook paths.</p>
            </div>

            <form onSubmit={handleCreateChannel} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="chanType">Channel Gateway Type</Label>
                <select
                  id="chanType"
                  value={selectedChannelType}
                  onChange={(e) => setSelectedChannelType(e.target.value as 'Voice' | 'WhatsApp' | 'Chat' | 'Email')}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                >
                  <option value="Voice">PSTN / SIP Voice (Twilio Wrapper)</option>
                  <option value="WhatsApp">WhatsApp Business API (Meta Cloud)</option>
                  <option value="Chat">Interactive Website Chat Widget</option>
                  <option value="Email">Outbound SMTP / IMAP Email Gateway</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="name">Channel Label Name</Label>
                <Input
                  id="name"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="e.g., Twilio Support Office"
                  required
                />
              </div>

              {selectedChannelType === 'Voice' && (
                <div className="space-y-1.5">
                  <Label htmlFor="phoneNum">Twilio Purchased Phone Number</Label>
                  <Input
                    id="phoneNum"
                    value={telephonyNumber}
                    onChange={(e) => setTelephonyNumber(e.target.value)}
                    placeholder="e.g., +1 800-555-0199"
                    required
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                <Button variant="secondary" size="sm" onClick={() => setShowConfigModal(false)}>Cancel</Button>
                <Button type="submit" variant="primary" size="sm" disabled={loading} className="flex items-center space-x-1.5">
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Link Channel</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
