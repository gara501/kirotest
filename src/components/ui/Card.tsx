import React from 'react';
import { cn } from '../../utils/cn';
import type { CardProps } from '../../types/common';

/**
 * Reusable Card component with theme-aware styling and customizable padding/shadow
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, padding = 'md', shadow = 'sm', hover = false, ...props }, ref) => {
    const paddingClasses = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6'
    };

    const shadowClasses = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg'
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-lg border bg-card text-card-foreground',
          // Theme-aware background and border
          'bg-white dark:bg-gray-800',
          'border-gray-200 dark:border-gray-700',
          // Padding
          paddingClasses[padding],
          // Shadow
          shadowClasses[shadow],
          // Hover effect
          hover && 'transition-shadow duration-200 hover:shadow-md dark:hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';