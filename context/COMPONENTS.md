# GeekDigital - Components Documentation

## Table of Contents
1. [Overview](#overview)
2. [Component Hierarchy](#component-hierarchy)
3. [Layout Components](#layout-components)
4. [Page Components](#page-components)
5. [Common Components](#common-components)
6. [Component Patterns](#component-patterns)
7. [Styling System](#styling-system)
8. [Component Communication](#component-communication)
9. [Best Practices](#best-practices)

---

## Overview

GeekDigital follows a structured component architecture using Vue 3's Composition API with `<script setup>` syntax for all components.

### Component Organization

```
src/
├── App.vue                    # Root component
├── layouts/                   # Layout wrapper components
│   ├── DefaultLayout.vue     # Main layout (Navbar + Footer)
│   └── AuthLayout.vue        # Clean auth layout
├── pages/                     # Route-level page components
│   ├── Home.vue              # Landing page
│   ├── Catalog.vue           # App catalog
│   ├── Portfolio.vue         # Portfolio showcase
│   ├── Shop.vue              # Product shop
│   ├── Dashboard.vue         # User dashboard
│   ├── Login.vue             # Authentication
│   └── NotFound.vue          # 404 page
└── components/                # Reusable components
    ├── layout/               # Layout-specific components
    │   ├── Navbar.vue       # Navigation bar
    │   └── Footer.vue       # Site footer
    └── common/               # Shared UI components (future)
```

### Component Types

1. **Root Component**: `App.vue` - Application entry point
2. **Layout Components**: Structural wrappers with navigation
3. **Page Components**: Route-level views
4. **Common Components**: Reusable UI elements

---

## Component Hierarchy

### Visual Structure

```
App.vue (Root)
│
├── DefaultLayout.vue
│   │
│   ├── Navbar.vue
│   │   ├── Uses: useAuthStore()
│   │   ├── Uses: useCartStore()
│   │   └── Features: User menu, cart badge, mobile menu
│   │
│   ├── <router-view>
│   │   │
│   │   ├── Home.vue
│   │   │   ├── Uses: useAuthStore()
│   │   │   └── Sections: Hero, Features, CTA
│   │   │
│   │   ├── Catalog.vue
│   │   │   ├── Features: Category filtering
│   │   │   └── Data: Local state (apps array)
│   │   │
│   │   ├── Portfolio.vue
│   │   │   └── Data: Local state (projects array)
│   │   │
│   │   ├── Shop.vue
│   │   │   ├── Uses: useCartStore()
│   │   │   ├── Uses: useAuthStore()
│   │   │   └── Sections: Product grid, cart sidebar
│   │   │
│   │   └── Dashboard.vue
│   │       ├── Uses: useAuthStore()
│   │       ├── Uses: useUserStore()
│   │       └── Features: Stats, tabs, app management
│   │
│   └── Footer.vue
│       └── Sections: Links, social, copyright
│
└── AuthLayout.vue
    │
    └── <router-view>
        │
        └── Login.vue
            ├── Uses: useAuthStore()
            └── Features: Login/register tabs, forms
```

---

## Layout Components

### DefaultLayout.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/layouts/DefaultLayout.vue`

**Purpose**: Main application layout with navigation and footer

**Structure**:
```vue
<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>
```

**Features**:
- Flexbox layout for sticky footer
- `flex-grow` ensures main content fills viewport
- Wraps all public and protected pages

**Routes Using This Layout**:
- `/` (Home)
- `/catalog` (Catalog)
- `/portfolio` (Portfolio)
- `/shop` (Shop)
- `/dashboard` (Dashboard)

---

### AuthLayout.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/layouts/AuthLayout.vue`

**Purpose**: Clean layout for authentication pages

**Structure**:
```vue
<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
    <router-view />
  </div>
</template>

<script setup>
// Clean layout for authentication pages (login, register)
</script>
```

**Features**:
- Full-height gradient background
- Centered content
- No navigation or footer
- Responsive padding

**Routes Using This Layout**:
- `/auth/login` (Login)

---

## Page Components

### Home.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/pages/Home.vue`

**Purpose**: Landing page with hero section and features

**Structure**:
```vue
<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
      <!-- Hero content -->
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <!-- Feature cards -->
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-50">
      <!-- Call to action -->
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/modules/auth'
const authStore = useAuthStore()
</script>
```

**Features**:
- Hero with gradient background
- 3 feature cards (Portfolio, Apps, Store)
- Conditional CTA based on auth state

**Store Usage**:
- `authStore.isAuthenticated` - Show "Sign Up" or "Dashboard" CTA

**Key Sections**:
1. **Hero**: Main headline, description, CTA buttons
2. **Features**: 3-column grid with icons and descriptions
3. **CTA**: Sign up prompt or dashboard link

---

### Catalog.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/pages/Catalog.vue`

**Purpose**: Browse applications with category filtering

**Structure**:
```vue
<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1>Application Catalog</h1>

      <!-- Filter tabs -->
      <div class="flex gap-4 mb-8 flex-wrap">
        <button
          v-for="category in categories"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>

      <!-- Apps grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="app in filteredApps" :key="app.id">
          <!-- App card -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('All')
const categories = ['All', 'Desktop Apps', 'Web Apps', 'Tools', 'Utilities']

const apps = ref([/* 6 hardcoded apps */])

const filteredApps = computed(() => {
  if (selectedCategory.value === 'All') return apps.value
  return apps.value.filter(app => app.category === selectedCategory.value)
})
</script>
```

**Features**:
- Category filtering (All, Desktop Apps, Web Apps, Tools, Utilities)
- Responsive grid layout (1/2/3 columns)
- App cards with name, description, category badge, price

**State Management**:
- Local state only (no store)
- `selectedCategory` - Current filter
- `filteredApps` - Computed filtered list

**Future Enhancements**:
- Fetch apps from API
- Search functionality
- App detail modal/page
- Add to cart from catalog

---

### Portfolio.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/pages/Portfolio.vue`

**Purpose**: Showcase data engineering projects

**Structure**:
```vue
<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1>Data Engineering Portfolio</h1>

      <!-- Projects grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="project in projects" :key="project.id" class="card">
          <h3>{{ project.title }}</h3>
          <span>{{ project.technology }}</span>
          <p>{{ project.description }}</p>

          <!-- Features list -->
          <ul>
            <li v-for="feature in project.features">{{ feature }}</li>
          </ul>

          <!-- Tags -->
          <div class="flex gap-2 flex-wrap">
            <span v-for="tag in project.tags">{{ tag }}</span>
          </div>

          <!-- Links -->
          <a href="#">View Details →</a>
          <a :href="project.github">GitHub →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'Real-time Streaming ETL Pipeline',
    technology: 'Apache Kafka',
    description: '...',
    features: ['Processes 5M+ events daily', '...'],
    tags: ['Kafka', 'Spark', 'Python', 'PostgreSQL', 'Docker'],
    github: '#'
  },
  // ... 3 more projects
])
</script>
```

**Features**:
- 2-column grid layout
- Project cards with technology badge
- Feature lists with bullet points
- Technology tags
- External links (details, GitHub)

**Data**:
- 4 hardcoded data engineering projects
- Real-world examples (Kafka, Snowflake, AWS, Great Expectations)

---

### Shop.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/pages/Shop.vue`

**Purpose**: Digital product store with shopping cart

**Structure**:
```vue
<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1>Digital Product Shop</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Products (2/3 width) -->
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="product in products" :key="product.id">
              <!-- Product card -->
              <button @click="addToCart(product)">Add to Cart</button>
            </div>
          </div>
        </div>

        <!-- Cart (1/3 width, sticky) -->
        <div class="lg:col-span-1">
          <div class="card sticky top-4">
            <h2>Shopping Cart</h2>

            <div v-if="cartStore.hasItems">
              <!-- Cart items -->
              <div v-for="item in cartStore.items">
                <p>{{ item.name }} - ${{ item.price }}</p>
                <button @click="cartStore.removeItem(item.id)">Remove</button>
              </div>

              <p>Total: {{ cartStore.formattedTotal }}</p>
              <button @click="checkout">Proceed to Checkout</button>
            </div>

            <div v-else>
              <p>Your cart is empty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/modules/cart'
import { useAuthStore } from '@/store/modules/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const products = ref([/* 4 hardcoded products */])

const addToCart = (product) => {
  cartStore.addItem(product, 1)
}

const checkout = () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login', query: { redirect: '/shop' } })
    return
  }
  alert('Checkout functionality will redirect to payment processing')
}
</script>
```

**Features**:
- Product grid (2 columns on medium screens)
- Sticky cart sidebar
- Real-time cart updates
- Add/remove products
- Checkout with auth check

**Store Integration**:
- `cartStore.items` - Cart contents
- `cartStore.hasItems` - Cart not empty
- `cartStore.formattedTotal` - Total price
- `cartStore.addItem()` - Add product
- `cartStore.removeItem()` - Remove product
- `authStore.isAuthenticated` - Checkout guard

---

### Dashboard.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/pages/Dashboard.vue`

**Purpose**: User dashboard for managing apps and licenses

**Structure**:
```vue
<template>
  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="container-custom">
      <h1>Welcome, {{ authStore.userName }}</h1>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card">Purchased Apps: {{ userStore.purchasedApps.length }}</div>
        <div class="card">Active Licenses: {{ userStore.activeLicenses.length }}</div>
        <div class="card">Account Status: Active</div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-4 mb-6 border-b">
        <button
          v-for="tab in tabs"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- My Apps Tab -->
      <div v-if="activeTab === 'apps'">
        <div v-if="userStore.purchasedApps.length === 0">
          <p>No apps yet</p>
          <router-link to="/catalog">Browse Catalog</router-link>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="app in userStore.purchasedApps">
            <!-- App card -->
          </div>
        </div>
      </div>

      <!-- Licenses Tab -->
      <div v-if="activeTab === 'licenses'">
        <table>
          <!-- License table -->
        </table>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'">
        <form @submit.prevent="updateProfile">
          <!-- Profile form -->
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'

const authStore = useAuthStore()
const userStore = useUserStore()

const activeTab = ref('apps')
const tabs = [
  { id: 'apps', label: 'My Apps' },
  { id: 'licenses', label: 'Licenses' },
  { id: 'profile', label: 'Profile' }
]

onMounted(async () => {
  await userStore.loadUserData()
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const updateProfile = () => {
  userStore.updateProfile({ displayName: profileForm.displayName })
  alert('Profile updated successfully!')
}
</script>
```

**Features**:
- Welcome message with user name
- Stats cards (purchased apps, licenses, status)
- Tabbed interface (Apps, Licenses, Profile)
- Empty states with CTAs
- Profile editing

**Store Integration**:
- `authStore.userName` - Display name
- `userStore.purchasedApps` - User's apps
- `userStore.activeLicenses` - Active licenses
- `userStore.loadUserData()` - Load on mount
- `userStore.updateProfile()` - Save profile

**Tabs**:
1. **My Apps**: Grid of purchased applications
2. **Licenses**: Table of license keys
3. **Profile**: Edit display name

---

### Login.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/pages/Login.vue`

**Purpose**: User authentication (login and registration)

**Structure**:
```vue
<template>
  <div class="w-full max-w-md">
    <div class="card">
      <h1>Welcome Back</h1>

      <!-- Error message -->
      <div v-if="authStore.error">{{ authStore.error }}</div>

      <!-- Tabs -->
      <div class="flex gap-4 mb-6">
        <button @click="activeTab = 'login'">Login</button>
        <button @click="activeTab = 'register'">Sign Up</button>
      </div>

      <!-- Login Form -->
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin">
        <input v-model="loginForm.email" type="email" />
        <input v-model="loginForm.password" type="password" />
        <button type="submit" :disabled="authStore.loading">
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <!-- Register Form -->
      <form v-else @submit.prevent="handleRegister">
        <input v-model="registerForm.displayName" type="text" />
        <input v-model="registerForm.email" type="email" />
        <input v-model="registerForm.password" type="password" />
        <input v-model="registerForm.confirmPassword" type="password" />
        <button type="submit" :disabled="authStore.loading">
          {{ authStore.loading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <!-- Demo mode notice -->
      <div class="mt-6 p-3 bg-blue-50">
        <p>Demo Mode: You can use any email/password to test.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const activeTab = ref('login')

const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleLogin = async () => {
  authStore.clearError()
  const result = await authStore.login(loginForm.email, loginForm.password)

  if (result.success) {
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  }
}

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
</script>
```

**Features**:
- Tabbed interface (Login/Sign Up)
- Reactive error display
- Loading states
- Password confirmation validation
- Redirect after login
- Demo mode notice

**Store Integration**:
- `authStore.login()` - Login action
- `authStore.register()` - Register action
- `authStore.error` - Error message
- `authStore.loading` - Loading state
- `authStore.clearError()` - Clear errors

**Validation**:
- Password confirmation match
- Required fields (HTML5)
- Minimum password length (6 chars)

---

## Common Components

### Navbar.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/components/layout/Navbar.vue`

**Purpose**: Main navigation bar with auth integration

**Structure**:
```vue
<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/">
          <div class="w-8 h-8 bg-primary-600 rounded-lg">G</div>
          <span>GeekDigital</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link to="/" active-class="text-primary-600">Home</router-link>
          <router-link to="/catalog">Catalog</router-link>
          <router-link to="/portfolio">Portfolio</router-link>
          <router-link to="/shop">Shop</router-link>
        </div>

        <!-- Right side -->
        <div class="flex items-center space-x-4">
          <!-- Cart -->
          <button @click="$router.push('/shop')">
            Cart
            <span v-if="cartStore.itemCount > 0">
              {{ cartStore.itemCount }}
            </span>
          </button>

          <!-- User menu -->
          <div v-if="authStore.isAuthenticated">
            <button @click="toggleUserMenu">
              <div class="w-8 h-8 bg-primary-100 rounded-full">
                {{ authStore.userName[0].toUpperCase() }}
              </div>
            </button>

            <!-- Dropdown -->
            <div v-if="showUserMenu">
              <router-link to="/dashboard">Dashboard</router-link>
              <button @click="handleLogout">Logout</button>
            </div>
          </div>

          <!-- Login button -->
          <router-link v-else to="/auth/login">Login</router-link>

          <!-- Mobile menu button -->
          <button @click="toggleMobileMenu" class="md:hidden">Menu</button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="showMobileMenu" class="md:hidden">
        <router-link to="/">Home</router-link>
        <router-link to="/catalog">Catalog</router-link>
        <router-link to="/portfolio">Portfolio</router-link>
        <router-link to="/shop">Shop</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useCartStore } from '@/store/modules/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
  router.push('/')
}
</script>
```

**Features**:
- Responsive design (desktop/mobile)
- Logo with router-link
- Navigation links with active states
- Cart badge (item count)
- User avatar (first letter of name)
- Dropdown user menu
- Mobile hamburger menu
- Logout functionality

**Store Integration**:
- `authStore.isAuthenticated` - Show user menu or login
- `authStore.userName` - Display user name
- `authStore.logout()` - Logout action
- `cartStore.itemCount` - Cart badge count

**Responsive Behavior**:
- Desktop: Horizontal nav, all links visible
- Mobile: Hamburger menu, collapsible nav

---

### Footer.vue

**File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/components/layout/Footer.vue`

**Purpose**: Site-wide footer with links and social icons

**Structure**:
```vue
<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-primary-600 rounded-lg">G</div>
            <span>GeekDigital</span>
          </div>
          <p>Professional data engineering portfolio and digital products platform.</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/catalog">App Catalog</router-link></li>
            <li><router-link to="/portfolio">Portfolio</router-link></li>
            <li><router-link to="/shop">Shop</router-link></li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">API Reference</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-gray-800 mt-8 pt-8 flex justify-between">
        <p>&copy; {{ currentYear }} GeekDigital. All rights reserved.</p>

        <!-- Social icons -->
        <div class="flex space-x-6">
          <a href="#">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
```

**Features**:
- 4-column layout (responsive)
- Brand section with logo
- Link sections (Quick Links, Resources, Legal)
- Social media icons
- Dynamic copyright year
- Dark theme

**Sections**:
1. **Brand**: Logo + description
2. **Quick Links**: Main navigation
3. **Resources**: Documentation, support
4. **Legal**: Policies
5. **Bottom Bar**: Copyright + social

---

## Component Patterns

### Composition API Pattern

All components use Vue 3's Composition API with `<script setup>`:

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

// Props
const props = defineProps({
  title: String
})

// Emits
const emit = defineEmits(['update'])

// Reactive state
const count = ref(0)
const doubled = computed(() => count.value * 2)

// Store access
const router = useRouter()
const authStore = useAuthStore()

// Lifecycle
onMounted(() => {
  console.log('Component mounted')
})

// Methods
const increment = () => {
  count.value++
  emit('update', count.value)
}
</script>
```

### Store Integration Pattern

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

### Router Integration Pattern

```vue
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Access current route
console.log(route.path)
console.log(route.query.redirect)

// Programmatic navigation
const navigate = () => {
  router.push('/dashboard')
  router.push({ name: 'Dashboard' })
  router.push({ path: '/shop', query: { category: 'tools' } })
}
</script>
```

---

## Styling System

### Tailwind CSS Utility Classes

All components use Tailwind CSS:

```vue
<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h1 class="text-3xl font-bold text-gray-900">Title</h1>
    <p class="text-gray-600 mt-2">Description</p>
  </div>
</template>
```

### Custom Component Classes

**File**: `src/assets/main.css`

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
  }

  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300;
  }

  .card {
    @apply bg-white rounded-xl shadow-sm border border-gray-200 p-6;
  }

  .input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none;
  }

  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

**Usage**:
```vue
<button class="btn btn-primary">Click Me</button>
<div class="card">Card content</div>
<input class="input" type="text" />
<div class="container-custom">Centered container</div>
```

### Scoped Styles

```vue
<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-primary-600 font-medium transition-colors;
}

.mobile-nav-link {
  @apply block py-2 text-gray-600 hover:text-primary-600 font-medium;
}
</style>
```

---

## Component Communication

### Parent to Child (Props)

```vue
<!-- Parent -->
<ChildComponent :title="pageTitle" :count="10" />

<!-- Child -->
<script setup>
const props = defineProps({
  title: String,
  count: Number
})
</script>
```

### Child to Parent (Emits)

```vue
<!-- Child -->
<script setup>
const emit = defineEmits(['update', 'delete'])

const handleClick = () => {
  emit('update', newValue)
}
</script>

<!-- Parent -->
<ChildComponent
  @update="handleUpdate"
  @delete="handleDelete"
/>
```

### Cross-Component (Stores)

```vue
<!-- Any component -->
<script setup>
import { useAuthStore } from '@/store/modules/auth'
const authStore = useAuthStore()

// Access shared state
console.log(authStore.user)
</script>
```

---

## Best Practices

### 1. Component Organization

```vue
<script setup>
// ===== IMPORTS =====
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

// ===== ROUTER & STORES =====
const router = useRouter()
const authStore = useAuthStore()

// ===== STATE =====
const count = ref(0)
const items = ref([])

// ===== COMPUTED =====
const doubled = computed(() => count.value * 2)

// ===== METHODS =====
const increment = () => count.value++

// ===== LIFECYCLE =====
onMounted(() => {
  // Initialization
})
</script>
```

### 2. Reactive State

```javascript
// ✅ Good: Use ref for primitives
const count = ref(0)
const name = ref('')

// ✅ Good: Use reactive for objects
const form = reactive({
  email: '',
  password: ''
})

// ❌ Bad: Don't lose reactivity
let user = authStore.user  // Loses reactivity!

// ✅ Good: Use computed for derived state
const userName = computed(() => authStore.user?.name)
```

### 3. Component Naming

```javascript
// ✅ Good: PascalCase for components
import Navbar from '@/components/layout/Navbar.vue'
import UserProfile from '@/components/UserProfile.vue'

// ✅ Good: camelCase for composables
import { useAuthStore } from '@/store/modules/auth'
```

### 4. Conditional Rendering

```vue
<!-- ✅ Good: Use v-if for expensive components -->
<Dashboard v-if="authStore.isAuthenticated" />

<!-- ✅ Good: Use v-show for frequent toggles -->
<UserMenu v-show="showMenu" />

<!-- ✅ Good: Use v-else for mutually exclusive -->
<LoginButton v-if="!authStore.isAuthenticated" />
<UserMenu v-else />
```

### 5. Event Handling

```vue
<!-- ✅ Good: Inline for simple expressions -->
<button @click="count++">Increment</button>

<!-- ✅ Good: Method for complex logic -->
<button @click="handleLogin">Login</button>

<!-- ✅ Good: Prevent default -->
<form @submit.prevent="handleSubmit">
```

---

*Last updated: 2025-01-21*
