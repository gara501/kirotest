import { expect } from 'vitest';
import type { AxeResults } from 'axe-core';

// Custom matcher for axe violations
expect.extend({
  toHaveNoViolations(received: AxeResults) {
    const violations = received.violations;
    const pass = violations.length === 0;

    if (pass) {
      return {
        message: () => 'Expected accessibility violations, but none were found',
        pass: true,
      };
    } else {
      const violationMessages = violations.map(violation => 
        `${violation.id}: ${violation.description}\n  ${violation.nodes.map(node => node.target).join(', ')}`
      ).join('\n');

      return {
        message: () => `Expected no accessibility violations, but found:\n${violationMessages}`,
        pass: false,
      };
    }
  },
});

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveNoViolations(): T;
  }
}