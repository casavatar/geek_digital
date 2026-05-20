# GeekDigital - Services Documentation

## Table of Contents
1. [Overview](#overview)
2. [Service Architecture](#service-architecture)
3. [Auth Service](#auth-service)
4. [Payment Service](#payment-service)
5. [Firebase Configuration](#firebase-configuration)
6. [Service Integration Patterns](#service-integration-patterns)
7. [Error Handling](#error-handling)
8. [Demo Mode Strategy](#demo-mode-strategy)
9. [Future Enhancements](#future-enhancements)

---

## Overview

The service layer in GeekDigital provides abstraction over external APIs and SDKs, centralizing business logic and providing consistent interfaces for state management stores to consume.

### Service Layer Responsibilities

1. **API Communication**: Handle all external service calls (Firebase, Stripe, PayPal)
2. **Error Handling**: Transform external errors into user-friendly messages
3. **Business Logic**: Encapsulate complex operations
4. **Demo Mode**: Provide fallbacks when external services unavailable
5. **Singleton Pattern**: Single instance per service class

### Service Files

```
services/
├── authService.js      # Firebase authentication wrapper
├── paymentService.js   # Stripe and PayPal integration
└── firebase.js         # Firebase SDK initialization
```

---

## Service Architecture

### Service Class Pattern

All services follow this structure:

```javascript
class ServiceName {
  constructor() {
    // Initialize instance variables
    this.config = {}
  }

  async publicMethod(params) {
    // Implement business logic
    try {
      const result = await externalAPI.call(params)
      return this.transformResult(result)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  handleError(error) {
    // Transform errors
  }
}

// Export singleton instance
export const serviceName = new ServiceName()
```

### Integration Flow

```
Component
    ↓
Pinia Store
    ↓
Service Layer (authService, paymentService)
    ↓
External SDK (Firebase, Stripe, PayPal)
    ↓
External API (Firebase servers, payment gateways)
```

---

## Auth Service

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/services/authService.js`

### Purpose

Wraps Firebase Authentication with:
- Simplified API for auth operations
- User-friendly error messages
- Demo mode fallback
- Auth state management

### Class Structure

```javascript
class AuthService {
  constructor() {
    this.currentUser = null
    this.authListeners = []
  }
}

export const authService = new AuthService()
```

### Complete API

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `initAuthListener(callback)` | callback: Function | unsubscribe: Function | Listen for auth state changes |
| `getCurrentUser()` | - | Promise<User\|null> | Get current authenticated user |
| `login(email, password)` | email: String, password: String | Promise<User> | Login with email/password |
| `register(email, password, displayName)` | email: String, password: String, displayName?: String | Promise<User> | Register new user |
| `logout()` | - | Promise<void> | Logout current user |
| `resetPassword(email)` | email: String | Promise<void> | Send password reset email |
| `handleAuthError(error)` | error: FirebaseError | Error | Transform Firebase error to user-friendly message |

### Method Implementation

#### initAuthListener

```javascript
initAuthListener(callback) {
  if (!auth) {
    console.warn('Auth not initialized. Using demo mode.')
    return () => {}
  }

  return onAuthStateChanged(auth, (user) => {
    this.currentUser = user
    if (callback) callback(user)
  })
}
```

**Purpose**: Listen for auth state changes (login, logout, token refresh)
**Returns**: Unsubscribe function
**Usage**: Called in App.vue or auth store initialization

#### getCurrentUser

```javascript
async getCurrentUser() {
  if (!auth) {
    // Demo mode - return mock user if exists
    const demoUser = localStorage.getItem('demo_user')
    return demoUser ? JSON.parse(demoUser) : null
  }

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}
```

**Purpose**: Get current user (wait for auth initialization if needed)
**Demo Mode**: Returns mock user from localStorage
**Usage**: Auth store `initializeAuth()` action

#### login

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

**Flow**:
1. Check if Firebase initialized
2. If demo mode: create mock user, save to localStorage
3. If production: call Firebase `signInWithEmailAndPassword`
4. Return user object
5. Transform errors

**Returns**: User object
```javascript
{
  uid: 'abc123',
  email: 'user@example.com',
  displayName: 'User Name',
  emailVerified: true
}
```

#### register

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
1. Create user account
2. Update profile with displayName (if provided)
3. Return updated user object

#### logout

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
- Clears Firebase session
- Removes demo user from localStorage
- Triggers auth state change listener

#### resetPassword

```javascript
async resetPassword(email) {
  if (!auth) {
    // Demo mode - just log
    console.log('Demo mode: Password reset email would be sent to', email)
    return
  }

  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw this.handleAuthError(error)
  }
}
```

**Behavior**:
- Sends password reset email via Firebase
- Demo mode: logs to console

#### handleAuthError

```javascript
handleAuthError(error) {
  const errorMessages = {
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.'
  }

  const message = errorMessages[error.code] || error.message || 'An error occurred.'
  return new Error(message)
}
```

**Purpose**: Transform Firebase error codes into user-friendly messages
**Fallback**: Returns original error message if code not mapped

### Usage Examples

#### In Auth Store

```javascript
// store/modules/auth.js
import { authService } from '@/services/authService'

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

#### Auth State Listener

```javascript
// App.vue or auth store
authService.initAuthListener((user) => {
  console.log('Auth state changed:', user)
  authStore.user = user
})
```

---

## Payment Service

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/services/paymentService.js`

### Purpose

Integrates Stripe and PayPal payment processing:
- Initialize payment SDKs
- Create checkout sessions
- Process payments
- Verify transactions

### Class Structure

```javascript
class PaymentService {
  constructor() {
    this.stripe = null
    this.stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
    this.paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
  }
}

export const paymentService = new PaymentService()
```

### Complete API

#### Stripe Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `initStripe()` | - | Promise<Stripe\|null> | Initialize Stripe SDK |
| `createStripeCheckout(items)` | items: Array | Promise<Object> | Create checkout session |
| `processStripePayment(paymentMethod, amount)` | paymentMethod: String, amount: Number | Promise<Object> | Process payment |

#### PayPal Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `loadPayPalSDK()` | - | Promise<PayPal\|null> | Load PayPal SDK dynamically |
| `createPayPalOrder(items, totalAmount)` | items: Array, totalAmount: Number | Promise<Object> | Create PayPal order |
| `capturePayPalPayment(orderId)` | orderId: String | Promise<Object> | Capture payment |

#### General Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `verifyPayment(transactionId, provider)` | transactionId: String, provider: String | Promise<Object> | Verify payment (backend) |

### Stripe Implementation

#### initStripe

```javascript
async initStripe() {
  if (!this.stripePublicKey) {
    console.warn('Stripe public key not configured. Payment features disabled.')
    return null
  }

  if (!this.stripe) {
    this.stripe = await loadStripe(this.stripePublicKey)
  }
  return this.stripe
}
```

**Purpose**: Lazy-load Stripe SDK
**Environment**: Requires `VITE_STRIPE_PUBLIC_KEY` in `.env`
**Singleton**: Stripe instance cached after first load

#### createStripeCheckout

```javascript
async createStripeCheckout(items) {
  try {
    const stripe = await this.initStripe()
    if (!stripe) {
      throw new Error('Stripe not initialized')
    }

    // In production, call backend to create checkout session
    console.log('Creating Stripe checkout for items:', items)

    // Demo mode - simulate successful checkout
    if (!import.meta.env.PROD) {
      return {
        success: true,
        sessionId: 'demo_session_' + Date.now(),
        mode: 'demo'
      }
    }

    // Production flow (commented out - requires backend):
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ items })
    // })
    // const session = await response.json()
    // return stripe.redirectToCheckout({ sessionId: session.id })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    throw error
  }
}
```

**Current State**: Demo mode simulation
**Production Flow**:
1. Send cart items to backend
2. Backend creates Stripe checkout session
3. Frontend redirects to Stripe checkout page
4. User completes payment
5. Stripe redirects back to success/cancel URL

#### processStripePayment

```javascript
async processStripePayment(paymentMethod, amount) {
  try {
    // In production, send to backend
    console.log('Processing Stripe payment:', { paymentMethod, amount })

    // Demo mode
    return {
      success: true,
      transactionId: 'stripe_txn_' + Date.now(),
      amount,
      mode: 'demo'
    }
  } catch (error) {
    console.error('Stripe payment error:', error)
    throw error
  }
}
```

### PayPal Implementation

#### loadPayPalSDK

```javascript
loadPayPalSDK() {
  return new Promise((resolve, reject) => {
    if (!this.paypalClientId) {
      console.warn('PayPal client ID not configured.')
      resolve(null)
      return
    }

    if (window.paypal) {
      // Already loaded
      resolve(window.paypal)
      return
    }

    // Dynamically inject PayPal SDK script
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${this.paypalClientId}&currency=USD`
    script.onload = () => resolve(window.paypal)
    script.onerror = () => reject(new Error('Failed to load PayPal SDK'))
    document.head.appendChild(script)
  })
}
```

**Purpose**: Dynamically load PayPal SDK (not bundled)
**Benefits**: Smaller initial bundle, load on-demand
**Singleton**: Checks if already loaded

#### createPayPalOrder

```javascript
async createPayPalOrder(items, totalAmount) {
  try {
    const paypal = await this.loadPayPalSDK()
    if (!paypal) {
      throw new Error('PayPal not initialized')
    }

    // In production, create order via backend
    console.log('Creating PayPal order:', { items, totalAmount })

    // Demo mode
    return {
      orderId: 'paypal_order_' + Date.now(),
      mode: 'demo'
    }

  } catch (error) {
    console.error('PayPal order creation error:', error)
    throw error
  }
}
```

#### capturePayPalPayment

```javascript
async capturePayPalPayment(orderId) {
  try {
    // In production, capture via backend
    console.log('Capturing PayPal payment:', orderId)

    // Demo mode
    return {
      success: true,
      transactionId: 'paypal_txn_' + Date.now(),
      orderId,
      mode: 'demo'
    }
  } catch (error) {
    console.error('PayPal capture error:', error)
    throw error
  }
}
```

### Payment Verification

#### verifyPayment

```javascript
async verifyPayment(transactionId, provider) {
  try {
    // In production, verify with backend
    console.log('Verifying payment:', { transactionId, provider })

    // Demo mode - always return success
    return {
      verified: true,
      transactionId,
      provider,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    throw error
  }
}
```

**Purpose**: Backend verifies payment with payment provider
**Security**: Never trust client-side payment confirmation

### Usage Examples

#### In Component (Shop)

```javascript
// Shop.vue
import { paymentService } from '@/services/paymentService'

const checkout = async () => {
  try {
    const result = await paymentService.createStripeCheckout(cartStore.items)
    if (result.success) {
      // Payment successful
      userStore.addPurchasedApp(/* apps */)
      cartStore.clearCart()
      router.push('/dashboard')
    }
  } catch (error) {
    alert('Payment failed: ' + error.message)
  }
}
```

#### PayPal Button Integration

```javascript
// Future: PayPal button component
const initPayPalButtons = async () => {
  const paypal = await paymentService.loadPayPalSDK()

  paypal.Buttons({
    createOrder: async () => {
      const order = await paymentService.createPayPalOrder(items, total)
      return order.orderId
    },
    onApprove: async (data) => {
      const result = await paymentService.capturePayPalPayment(data.orderID)
      if (result.success) {
        // Handle success
      }
    }
  }).render('#paypal-button-container')
}
```

---

## Firebase Configuration

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/services/firebase.js`

### Purpose

Centralized Firebase SDK initialization and configuration.

### Configuration

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}
```

### Initialization with Error Handling

```javascript
let app = null
let auth = null
let db = null
let storage = null

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
} catch (error) {
  console.warn('Firebase initialization failed. Running in demo mode.', error)
}

export { app, auth, db, storage }
```

**Error Handling**:
- Catches initialization errors (missing env vars, invalid config)
- Logs warning
- Exports `null` values
- Services check for `null` and use demo mode

### Exported Services

| Export | Type | Purpose |
|--------|------|---------|
| `app` | FirebaseApp | Main Firebase app instance |
| `auth` | Auth | Firebase Authentication |
| `db` | Firestore | Cloud Firestore database |
| `storage` | Storage | Firebase Storage (files) |

### Environment Variables Required

```bash
# .env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project-id
VITE_FIREBASE_STORAGE_BUCKET=project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
```

### Usage in Services

```javascript
// authService.js
import { auth } from './firebase'

async login(email, password) {
  if (!auth) {
    // Demo mode fallback
    return mockUser
  }

  // Use Firebase auth
  return await signInWithEmailAndPassword(auth, email, password)
}
```

---

## Service Integration Patterns

### 1. Store → Service Pattern

```javascript
// Store (auth.js)
import { authService } from '@/services/authService'

const login = async (email, password) => {
  try {
    const userData = await authService.login(email, password)
    user.value = userData
  } catch (err) {
    error.value = err.message
  }
}
```

**Benefits**:
- Store focuses on state management
- Service handles external communication
- Easy to mock services for testing

### 2. Service → External API Pattern

```javascript
// Service (authService.js)
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase'

async login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}
```

### 3. Error Transformation Pattern

```javascript
// Service transforms errors
async login(email, password) {
  try {
    return await firebaseLogin(email, password)
  } catch (error) {
    throw this.handleAuthError(error)  // Transform to user-friendly
  }
}

// Store receives user-friendly error
catch (err) {
  error.value = err.message  // "Incorrect password" instead of "auth/wrong-password"
}
```

---

## Error Handling

### Error Flow

```
External API Error (Firebase, Stripe)
    ↓
Service catches error
    ↓
Service transforms error (handleError method)
    ↓
Service throws transformed error
    ↓
Store catches error
    ↓
Store sets error state
    ↓
Component displays error (reactively)
```

### Error Transformation Examples

#### Firebase Auth Errors

```javascript
// Before transformation
{
  code: 'auth/wrong-password',
  message: 'The password is invalid...'
}

// After transformation
{
  message: 'Incorrect password.'
}
```

#### Network Errors

```javascript
// Before
{
  code: 'auth/network-request-failed',
  message: 'A network error...'
}

// After
{
  message: 'Network error. Please check your connection.'
}
```

### Error Handling Best Practices

```javascript
// ✅ Good: Specific error handling
try {
  await authService.login(email, password)
} catch (err) {
  if (err.message.includes('password')) {
    // Handle password error
  } else {
    // Generic error
  }
}

// ✅ Good: Always set loading state
loading.value = true
try {
  // Operation
} finally {
  loading.value = false  // Always execute
}
```

---

## Demo Mode Strategy

### Purpose

Allow application to function without external service configuration:
- Development without Firebase setup
- Demos without real payment processing
- Testing without external dependencies

### Implementation

#### Check for Service Availability

```javascript
if (!auth) {
  // Firebase not configured
  return demoFallback()
}

// Firebase configured
return realImplementation()
```

#### Mock Data Generation

```javascript
// Demo user
const demoUser = {
  uid: 'demo-user-' + Date.now(),  // Unique ID
  email,
  displayName: email.split('@')[0],
  emailVerified: true
}
localStorage.setItem('demo_user', JSON.stringify(demoUser))
```

#### Console Logging

```javascript
// Demo mode - just log
console.log('Demo mode: Password reset email would be sent to', email)
```

### Demo Mode Detection

```javascript
// In service
if (!import.meta.env.PROD) {
  return demoResult  // Development mode
}

// Or check if service initialized
if (!this.stripe) {
  return demoResult  // Stripe not configured
}
```

---

## Future Enhancements

### Backend API Service

```javascript
// services/api.js
import axios from 'axios'

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  async get(endpoint) {
    const response = await this.client.get(endpoint)
    return response.data
  }

  async post(endpoint, data) {
    const response = await this.client.post(endpoint, data)
    return response.data
  }
}

export const apiService = new ApiService()
```

### Product Service

```javascript
// services/productService.js
class ProductService {
  async getProducts() {
    return await apiService.get('/products')
  }

  async getProductById(id) {
    return await apiService.get(`/products/${id}`)
  }

  async searchProducts(query) {
    return await apiService.get(`/products/search?q=${query}`)
  }
}

export const productService = new ProductService()
```

### Analytics Service

```javascript
// services/analyticsService.js
class AnalyticsService {
  trackEvent(eventName, properties) {
    // Google Analytics, Mixpanel, etc.
  }

  trackPageView(pageName) {
    // Track page views
  }
}

export const analyticsService = new AnalyticsService()
```

---

*Last updated: 2025-01-21*
