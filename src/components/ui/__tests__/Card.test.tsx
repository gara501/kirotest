import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default padding and shadow classes', () => {
    const { container } = render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-4'); // default md padding
    expect(card).toHaveClass('shadow-sm'); // default sm shadow
  });

  it('applies custom padding class', () => {
    const { container } = render(
      <Card padding="lg">
        <p>Test content</p>
      </Card>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('p-6');
  });

  it('applies hover effect when hover prop is true', () => {
    const { container } = render(
      <Card hover>
        <p>Test content</p>
      </Card>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('hover:shadow-md');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Test content</p>
      </Card>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('has proper theme-aware styling classes', () => {
    const { container } = render(
      <Card>
        <p>Test content</p>
      </Card>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white', 'dark:bg-gray-800');
    expect(card).toHaveClass('border-gray-200', 'dark:border-gray-700');
  });

  it('meets accessibility guidelines', async () => {
    const { container } = render(
      <Card>
        <p>Accessible content</p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines with hover effects', async () => {
    const { container } = render(
      <Card hover>
        <p>Hoverable content</p>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders consistently (snapshot)', () => {
    const { container } = render(
      <Card>
        <p>Snapshot content</p>
      </Card>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders consistently with different padding sizes (snapshot)', () => {
    const { container: sm } = render(<Card padding="sm"><p>Small</p></Card>);
    const { container: md } = render(<Card padding="md"><p>Medium</p></Card>);
    const { container: lg } = render(<Card padding="lg"><p>Large</p></Card>);
    
    expect(sm.firstChild).toMatchSnapshot('card-padding-sm');
    expect(md.firstChild).toMatchSnapshot('card-padding-md');
    expect(lg.firstChild).toMatchSnapshot('card-padding-lg');
  });
});