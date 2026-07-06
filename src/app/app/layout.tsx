'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  PhoneCall,
  LayoutDashboard,
  Users,
  Settings,
  BrainCircuit,
  Workflow,
  BarChart3,
  Network,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  User,
  Building2,
  LogOut,
  Bell,
  Check,
  ChevronDown
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Responsive sidebar states
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // User and Organization state loaded dynamically from APIs
  const [userData, setUserData] = useState<{ name: string; email: string; role: string } | null>(null);
  const [orgData, setOrgData] = useState<{ name: string; slug: string } | null>(null);
  const [workspaces, setWorkspaces] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>('');
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        // 1. Fetch user me session info
        const userRes = await fetch('/api/auth/me');
        if (!userRes.ok) {
          router.push('/login');
          return;
        }
        const userResult = await userRes.json();
        setUserData({
          name: userResult.data.name || 'Developer',
          email: userResult.data.email,
          role: userResult.data.role
        });

        // 2. Fetch user organizations and workspaces list
        const orgRes = await fetch('/api/orgs');
        if (orgRes.ok) {
          const orgResult = await orgRes.json();
          setOrgData({
            name: orgResult.data.organization.name,
            slug: orgResult.data.organization.slug
          });
          setWorkspaces(orgResult.data.workspaces);
          if (orgResult.data.workspaces.length > 0) {
            setSelectedWorkspace(orgResult.data.workspaces[0].name);
          }
        }
      } catch (err) {
        console.error('Failed to load session:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, [router]);

  const handleLogout = async () => {
    // Session logout: delete cookie
    document.cookie = 'voiceos_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
    router.refresh();
  };

  const navItems: SidebarItem[] = [
    { name: 'Dashboard', href: '/app/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'AI Employees', href: '/app/ai-employees', icon: <BrainCircuit className="h-5 w-5" /> },
    { name: 'Channels', href: '/app/channels', icon: <Network className="h-5 w-5" /> },
    { name: 'Knowledge Base', href: '/app/knowledge', icon: <Building2 className="h-5 w-5" /> },
    { name: 'Workflows', href: '/app/workflows', icon: <Workflow className="h-5 w-5" /> },
    { name: 'Analytics', href: '/app/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Team', href: '/app/team', icon: <Users className="h-5 w-5" /> },
    { name: 'Organization', href: '/app/organization', icon: <Building2 className="h-5 w-5" /> },
    { name: 'Settings', href: '/app/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  if (loading) {
    return (
      <div className="bg-zinc-950 min-h-screen text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg mx-auto animate-pulse">
            <PhoneCall className="h-6 w-6" />
          </div>
          <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">Loading VoiceOS Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans flex overflow-hidden">
      {/* 1. Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-zinc-950 border-r border-zinc-900 transition-all duration-300 relative ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header (Logo) */}
        <div className={`p-6 border-b border-zinc-900 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <Link href="/app/dashboard" className="flex items-center space-x-2 shrink-0 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white">
              <PhoneCall className="h-4.5 w-4.5" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold tracking-tight text-white">
                Voice<span className="text-violet-400">OS</span>
              </span>
            )}
          </Link>
          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-all"
              title="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white border border-zinc-800'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="shrink-0">{item.icon}</div>
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer (User / Org) */}
        <div className="p-4 border-t border-zinc-900 space-y-4">
          {!isCollapsed && userData && (
            <div className="bg-zinc-900/30 border border-zinc-900 p-3 rounded-xl flex items-center space-x-3">
              <div className="h-9 w-9 rounded-lg bg-violet-600/10 border border-violet-500/20 text-violet-400 flex items-center justify-center">
                <User className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{userData.name}</p>
                <p className="text-[10px] text-zinc-500 font-medium truncate uppercase">{userData.role}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-semibold border border-zinc-900 hover:border-zinc-850 hover:bg-zinc-900/60 text-red-400 transition-all cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5" />
            {!isCollapsed && <span>Log Out</span>}
          </button>
        </div>

        {/* Collapsed expand button */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            className="absolute bottom-20 -right-3 h-6 w-6 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center hover:bg-zinc-900 cursor-pointer shadow-lg"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </aside>

      {/* 2. Mobile Drawer Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <aside className="w-64 bg-zinc-950 border-r border-zinc-900 p-5 flex flex-col h-full animate-[slideIn_0.3s_ease-out]">
            <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white">
                  <PhoneCall className="h-4.5 w-4.5" />
                </div>
                <span className="text-lg font-bold text-white">VoiceOS</span>
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="text-zinc-400 hover:text-white p-1 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      isActive ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-zinc-900 space-y-4">
              {userData && (
                <div className="bg-zinc-900/30 p-3 rounded-xl flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-violet-600/10 text-violet-400 flex items-center justify-center">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{userData.name}</p>
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase">{userData.role}</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 border border-zinc-900"
              >
                <LogOut className="h-4.5 w-4.5" />
                <span>Log Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b border-zinc-900 px-6 flex items-center justify-between shrink-0 bg-zinc-950">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden text-zinc-400 hover:text-white p-1 rounded-lg">
              <Menu className="h-6 w-6" />
            </button>

            {/* Org Switcher / Dropdown */}
            {orgData && (
              <div className="relative">
                <button
                  onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                  className="flex items-center space-x-2 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-850 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Building2 className="h-3.5 w-3.5 text-violet-400" />
                  <span>{orgData.name}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
                </button>

                {orgDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setOrgDropdownOpen(false)}></div>
                    <div className="absolute left-0 mt-2 w-56 rounded-xl border border-zinc-850 bg-zinc-900 p-2 shadow-xl z-20 space-y-1">
                      <div className="px-2 py-1.5 text-[9px] uppercase tracking-wider font-semibold text-zinc-500">
                        Switch Workspace
                      </div>
                      {workspaces.map((ws) => {
                        const isSelected = selectedWorkspace === ws.name;
                        return (
                          <button
                            key={ws.id}
                            onClick={() => {
                              setSelectedWorkspace(ws.name);
                              setOrgDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-bold text-left hover:bg-zinc-850 transition-colors"
                          >
                            <span>{ws.name}</span>
                            {isSelected && <Check className="h-3.5 w-3.5 text-violet-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative text-zinc-400 hover:text-white p-1.5 rounded-lg border border-zinc-900 bg-zinc-950/40" title="Notifications">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-violet-500"></span>
            </button>
            <div className="h-7 w-px bg-zinc-900"></div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">{userData?.name}</p>
                <p className="text-[10px] text-zinc-500 font-semibold truncate">{userData?.email}</p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-md shadow-indigo-500/10">
                {userData?.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Page Content */}
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
