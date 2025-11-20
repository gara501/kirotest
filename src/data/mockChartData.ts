import type { ChartDataPoint, Activity, KPIData, DashboardData } from '../types/dashboard';
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

export const weeklyChartData: ChartDataPoint[] = [
  { date: 'Mon', value: 12000, label: 'Monday' },
  { date: 'Tue', value: 15000, label: 'Tuesday' },
  { date: 'Wed', value: 18000, label: 'Wednesday' },
  { date: 'Thu', value: 14000, label: 'Thursday' },
  { date: 'Fri', value: 22000, label: 'Friday' },
  { date: 'Sat', value: 19000, label: 'Saturday' },
  { date: 'Sun', value: 16000, label: 'Sunday' }
];

export const monthlyChartData: ChartDataPoint[] = [
  { date: 'Jan', value: 45000, label: 'January' },
  { date: 'Feb', value: 52000, label: 'February' },
  { date: 'Mar', value: 48000, label: 'March' },
  { date: 'Apr', value: 61000, label: 'April' },
  { date: 'May', value: 55000, label: 'May' },
  { date: 'Jun', value: 67000, label: 'June' },
  { date: 'Jul', value: 71000, label: 'July' },
  { date: 'Aug', value: 69000, label: 'August' },
  { date: 'Sep', value: 58000, label: 'September' },
  { date: 'Oct', value: 63000, label: 'October' },
  { date: 'Nov', value: 72000, label: 'November' },
  { date: 'Dec', value: 78000, label: 'December' }
];

// Mock KPI data with realistic metrics and trends
export const mockKPIData: KPIData[] = [
  {
    id: 'total-users',
    title: 'Total Users',
    value: 24567,
    formattedValue: '24.6K',
    trend: {
      direction: 'up',
      value: '+12.5%',
      label: 'vs last month'
    },
    icon: UsersIcon
  },
  {
    id: 'sales-today',
    title: 'Sales Today',
    value: 89432,
    formattedValue: '$89.4K',
    trend: {
      direction: 'up',
      value: '+8.2%',
      label: 'vs yesterday'
    },
    icon: CurrencyDollarIcon
  },
  {
    id: 'conversion-rate',
    title: 'Conversion Rate',
    value: 3.24,
    formattedValue: '3.24%',
    trend: {
      direction: 'down',
      value: '-0.3%',
      label: 'vs last week'
    },
    icon: ChartBarIcon
  },
  {
    id: 'active-sessions',
    title: 'Active Sessions',
    value: 1847,
    formattedValue: '1,847',
    trend: {
      direction: 'neutral',
      value: '0.0%',
      label: 'vs last hour'
    },
    icon: GlobeAltIcon
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'success',
    title: 'New User Registration',
    description: 'John Smith successfully registered and completed profile setup',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    user: {
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    }
  },
  {
    id: '2',
    type: 'info',
    title: 'System Backup Completed',
    description: 'Daily system backup completed successfully. All data secured.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
  {
    id: '3',
    type: 'warning',
    title: 'High Memory Usage Alert',
    description: 'Server memory usage has exceeded 85% threshold. Consider scaling resources.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: '4',
    type: 'success',
    title: 'Payment Processed',
    description: 'Payment of $299.99 processed successfully for Premium Plan upgrade',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    user: {
      name: 'Sarah Johnson'
    }
  },
  {
    id: '5',
    type: 'info',
    title: 'Feature Update Deployed',
    description: 'New dashboard analytics features have been deployed to production',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    user: {
      name: 'DevOps Team'
    }
  },
  {
    id: '6',
    type: 'danger',
    title: 'Failed Login Attempts',
    description: 'Multiple failed login attempts detected from IP 192.168.1.100',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '7',
    type: 'success',
    title: 'Database Optimization',
    description: 'Database queries optimized, performance improved by 40%',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    user: {
      name: 'Database Admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    }
  },
  {
    id: '8',
    type: 'info',
    title: 'Scheduled Maintenance',
    description: 'Routine server maintenance completed. All systems operational.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: '9',
    type: 'warning',
    title: 'SSL Certificate Expiring',
    description: 'SSL certificate for api.example.com expires in 7 days',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: '10',
    type: 'success',
    title: 'API Rate Limit Increased',
    description: 'API rate limits increased to handle growing traffic demands',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    user: {
      name: 'API Team'
    }
  }
];

// Complete dashboard data combining all mock data
export const mockDashboardData: DashboardData = {
  kpis: mockKPIData,
  chartData: weeklyChartData, // Default to weekly view
  activities: mockActivities,
  lastUpdated: new Date()
};