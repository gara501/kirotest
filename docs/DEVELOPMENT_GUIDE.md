# Development Guide

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 20+ (LTS recommended)
- **Package Manager**: npm (included with Node.js)
- **Git**: For version control
- **VS Code**: Recommended editor with extensions

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Initial Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd kirodemo
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit environment variables
   nano .env.local
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Verify Setup**
   - Open http://localhost:5173
   - Check console for errors
   - Test theme switching
   - Verify responsive behavior

---

## 📁 Project Structure Deep Dive

### Source Organization

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI primitives
│   ├── layout/          # Layout-specific components
│   ├── dashboard/       # Business logic components
│   └── providers/       # Context providers
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
├── utils/               # Pure utility functions
├── data/                # Mock data and constants
└── test/                # Test configuration
```

### File Naming Conventions

- **Components**: PascalCase (`KPICard.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useTheme.ts`)
- **Types**: camelCase (`dashboard.ts`)
- **Utils**: camelCase (`formatters.ts`)
- **Tests**: Component name + `.test.tsx`

### Import/Export Patterns

```typescript
// Barrel exports in index.ts files
export { Button } from './Button';
export { Card } from './Card';
export { ThemeToggle } from './ThemeToggle';

// Named exports for components
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(...)

// Type-only imports
import type { ButtonProps } from '../types/common';

// Grouped imports
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { ComponentProps } from '../../types';
```

---

## 🧪 Testing Workflow

### Test Structure

```
src/components/ui/__tests__/
├── Button.test.tsx           # Unit tests
├── Card.test.tsx            # Unit tests
└── __snapshots__/           # Snapshot files
    ├── Button.test.tsx.snap
    └── Card.test.tsx.snap
```

### Writing Tests

#### 1. Basic Component Test
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

#### 2. Interaction Test
```typescript
import userEvent from '@testing-library/user-event';

it('handles click events', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  
  render(<Button onClick={handleClick}>Click me</Button>);
  await user.click(screen.getByRole('button'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### 3. Accessibility Test
```typescript
import { axe } from 'jest-axe';

it('meets accessibility guidelines', async () => {
  const { container } = render(<Button>Accessible Button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### 4. Theme Provider Wrapper
```typescript
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage

# Run specific test file
npm run test Button.test.tsx

# Run tests matching pattern
npm run test -- --grep "accessibility"
```

### Test Coverage Goals

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

---

## 🎨 Styling Guidelines

### TailwindCSS Best Practices

#### 1. Component-First Approach
```typescript
// ✅ Good: Compose utilities in components
const Button = ({ variant, size, className, ...props }) => {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium',
        // Variant styles
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        // Size styles
        size === 'lg' && 'h-12 px-6 text-lg',
        // User overrides
        className
      )}
      {...props}
    />
  );
};

// ❌ Avoid: Long className strings in JSX
<div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
```

#### 2. Responsive Design Patterns
```typescript
// Mobile-first responsive classes
className={cn(
  // Mobile (default)
  'grid grid-cols-1 gap-4 p-4',
  // Tablet
  'sm:grid-cols-2 sm:gap-6 sm:p-6',
  // Desktop
  'lg:grid-cols-4 lg:gap-8 lg:p-8'
)}
```

#### 3. Dark Mode Implementation
```typescript
// Use dark: prefix for dark mode styles
className={cn(
  'bg-white text-gray-900',
  'dark:bg-gray-800 dark:text-gray-100'
)}
```

### Custom CSS Guidelines

```css
/* Use CSS custom properties for theme values */
:root {
  --color-primary: theme('colors.blue.600');
  --color-surface: theme('colors.white');
}

[data-theme='dark'] {
  --color-primary: theme('colors.blue.400');
  --color-surface: theme('colors.gray.800');
}

/* Component-specific styles when Tailwind isn't sufficient */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.400') transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.400');
  border-radius: 3px;
}
```

---

## 🔧 Development Tools

### ESLint Configuration

```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // React specific
      'react-hooks/exhaustive-deps': 'error',
      'react/prop-types': 'off',
      
      // TypeScript specific
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      
      // Import organization
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always'
      }]
    }
  }
];
```

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### Git Hooks (Husky)

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
npm run test -- --run
```

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"]
  ]
}
```

---

## 🚀 Build and Deployment

### Build Process

```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Analyze bundle
npm run build -- --analyze
```

### Build Optimization

#### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  }
});
```

#### Performance Budgets
```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kb",
      "maximumError": "4kb"
    }
  ]
}
```

### Deployment Options

#### 1. Static Hosting (Vercel, Netlify)
```bash
# Build for static hosting
npm run build

# Deploy to Vercel
npx vercel --prod

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### 2. Docker Deployment
```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 3. Environment Configuration
```bash
# .env.production
VITE_API_URL=https://api.production.com
VITE_APP_TITLE=Dashboard Production
VITE_ENABLE_ANALYTICS=true
```

---

## 🔍 Debugging and Troubleshooting

### Common Issues

#### 1. TypeScript Errors
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npm run build

# Check TypeScript configuration
npx tsc --noEmit
```

#### 2. Styling Issues
```bash
# Rebuild Tailwind
npm run build:css

# Check for class conflicts
# Use browser dev tools to inspect computed styles
```

#### 3. Test Failures
```bash
# Clear test cache
npm run test -- --clearCache

# Run tests with verbose output
npm run test -- --verbose

# Debug specific test
npm run test -- --debug Button.test.tsx
```

### Development Tools

#### React Developer Tools
- Install browser extension
- Use Profiler for performance analysis
- Inspect component props and state

#### Browser DevTools
```javascript
// Performance debugging
console.time('Component Render');
// ... component logic
console.timeEnd('Component Render');

// Memory usage
console.log(performance.memory);
```

#### Vite DevTools
```bash
# Enable debug mode
DEBUG=vite:* npm run dev

# Analyze bundle
npm run build -- --debug
```

---

## 📊 Performance Monitoring

### Metrics to Track

1. **Bundle Size**: Keep under 500KB gzipped
2. **First Contentful Paint**: Target < 1.5s
3. **Largest Contentful Paint**: Target < 2.5s
4. **Cumulative Layout Shift**: Target < 0.1
5. **Time to Interactive**: Target < 3s

### Performance Testing

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Bundle analyzer
npm install -g webpack-bundle-analyzer
npx vite-bundle-analyzer
```

### Optimization Checklist

- [ ] Images optimized and properly sized
- [ ] Unused code eliminated (tree shaking)
- [ ] Components memoized where appropriate
- [ ] Large dependencies code-split
- [ ] Critical CSS inlined
- [ ] Service worker implemented (if needed)

---

## 🤝 Contributing Guidelines

### Code Review Checklist

#### Functionality
- [ ] Feature works as expected
- [ ] Edge cases handled
- [ ] Error states implemented
- [ ] Loading states included

#### Code Quality
- [ ] TypeScript types are accurate
- [ ] Components are properly memoized
- [ ] No console.log statements
- [ ] Proper error handling

#### Testing
- [ ] Unit tests written and passing
- [ ] Accessibility tests included
- [ ] Edge cases covered
- [ ] Snapshots updated if needed

#### Documentation
- [ ] Props documented with JSDoc
- [ ] README updated if needed
- [ ] Type definitions exported
- [ ] Examples provided

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Accessibility tests pass
- [ ] Manual testing completed

## Screenshots
Include screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

---

## 📚 Learning Resources

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Testing
- [Testing Library Documentation](https://testing-library.com/)
- [Vitest Documentation](https://vitest.dev/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)

### Styling
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Headless UI Documentation](https://headlessui.com/)
- [Heroicons](https://heroicons.com/)

### Tools
- [Vite Documentation](https://vitejs.dev/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

---

*This development guide provides comprehensive information for working with the dashboard project. Follow these guidelines to maintain code quality and consistency.*