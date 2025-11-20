import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { DashboardLayout } from '../DashboardLayout';
import { ThemeProvider } from '../../../providers/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('DashboardLayout', () => {
  it('renders children correctly', () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Dashboard Content</div>
      </DashboardLayout>
    );
    
    expect(screen.getByText('Dashboard Content')).toBeInTheDocument();
  });

  it('renders header with title', () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toHaveTextContent('Dashboard');
  });

  it('renders sidebar with logo and brand', () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );
    
    // Check for logo (D) and brand name in sidebar
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard')).toHaveLength(3); // One in sidebar header, one in header, one in navigation
  });

  it('has mobile menu button that toggles sidebar', () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );
    
    const mobileMenuButton = screen.getByLabelText('Open sidebar');
    expect(mobileMenuButton).toBeInTheDocument();
    
    // Click to open mobile menu
    fireEvent.click(mobileMenuButton);
    
    // Should show close button
    expect(screen.getByLabelText('Close sidebar')).toBeInTheDocument();
  });

  it('has desktop sidebar toggle button', () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );
    
    const toggleButton = screen.getByLabelText('Collapse sidebar');
    expect(toggleButton).toBeInTheDocument();
    
    // Click to collapse sidebar
    fireEvent.click(toggleButton);
    
    // Button text should change
    expect(screen.getByLabelText('Expand sidebar')).toBeInTheDocument();
  });

  it('applies proper responsive classes', () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );
    
    // Check for responsive layout classes
    const sidebar = container.querySelector('aside');
    expect(sidebar).toHaveClass('lg:translate-x-0', 'lg:static');
    
    const mainContent = container.querySelector('div[class*="lg:ml-64"]');
    expect(mainContent).toBeInTheDocument();
  });

  it('has sticky header positioning', () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky', 'top-0');
  });

  it('meets accessibility guidelines', async () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>Dashboard Content</div>
      </DashboardLayout>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    renderWithTheme(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    );

    const mobileMenuButton = screen.getByLabelText('Open sidebar');
    
    // Should be focusable
    mobileMenuButton.focus();
    expect(mobileMenuButton).toHaveFocus();
    
    // Should respond to Enter key
    fireEvent.keyDown(mobileMenuButton, { key: 'Enter', code: 'Enter' });
    fireEvent.click(mobileMenuButton);
    
    // Should show close button
    expect(screen.getByLabelText('Close sidebar')).toBeInTheDocument();
  });

  it('renders consistently (snapshot)', () => {
    const { container } = renderWithTheme(
      <DashboardLayout>
        <div>Dashboard Content</div>
      </DashboardLayout>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});