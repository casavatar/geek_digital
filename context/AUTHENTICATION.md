# GeekDigital - Authentication Documentation

## Table of Contents

1. [Overview](#overview)
2. [Authentication Architecture](#authentication-architecture)
3. [Authentication Flow](#authentication-flow)
4. [Firebase Authentication Setup](#firebase-authentication-setup)
5. [Demo Mode](#demo-mode)
6. [Route Protection](#route-protection)
7. [Session Management](#session-management)
8. [Security Considerations](#security-considerations)
9. [User Experience](#user-experience)
10. [Troubleshooting](#troubleshooting)

---

## Overview

GeekDigital implements a comprehensive authentication system using **Firebase Authentication** as the primary provider, with a **demo mode** fallback for development and testing without Firebase configuration.

### Authentication Features

- **Email/Password Authentication**: Standard credential-based login
- **User Registration**: New account creation with display name
- **Password Reset**: Email-based password recovery
- **Session Persistence**: Automatic token refresh and session management
- **Route Guards**: Protected routes requiring authentication
- **Guest Routes**: Authentication pages redirect when already logged in
- **Demo Mode**: Fully functional mock authentication for testing

### Technology Stack

- **Firebase Authentication**: Industry-standard authentication service
- **Pinia Store**: Reactive auth state management
- **Vue Router**: Route-level authentication guards
- **LocalStorage**: Session persistence and demo mode storage

---

## Authentication Architecture

### Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     App.vue (Root)                          │
│  - Initializes auth on mount                                │
│  - authStore.initializeAuth()                               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│              Router (Navigation Guards)                      │
│  - beforeEach: Check requiresAuth, guest meta               │
│  - Redirect to login if not authenticated                   │
│  - Redirect to dashboard if authenticated on guest routes   │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
┌────────▼────────┐            ┌────────▼────────┐
│  Login.vue      │            │ Protected Pages │
│  - Login form   │            │ - Dashboard.vue │
│  - Register form│            │ - Requires auth │
└────────┬────────┘            └────────┬────────┘
         │                               │
┌────────▼────────────────────────────────▼────────┐
│         Auth Store (Pinia)                       │
│  - user state                                    │
│  - login/register/logout actions                 │
│  - isAuthenticated computed                      │
└────────┬─────────────────────────────────────────┘
         │
┌────────▼────────────────────────────────────────┐
│         Auth Service (Business Logic)           │
│  - Firebase API wrapper                         │
│  - Error handling                               │
│  - Demo mode fallback                           │
└────────┬────────────────────────────────────────┘
         │
┌────────▼────────────────────────────────────────┐
│         Firebase Authentication                  │
│  - Email/password authentication                │
│  - Session management                           │
│  - Token refresh                                │
└─────────────────────────────────────────────────┘
```

### Data Flow

```
User Action (Login Button)
    ↓
Login Component (Login.vue)
    │
    │ handleLogin()
    ↓
Auth Store (auth.js)
    │
    │ login(email, password)
    ↓
Auth Service (authService.js)
    │
    │ login(email, password)
    ↓
Firebase Authentication
    │
    │ signInWithEmailAndPassword()
    ↓
Firebase Servers
    │
    │ Return user + token
    ↓
Auth Service
    │
    │ Return user object
    ↓
Auth Store
    │
    │ user.value = userData
    │ isAuthenticated.value = true
    ↓
Login Component
    │
    │ router.push('/dashboard')
    ↓
Router Navigation Guard
    │
    │ Check: requiresAuth && isAuthenticated
    │ ✓ Allow navigation
    ↓
Dashboard Page (Loads)
```

---

## Authentication Flow

### 1. Application Initialization

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/App.vue`

```vue
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize auth state on app mount
  authStore.initializeAuth()
})
</script>
```

**What Happens**:
1. App component mounts
2. Calls `authStore.initializeAuth()`
3. Store calls `authService.getCurrentUser()`
4. Checks if user has valid session (Firebase token or demo user)
5. Sets `user` state if authenticated
6. Components reactively update

**Result**: User stays logged in across page refreshes

### 2. Login Flow

#### Step-by-Step

**Component** (`Login.vue`):
```vue
<script setup>
const handleLogin = async () => {
  authStore.clearError()
  const result = await authStore.login(loginForm.email, loginForm.password)

  if (result.success) {
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  }
}
</script>
```

**Store** (`auth.js`):
```javascript
const login = async (email, password) => {
  loading.value = true
  error.value = null
  try {
    const userData = await authService.login(email, password)
    user.value = userData
    return { success: true }
  } catch (err) {
    error.value = err.message
    return { success: false, error: err.message }
  } finally {
    loading.value = false
  }
}
```

**Service** (`authService.js`):
```javascript
async login(email, password) {
  if (!auth) {
    // Demo mode
    const demoUser = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName: email.split('@')[0],
      emailVerified: true
    }
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    return demoUser
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw this.handleAuthError(error)
  }
}
```

**Firebase**:
- Validates credentials
- Creates session token
- Returns user object

#### Login Flow Diagram

```
[Login Form]
    │
    │ User enters email/password
    │ Clicks "Login"
    ↓
[handleLogin()]
    │
    │ authStore.clearError()
    │ authStore.login(email, password)
    ↓
[Auth Store login()]
    │
    │ loading.value = true
    │ authService.login(email, password)
    ↓
[Auth Service login()]
    │
    ├─→ Firebase configured?
    │   │
    │   ├─→ YES: signInWithEmailAndPassword()
    │   │         ↓
    │   │     Firebase validates
    │   │         ↓
    │   │     Return user object
    │   │
    │   └─→ NO: Create demo user
    │             ↓
    │         Save to localStorage
    │             ↓
    │         Return demo user
    │
    ↓
[Auth Store receives user]
    │
    │ user.value = userData
    │ loading.value = false
    │ return { success: true }
    ↓
[Component receives result]
    │
    │ if (result.success)
    │ router.push(redirect || '/dashboard')
    ↓
[Router Navigation]
    │
    │ beforeEach guard checks auth
    │ User is authenticated ✓
    │ Allow navigation
    ↓
[Dashboard Loads]
```

### 3. Registration Flow

**Component** (`Login.vue`):
```javascript
const handleRegister = async () => {
  authStore.clearError()

  if (registerForm.password !== registerForm.confirmPassword) {
    authStore.error = 'Passwords do not match'
    return
  }

  const result = await authStore.register(
    registerForm.email,
    registerForm.password,
    registerForm.displayName
  )

  if (result.success) {
    router.push('/dashboard')
  }
}
```

**Service** (`authService.js`):
```javascript
async register(email, password, displayName) {
  if (!auth) {
    // Demo mode
    const demoUser = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName: displayName || email.split('@')[0],
      emailVerified: false
    }
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    return demoUser
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    // Update profile with display name
    if (displayName) {
      await updateProfile(userCredential.user, { displayName })
    }

    return userCredential.user
  } catch (error) {
    throw this.handleAuthError(error)
  }
}
```

**Additional Steps**:
1. Create Firebase user account
2. Update user profile with displayName
3. User automatically logged in
4. Redirect to dashboard

### 4. Logout Flow

**Component** (`Navbar.vue`):
```javascript
const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
  router.push('/')
}
```

**Store** (`auth.js`):
```javascript
const logout = async () => {
  loading.value = true
  error.value = null
  try {
    await authService.logout()
    user.value = null
    return { success: true }
  } catch (err) {
    error.value = err.message
    return { success: false, error: err.message }
  } finally {
    loading.value = false
  }
}
```

**Service** (`authService.js`):
```javascript
async logout() {
  if (!auth) {
    // Demo mode
    localStorage.removeItem('demo_user')
    return
  }

  try {
    await signOut(auth)
  } catch (error) {
    throw this.handleAuthError(error)
  }
}
```

**Side Effects**:
- Firebase session cleared
- User state set to `null`
- `isAuthenticated` becomes `false`
- Protected routes become inaccessible
- Navbar updates to show "Login" button

---

## Firebase Authentication Setup

### 1. Firebase Project Setup

**Steps**:
1. Create Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication → Email/Password provider
3. Copy project configuration

### 2. Environment Configuration

**File**: `.env`

```bash
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

### 3. Firebase Initialization

**File**: `src/services/firebase.js`

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

let app = null
let auth = null

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
} catch (error) {
  console.warn('Firebase initialization failed. Running in demo mode.', error)
}

export { app, auth }
```

### 4. Firebase Methods Used

| Firebase Method | Purpose | Used In |
|----------------|---------|---------|
| `signInWithEmailAndPassword(auth, email, password)` | Login user | authService.login() |
| `createUserWithEmailAndPassword(auth, email, password)` | Register user | authService.register() |
| `signOut(auth)` | Logout user | authService.logout() |
| `sendPasswordResetEmail(auth, email)` | Password reset | authService.resetPassword() |
| `updateProfile(user, { displayName })` | Update profile | authService.register() |
| `onAuthStateChanged(auth, callback)` | Listen for auth changes | authService.initAuthListener() |

---

## Demo Mode

### Purpose

Allow full authentication functionality without Firebase configuration:
- Development without Firebase account
- Testing and demos
- Rapid prototyping

### How It Works

**Detection**:
```javascript
if (!auth) {
  // Firebase not initialized
  return demoMode()
}

// Firebase available
return realAuthentication()
```

### Demo User Storage

**LocalStorage Key**: `'demo_user'`

**Demo User Object**:
```javascript
{
  uid: 'demo-user-1234567890',  // Timestamp-based unique ID
  email: 'user@example.com',
  displayName: 'user',           // From email prefix
  emailVerified: true
}
```

### Demo Mode Behaviors

#### Login
```javascript
// Create mock user
const demoUser = {
  uid: 'demo-user-' + Date.now(),
  email,
  displayName: email.split('@')[0],
  emailVerified: true
}
localStorage.setItem('demo_user', JSON.stringify(demoUser))
return demoUser
```

**Result**: Any email/password combination works

#### Registration
```javascript
// Create mock user with displayName
const demoUser = {
  uid: 'demo-user-' + Date.now(),
  email,
  displayName: displayName || email.split('@')[0],
  emailVerified: false  // Not verified in demo
}
localStorage.setItem('demo_user', JSON.stringify(demoUser))
return demoUser
```

#### Logout
```javascript
localStorage.removeItem('demo_user')
```

**Result**: Clears demo session

#### Password Reset
```javascript
console.log('Demo mode: Password reset email would be sent to', email)
```

**Result**: Logs to console, no actual email sent

### Demo Mode Indicator

**Component** (`Login.vue`):
```vue
<div class="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
  <p class="text-sm text-blue-700">
    <strong>Demo Mode:</strong> You can use any email/password to test the application.
  </p>
</div>
```

---

## Route Protection

### Protected Routes

Routes requiring authentication use `meta.requiresAuth`:

```javascript
{
  path: 'dashboard',
  name: 'Dashboard',
  component: () => import('@/pages/Dashboard.vue'),
  meta: {
    title: 'Dashboard - GeekDigital',
    requiresAuth: true  // 🔒 Protected
  }
}
```

### Guest Routes

Routes for non-authenticated users use `meta.guest`:

```javascript
{
  path: 'login',
  name: 'Login',
  component: () => import('@/pages/Login.vue'),
  meta: {
    title: 'Login - GeekDigital',
    guest: true  // 🚫 Authenticated users redirected
  }
}
```

### Navigation Guard

**File**: `src/router/index.js`

```javascript
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Set page title
  document.title = to.meta.title || 'GeekDigital'

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Not authenticated, redirect to login with return URL
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  // Redirect authenticated users away from guest-only pages
  else if (to.meta.guest && authStore.isAuthenticated) {
    // Already authenticated, redirect to dashboard
    next({ name: 'Dashboard' })
  }
  else {
    // Allow navigation
    next()
  }
})
```

### Guard Logic Flow

```
User navigates to /dashboard
    ↓
Guard: Check meta.requiresAuth
    ↓
meta.requiresAuth = true
    ↓
Guard: Check authStore.isAuthenticated
    ↓
┌─────────────────────┐
│ isAuthenticated?    │
└────────┬────────────┘
         │
    ┌────┴────┐
    │   YES   │
    └────┬────┘
         │
    Allow navigation
         ↓
    Dashboard loads

    ┌────┴────┐
    │    NO   │
    └────┬────┘
         │
    Redirect to /auth/login?redirect=/dashboard
         ↓
    Login page loads
         ↓
    After successful login
         ↓
    Check redirect query
         ↓
    Navigate to /dashboard
```

### Redirect After Login

**In Login Component**:
```javascript
const handleLogin = async () => {
  const result = await authStore.login(email, password)

  if (result.success) {
    // Check for redirect parameter
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  }
}
```

**Example URL Flow**:
```
1. User tries to access /dashboard (not logged in)
2. Redirected to /auth/login?redirect=/dashboard
3. User logs in
4. Redirected to /dashboard (original destination)
```

---

## Session Management

### Firebase Token Management

**Automatic Handling**:
- Firebase manages JWT tokens
- Tokens automatically refreshed
- Session persists across page refreshes
- Token stored in IndexedDB (Firebase SDK)

### Auth State Listener

```javascript
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    authStore.user = user
  } else {
    // User is signed out
    authStore.user = null
  }
})
```

**Triggers**:
- Initial page load
- Login/logout
- Token refresh
- Session expiration

### Session Persistence

**Firebase Persistence** (default):
```javascript
// Firebase stores session in IndexedDB
// Persists across:
// - Page refreshes
// - Browser restarts
// - Tab closures
```

**Demo Mode Persistence**:
```javascript
// Stored in localStorage
localStorage.setItem('demo_user', JSON.stringify(user))

// Retrieved on app init
const demoUser = localStorage.getItem('demo_user')
if (demoUser) {
  authStore.user = JSON.parse(demoUser)
}
```

---

## Security Considerations

### 1. Client-Side Security

**Environment Variables**:
- Only public keys in client (Firebase config, Stripe public key)
- Secret keys NEVER in frontend code
- `.env` file not committed to version control

**Password Handling**:
- Passwords never stored client-side
- Only transmitted over HTTPS
- Firebase handles password hashing

**Token Security**:
- Firebase tokens are HTTPOnly (server-managed)
- Automatic token refresh
- Short token expiration (1 hour)

### 2. Route Protection

**Always Verify Server-Side**:
```javascript
// ❌ Don't trust client-side auth alone
// Backend must verify Firebase token on every request

// ✅ Client-side guards for UX
// Backend token verification for security
```

### 3. HTTPS Required

**Production**:
- All authentication must use HTTPS
- Firebase enforces HTTPS
- Prevents token interception

### 4. CORS Configuration

**Firebase**:
- Configured domains in Firebase Console
- Prevent unauthorized domain access

### 5. Rate Limiting

**Firebase**:
- Automatic rate limiting on auth attempts
- Prevents brute force attacks
- Error: `'auth/too-many-requests'`

---

## User Experience

### Loading States

```vue
<button
  type="submit"
  :disabled="authStore.loading"
  class="btn btn-primary w-full"
>
  {{ authStore.loading ? 'Logging in...' : 'Login' }}
</button>
```

### Error Display

```vue
<div v-if="authStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
  {{ authStore.error }}
</div>
```

### Success Feedback

```javascript
const handleLogin = async () => {
  const result = await authStore.login(email, password)

  if (result.success) {
    // Immediate redirect (success implied)
    router.push('/dashboard')
  }
  // Error displayed reactively from authStore.error
}
```

### Persistent Login State

```vue
<!-- Navbar shows different UI based on auth state -->
<div v-if="authStore.isAuthenticated">
  <span>Welcome, {{ authStore.userName }}</span>
  <button @click="handleLogout">Logout</button>
</div>
<router-link v-else to="/auth/login">Login</router-link>
```

---

## Troubleshooting

### Common Issues

#### Issue: "Auth not initialized" warning

**Cause**: Firebase environment variables not configured

**Solution**:
1. Copy `.env.example` to `.env`
2. Add Firebase credentials
3. Restart dev server

**Workaround**: Demo mode works without configuration

#### Issue: User logged out on page refresh

**Cause**: Firebase persistence not working

**Solution**:
- Check browser allows IndexedDB
- Clear browser cache
- Verify Firebase initialized correctly

#### Issue: Redirect loop

**Cause**: Guard logic creating circular redirects

**Check**:
```javascript
// Ensure guest routes don't require auth
meta: { guest: true, requiresAuth: false }

// Ensure protected routes aren't marked as guest
meta: { requiresAuth: true, guest: false }
```

#### Issue: "Too many requests" error

**Cause**: Rate limiting from Firebase

**Solution**:
- Wait before retrying
- Implement exponential backoff
- Check for infinite login loops

#### Issue: Token expired

**Behavior**: User logged out unexpectedly

**Cause**: Firebase token expired (1 hour)

**Solution**: Firebase auto-refreshes, but:
- Check network connectivity
- Verify Firebase initialized
- Check browser console for errors

---

*Last updated: 2025-01-21*
