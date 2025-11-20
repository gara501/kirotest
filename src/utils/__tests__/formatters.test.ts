import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatRelativeTime,
  generateInitials,

} from '../formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
    });
  });

  describe('formatNumber', () => {
    it('formats numbers with appropriate suffixes', () => {
      expect(formatNumber(500)).toBe('500');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(1500000000)).toBe('1.5B');
    });
  });

  describe('formatPercentage', () => {
    it('formats percentages correctly', () => {
      expect(formatPercentage(12.345)).toBe('12.3%');
      expect(formatPercentage(12.345, 2)).toBe('12.35%');
    });
  });

  describe('generateInitials', () => {
    it('generates initials from names', () => {
      expect(generateInitials('John Doe')).toBe('JD');
      expect(generateInitials('Jane Smith Johnson')).toBe('JS');
      expect(generateInitials('Alice')).toBe('A');
    });
  });

  describe('formatRelativeTime', () => {
    it('formats relative time correctly', () => {
      const now = new Date();
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');
      expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago');
    });
  });
});