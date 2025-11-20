import React from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../types/theme';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; label: string; icon: React.ComponentType<any> }[] = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: ComputerDesktopIcon },
  ];

  const currentThemeIndex = themes.findIndex(t => t.value === theme);
  
  const handleToggle = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextIndex].value);
  };

  const CurrentIcon = themes[currentThemeIndex]?.icon || SunIcon;

  return (
    <button
      onClick={handleToggle}
      className={`
        inline-flex items-center justify-center rounded-md p-2
        text-gray-300 hover:text-white hover:bg-gray-700
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        focus:ring-offset-gray-800
        ${className}
      `}
      title={`Current theme: ${themes[currentThemeIndex]?.label || 'Unknown'}`}
      aria-label="Toggle theme"
    >
      <CurrentIcon className="h-5 w-5" />
    </button>
  );
}