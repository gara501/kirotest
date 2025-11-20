import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'jest-axe';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('bg-blue-600'); // primary variant
    expect(button).toHaveClass('h-10'); // md size
  });

  it('applies custom variant classes', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('bg-gray-100');
  });

  it('applies custom size classes', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('h-12');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('shows loading spinner when loading prop is true', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<Button>Accessible Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2');
  });

  it('meets accessibility guidelines', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines when disabled', async () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines when loading', async () => {
    const { container } = render(<Button loading>Loading Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders consistently across themes (snapshot)', () => {
    const { container } = render(<Button>Snapshot Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders consistently with different variants (snapshot)', () => {
    const { container: primary } = render(<Button variant="primary">Primary</Button>);
    const { container: secondary } = render(<Button variant="secondary">Secondary</Button>);
    const { container: outline } = render(<Button variant="outline">Outline</Button>);
    
    expect(primary.firstChild).toMatchSnapshot('button-primary');
    expect(secondary.firstChild).toMatchSnapshot('button-secondary');
    expect(outline.firstChild).toMatchSnapshot('button-outline');
  });
});