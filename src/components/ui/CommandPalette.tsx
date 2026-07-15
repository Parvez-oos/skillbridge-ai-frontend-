'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Search,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  User,
  Settings,
  Sparkles,
  FileText,
  Map,
  GraduationCap,
  ArrowRight,
  Command,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  href: string;
  section: string;
}

const commands: CommandItem[] = [
  { id: 'dashboard', label: 'Dashboard', description: 'Overview & stats', icon: LayoutDashboard, href: '/dashboard', section: 'Navigation' },
  { id: 'learning', label: 'My Learning', description: 'Track progress', icon: BookOpen, href: '/learning', section: 'Navigation' },
  { id: 'analytics', label: 'Analytics', description: 'Learning insights', icon: BarChart3, href: '/analytics', section: 'Navigation' },
  { id: 'profile', label: 'Profile', description: 'Your profile', icon: User, href: '/profile', section: 'Navigation' },
  { id: 'settings', label: 'Settings', description: 'Preferences', icon: Settings, href: '/settings', section: 'Navigation' },
  { id: 'ai-roadmap', label: 'AI Roadmap', description: 'Career roadmap generator', icon: Map, href: '/ai/roadmap', section: 'AI Tools' },
  { id: 'ai-resume', label: 'Resume Analyzer', description: 'ATS score & feedback', icon: FileText, href: '/ai/resume', section: 'AI Tools' },
  { id: 'ai-recommendations', label: 'Recommendations', description: 'Personalized suggestions', icon: Sparkles, href: '/ai/recommendations', section: 'AI Tools' },
  { id: 'learning-paths', label: 'Learning Paths', description: 'Browse all paths', icon: GraduationCap, href: '/learning-paths', section: 'Explore' },
  { id: 'blog', label: 'Blog', description: 'AI learning articles', icon: FileText, href: '/blog', section: 'Explore' },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = query
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.description?.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const sections = Array.from(new Set(filtered.map((c) => c.section)));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const executeCommand = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      executeCommand(filtered[selectedIndex].href);
    }
  };

  let flatIndex = -1;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/50 text-sm text-muted-foreground transition-all duration-200 hover:border-primary/30"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-background/50 border border-border/50 text-[10px] font-mono">
          <Command className="w-3 h-3" />K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-lg glass-panel rounded-2xl shadow-premium-xl animate-scale-in-down overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              />
              <kbd className="px-1.5 py-0.5 rounded-md bg-muted/50 border border-border/50 text-[10px] font-mono text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div className="max-h-[320px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              ) : (
                sections.map((section) => (
                  <div key={section}>
                    <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      {section}
                    </p>
                    {filtered
                      .filter((cmd) => cmd.section === section)
                      .map((cmd) => {
                        flatIndex++;
                        const isActive = flatIndex === selectedIndex;
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => executeCommand(cmd.href)}
                            onMouseEnter={() => setSelectedIndex(flatIndex)}
                            className={cn(
                              'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-150',
                              isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-foreground hover:bg-muted/50'
                            )}
                          >
                            <div
                              className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                                isActive ? 'bg-primary/20' : 'bg-muted/50'
                              )}
                            >
                              <cmd.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{cmd.label}</p>
                              {cmd.description && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {cmd.description}
                                </p>
                              )}
                            </div>
                            {isActive && (
                              <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                            )}
                          </button>
                        );
                      })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border/50 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-muted/50 border border-border/50 font-mono">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-muted/50 border border-border/50 font-mono">↵</kbd>
                Open
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-muted/50 border border-border/50 font-mono">esc</kbd>
                Close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
