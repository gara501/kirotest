# Technology Stack & Build System

## Core Technologies

- **React 19.2.0** - Latest React with concurrent features
- **TypeScript** - Strict mode enabled for type safety
- **Vite 7.2.2** - Fast build tool with HMR
- **TailwindCSS 4.1.17** - Utility-first CSS framework

## Key Libraries

- **@headlessui/react** - Accessible UI components
- **@heroicons/react** - SVG icon library
- **recharts** - Data visualization and charting
- **clsx & tailwind-merge** - Conditional class name utilities

## Testing Stack

- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **@axe-core/react** - Accessibility testing
- **jest-axe** - Accessibility assertions

## Code Quality Tools

- **ESLint** - Linting with TypeScript and React rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files

## Common Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with UI

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking

# Documentation
npm run generate-docs # Generate component documentation
```

## Build Configuration

- **Base Path**: `/kirotest/` for deployment
- **Test Environment**: jsdom with global test utilities
- **TypeScript**: Strict mode with multiple tsconfig files
- **Vite Plugins**: React and TailwindCSS integration
