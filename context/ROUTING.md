# GeekDigital - Routing Documentation

## Table of Contents
1. [Overview](#overview)
2. [Route Configuration](#route-configuration)
3. [Route Definitions](#route-definitions)
4. [Navigation Guards](#navigation-guards)
5. [Route Meta Fields](#route-meta-fields)
6. [Layouts and Nested Routes](#layouts-and-nested-routes)
7. [Programmatic Navigation](#programmatic-navigation)
8. [Scroll Behavior](#scroll-behavior)
9. [Common Routing Patterns](#common-routing-patterns)

---

## Overview

GeekDigital uses **Vue Router 4** for client-side routing, enabling a single-page application (SPA) experience with multiple views. The routing system is configured in `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/router/index.js`.

### Key Features
- **History Mode**: Uses HTML5 History API for clean URLs (no hash)
- **Nested Routes**: Layouts wrap page components
- **Lazy Loading**: Code-split route components
- **Navigation Guards**: Authentication and authorization
- **Route Metadata**: Custom data for routes (title, auth requirements)
- **Scroll Management**: Auto-scroll to top on navigation

### Router Instance

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),  // Clean URLs (/catalog vs /#/catalog)
  routes,                       // Route definitions
  scrollBehavior               // Scroll management
})
```

---

## Route Configuration

### File Location
`C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/router/index.js`

### Import Structure

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
```

**Note**: Layouts are eagerly loaded (direct import), pages are lazy-loaded (dynamic import).

---

## Route Definitions

### Complete Route Map

| Path | Name | Component | Layout | Auth Required | Description |
|------|------|-----------|--------|---------------|-------------|
| `/` | Home | Home.vue | Default | No | Landing page with hero and features |
| `/catalog` | Catalog | Catalog.vue | Default | No | Browse application catalog |
| `/portfolio` | Portfolio | Portfolio.vue | Default | No | Data engineering portfolio showcase |
| `/shop` | Shop | Shop.vue | Default | No | Digital product store with cart |
| `/dashboard` | Dashboard | Dashboard.vue | Default | Yes | User dashboard (protected) |
| `/auth/login` | Login | Login.vue | Auth | Guest Only | Login/register page |
| `/:pathMatch(.*)*` | NotFound | NotFound.vue | None | No | 404 error page |

### Route Hierarchy

```
/ (DefaultLayout)
├── '' → Home
├── catalog → Catalog
├── portfolio → Portfolio
├── shop → Shop
└── dashboard → Dashboard (requiresAuth)

/auth (AuthLayout)
└── login → Login (guest)

/* (No Layout)
└── /:pathMatch(.*) → NotFound
```

---

## Route Definitions (Detailed)

### 1. Default Layout Routes

```javascript
{
  path: '/',
  component: DefaultLayout,
  children: [
    {
      path: '',
      name: 'Home',
      component: () => import('@/pages/Home.vue'),
      meta: { title: 'GeekDigital - Home' }
    },
    {
      path: 'catalog',
      name: 'Catalog',
      component: () => import('@/pages/Catalog.vue'),
      meta: { title: 'App Catalog - GeekDigital' }
    },
    {
      path: 'portfolio',
      name: 'Portfolio',
      component: () => import('@/pages/Portfolio.vue'),
      meta: { title: 'Portfolio - GeekDigital' }
    },
    {
      path: 'shop',
      name: 'Shop',
      component: () => import('@/pages/Shop.vue'),
      meta: { title: 'Shop - GeekDigital' }
    },
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/pages/Dashboard.vue'),
      meta: {
        title: 'Dashboard - GeekDigital',
        requiresAuth: true  // Protected route
      }
    }
  ]
}
```

**Characteristics**:
- All routes render inside `DefaultLayout` (with Navbar + Footer)
- Lazy-loaded components (code splitting)
- Custom page titles
- Dashboard requires authentication

### 2. Authentication Layout Routes

```javascript
{
  path: '/auth',
  component: AuthLayout,
  children: [
    {
      path: 'login',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
      meta: {
        title: 'Login - GeekDigital',
        guest: true  // Redirect authenticated users away
      }
    }
  ]
}
```

**Characteristics**:
- Clean layout without navbar/footer
- Guest-only route (authenticated users redirected to dashboard)
- Centered authentication UI

### 3. Catch-All Route (404)

```javascript
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/pages/NotFound.vue'),
  meta: { title: '404 - Page Not Found' }
}
```

**Characteristics**:
- Catches all unmatched routes
- No layout wrapper
- Should be last in route array

---

## Navigation Guards

### Global Before Guard

**Location**: `src/router/index.js`

```javascript
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Set page title
  document.title = to.meta.title || 'GeekDigital'

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  // Redirect authenticated users away from guest-only pages
  else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  }
  else {
    next()
  }
})
```

### Guard Logic Flow

```
User navigates to route
        ↓
beforeEach hook runs
        ↓
Set page title from meta.title
        ↓
┌─────────────────────┐
│ Route requires auth?│
└─────────┬───────────┘
          │
    ┌─────▼─────┐
    │   YES     │
    └─────┬─────┘
          │
    ┌─────▼─────────────┐
    │ User authenticated?│
    └─────┬─────────────┘
          │
    ┌─────▼────┐   NO   ┌────────────────────────┐
    │   YES    │────────▶│ Redirect to Login      │
    └─────┬────┘         │ with redirect query    │
          │              └────────────────────────┘
          ▼
    ┌─────────────────┐
    │ Guest only?     │
    └─────┬───────────┘
          │
    ┌─────▼────┐
    │   YES    │
    └─────┬────┘
          │
    ┌─────▼─────────────┐
    │ User authenticated?│
    └─────┬─────────────┘
          │
    ┌─────▼────┐   YES  ┌────────────────────────┐
    │    NO    │────────▶│ Redirect to Dashboard  │
    └─────┬────┘         └────────────────────────┘
          │
          ▼
    ┌─────────────────┐
    │ Allow navigation│
    └─────────────────┘
```

### Guard Examples

#### 1. Protected Route (Dashboard)

```javascript
// User not logged in
User navigates to /dashboard
  → Guard checks requiresAuth: true
  → authStore.isAuthenticated: false
  → Redirect to /auth/login?redirect=/dashboard

// After login
Login successful
  → Check redirect query parameter
  → Navigate to /dashboard
  → Guard allows access
```

#### 2. Guest-Only Route (Login)

```javascript
// User already logged in
Logged-in user navigates to /auth/login
  → Guard checks guest: true
  → authStore.isAuthenticated: true
  → Redirect to /dashboard
```

#### 3. Public Route (Home)

```javascript
// No restrictions
User navigates to /
  → No requiresAuth or guest meta
  → Guard allows access
  → Page loads
```

---

## Route Meta Fields

### Meta Field Definitions

```javascript
meta: {
  title: String,         // Page title for document.title
  requiresAuth: Boolean, // Route requires authentication
  guest: Boolean         // Route only for non-authenticated users
}
```

### Meta Field Usage

| Route | title | requiresAuth | guest |
|-------|-------|--------------|-------|
| Home | "GeekDigital - Home" | - | - |
| Catalog | "App Catalog - GeekDigital" | - | - |
| Portfolio | "Portfolio - GeekDigital" | - | - |
| Shop | "Shop - GeekDigital" | - | - |
| Dashboard | "Dashboard - GeekDigital" | true | - |
| Login | "Login - GeekDigital" | - | true |
| NotFound | "404 - Page Not Found" | - | - |

### Accessing Meta in Components

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.meta.title)
console.log(route.meta.requiresAuth)
</script>
```

---

## Layouts and Nested Routes

### Layout Pattern

```javascript
{
  path: '/',
  component: LayoutComponent,  // Parent (layout)
  children: [
    { path: '', component: Page1 },  // Child (page)
    { path: 'page2', component: Page2 }
  ]
}
```

### DefaultLayout Structure

**File**: `src/layouts/DefaultLayout.vue`

```vue
<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <router-view />  <!-- Child route component renders here -->
    </main>
    <Footer />
  </div>
</template>
```

**Result**: All child routes have Navbar + Footer

### AuthLayout Structure

**File**: `src/layouts/AuthLayout.vue`

```vue
<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
    <router-view />  <!-- Login page centered -->
  </div>
</template>
```

**Result**: Clean, centered authentication UI

### Route Matching Examples

| URL | Layout | Page Component |
|-----|--------|----------------|
| `/` | DefaultLayout | Home.vue |
| `/catalog` | DefaultLayout | Catalog.vue |
| `/dashboard` | DefaultLayout | Dashboard.vue |
| `/auth/login` | AuthLayout | Login.vue |
| `/invalid-route` | None | NotFound.vue |

---

## Programmatic Navigation

### Using useRouter

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate to route
router.push('/catalog')
router.push({ name: 'Catalog' })
router.push({ path: '/catalog' })

// Navigate with query
router.push({ name: 'Login', query: { redirect: '/dashboard' } })

// Navigate with params (not used in current app)
router.push({ name: 'Product', params: { id: 123 } })

// Go back
router.back()

// Replace (no history entry)
router.replace('/catalog')
</script>
```

### Navigation Examples in Code

#### 1. Login Redirect

```javascript
// Login.vue
const handleLogin = async () => {
  const result = await authStore.login(email, password)
  if (result.success) {
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)  // Go to original destination or dashboard
  }
}
```

#### 2. Logout

```javascript
// Navbar.vue
const handleLogout = async () => {
  await authStore.logout()
  router.push('/')  // Redirect to home
}
```

#### 3. Cart Checkout

```javascript
// Shop.vue
const checkout = () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login', query: { redirect: '/shop' } })
    return
  }
  // Process checkout
}
```

### Using router-link

```vue
<!-- Declarative navigation -->
<router-link to="/">Home</router-link>
<router-link :to="{ name: 'Catalog' }">Catalog</router-link>
<router-link to="/portfolio">Portfolio</router-link>

<!-- Active class automatically applied -->
<router-link
  to="/catalog"
  active-class="text-primary-600"
  class="nav-link"
>
  Catalog
</router-link>
```

---

## Scroll Behavior

### Configuration

```javascript
const router = createRouter({
  // ...
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // Restore scroll position when using browser back/forward
      return savedPosition
    } else {
      // Scroll to top on route change
      return { top: 0 }
    }
  }
})
```

### Behavior

| Navigation | Scroll Behavior |
|------------|-----------------|
| Click link | Scroll to top |
| Browser back button | Restore previous scroll position |
| Browser forward button | Restore previous scroll position |
| Programmatic (router.push) | Scroll to top |

### Custom Scroll Positions (Examples for Future)

```javascript
// Scroll to specific element
return { el: '#main-content', behavior: 'smooth' }

// Scroll with offset
return { top: 100 }

// Delayed scroll (wait for content)
return new Promise(resolve => {
  setTimeout(() => resolve({ top: 0 }), 500)
})
```

---

## Common Routing Patterns

### 1. Protected Route Pattern

```javascript
// Define route
{
  path: 'dashboard',
  name: 'Dashboard',
  component: () => import('@/pages/Dashboard.vue'),
  meta: { requiresAuth: true }
}

// Guard checks
if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  next({ name: 'Login', query: { redirect: to.fullPath } })
}
```

### 2. Guest-Only Pattern

```javascript
// Define route
{
  path: 'login',
  name: 'Login',
  component: () => import('@/pages/Login.vue'),
  meta: { guest: true }
}

// Guard redirects authenticated users
if (to.meta.guest && authStore.isAuthenticated) {
  next({ name: 'Dashboard' })
}
```

### 3. Redirect After Login Pattern

```javascript
// Before login (in navigation guard)
next({ name: 'Login', query: { redirect: to.fullPath } })

// After login (in Login component)
const redirect = route.query.redirect || '/dashboard'
router.push(redirect)
```

### 4. Lazy Loading Pattern

```javascript
// Route definition
component: () => import('@/pages/Dashboard.vue')

// Creates separate chunk: Dashboard.[hash].js
// Only loaded when route is accessed
```

### 5. Layout Switching Pattern

```javascript
// Public pages use DefaultLayout
{
  path: '/',
  component: DefaultLayout,
  children: [/* public pages */]
}

// Auth pages use AuthLayout
{
  path: '/auth',
  component: AuthLayout,
  children: [/* auth pages */]
}
```

### 6. 404 Catch-All Pattern

```javascript
// Must be last in routes array
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/pages/NotFound.vue')
}
```

---

## Route Testing Checklist

### Public Routes (No Auth Required)
- [ ] `/` - Home page loads
- [ ] `/catalog` - Catalog displays
- [ ] `/portfolio` - Portfolio shows projects
- [ ] `/shop` - Shop displays products and cart

### Protected Routes (Auth Required)
- [ ] `/dashboard` - Redirects to login if not authenticated
- [ ] `/dashboard` - Loads when authenticated
- [ ] Login redirect includes original URL in query

### Guest Routes (Auth Not Allowed)
- [ ] `/auth/login` - Loads when not authenticated
- [ ] `/auth/login` - Redirects to dashboard if authenticated

### Navigation
- [ ] Navbar links navigate correctly
- [ ] Footer links navigate correctly
- [ ] Browser back/forward work
- [ ] Scroll to top on navigation
- [ ] Active link highlighting works

### Meta & Guards
- [ ] Page titles update correctly
- [ ] Auth guard prevents unauthorized access
- [ ] Guest guard prevents logged-in users from auth pages
- [ ] Redirect query parameter preserved

---

## Future Enhancements

### Potential Route Additions

```javascript
// Product detail page
{
  path: 'product/:id',
  name: 'ProductDetail',
  component: () => import('@/pages/ProductDetail.vue'),
  props: true  // Pass route params as props
}

// User profile
{
  path: 'profile/:username',
  name: 'Profile',
  component: () => import('@/pages/Profile.vue')
}

// Admin area
{
  path: '/admin',
  component: AdminLayout,
  meta: { requiresAuth: true, requiresAdmin: true },
  children: [/* admin pages */]
}
```

### Advanced Guard Features

```javascript
// Role-based access
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'Forbidden' })
  }
})

// Data prefetching
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresData) {
    await store.fetchData(to.params.id)
  }
  next()
})

// Loading indicator
router.beforeEach((to, from, next) => {
  loadingStore.start()
  next()
})

router.afterEach(() => {
  loadingStore.stop()
})
```

---

## Troubleshooting

### Common Issues

#### Issue: 404 on page refresh
**Cause**: Server not configured for SPA
**Solution**: Configure server to serve `index.html` for all routes

#### Issue: Guard not firing
**Cause**: Guard registered after navigation
**Solution**: Ensure guards registered before router is mounted

#### Issue: Redirect loop
**Cause**: Guard logic creating circular redirects
**Solution**: Check guard conditions carefully

#### Issue: Slow route transitions
**Cause**: Large lazy-loaded chunks
**Solution**: Further split components, optimize imports

---

*Last updated: 2025-01-21*
