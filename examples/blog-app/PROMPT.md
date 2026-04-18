# Blog App - AI Prompt

This Next.js 14 blog was built using the following prompt:

---

## The Prompt

```markdown
## Role
You are a senior Next.js developer specializing in:
- Next.js 14 App Router
- Server Components and Server Actions
- Content management with MDX
- TypeScript with strict types
- Tailwind CSS

## Task
Create a complete blog application with Next.js 14.

## Features
1. Blog post list page with excerpts
2. Individual blog post pages with MDX content
3. Tag-based filtering
4. Static generation at build time
5. Incremental Static Regeneration (ISR)
6. OpenGraph images for social sharing
7. RSS feed generation
8. Dark mode support

## File Structure
Create these files:

app/
├── layout.tsx
├── page.tsx                    # Blog list
├── globals.css
├── blog/
│   ├── page.tsx               # Blog index with pagination
│   └── [slug]/
│       ├── page.tsx           # Blog post
│       └── opengraph-image.tsx # Dynamic OG image
├── api/
│   └── rss/
│       └── route.ts           # RSS feed
├── tags/
│   └── [tag]/
│       └── page.tsx           # Filtered by tag
components/
├── blog/
│   ├── post-card.tsx
│   ├── post-list.tsx
│   └── mdx-content.tsx
├── layout/
│   ├── header.tsx
│   ├── footer.tsx
│   └── theme-provider.tsx
lib/
├── posts.ts                   # Post data fetching
└── utils.ts                   # Utilities
content/
└── posts/                     # MDX blog posts
    └── example-post.mdx

## Technical Requirements

### Data Source
- Store posts as MDX files in content/posts/
- Frontmatter: title, date, excerpt, tags, author, coverImage
- Parse with gray-matter and next-mdx-remote

### Blog List Page (app/blog/page.tsx)
- Server Component
- List posts sorted by date (newest first)
- Show: title, excerpt, date, tags, author
- Pagination: 10 posts per page
- ISR: revalidate every hour

### Blog Post Page (app/blog/[slug]/page.tsx)
- Server Component
- Generate static params for all posts
- Render MDX content
- Show: full content, metadata, tags
- "Related posts" section
- ISR: revalidate every hour

### OpenGraph Image (app/blog/[slug]/opengraph-image.tsx)
- Dynamic OG image generation
- Show: title, author, date
- Brand colors
- 1200x630 pixels

### Styling
- Tailwind CSS
- Typography plugin for prose
- Dark mode with next-themes
- Responsive design

### TypeScript
- Strict mode
- All components typed
- Post interface defined

## Sample MDX Post
Create one example post in content/posts/hello-world.mdx:
```mdx
---
title: "Hello World"
date: "2024-01-15"
excerpt: "Welcome to my new blog built with Next.js 14"
tags: ["nextjs", "react", "webdev"]
author: "John Doe"
coverImage: "/images/hello-world.jpg"
---

# Hello World

This is my first blog post...
```

## Output Format
Provide complete file contents for all files listed above.
Include package.json with all dependencies.
```

---

## What the AI Generated

This directory contains a complete working blog:
- `app/` - Next.js 14 App Router pages
- `components/` - React components
- `lib/` - Utilities and data fetching
- `content/posts/` - MDX blog posts
- `package.json` - Dependencies

## Key Patterns Demonstrated

### 1. Static Site Generation with ISR
```typescript
// Generate static pages at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Revalidate every hour
export const revalidate = 3600;
```

### 2. Server Component Data Fetching
```typescript
export default async function BlogPostPage({ 
  params 
}: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return <article>{/* content */}</article>;
}
```

### 3. Dynamic OpenGraph Images
```typescript
export async function generateImageMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    alt: post.title,
  };
}

export default async function Image({ params }) {
  // Generate 1200x630 OG image
}
```

## Running the App

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Modifications Made

The AI-generated code required minimal tweaks:
- Adjusted some Tailwind classes
- Added error handling for missing posts
- Fixed TypeScript strict mode issues

Overall quality: **Excellent** - production-ready with minimal edits.

---

## Meta

- **Model Used:** Claude 3.5 Sonnet
- **Success Rate:** 90%
- **Time Saved:** ~4-6 hours vs writing from scratch
- **Best For:** Content sites, blogs, documentation
