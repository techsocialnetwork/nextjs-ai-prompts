# Dashboard Layout with Sidebar

**Use Case:** Create a responsive admin dashboard layout with navigation, header, and content area.

**Best For:** Admin panels, SaaS dashboards, content management systems

---

## The Prompt

```markdown
## Role
You are a senior Next.js developer specializing in:
- Next.js 14 App Router
- Complex layout architectures
- Responsive design with Tailwind
- TypeScript with strict types

## Task
Create a complete dashboard layout with sidebar navigation.

## File Structure
Create these files:
- app/dashboard/layout.tsx
- app/dashboard/page.tsx
- app/dashboard/settings/page.tsx
- components/dashboard/sidebar.tsx
- components/dashboard/header.tsx
- components/dashboard/mobile-nav.tsx

## Requirements

### Layout (app/dashboard/layout.tsx)
- Server Component (default)
- Grid layout: sidebar (fixed width) + main content (flexible)
- Sidebar: 256px wide on desktop, hidden on mobile
- Main content: scrollable area
- Persistent across route changes

### Sidebar (components/dashboard/sidebar.tsx)
- Client Component ("use client" for interactivity)
- Navigation items with icons:
  - Dashboard (home icon)
  - Analytics (chart icon)
  - Settings (gear icon)
- Active state highlighting
- Collapsible on mobile (hamburger menu)
- Smooth transitions

### Header (components/dashboard/header.tsx)
- Sticky at top
- User avatar dropdown
- Notification bell icon
- Breadcrumb navigation
- Mobile menu toggle button

### Mobile Navigation (components/dashboard/mobile-nav.tsx)
- Sheet/drawer component
- Slides in from left
- Same nav items as sidebar
- Close on route change
- Backdrop blur

### Styling (Tailwind CSS)
- Colors: slate-900 (sidebar), white (content)
- Spacing: consistent 4px scale
- Shadows: subtle elevation
- Transitions: 200ms ease
- Responsive breakpoints: md (768px)

### TypeScript
- Interface for NavItem: { label, href, icon }
- Interface for User: { name, email, avatar }
- Props typed for all components

### Accessibility
- ARIA labels for navigation
- Keyboard navigation support
- Focus visible states
- Reduced motion support

## Navigation Structure
```typescript
const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: 'Home' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'BarChart' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
];
```

## Output Format

Provide complete file contents:

1. **layout.tsx** - Root dashboard layout
2. **sidebar.tsx** - Navigation sidebar (client component)
3. **header.tsx** - Top header bar
4. **mobile-nav.tsx** - Mobile navigation drawer
5. **page.tsx** - Dashboard home (placeholder stats)
6. **settings/page.tsx** - Settings page (placeholder form)

Each file should:
- Start with file path comment
- Include all imports
- Be production-ready
- Include brief inline comments
```

---

## Example Output Structure

### layout.tsx
```typescript
import { Sidebar } from '@/components/dashboard/sidebar';
import { Header } from '@/components/dashboard/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar className="hidden md:flex" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### sidebar.tsx (Client Component)
```typescript
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart, Settings } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  
  return (
    <aside className={`w-64 bg-slate-900 text-white ${className}`}>
      {/* Implementation */}
    </aside>
  );
}
```

---

## Variations

### With Database Integration
```markdown
Additional requirements:
- Fetch user from database in layout
- Show real notification count
- Load user preferences for sidebar state
```

### With Theme Toggle
```markdown
Additional requirements:
- Dark mode support using next-themes
- Theme toggle in header
- Persist theme preference
```

### With Breadcrumbs
```markdown
Additional requirements:
- Auto-generated breadcrumbs from route
- Clickable parent segments
- Truncate long paths
```

---

## Meta

- **Created:** 2026-04-18
- **Model Tested:** GPT-4, Claude 3.5 Sonnet
- **Success Rate:** ~90%
- **Best For:** Admin dashboards, SaaS apps
- **Struggles With:** Very complex nested layouts
- **Tips:**
  - Specify exact breakpoint (md, lg, xl)
  - Request lucide-react icons by name
  - Ask for "use client" directive explicitly where needed
