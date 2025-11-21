# Project Structure & Organization

## Directory Layout

```
src/
├── components/           # React components organized by feature
│   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   ├── dashboard/       # Dashboard-specific components (KPICard, SalesChart)
│   ├── layout/          # Layout components (Header, Sidebar, DashboardLayout)
│   └── index.ts         # Component exports
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
├── data/                # Mock data and constants
├── contexts/            # React contexts
├── providers/           # Context providers
└── test-utils/          # Testing utilities and setup
```

## Component Organization

### Feature-Based Structure

- Components grouped by functionality rather than type
- Each component folder includes its tests in `__tests__/` subdirectory
- Index files for clean imports: `import { Button } from './components/ui'`

### Naming Conventions

- **Components**: PascalCase (e.g., `KPICard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useTheme.ts`)
- **Types**: PascalCase interfaces (e.g., `ButtonProps`)
- **Utils**: camelCase functions (e.g., `formatCurrency`)

## File Patterns

### Component Files

```typescript
// Component implementation
export const ComponentName = React.forwardRef<HTMLElement, Props>(...)

// Default export for the component
ComponentName.displayName = 'ComponentName'
```

### Test Files

- Located in `__tests__/` directories alongside components
- Named `ComponentName.test.tsx`
- Include accessibility tests with `jest-axe`
- Snapshots stored in `__snapshots__/` subdirectories

### Type Definitions

- Organized by domain in `src/types/`
- Common types in `common.ts`
- Feature-specific types in dedicated files
- All types exported through `index.ts`

## Import/Export Patterns

### Barrel Exports

- Use index files for clean imports
- Export components, hooks, and types through barrel files
- Avoid deep import paths in application code

### Import Order

1. React and external libraries
2. Internal components and hooks
3. Types (with `type` keyword)
4. Relative imports

## Configuration Files

### Root Level

- `package.json` - Dependencies and scripts
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - Linting rules
- `.lintstagedrc.js` - Pre-commit hooks

### Development

- `.husky/` - Git hooks configuration
- `docs/` - Project documentation
- `specs/` - Component specifications
- `scripts/` - Build and utility scripts
