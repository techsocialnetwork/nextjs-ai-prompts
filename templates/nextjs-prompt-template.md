# Next.js Prompt Template

Use this as the foundation for any Next.js 14+ App Router prompt.

---

## Role

```
You are a senior Next.js developer specializing in:
- Next.js 14+ App Router
- React Server Components
- TypeScript with strict mode
- [Tailwind CSS / CSS Modules / Styled Components]
- [Prisma / Drizzle / Database of choice]

Your code follows:
- App Router conventions (layout.tsx, page.tsx, loading.tsx, error.tsx)
- Server-first architecture
- Type safety throughout
- Accessibility best practices
```

---

## Task

```
[Clear, specific description]

Examples:
- Create a [feature] page with [functionality]
- Build a [component] that [does X]
- Implement [pattern] for [use case]
```

---

## Next.js Version & Architecture

```markdown
### Version
- Next.js: 14+ (App Router)
- React: 18+
- TypeScript: Strict mode

### Rendering Strategy
- Default: Server Components
- Client Components: [list interactivity needs]
- Data Fetching: [Server Actions / Route Handlers / fetch]

### Caching Strategy
- Static pages: [ISR interval / force-cache]
- Dynamic pages: [no-store / revalidate]
- User-specific: [dynamic rendering]
```

---

## File Structure

```markdown
Create these files:

app/
├── [route]/
│   ├── layout.tsx          # [description]
│   ├── page.tsx            # [description]
│   ├── loading.tsx         # [description]
│   ├── error.tsx           # [description]
│   └── [nested]/
│       └── page.tsx
components/
├── [component-name].tsx    # [description]
└── [other-components]
lib/
├── [utility-files].ts
actions/
└── [server-actions].ts
```

---

## Component Architecture

```markdown
### Server Components (default)
- [List pages/layouts that fetch data]
- [List components that render static content]

### Client Components ("use client")
- [List interactive components]
- [List components using browser APIs]
- [List components using React hooks]

### Server Actions
- [List mutations]
- [List form submissions]
```

---

## Data Requirements

```markdown
### Data Source
- [Database / API / File system / CMS]
- Connection: [Prisma client / fetch / SDK]

### Schema (if applicable)
```typescript
interface [Model] {
  id: string;
  [field]: [type];
}
```

### Queries
- [List read operations]
- [Cache strategy for each]

### Mutations
- [List write operations]
- [Server Action for each]
- [Revalidation requirements]
```

---

## Styling

```markdown
### Method
- [Tailwind CSS / CSS Modules / Other]

### Design System
- Colors: [primary, secondary, etc.]
- Spacing: [scale]
- Typography: [font family, sizes]

### Responsive Breakpoints
- Mobile: default
- Tablet: md (768px)
- Desktop: lg (1024px)

### Dark Mode
- [next-themes / CSS variables / Not needed]
```

---

## TypeScript Requirements

```markdown
- Strict mode: enabled
- All components: typed props
- All functions: return types
- All API responses: typed
- No `any` types
- Path aliases: `@/*` maps to root
```

---

## Error Handling

```markdown
### Error Boundaries
- error.tsx for route errors
- not-found.tsx for 404s

### Data Fetching
- Handle null/undefined gracefully
- Show appropriate empty states
- Log errors (don't swallow them)

### Forms
- Server-side validation
- Client-side validation
- Display field errors
- Success/error messages
```

---

## Loading States

```markdown
- loading.tsx for route loading
- Skeleton screens (not spinners)
- Suspense boundaries for components
- Progressive enhancement
```

---

## SEO & Meta

```markdown
### Static Metadata
```typescript
export const metadata: Metadata = {
  title: '...',
  description: '...',
};
```

### Dynamic Metadata
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  // Fetch data and return metadata
}
```

### OpenGraph
- [Static OG images / Dynamic generation]
```

---

## Accessibility

```markdown
- Semantic HTML (header, main, nav, article)
- ARIA labels where needed
- Keyboard navigation
- Focus management
- Color contrast compliance
- Reduced motion support
```

---

## Output Format

```markdown
Provide complete file contents for:

1. **File path** as first comment
2. **All imports** (organized: React/Next, third-party, local)
3. **Type definitions** (interfaces, types)
4. **Component/function** implementation
5. **Exports** (default or named)

Code style:
- 2 spaces indentation
- Single quotes
- Trailing commas
- Max line length: 100
- Descriptive variable names
```

---

## Example Output

```typescript
// app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/posts';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ 
  params 
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ 
  params 
}: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return <article>{/* content */}</article>;
}
```

---

## Additional Context

```
[Any specific requirements, constraints, or patterns to avoid]

Examples:
- "Don't use CSS-in-JS (styled-components, emotion)"
- "Must work without JavaScript (progressive enhancement)"
- "Optimize for Core Web Vitals"
- "Follow Next.js 14 best practices from official docs"
```
