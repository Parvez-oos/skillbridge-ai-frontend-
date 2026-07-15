'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeName = 'dark-professional' | 'light-professional' | 'midnight-blue' | 'emerald' | 'royal-purple';

export interface Theme {
  name: ThemeName;
  label: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    ring: string;
    input: string;
    destructive: string;
    destructiveForeground: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    info: string;
    infoForeground: string;
  };
  preview: { bg: string; primary: string; accent: string };
}

export const themes: Record<ThemeName, Theme> = {
  'dark-professional': {
    name: 'dark-professional',
    label: 'Dark',
    colors: {
      background: '#0B0F19',
      foreground: '#F8FAFC',
      card: '#111827',
      cardForeground: '#F8FAFC',
      primary: '#6366F1',
      primaryForeground: '#FFFFFF',
      secondary: '#818CF8',
      secondaryForeground: '#FFFFFF',
      accent: '#818CF8',
      accentForeground: '#FFFFFF',
      muted: '#1E293B',
      mutedForeground: '#94A3B8',
      border: '#1E293B',
      ring: '#6366F1',
      input: '#1E293B',
      destructive: '#EF4444',
      destructiveForeground: '#FFFFFF',
      success: '#10B981',
      successForeground: '#FFFFFF',
      warning: '#F59E0B',
      warningForeground: '#FFFFFF',
      info: '#3B82F6',
      infoForeground: '#FFFFFF',
    },
    preview: { bg: '#0B0F19', primary: '#6366F1', accent: '#818CF8' },
  },
  'light-professional': {
    name: 'light-professional',
    label: 'Light',
    colors: {
      background: '#F8FAFC',
      foreground: '#0F172A',
      card: '#FFFFFF',
      cardForeground: '#0F172A',
      primary: '#4F46E5',
      primaryForeground: '#FFFFFF',
      secondary: '#6366F1',
      secondaryForeground: '#FFFFFF',
      accent: '#6366F1',
      accentForeground: '#FFFFFF',
      muted: '#F1F5F9',
      mutedForeground: '#64748B',
      border: '#E2E8F0',
      ring: '#4F46E5',
      input: '#E2E8F0',
      destructive: '#DC2626',
      destructiveForeground: '#FFFFFF',
      success: '#059669',
      successForeground: '#FFFFFF',
      warning: '#D97706',
      warningForeground: '#FFFFFF',
      info: '#2563EB',
      infoForeground: '#FFFFFF',
    },
    preview: { bg: '#F8FAFC', primary: '#4F46E5', accent: '#6366F1' },
  },
  'midnight-blue': {
    name: 'midnight-blue',
    label: 'Midnight',
    colors: {
      background: '#0A1628',
      foreground: '#F1F5F9',
      card: '#0F1D32',
      cardForeground: '#F1F5F9',
      primary: '#38BDF8',
      primaryForeground: '#0A1628',
      secondary: '#7DD3FC',
      secondaryForeground: '#0A1628',
      accent: '#22D3EE',
      accentForeground: '#0A1628',
      muted: '#1E293B',
      mutedForeground: '#94A3B8',
      border: '#1E3A5F',
      ring: '#38BDF8',
      input: '#1E293B',
      destructive: '#F43F5E',
      destructiveForeground: '#FFFFFF',
      success: '#34D399',
      successForeground: '#0A1628',
      warning: '#FBBF24',
      warningForeground: '#0A1628',
      info: '#60A5FA',
      infoForeground: '#0A1628',
    },
    preview: { bg: '#0A1628', primary: '#38BDF8', accent: '#22D3EE' },
  },
  'emerald': {
    name: 'emerald',
    label: 'Emerald',
    colors: {
      background: '#061A12',
      foreground: '#F0FDF4',
      card: '#0D2818',
      cardForeground: '#F0FDF4',
      primary: '#34D399',
      primaryForeground: '#061A12',
      secondary: '#6EE7B7',
      secondaryForeground: '#061A12',
      accent: '#2DD4BF',
      accentForeground: '#061A12',
      muted: '#14532D',
      mutedForeground: '#86EFAC',
      border: '#166534',
      ring: '#34D399',
      input: '#14532D',
      destructive: '#EF4444',
      destructiveForeground: '#FFFFFF',
      success: '#4ADE80',
      successForeground: '#061A12',
      warning: '#FDE047',
      warningForeground: '#061A12',
      info: '#67E8F9',
      infoForeground: '#061A12',
    },
    preview: { bg: '#061A12', primary: '#34D399', accent: '#2DD4BF' },
  },
  'royal-purple': {
    name: 'royal-purple',
    label: 'Purple',
    colors: {
      background: '#0F0A1A',
      foreground: '#FAF5FF',
      card: '#1A1030',
      cardForeground: '#FAF5FF',
      primary: '#A78BFA',
      primaryForeground: '#0F0A1A',
      secondary: '#C4B5FD',
      secondaryForeground: '#0F0A1A',
      accent: '#C084FC',
      accentForeground: '#0F0A1A',
      muted: '#2E1065',
      mutedForeground: '#C4B5FD',
      border: '#3B1F7A',
      ring: '#A78BFA',
      input: '#2E1065',
      destructive: '#EF4444',
      destructiveForeground: '#FFFFFF',
      success: '#86EFAC',
      successForeground: '#0F0A1A',
      warning: '#FDE047',
      warningForeground: '#0F0A1A',
      info: '#93C5FD',
      infoForeground: '#0F0A1A',
    },
    preview: { bg: '#0F0A1A', primary: '#A78BFA', accent: '#C084FC' },
  },
};

function applyThemeVariables(root: HTMLElement, colors: Theme['colors']) {
  const map: Record<string, string> = {
    '--background': colors.background,
    '--foreground': colors.foreground,
    '--card': colors.card,
    '--card-foreground': colors.cardForeground,
    '--primary': colors.primary,
    '--primary-foreground': colors.primaryForeground,
    '--secondary': colors.secondary,
    '--secondary-foreground': colors.secondaryForeground,
    '--accent': colors.accent,
    '--accent-foreground': colors.accentForeground,
    '--muted': colors.muted,
    '--muted-foreground': colors.mutedForeground,
    '--border': colors.border,
    '--ring': colors.ring,
    '--input': colors.input,
    '--destructive': colors.destructive,
    '--destructive-foreground': colors.destructiveForeground,
    '--success': colors.success,
    '--success-foreground': colors.successForeground,
    '--warning': colors.warning,
    '--warning-foreground': colors.warningForeground,
    '--info': colors.info,
    '--info-foreground': colors.infoForeground,

    '--color-background': colors.background,
    '--color-foreground': colors.foreground,
    '--color-card': colors.card,
    '--color-card-foreground': colors.cardForeground,
    '--color-primary': colors.primary,
    '--color-primary-foreground': colors.primaryForeground,
    '--color-secondary': colors.secondary,
    '--color-secondary-foreground': colors.secondaryForeground,
    '--color-accent': colors.accent,
    '--color-accent-foreground': colors.accentForeground,
    '--color-muted': colors.muted,
    '--color-muted-foreground': colors.mutedForeground,
    '--color-border': colors.border,
    '--color-ring': colors.ring,
    '--color-input': colors.input,
    '--color-destructive': colors.destructive,
    '--color-destructive-foreground': colors.destructiveForeground,
    '--color-success': colors.success,
    '--color-success-foreground': colors.successForeground,
    '--color-warning': colors.warning,
    '--color-warning-foreground': colors.warningForeground,
    '--color-info': colors.info,
    '--color-info-foreground': colors.infoForeground,

    '--color-base-100': colors.card,
    '--color-base-200': colors.muted,
    '--color-base-300': colors.border,
    '--color-base-content': colors.foreground,
    '--color-neutral': colors.muted,
    '--color-neutral-content': colors.mutedForeground,
    '--color-error': colors.destructive,
    '--color-error-content': colors.destructiveForeground,
  };

  for (const [key, value] of Object.entries(map)) {
    root.style.setProperty(key, value);
  }
}

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  currentTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('dark-professional');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('skillbridge-theme') as ThemeName | null;
    if (saved && themes[saved]) {
      setThemeState(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    applyThemeVariables(root, themes[theme].colors);

    root.classList.remove('dark', 'light');
    root.classList.add(theme === 'light-professional' ? 'light' : 'dark');

    localStorage.setItem('skillbridge-theme', theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark-professional', setTheme, currentTheme: themes['dark-professional'] }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
