/**
 * ActivityList component for displaying recent activities and system events
 */

import React from 'react';
import type { Activity, ActivityListProps, ActivityType } from '../../types/dashboard';
import { cn } from '../../utils/cn';

/**
 * Individual activity item component
 * Optimized with React.memo for performance
 */
interface ActivityItemProps {
  activity: Activity;
}

const ActivityItemComponent: React.FC<ActivityItemProps> = ({ activity }) => {
  const { title, description, timestamp, user, type } = activity;

  // Memoize avatar fallback initials generation
  const initials = React.useMemo(() => {
    if (!user?.name) return '';
    return user.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [user]);

  // Memoize timestamp formatting to avoid recalculation
  const formattedTimestamp = React.useMemo(() => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return timestamp.toLocaleDateString();
  }, [timestamp]);

  // Memoize badge styles for activity type
  const badgeStyles = React.useMemo(() => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium";
    switch (type) {
      case 'success':
        return `${baseClasses} bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400`;
      case 'warning':
        return `${baseClasses} bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400`;
      case 'danger':
        return `${baseClasses} bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400`;
      case 'info':
        return `${baseClasses} bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400`;
      default:
        return baseClasses;
    }
  }, [type]);

  // Memoize badge icon
  const badgeIcon = React.useMemo(() => {
    switch (type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'danger': return '✕';
      case 'info': return 'i';
      default: return '';
    }
  }, [type]);

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
      {/* Avatar or Badge */}
      <div className="flex-shrink-0">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : user ? (
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300">
            {initials}
          </div>
        ) : (
          <div className={badgeStyles}>
            {badgeIcon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
            {formattedTimestamp}
          </p>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
          {description}
        </p>
        {user && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            by {user.name}
          </p>
        )}
      </div>
    </div>
  );
};

// Memoize ActivityItem to prevent unnecessary re-renders
const ActivityItem = React.memo(ActivityItemComponent);

/**
 * Filter button component for activity types
 * Optimized with React.memo for performance
 */
interface FilterButtonProps {
  type: ActivityType | 'all';
  isActive: boolean;
  onClick: () => void;
  count: number;
}

const FilterButtonComponent: React.FC<FilterButtonProps> = ({ type, isActive, onClick, count }) => {
  // Memoize filter label and icon to avoid recalculation
  const filterLabel = React.useMemo(() => {
    switch (type) {
      case 'all': return 'All';
      case 'success': return 'Success';
      case 'warning': return 'Warning';
      case 'danger': return 'Error';
      case 'info': return 'Info';
      default: return type;
    }
  }, [type]);

  const filterIcon = React.useMemo(() => {
    switch (type) {
      case 'all': return '📋';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'danger': return '❌';
      case 'info': return 'ℹ️';
      default: return '';
    }
  }, [type]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
        {
          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300': isActive,
          'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600': !isActive,
        }
      )}
    >
      <span className="mr-1">{filterIcon}</span>
      {filterLabel}
      <span className="ml-1.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-full text-xs">
        {count}
      </span>
    </button>
  );
};

// Memoize FilterButton to prevent unnecessary re-renders
const FilterButton = React.memo(FilterButtonComponent);

/**
 * ActivityList component with scrollable container and filtering
 * Optimized with React.memo and useMemo for performance
 */
const ActivityListComponent: React.FC<ActivityListProps> = ({
  activities,
  maxHeight = '400px',
  onFilter,
  className
}) => {
  const [activeFilter, setActiveFilter] = React.useState<ActivityType | 'all'>('all');

  // Memoize filtered activities to avoid recalculation on every render
  const filteredActivities = React.useMemo(() => {
    if (activeFilter === 'all') {
      return activities;
    }
    return activities.filter(activity => activity.type === activeFilter);
  }, [activities, activeFilter]);

  // Memoize activity counts to avoid recalculation on every render
  const activityCounts = React.useMemo(() => {
    const counts = {
      all: activities.length,
      success: 0,
      warning: 0,
      danger: 0,
      info: 0
    };

    activities.forEach(activity => {
      counts[activity.type]++;
    });

    return counts;
  }, [activities]);

  // Memoize filter change handler to prevent recreation
  const handleFilterChange = React.useCallback((type: ActivityType | 'all') => {
    setActiveFilter(type);
    if (onFilter && type !== 'all') {
      onFilter(type);
    }
  }, [onFilter]);

  // Memoize filter types array to prevent recreation
  const filterTypes = React.useMemo(() => 
    ['all', 'success', 'info', 'warning', 'danger'] as const, 
    []
  );

  if (activities.length === 0) {
    return (
      <div className={cn(
        "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6",
        className
      )}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-sm">No recent activities</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700",
      className
    )}>
      {/* Header with Filters */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Activity
          </h3>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterTypes.map((type) => (
            <FilterButton
              key={type}
              type={type}
              isActive={activeFilter === type}
              onClick={() => handleFilterChange(type)}
              count={activityCounts[type]}
            />
          ))}
        </div>
      </div>

      {/* Scrollable Activity List */}
      <div 
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        {filteredActivities.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm">No activities found for the selected filter</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Memoize the main component to prevent unnecessary re-renders
export const ActivityList = React.memo(ActivityListComponent);