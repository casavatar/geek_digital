# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GeekDigital is a Vue 3 + Vite web application serving as a platform for showcasing data engineering projects, providing an application catalog, and selling digital products with integrated authentication (Firebase) and payments (Stripe/PayPal).

## Essential Commands

### Development
```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build
npm run preview  # Preview production build
```

### Environment Setup
```bash
cp .env.example .env  # Copy environment template
# Edit .env with Firebase/Stripe/PayPal credentials (optional - demo mode works without config)
```

## Architecture

### Application Layers

The codebase follows a layered architecture pattern:

1. **Presentation Layer** (`src/pages/`, `src/layouts/`, `src/components/`)
   - Pages use Composition API with `<script setup>`
   - Layout-based routing (DefaultLayout for main pages, AuthLayout for auth pages)
   - Tailwind CSS for styling

2. **State Management Layer** (`src/store/modules/`)
   - Pinia stores using Composition API style
   - Three main stores: `auth`, `cart`, `user`
   - Stores handle both state and business logic

3. **Service Layer** (`src/services/`)
   - Thin wrappers around external APIs (Firebase, Stripe, PayPal)
   - Demo mode fallbacks when services not configured
   - Error handling and transformation

4. **Integration Layer**
   - Firebase for authentication
   - Stripe/PayPal for payments (client-side only - needs backend for production)
   - localStorage for cart persistence

### Key Architectural Patterns

**Route Protection**: Navigation guards in `src/router/index.js` check `meta.requiresAuth` and redirect to login if needed. Guest-only routes (login) redirect authenticated users to dashboard.

**State Composition**: Stores can import and use other stores (e.g., `useUserStore` imports `useAuthStore`). Always import at top level, not inside functions.

**Service Abstraction**: Services provide demo mode when external APIs unavailable. Check for service initialization before using Firebase/Stripe/PayPal features.

**Component Communication**: Parent-child via props/events, global state via Pinia stores, cross-cutting concerns via services.

## Critical Implementation Details

### Path Aliases
```javascript
// '@' resolves to 'src/' via vite.config.js
import { useAuthStore } from '@/store/modules/auth'
import HomeComponent from '@/pages/Home.vue'
```

### Tailwind Custom Classes
Defined in `src/assets/main.css`:
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` - Button styles
- `.card` - Card container
- `.input` - Form input
- `.container-custom` - Max-width container with responsive padding

### Authentication Flow
1. User logs in via `Login.vue`
2. `authStore.login()` called
3. `authService.login()` attempts Firebase auth (or demo mode)
4. On success, user stored in store and localStorage
5. Router guard checks `authStore.isAuthenticated` before protected routes
6. `App.vue` calls `authStore.initializeAuth()` on mount to restore session

### Demo Mode
The application runs without external service configuration:
- **Auth**: `localStorage` stores mock user object with `demo-user-` prefix
- **Payments**: `paymentService` returns mock transaction IDs
- **Data**: `localStorage` used for cart and user data

Check for demo mode in services:
```javascript
if (!auth) {
  // Demo mode - handle without Firebase
}
```

### Cart Persistence
Cart items stored in `localStorage` key `geek_digital_cart`. Auto-loads on store initialization. Clear on logout if needed.

### Route Meta Fields
- `requiresAuth: true` - Requires authentication
- `guest: true` - Redirects authenticated users (login page)
- `title: string` - Page title set by navigation guard

## Store Usage Patterns

### Accessing Stores in Components
```javascript
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()
// Access state: authStore.user, authStore.isAuthenticated
// Call actions: await authStore.login(email, password)
```

### Store Actions Always Return Result Object
```javascript
const result = await authStore.login(email, password)
if (result.success) {
  // Handle success
} else {
  console.error(result.error)
}
```

## Common Modification Scenarios

### Adding a New Page
1. Create `src/pages/NewPage.vue`
2. Add route in `src/router/index.js` under appropriate layout
3. Add navigation link in `src/components/layout/Navbar.vue`
4. Set `meta.requiresAuth` if protected

### Creating a New Store Module
1. Create `src/store/modules/newStore.js`
2. Use `defineStore('storeName', () => { ... })` pattern
3. Return all state, getters, and actions
4. Import in components: `const newStore = useNewStore()`

### Adding a Service Method
1. Add method to existing service or create new service file
2. Include demo mode fallback
3. Handle errors with try-catch and return user-friendly messages
4. Call from store actions, not directly from components

### Styling New Components
- Use Tailwind utility classes first
- Use custom classes from `src/assets/main.css` for common patterns
- Add new global classes to `main.css` under `@layer components`
- Avoid `<style scoped>` unless truly component-specific

## Environment Variables

All client-side environment variables must be prefixed with `VITE_`:
```javascript
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
```

Required for production (optional for demo mode):
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc. (7 Firebase vars)
- `VITE_STRIPE_PUBLIC_KEY`
- `VITE_PAYPAL_CLIENT_ID`

Never commit `.env` with real credentials. Use `.env.example` as template.

## Documentation Structure

Comprehensive documentation exists in two locations:

### `/src/context/` - Project Context (172 KB)
Architectural documentation and implementation details:
- `PROJECT_CONTEXT.md` - Overall project overview
- `ARCHITECTURE.md` - System design and patterns
- `ROUTING.md` - Route configuration and guards
- `STATE_MANAGEMENT.md` - Pinia store reference
- `SERVICES.md` - Service layer details
- `AUTHENTICATION.md` - Auth flow and Firebase setup
- `COMPONENTS.md` - Component hierarchy and patterns

### `/src/docs/` - Technical Documentation (143 KB)
Setup and operational guides:
- `SETUP_GUIDE.md` - Installation and configuration
- `DEVELOPMENT_GUIDE.md` - Development workflow
- `API_REFERENCE.md` - Complete API docs
- `DEPLOYMENT_GUIDE.md` - Production deployment
- `ARCHITECTURE_OVERVIEW.md` - High-level architecture
- `CONTRIBUTING.md` - Contribution guidelines

**When making changes**: Review relevant documentation first, then update docs after changes.

## Testing Approach

No test framework currently configured. When adding tests:
- Use Vitest for unit tests (compatible with Vite)
- Test stores in isolation by importing and calling actions
- Mock services in tests to avoid external dependencies
- Test route guards by mocking router and auth store

## Production Considerations

**Backend Required**: Current payment implementation is client-side demo. Production needs:
- Backend API to create Stripe checkout sessions
- Backend to verify payments via webhooks
- Secure endpoint to generate license keys
- Database for orders and user data

**Security**:
- Never expose Stripe secret keys
- Validate all user input server-side
- Use Firebase security rules for Firestore
- Implement CORS properly on backend

**Performance**:
- Routes use lazy loading (`() => import()`)
- Images should be optimized (not yet implemented)
- Consider code splitting for large pages

## Important Constraints

1. **No Backend**: App is frontend-only. Payment processing requires separate backend service.

2. **Demo Mode**: Application works without external services, but features are limited/mocked.

3. **Vue 3 Composition API**: All components use `<script setup>` syntax. Don't mix with Options API.

4. **Vite Dev Server**: Runs on port 3000 by default (configured in `vite.config.js`).

5. **Firebase/Supabase**: Supabase variables exist in `.env.example` but implementation uses Firebase only.

6. **Client-Side Routing**: SPA mode. Server must redirect all routes to `/index.html` in production.

## Quick Reference

### Project Entry Points
- `src/main.js` - Application bootstrap
- `src/App.vue` - Root component with auth initialization
- `src/router/index.js` - Route definitions and guards
- `index.html` - HTML template

### Store Modules
- `auth.js` - User authentication state
- `cart.js` - Shopping cart with localStorage persistence
- `user.js` - User data (purchased apps, licenses)

### Services
- `authService.js` - Firebase authentication wrapper
- `paymentService.js` - Stripe/PayPal payment handling
- `firebase.js` - Firebase initialization

### Key Components
- `Navbar.vue` - Main navigation with auth state
- `Footer.vue` - Site footer
- `DefaultLayout.vue` - Standard page wrapper
- `AuthLayout.vue` - Clean layout for login/register

### Pages
- `Home.vue` - Landing page
- `Catalog.vue` - App listing with filtering
- `Portfolio.vue` - Project showcase
- `Shop.vue` - Products with cart integration
- `Dashboard.vue` - User panel with tabs
- `Login.vue` - Auth with login/register tabs
- `NotFound.vue` - 404 page
