'use client';

import { useState, useEffect } from 'react';

export function useTheme(key: string, defaultTheme: 'dark' | 'light' = 'dark') {
  const [theme, setTheme] = useState<'dark' | 'light'>(defaultTheme);

  useEffect(() => {
    const saved = localStorage.getItem(key) as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, [key]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(key, next);
  }

  return { theme, toggleTheme };
}
