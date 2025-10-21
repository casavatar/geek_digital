# GeekDigital - State Management Documentation

## Table of Contents
1. [Overview](#overview)
2. [Pinia Architecture](#pinia-architecture)
3. [Auth Store](#auth-store)
4. [Cart Store](#cart-store)
5. [User Store](#user-store)
6. [Store Communication](#store-communication)
7. [Data Flow Patterns](#data-flow-patterns)
8. [State Persistence](#state-persistence)
9. [Best Practices](#best-practices)
10. [Testing Strategies](#testing-strategies)

---

## Overview

GeekDigital uses **Pinia** as its state management solution, leveraging Vue 3's Composition API for reactive, modular state management.

### Why Pinia?

- **Composition API Native**: Perfect fit for Vue 3's `<script setup>`
- **Type Safety**: Excellent TypeScript support (future-ready)
- **Modular**: Easy to split stores by domain
- **Lightweight**: Smaller bundle size than Vuex
- **DevTools**: Full Vue DevTools integration
- **SSR Support**: Server-side rendering ready

### Store Module Structure

```
store/
└── modules/
    ├── auth.js     # Authentication state (user, loading, error)
    ├── cart.js     # Shopping cart state (items, totals)
    └── user.js     # User-specific data (purchases, licenses, profile)
```

### Store Initialization

**File**: `src/main.js`

```javascript
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)  // Must be before router
app.use(router)
```

---

## Pinia Architecture

### Store Definition Pattern

All stores follow this consistent structure:

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useExampleStore = defineStore('storeName', () => {
  // ========== STATE ==========
  const data = ref(initialValue)

  // ========== GETTERS (Computed) ==========
  const derivedData = computed(() => /* transform data */)

  // ========== ACTIONS ==========
  const updateData = async () => {
    // Async operations, service calls
  }

  // ========== RETURN (Public API) ==========
  return {
    data,          // State
    derivedData,   // Getters
    updateData     // Actions
  }
})
```

### Using Stores in Components

```vue
<script setup>
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()

// Access state
console.log(authStore.user)

// Access getters
console.log(authStore.isAuthenticated)

// Call actions
authStore.login(email, password)
</script>

<template>
  <div v-if="authStore.isAuthenticated">
    Welcome, {{ authStore.userName }}
  </div>
</template>
```

---

## Auth Store

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/store/modules/auth.js`

### Responsibilities
- Manage user authentication state
- Handle login/register/logout operations
- Track loading and error states
- Provide user information getters

### State Schema

```javascript
{
  user: {
    uid: String,           // Firebase user ID
    email: String,         // User email
    displayName: String,   // User's display name
    emailVerified: Boolean // Email verification status
  } | null,
  loading: Boolean,        // Async operation in progress
  error: String | null     // Error message
}
```

### Complete API

#### State

```javascript
const user = ref(null)
const loading = ref(false)
const error = ref(null)
```

#### Getters (Computed)

```javascript
const isAuthenticated = computed(() => !!user.value)
const userEmail = computed(() => user.value?.email || '')
const userName = computed(() => user.value?.displayName || user.value?.email || 'User')
```

#### Actions

| Action | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `initializeAuth()` | - | `Promise<void>` | Initialize auth state on app mount |
| `login(email, password)` | email: String, password: String | `Promise<{success, error?}>` | Log in user |
| `register(email, password, displayName)` | email: String, password: String, displayName: String | `Promise<{success, error?}>` | Register new user |
| `logout()` | - | `Promise<{success, error?}>` | Log out current user |
| `resetPassword(email)` | email: String | `Promise<{success, error?}>` | Send password reset email |
| `clearError()` | - | void | Clear error state |

### Implementation Details

#### initializeAuth

```javascript
const initializeAuth = async () => {
  loading.value = true
  try {
    const currentUser = await authService.getCurrentUser()
    user.value = currentUser
  } catch (err) {
    console.error('Auth initialization error:', err)
    user.value = null
  } finally {
    loading.value = false
  }
}
```

**When Called**: On app mount in `App.vue`
**Purpose**: Restore auth state from Firebase/localStorage

#### login

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

**Flow**:
1. Set loading state
2. Clear previous errors
3. Call auth service
4. Update user state on success
5. Set error on failure
6. Return result object

#### logout

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

**Side Effects**:
- Clears user state
- Router redirects to home (handled in component)
- User store clears data (handled in component)

### Usage Examples

#### In Component (Login)

```javascript
// Login.vue
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  authStore.clearError()
  const result = await authStore.login(loginForm.email, loginForm.password)

  if (result.success) {
    router.push('/dashboard')
  }
  // Error displayed reactively from authStore.error
}
```

#### In Component (Protected Access)

```javascript
// Dashboard.vue
const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/login')
  }
})
```

#### In Template

```vue
<!-- Navbar.vue -->
<div v-if="authStore.isAuthenticated">
  <span>{{ authStore.userName }}</span>
  <button @click="authStore.logout()">Logout</button>
</div>
<router-link v-else to="/auth/login">Login</router-link>
```

---

## Cart Store

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/store/modules/cart.js`

### Responsibilities
- Manage shopping cart items
- Calculate totals
- Persist cart to localStorage
- Handle add/remove/update operations

### State Schema

```javascript
{
  items: [
    {
      id: Number,       // Product ID
      name: String,     // Product name
      price: Number,    // Unit price
      image: String,    // Product image URL
      quantity: Number  // Quantity in cart
    }
  ],
  loading: Boolean      // Future: async operations
}
```

### Complete API

#### State

```javascript
const items = ref([])
const loading = ref(false)
```

#### Getters (Computed)

```javascript
const itemCount = computed(() =>
  items.value.reduce((total, item) => total + item.quantity, 0)
)

const totalPrice = computed(() =>
  items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
)

const formattedTotal = computed(() => `$${totalPrice.value.toFixed(2)}`)

const hasItems = computed(() => items.value.length > 0)
```

#### Actions

| Action | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `addItem(product, quantity)` | product: Object, quantity: Number | void | Add product to cart |
| `removeItem(productId)` | productId: Number | void | Remove product from cart |
| `updateQuantity(productId, quantity)` | productId: Number, quantity: Number | void | Update item quantity |
| `clearCart()` | - | void | Empty cart |
| `loadCart()` | - | void | Load cart from localStorage |

### Implementation Details

#### addItem

```javascript
const addItem = (product, quantity = 1) => {
  const existingItem = items.value.find(item => item.id === product.id)

  if (existingItem) {
    // Increment existing item quantity
    existingItem.quantity += quantity
  } else {
    // Add new item
    items.value.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    })
  }

  saveCart()  // Persist to localStorage
}
```

**Logic**:
- Check if product already in cart
- If yes: increase quantity
- If no: add new item
- Always save to localStorage

#### removeItem

```javascript
const removeItem = (productId) => {
  const index = items.value.findIndex(item => item.id === productId)
  if (index > -1) {
    items.value.splice(index, 1)
    saveCart()
  }
}
```

#### updateQuantity

```javascript
const updateQuantity = (productId, quantity) => {
  const item = items.value.find(item => item.id === productId)
  if (item) {
    if (quantity <= 0) {
      removeItem(productId)  // Remove if quantity is 0
    } else {
      item.quantity = quantity
      saveCart()
    }
  }
}
```

#### Persistence Functions

```javascript
const saveCart = () => {
  localStorage.setItem('geek_digital_cart', JSON.stringify(items.value))
}

const loadCart = () => {
  const savedCart = localStorage.getItem('geek_digital_cart')
  if (savedCart) {
    try {
      items.value = JSON.parse(savedCart)
    } catch (err) {
      console.error('Error loading cart:', err)
      items.value = []
    }
  }
}

// Auto-load on store creation
loadCart()
```

### Usage Examples

#### In Component (Shop)

```javascript
// Shop.vue
const cartStore = useCartStore()

const addToCart = (product) => {
  cartStore.addItem(product, 1)
  // Cart automatically updates and persists
}
```

#### In Template (Cart Display)

```vue
<!-- Shop.vue -->
<div v-if="cartStore.hasItems">
  <div v-for="item in cartStore.items" :key="item.id">
    <p>{{ item.name }} - ${{ item.price }}</p>
    <p>Quantity: {{ item.quantity }}</p>
    <button @click="cartStore.removeItem(item.id)">Remove</button>
  </div>
  <p>Total: {{ cartStore.formattedTotal }}</p>
  <p>Items: {{ cartStore.itemCount }}</p>
</div>
```

#### In Navbar (Cart Badge)

```vue
<!-- Navbar.vue -->
<button @click="$router.push('/shop')">
  Cart
  <span v-if="cartStore.itemCount > 0">
    {{ cartStore.itemCount }}
  </span>
</button>
```

---

## User Store

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/store/modules/user.js`

### Responsibilities
- Manage user-specific data (purchases, licenses)
- Store user profile information
- Persist user data to localStorage (production: backend API)

### State Schema

```javascript
{
  purchasedApps: [
    {
      id: Number,
      name: String,
      purchaseDate: String,  // ISO 8601
      ...additionalFields
    }
  ],
  licenses: [
    {
      id: String,
      key: String,
      product: String,
      status: String,        // 'active', 'expired', etc.
      createdAt: String      // ISO 8601
    }
  ],
  profile: {
    displayName: String,
    ...customFields
  } | null,
  loading: Boolean
}
```

### Complete API

#### State

```javascript
const purchasedApps = ref([])
const licenses = ref([])
const profile = ref(null)
const loading = ref(false)
```

#### Getters (Computed)

```javascript
const hasPurchasedApp = computed(() => (appId) => {
  return purchasedApps.value.some(app => app.id === appId)
})

const activeLicenses = computed(() =>
  licenses.value.filter(license => license.status === 'active')
)
```

#### Actions

| Action | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `loadUserData()` | - | `Promise<void>` | Load user data from storage |
| `addPurchasedApp(app)` | app: Object | void | Add app to purchased list |
| `addLicense(license)` | license: Object | void | Add new license |
| `updateProfile(profileData)` | profileData: Object | void | Update user profile |
| `clearUserData()` | - | void | Clear all user data |

### Implementation Details

#### loadUserData

```javascript
const loadUserData = async () => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) return

  loading.value = true
  try {
    // In production, fetch from backend API
    // Currently using localStorage
    const savedData = localStorage.getItem(`user_data_${authStore.user.uid}`)
    if (savedData) {
      const data = JSON.parse(savedData)
      purchasedApps.value = data.purchasedApps || []
      licenses.value = data.licenses || []
      profile.value = data.profile || null
    }
  } catch (err) {
    console.error('Error loading user data:', err)
  } finally {
    loading.value = false
  }
}
```

**When Called**: Dashboard page mount
**Key**: Scoped to user ID for multi-user support

#### addPurchasedApp

```javascript
const addPurchasedApp = (app) => {
  const exists = purchasedApps.value.find(a => a.id === app.id)
  if (!exists) {
    purchasedApps.value.push({
      id: app.id,
      name: app.name,
      purchaseDate: new Date().toISOString(),
      ...app
    })
    saveUserData()
  }
}
```

**Called After**: Successful payment processing

#### Store Communication

```javascript
import { useAuthStore } from './auth'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()  // Access auth store

  const loadUserData = async () => {
    if (!authStore.isAuthenticated) return  // Check auth state
    // Load data
  }

  return { loadUserData }
})
```

### Usage Examples

#### In Dashboard

```javascript
// Dashboard.vue
const authStore = useAuthStore()
const userStore = useUserStore()

onMounted(async () => {
  await userStore.loadUserData()
})
```

#### Check Purchase Status

```javascript
const isPurchased = computed(() => {
  return userStore.hasPurchasedApp(productId)
})
```

---

## Store Communication

### Pattern: Store Composition

Stores can access other stores:

```javascript
// user.js
import { useAuthStore } from './auth'

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore()  // Inject auth store

  const loadUserData = async () => {
    if (!authStore.isAuthenticated) return
    // Use authStore.user.uid for API calls
  }

  return { loadUserData }
})
```

### Communication Flow

```
Auth Store (user authentication)
    ↓
    └─> User Store (user-specific data)
            Uses: authStore.isAuthenticated
            Uses: authStore.user.uid

Cart Store (independent)
    No dependencies on other stores
```

### Best Practices

1. **Avoid Circular Dependencies**: Auth → User is OK, User → Auth is not
2. **Keep Stores Focused**: Each store has one clear responsibility
3. **Use Events for Loose Coupling**: Prefer events over direct store access when possible
4. **Document Dependencies**: Comment which stores are used

---

## Data Flow Patterns

### 1. User Action → Store → Service → Backend

```
Component (Login.vue)
    │
    │ handleLogin()
    ▼
Auth Store (auth.js)
    │
    │ login(email, password)
    ▼
Auth Service (authService.js)
    │
    │ signInWithEmailAndPassword()
    ▼
Firebase Authentication
    │
    │ Return user data
    ▼
Auth Store
    │
    │ user.value = userData
    ▼
Component (reactive update)
    │
    │ router.push('/dashboard')
```

### 2. State Update → Component Re-render

```
Store Action
    │
    │ user.value = newUser
    ▼
Vue Reactivity System
    │
    │ Detect change
    ▼
All Components Using authStore.user
    │
    │ Re-render with new data
```

### 3. Cart Persistence Flow

```
User adds item
    ▼
cartStore.addItem(product)
    ▼
items.value.push(newItem)
    ▼
saveCart()
    ▼
localStorage.setItem('geek_digital_cart', JSON.stringify(items))
    ▼
Page refresh
    ▼
Store initialization
    ▼
loadCart()
    ▼
items.value = JSON.parse(localStorage.getItem('geek_digital_cart'))
```

---

## State Persistence

### LocalStorage Strategy

#### Cart Store
```javascript
// Key: 'geek_digital_cart'
// Scope: Global (all users share cart on same device)
// Format: JSON array of cart items
{
  "geek_digital_cart": [
    { "id": 1, "name": "Product", "price": 49.99, "quantity": 2 }
  ]
}
```

#### User Store
```javascript
// Key: 'user_data_${uid}'
// Scope: Per-user (multiple users supported)
// Format: JSON object with user data
{
  "user_data_demo-123": {
    "purchasedApps": [...],
    "licenses": [...],
    "profile": {...}
  }
}
```

#### Auth Store (Demo Mode)
```javascript
// Key: 'demo_user'
// Scope: Global
// Format: JSON object with mock user
{
  "demo_user": {
    "uid": "demo-1234567890",
    "email": "user@example.com",
    "displayName": "Demo User"
  }
}
```

### Future: Backend Persistence

```javascript
// Replace localStorage with API calls
const loadUserData = async () => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) return

  loading.value = true
  try {
    const response = await axios.get(`/api/users/${authStore.user.uid}/data`)
    purchasedApps.value = response.data.purchasedApps
    licenses.value = response.data.licenses
    profile.value = response.data.profile
  } catch (err) {
    console.error('Error loading user data:', err)
  } finally {
    loading.value = false
  }
}
```

---

## Best Practices

### 1. Store Organization

```javascript
// ✅ Good: Clear sections
export const useAuthStore = defineStore('auth', () => {
  // ===== STATE =====
  const user = ref(null)

  // ===== GETTERS =====
  const isAuthenticated = computed(() => !!user.value)

  // ===== ACTIONS =====
  const login = async (email, password) => { }

  // ===== RETURN =====
  return { user, isAuthenticated, login }
})
```

### 2. Async Actions

```javascript
// ✅ Good: Proper loading/error handling
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

### 3. Computed Properties

```javascript
// ✅ Good: Computed for derived state
const totalPrice = computed(() =>
  items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
)

// ❌ Bad: Action that returns computed value
const getTotalPrice = () => {
  return items.value.reduce((total, item) => total + item.price, 0)
}
```

### 4. State Mutations

```javascript
// ✅ Good: Direct mutation in action
const addItem = (product) => {
  items.value.push(product)
}

// ❌ Bad: External mutation
// In component:
cartStore.items.push(product)  // Don't do this!
```

### 5. Error Handling

```javascript
// ✅ Good: Store error state
const error = ref(null)

const login = async (email, password) => {
  try {
    // ...
  } catch (err) {
    error.value = err.message
    return { success: false, error: err.message }
  }
}

// Component displays error reactively
<div v-if="authStore.error">{{ authStore.error }}</div>
```

---

## Testing Strategies

### Unit Testing Stores

```javascript
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/store/modules/auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with null user', () => {
    const store = useAuthStore()
    expect(store.user).toBe(null)
    expect(store.isAuthenticated).toBe(false)
  })

  it('sets user on login', async () => {
    const store = useAuthStore()
    await store.login('test@example.com', 'password')
    expect(store.user).toBeTruthy()
    expect(store.isAuthenticated).toBe(true)
  })
})
```

### Integration Testing

```javascript
// Test store + service interaction
import { useAuthStore } from '@/store/modules/auth'
import { authService } from '@/services/authService'

vi.mock('@/services/authService')

it('handles login failure', async () => {
  authService.login.mockRejectedValue(new Error('Invalid credentials'))
  const store = useAuthStore()

  const result = await store.login('wrong@example.com', 'wrong')

  expect(result.success).toBe(false)
  expect(store.error).toBe('Invalid credentials')
})
```

---

*Last updated: 2025-01-21*
