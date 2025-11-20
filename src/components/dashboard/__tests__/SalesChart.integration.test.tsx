import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SalesChart } from '../SalesChart';
import { ThemeProvider } from '../../../providers/ThemeProvider';
import { weeklyChartData, monthlyChartData } from '../../../data/mockChartData';

// Mock recharts to avoid canvas issues in tests
vi.mock('recharts', () => ({
  LineChart: ({ children }: { children: React.ReactNode }) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="responsive-container">{children}</div>,
  Area: () => <div data-testid="area" />,
  AreaChart: ({ children }: { children: React.ReactNode }) => <div data-testid="area-chart">{children}</div>
}));

// Test component that demonstrates real usage
const SalesChartDemo: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  
  const data = timeframe === 'weekly' ? weeklyChartData : monthlyChartData;
  
  return (
    <SalesChart
      data={data}
      timeframe={timeframe}
      onTimeframeChange={setTimeframe}
    />
  );
};

describe('SalesChart Integration', () => {
  it('integrates correctly with real data and state management', () => {
    render(
      <ThemeProvider>
        <SalesChartDemo />
      </ThemeProvider>
    );
    
    // Should render with weekly data initially
    expect(screen.getByText('Sales Overview')).toBeInTheDocument();
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    
    // Weekly button should be active initially
    const weeklyButton = screen.getByText('Weekly');
    const monthlyButton = screen.getByText('Monthly');
    
    expect(weeklyButton).toHaveClass('bg-blue-600');
    expect(monthlyButton).not.toHaveClass('bg-blue-600');
  });

  it('switches between weekly and monthly data correctly', () => {
    render(
      <ThemeProvider>
        <SalesChartDemo />
      </ThemeProvider>
    );
    
    const monthlyButton = screen.getByText('Monthly');
    const weeklyButton = screen.getByText('Weekly');
    
    // Switch to monthly
    fireEvent.click(monthlyButton);
    expect(monthlyButton).toHaveClass('bg-blue-600');
    expect(weeklyButton).not.toHaveClass('bg-blue-600');
    
    // Switch back to weekly
    fireEvent.click(weeklyButton);
    expect(weeklyButton).toHaveClass('bg-blue-600');
    expect(monthlyButton).not.toHaveClass('bg-blue-600');
  });

  it('renders chart components with real data', () => {
    render(
      <ThemeProvider>
        <SalesChartDemo />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('area')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
  });
});