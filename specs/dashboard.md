# Dashboard UI Specification

## Overview

This project is a demo dashboard built using:

- React
- Vite
- TypeScript
- TailwindCSS
- Feature-based architecture

The goal is to create a clean, modern UI inspired by the reference dashboard:
https://dashboardpack.com/live-demo-preview/?livedemo=391194

The dashboard must include 5 components, be fully responsive, support dark mode, and follow the design system defined in `design-system.md`.

---

## Required Components

### 1. KPI Card

Shows quick metrics such as:

- Total Users
- Sales Today
- Conversion Rate
- Active Sessions

#### Requirements:

- Tailwind design
- Icon support (heroicons)
- Status indicator (up/down trends)
- Hover animations

---

### 2. Sales Chart

Displays sales metrics over time.

#### Requirements:

- Use Recharts
- Line chart + gradient
- Toggle between weekly/monthly views
- Dark/light theme adaptation

---

### 3. Sidebar Navigation

Primary navigation for all dashboard pages.

#### Requirements:

- Collapsible
- Active link indicator
- Icons + labels
- Responsive behavior (mobile drawer)
- Dark mode styling

---

### 4. User Menu

Top-right user dropdown.

#### Requirements:

- Avatar with fallback initials
- Links: Profile, Settings, Logout
- Uses headless UI or Radix dropdowns
- Smooth animation

---

### 5. Activity List

Shows recent user activity or system logs.

#### Requirements:

- Scrollable list
- Avatar or badge per entry
- Timestamp
- Variants (success, warning, danger)
- Filter by event type

---

## Page Layout Requirements

- 2-column responsive layout
- Sticky header
- Sticky sidebar on desktop
- Content container with max-width and padding
- Full dark-mode support

---

## Testing Requirements

Each component must include:

- Unit test (Jest)
- Rendering test (React Testing Library)
- Accessibility test (axe)
- Snapshot test

---

## Documentation Requirements

Kiro must generate:

- A markdown file describing each component
- A combined “dashboard.md” inside `/docs/`
- A summary of the latest file changes inside the README
