# GeekDigital - API Reference

Last Updated: 2025-01-21

## Table of Contents

1. [Overview](#overview)
2. [Pinia Stores API](#pinia-stores-api)
   - [Auth Store](#auth-store)
   - [Cart Store](#cart-store)
   - [User Store](#user-store)
3. [Services API](#services-api)
   - [Auth Service](#auth-service)
   - [Payment Service](#payment-service)
   - [Firebase Configuration](#firebase-configuration)
4. [Component Props & Events](#component-props--events)
5. [Router API](#router-api)
6. [Usage Examples](#usage-examples)

---

## Overview

This document provides a complete API reference for GeekDigital's internal APIs, including Pinia stores, services, and component interfaces. All APIs use Vue 3 Composition API patterns.

### Conventions

- **State**: Reactive references (`ref`) containing application data
- **Getters**: Computed properties derived from state
- **Actions**: Async functions that modify state
- **Services**: Singleton classes providing external API integration

### Import Patterns

```javascript
// Stores
import { useAuthStore } from '@/store/modules/auth'
import { useCartStore } from '@/store/modules/cart'
import { useUserStore } from '@/store/modules/user'

// Services
import { authService } from '@/services/authService'
import { paymentService } from '@/services/paymentService'

// Components
import Navbar from '@/components/layout/Navbar.vue'
```

---

## Pinia Stores API

### Auth Store

**Path**: `@/store/modules/auth`

**Purpose**: Manage user authentication state and operations

#### 1. State

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `user` | `Object \| null` | `null` | Current authenticated user object |
| `loading` | `Boolean` | `false` | Loading state for async operations |
| `error` | `String \| null` | `null` | Error message from last operation |

##### User Object Schema

```typescript
{
  uid: string,           // Firebase user ID
  email: string,         // User email address
  displayName: string,   // Display name
  emailVerified: boolean // Email verification status
}
```

#### 1. Getters

| Getter | Type | Description |
|--------|------|-------------|
| `isAuthenticated` | `Boolean` | Returns true if user is logged in |
| `userEmail` | `String` | Returns user email or empty string |
| `userName` | `String` | Returns displayName, email, or "User" |

**Example**:

```javascript
const authStore = useAuthStore()
console.log(authStore.isAuthenticated) // true/false
console.log(authStore.userName) // "John Doe"
```

#### 1. Actions

##### `initializeAuth()`

Initialize authentication state on application mount.

**Returns**: `Promise<void>`

**Usage**:

```javascript
const authStore = useAuthStore()
await authStore.initializeAuth()
```

**Behavior**:

- Checks for existing Firebase session
- Restores demo user from localStorage
- Sets loading state during initialization
- Called automatically in `App.vue`

---

##### `login(email, password)`

Authenticate user with email and password.

**Parameters**:

- `email` (String): User email address
- `password` (String): User password

**Returns**: `Promise<{success: Boolean, error?: String}>`

**Usage**:

```javascript
const result = await authStore.login('user@example.com', 'password123')
if (result.success) {
  console.log('Login successful')
  router.push('/dashboard')
} else {
  console.error(result.error)
}
```

**Error Codes**:

- Invalid email format
- User not found
- Wrong password
- Too many requests
- Network error

---

##### `register(email, password, displayName)`

Register a new user account.

**Parameters**:

- `email` (String): User email address
- `password` (String): User password (min 6 characters)
- `displayName` (String): User display name

**Returns**: `Promise<{success: Boolean, error?: String}>`

**Usage**:

```javascript
const result = await authStore.register(
  'newuser@example.com',
  'securepass123',
  'John Doe'
)
```

**Validation**:

- Email must be valid format
- Password minimum 6 characters
- DisplayName is optional

---

##### `logout()`

Log out the current user.

**Returns**: `Promise<{success: Boolean, error?: String}>`

**Usage**:

```javascript
await authStore.logout()
router.push('/')
```

**Side Effects**:

- Clears user state
- Removes Firebase session
- Clears demo user from localStorage
- Should trigger user data cleanup

---

##### `resetPassword(email)`

Send password reset email to user.

**Parameters**:

- `email` (String): User email address

**Returns**: `Promise<{success: Boolean, error?: String}>`

**Usage**:

```javascript
const result = await authStore.resetPassword('user@example.com')
if (result.success) {
  alert('Password reset email sent!')
}
```

---

##### `clearError()`

Clear error state.

**Returns**: `void`

**Usage**:

```javascript
authStore.clearError()
```

---

### Cart Store

**Path**: `@/store/modules/cart`

**Purpose**: Manage shopping cart state with localStorage persistence

#### State

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `Array<CartItem>` | `[]` | Array of cart items |
| `loading` | `Boolean` | `false` | Future: async operations |

##### CartItem Schema

```typescript
{
  id: number,        // Product ID
  name: string,      // Product name
  price: number,     // Unit price (USD)
  image: string,     // Product image URL
  quantity: number   // Quantity in cart
}
```

#### 2. Getters

| Getter | Type | Description |
|--------|------|-------------|
| `itemCount` | `Number` | Total number of items (sum of quantities) |
| `totalPrice` | `Number` | Total cart value in USD |
| `formattedTotal` | `String` | Formatted total (e.g., "$149.99") |
| `hasItems` | `Boolean` | Returns true if cart has items |

**Example**:

```javascript
const cartStore = useCartStore()
console.log(cartStore.itemCount) // 5
console.log(cartStore.formattedTotal) // "$249.97"
console.log(cartStore.hasItems) // true
```

#### 2. Actions

##### `addItem(product, quantity = 1)`

Add a product to cart or increment quantity if exists.

**Parameters**:

- `product` (Object): Product object with `id`, `name`, `price`, `image`
- `quantity` (Number): Quantity to add (default: 1)

**Returns**: `void`

**Usage**:

```javascript
const product = {
  id: 1,
  name: "Data Toolkit Pro",
  price: 49.99,
  image: "/images/product.jpg"
}
cartStore.addItem(product, 2)
```

**Behavior**:

- If product exists: increments quantity
- If new product: adds to cart
- Automatically persists to localStorage

---

##### `removeItem(productId)`

Remove a product from cart.

**Parameters**:

- `productId` (Number): Product ID to remove

**Returns**: `void`

**Usage**:

```javascript
cartStore.removeItem(1)
```

---

##### `updateQuantity(productId, quantity)`

Update quantity of a cart item.

**Parameters**:

- `productId` (Number): Product ID
- `quantity` (Number): New quantity

**Returns**: `void`

**Usage**:

```javascript
cartStore.updateQuantity(1, 5)
```

**Behavior**:

- If quantity <= 0: removes item
- Automatically persists to localStorage

---

##### `clearCart()`

Remove all items from cart.

**Returns**: `void`

**Usage**:

```javascript
cartStore.clearCart()
```

**Common Use**: After successful checkout

---

##### `loadCart()`

Load cart from localStorage (called automatically on store initialization).

**Returns**: `void`

**Internal Use**: Automatically called when store is created

---

### User Store

**Path**: `@/store/modules/user`

**Purpose**: Manage user-specific data (purchases, licenses, profile)

#### 2. State

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `purchasedApps` | `Array<PurchasedApp>` | `[]` | User's purchased applications |
| `licenses` | `Array<License>` | `[]` | User's license keys |
| `profile` | `Object \| null` | `null` | User profile data |
| `loading` | `Boolean` | `false` | Loading state |

##### PurchasedApp Schema

```typescript
{
  id: number,
  name: string,
  purchaseDate: string,     // ISO 8601 timestamp
  version?: string,
  downloadUrl?: string,
  ...additionalFields
}
```

##### License Schema

```typescript
{
  id: string,
  key: string,              // License key
  product: string,          // Product name
  status: string,           // 'active' | 'expired' | 'revoked'
  createdAt: string,        // ISO 8601 timestamp
  expiresAt?: string        // ISO 8601 timestamp
}
```

#### 3. Getters

| Getter | Type | Description |
|--------|------|-------------|
| `hasPurchasedApp(appId)` | `Function` | Returns function to check if app purchased |
| `activeLicenses` | `Array<License>` | Returns only active licenses |

**Example**:

```javascript
const userStore = useUserStore()
const isPurchased = userStore.hasPurchasedApp(1)
console.log(isPurchased) // true/false
console.log(userStore.activeLicenses) // [...]
```

#### 3. Actions

##### `loadUserData()`

Load user data from localStorage (production: backend API).

**Returns**: `Promise<void>`

**Usage**:

```javascript
const userStore = useUserStore()
await userStore.loadUserData()
```

**Behavior**:

- Requires authentication
- Loads data scoped to current user UID
- Called automatically in Dashboard

---

##### `addPurchasedApp(app)`

Add an application to user's purchased apps.

**Parameters**:

- `app` (Object): Application object

**Returns**: `void`

**Usage**:

```javascript
const app = {
  id: 1,
  name: "Data Toolkit Pro",
  version: "1.0.0",
  downloadUrl: "https://..."
}
userStore.addPurchasedApp(app)
```

**Called After**: Successful payment processing

---

##### `addLicense(license)`

Add a license to user's licenses.

**Parameters**:

- `license` (Object): License object

**Returns**: `void`

**Usage**:

```javascript
const license = {
  id: "lic_123",
  key: "XXXX-XXXX-XXXX-XXXX",
  product: "Data Toolkit Pro",
  status: "active",
  createdAt: new Date().toISOString()
}
userStore.addLicense(license)
```

---

##### `updateProfile(profileData)`

Update user profile information.

**Parameters**:

- `profileData` (Object): Profile fields to update

**Returns**: `void`

**Usage**:

```javascript
userStore.updateProfile({
  displayName: "John Doe",
  bio: "Data Engineer",
  website: "https://example.com"
})
```

---

##### `clearUserData()`

Clear all user data (called on logout).

**Returns**: `void`

**Usage**:

```javascript
userStore.clearUserData()
```

---

## Services API

### Auth Service

**Path**: `@/services/authService`

**Type**: Singleton class instance

**Purpose**: Firebase Authentication wrapper with demo mode

#### Methods

##### `initAuthListener(callback)`

Set up Firebase auth state listener.

**Parameters**:

- `callback` (Function): Function to call on auth state change

**Returns**: `Function` - Unsubscribe function

**Usage**:

```javascript
const unsubscribe = authService.initAuthListener((user) => {
  console.log('Auth state changed:', user)
  authStore.user = user
})

// Later: unsubscribe()
```

---

##### `getCurrentUser()`

Get currently authenticated user.

**Returns**: `Promise<User | null>`

**Usage**:

```javascript
const user = await authService.getCurrentUser()
if (user) {
  console.log('User logged in:', user.email)
}
```

**Behavior**:

- Waits for Firebase auth initialization
- Returns demo user if in demo mode
- Returns null if not authenticated

---

##### 'login(email, password)'

Authenticate user with email and password.

**Parameters**:

- `email` (String): User email
- `password` (String): User password

**Returns**: `Promise<User>`

**Throws**: `Error` with user-friendly message

**Usage**:

```javascript
try {
  const user = await authService.login('user@example.com', 'password')
  console.log('Logged in as:', user.email)
} catch (error) {
  console.error('Login failed:', error.message)
}
```

**Error Messages**:

- "No account found with this email."
- "Incorrect password."
- "Invalid email address."
- "Network error. Please check your connection."

---

##### 'register(email, password, displayName)''

Register a new user account.

**Parameters**:

- `email` (String): User email
- `password` (String): User password
- `displayName` (String, optional): Display name

**Returns**: `Promise<User>`

**Throws**: `Error` with user-friendly message

**Usage**:

```javascript
try {
  const user = await authService.register(
    'newuser@example.com',
    'securepass',
    'John Doe'
  )
  console.log('Account created:', user.uid)
} catch (error) {
  console.error('Registration failed:', error.message)
}
```

**Error Messages**:

- "An account with this email already exists."
- "Password should be at least 6 characters."
- "Invalid email address."

---

##### 'logout()'

Log out current user.

**Returns**: `Promise<void>`

**Throws**: `Error` on logout failure

**Usage**:

```javascript
await authService.logout()
```

---

##### 'resetPassword(email)'

Send password reset email.

**Parameters**:

- `email` (String): User email

**Returns**: `Promise<void>`

**Throws**: `Error` on failure

**Usage**:

```javascript
try {
  await authService.resetPassword('user@example.com')
  alert('Password reset email sent!')
} catch (error) {
  alert('Failed: ' + error.message)
}
```

---

##### `handleAuthError(error)`

Transform Firebase error to user-friendly message.

**Parameters**:

- `error` (FirebaseError): Firebase error object

**Returns**: `Error` with user-friendly message

**Internal Use**: Called by other auth methods

---

### Payment Service

**Path**: `@/services/paymentService`

**Type**: Singleton class instance

**Purpose**: Stripe and PayPal integration

#### Stripe Methods

##### `initStripe()`

Initialize Stripe SDK.

**Returns**: `Promise<Stripe | null>`

**Usage**:

```javascript
const stripe = await paymentService.initStripe()
if (stripe) {
  // Stripe ready
}
```

**Behavior**:

- Lazy-loads Stripe SDK
- Returns null if not configured
- Caches instance for subsequent calls

---

##### `createStripeCheckout(items)`

Create Stripe checkout session.

**Parameters**:

```typescript
- `items` (Array<CartItem>): Cart items to purchase
```

**Returns**: `Promise<Object>`

**Response Schema**:

```typescript
{
  success: boolean,
  sessionId?: string,
  mode: 'demo' | 'production'
}
```

**Usage**:

```javascript
const result = await paymentService.createStripeCheckout(cartStore.items)
if (result.success) {
  // Redirect to checkout or handle success
}
```

**Note**: Current demo mode simulates success. Production requires backend API.

---

##### `processStripePayment(paymentMethod, amount)`

Process a Stripe payment.

**Parameters**:

- `paymentMethod` (String): Payment method ID
- `amount` (Number): Amount in USD

**Returns**: `Promise<Object>`

**Response Schema**:

```typescript
{
  success: boolean,
  transactionId: string,
  amount: number,
  mode: 'demo' | 'production'
}
```

**Usage**:

```javascript
const result = await paymentService.processStripePayment('pm_123', 49.99)
```

---

#### PayPal Methods

##### `loadPayPalSDK()`

Dynamically load PayPal SDK.

**Returns**: `Promise<PayPal | null>`

**Usage**:

```javascript
const paypal = await paymentService.loadPayPalSDK()
if (paypal) {
  // PayPal SDK loaded
}
```

**Behavior**:

- Injects PayPal script tag
- Returns cached instance if already loaded
- Returns null if not configured

---

##### `createPayPalOrder(items, totalAmount)`

Create PayPal order.

**Parameters**:

```typescript
- `items` (Array<CartItem>): Cart items
- `totalAmount` (Number): Total amount
```

**Returns**: `Promise<Object>`

**Response Schema**:

```typescript
{
  orderId: string,
  mode: 'demo' | 'production'
}
```

**Usage**:

```javascript
const order = await paymentService.createPayPalOrder(
  cartStore.items,
  cartStore.totalPrice
)
console.log('Order ID:', order.orderId)
```

---

##### `capturePayPalPayment(orderId)`

Capture PayPal payment.

**Parameters**:

- `orderId` (String): PayPal order ID

**Returns**: `Promise<Object>`

**Response Schema**:

```typescript
{
  success: boolean,
  transactionId: string,
  orderId: string,
  mode: 'demo' | 'production'
}
```

**Usage**:

```javascript
const result = await paymentService.capturePayPalPayment('ORDER_123')
```

---

##### `verifyPayment(transactionId, provider)`

Verify payment with backend (future).

**Parameters**:

- `transactionId` (String): Transaction ID
- `provider` (String): 'stripe' | 'paypal'

**Returns**: `Promise<Object>`

**Response Schema**:

```typescript
{
  verified: boolean,
  transactionId: string,
  provider: string,
  timestamp: string
}
```

**Usage**:

```javascript
const verification = await paymentService.verifyPayment(
  'txn_123',
  'stripe'
)
if (verification.verified) {
  // Grant access to product
}
```

**Note**: Currently demo mode. Production requires backend verification.

---

### Firebase Configuration

**Path**: `@/services/firebase`

**Purpose**: Centralized Firebase SDK initialization

#### Exports

| Export | Type | Description |
|--------|------|-------------|
| `app` | `FirebaseApp \| null` | Firebase app instance |
| `auth` | `Auth \| null` | Firebase Authentication |
| `db` | `Firestore \| null` | Cloud Firestore database |
| `storage` | `Storage \| null` | Firebase Storage |

**Usage**:

```javascript
import { auth, db, storage } from '@/services/firebase'

if (auth) {
  // Firebase configured
  const user = auth.currentUser
}

if (db) {
  // Firestore available
  const docRef = doc(db, 'users', userId)
}
```

**Note**: All exports may be `null` if Firebase not configured (demo mode).

---

## Component Props & Events

### Navbar Component

**Path**: `@/components/layout/Navbar.vue`

**Props**: None

**Events**: None

**State Dependencies**:

- `useAuthStore()` - For authentication state
- `useCartStore()` - For cart item count

**Usage**:

```vue
<template>
  <Navbar />
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
</script>
```

**Features**:

- Responsive navigation
- Auth state display (login/user menu)
- Cart item badge
- Active route highlighting

---

### Footer Component

**Path**: `@/components/layout/Footer.vue`

**Props**: None

**Events**: None

**Usage**:

```vue
<template>
  <Footer />
</template>

<script setup>
import Footer from '@/components/layout/Footer.vue'
</script>
```

**Features**:

- Site links
- Social media links
- Copyright notice

---

### DefaultLayout Component

**Path**: `@/layouts/DefaultLayout.vue`

**Props**: None

**Events**: None

**Slots**:

- Default slot via `<router-view />`

**Usage**:

```javascript
// router/index.js
{
  path: '/',
  component: DefaultLayout,
  children: [
    { path: '', component: Home },
    { path: 'catalog', component: Catalog }
  ]
}
```

**Structure**:

```diagram
┌─────────────────────┐
│      Navbar         │
├─────────────────────┤
│                     │
│   <router-view>     │
│   (Page Content)    │
│                     │
├─────────────────────┤
│      Footer         │
└─────────────────────┘
```

---

### AuthLayout Component

**Path**: `@/layouts/AuthLayout.vue`

**Props**: None

**Events**: None

**Slots**:

- Default slot via `<router-view />`

**Usage**:

```javascript
// router/index.js
{
  path: '/auth',
  component: AuthLayout,
  children: [
    { path: 'login', component: Login }
  ]
}
```

**Structure**:

```diagram
┌─────────────────────┐
│                     │
│   <router-view>     │
│   (Auth Page)       │
│   Centered, Clean   │
│                     │
└─────────────────────┘
```

---

## Router API

### Route Configuration

**Path**: `@/router/index.js`

#### Route Meta Fields

| Field | Type | Description |
|-------|------|-------------|
| `requiresAuth` | `Boolean` | Route requires authentication |
| `guest` | `Boolean` | Route only for non-authenticated users |
| `title` | `String` | Page title |

**Example**:

```javascript
{
  path: '/dashboard',
  component: Dashboard,
  meta: {
    requiresAuth: true,
    title: 'Dashboard - GeekDigital'
  }
}
```

#### Navigation Guards

##### Global Before Guard

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

#### Programmatic Navigation

```javascript
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate to route
router.push('/dashboard')

// Navigate with params
router.push({ name: 'Dashboard', params: { id: 123 } })

// Navigate with query
router.push({ path: '/shop', query: { category: 'tools' } })

// Go back
router.back()

// Replace (no history entry)
router.replace('/dashboard')
```

---

## Usage Examples

### Complete Authentication Flow

```vue
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  authStore.clearError()

  const result = await authStore.login(email.value, password.value)

  if (result.success) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <p v-if="authStore.error" class="error">
      {{ authStore.error }}
    </p>

    <button type="submit" :disabled="authStore.loading">
      {{ authStore.loading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>
```

### Complete Shopping Cart Flow

```vue
<script setup>
import { useCartStore } from '@/store/modules/cart'
import { useUserStore } from '@/store/modules/user'
import { useAuthStore } from '@/store/modules/auth'
import { paymentService } from '@/services/paymentService'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()

const addToCart = (product) => {
  cartStore.addItem(product, 1)
  alert('Added to cart!')
}

const removeFromCart = (productId) => {
  cartStore.removeItem(productId)
}

const checkout = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/login?redirect=/shop')
    return
  }

  try {
    const result = await paymentService.createStripeCheckout(cartStore.items)

    if (result.success) {
      // Add purchased apps to user
      cartStore.items.forEach(item => {
        userStore.addPurchasedApp({
          id: item.id,
          name: item.name,
          purchaseDate: new Date().toISOString()
        })
      })

      // Clear cart
      cartStore.clearCart()

      // Redirect to dashboard
      router.push('/dashboard')
      alert('Purchase successful!')
    }
  } catch (error) {
    alert('Payment failed: ' + error.message)
  }
}
</script>

<template>
  <div>
    <h2>Shopping Cart</h2>

    <div v-if="cartStore.hasItems">
      <div v-for="item in cartStore.items" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p>${{ item.price }} × {{ item.quantity }}</p>
        <button @click="removeFromCart(item.id)">Remove</button>
      </div>

      <p>Total: {{ cartStore.formattedTotal }}</p>
      <button @click="checkout">Checkout</button>
    </div>

    <p v-else>Cart is empty</p>
  </div>
</template>
```

### Dashboard with User Data

```vue
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/login')
    return
  }

  await userStore.loadUserData()
})

const handleLogout = async () => {
  await authStore.logout()
  userStore.clearUserData()
  router.push('/')
}
</script>

<template>
  <div>
    <h1>Welcome, {{ authStore.userName }}</h1>

    <section v-if="userStore.loading">
      <p>Loading your data...</p>
    </section>

    <section v-else>
      <h2>My Purchased Apps</h2>
      <div v-if="userStore.purchasedApps.length > 0">
        <div v-for="app in userStore.purchasedApps" :key="app.id">
          <h3>{{ app.name }}</h3>
          <p>Purchased: {{ new Date(app.purchaseDate).toLocaleDateString() }}</p>
        </div>
      </div>
      <p v-else>No purchased apps yet</p>

      <h2>My Licenses</h2>
      <div v-if="userStore.activeLicenses.length > 0">
        <div v-for="license in userStore.activeLicenses" :key="license.id">
          <h3>{{ license.product }}</h3>
          <p>Key: {{ license.key }}</p>
          <p>Status: {{ license.status }}</p>
        </div>
      </div>
      <p v-else>No active licenses</p>
    </section>

    <button @click="handleLogout">Logout</button>
  </div>
</template>
```

---

## Troubleshooting

### Common Issues

#### Store not reactive

```javascript
// Wrong: Destructuring loses reactivity
const { user } = useAuthStore()

// Correct: Use store directly
const authStore = useAuthStore()
console.log(authStore.user)
```

#### Firebase not initialized

```javascript
// Check if Firebase configured
import { auth } from '@/services/firebase'
if (!auth) {
  console.warn('Running in demo mode')
}
```

#### Cart not persisting

```javascript
// Verify localStorage is available
if (typeof localStorage === 'undefined') {
  console.error('localStorage not available')
}

// Check localStorage quota
try {
  localStorage.setItem('test', 'test')
  localStorage.removeItem('test')
} catch (e) {
  console.error('localStorage quota exceeded')
}
```

#### Payment not processing

```javascript
// Verify environment variables
console.log('Stripe configured:', !!import.meta.env.VITE_STRIPE_PUBLIC_KEY)
console.log('PayPal configured:', !!import.meta.env.VITE_PAYPAL_CLIENT_ID)
```

---

## Best Practices

### Store Usage

1. Always use stores, never modify state directly:
2. Check authentication before accessing protected data:
3. Handle loading states:

```javascript
// Good
cartStore.addItem(product)

// Bad
cartStore.items.push(product)
```

```javascript
if (authStore.isAuthenticated) {
  await userStore.loadUserData()
}
```

```vue
<div v-if="authStore.loading">Loading...</div>
<div v-else>{{ authStore.user }}</div>
```

### Service Usage

1. Always handle service errors:
2. Check service availability:
3. Use demo mode for development:

```javascript
try {
  await authService.login(email, password)
} catch (error) {
  console.error(error.message)
}
```

```javascript
const stripe = await paymentService.initStripe()
if (!stripe) {
  // Handle unavailable service
}
```

```javascript
// Services automatically fall back to demo mode
// if environment variables not configured
```

---

## Version History

### v1.0.0 (2025-01-21)

- Initial API documentation
- Auth, Cart, User stores documented
- Auth and Payment services documented
- Component props documented
- Usage examples added

---

For more information, see:

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Environment setup
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Development workflow
- [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) - System architecture
