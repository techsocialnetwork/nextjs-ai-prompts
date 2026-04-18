# Next.js AI Blog

> A modern blog built with Next.js 14, TypeScript, and AI assistance.

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Live-000000.svg)](https://vercel.com)

**Live Demo:** https://nextjs-ai-prompts-mbgs.vercel.app

---

## 🚀 Features

- **MDX Blog Posts** - Write in Markdown with JSX components
- **Static Generation** - Fast, SEO-friendly pages
- **Dark Mode** - Automatic theme switching
- **Responsive Design** - Mobile-first with Tailwind CSS
- **TypeScript** - Full type safety
- **AI-Generated** - Built using AI prompts

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX with gray-matter
- **Deployment:** Vercel

---

## 📁 Project Structure

```
app/                  # Next.js App Router
├── layout.tsx        # Root layout with theme
├── page.tsx          # Home page
├── blog/             # Blog routes
│   ├── page.tsx      # Blog listing
│   └── [slug]/       # Individual posts
│       └── page.tsx
components/           # React components
├── blog/             # Blog-specific components
└── layout/           # Layout components
content/posts/        # MDX blog posts
lib/                  # Utilities
├── posts.ts          # Post data fetching
└── utils.ts          # Helpers
```

---

## 📝 Writing Posts

Add MDX files to `content/posts/`:

```mdx
---
title: "My Post Title"
date: "2024-01-15"
excerpt: "Brief description"
tags: ["nextjs", "react"]
author: "Your Name"
---

# My Post

Content here...
```

---

## 🚀 Deployment

Automatically deploys to Vercel on every push to `main`.

---

## 📚 Related Projects

- [AI Prompt Engineering Library](https://github.com/techsocialnetwork/ai-prompt-engineering-library)
- [JavaScript AI Prompts](https://github.com/techsocialnetwork/js-ai-prompts)
- [React AI Prompts](https://github.com/techsocialnetwork/react-ai-prompts)

---

**Built with AI assistance** 🤖
