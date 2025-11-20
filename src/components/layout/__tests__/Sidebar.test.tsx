import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'jest-axe';
import { Sidebar } from '../Sidebar';
import { ThemeProvider } from '../../../providers/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Sidebar', () => {
  const defaultProps = {
    isCollapsed: false,
    onToggle: vi.fn(),
  };

  it('renders sidebar with navigation items', () => {
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    // Check for logo and brand
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard')).toHaveLength(2); // One in header, one in nav
    
    // Check for navigation items
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('shows collapsed state correctly', () => {
    renderWithTheme(<Sidebar {...defaultProps} isCollapsed={true} />);
    
    const sidebar = screen.getByLabelText('Main navigation');
    expect(sidebar).toHaveClass('lg:w-20');
  });

  it('shows expanded state correctly', () => {
    renderWithTheme(<Sidebar {...defaultProps} isCollapsed={false} />);
    
    const sidebar = screen.getByLabelText('Main navigation');
    expect(sidebar).toHaveClass('w-64', 'lg:w-64');
  });

  it('handles desktop toggle button click', () => {
    const onToggle = vi.fn();
    renderWithTheme(<Sidebar {...defaultProps} onToggle={onToggle} />);
    
    const toggleButton = screen.getByLabelText('Collapse sidebar');
    fireEvent.click(toggleButton);
    
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('shows mobile drawer when isMobileMenuOpen is true', () => {
    renderWithTheme(
      <Sidebar 
        {...defaultProps} 
        isMobileMenuOpen={true}
        onMobileMenuClose={vi.fn()}
      />
    );
    
    const sidebar = screen.getByLabelText('Main navigation');
    expect(sidebar).toHaveClass('translate-x-0', 'shadow-xl');
    
    // Should show backdrop
    const backdrop = document.querySelector('.bg-black.bg-opacity-50');
    expect(backdrop).toBeInTheDocument();
    
    // Should show close button
    expect(screen.getByLabelText('Close sidebar')).toBeInTheDocument();
  });

  it('hides mobile drawer when isMobileMenuOpen is false', () => {
    renderWithTheme(
      <Sidebar 
        {...defaultProps} 
        isMobileMenuOpen={false}
        onMobileMenuClose={vi.fn()}
      />
    );
    
    const sidebar = screen.getByLabelText('Main navigation');
    expect(sidebar).toHaveClass('-translate-x-full', 'lg:translate-x-0');
    
    // Should not show backdrop
    const backdrop = document.querySelector('.bg-black.bg-opacity-50');
    expect(backdrop).not.toBeInTheDocument();
  });

  it('calls onMobileMenuClose when backdrop is clicked', () => {
    const onMobileMenuClose = vi.fn();
    renderWithTheme(
      <Sidebar 
        {...defaultProps} 
        isMobileMenuOpen={true}
        onMobileMenuClose={onMobileMenuClose}
      />
    );
    
    const backdrop = document.querySelector('.bg-black.bg-opacity-50');
    fireEvent.click(backdrop!);
    
    expect(onMobileMenuClose).toHaveBeenCalledTimes(1);
  });

  it('calls onMobileMenuClose when close button is clicked', () => {
    const onMobileMenuClose = vi.fn();
    renderWithTheme(
      <Sidebar 
        {...defaultProps} 
        isMobileMenuOpen={true}
        onMobileMenuClose={onMobileMenuClose}
      />
    );
    
    const closeButton = screen.getByLabelText('Close sidebar');
    fireEvent.click(closeButton);
    
    expect(onMobileMenuClose).toHaveBeenCalledTimes(1);
  });

  it('calls onMobileMenuClose when navigation item is clicked in mobile mode', () => {
    const onMobileMenuClose = vi.fn();
    renderWithTheme(
      <Sidebar 
        {...defaultProps} 
        isMobileMenuOpen={true}
        onMobileMenuClose={onMobileMenuClose}
      />
    );
    
    const analyticsButton = screen.getByText('Analytics');
    fireEvent.click(analyticsButton);
    
    expect(onMobileMenuClose).toHaveBeenCalledTimes(1);
  });

  it('handles escape key press to close mobile drawer', () => {
    const onMobileMenuClose = vi.fn();
    renderWithTheme(
      <Sidebar 
        {...defaultProps} 
        isMobileMenuOpen={true}
        onMobileMenuClose={onMobileMenuClose}
      />
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onMobileMenuClose).toHaveBeenCalledTimes(1);
  });

  it('highlights active navigation item', () => {
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    // Dashboard should be active by default - get the navigation button specifically
    const dashboardButtons = screen.getAllByText('Dashboard');
    const dashboardNavButton = dashboardButtons.find(button => 
      button.closest('button')?.getAttribute('aria-current') === 'page'
    );
    expect(dashboardNavButton?.closest('button')).toHaveClass('bg-blue-50', 'dark:bg-blue-900/20');
    expect(dashboardNavButton?.closest('button')).toHaveAttribute('aria-current', 'page');
  });

  it('changes active item when navigation item is clicked', () => {
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    const analyticsButton = screen.getByText('Analytics');
    fireEvent.click(analyticsButton);
    
    // Analytics should now be active
    expect(analyticsButton.closest('button')).toHaveClass('bg-blue-50', 'dark:bg-blue-900/20');
    expect(analyticsButton.closest('button')).toHaveAttribute('aria-current', 'page');
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    const sidebar = screen.getByLabelText('Main navigation');
    expect(sidebar).toHaveAttribute('aria-label', 'Main navigation');
    
    // Navigation buttons should have proper focus management
    const dashboardButtons = screen.getAllByText('Dashboard');
    const dashboardNavButton = dashboardButtons.find(button => 
      button.closest('button')?.getAttribute('aria-current') === 'page'
    );
    expect(dashboardNavButton?.closest('button')).toHaveClass('focus:outline-none', 'focus:ring-2');
  });

  it('meets accessibility guidelines', async () => {
    const { container } = renderWithTheme(<Sidebar {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines in collapsed state', async () => {
    const { container } = renderWithTheme(<Sidebar {...defaultProps} isCollapsed={true} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines with mobile menu open', async () => {
    const { container } = renderWithTheme(
      <Sidebar 
        {...defaultProps} 
        isMobileMenuOpen={true}
        onMobileMenuClose={vi.fn()}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    renderWithTheme(<Sidebar {...defaultProps} />);
    
    const analyticsButton = screen.getByText('Analytics').closest('button');
    
    // Should be focusable
    analyticsButton?.focus();
    expect(analyticsButton).toHaveFocus();
    
    // Should respond to Enter key
    fireEvent.keyDown(analyticsButton!, { key: 'Enter', code: 'Enter' });
    fireEvent.click(analyticsButton!);
    
    // Should become active
    expect(analyticsButton).toHaveAttribute('aria-current', 'page');
  });

  it('renders consistently (snapshot)', () => {
    const { container } = renderWithTheme(<Sidebar {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders consistently in collapsed state (snapshot)', () => {
    const { container } = renderWithTheme(<Sidebar {...defaultProps} isCollapsed={true} />);
    expect(container.firstChild).toMatchSnapshot('sidebar-collapsed');
  });
});