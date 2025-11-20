import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axe } from 'jest-axe';
import { UserMenu } from '../UserMenu';
import { ThemeProvider } from '../../../providers/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('UserMenu', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  const mockUserWithAvatar = {
    ...mockUser,
    avatar: 'https://example.com/avatar.jpg',
  };

  const mockOnLogout = vi.fn();

  beforeEach(() => {
    mockOnLogout.mockClear();
  });

  it('renders user menu button with initials when no avatar provided', () => {
    renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );

    // Should show initials fallback
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders user avatar when provided', () => {
    renderWithTheme(
      <UserMenu user={mockUserWithAvatar} onLogout={mockOnLogout} />
    );

    const avatar = screen.getByRole('img', { name: 'John Doe avatar' });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('generates correct initials for different name formats', () => {
    const testCases = [
      { name: 'John Doe', expected: 'JD' },
      { name: 'Jane Smith Johnson', expected: 'JS' },
      { name: 'Alice', expected: 'A' },
      { name: 'bob charlie david edward', expected: 'BC' },
    ];

    testCases.forEach(({ name, expected }) => {
      const { unmount } = renderWithTheme(
        <UserMenu user={{ ...mockUser, name }} onLogout={mockOnLogout} />
      );
      
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    });
  });

  it('opens dropdown menu when clicked', async () => {
    renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  it('calls onLogout when logout menu item is clicked', async () => {
    renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    await waitFor(() => {
      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);
    });

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('shows chevron icon that rotates when menu is open', async () => {
    renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );

    const menuButton = screen.getByRole('button');
    const chevron = menuButton.querySelector('svg:last-child');
    
    expect(chevron).toBeInTheDocument();
    expect(chevron).not.toHaveClass('rotate-180');

    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(chevron).toHaveClass('rotate-180');
    });
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );

    const menuButton = screen.getByRole('button');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports keyboard navigation', async () => {
    renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );

    const menuButton = screen.getByRole('button');
    
    // Open menu with Enter key
    fireEvent.keyDown(menuButton, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });
  });

  it('applies correct styling for focus states', () => {
    renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );

    const menuButton = screen.getByRole('button');
    expect(menuButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
  });

  it('supports dark mode styling', () => {
    renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );

    const menuButton = screen.getByRole('button');
    expect(menuButton).toHaveClass('text-gray-300', 'hover:text-white', 'hover:bg-gray-700');
  });

  it('meets accessibility guidelines', async () => {
    const { container } = renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines with avatar', async () => {
    const { container } = renderWithTheme(
      <UserMenu user={mockUserWithAvatar} onLogout={mockOnLogout} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines with open menu', async () => {
    const { container } = renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders consistently (snapshot)', () => {
    const { container } = renderWithTheme(
      <UserMenu user={mockUser} onLogout={mockOnLogout} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders consistently with avatar (snapshot)', () => {
    const { container } = renderWithTheme(
      <UserMenu user={mockUserWithAvatar} onLogout={mockOnLogout} />
    );
    expect(container.firstChild).toMatchSnapshot('user-menu-with-avatar');
  });
});