'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? (localStorage.getItem('qhr-theme') as Theme | null) : null;
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial: Theme = stored || (prefersDark ? 'dark' : 'light');
      setThemeState(initial);
      applyThemeClass(initial);
    } catch (error) {
      console.error('Error setting up theme:', error);
    }
  }, []);

  const applyThemeClass = (t: Theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    
    // Force remove any existing dark class first
    root.classList.remove('dark');
    
    if (t === 'dark') {
      root.classList.add('dark');
    }
    
    // Force a reflow to ensure the change is applied
    root.offsetHeight;
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    applyThemeClass(t);
    try { localStorage.setItem('qhr-theme', t); } catch {}
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
