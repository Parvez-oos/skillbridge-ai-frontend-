'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme, themes, ThemeName } from './ThemeProvider';
import { Check, Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const themeIcons: Record<ThemeName, React.ElementType> = {
  'dark-professional': Moon,
  'light-professional': Sun,
  'midnight-blue': Moon,
  'emerald': Sun,
  'royal-purple': Moon,
};

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const CurrentIcon = themeIcons[theme] || Sun;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200',
          'hover:bg-muted/50 text-muted-foreground hover:text-foreground',
          isOpen && 'bg-muted/50 text-foreground'
        )}
        aria-label="Change theme"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentIcon className="w-4.5 h-4.5" />
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={cn(
                'absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl border z-50 overflow-hidden',
                'glass-strong border-border/50'
              )}
              role="listbox"
              aria-label="Available themes"
            >
              <div className="p-1.5">
                <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Theme
                </p>
                {(Object.keys(themes) as ThemeName[]).map((themeName) => {
                  const themeConfig = themes[themeName];
                  const isActive = theme === themeName;
                  const Icon = themeIcons[themeName] || Sun;

                  return (
                    <button
                      key={themeName}
                      onClick={() => {
                        setTheme(themeName);
                        setIsOpen(false);
                      }}
                      role="option"
                      aria-selected={isActive}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150',
                        'hover:bg-muted/50',
                        isActive && 'bg-primary/10'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                        isActive ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className={cn(
                          'text-sm font-medium',
                          isActive ? 'text-foreground' : 'text-muted-foreground'
                        )}>
                          {themeConfig.label}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-border/50"
                          style={{ backgroundColor: themeConfig.preview.bg }}
                        />
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-border/50"
                          style={{ backgroundColor: themeConfig.preview.primary }}
                        />
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-border/50"
                          style={{ backgroundColor: themeConfig.preview.accent }}
                        />
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check className="w-4 h-4 text-primary" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
