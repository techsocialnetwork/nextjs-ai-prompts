# Next.js AI Prompts

> Production-ready prompts for Next.js 14+ App Router development with AI assistance.

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 Purpose

This library provides:
- **App Router patterns** — Server Components, Client Components, layouts
- **Data fetching strategies** — Server Actions, caching, revalidation
- **Authentication patterns** — NextAuth.js, middleware, protected routes
- **API design** — Route handlers, edge functions, streaming
- **Production examples** — Complete apps you can run and deploy

---

## 📁 Structure

```
nextjs-ai-prompts/
├── prompts/                    # Prompts by category
│   ├── app-router/            # Layouts, routing, navigation
│   ├── server-components/     # Server Component patterns
│   ├── data-fetching/         # Fetching, caching, mutations
│   ├── api-routes/            # Route handlers, edge functions
│   ├── authentication/        # Auth patterns, middleware
│   └── deployment/            # Vercel, Docker, optimization
├── examples/                   # Complete working projects
│   ├── blog-app/              # Full blog with CMS
│   ├── dashboard/             # Admin dashboard with auth
│   └── auth-system/           # Complete auth implementation
├── guides/                     # Best practices
└── templates/                  # Reusable prompt templates
```

---

## 🚀 Quick Start

### Using a Prompt

1. Browse `prompts/` for your need
2. Copy the prompt content
3. Paste into ChatGPT, Claude, or your local LLM
4. Fill in `[VARIABLES]`
5. Iterate on output

### Running Examples

```bash
# Clone the repo
git clone https://github.com/techsocialnetwork/nextjs-ai-prompts.git
cd nextjs-ai-prompts

# Run an example
cd examples/blog-app
npm install
npm run dev
```

---

## 📚 Categories

| Category | Prompts | Example Use |
|----------|---------|-------------|
| **App Router** | Layouts, nested routes, parallel routes | "Create a dashboard layout with sidebar" |
| **Server Components** | Async components, streaming, suspense | "Build a product list that streams data" |
| **Data Fetching** | Server Actions, caching, optimistic UI | "Add optimistic updates to a like button" |
| **API Routes** | Route handlers, edge functions, webhooks | "Create a webhook handler for Stripe" |
| **Authentication** | NextAuth.js, middleware, sessions | "Protect routes with role-based auth" |
| **Deployment** | Vercel config, Docker, environment setup | "Dockerize a Next.js app for production" |

---

## 🏗️ Next.js 14+ Specifics

### Always Specify

```markdown
## Next.js Version
- Version: 14+ (App Router)
- Rendering: [Server Components default / Mixed]
- Data fetching: [Server Actions / Route Handlers / fetch]
```

### Server vs Client Components

```markdown
## Component Types
- Layout: Server Component (async allowed)
- Page: Server Component (async allowed)
- Interactive elements: Client Component ("use client")
- Forms: Server Actions (no JS required)
```

### Caching Strategy

```markdown
## Caching
- Static pages: Default cache
- Dynamic data: `cache: 'no-store'` or `revalidate`
- User-specific: Dynamic rendering
- API routes: Route segment config
```

---

## 💡 Example Workflow

**Goal:** Build a blog with Next.js

1. **Use prompt:** `prompts/app-router/nested-layout.md`
2. **Get:** Layout structure with navigation
3. **Use prompt:** `prompts/data-fetching/cms-integration.md`
4. **Get:** Content fetching with caching
5. **Use prompt:** `prompts/server-components/blog-post.md`
6. **Get:** Streaming post content
7. **Deploy:** Use `prompts/deployment/vercel-optimized.md`

---

## 🎓 Learning Path

1. **Start:** Read `guides/nextjs-prompting-best-practices.md`
2. **Understand:** Server vs Client Components
3. **Practice:** Run `examples/blog-app/` and modify it
4. **Build:** Use prompts to create your own app
5. **Deploy:** Follow deployment prompts

---

## 📊 Stats

- **Prompts:** 6 categories, growing
- **Examples:** 3 complete projects
- **Best For:** Next.js 14+ App Router
- **Last Updated:** April 2026

---

## 🔗 Related

- [JavaScript Prompts](https://github.com/techsocialnetwork/js-ai-prompts)
- [Python Prompt Library](https://github.com/techsocialnetwork/ai-prompt-engineering-library)
- [IBM AI Course Analytics](https://github.com/techsocialnetwork/ibm-ai-course-analytics)

---

**Status:** 🚧 Active development

*Part of the AI learning portfolio*
