# Deploy Next.js Blog to Vercel

## Option 1: Manual Deploy (Easiest)

Since the blog is in a subdirectory, use the Vercel CLI:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to blog directory and deploy
cd examples/blog-app
vercel

# Follow prompts:
# - Set up and deploy? [Y/n] → Y
# - Link to existing project? [y/N] → N (first time)
# - What's your project name? → nextjs-blog-ai (or your choice)
```

## Option 2: GitHub Integration (Recommended for CI/CD)

### Step 1: Create Vercel Project

```bash
cd examples/blog-app

# This creates vercel.json config
vercel --confirm
```

### Step 2: Get Environment Variables

After first deploy, go to Vercel Dashboard:
1. Project Settings → General
2. Copy **Project ID**
3. Go to Account Settings → Tokens
4. Create new token

### Step 3: Add GitHub Secrets

Go to GitHub repo → Settings → Secrets and variables → Actions:

Add these secrets:
- `VERCEL_TOKEN` - Your Vercel token
- `VERCEL_ORG_ID` - Your Vercel org ID (from `~/.vercel/auth.json` or dashboard URL)
- `VERCEL_PROJECT_ID` - Your project ID

### Step 4: Push to Deploy

```bash
git add .
git commit -m "Setup Vercel deployment"
git push
```

GitHub Action will auto-deploy!

## Option 3: Vercel Dashboard (Subdirectory Issue)

If using dashboard import:

1. Go to https://vercel.com/new
2. Import `nextjs-ai-prompts` repo
3. **CRITICAL**: Override build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `examples/blog-app` ← Must set this!
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Deploy

## Troubleshooting

### "No Next.js version detected"

Make sure Root Directory is set to `examples/blog-app` where package.json lives.

### Build fails

Check that `next` is in dependencies:
```bash
cd examples/blog-app
cat package.json | grep next
```

### 404 errors

Add to `next.config.js`:
```javascript
module.exports = {
  output: 'export',  // For static export
  distDir: 'dist',
}
```

## Post-Deploy

Your blog will be at:
- Production: `https://your-project.vercel.app`
- Previews: `https://your-project-git-branch.vercel.app`

## Automated Features

Once connected:
- ✅ Push to `main` → Auto-deploy production
- ✅ Pull Request → Preview deployment
- ✅ Branch push → Preview URL
- ✅ GitHub status checks
