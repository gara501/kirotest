# Dashboard Demo - React + TypeScript + Vite

A modern, responsive dashboard application built with React 19, TypeScript, and TailwindCSS. This project demonstrates best practices in React development with comprehensive testing, accessibility features, and a complete design system.

## 🚀 Features

### Core Components
- **KPI Cards**: Interactive performance indicator cards with trend visualization
- **Sales Chart**: Dynamic data visualization with Recharts integration
- **Activity List**: Scrollable activity feed with filtering capabilities
- **Responsive Layout**: Collapsible sidebar with mobile drawer functionality
- **Theme System**: Complete dark/light/system theme support

### Technical Highlights
- **React 19.2.0** with TypeScript for type safety
- **Vite 7.2.2** for fast development and optimized builds
- **TailwindCSS 4.1.17** for utility-first styling
- **Comprehensive Testing** with Vitest, React Testing Library, and accessibility testing
- **Performance Optimized** with React.memo, useMemo, and useCallback
- **Accessibility First** with WCAG compliance and keyboard navigation

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx         # Button with variants and accessibility
│   │   ├── Card.tsx           # Themed card component
│   │   ├── ThemeToggle.tsx    # Theme switching component
│   │   └── index.ts
│   ├── dashboard/             # Dashboard-specific components
│   │   ├── KPICard.tsx        # Key performance indicator cards
│   │   ├── SalesChart.tsx     # Interactive sales data visualization
│   │   ├── ActivityList.tsx   # Activity feed with filtering
│   │   └── index.ts
│   ├── layout/                # Layout components
│   │   ├── Header.tsx         # App header with navigation
│   │   ├── Sidebar.tsx        # Collapsible sidebar navigation
│   │   ├── UserMenu.tsx       # User dropdown menu
│   │   ├── DashboardLayout.tsx # Main layout wrapper
│   │   └── index.ts
│   └── providers/             # Context providers
│       └── ThemeProvider.tsx  # Theme context and management
├── hooks/                     # Custom React hooks
│   ├── useTheme.ts           # Theme state management
│   ├── useSidebar.ts         # Sidebar state and responsive behavior
│   ├── useLocalStorage.ts    # Persistent local storage hook
│   └── index.ts
├── types/                     # TypeScript type definitions
│   ├── common.ts             # Shared component types
│   ├── dashboard.ts          # Dashboard-specific types
│   ├── theme.ts              # Theme system types
│   └── index.ts
├── utils/                     # Utility functions
│   ├── cn.ts                 # Tailwind class merging utility
│   └── formatters.ts         # Data formatting utilities
├── data/                      # Mock data and constants
│   └── mockChartData.ts      # Sample dashboard data
└── test/                      # Test configuration
    └── setup.ts              # Test environment setup
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript** - Type safety and developer experience
- **Vite 7.2.2** - Fast build tool with HMR

### Styling & UI
- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons
- **Recharts** - Composable charting library

### Testing & Quality
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **@axe-core/react** - Accessibility testing
- **ESLint & Prettier** - Code quality and formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (use `nvm use v20` if you have nvm)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kirodemo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Documentation
npm run generate-docs # Generate component documentation
```

## 🎨 Component Usage

### KPI Cards
```tsx
import { KPICard } from './components/dashboard';
import { UsersIcon } from '@heroicons/react/24/outline';

<KPICard
  title="Total Users"
  value="24.6K"
  icon={UsersIcon}
  trend={{
    direction: 'up',
    value: '+12.5%',
    label: 'vs last month'
  }}
/>
```

### Sales Chart
```tsx
import { SalesChart } from './components/dashboard';

<SalesChart
  data={chartData}
  timeframe="weekly"
  onTimeframeChange={setTimeframe}
/>
```

### Activity List
```tsx
import { ActivityList } from './components/dashboard';

<ActivityList
  activities={activities}
  maxHeight="400px"
  onFilter={handleFilter}
/>
```

## 🎯 Key Features

### Responsive Design
- **Desktop**: 4-column KPI grid, expanded sidebar (240px)
- **Tablet**: 2-column KPI grid, collapsible sidebar
- **Mobile**: Single-column layout, drawer navigation

### Theme System
- **Light Mode**: Clean, professional appearance
- **Dark Mode**: Reduced eye strain for low-light environments
- **System Mode**: Automatically follows OS preference
- **Persistent**: Theme choice saved to localStorage

### Accessibility
- **WCAG Compliant**: Meets accessibility guidelines
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators

### Performance
- **React.memo**: Prevents unnecessary re-renders
- **useMemo/useCallback**: Optimizes expensive calculations
- **Code Splitting**: Lazy loading for better performance
- **Tree Shaking**: Removes unused code from bundles

## 🧪 Testing

The project includes comprehensive testing coverage:

### Unit Tests
```bash
npm run test                    # Run all tests
npm run test -- --coverage     # Run with coverage report
```

### Test Structure
- **Component Tests**: Rendering, interactions, accessibility
- **Hook Tests**: Custom hook behavior and state management
- **Integration Tests**: Component interactions and data flow
- **Snapshot Tests**: Visual regression prevention

### Accessibility Testing
All components are tested with @axe-core/react to ensure WCAG compliance.

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
VITE_API_URL=http://localhost:3001
VITE_APP_TITLE=Dashboard Demo
```

### Tailwind Configuration
The project uses TailwindCSS 4.x with custom configuration for:
- Dark mode support
- Custom color palette
- Responsive breakpoints
- Component-specific utilities

## 📚 Documentation

- [Component Specifications](./specs/) - Detailed component documentation
- [Design System](./specs/components.md) - Design tokens and patterns
- [Architecture Guide](./specs/architecture.md) - Technical architecture overview

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new components
- Ensure accessibility compliance
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Team](https://react.dev/) for the amazing framework
- [Tailwind Labs](https://tailwindcss.com/) for the utility-first CSS framework
- [Headless UI](https://headlessui.com/) for accessible components
- [Heroicons](https://heroicons.com/) for beautiful icons
