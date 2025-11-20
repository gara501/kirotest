import { describe, it, expect } from 'vitest';
import { cn } from '../cn';

describe('cn utility', () => {
  it('merges classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('handles conditional classes', () => {
    const isTrue = true;
    const isFalse = false;
    expect(cn('base-class', isTrue && 'conditional-class')).toBe('base-class conditional-class');
    expect(cn('base-class', isFalse && 'conditional-class')).toBe('base-class');
  });

  it('handles arrays and objects', () => {
    expect(cn(['class1', 'class2'], { 'class3': true, 'class4': false })).toBe('class1 class2 class3');
  });
});