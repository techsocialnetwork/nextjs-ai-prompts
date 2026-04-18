# Next.js Prompting Best Practices

> How to get production-quality Next.js 14+ code from AI assistants

---

## 1. Always Specify App Router vs Pages Router

**Bad:**
```
Create a Next.js page.
```

**Good:**
```
Create a Next.js 14 App Router page.
- Use Server Component by default
- Place in app/blog/[slug]/page.tsx
- Fetch data server-side
```

---

## 2. Be Explicit About Server vs Client Components

Next.js 14 defaults to Server Components. Be clear:

```markdown
## Component Architecture
- Page: Server Component (async data fetching)
- Layout: Server Component (no interactivity)
- LikeButton: Client Component ("use client", useState)
- CommentForm: Client Component with Server Action
```

### When to Use Each

| Use Case | Component Type | Directive |
|----------|---------------|-----------|
| Data fetching | Server | None |
| SEO-critical content | Server | None |
| Database queries | Server | None |
| Event handlers | Client | `"use client"` |
| Browser APIs | Client | `"use client"` |
| React hooks | Client | `"use client"` |
| Forms (simple) | Server + Action | None |
| Forms (complex) | Client + Action | `"use client"` |

---

## 3. Define Data Fetching Strategy

```markdown
## Data Fetching
- Method: Server Actions for mutations
- Method: fetch() with cache for queries
- Cache strategy: 
  - Static: force-cache (default)
  - Dynamic: no-store
  - ISR: revalidate = 3600
```

### Common Patterns

**Static Generation (build time):**
```markdown
Fetch at build time, cache forever:
```typescript
const posts = await fetch('https://api.example.com/posts', {
  cache: 'force-cache' // or omit (default)
});
```
```

**Dynamic Data (request time):**
```markdown
Fetch fresh data every request:
```typescript
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});
```
```

**Incremental Static Regeneration:**
```markdown
Revalidate every hour:
```typescript
const posts = await fetch('https://api.example.com/posts', {
  next: { revalidate: 3600 }
});
```
```

---

## 4. Request Proper TypeScript

```markdown
## TypeScript Requirements
- Strict mode enabled
- All functions typed
- Props interfaces for components
- Return types for async functions
- No `any` types
```

Example output structure:
```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: Date;
}

interface BlogPostPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getPost(slug: string): Promise<Post | null> {
  // implementation
}

export default async function BlogPostPage({ 
  params 
}: BlogPostPageProps) {
  const post = await getPost(params.slug);
  // ...
}
```

---

## 5. Specify Error Handling

```markdown
## Error Handling
- Use error.tsx for route errors
- Use not-found.tsx for 404s
- Handle fetch failures gracefully
- Show loading.tsx for suspense
- Log errors (not just console.error)
```

---

## 6. Request Loading States

```markdown
## Loading UX
- Create loading.tsx for each route
- Use React Suspense for components
- Show skeleton screens (not spinners)
- Progressive enhancement
```

---

## 7. Define Metadata Strategy

```markdown
## SEO/Meta
- Static metadata in layout.tsx
- Dynamic metadata in page.tsx
- OpenGraph images
- Sitemap generation
- Robots.txt
```

Example:
```typescript
import { Metadata } from 'next';

// Static
export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A blog about tech',
};

// Dynamic
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

---

## 8. Request Proper File Structure

```markdown
## File Structure
```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── loading.tsx             # Loading UI
├── error.tsx               # Error UI
├── not-found.tsx           # 404 page
├── globals.css             # Global styles
├── blog/
│   ├── layout.tsx          # Blog layout
│   ├── page.tsx            # Blog index
│   ├── loading.tsx         # Blog loading
│   └── [slug]/
│       ├── page.tsx        # Blog post
│       └── opengraph-image.tsx  # OG image
├── api/
│   └── posts/
│       └── route.ts        # API route
└── actions/
    └── post-actions.ts     # Server Actions
```
```

---

## 9. Specify Styling Approach

```markdown
## Styling
- Method: Tailwind CSS
- Components: shadcn/ui or custom
- Dark mode: next-themes
- Responsive: Tailwind breakpoints
```

Or:
```markdown
## Styling
- Method: CSS Modules
- Global: globals.css
- Components: [name].module.css
- No CSS-in-JS (styled-components, emotion)
```

---

## 10. Request Server Actions for Mutations

```markdown
## Mutations
- Use Server Actions ("use server")
- No API routes needed for forms
- RevalidatePath after mutations
- Handle errors with try/catch
- Redirect on success
```

Example:
```typescript
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    await db.post.create({ data: { title, content } });
    
    revalidatePath('/blog');
    redirect('/blog');
  } catch (error) {
    return { error: 'Failed to create post' };
  }
}
```

---

## Complete Example Prompt

```markdown
## Role
You are a senior Next.js developer specializing in:
- Next.js 14 App Router
- Server Components and Server Actions
- TypeScript with strict mode
- Tailwind CSS for styling
- PostgreSQL with Prisma ORM

## Task
Create a blog post creation page with Server Actions.

## File Structure
Create these files:
- app/blog/new/page.tsx
- app/blog/new/loading.tsx
- app/actions/post-actions.ts

## Requirements

### Page (app/blog/new/page.tsx)
- Server Component (default)
- Form with title and content fields
- Use Server Action for submission
- Show validation errors
- Redirect to /blog on success

### Server Action (app/actions/post-actions.ts)
- "use server" directive
- Validate inputs (title: 3-100 chars, content: required)
- Save to database (mock the db call)
- Revalidate /blog path
- Return error object on failure

### Loading (app/blog/new/loading.tsx)
- Skeleton form layout
- Match form structure exactly

### Styling
- Tailwind CSS classes
- Responsive design
- Focus states
- Error styling (red borders/messages)

### TypeScript
- All functions typed
- FormData handling typed
- No `any` types

## Output Format
Provide complete file contents with:
1. File path as comment at top
2. Complete working code
3. Brief inline comments for complex logic
```

---

## Anti-Patterns to Avoid

### Don't: Mix Data Fetching Patterns
```markdown
❌ Bad: "Fetch data in useEffect"
✅ Good: "Fetch data in Server Component"
```

### Don't: Use Pages Router Patterns
```markdown
❌ Bad: "Create getStaticProps"
✅ Good: "Fetch with cache: 'force-cache'"
```

### Don't: Forget Loading/Error States
```markdown
❌ Bad: Just page.tsx
✅ Good: page.tsx + loading.tsx + error.tsx
```

### Don't: Use Client Components Unnecessarily
```markdown
❌ Bad: "use client" for static content
✅ Good: Server Component by default
```

---

## Quick Reference: Prompt Structure

```markdown
## Role
[Expert Next.js developer]

## Task
[Clear description]

## Next.js Version
- Version: 14+ (App Router)
- Rendering: [Server-first / Mixed]

## File Structure
[List files to create]

## Component Architecture
- Server Components: [list]
- Client Components: [list]
- Server Actions: [list]

## Data Fetching
- Queries: [fetch strategy]
- Mutations: [Server Actions]
- Cache: [strategy]

## Styling
- Method: [Tailwind/CSS Modules/etc]

## Output
[Format specification]
```
