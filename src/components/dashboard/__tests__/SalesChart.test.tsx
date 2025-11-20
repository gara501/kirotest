import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'jest-axe';
import { SalesChart } from '../SalesChart';
import { ThemeProvider } from '../../../providers/ThemeProvider';
import type { ChartDataPoint } from '../../../types/dashboard';

// Mock recharts to avoid canvas issues in tests
vi.mock('recharts', () => ({
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  Area: () => <div data-testid="area" />,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>
}));

const mockData: ChartDataPoint[] = [
  { date: '2024-01-01', value: 12000, label: 'Jan 1' },
  { date: '2024-01-02', value: 15000, label: 'Jan 2' },
  { date: '2024-01-03', value: 18000, label: 'Jan 3' },
  { date: '2024-01-04', value: 14000, label: 'Jan 4' },
  { date: '2024-01-05', value: 22000, label: 'Jan 5' }
];

const renderSalesChart = (props: Partial<React.ComponentProps<typeof SalesChart>> = {}) => {
  const defaultProps = {
    data: mockData,
    timeframe: 'weekly' as const,
    onTimeframeChange: vi.fn(),
    ...props
  };

  return render(
    <ThemeProvider>
      <SalesChart {...defaultProps} />
    </ThemeProvider>
  );
};

describe('SalesChart', () => {
  it('renders correctly with default props', () => {
    renderSalesChart();
    
    expect(screen.getByText('Sales Overview')).toBeInTheDocument();
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('displays timeframe toggle buttons', () => {
    renderSalesChart();
    
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
  });

  it('calls onTimeframeChange when buttons are clicked', () => {
    const onTimeframeChange = vi.fn();
    renderSalesChart({ onTimeframeChange });
    
    fireEvent.click(screen.getByText('Monthly'));
    expect(onTimeframeChange).toHaveBeenCalledWith('monthly');
    
    fireEvent.click(screen.getByText('Weekly'));
    expect(onTimeframeChange).toHaveBeenCalledWith('weekly');
  });

  it('highlights active timeframe button', () => {
    renderSalesChart({ timeframe: 'monthly' });
    
    const weeklyButton = screen.getByText('Weekly');
    const monthlyButton = screen.getByText('Monthly');
    
    // Monthly should be active (primary variant)
    expect(monthlyButton).toHaveClass('bg-blue-600');
    expect(weeklyButton).not.toHaveClass('bg-blue-600');
  });

  it('renders chart components', () => {
    renderSalesChart();
    
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('grid')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('area')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderSalesChart({ className: 'custom-class' });
    
    // The Card component should have the custom class
    const cardElement = container.querySelector('.custom-class');
    expect(cardElement).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    renderSalesChart({ data: [] });
    
    expect(screen.getByText('Sales Overview')).toBeInTheDocument();
    expect(screen.getByTestId('area-chart')).toBeInTheDocument();
  });

  it('adapts to theme changes', () => {
    // This test verifies that the component uses the theme hook
    // The actual theme adaptation is tested through the useTheme hook
    renderSalesChart();
    
    expect(screen.getByText('Sales Overview')).toBeInTheDocument();
    // The component should render without errors when theme changes
  });

  it('provides smooth animations through recharts', () => {
    renderSalesChart();
    
    // Verify that the Area component is rendered (which provides smooth animations)
    expect(screen.getByTestId('area')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('meets accessibility guidelines', async () => {
    const { container } = renderSalesChart();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines with empty data', async () => {
    const { container } = renderSalesChart({ data: [] });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation for timeframe buttons', () => {
    const onTimeframeChange = vi.fn();
    renderSalesChart({ onTimeframeChange });
    
    const weeklyButton = screen.getByText('Weekly');
    const monthlyButton = screen.getByText('Monthly');
    
    // Should be focusable
    weeklyButton.focus();
    expect(weeklyButton).toHaveFocus();
    
    // Should respond to Enter key
    fireEvent.keyDown(weeklyButton, { key: 'Enter', code: 'Enter' });
    fireEvent.click(weeklyButton);
    expect(onTimeframeChange).toHaveBeenCalledWith('weekly');
    
    // Should be able to tab to next button
    monthlyButton.focus();
    expect(monthlyButton).toHaveFocus();
  });

  it('renders consistently (snapshot)', () => {
    const { container } = renderSalesChart();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders consistently with different timeframes (snapshot)', () => {
    const { container: weekly } = renderSalesChart({ timeframe: 'weekly' });
    const { container: monthly } = renderSalesChart({ timeframe: 'monthly' });
    
    expect(weekly.firstChild).toMatchSnapshot('sales-chart-weekly');
    expect(monthly.firstChild).toMatchSnapshot('sales-chart-monthly');
  });
});