import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '../ui/ThemeToggle';
import { UserMenu } from './UserMenu';
import { cn } from '../../utils/cn';
import type { HeaderProps } from '../../types/dashboard';

/**
 * Header component with title, theme toggle, and user menu slot
 * Features fixed positioning, responsive design, and proper z-index layering
 */
export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onSidebarToggle, 
  user, 
  onLogout 
}) => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-600 px-4 lg:px-6">
      {/* Left section: Mobile menu button and title */}
      <div className="flex items-center space-x-4">
        {/* Mobile menu button */}
        <button
          onClick={onSidebarToggle}
          className={cn(
            'lg:hidden p-2 rounded-md transition-colors duration-200',
            'text-gray-300 hover:text-white hover:bg-gray-700',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'focus:ring-offset-gray-800'
          )}
          aria-label="Open sidebar"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>

        {/* Header title */}
        <h1 className="text-xl font-semibold text-white lg:text-2xl">
          {title}
        </h1>
      </div>

      {/* Right section: Theme toggle and user menu */}
      <div className="flex items-center space-x-2 lg:space-x-4">
        {/* Theme toggle */}
        <ThemeToggle className="hidden sm:flex" />
        
        {/* User menu */}
        {user && onLogout && (
          <UserMenu user={user} onLogout={onLogout} />
        )}
      </div>
    </header>
  );
};