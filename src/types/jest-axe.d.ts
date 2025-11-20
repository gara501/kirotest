declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';
  
  export function axe(element: Element | Document, options?: any): Promise<AxeResults>;
  export function toHaveNoViolations(results: AxeResults): void;
}

declare global {
  namespace Vi {
    interface Assertion<T = any> {
      toHaveNoViolations(): T;
    }
  }
}