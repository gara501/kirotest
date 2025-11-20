import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { 
  UserIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';
import type { UserMenuProps } from '../../types/dashboard';

/**
 * UserMenu dropdown component with avatar display and fallback initials
 * Features smooth animations, focus management, and accessibility support
 */
export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  // Generate fallback initials from user name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(user.name);

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <MenuButton
            className={cn(
              'flex items-center space-x-2 rounded-md p-2 text-sm transition-colors duration-200',
              'text-gray-300 hover:text-white hover:bg-gray-700',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'focus:ring-offset-gray-800',
              open && 'bg-gray-700'
            )}
          >
            {/* Avatar or initials */}
            <div className="flex-shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.name} avatar`}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            {/* User name (hidden on mobile) */}
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white truncate max-w-32">
                {user.name}
              </p>
              <p className="text-xs text-gray-300 truncate max-w-32">
                {user.email}
              </p>
            </div>

            {/* Chevron icon */}
            <ChevronDownIcon
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          </MenuButton>

          <Transition
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-60 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {/* User info section (mobile only) */}
                <div className="sm:hidden px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>

                {/* Profile menu item */}
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={cn(
                        'flex w-full items-center px-4 py-2 text-sm transition-colors duration-150',
                        focus
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                          : 'text-gray-700 dark:text-gray-300'
                      )}
                      onClick={() => {
                        // Profile navigation will be implemented when routing is added
                        console.log('Navigate to profile');
                      }}
                    >
                      <UserIcon className="mr-3 h-5 w-5" />
                      Profile
                    </button>
                  )}
                </MenuItem>

                {/* Settings menu item */}
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={cn(
                        'flex w-full items-center px-4 py-2 text-sm transition-colors duration-150',
                        focus
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                          : 'text-gray-700 dark:text-gray-300'
                      )}
                      onClick={() => {
                        // Settings navigation will be implemented when routing is added
                        console.log('Navigate to settings');
                      }}
                    >
                      <Cog6ToothIcon className="mr-3 h-5 w-5" />
                      Settings
                    </button>
                  )}
                </MenuItem>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-700" />

                {/* Logout menu item */}
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={cn(
                        'flex w-full items-center px-4 py-2 text-sm transition-colors duration-150',
                        focus
                          ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          : 'text-red-600 dark:text-red-400'
                      )}
                      onClick={onLogout}
                    >
                      <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                      Logout
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
};