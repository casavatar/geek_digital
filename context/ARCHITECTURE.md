# GeekDigital - Architecture Documentation

## Table of Contents

1. [System Architecture Overview](#system-architecture-overview)
2. [Application Layers](#application-layers)
3. [Design Patterns](#design-patterns)
4. [Component Architecture](#component-architecture)
5. [Data Flow Architecture](#data-flow-architecture)
6. [State Management Architecture](#state-management-architecture)
7. [Routing Architecture](#routing-architecture)
8. [Service Layer Architecture](#service-layer-architecture)
9. [Security Architecture](#security-architecture)
10. [Performance Considerations](#performance-considerations)

---

## System Architecture Overview

### Architecture Style

GeekDigital implements a **Single-Page Application (SPA)** architecture with a clear **Layered Architecture Pattern**:

```diagram
┌───────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                            │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │              Vue 3 Application (SPA)                         │  │
│  │  ┌───────────────────────────────────────────────────────┐  │  │
│  │  │         Presentation Layer (Components)               │  │  │
│  │  │  • Pages  • Layouts  • UI Components                  │  │  │
│  │  └───────────────────┬───────────────────────────────────┘  │  │
│  │                      │                                       │  │
│  │  ┌───────────────────▼───────────────────────────────────┐  │  │
│  │  │      State Management Layer (Pinia Stores)            │  │  │
│  │  │  • Auth Store  • Cart Store  • User Store            │  │  │
│  │  └───────────────────┬───────────────────────────────────┘  │  │
│  │                      │                                       │  │
│  │  ┌───────────────────▼───────────────────────────────────┐  │  │
│  │  │          Service Layer (Business Logic)               │  │  │
│  │  │  • authService  • paymentService  • firebase          │  │  │
│  │  └───────────────────┬───────────────────────────────────┘  │  │
│  │                      │                                       │  │
│  │  ┌───────────────────▼───────────────────────────────────┐  │  │
│  │  │         Integration Layer (HTTP/SDKs)                 │  │  │
│  │  │  • Axios  • Firebase SDK  • Stripe SDK  • PayPal     │  │  │
│  │  └───────────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────────┘  │
└───────────────────────────┬───────────────────────────────────────┘
                            │
                            │ HTTPS/WebSockets
                            │
┌───────────────────────────▼───────────────────────────────────────┐
│                   External Services (Cloud)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │   Firebase   │  │    Stripe    │  │   PayPal Platform    │   │
│  │ Auth/Firestore│  │   Payments   │  │      Payments        │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└───────────────────────────────────────────────────────────────────┘
```

### Key Architectural Principles

1. **Separation of Concerns**: Clear boundaries between UI, state, and business logic
2. **Unidirectional Data Flow**: Data flows down, events flow up
3. **Single Source of Truth**: Pinia stores as the canonical state
4. **Dependency Injection**: Services injected into stores, stores injected into components
5. **Lazy Loading**: Routes and heavy components loaded on-demand
6. **Progressive Enhancement**: Works without external services (demo mode)

---

## Application Layers

### 1. Presentation Layer (View)

**Responsibility**: User interface and user interaction

**Components**:

- **Pages**: Route-level components (`Home.vue`, `Dashboard.vue`, etc.)
- **Layouts**: Wrapper components (`DefaultLayout.vue`, `AuthLayout.vue`)
- **Components**: Reusable UI elements (`Navbar.vue`, `Footer.vue`)

**Characteristics**:

- Vue 3 Composition API with `<script setup>`
- Reactive data binding
- Event handling
- Props/emits for component communication
- Tailwind CSS for styling

**Example Pattern**:

```vue
<script setup>
import { useAuthStore } from '@/store/modules/auth'
const authStore = useAuthStore()

const handleAction = () => {
  // Call store action (doesn't contain business logic)
  authStore.performAction()
}
</script>
```

### 2. State Management Layer (Model)

**Responsibility**: Application state and computed data

**Components**:

- **Auth Store**: Authentication state, user information
- **Cart Store**: Shopping cart items, totals
- **User Store**: User-specific data (purchases, licenses)

**Characteristics**:

- Pinia stores with Composition API
- Reactive state (ref, computed)
- Actions for mutations
- localStorage integration for persistence
- Store-to-store communication (composition)

**Pattern**:

```javascript
export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)

  // Getters (computed)
  const isAuthenticated = computed(() => !!user.value)

  // Actions
  const login = async (email, password) => {
    const userData = await authService.login(email, password)
    user.value = userData
  }

  return { user, isAuthenticated, login }
})
```

### 3. Service Layer (Business Logic)

**Responsibility**: Business logic and external API communication

**Components**:

- **authService**: Firebase authentication wrapper
- **paymentService**: Stripe/PayPal integration
- **firebase**: Firebase SDK initialization

**Characteristics**:

- Singleton pattern (class instances)
- Abstraction over external SDKs
- Error handling and transformation
- Demo mode fallbacks
- Promise-based async operations

**Pattern**:

```javascript
class AuthService {
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }
}
export const authService = new AuthService()
```

### 4. Integration Layer

**Responsibility**: Communication with external services

**Components**:

- Axios for HTTP requests
- Firebase SDK
- Stripe SDK
- PayPal SDK (dynamically loaded)

**Characteristics**:

- Environment-based configuration
- Interceptors for common behavior
- Error handling
- Request/response transformation

---

## Design Patterns

### 1. Composition API Pattern

**Purpose**: Modern Vue 3 reactivity and code organization

**Implementation**:

```vue
<script setup>
// Reactive state
const count = ref(0)
const doubled = computed(() => count.value * 2)

// Lifecycle
onMounted(() => {
  console.log('Component mounted')
})

// Methods
const increment = () => count.value++
</script>
```

**Benefits**:

- Better code organization
- Reusability through composables
- Improved TypeScript support
- Smaller bundle size

### 2. Store Module Pattern

**Purpose**: Organize state by domain/feature

**Implementation**:

```text
store/
└── modules/
    ├── auth.js      # Authentication domain
    ├── cart.js      # Shopping domain
    └── user.js      # User data domain
```

**Benefits**:

- Clear boundaries
- Independent testing
- Code splitting
- Team collaboration

### 3. Service Locator Pattern

**Purpose**: Centralize external service access

**Implementation**:

```javascript
// Services as singletons
export const authService = new AuthService()
export const paymentService = new PaymentService()

// Used in stores
const authStore = defineStore('auth', () => {
  const login = async (email, password) => {
    return await authService.login(email, password)
  }
})
```

**Benefits**:

- Testability (easy mocking)
- Consistent error handling
- Single point of configuration

### 4. Layout Pattern

**Purpose**: Share common UI structure across routes

**Implementation**:

```javascript
{
  path: '/',
  component: DefaultLayout,  // Layout wrapper
  children: [
    { path: '', component: Home },
    { path: 'catalog', component: Catalog }
  ]
}
```

**Benefits**:

- DRY (Don't Repeat Yourself)
- Consistent navigation
- Easy layout switching

### 5. Repository Pattern (Prepared)

**Purpose**: Abstract data access (future backend integration)

**Current State**: Services act as repositories for external APIs
**Future Implementation**:

```javascript
// Future: Dedicated repository layer
class ProductRepository {
  async findAll() { return await api.get('/products') }
  async findById(id) { return await api.get(`/products/${id}`) }
  async create(product) { return await api.post('/products', product) }
}
```

### 6. Strategy Pattern (Payment Processing)

**Purpose**: Multiple payment method handling

**Implementation**:

```javascript
class PaymentService {
  async processStripePayment(data) { /* Stripe strategy */ }
  async processPayPalPayment(data) { /* PayPal strategy */ }
}
```

**Benefits**:

- Easy to add new payment methods
- Isolated payment logic
- Testable strategies

### 7. Guard Pattern (Route Protection)

**Purpose**: Protect routes based on authentication state

**Implementation**:

```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
```

---

## Component Architecture

### Component Hierarchy

```text
App.vue (Root)
│
├── DefaultLayout.vue
│   ├── Navbar.vue
│   ├── router-view (Page)
│   │   ├── Home.vue
│   │   ├── Catalog.vue
│   │   ├── Portfolio.vue
│   │   ├── Shop.vue
│   │   └── Dashboard.vue
│   └── Footer.vue
│
└── AuthLayout.vue
    └── router-view (Page)
        └── Login.vue
```

### Component Communication Patterns

#### 1. Parent-to-Child (Props)

```vue
<!-- Parent -->
<ChildComponent :data="parentData" />

<!-- Child -->
<script setup>
const props = defineProps({
  data: Object
})
</script>
```

#### 2. Child-to-Parent (Emits)

```vue
<!-- Child -->
const emit = defineEmits(['update'])
emit('update', newValue)

<!-- Parent -->
<ChildComponent @update="handleUpdate" />
```

#### 3. Cross-Component (Store)

```vue
<!-- Any Component -->
const authStore = useAuthStore()
console.log(authStore.user)
```

#### 4. Layout-to-Page (router-view)

```vue
<template>
  <Navbar />
  <router-view /> <!-- Pages injected here -->
  <Footer />
</template>
```

### Component Types

#### 1. Page Components

- Route-level components
- Orchestrate multiple features
- Connect to stores
- Example: `Dashboard.vue`, `Shop.vue`

#### 2. Layout Components

- Structural wrappers
- Provide navigation/footer
- Minimal logic
- Example: `DefaultLayout.vue`

#### 3. UI Components

- Reusable elements
- Accept props, emit events
- No business logic
- Example: `Navbar.vue`, `Footer.vue`

#### 4. Smart Components (Future)

- Connected to stores
- Business logic
- Example: `CartWidget.vue` (not yet implemented)

#### 5. Dumb Components (Future)

- Pure presentation
- Props in, events out
- Example: `ProductCard.vue` (not yet implemented)

---

## Data Flow Architecture

### Unidirectional Data Flow

```diagram
┌─────────────────────────────────────────────────────────────┐
│                       User Action                            │
│                   (click, input, etc.)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Component Handler                          │
│                 (method in component)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Store Action                              │
│              (async business logic)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Service Call                               │
│              (external API/Firebase)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  State Mutation                              │
│              (update reactive refs)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   UI Re-render                               │
│            (Vue reactivity system)                           │
└─────────────────────────────────────────────────────────────┘
```

### Example: Login Flow

```text
1. User clicks "Login" button
   └─> Login.vue: handleLogin()

2. Component calls store action
   └─> authStore.login(email, password)

3. Store calls service
   └─> authService.login(email, password)

4. Service calls Firebase
   └─> signInWithEmailAndPassword(auth, email, password)

5. Firebase returns user data
   └─> { uid, email, displayName }

6. Service returns to store
   └─> user object

7. Store updates state
   └─> user.value = userData

8. Computed properties update
   └─> isAuthenticated.value = true

9. Components re-render
   └─> Navbar shows user menu, Login redirects

10. Route guard allows navigation
    └─> router.push('/dashboard')
```

### Reactive Data Flow

```javascript
// Store defines reactive state
const user = ref(null)
const isAuthenticated = computed(() => !!user.value)

// Component consumes reactive state
const authStore = useAuthStore()
// Template automatically updates when isAuthenticated changes
<div v-if="authStore.isAuthenticated">Welcome!</div>
```

---

## State Management Architecture

### Pinia Store Structure

Each store follows this pattern:

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExampleStore = defineStore('example', () => {
  // ===== STATE =====
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // ===== GETTERS (Computed) =====
  const hasData = computed(() => !!data.value)
  const formattedData = computed(() => /* transform data */)

  // ===== ACTIONS =====
  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      data.value = await service.getData()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const resetState = () => {
    data.value = null
    error.value = null
  }

  // ===== RETURN (PUBLIC API) =====
  return {
    // State
    data, loading, error,
    // Getters
    hasData, formattedData,
    // Actions
    fetchData, resetState
  }
})
```

### Store Composition

Stores can use other stores:

```javascript
export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()  // Compose with auth store

  const loadUserData = async () => {
    if (!authStore.isAuthenticated) return
    // Load user-specific data
  }

  return { loadUserData }
})
```

### State Persistence

```javascript
// Cart store with localStorage
const items = ref([])

const saveCart = () => {
  localStorage.setItem('geek_digital_cart', JSON.stringify(items.value))
}

const loadCart = () => {
  const saved = localStorage.getItem('geek_digital_cart')
  if (saved) items.value = JSON.parse(saved)
}

// Auto-load on store creation
loadCart()
```

---

## Routing Architecture

### Route Structure

```javascript
const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', component: Home },
      { path: 'catalog', component: Catalog },
      { path: 'portfolio', component: Portfolio },
      { path: 'shop', component: Shop },
      {
        path: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login,
        meta: { guest: true }
      }
    ]
  }
]
```

### Navigation Guards

```javascript
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title || 'GeekDigital'

  // Protected routes
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  // Guest-only routes
  else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  }
  else {
    next()
  }
})
```

### Code Splitting

```javascript
// Lazy-loaded routes
component: () => import('@/pages/Dashboard.vue')
// Creates separate chunks: Dashboard.[hash].js
```

---

## Service Layer Architecture

### Service Class Pattern

```javascript
class AuthService {
  constructor() {
    this.currentUser = null
  }

  async login(email, password) {
    // Implementation
  }

  handleAuthError(error) {
    // Centralized error handling
  }
}

export const authService = new AuthService()
```

### Error Handling Strategy

```javascript
handleAuthError(error) {
  const errorMessages = {
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    // ... more error codes
  }
  const message = errorMessages[error.code] || error.message
  return new Error(message)
}
```

### Demo Mode Pattern

```javascript
async login(email, password) {
  if (!auth) {
    // Demo mode fallback
    const demoUser = { uid: 'demo-' + Date.now(), email }
    localStorage.setItem('demo_user', JSON.stringify(demoUser))
    return demoUser
  }
  // Real Firebase auth
  return await signInWithEmailAndPassword(auth, email, password)
}
```

---

## Security Architecture

### Authentication Security

1. **Firebase Authentication**: Industry-standard security
2. **HTTPS Only**: All communications encrypted
3. **Token-based**: JWT tokens from Firebase
4. **No Password Storage**: Passwords never stored client-side

### Route Protection

```javascript
// Protected route
meta: { requiresAuth: true }

// Guard prevents access
if (to.meta.requiresAuth && !authStore.isAuthenticated) {
  next({ name: 'Login' })
}
```

### Environment Variables

```javascript
// Sensitive data in .env (not committed)
VITE_FIREBASE_API_KEY=...
VITE_STRIPE_PUBLIC_KEY=...

// Accessed via import.meta.env
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
```

### Payment Security

1. **Client-Side Only Public Keys**: Never expose secret keys
2. **Server-Side Processing**: Real transactions on backend (future)
3. **HTTPS Required**: All payment data encrypted
4. **PCI Compliance**: Stripe/PayPal handle card data

---

## Performance Considerations

### 1. Code Splitting

```javascript
// Route-level splitting
component: () => import('@/pages/Dashboard.vue')

// Reduces initial bundle size
// Loads pages on-demand
```

### 2. Lazy Loading

- Routes loaded on navigation
- Images loaded on scroll (future)
- External scripts loaded when needed (PayPal SDK)

### 3. Reactive Optimizations

```javascript
// Computed values cached
const totalPrice = computed(() =>
  items.value.reduce((sum, item) => sum + item.price, 0)
)
// Only recalculates when items change
```

### 4. LocalStorage Persistence

- Cart persists across sessions
- Reduces server requests
- Instant load times

### 5. Vite Optimizations

- Hot Module Replacement (HMR)
- Tree-shaking
- Minification
- Asset optimization

---text
*Last updated: 2025-01-21*
