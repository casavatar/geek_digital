# GeekDigital - Setup Guide

Last Updated: 2025-01-21

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Quick Start](#quick-start)
4. [Detailed Installation](#detailed-installation)
5. [Environment Configuration](#environment-configuration)
6. [Firebase Setup](#firebase-setup)
7. [Stripe Setup](#stripe-setup)
8. [PayPal Setup](#paypal-setup)
9. [Verification](#verification)
10. [Troubleshooting](#troubleshooting)

---

## Overview

This guide will help you set up the GeekDigital project on your local development machine. The setup process takes approximately 15-30 minutes depending on your familiarity with the tools.

### What You'll Need

- Code editor (VS Code recommended)
- Terminal/command line access
- Internet connection for dependencies
- Optional: Firebase, Stripe, and PayPal accounts (for full functionality)

### Setup Modes

GeekDigital supports two setup modes:

1. **Demo Mode**: Run immediately without external services (localStorage-based)
2. **Production Mode**: Full functionality with Firebase, Stripe, and PayPal

You can start with Demo Mode and add services later.

---

## Prerequisites

### Required Software

#### 1. Node.js and npm

**Version Required**: Node.js 16.x or higher

**Check Installation**:

```bash
node --version
# Should output: v16.x.x or higher

npm --version
# Should output: 8.x.x or higher
```

**Install if Needed**:

- Download from [nodejs.org](https://nodejs.org/)
- Choose LTS (Long Term Support) version
- Installer includes npm automatically

**Verification**:

```bash
node --version && npm --version
```

---

#### 2. Git (Optional but Recommended)

**Check Installation**:

```bash
git --version
```

**Install if Needed**:

- Download from [git-scm.com](https://git-scm.com/)
- Follow installation wizard
- Configure git:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

### Recommended Tools

#### VS Code Extensions

1. **Volar** (Vue.volar) - Vue 3 language support
2. **ESLint** (dbaeumer.vscode-eslint) - JavaScript linting
3. **Tailwind CSS IntelliSense** - Tailwind autocomplete
4. **Path Intellisense** - Path autocomplete
5. **GitLens** - Enhanced Git integration

**Install Extensions**:

```bash
code --install-extension Vue.volar
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
```

---

## Quick Start

For developers who want to get started immediately:

```bash
# 1. Clone or download the project
git clone <repository-url> geek_digital
cd geek_digital

# 2. Install dependencies
npm install

# 3. Start development server (Demo Mode)
npm run dev
```

That's it! The application will run on `http://localhost:5173` in Demo Mode.

**Demo Mode Features**:

- Mock authentication (no Firebase needed)
- Simulated payments (no Stripe/PayPal needed)
- localStorage data persistence
- All UI features functional

To enable full functionality, continue with the detailed setup below.

---

## Detailed Installation

### Step 1: Obtain Project Files

#### Option A: Clone from Git Repository

```bash
git clone <repository-url> geek_digital
cd geek_digital
```

#### Option B: Download ZIP

1. Download project ZIP file
2. Extract to desired location
3. Open terminal in project directory:

```bash
cd path/to/geek_digital
```

### Step 2: Verify Project Structure

Ensure your project has this structure:

```text
geek_digital/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── store/
│   ├── context/
│   ├── docs/
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── README.md
```

### Step 3: Install Dependencies

```bash
npm install
```

**What This Does**:

- Downloads all required packages from npm
- Installs Vue 3, Vite, Tailwind CSS, Pinia, etc.
- Sets up development and build tools
- Creates `node_modules` folder

**Expected Output**:

```text
added 234 packages, and audited 235 packages in 15s

54 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

**Installation Time**: 1-3 minutes depending on internet speed

---

### Step 4: Environment Configuration

#### Create Environment File

```bash
# Copy example environment file
cp .env.example .env

# Or on Windows:
copy .env.example .env
```

#### Edit .env File

Open `.env` in your code editor. You'll see:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Supabase Configuration (Alternative to Firebase)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key

# PayPal Configuration
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id

# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
```

**For Demo Mode**: Leave all values as placeholders. The app will work with mock data.

**For Production Mode**: Follow the setup guides below for each service.

---

## Environment Configuration

### Understanding Environment Variables

#### What Are Environment Variables?

Environment variables store configuration that changes between environments (development, staging, production) without changing code.

#### Vite Environment Variables

- **Prefix**: All variables must start with `VITE_`
- **Access**: Use `import.meta.env.VITE_VARIABLE_NAME`
- **Build Time**: Variables are embedded at build time
- **Security**: Never commit `.env` files with real credentials

#### Example Usage

```javascript
// In your code
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
console.log('API Key:', apiKey)
```

### Environment Files

| File | Purpose | Committed to Git |
|------|---------|------------------|
| `.env` | Your local environment variables | NO |
| `.env.example` | Template with placeholder values | YES |
| `.env.production` | Production environment (optional) | NO |

---

## Firebase Setup

Firebase provides authentication, database, and storage. This section shows how to create and configure Firebase.

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `geek-digital` (or your preferred name)
4. Click "Continue"
5. Disable Google Analytics (optional)
6. Click "Create project"
7. Wait for project creation (30 seconds)
8. Click "Continue"

### Step 2: Register Web App

1. In Firebase Console, click web icon (`</>`)
2. Enter app nickname: `GeekDigital Web App`
3. Leave "Firebase Hosting" unchecked
4. Click "Register app"
5. You'll see your Firebase configuration:
6. Copy these values to your `.env` file:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

```bash
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### Step 3: Enable Authentication

1. In Firebase Console, click "Authentication" in sidebar
2. Click "Get started"
3. Click "Sign-in method" tab
4. Click "Email/Password"
5. Enable "Email/Password"
6. Leave "Email link (passwordless sign-in)" disabled
7. Click "Save"

**Authentication is now configured!**

### Step 4: Create Firestore Database (Optional)

For future data storage:

1. Click "Firestore Database" in sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select location (nearest to you)
5. Click "Enable"

**Security Rules** (for development):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Note**: Change rules for production!

### Step 5: Configure Firebase Storage (Optional)

For file uploads:

1. Click "Storage" in sidebar
2. Click "Get started"
3. Start in test mode
4. Choose location
5. Click "Done"

### Firebase Setup Complete

**Verify Configuration**:

```bash
npm run dev
```

Try logging in with a new account. If successful, Firebase is working!

---

## Stripe Setup

Stripe handles payment processing. You'll need a Stripe account.

### Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com)
2. Click "Sign in" or "Start now"
3. Create account with email and password
4. Complete account setup (business details)
5. Verify email address

### Step 2: Get API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Click "Developers" in top nav
3. Click "API keys" in sidebar
4. You'll see two keys:
   - **Publishable key**: Starts with `pk_test_`
   - **Secret key**: Starts with `sk_test_`

**For Development**: Use test mode keys (contains `_test_`)

### Step 3: Add to Environment

Copy **Publishable key only** to `.env`:

```bash
VITE_STRIPE_PUBLIC_KEY=pk_test_51XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Security Warning**: Never add secret key to `.env` or commit it!

### Step 4: Test Mode

Stripe test mode allows testing without real money:

**Test Card Numbers**:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Authentication: `4000 0027 6000 3184`

**Test Details**:

- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

### Stripe Webhooks (Future Backend)

For production, you'll need webhook endpoint:

1. Go to "Developers" > "Webhooks"
2. Click "Add endpoint"
3. Enter URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events: `checkout.session.completed`, `payment_intent.succeeded`
5. Copy webhook signing secret

**Note**: Current implementation doesn't require webhooks (demo mode).

---

## PayPal Setup

PayPal provides alternative payment method.

### Step 1: Create PayPal Developer Account

1. Go to [developer.paypal.com](https://developer.paypal.com/)
2. Click "Log In" (top right)
3. Log in with PayPal account or create new account
4. Complete developer account setup

### Step 2: Create App

1. Go to "Dashboard"
2. Click "Apps & Credentials"
3. Ensure "Sandbox" is selected (for testing)
4. Click "Create App"
5. Enter app name: `GeekDigital`
6. Select "Merchant" as app type
7. Click "Create App"

### Step 3: Get Client ID

1. After app creation, you'll see app details
2. Copy "Client ID" (starts with `A`)
3. Add to `.env`:

```bash
VITE_PAYPAL_CLIENT_ID=AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxx
```

### Step 4: Test with Sandbox

PayPal provides sandbox (test) accounts:

1. Go to "Sandbox" > "Accounts"
2. You'll see test buyer and seller accounts
3. Click account email to view credentials
4. Use these credentials to test payments

**Sandbox Test Account**:

- Email: `sb-xxxxx@personal.example.com`
- Password: (shown in sandbox accounts page)

### PayPal Sandbox Testing

When testing checkout:

1. PayPal button opens popup
2. Log in with sandbox buyer account
3. Complete test payment
4. Payment shows in sandbox seller account

---

## Verification

After setup, verify everything works:

### Step 1: Start Development Server

```bash
npm run dev
```

**Expected Output**:

```text
  VITE v5.1.6  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 2: Open Browser

Navigate to `http://localhost:5173/`

**What You Should See**:

- Homepage with hero section
- Navigation bar with links
- Footer
- No console errors

### Step 3: Test Authentication

1. Click "Login" in navbar
2. Click "Register" tab
3. Enter test credentials:
   - Email: `test@example.com`
   - Password: `password123`
   - Display Name: `Test User`
4. Click "Register"
5. Should redirect to Dashboard

**If Successful**: Firebase authentication working!

### Step 4: Test Shopping Cart

1. Navigate to "Shop" page
2. Click "Add to Cart" on a product
3. Cart badge should update
4. Refresh page - cart should persist

**If Successful**: Cart and localStorage working!

### Step 5: Test Checkout (Demo Mode)

1. Add items to cart
2. Click "Checkout with Stripe"
3. Should see success message
4. Go to Dashboard - purchased apps should appear

**If Successful**: Payment flow working!

### Step 6: Check Console

Open browser DevTools (F12):

- **Console**: Should have no errors
- **Network**: Check API calls (if any)
- **Application** > **Local Storage**: Verify data saved

---

## Troubleshooting

### Installation Issues

#### npm install fails

**Error**: `EACCES: permission denied`

**Solution**:

```bash
# On macOS/Linux
sudo npm install

# Better: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

**Error**: `unable to resolve dependency tree`

**Solution**:

```bash
npm install --legacy-peer-deps
```

---

#### Port 5173 already in use

**Error**: `Port 5173 is already in use`

**Solution 1**: Kill process using port

```bash
# On macOS/Linux
lsof -ti:5173 | xargs kill -9

# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Solution 2**: Use different port

```bash
npm run dev -- --port 3000
```

---

### Firebase Issues

#### Firebase not initializing

**Symptoms**:

- Console warning: "Firebase initialization failed"
- Login doesn't work
- Error: "auth is not defined"

**Solution**:

1. Verify `.env` file exists in project root
2. Check all Firebase variables are set
3. Restart dev server (Vite needs restart for env changes)
4. Clear browser cache

**Verify Configuration**:

```javascript
// Add to src/services/firebase.js temporarily
console.log('Firebase Config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
})
```

---

#### Authentication errors

**Error**: `Firebase: Error (auth/api-key-not-valid)`

**Solution**: API key is incorrect. Copy again from Firebase Console.

**Error**: `Firebase: Error (auth/unauthorized-domain)`

**Solution**:

1. Go to Firebase Console > Authentication > Settings
2. Click "Authorized domains"
3. Add `localhost`

---

### Stripe Issues

#### Stripe not loading

**Symptoms**:

- Console error: "Stripe is not defined"
- Payment button doesn't work

**Solution**:

1. Verify `VITE_STRIPE_PUBLIC_KEY` in `.env`
2. Check key starts with `pk_test_` (test mode)
3. Restart dev server

**Verify**:

```javascript
console.log('Stripe Key:', import.meta.env.VITE_STRIPE_PUBLIC_KEY)
```

---

#### Payment fails

**Note**: Current implementation is demo mode. Real payment requires backend.

For future backend integration:

- Backend must create checkout session
- Backend must verify payment
- Never trust client-side payment confirmation

---

### PayPal Issues

#### PayPal SDK not loading

**Symptoms**:

- Console error: "paypal is not defined"
- PayPal button not appearing

**Solution**:

1. Check `VITE_PAYPAL_CLIENT_ID` in `.env`
2. Verify internet connection (SDK loaded from CDN)
3. Check browser console for script errors

**Manually Test SDK Loading**:

```javascript
// In browser console
console.log('PayPal SDK:', window.paypal)
```

---

### General Issues

#### Hot reload not working

**Symptoms**: Changes don't appear without manual refresh

**Solution**:

1. Check file watchers limit (Linux)
2. Restart dev server
3. Clear browser cache

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

---

#### Styles not loading

**Symptoms**: No Tailwind CSS styles

**Solution**:

1. Verify `tailwind.config.js` exists
2. Check `postcss.config.js` exists
3. Restart dev server
4. Clear browser cache
5. Check console for CSS errors

---

#### 404 errors on refresh

**Symptoms**: Direct URL navigation gives 404

**Solution**: This is expected in dev mode. For production, configure server:

**Netlify** (`netlify.toml`):

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel** (`vercel.json`):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## Next Steps

After successful setup:

1. **Read Documentation**:
   - [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Learn development workflow
   - [API_REFERENCE.md](./API_REFERENCE.md) - Explore available APIs
   - [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) - Understand system design

2. **Explore Code**:
   - Start with `src/main.js` (entry point)
   - Review `src/App.vue` (root component)
   - Check `src/router/index.js` (routing)

3. **Make Changes**:
   - Customize branding/colors in `tailwind.config.js`
   - Update content in page components
   - Add new features

4. **Deploy**:
   - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) when ready

---

## Getting Help

### Resources

- **Vue 3 Documentation**: [vuejs.org](https://vuejs.org/)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/)
- **Pinia Documentation**: [pinia.vuejs.org](https://pinia.vuejs.org/)
- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)

### Common Questions

**Q: Do I need Firebase to run the app?**
A: No. The app runs in demo mode without Firebase.

**Q: Can I use Supabase instead of Firebase?**
A: The project has Supabase placeholder variables but implementation uses Firebase. You could adapt the auth service.

**Q: Why are environment variables prefixed with VITE_?**
A: Vite requires this prefix to expose variables to client-side code.

**Q: How do I add more products?**
A: Currently products are hardcoded in Shop.vue. Future versions will use backend API.

**Q: Is this production-ready?**
A: The frontend is production-ready. You need backend API for real payments and data persistence.

---

**Congratulations!** Your GeekDigital development environment is ready. Happy coding!
