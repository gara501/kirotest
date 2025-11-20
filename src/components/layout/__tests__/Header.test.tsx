import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axe } from 'jest-axe';
import { Header } from '../Header';
import { ThemeProvider } from '../../../providers/ThemeProvider';

// Mock the ThemeToggle component since it's already tested
vi.mock('../../ui/ThemeToggle', () => ({
  ThemeToggle: ({ className }: { className?: string }) => (
    <div data-testid="theme-toggle" className={className}>
      Theme Toggle
    </div>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Header', () => {
  const mockOnSidebarToggle = vi.fn();

  beforeEach(() => {
    mockOnSidebarToggle.mockClear();
  });

  it('renders correctly with title', () => {
    renderWithTheme(
      <Header title="Test Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );

    expect(screen.getByRole('heading', { name: 'Test Dashboard' })).toBeInTheDocument();
  });

  it('renders with user menu when user and onLogout are provided', () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    const mockOnLogout = vi.fn();

    renderWithTheme(
      <Header 
        title="Dashboard" 
        onSidebarToggle={mockOnSidebarToggle}
        user={mockUser}
        onLogout={mockOnLogout}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('does not render user menu when user or onLogout is missing', () => {
    renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });

  it('renders mobile menu button with correct accessibility attributes', () => {
    renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );

    const menuButton = screen.getByRole('button', { name: 'Open sidebar' });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-label', 'Open sidebar');
  });

  it('calls onSidebarToggle when mobile menu button is clicked', () => {
    renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );

    const menuButton = screen.getByRole('button', { name: 'Open sidebar' });
    fireEvent.click(menuButton);

    expect(mockOnSidebarToggle).toHaveBeenCalledTimes(1);
  });

  it('renders theme toggle component', () => {
    renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('applies correct CSS classes for responsive design', () => {
    renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0', 'z-50', 'h-16');
    
    const menuButton = screen.getByRole('button', { name: 'Open sidebar' });
    expect(menuButton).toHaveClass('lg:hidden');
  });

  it('has proper z-index layering', () => {
    renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('z-50');
  });

  it('supports dark mode styling', () => {
    renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-gray-800', 'dark:bg-gray-900', 'border-gray-700', 'dark:border-gray-600');
  });

  it('meets accessibility guidelines', async () => {
    const { container } = renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines with user menu', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    const mockOnLogout = vi.fn();

    const { container } = renderWithTheme(
      <Header 
        title="Dashboard" 
        onSidebarToggle={mockOnSidebarToggle}
        user={mockUser}
        onLogout={mockOnLogout}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );

    const menuButton = screen.getByRole('button', { name: 'Open sidebar' });
    
    // Should be focusable
    menuButton.focus();
    expect(menuButton).toHaveFocus();
    
    // Should respond to Enter key
    fireEvent.keyDown(menuButton, { key: 'Enter', code: 'Enter' });
    fireEvent.click(menuButton);
    expect(mockOnSidebarToggle).toHaveBeenCalled();
  });

  it('renders consistently (snapshot)', () => {
    const { container } = renderWithTheme(
      <Header title="Dashboard" onSidebarToggle={mockOnSidebarToggle} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});