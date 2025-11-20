import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { KPICard } from '../KPICard';
import { ThemeProvider } from '../../../providers/ThemeProvider';

// Mock icon component for testing
const MockIcon = ({ className }: { className?: string }) => (
  <div className={className} data-testid="mock-icon">Icon</div>
);

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('KPICard', () => {
  const defaultProps = {
    title: 'Total Users',
    value: 1234,
    icon: MockIcon,
  };

  it('renders correctly with default props', () => {
    renderWithTheme(<KPICard {...defaultProps} />);
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('renders string values correctly', () => {
    renderWithTheme(
      <KPICard {...defaultProps} value="$12,345" />
    );
    
    expect(screen.getByText('$12,345')).toBeInTheDocument();
  });

  it('renders trend information when provided', () => {
    const trend = {
      direction: 'up' as const,
      value: '+12%',
      label: 'vs last month'
    };

    renderWithTheme(
      <KPICard {...defaultProps} trend={trend} />
    );
    
    expect(screen.getByText('+12%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('applies correct trend colors for up direction', () => {
    const trend = {
      direction: 'up' as const,
      value: '+12%',
      label: 'vs last month'
    };

    renderWithTheme(
      <KPICard {...defaultProps} trend={trend} />
    );
    
    const trendElement = screen.getByText('+12%').parentElement;
    expect(trendElement).toHaveClass('text-emerald-600');
  });

  it('applies correct trend colors for down direction', () => {
    const trend = {
      direction: 'down' as const,
      value: '-5%',
      label: 'vs last month'
    };

    renderWithTheme(
      <KPICard {...defaultProps} trend={trend} />
    );
    
    const trendElement = screen.getByText('-5%').parentElement;
    expect(trendElement).toHaveClass('text-red-600');
  });

  it('applies correct trend colors for neutral direction', () => {
    const trend = {
      direction: 'neutral' as const,
      value: '0%',
      label: 'vs last month'
    };

    renderWithTheme(
      <KPICard {...defaultProps} trend={trend} />
    );
    
    const trendElement = screen.getByText('0%').parentElement;
    expect(trendElement).toHaveClass('text-gray-600');
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <KPICard {...defaultProps} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct responsive height classes', () => {
    const { container } = renderWithTheme(<KPICard {...defaultProps} />);
    
    expect(container.firstChild).toHaveClass('h-32', 'sm:h-36', 'lg:h-40');
  });

  it('has hover animation classes', () => {
    const { container } = renderWithTheme(<KPICard {...defaultProps} />);
    
    expect(container.firstChild).toHaveClass(
      'transition-all',
      'duration-300',
      'hover:shadow-lg',
      'hover:-translate-y-1',
      'cursor-pointer'
    );
  });

  it('has icon with background styling', () => {
    renderWithTheme(<KPICard {...defaultProps} />);
    
    const iconContainer = screen.getByTestId('mock-icon').parentElement;
    expect(iconContainer).toHaveClass('p-2', 'rounded-lg', 'bg-blue-50');
  });

  it('truncates long titles', () => {
    renderWithTheme(
      <KPICard 
        {...defaultProps} 
        title="This is a very long title that should be truncated" 
      />
    );
    
    const titleElement = screen.getByText('This is a very long title that should be truncated');
    expect(titleElement).toHaveClass('truncate');
  });

  it('meets accessibility guidelines', async () => {
    const { container } = renderWithTheme(<KPICard {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines with trend data', async () => {
    const trend = {
      direction: 'up' as const,
      value: '+12%',
      label: 'vs last month'
    };

    const { container } = renderWithTheme(
      <KPICard {...defaultProps} trend={trend} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders consistently (snapshot)', () => {
    const { container } = renderWithTheme(<KPICard {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders consistently with trend data (snapshot)', () => {
    const trend = {
      direction: 'up' as const,
      value: '+12%',
      label: 'vs last month'
    };

    const { container } = renderWithTheme(
      <KPICard {...defaultProps} trend={trend} />
    );
    expect(container.firstChild).toMatchSnapshot('kpi-card-with-trend');
  });
});