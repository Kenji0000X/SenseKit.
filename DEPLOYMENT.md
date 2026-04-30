# Deployment Guide: PWD Accessibility Hub

## Quick Start - Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy your PWD Accessibility Hub. It's free, fast, and includes automatic SSL certificates.

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial PWD Accessibility Hub commit"

# Create a new repository on GitHub at https://github.com/new
# Then connect your local repo:
git remote add origin https://github.com/YOUR_USERNAME/Final-Project-Sir-Flores.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign up or log in with GitHub
2. **Click "Add New Project"**
3. **Select your `Final-Project-Sir-Flores` repository**
4. **Vercel will auto-detect:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Click "Deploy"**

Within 60 seconds, you'll have a live URL like: `your-pwd-app.vercel.app`

### Step 3: Continuous Deployment

Every time you push to `main` branch:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel automatically rebuilds and deploys your changes! 🚀

---

## Alternative: GitHub Pages

If you prefer GitHub Pages (free, but slightly more setup):

### Step 1: Update `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Final-Project-Sir-Flores/', // Replace with your repo name
})
```

### Step 2: Add Deploy Script to `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

### Step 3: Install gh-pages

```bash
npm install -D gh-pages
```

### Step 4: Deploy

```bash
npm run deploy
```

Your site will be available at: `https://YOUR_USERNAME.github.io/Final-Project-Sir-Flores/`

---

## Manual Deployment (Self-Hosted)

If you have your own server:

```bash
# Build the project
npm run build

# Upload the `dist` folder to your server
# Point your web server to serve the contents of `dist/`
```

---

## Custom Domain Setup (All Hosting)

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow the DNS instructions

### GitHub Pages:
1. Create a `CNAME` file in `public/` with your domain
2. Update DNS records as shown in GitHub settings

---

## Environment Variables (Optional)

If you add environment variables later:

```bash
# Create .env file (never commit this)
VITE_API_URL=https://your-api.com
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Troubleshooting

**Build fails?**
```bash
npm install
npm run build
```

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**Need to rebuild node_modules?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## What's Next?

- Add more accessibility features (e.g., text magnifier, screen reader support)
- Integrate a backend API (optional - this is currently 100% frontend)
- Add service worker for offline support
- Submit to accessibility audits (WAVE, Lighthouse)

**Your PWD app is now live! 🎉**
