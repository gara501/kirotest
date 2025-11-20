/**
 * TypeScript type definitions for dashboard components
 */

import type { ReactNode, ComponentType } from 'react';

// KPI Card types
export interface TrendData {
  direction: 'up' | 'down' | 'neutral';
  value: string;
  label: string;
}

export interface KPICardProps {
  title: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
  trend?: TrendData;
  className?: string;
}

export interface KPIData {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  trend: TrendData;
  icon: ComponentType<{ className?: string }>;
}

// Chart types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface SalesChartProps {
  data: ChartDataPoint[];
  timeframe: 'weekly' | 'monthly';
  onTimeframeChange: (timeframe: 'weekly' | 'monthly') => void;
  className?: string;
}

// Activity types
export type ActivityType = 'success' | 'warning' | 'danger' | 'info';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
  };
}

export interface ActivityListProps {
  activities: Activity[];
  maxHeight?: string;
  onFilter?: (type: ActivityType) => void;
  className?: string;
}

// Layout types
export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  title: string;
  onSidebarToggle: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  isActive?: boolean;
}

export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
}

// Dashboard data types
export interface DashboardData {
  kpis: KPIData[];
  chartData: ChartDataPoint[];
  activities: Activity[];
  lastUpdated: Date;
}

// Async state type for data loading
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

export type Breakpoint = keyof typeof breakpoints;