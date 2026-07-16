'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Users, BookOpen, GraduationCap, FolderOpen,
  PenTool, Brain, BarChart3, CreditCard, Award,   LifeBuoy, FileText,
  Bell, Image, Shield, Activity, Settings, LogOut, ChevronDown,
  ChevronLeft, ChevronRight, Search, Plus, Moon, Sun, Menu,
  X, MessageSquare, Zap, TrendingUp, Star, Clock, Mail,
  Tag, Send, FileBarChart, Server, Lock, Database
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Users', href: '/admin/users', icon: <Users size={18} /> },
      { label: 'Learning Paths', href: '/admin/learning-paths', icon: <GraduationCap size={18} /> },
      { label: 'Courses', href: '/admin/courses', icon: <BookOpen size={18} /> },
      { label: 'Blog', href: '/admin/blog', icon: <PenTool size={18} /> },
      { label: 'Categories', href: '/admin/courses', icon: <FolderOpen size={18} /> },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { label: 'AI Hub', href: '/admin', icon: <Brain size={18} /> },
      { label: 'Analytics', href: '/admin/analytics', icon: <BarChart3 size={18} /> },
    ],
  },
  {
    title: 'Commerce',
    items: [
      { label: 'Payments', href: '/admin/payments', icon: <CreditCard size={18} /> },
      { label: 'Subscriptions', href: '/admin/payments', icon: <Zap size={18} /> },
      { label: 'Certificates', href: '/admin', icon: <Award size={18} /> },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Tickets', href: '/admin/support', icon: <LifeBuoy size={18} /> },
      { label: 'Reviews', href: '/admin', icon: <Star size={18} /> },
      { label: 'Notifications', href: '/admin/notifications', icon: <Bell size={18} /> },
    ],
  },
  {
    title: 'Content',
    items: [
      { label: 'Media Library', href: '/admin/media', icon: <Image size={18} /> },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Audit Logs', href: '/admin/audit-logs', icon: <FileBarChart size={18} /> },
      { label: 'System Logs', href: '/admin/system-logs', icon: <Server size={18} /> },
      { label: 'Security', href: '/admin/security', icon: <Shield size={18} /> },
      { label: 'Settings', href: '/admin/settings', icon: <Settings size={18} /> },
    ],
  },
];

function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border/50 transition-all duration-300',
        'bg-card/80 backdrop-blur-xl',
        collapsed ? 'w-[68px]' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        <div className={cn(
          'flex h-16 items-center border-b border-border/50 px-4',
          collapsed ? 'justify-center' : 'gap-3'
        )}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <GraduationCap size={18} className="text-primary" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">SkillBridge</span>
              <span className="text-[10px] font-medium text-muted-foreground">Admin Panel</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className={cn(
              'ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground',
              collapsed && 'ml-0'
            )}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navGroups.map((group) => (
            <div key={group.title} className="mb-3">
              {!collapsed && (
                <div className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {group.title}
                </div>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/admin' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                      collapsed && 'justify-center px-2'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                    )}
                    <span className="shrink-0">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && item.badge && (
                      <Badge variant="info" size="sm" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-border/50 p-3">
          {!collapsed ? (
            <div className="flex items-center gap-3 rounded-xl bg-muted/30 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary/10 text-xs text-primary">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium">{user?.name}</p>
                <p className="truncate text-[10px] text-muted-foreground">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center rounded-xl p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

function AdminNavbar({ sidebarCollapsed }: { sidebarCollapsed: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: '/' + arr.slice(0, index + 1).join('/'),
      isLast: index === arr.length - 1,
    }));

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 items-center border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300',
        sidebarCollapsed ? 'pl-[84px]' : 'pl-[268px]'
      )}
    >
      <div className="flex w-full items-center gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {crumb.isLast ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-56 rounded-xl border border-border/50 bg-muted/30 pl-9 pr-3 text-xs placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          <div className="relative">
            <button
              onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              <Bell size={16} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-border/50 bg-card p-2 shadow-xl">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-semibold">Notifications</span>
                  <Badge variant="info" size="sm">3 new</Badge>
                </div>
                <div className="space-y-1">
                  {[
                    { text: 'New user registered: john@example.com', time: '2m ago' },
                    { text: 'Blog post published: React Guide', time: '15m ago' },
                    { text: 'New review on Python Course', time: '1h ago' },
                  ].map((n, i) => (
                    <button key={i} className="flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted/50">
                      <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs">{n.text}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{n.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
            <MessageSquare size={16} />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
            <Moon size={16} />
          </button>

          <Button variant="primary" size="sm" icon={<Plus size={14} />}>
            <span className="hidden sm:inline">Quick Create</span>
          </Button>

          <div className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
              className="flex items-center gap-2 rounded-xl p-1 transition-colors hover:bg-muted/50"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-primary/10 text-xs text-primary">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <ChevronDown size={12} className="text-muted-foreground" />
            </button>
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-border/50 bg-card p-2 shadow-xl">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <div className="border-t border-border/50 my-1" />
                <Link href="/admin/settings" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                  <Settings size={14} /> Settings
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                  <LayoutDashboard size={14} /> User Dashboard
                </Link>
                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10">
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        {mobileOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <AdminNavbar sidebarCollapsed={collapsed} />

        <main
          className={cn(
            'transition-all duration-300',
            collapsed ? 'pl-[68px]' : 'pl-64',
            'pt-16'
          )}
        >
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
