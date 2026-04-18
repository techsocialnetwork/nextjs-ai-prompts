# Deploy to Vercel

## Quick Deploy (2 minutes)

### Option 1: Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import Git Repository → Select `techsocialnetwork/nextjs-ai-prompts`
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `examples/blog-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Click **Deploy**

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --cwd examples/blog-app
```

## Automated Pipeline Features

Once connected, you get:

| Feature | How It Works |
|---------|--------------|
| **Auto-deploy** | Push to `main` → Live in ~30 seconds |
| **Preview URLs** | Every PR gets its own URL |
| **Branch deploys** | Push any branch → Unique preview URL |
| **GitHub integration** | Deploy status in PRs |

## GitHub Actions (Already Configured)

The `.github/workflows/deploy.yml` runs on every push:

1. **Type checking** - Validates TypeScript
2. **Build test** - Ensures build succeeds
3. **(Optional) Content processing** - Uncomment to enable:
   - Auto-generate sitemap
   - Optimize images
   - Format MDX files

## Environment Variables (if needed)

Add in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Custom Domain (Optional)

1. Vercel Dashboard → Domains
2. Add your domain
3. Update DNS records as instructed

## Monitoring

- **Analytics**: Built-in (free tier)
- **Speed Insights**: Automatic
- **Logs**: Real-time in dashboard

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check `examples/blog-app/package.json` has `build` script |
| 404 on routes | Ensure `next.config.js` has `output: 'export'` if static |
| Images broken | Use `next/image` with proper domains config |

## Next Steps

After deploy:
1. Test the live URL
2. Create a new branch: `git checkout -b content/new-post`
3. Add MDX file to `examples/blog-app/content/posts/`
4. Push → See preview URL in PR
5. Merge → Auto-deploy to production
