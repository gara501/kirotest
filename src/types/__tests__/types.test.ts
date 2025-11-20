import { describe, it, expect } from 'vitest';
import type { 
  Theme, 
  KPICardProps, 
  ActivityType, 

  ButtonVariant
} from '../index';
import { STORAGE_KEYS } from '../common';

describe('TypeScript types', () => {
  it('should have correct theme types', () => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    expect(themes).toHaveLength(3);
  });

  it('should have correct activity types', () => {
    const activityTypes: ActivityType[] = ['success', 'warning', 'danger', 'info'];
    expect(activityTypes).toHaveLength(4);
  });

  it('should have correct button variants', () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
    expect(variants).toHaveLength(5);
  });

  it('should have storage keys defined', () => {
    expect(STORAGE_KEYS.THEME).toBe('dashboard-theme');
    expect(STORAGE_KEYS.SIDEBAR_COLLAPSED).toBe('sidebar-collapsed');
    expect(STORAGE_KEYS.USER_PREFERENCES).toBe('user-preferences');
  });

  it('should allow creating KPI card props', () => {
    const mockIcon = () => null;
    const kpiProps: KPICardProps = {
      title: 'Test KPI',
      value: 100,
      icon: mockIcon,
      trend: {
        direction: 'up',
        value: '5%',
        label: 'vs last month'
      }
    };
    
    expect(kpiProps.title).toBe('Test KPI');
    expect(kpiProps.value).toBe(100);
    expect(kpiProps.trend?.direction).toBe('up');
  });
});