'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function ThemeWrapper({ children }) {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {children}
    </ThemeProvider>
  );
}
