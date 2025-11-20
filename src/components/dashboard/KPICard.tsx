import React from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  MinusIcon 
} from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';
import { Card } from '../ui/Card';
import type { KPICardProps } from '../../types/dashboard';

/**
 * KPI Card component displaying key performance indicators with icon, title, value, and trend
 * Optimized with React.memo and useMemo for expensive calculations
 */
const KPICardComponent = React.forwardRef<HTMLDivElement, KPICardProps>(
  ({ title, value, icon: Icon, trend, className, ...props }, ref) => {
    // Memoize trend icon to avoid recalculation on every render
    const trendIcon = React.useMemo(() => {
      if (!trend) return null;
      
      switch (trend.direction) {
        case 'up':
          return <ArrowUpIcon className="h-3 w-3" />;
        case 'down':
          return <ArrowDownIcon className="h-3 w-3" />;
        case 'neutral':
          return <MinusIcon className="h-3 w-3" />;
        default:
          return null;
      }
    }, [trend]);

    // Memoize trend colors to avoid recalculation on every render
    const trendColors = React.useMemo(() => {
      if (!trend) return '';
      
      switch (trend.direction) {
        case 'up':
          return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20';
        case 'down':
          return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
        case 'neutral':
          return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800';
        default:
          return '';
      }
    }, [trend]);

    // Memoize formatted value to avoid recalculation
    const formattedValue = React.useMemo(() => {
      return typeof value === 'number' ? value.toLocaleString() : value;
    }, [value]);

    return (
      <Card
        ref={ref}
        className={cn(
          // Base dimensions - responsive height between 120-150px
          'h-32 sm:h-36 lg:h-40',
          // Flex layout for content organization
          'flex flex-col justify-between',
          // Hover effects with shadow elevation and smooth transitions
          'transition-all duration-300 ease-in-out',
          'hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50',
          'hover:-translate-y-1',
          'cursor-pointer',
          className
        )}
        padding="md"
        shadow="sm"
        {...props}
      >
        {/* Header with icon and title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              {title}
            </h3>
          </div>
        </div>

        {/* Value display */}
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formattedValue}
          </p>
        </div>

        {/* Enhanced trend indicator with icons and colors */}
        {trend && (
          <div className="mt-2 flex items-center justify-between">
            <div className={cn(
              'inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium',
              trendColors
            )}>
              {trendIcon}
              <span>{trend.value}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {trend.label}
            </span>
          </div>
        )}
      </Card>
    );
  }
);

KPICardComponent.displayName = 'KPICard';

// Memoize the component to prevent unnecessary re-renders
export const KPICard = React.memo(KPICardComponent);