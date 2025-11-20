# Component API Documentation

## 🧩 UI Components

### Button

A versatile button component with multiple variants, sizes, and states.

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>

<Button variant="outline" loading={isSubmitting}>
  Submit Form
</Button>
```

**Features:**
- ✅ Multiple visual variants
- ✅ Loading state with spinner
- ✅ Disabled state handling
- ✅ Full keyboard accessibility
- ✅ Focus management

---

### Card

A themed container component with customizable styling options.

```typescript
interface CardProps {
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
<Card padding="lg" shadow="md" hover>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>
```

**Features:**
- ✅ Responsive padding options
- ✅ Configurable shadow levels
- ✅ Optional hover effects
- ✅ Dark/light theme support

---

### ThemeToggle

A button that cycles through available themes (light/dark/system).

```typescript
interface ThemeToggleProps {
  className?: string;
}
```

**Usage:**
```tsx
<ThemeToggle className="ml-4" />
```

**Features:**
- ✅ Cycles through light → dark → system
- ✅ Visual icons for each theme
- ✅ Tooltip showing current theme
- ✅ Keyboard accessible

---

## 📊 Dashboard Components

### KPICard

Displays key performance indicators with optional trend information.

```typescript
interface KPICardProps {
  title: string;
  value: string | number;
  icon: ComponentType<{ className?: string }>;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
    label: string;
  };
  className?: string;
}
```

**Usage:**
```tsx
<KPICard
  title="Total Users"
  value="24,567"
  icon={UsersIcon}
  trend={{
    direction: 'up',
    value: '+12.5%',
    label: 'vs last month'
  }}
/>
```

**Features:**
- ✅ Automatic number formatting
- ✅ Trend visualization with colors
- ✅ Hover animations
- ✅ Responsive sizing
- ✅ Icon integration

---

### SalesChart

Interactive chart component for displaying sales data over time.

```typescript
interface SalesChartProps {
  data: ChartDataPoint[];
  timeframe: 'weekly' | 'monthly';
  onTimeframeChange: (timeframe: 'weekly' | 'monthly') => void;
  className?: string;
}

interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}
```

**Usage:**
```tsx
<SalesChart
  data={salesData}
  timeframe={timeframe}
  onTimeframeChange={setTimeframe}
/>
```

**Features:**
- ✅ Interactive timeframe switching
- ✅ Responsive chart container
- ✅ Theme-aware colors
- ✅ Custom tooltip formatting
- ✅ Smooth animations

---

### ActivityList

Scrollable list of activities with filtering capabilities.

```typescript
interface ActivityListProps {
  activities: Activity[];
  maxHeight?: string;
  onFilter?: (type: ActivityType) => void;
  className?: string;
}

interface Activity {
  id: string;
  type: 'success' | 'warning' | 'danger' | 'info';
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
  };
}
```

**Usage:**
```tsx
<ActivityList
  activities={activities}
  maxHeight="400px"
  onFilter={handleFilter}
/>
```

**Features:**
- ✅ Type-based filtering
- ✅ Avatar with fallback initials
- ✅ Relative timestamp formatting
- ✅ Scrollable container
- ✅ Empty state handling

---

## 🏗️ Layout Components

### DashboardLayout

Main layout wrapper that provides the overall application structure.

```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
}
```

**Usage:**
```tsx
<DashboardLayout>
  <YourDashboardContent />
</DashboardLayout>
```

**Features:**
- ✅ Responsive grid layout
- ✅ Sticky header positioning
- ✅ Sidebar state management
- ✅ Mobile-first design

---

### Header

Application header with navigation and user controls.

```typescript
interface HeaderProps {
  title: string;
  onSidebarToggle: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}
```

**Usage:**
```tsx
<Header
  title="Dashboard"
  onSidebarToggle={toggleSidebar}
  user={currentUser}
  onLogout={handleLogout}
/>
```

**Features:**
- ✅ Mobile menu trigger
- ✅ Theme toggle integration
- ✅ User menu dropdown
- ✅ Responsive design

---

### Sidebar

Collapsible navigation sidebar with mobile drawer support.

```typescript
interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
  className?: string;
}
```

**Usage:**
```tsx
<Sidebar
  isCollapsed={isCollapsed}
  onToggle={toggleSidebar}
  isMobileMenuOpen={isMobileMenuOpen}
  onMobileMenuClose={closeMobileMenu}
/>
```

**Features:**
- ✅ Smooth collapse animations
- ✅ Mobile drawer overlay
- ✅ Active link highlighting
- ✅ Keyboard navigation
- ✅ Escape key handling

---

### UserMenu

Dropdown menu for user account actions.

```typescript
interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout: () => void;
}
```

**Usage:**
```tsx
<UserMenu
  user={{
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg"
  }}
  onLogout={handleLogout}
/>
```

**Features:**
- ✅ Avatar with initials fallback
- ✅ Smooth dropdown animations
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Mobile-responsive

---

## 🎣 Custom Hooks

### useTheme

Manages application theme state with system preference detection.

```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

function useTheme(): ThemeContextValue
```

**Usage:**
```tsx
const { theme, setTheme, resolvedTheme } = useTheme();

// Change theme
setTheme('dark');

// Use resolved theme for styling
const isDark = resolvedTheme === 'dark';
```

**Features:**
- ✅ System preference detection
- ✅ LocalStorage persistence
- ✅ Automatic DOM class updates
- ✅ Media query listening

---

### useSidebar

Manages sidebar state and responsive behavior.

```typescript
interface SidebarState {
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  setIsCollapsed: (collapsed: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
}

function useSidebar(): SidebarState
```

**Usage:**
```tsx
const {
  isCollapsed,
  isMobileMenuOpen,
  toggleSidebar,
  toggleMobileMenu,
  closeMobileMenu
} = useSidebar();
```

**Features:**
- ✅ Persistent collapsed state
- ✅ Responsive behavior
- ✅ Escape key handling
- ✅ Body scroll prevention
- ✅ Resize event debouncing

---

### useLocalStorage

Provides persistent state management with localStorage.

```typescript
function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void]
```

**Usage:**
```tsx
const [theme, setTheme] = useLocalStorage('app-theme', 'light');
const [preferences, setPreferences] = useLocalStorage('user-prefs', {});
```

**Features:**
- ✅ Type-safe storage
- ✅ Error handling
- ✅ SSR compatibility
- ✅ JSON serialization

---

## 🛠️ Utility Functions

### cn (className utility)

Merges Tailwind CSS classes with conflict resolution.

```typescript
function cn(...inputs: ClassValue[]): string
```

**Usage:**
```tsx
// Conditional classes
const buttonClass = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500',
  disabled && 'opacity-50'
);

// Override classes
const cardClass = cn(
  'p-4 bg-white', // base
  'p-6 bg-gray-100', // override padding and background
  className // user override
);
```

---

### Formatters

Collection of data formatting utilities.

```typescript
// Currency formatting
formatCurrency(1234.56) // "$1,234.56"

// Number formatting with suffixes
formatNumber(1500) // "1.5K"
formatNumber(2500000) // "2.5M"

// Percentage formatting
formatPercentage(12.345, 1) // "12.3%"

// Relative time formatting
formatRelativeTime(new Date(Date.now() - 5 * 60 * 1000)) // "5 minutes ago"

// Generate initials
generateInitials("John Doe") // "JD"

// Timestamp formatting
formatTimestamp(new Date()) // "Dec 20, 02:30 PM"
```

---

## 🎨 Type Definitions

### Common Types

```typescript
// Base component props
interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Button variants
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

// Storage keys
const STORAGE_KEYS = {
  THEME: 'dashboard-theme',
  SIDEBAR_COLLAPSED: 'sidebar-collapsed',
  USER_PREFERENCES: 'user-preferences'
} as const;
```

### Dashboard Types

```typescript
// Activity types
type ActivityType = 'success' | 'warning' | 'danger' | 'info';

// Trend data
interface TrendData {
  direction: 'up' | 'down' | 'neutral';
  value: string;
  label: string;
}

// Navigation items
interface NavigationItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  isActive?: boolean;
}

// Async state
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
```

### Theme Types

```typescript
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}
```

---

## 📱 Responsive Behavior

### Breakpoint System

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait  
  lg: '1024px',  // Tablet landscape / Small desktop
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
} as const;
```

### Component Adaptations

| Component | Mobile (< 640px) | Tablet (640px - 1024px) | Desktop (> 1024px) |
|-----------|------------------|--------------------------|-------------------|
| KPICard | 1 column | 2 columns | 4 columns |
| Sidebar | Drawer overlay | Drawer overlay | Collapsible sidebar |
| Header | Compact layout | Standard layout | Full layout |
| Charts | Touch optimized | Standard | Enhanced tooltips |

---

## ♿ Accessibility Features

### WCAG Compliance

All components meet WCAG AA standards:

- **Color Contrast**: 4.5:1 minimum ratio
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels
- **Focus Management**: Visible focus indicators

### Implementation Examples

```tsx
// ARIA attributes
<button
  aria-expanded={isOpen}
  aria-controls="dropdown-menu"
  aria-label="User account menu"
>

// Keyboard handling
const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      closeMenu();
      break;
    case 'ArrowDown':
      focusNextItem();
      break;
  }
};

// Focus management
useEffect(() => {
  if (isOpen && firstItemRef.current) {
    firstItemRef.current.focus();
  }
}, [isOpen]);
```

---

*This API documentation covers all implemented components and their usage patterns. Each component is fully typed, tested, and accessible.*