'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronDown, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  activeId: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  }, []);

  // Close mobile TOC on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile TOC on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  return (
    <div className="md:hidden mb-6">
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={cn(
          'flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200',
          mobileOpen
            ? 'border-primary/30 bg-primary/5 text-primary'
            : 'border-border/50 bg-card/50 text-foreground hover:bg-muted/40'
        )}
        aria-expanded={mobileOpen}
        aria-controls="mobile-toc"
      >
        <span className="flex items-center gap-2.5">
          <List className="h-4 w-4 shrink-0" />
          Table of Contents
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-250 ease-out',
            mobileOpen && 'rotate-180'
          )}
        />
      </button>

      <div
        id="mobile-toc"
        className={cn(
          'overflow-hidden transition-all duration-300 ease-out',
          mobileOpen ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        )}
      >
        <nav ref={navRef} aria-label="Table of contents">
          <ul className="space-y-0.5 rounded-xl border border-border/50 bg-card/50 p-3" role="list">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={cn(
                      'group relative block rounded-lg text-[14px] leading-[1.6] font-medium tracking-wide transition-all duration-200 ease-out',
                      item.level === 3 ? 'pl-7' : 'pl-4',
                      'py-2 pr-3',
                      isActive
                        ? 'text-primary bg-primary/8 font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    )}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span
                      className={cn(
                        'absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full transition-all duration-250 ease-out',
                        isActive
                          ? 'bg-primary opacity-100 scale-y-100'
                          : 'bg-transparent opacity-0 scale-y-50'
                      )}
                    />
                    <span className="relative z-10">{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
