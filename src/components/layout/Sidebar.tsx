import React, { useState, useEffect } from 'react';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CogIcon,
  ChevronLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';
import type { SidebarProps, NavigationItem } from '../../types/dashboard';

// Navigation items configuration
const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: HomeIcon,
    href: '/',
    isActive: true, // Default active for demo
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: ChartBarIcon,
    href: '/analytics',
    isActive: false,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: CogIcon,
    href: '/settings',
    isActive: false,
  },
];

/**
 * Collapsible Sidebar component with responsive mobile drawer functionality
 * Supports smooth transitions between expanded (240px) and collapsed (80px) states
 */
export const Sidebar: React.FC<SidebarProps & { isMobileMenuOpen?: boolean; onMobileMenuClose?: () => void }> = ({ 
  isCollapsed, 
  onToggle, 
  className,
  isMobileMenuOpen = false,
  onMobileMenuClose
}) => {
  const [activeItemId, setActiveItemId] = useState('dashboard');

  // Handle escape key for mobile drawer and prevent body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen && onMobileMenuClose) {
        onMobileMenuClose();
      }
    };

    if (isMobileMenuOpen) {
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      // Restore body scroll when mobile menu is closed
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, onMobileMenuClose]);

  // Handle navigation item click
  const handleNavItemClick = (itemId: string) => {
    setActiveItemId(itemId);
    // Close mobile menu when item is clicked
    if (isMobileMenuOpen && onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={onMobileMenuClose}
          onTouchEnd={onMobileMenuClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Base styles
          'fixed inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out',
          // Desktop behavior
          'lg:translate-x-0 lg:static lg:inset-auto',
          // Mobile behavior - drawer overlay with smooth slide animation
          'lg:block',
          isMobileMenuOpen 
            ? 'translate-x-0 shadow-xl' 
            : '-translate-x-full lg:translate-x-0 lg:shadow-none',
          // Width based on collapsed state
          isCollapsed ? 'lg:w-20' : 'w-64 lg:w-64',
          className
        )}
        aria-label="Main navigation"
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <div className={cn('flex items-center', isCollapsed && 'lg:justify-center')}>
            {/* Logo */}
            <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            {/* App title - hidden when collapsed on desktop */}
            {(!isCollapsed || isMobileMenuOpen) && (
              <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                Dashboard
              </span>
            )}
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={onMobileMenuClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = activeItemId === item.id;
            const IconComponent = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={cn(
                  // Base styles
                  'w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  // Spacing adjustments for collapsed state
                  isCollapsed ? 'lg:justify-center lg:px-2' : 'justify-start',
                  // Active state styling
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                  // Focus styles
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Icon */}
                <IconComponent 
                  className={cn(
                    'h-5 w-5 flex-shrink-0',
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  )} 
                />
                
                {/* Label - hidden when collapsed on desktop */}
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className="ml-3 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip for collapsed state - will be added in future enhancement */}
                {isCollapsed && !isMobileMenuOpen && (
                  <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar toggle button (desktop only) */}
        <div className="hidden lg:flex p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onToggle}
            className="w-full p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeftIcon 
              className={cn(
                'h-5 w-5 transition-transform duration-200', 
                isCollapsed && 'rotate-180'
              )} 
            />
          </button>
        </div>
      </aside>
    </>
  );
};