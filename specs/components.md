# Component Specification — Dashboard Demo

This spec defines the required components for the Vite/React/Tailwind dashboard demo.

---

# 1. `Sidebar`

## Responsibilities

- Navigation links
- Collapsible behavior
- Highlight active route

## API

```ts
interface SidebarProps {
  collapsed?: boolean;
  onToggle?(): void;
}
```

# 2. Header

## Responsibilities

- App title
- Theme toggle
- User avatar

## API

```ts
interface HeaderProps {
  title: string;
}
```

# 3. KPICard

## Responsibilities

- Display metrics with icon + trend

## API

```ts
interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
}
```

# 4. ChartCard

## Responsibilities

- Wrap charts in a styled card with title

## API

```ts
interface ChartCardProps {
  title: string;
  children: ReactNode;
}
```

# 5. DataTable

## Responsibilities

- Sort
- Search
- Pagination

## API

```ts
interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  searchable?: boolean;
}
```

# 6. ThemeToggle

## Responsibilities

- Theme toggle

# 7. Layout

## Responsibilities

- Wraps header + sidebar + content area.
