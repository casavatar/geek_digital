# GeekDigital - Deployment Guide

Last Updated: 2025-01-21

## Table of Contents

1. [Overview](#overview)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Build Process](#build-process)
4. [Environment Variables for Production](#environment-variables-for-production)
5. [Hosting Platforms](#hosting-platforms)
   - [Vercel](#vercel-deployment)
   - [Netlify](#netlify-deployment)
   - [Firebase Hosting](#firebase-hosting-deployment)
6. [CI/CD Setup](#cicd-setup)
7. [Performance Optimization](#performance-optimization)
8. [Security Considerations](#security-considerations)
9. [Monitoring and Analytics](#monitoring-and-analytics)
10. [Troubleshooting Deployment](#troubleshooting-deployment)

---

## Overview

This guide covers deploying GeekDigital to production environments. The application is a static Single Page Application (SPA) that can be deployed to any static hosting service.

### Deployment Requirements

- **Build Artifacts**: Static HTML, CSS, JS files
- **Server Requirements**: None (static hosting)
- **CDN**: Recommended for global performance
- **SSL/HTTPS**: Required for payment processing
- **Environment Variables**: Must be configured for production

### Recommended Platforms

| Platform | Best For | Free Tier | Deploy Time |
|----------|----------|-----------|-------------|
| **Vercel** | Fastest deployment, excellent DX | Yes | 1 minute |
| **Netlify** | CI/CD, form handling | Yes | 2 minutes |
| **Firebase** | Already using Firebase services | Yes | 3 minutes |
| **AWS S3 + CloudFront** | Custom infrastructure | No | 15 minutes |
| **GitHub Pages** | Simple projects | Yes | 5 minutes |

---

## Pre-Deployment Checklist

### 1. Code Quality

- [ ] All features tested locally
- [ ] No console errors in production build
- [ ] All TypeScript/ESLint errors resolved (if applicable)
- [ ] Unused code removed
- [ ] Performance profiling done

### 2. Environment Configuration

- [ ] Production `.env` file created
- [ ] All API keys verified and working
- [ ] Firebase configured for production
- [ ] Stripe live keys ready (test keys for staging)
- [ ] PayPal production credentials ready

### 3. Security

- [ ] No sensitive data in code
- [ ] `.env` files not committed to git
- [ ] Firebase security rules configured
- [ ] CORS policies reviewed
- [ ] Content Security Policy headers considered

### 4. Performance

- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Build size acceptable (<500KB initial JS)
- [ ] Lighthouse score reviewed

### 5. SEO

- [ ] Meta tags configured
- [ ] Open Graph tags added
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Favicon added

### 6. Analytics

- [ ] Google Analytics configured (optional)
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Performance monitoring enabled

---

## Build Process

### Local Production Build

#### Step 1: Build Application

```bash
npm run build
```

**What Happens**:

- Vite compiles and optimizes code
- Output directory: `dist/`
- Assets minified and hashed
- Build report displayed

**Expected Output**:

```text
vite v5.1.6 building for production...
✓ 234 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.28 kB
dist/assets/index-a3b4c5d6.css   12.34 kB │ gzip:  3.21 kB
dist/assets/index-f1e2d3c4.js   145.67 kB │ gzip: 48.23 kB
✓ built in 2.34s
```

#### Step 2: Preview Production Build

```bash
npm run preview
```

**Purpose**: Test production build locally before deploying

**Access**: `http://localhost:4173`

**Verify**:

- All routes work
- Authentication functions
- Cart persists
- Payments work (test mode)
- No console errors

#### Step 3: Analyze Build

```bash
# Install analyzer
npm install -D rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    vue(),
    visualizer({ open: true })
  ]
})

# Build and analyze
npm run build
```

**Bundle Size Guidelines**:

- Initial JS: <250KB (gzipped)
- CSS: <50KB (gzipped)
- Total: <500KB (gzipped)

---

## Environment Variables for Production

### Production Environment File

Create `.env.production`:

```bash
# Firebase Production Configuration
VITE_FIREBASE_API_KEY=AIzaSy...PRODUCTION_KEY
VITE_FIREBASE_AUTH_DOMAIN=prod-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=prod-project-id
VITE_FIREBASE_STORAGE_BUCKET=prod-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Stripe Production Configuration
VITE_STRIPE_PUBLIC_KEY=pk_live_...PRODUCTION_KEY

# PayPal Production Configuration
VITE_PAYPAL_CLIENT_ID=PRODUCTION_CLIENT_ID

# Production API
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Staging Environment

Create `.env.staging`:

```bash
# Use staging/test credentials
VITE_FIREBASE_PROJECT_ID=staging-project-id
VITE_STRIPE_PUBLIC_KEY=pk_test_...TEST_KEY
VITE_API_BASE_URL=https://staging-api.yourdomain.com
```

**Build for Staging**:

```bash
npm run build -- --mode staging
```

### Environment Variable Security

**DO NOT**:

- Commit `.env`, `.env.production`, `.env.staging` to git
- Share production credentials in code
- Use production keys in development

**DO**:

- Use platform environment variable managers
- Rotate keys periodically
- Use test/staging environments
- Document required variables in `.env.example`

---

## Hosting Platforms

### Vercel Deployment

Vercel offers the fastest and easiest deployment with excellent developer experience.

#### Prerequisites

- GitHub/GitLab/Bitbucket account
- Code pushed to repository

#### Step 1: Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Click "Import"

#### Step 2: Configure Project

**Build Settings** (auto-detected):

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Root Directory**: Leave blank (unless in monorepo)

#### Step 3: Environment Variables

1. Click "Environment Variables"
2. Add each variable from `.env.production`:

```typescript
VITE_FIREBASE_API_KEY = AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN = prod-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = prod-project-id
...
```

**Scope**: Select "Production" (also "Preview" if needed)

#### Step 4: Deploy

1. Click "Deploy"
2. Wait 1-2 minutes
3. Vercel provides URL: `https://your-project.vercel.app`

#### Step 5: Custom Domain

1. Go to Project Settings > Domains
2. Add your domain: `www.yourdomain.com`
3. Configure DNS:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: cname.vercel-dns.com
4. Wait for SSL provisioning (5-10 minutes)

#### Automatic Deployments

Vercel automatically deploys:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

**Disable Auto-Deploy**:
Project Settings > Git > "Ignored Build Step"

#### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

### Netlify Deployment

Netlify provides excellent CI/CD with additional features like form handling and serverless functions.

#### Step 2: Connect Repository

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Choose Git provider (GitHub, GitLab, Bitbucket)
4. Select repository

#### Step 2: Build Settings

```bash
Build command: npm run build
Publish directory: dist
```

#### Step 4: Environment Variables

1. Go to Site Settings > Environment Variables
2. Add production variables:

```typescript
VITE_FIREBASE_API_KEY = AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN = prod-project.firebaseapp.com
...
```

#### Step 5: Deploy

1. Click "Deploy site"
2. Wait 2-3 minutes
3. Netlify provides URL: `https://random-name-123.netlify.app`

#### Step 6: Custom Domain

1. Go to Domain Settings
2. Click "Add custom domain"
3. Enter domain: `www.yourdomain.com`
4. Configure DNS:
   - **Type**: CNAME
   - **Name**: www
   - **Value**: `random-name-123.netlify.app`
5. Enable HTTPS (automatic)

#### netlify.toml Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

# Redirect all routes to index.html (SPA)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers for security
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Cache static assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### Netlify CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

### Firebase Hosting Deployment

If you're already using Firebase for authentication and database, hosting on Firebase provides seamless integration.

#### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### Step 2: Login to Firebase

```bash
firebase login
```

#### Step 3: Initialize Firebase Hosting

```bash
firebase init hosting
```

**Configuration**:

```text
? What do you want to use as your public directory? dist
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No (for now)
? File dist/index.html already exists. Overwrite? No
```

This creates `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/assets/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

#### Step 4: Build and Deploy

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting
```

**Output**:

```text
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project
Hosting URL: https://your-project.web.app
```

#### Step 7: Custom Domain

1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Enter domain: `www.yourdomain.com`
4. Verify ownership
5. Configure DNS (Firebase provides records)
6. Wait for SSL provisioning

#### Firebase Hosting with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
          # ... other env vars

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: your-project-id
          channelId: live
```

**Setup GitHub Secrets**:

1. Go to repository Settings > Secrets
2. Add all `VITE_*` environment variables
3. Add `FIREBASE_SERVICE_ACCOUNT` (from Firebase Console)

---

## CI/CD Setup

### GitHub Actions for Vercel

Create `.github/workflows/deploy-vercel.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Continuous Deployment Best Practices

1. **Staging Environment**:
   - Deploy all branches to preview/staging
   - Test before merging to main

2. **Automated Tests**:
   - Run tests before deployment
   - Block deployment on test failures

3. **Build Caching**:
   - Cache `node_modules`
   - Speeds up deployment

4. **Deployment Notifications**:
   - Slack/Discord notifications
   - Email on deployment success/failure

---

## Performance Optimization

### Build Optimization

#### 1. Code Splitting

Already implemented via lazy-loaded routes:

```javascript
// router/index.js
{
  path: '/dashboard',
  component: () => import('@/pages/Dashboard.vue')
}
```

**Result**: Each route loads only when accessed

#### 2. Asset Optimization

**Images**:

```bash
# Install image optimizer
npm install -D vite-plugin-imagemin

# Add to vite.config.js
import viteImagemin from 'vite-plugin-imagemin'

plugins: [
  viteImagemin({
    gifsicle: { optimizationLevel: 7 },
    optipng: { optimizationLevel: 7 },
    mozjpeg: { quality: 80 },
    pngquant: { quality: [0.8, 0.9], speed: 4 },
    svgo: {
      plugins: [
        { name: 'removeViewBox', active: false },
        { name: 'removeEmptyAttrs', active: true }
      ]
    }
  })
]
```

#### 3. Tree Shaking

Vite automatically tree-shakes unused code. Ensure imports are specific:

```javascript
// Good: Import specific functions
import { ref, computed } from 'vue'

// Avoid: Import entire library
import * as Vue from 'vue'
```

#### 4. Minification

Enabled by default in production builds. Verify in `vite.config.js`:

```javascript
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,  // Remove console.logs
      drop_debugger: true
    }
  }
}
```

### Runtime Optimization

#### 1. Preload Critical Resources

```html
<!-- index.html -->
<head>
  <link rel="preload" href="/fonts/custom-font.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
```

#### 2. Lazy Load Images

```vue
<template>
  <img loading="lazy" src="/images/product.jpg" alt="Product">
</template>
```

#### 3. Service Worker (PWA)

```bash
# Install PWA plugin
npm install -D vite-plugin-pwa

# Add to vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

plugins: [
  VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'GeekDigital',
      short_name: 'GeekDigital',
      theme_color: '#3B82F6',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })
]
```

### CDN Configuration

Most hosting platforms include CDN automatically:

- **Vercel**: Global Edge Network
- **Netlify**: Global CDN
- **Firebase**: Google's CDN

**Custom CDN** (CloudFlare):

1. Sign up for CloudFlare
2. Add your domain
3. Update nameservers
4. Enable "Proxied" mode (orange cloud)

---

## Security Considerations

### HTTPS/SSL

**Requirement**: HTTPS is mandatory for:

- Payment processing (Stripe, PayPal)
- Service Workers (PWA)
- Secure cookies

**Setup**: All recommended platforms provide automatic SSL

### Security Headers

Add to hosting configuration:

**Netlify** (`netlify.toml`):

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

**Vercel** (`vercel.json`):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### Content Security Policy

Add CSP header:

```text
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.paypal.com https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://firebaseapp.com https://api.stripe.com https://www.paypal.com;
```

### Firebase Security Rules

**Firestore** (production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Public read, authenticated write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

**Storage**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User uploads
    match /user-uploads/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 2. Environment Variable Security

**Never expose**:

- Stripe secret keys (only public keys)
- Firebase admin SDK keys
- Database passwords
- API secret keys

**Use platform secrets manager**:

- Vercel: Environment Variables (encrypted)
- Netlify: Environment Variables (encrypted)
- GitHub: Repository Secrets

---

## Monitoring and Analytics

### Google Analytics 4

#### Setup

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID: `G-XXXXXXXXXX`

#### Integration

```bash
npm install vue-gtag
```

```javascript
// main.js
import VueGtag from 'vue-gtag'

app.use(VueGtag, {
  config: { id: 'G-XXXXXXXXXX' }
}, router)
```

#### Track Events

```javascript
// Track custom event
import { event } from 'vue-gtag'

const trackPurchase = (amount) => {
  event('purchase', {
    currency: 'USD',
    value: amount,
    items: cartStore.items
  })
}
```

### Error Tracking (Sentry)

```bash
npm install @sentry/vue
```

```javascript
// main.js
import * as Sentry from '@sentry/vue'

Sentry.init({
  app,
  dsn: 'https://your-sentry-dsn@sentry.io/project-id',
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router)
    })
  ],
  tracesSampleRate: 1.0,
  environment: import.meta.env.MODE
})
```

### Performance Monitoring

**Web Vitals**:

```bash
npm install web-vitals
```

```javascript
// main.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

---

## Troubleshooting Deployment

### Build Failures

#### Error: Out of Memory

```bash
# Increase Node memory limit
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

#### Error: Module not found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

**Check**:

1. Variable names have `VITE_` prefix
2. Platform environment variables set correctly
3. Deployment triggered after adding variables
4. No typos in variable names

### 404 Errors on Refresh

**Problem**: Direct URL navigation gives 404

**Solution**: Configure SPA redirect

**Vercel** (`vercel.json`):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Netlify** (`netlify.toml`):

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Firebase Authentication Errors

**Error**: Unauthorized domain

**Solution**:

1. Go to Firebase Console > Authentication > Settings
2. Click "Authorized domains"
3. Add your production domain

### Payment Processing Errors

**Stripe**:

1. Verify using live keys (pk_live_...) in production
2. Check webhook endpoint configured
3. Verify domain in Stripe dashboard

**PayPal**:

1. Switch from sandbox to production in code
2. Use live credentials
3. Verify return URLs configured

---

## Rollback Strategy

### Quick Rollback

**Vercel**:

1. Go to Deployments
2. Find previous successful deployment
3. Click "..." > "Promote to Production"

**Netlify**:

1. Go to Deploys
2. Find previous deploy
3. Click "Publish deploy"

**Firebase**:

```bash
firebase hosting:rollback
```

### Git-Based Rollback

```bash
# Revert last commit
git revert HEAD
git push origin main

# Revert to specific commit
git revert <commit-hash>
git push origin main
```

---

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] All routes accessible
- [ ] Authentication works
- [ ] Payments process correctly (test with small amount)
- [ ] Cart persists
- [ ] Custom domain configured
- [ ] SSL/HTTPS active
- [ ] Analytics tracking
- [ ] Error monitoring setup
- [ ] Performance tested (Lighthouse)
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] Sitemap accessible

---

## Next Steps

After successful deployment:

1. **Monitor**: Check analytics and error tracking
2. **Iterate**: Gather user feedback and improve
3. **Optimize**: Review performance metrics
4. **Scale**: Consider backend API for data persistence

---

**Congratulations!** Your GeekDigital application is now live in production!
