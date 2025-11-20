import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'jest-axe';
import { ThemeToggle } from '../ThemeToggle';
import { ThemeProvider } from '../../../providers/ThemeProvider';

describe('ThemeToggle', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <ThemeProvider>
        {component}
      </ThemeProvider>
    );
  };

  it('renders theme toggle button', () => {
    renderWithProvider(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('cycles through themes when clicked', () => {
    vi.spyOn(window.localStorage, 'getItem').mockReturnValue('"light"');
    
    renderWithProvider(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    // Should start with light theme
    expect(button).toHaveAttribute('title', 'Current theme: Light');
    
    // Click to go to dark
    fireEvent.click(button);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('dashboard-theme', '"dark"');
  });

  it('has proper accessibility attributes', () => {
    renderWithProvider(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
    expect(button).toHaveAttribute('title');
  });

  it('meets accessibility guidelines', async () => {
    const { container } = renderWithProvider(<ThemeToggle />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation', () => {
    renderWithProvider(<ThemeToggle />);
    
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    // Should be focusable
    button.focus();
    expect(button).toHaveFocus();
    
    // Should respond to Enter key and click
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    fireEvent.click(button);
    // Theme should change (localStorage should be called)
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });

  it('renders consistently (snapshot)', () => {
    const { container } = renderWithProvider(<ThemeToggle />);
    expect(container.firstChild).toMatchSnapshot();
  });
});