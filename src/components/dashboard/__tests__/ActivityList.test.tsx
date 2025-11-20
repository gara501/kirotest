/**
 * Tests for ActivityList component
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { axe } from 'jest-axe';
import { ActivityList } from '../ActivityList';
import type { Activity } from '../../../types/dashboard';

// Mock data for testing
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'success',
    title: 'User Registration',
    description: 'New user John Doe registered successfully',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    user: {
      name: 'John Doe',
      avatar: 'https://example.com/avatar.jpg'
    }
  },
  {
    id: '2',
    type: 'warning',
    title: 'High CPU Usage',
    description: 'Server CPU usage exceeded 80% threshold',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: '3',
    type: 'info',
    title: 'System Update',
    description: 'System maintenance completed successfully',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    user: {
      name: 'Admin User'
    }
  }
];

describe('ActivityList', () => {
  it('renders correctly with activities', () => {
    render(<ActivityList activities={mockActivities} />);
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('User Registration')).toBeInTheDocument();
    expect(screen.getByText('High CPU Usage')).toBeInTheDocument();
    expect(screen.getByText('System Update')).toBeInTheDocument();
  });

  it('displays empty state when no activities', () => {
    render(<ActivityList activities={[]} />);
    
    expect(screen.getByText('No recent activities')).toBeInTheDocument();
  });

  it('renders activity with user avatar', () => {
    const activityWithAvatar: Activity[] = [{
      id: '1',
      type: 'success',
      title: 'Test Activity',
      description: 'Test description',
      timestamp: new Date(),
      user: {
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg'
      }
    }];

    render(<ActivityList activities={activityWithAvatar} />);
    
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders activity with user initials when no avatar', () => {
    const activityWithoutAvatar: Activity[] = [{
      id: '1',
      type: 'info',
      title: 'Test Activity',
      description: 'Test description',
      timestamp: new Date(),
      user: {
        name: 'John Doe'
      }
    }];

    render(<ActivityList activities={activityWithoutAvatar} />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders activity type badges when no user', () => {
    const systemActivity: Activity[] = [{
      id: '1',
      type: 'success',
      title: 'System Activity',
      description: 'System description',
      timestamp: new Date()
    }];

    render(<ActivityList activities={systemActivity} />);
    
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('formats timestamps correctly', () => {
    const recentActivity: Activity[] = [{
      id: '1',
      type: 'info',
      title: 'Recent Activity',
      description: 'Just happened',
      timestamp: new Date(Date.now() - 30 * 1000) // 30 seconds ago
    }];

    render(<ActivityList activities={recentActivity} />);
    
    expect(screen.getByText('Just now')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ActivityList activities={mockActivities} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom maxHeight', () => {
    render(<ActivityList activities={mockActivities} maxHeight="300px" />);
    
    const scrollContainer = document.querySelector('.overflow-y-auto');
    expect(scrollContainer).toHaveStyle({ maxHeight: '300px' });
  });

  it('displays user attribution when user is present', () => {
    render(<ActivityList activities={mockActivities} />);
    
    expect(screen.getByText('by John Doe')).toBeInTheDocument();
    expect(screen.getByText('by Admin User')).toBeInTheDocument();
  });

  it('applies correct styling for different activity types', () => {
    const allTypes: Activity[] = [
      { id: '1', type: 'success', title: 'Success', description: 'Success desc', timestamp: new Date() },
      { id: '2', type: 'warning', title: 'Warning', description: 'Warning desc', timestamp: new Date() },
      { id: '3', type: 'danger', title: 'Danger', description: 'Danger desc', timestamp: new Date() },
      { id: '4', type: 'info', title: 'Info', description: 'Info desc', timestamp: new Date() }
    ];

    render(<ActivityList activities={allTypes} />);
    
    expect(screen.getByText('✓')).toBeInTheDocument(); // success
    expect(screen.getByText('⚠')).toBeInTheDocument(); // warning
    expect(screen.getByText('✕')).toBeInTheDocument(); // danger
    expect(screen.getByText('i')).toBeInTheDocument(); // info
  });

  it('displays filter buttons with correct counts', () => {
    const mixedActivities: Activity[] = [
      { id: '1', type: 'success', title: 'Success Activity 1', description: 'Success desc', timestamp: new Date() },
      { id: '2', type: 'success', title: 'Success Activity 2', description: 'Success desc', timestamp: new Date() },
      { id: '3', type: 'warning', title: 'Warning Activity', description: 'Warning desc', timestamp: new Date() },
      { id: '4', type: 'info', title: 'Info Activity', description: 'Info desc', timestamp: new Date() }
    ];

    render(<ActivityList activities={mixedActivities} />);
    
    // Check filter buttons are present by looking for buttons with specific roles
    const filterButtons = screen.getAllByRole('button');
    const buttonTexts = filterButtons.map(button => button.textContent);
    
    expect(buttonTexts.some(text => text?.includes('All'))).toBe(true);
    expect(buttonTexts.some(text => text?.includes('Success'))).toBe(true);
    expect(buttonTexts.some(text => text?.includes('Warning'))).toBe(true);
    expect(buttonTexts.some(text => text?.includes('Error'))).toBe(true);
    expect(buttonTexts.some(text => text?.includes('Info'))).toBe(true);
    
    // Check counts are displayed
    expect(buttonTexts.some(text => text?.includes('4'))).toBe(true); // All count
    expect(buttonTexts.some(text => text?.includes('2'))).toBe(true); // Success count
    expect(buttonTexts.some(text => text?.includes('1'))).toBe(true); // Warning and Info counts
  });

  it('filters activities when filter button is clicked', async () => {
    const user = userEvent.setup();
    
    const mixedActivities: Activity[] = [
      { id: '1', type: 'success', title: 'Success Activity', description: 'Success desc', timestamp: new Date() },
      { id: '2', type: 'warning', title: 'Warning Activity', description: 'Warning desc', timestamp: new Date() },
      { id: '3', type: 'info', title: 'Info Activity', description: 'Info desc', timestamp: new Date() }
    ];

    render(<ActivityList activities={mixedActivities} />);
    
    // Initially all activities should be visible
    expect(screen.getByText('Success Activity')).toBeInTheDocument();
    expect(screen.getByText('Warning Activity')).toBeInTheDocument();
    expect(screen.getByText('Info Activity')).toBeInTheDocument();
    
    // Click on Success filter
    await user.click(screen.getByText('Success'));
    
    // Only success activity should be visible
    expect(screen.getByText('Success Activity')).toBeInTheDocument();
    expect(screen.queryByText('Warning Activity')).not.toBeInTheDocument();
    expect(screen.queryByText('Info Activity')).not.toBeInTheDocument();
  });

  it('shows empty state when no activities match filter', async () => {
    const user = userEvent.setup();
    
    const activitiesWithoutDanger: Activity[] = [
      { id: '1', type: 'success', title: 'Success Activity', description: 'Success desc', timestamp: new Date() },
      { id: '2', type: 'info', title: 'Info Activity', description: 'Info desc', timestamp: new Date() }
    ];

    render(<ActivityList activities={activitiesWithoutDanger} />);
    
    // Click on Error filter (no danger activities exist)
    await user.click(screen.getByText('Error'));
    
    // Should show empty state
    expect(screen.getByText('No activities found for the selected filter')).toBeInTheDocument();
  });

  it('calls onFilter callback when filter is changed', async () => {
    const user = userEvent.setup();
    const mockOnFilter = vi.fn();
    
    render(<ActivityList activities={mockActivities} onFilter={mockOnFilter} />);
    
    // Click on Success filter
    await user.click(screen.getByText('Success'));
    
    expect(mockOnFilter).toHaveBeenCalledWith('success');
  });

  it('does not call onFilter when "All" filter is selected', async () => {
    const user = userEvent.setup();
    const mockOnFilter = vi.fn();
    
    render(<ActivityList activities={mockActivities} onFilter={mockOnFilter} />);
    
    // Click on Success filter first
    await user.click(screen.getByText('Success'));
    
    // Then click on All filter
    await user.click(screen.getByText('All'));
    
    // onFilter should only be called once (for Success)
    expect(mockOnFilter).toHaveBeenCalledTimes(1);
    expect(mockOnFilter).toHaveBeenCalledWith('success');
  });

  it('meets accessibility guidelines', async () => {
    const { container } = render(<ActivityList activities={mockActivities} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('meets accessibility guidelines with empty state', async () => {
    const { container } = render(<ActivityList activities={[]} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('supports keyboard navigation for filters', async () => {
    const user = userEvent.setup();
    render(<ActivityList activities={mockActivities} />);
    
    const successButton = screen.getByText('Success');
    
    // Should be focusable
    successButton.focus();
    expect(successButton).toHaveFocus();
    
    // Should respond to Enter key
    await user.keyboard('{Enter}');
    
    // Should filter activities
    expect(screen.getByText('User Registration')).toBeInTheDocument();
    expect(screen.queryByText('High CPU Usage')).not.toBeInTheDocument();
  });

  it('renders consistently (snapshot)', () => {
    const { container } = render(<ActivityList activities={mockActivities} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders consistently with empty state (snapshot)', () => {
    const { container } = render(<ActivityList activities={[]} />);
    expect(container.firstChild).toMatchSnapshot('activity-list-empty');
  });
});