# Design Specification — Dashboard Demo

## 1. Architecture Overview

The project uses the following structure:

src/
components/
pages/
hooks/
layouts/
lib/
data/
styles/

yaml
Copy code

The design must follow feature-based modularity whenever possible.

---

### 1.1. TypeScript everywhere

- No `any`
- Use Zod schemas for data validation
- Use React Query for data fetching

---

## State Management

- Zustand for local app state
- React Query for server state
- No Redux

---

## API Layer

- Use a `/services/api.ts` wrapper
- Auto-generate API docs using Kiro on merges

---

## UI Layer

- Tailwind + headless UI components
- Reusable UI elements in `src/components/ui`

---

## Testing Layer

- Jest
- React Testing Library
- Vitest compatibility

---

## Performance Requirements

- Lazy loading routes
- Component memoization where needed
- Kiro should warn on excessive re-renders

## 2. Design Principles

### 2.1 Visual

- Soft shadow cards (Tailwind: `shadow-sm`, `rounded-xl`)
- 2 spacing scales:
  - `p-4` for sections
  - `p-6` for main containers
- Modern, flat UI similar to DashboardPack

### 2.2 Components Style

All components must follow:

- Stateless UI components preferred
- Accept `className` override
- Expose `children` when appropriate
- Support light/dark themes

---

## 3. Dashboard Layout

### Header

- Fixed height (64px)
- Contains app title, theme toggle and user avatar placeholder

### Sidebar

- 240px width expanded
- 80px width collapsed
- Sections:
  - Dashboard
  - Analytics
  - Settings

### Content Area

- Max width: 1400px
- Centered on large screens
- Scrollable on mobile

---

## 4. Components Visual Definitions

### 4.1 KPI Card

- Height: 120–150px
- Layout: icon → title → value → trend
- Colors from Tailwind: slate/blue/emerald/rose

### 4.2 Chart Container

- White card with padding
- Title + toolbar
- Chart area takes remaining space

### 4.3 Data Table

- compact rows
- hover highlight (`hover:bg-gray-50`)
- sticky header

---

## 5. Responsive Behavior

- Sidebar collapses automatically < 1024px
- KPI cards convert from 4-column → 2-column → 1-column
- Table switches to stacked rows on mobile

---

## 6. Design Tokens

- Radius: `rounded-xl`
- Spacing: `p-4`, `p-6`
- Colors:
  - `bg-white dark:bg-gray-900`
  - `text-gray-900 dark:text-gray-100`
- Shadow: `shadow-sm`

---

## 7. Animations

- Smooth transitions (`transition-all duration-300`)
- Sidebar slide
- Card hover lift (`hover:shadow-md`)
