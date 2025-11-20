import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';
import type { SalesChartProps } from '../../types/dashboard';
import { cn } from '../../utils/cn';

const SalesChartComponent: React.FC<SalesChartProps> = ({
  data,
  timeframe,
  onTimeframeChange,
  className
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Memoize theme-aware colors to avoid recalculation on every render
  const colors = React.useMemo(() => ({
    primary: isDark ? '#60a5fa' : '#3b82f6', // blue-400 : blue-600
    gradient: {
      start: isDark ? '#60a5fa' : '#3b82f6',
      end: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)'
    },
    grid: isDark ? '#374151' : '#e5e7eb', // gray-700 : gray-200
    text: isDark ? '#d1d5db' : '#6b7280', // gray-300 : gray-500
    tooltip: {
      bg: isDark ? '#1f2937' : '#ffffff', // gray-800 : white
      border: isDark ? '#374151' : '#e5e7eb' // gray-700 : gray-200
    }
  }), [isDark]);

  // Memoize custom tooltip component to prevent recreation on every render
  const CustomTooltip = React.useMemo(() => {
    return ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
      if (active && payload && payload.length) {
        return (
          <div
            className={cn(
              'rounded-lg border p-3 shadow-lg',
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            )}
          >
            <p className={cn('text-sm font-medium', isDark ? 'text-gray-200' : 'text-gray-900')}>
              {label}
            </p>
            <p className={cn('text-sm', isDark ? 'text-blue-400' : 'text-blue-600')}>
              Sales: ${payload[0].value.toLocaleString()}
            </p>
          </div>
        );
      }
      return null;
    };
  }, [isDark]);

  // Memoize timeframe change handlers to prevent recreation
  const handleWeeklyChange = React.useCallback(() => {
    onTimeframeChange('weekly');
  }, [onTimeframeChange]);

  const handleMonthlyChange = React.useCallback(() => {
    onTimeframeChange('monthly');
  }, [onTimeframeChange]);

  // Memoize Y-axis tick formatter
  const yAxisTickFormatter = React.useCallback((value: number) => {
    return `${(value / 1000).toFixed(0)}k`;
  }, []);

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={cn('text-lg font-semibold', isDark ? 'text-white' : 'text-gray-900')}>
          Sales Overview
        </h3>
        <div className="flex space-x-2">
          <Button
            variant={timeframe === 'weekly' ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleWeeklyChange}
          >
            Weekly
          </Button>
          <Button
            variant={timeframe === 'monthly' ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleMonthlyChange}
          >
            Monthly
          </Button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.gradient.start} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.gradient.end} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={colors.grid}
              opacity={0.5}
            />
            <XAxis 
              dataKey="date" 
              stroke={colors.text}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke={colors.text}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={yAxisTickFormatter}
            />
            <Tooltip content={CustomTooltip} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.primary}
              strokeWidth={2}
              fill="url(#salesGradient)"
              dot={{
                fill: colors.primary,
                strokeWidth: 2,
                r: 4
              }}
              activeDot={{
                r: 6,
                stroke: colors.primary,
                strokeWidth: 2,
                fill: isDark ? '#1f2937' : '#ffffff'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const SalesChart = React.memo(SalesChartComponent);