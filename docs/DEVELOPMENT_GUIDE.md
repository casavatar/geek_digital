# GeekDigital - Development Guide

Last Updated: 2025-01-21

## Table of Contents

1. [Overview](#overview)
2. [Development Environment](#development-environment)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Code Organization](#code-organization)
6. [Adding New Features](#adding-new-features)
7. [State Management Patterns](#state-management-patterns)
8. [Styling Guidelines](#styling-guidelines)
9. [Testing Strategy](#testing-strategy)
10. [Common Development Tasks](#common-development-tasks)
11. [Best Practices](#best-practices)
12. [Debugging](#debugging)

---

## Overview

This guide helps developers understand the codebase, development workflow, and best practices for contributing to GeekDigital.

### Development Philosophy

- **Component-Based**: Build reusable, composable components
- **Composition API**: Use Vue 3's modern Composition API
- **Type Safety Ready**: Code structured for future TypeScript migration
- **Performance First**: Lazy loading, code splitting, optimized builds
- **Developer Experience**: Fast HMR, clear code organization, comprehensive docs

---

## Development Environment

### Prerequisites

Ensure you've completed the [SETUP_GUIDE.md](./SETUP_GUIDE.md) before proceeding.

### Required Tools

- **Node.js**: v16+ (v18 recommended)
- **npm**: v8+ (comes with Node.js)
- **Code Editor**: VS Code recommended
- **Browser**: Chrome/Firefox with Vue DevTools

### Recommended VS Code Extensions

```bash
# Install all at once
code --install-extension Vue.volar
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
code --install-extension christian-kohler.path-intellisense
code --install-extension eamodio.gitlens
```

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "vue"],
  "vetur.experimental.templateInterpolationService": false,
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  "tailwindCSS.experimental.classRegex": [
    ["class:\\s*?[\"'`]([^\"'`]*).*?[\"'`]", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Project Structure

### Directory Layout

```text
geek_digital/
├── public/                      # Static assets (served as-is)
│   └── favicon.ico
├── src/
│   ├── assets/                  # Processed assets (CSS, images)
│   │   └── main.css            # Tailwind + custom styles
│   ├── components/              # Vue components
│   │   ├── common/             # Reusable UI components (future)
│   │   └── layout/             # Layout components
│   │       ├── Navbar.vue
│   │       └── Footer.vue
│   ├── layouts/                 # Page layout wrappers
│   │   ├── DefaultLayout.vue   # Standard layout (navbar/footer)
│   │   └── AuthLayout.vue      # Clean layout (auth pages)
│   ├── pages/                   # Route page components
│   │   ├── Home.vue
│   │   ├── Catalog.vue
│   │   ├── Portfolio.vue
│   │   ├── Shop.vue
│   │   ├── Login.vue
│   │   ├── Dashboard.vue
│   │   └── NotFound.vue
│   ├── router/                  # Vue Router configuration
│   │   └── index.js            # Routes, guards, scroll behavior
│   ├── store/                   # Pinia state management
│   │   └── modules/            # Store modules
│   │       ├── auth.js         # Authentication state
│   │       ├── cart.js         # Shopping cart state
│   │       └── user.js         # User data state
│   ├── services/                # External service integrations
│   │   ├── authService.js      # Firebase auth wrapper
│   │   ├── paymentService.js   # Stripe/PayPal handlers
│   │   └── firebase.js         # Firebase initialization
│   ├── utils/                   # Utility functions (future)
│   ├── context/                 # Project context documentation
│   ├── docs/                    # Technical documentation
│   ├── App.vue                  # Root component
│   └── main.js                  # Application entry point
├── .env                         # Environment variables (gitignored)
├── .env.example                # Environment template (committed)
├── .gitignore                  # Git ignore rules
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS plugins
└── README.md                   # Project README
```

### Key Directories Explained

#### `/src/pages/`

- **Purpose**: Route-level components
- **Naming**: PascalCase (e.g., `Home.vue`, `Dashboard.vue`)
- **Content**: Page structure, data fetching, store integration
- **Example**: `Home.vue`, `Catalog.vue`

#### `/src/components/`

- **Purpose**: Reusable UI components
- **Structure**: Organized by category (`layout/`, `common/`)
- **Naming**: PascalCase (e.g., `Navbar.vue`, `ProductCard.vue`)
- **Example**: `Navbar.vue`, `Footer.vue`

#### `/src/layouts/`

- **Purpose**: Page wrapper components
- **Usage**: Wrap multiple pages with common structure
- **Example**: `DefaultLayout.vue` (with navbar/footer)

#### `/src/store/modules/`

- **Purpose**: Pinia store modules
- **Naming**: kebab-case (e.g., `auth.js`, `cart.js`)
- **Pattern**: One domain per file
- **Example**: `auth.js` (authentication), `cart.js` (shopping)

#### `/src/services/`

- **Purpose**: External API integration
- **Naming**: camelCase + Service suffix (e.g., `authService.js`)
- **Pattern**: Singleton class instances
- **Example**: `authService.js`, `paymentService.js`

---

## Development Workflow

### Daily Development Cycle

#### 1. Start Development Server

```bash
npm run dev
```

**What Happens**:

- Vite starts development server
- Hot Module Replacement (HMR) enabled
- Server runs on `http://localhost:5173`
- Terminal shows build info and errors

**Expected Output**:

```text
  VITE v5.1.6  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### 2. Make Changes

- Edit files in `src/`
- Changes reflect instantly (HMR)
- Check browser for visual updates
- Monitor terminal for errors

#### 3. Test Changes

- Test in browser
- Check console for errors
- Verify responsive design
- Test different routes

#### 4. Build for Production

```bash
npm run build
```

**What Happens**:

- Vite builds optimized production bundle
- Output to `dist/` directory
- Assets minified and hashed
- Build size report shown

#### 5. Preview Production Build

```bash
npm run preview
```

**Purpose**: Test production build locally before deployment

---

### Git Workflow

#### Branch Strategy

```bash
# Feature development
git checkout -b feature/add-user-profile
# Work on feature
git commit -m "Add user profile page"
git push origin feature/add-user-profile

# Bug fixes
git checkout -b fix/cart-quantity-bug
# Fix bug
git commit -m "Fix cart quantity update bug"
git push origin fix/cart-quantity-bug

# Hotfixes
git checkout -b hotfix/critical-auth-issue
# Fix critical issue
git commit -m "Fix critical authentication issue"
git push origin hotfix/critical-auth-issue
```

#### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format
<type>(<scope>): <subject>

# Types
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting)
refactor: Code refactoring
test: Add/update tests
chore: Build process, dependencies

# Examples
feat(shop): add product filtering
fix(cart): correct total price calculation
docs(api): update API reference for auth store
style(navbar): improve responsive layout
refactor(auth): simplify login logic
test(cart): add unit tests for cart store
chore(deps): update Vue to 3.4.21
```

---

## Code Organization

### File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Vue Components | PascalCase | `UserProfile.vue`, `ProductCard.vue` |
| JavaScript Files | camelCase | `authService.js`, `utils.js` |
| Store Modules | kebab-case | `auth.js`, `user-profile.js` |
| CSS Files | kebab-case | `main.css`, `custom-components.css` |
| Test Files | `.spec.js` or `.test.js` | `auth.spec.js`, `cart.test.js` |

### Component Structure

Every Vue component follows this structure:

```vue
<script setup>
// 1. IMPORTS
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

// 2. STORES
const authStore = useAuthStore()
const router = useRouter()

// 3. COMPONENT STATE
const count = ref(0)
const isLoading = ref(false)

// 4. COMPUTED PROPERTIES
const doubleCount = computed(() => count.value * 2)

// 5. METHODS
const increment = () => {
  count.value++
}

const fetchData = async () => {
  isLoading.value = true
  try {
    // Fetch logic
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

// 6. LIFECYCLE HOOKS
onMounted(() => {
  fetchData()
})

// 7. WATCHERS (if needed)
// watch(count, (newValue) => {
//   console.log('Count changed:', newValue)
// })
</script>

<template>
  <!-- 8. TEMPLATE -->
  <div class="container">
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
/* 9. COMPONENT-SPECIFIC STYLES (if needed) */
.container {
  /* Avoid scoped styles when possible, use Tailwind */
}
</style>
```

### Import Aliases

Use the `@` alias for absolute imports:

```javascript
// Good: Using alias
import { useAuthStore } from '@/store/modules/auth'
import Navbar from '@/components/layout/Navbar.vue'

// Bad: Relative imports
import { useAuthStore } from '../../store/modules/auth'
import Navbar from '../layout/Navbar.vue'
```

**Alias Configuration**: Defined in `vite.config.js`:

```javascript
resolve: {
  alias: {
    '@': '/src'
  }
}
```

---

## Adding New Features

### Adding a New Page

#### Step 1: Create Page Component

```bash
# Create file
touch src/pages/Blog.vue
```

```vue
<!-- src/pages/Blog.vue -->
<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(false)

const fetchPosts = async () => {
  loading.value = true
  try {
    // Fetch blog posts
    posts.value = [
      { id: 1, title: 'First Post', content: 'Hello World' }
    ]
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Blog</h1>

    <div v-if="loading">Loading...</div>

    <div v-else>
      <article v-for="post in posts" :key="post.id" class="mb-8">
        <h2 class="text-2xl font-bold">{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </article>
    </div>
  </div>
</template>
```

#### Step 2: Add Route

```javascript
// src/router/index.js
import Blog from '@/pages/Blog.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      // ... existing routes
      {
        path: 'blog',
        name: 'Blog',
        component: Blog,
        meta: {
          title: 'Blog - GeekDigital'
        }
      }
    ]
  }
]
```

#### Step 3: Add Navigation Link

```vue
<!-- src/components/layout/Navbar.vue -->
<router-link to="/blog" class="nav-link">
  Blog
</router-link>
```

#### Step 4: Test

```bash
npm run dev
# Navigate to http://localhost:5173/blog
```

---

### Adding a New Store Module

#### Step 1: Create Store File

```javascript
// src/store/modules/blog.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBlogStore = defineStore('blog', () => {
  // ===== STATE =====
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ===== GETTERS =====
  const publishedPosts = computed(() =>
    posts.value.filter(post => post.published)
  )

  const postCount = computed(() => posts.value.length)

  // ===== ACTIONS =====
  const fetchPosts = async () => {
    loading.value = true
    error.value = null
    try {
      // Fetch from API
      const response = await fetch('/api/posts')
      posts.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addPost = (post) => {
    posts.value.push({
      id: Date.now(),
      ...post,
      createdAt: new Date().toISOString()
    })
  }

  const deletePost = (postId) => {
    const index = posts.value.findIndex(p => p.id === postId)
    if (index > -1) {
      posts.value.splice(index, 1)
    }
  }

  // ===== RETURN =====
  return {
    // State
    posts,
    loading,
    error,
    // Getters
    publishedPosts,
    postCount,
    // Actions
    fetchPosts,
    addPost,
    deletePost
  }
})
```

#### Step 2: Use Store in Component

```vue
<script setup>
import { onMounted } from 'vue'
import { useBlogStore } from '@/store/modules/blog'

const blogStore = useBlogStore()

onMounted(() => {
  blogStore.fetchPosts()
})

const handleAddPost = () => {
  blogStore.addPost({
    title: 'New Post',
    content: 'Content here',
    published: true
  })
}
</script>

<template>
  <div>
    <h1>Blog Posts ({{ blogStore.postCount }})</h1>

    <div v-if="blogStore.loading">Loading...</div>
    <div v-else-if="blogStore.error">Error: {{ blogStore.error }}</div>

    <div v-else>
      <article v-for="post in blogStore.publishedPosts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <button @click="blogStore.deletePost(post.id)">Delete</button>
      </article>
    </div>

    <button @click="handleAddPost">Add Post</button>
  </div>
</template>
```

---

### Adding a New Service

#### Step 1: Create Service File

```javascript
// src/services/blogService.js
import axios from 'axios'

class BlogService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL
  }

  async getPosts() {
    try {
      const response = await axios.get(`${this.baseURL}/posts`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async getPostById(id) {
    try {
      const response = await axios.get(`${this.baseURL}/posts/${id}`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async createPost(post) {
    try {
      const response = await axios.post(`${this.baseURL}/posts`, post)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async updatePost(id, post) {
    try {
      const response = await axios.put(`${this.baseURL}/posts/${id}`, post)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async deletePost(id) {
    try {
      await axios.delete(`${this.baseURL}/posts/${id}`)
    } catch (error) {
      throw this.handleError(error)
    }
  }

  handleError(error) {
    const message = error.response?.data?.message || error.message || 'An error occurred'
    return new Error(message)
  }
}

export const blogService = new BlogService()
```

#### Step 2: Use Service in Store

```javascript
// src/store/modules/blog.js
import { blogService } from '@/services/blogService'

const fetchPosts = async () => {
  loading.value = true
  error.value = null
  try {
    posts.value = await blogService.getPosts()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
```

---

### Adding a Reusable Component

#### Step 1: Create Component

```vue
<!-- src/components/common/LoadingSpinner.vue -->
<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  color: {
    type: String,
    default: 'primary'
  }
})

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-8 h-8',
  large: 'w-12 h-12'
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      :class="[sizeClasses[size], `border-${color}`]"
      class="border-4 border-t-transparent rounded-full animate-spin"
    ></div>
  </div>
</template>
```

#### Step 2: Use Component

```vue
<script setup>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
</script>

<template>
  <div>
    <LoadingSpinner v-if="loading" size="large" />
    <div v-else>Content here</div>
  </div>
</template>
```

---

## State Management Patterns

### When to Use Stores

**Use Pinia Store When**:

- Data is shared across multiple components
- Data needs to persist (with localStorage)
- Complex state logic
- Authentication state
- Shopping cart
- User preferences

**Use Component State When**:

- Data is local to one component
- Temporary UI state (modals, dropdowns)
- Form input values (before submission)

### Store Communication Patterns

#### Pattern 1: Store Using Another Store

```javascript
// src/store/modules/orders.js
import { useAuthStore } from './auth'
import { useUserStore } from './user'

export const useOrdersStore = defineStore('orders', () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  const fetchOrders = async () => {
    if (!authStore.isAuthenticated) {
      throw new Error('Must be authenticated')
    }

    const userId = authStore.user.uid
    // Fetch orders for user
  }

  return { fetchOrders }
})
```

#### Pattern 2: Component Using Multiple Stores

```vue
<script setup>
import { useAuthStore } from '@/store/modules/auth'
import { useCartStore } from '@/store/modules/cart'
import { useUserStore } from '@/store/modules/user'

const authStore = useAuthStore()
const cartStore = useCartStore()
const userStore = useUserStore()

const checkout = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/auth/login')
    return
  }

  // Process payment
  // Add to user purchases
  userStore.addPurchasedApp(/* ... */)

  // Clear cart
  cartStore.clearCart()
}
</script>
```

### State Persistence

#### localStorage Pattern

```javascript
// Store with persistence
export const useSettingsStore = defineStore('settings', () => {
  const theme = ref('light')
  const language = ref('en')

  // Save to localStorage
  const saveSettings = () => {
    localStorage.setItem('app_settings', JSON.stringify({
      theme: theme.value,
      language: language.value
    }))
  }

  // Load from localStorage
  const loadSettings = () => {
    const saved = localStorage.getItem('app_settings')
    if (saved) {
      const settings = JSON.parse(saved)
      theme.value = settings.theme
      language.value = settings.language
    }
  }

  // Auto-load on store creation
  loadSettings()

  // Watch for changes and auto-save
  watch([theme, language], () => {
    saveSettings()
  })

  return { theme, language, saveSettings, loadSettings }
})
```

---

## Styling Guidelines

### Tailwind CSS Usage

#### Utility-First Approach

```vue
<!-- Good: Use Tailwind utilities -->
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-gray-800">Title</h2>
  <button class="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
    Click Me
  </button>
</div>

<!-- Avoid: Custom CSS when Tailwind suffices -->
<div class="custom-card">
  <h2 class="custom-title">Title</h2>
  <button class="custom-button">Click Me</button>
</div>
```

#### Responsive Design

```vue
<!-- Mobile-first responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Cards -->
</div>

<!-- Breakpoints:
     sm: 640px
     md: 768px
     lg: 1024px
     xl: 1280px
     2xl: 1536px
-->
```

#### Custom Component Classes

Define reusable classes in `src/assets/main.css`:

```css
@layer components {
  .btn-primary {
    @apply px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors;
  }

  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }

  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary;
  }
}
```

**Usage**:

```vue
<button class="btn-primary">Submit</button>
<div class="card">Content</div>
<input class="input-field" type="text" />
```

### Color Palette

Defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#3B82F6', // blue-500
    dark: '#2563EB',    // blue-600
    light: '#60A5FA'    // blue-400
  },
  secondary: {
    DEFAULT: '#8B5CF6', // purple-500
    dark: '#7C3AED',    // purple-600
    light: '#A78BFA'    // purple-400
  }
}
```

**Usage**:

```vue
<div class="bg-primary text-white">Primary</div>
<div class="bg-secondary text-white">Secondary</div>
```

---

## Testing Strategy

### Current State

The project currently has no automated tests. This section outlines recommended testing approach.

### Recommended Testing Stack

```bash
# Install testing dependencies
npm install -D vitest @vue/test-utils happy-dom
```

#### Update package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest --coverage"
  }
}
```

### Unit Testing Stores

```javascript
// src/store/modules/__tests__/auth.spec.js
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../auth'

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
    const result = await store.login('test@example.com', 'password')

    expect(result.success).toBe(true)
    expect(store.user).toBeTruthy()
    expect(store.isAuthenticated).toBe(true)
  })

  it('clears user on logout', async () => {
    const store = useAuthStore()
    await store.login('test@example.com', 'password')
    await store.logout()

    expect(store.user).toBe(null)
    expect(store.isAuthenticated).toBe(false)
  })
})
```

### Component Testing

```javascript
// src/pages/__tests__/Home.spec.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Home from '../Home.vue'

describe('Home Page', () => {
  it('renders hero section', () => {
    const wrapper = mount(Home)
    expect(wrapper.find('h1').text()).toContain('Welcome')
  })

  it('displays feature cards', () => {
    const wrapper = mount(Home)
    const cards = wrapper.findAll('.feature-card')
    expect(cards.length).toBeGreaterThan(0)
  })
})
```

---

## Common Development Tasks

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update specific package
npm update vue

# Update all packages (careful!)
npm update

# Update to latest (including major versions)
npm install vue@latest
```

### Adding a New Dependency

```bash
# Add runtime dependency
npm install package-name

# Add dev dependency
npm install -D package-name

# Example: Add date library
npm install date-fns
```

**Usage**:

```javascript
import { format } from 'date-fns'

const formattedDate = format(new Date(), 'yyyy-MM-dd')
```

### Cleaning Build Cache

```bash
# Remove node_modules
rm -rf node_modules

# Remove build artifacts
rm -rf dist

# Reinstall dependencies
npm install
```

### Running Production Build Locally

```bash
# Build
npm run build

# Preview
npm run preview
```

### Environment-Specific Configuration

```bash
# Development (default)
npm run dev

# Production build
npm run build

# Custom environment
npm run build -- --mode staging
```

Create `.env.staging`:

```bash
VITE_API_BASE_URL=https://staging-api.example.com
```

---

## Best Practices

### Vue 3 Composition API

#### 1. Use Composition API, Not Options API

```vue
<!-- Good: Composition API -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<!-- Avoid: Options API -->
<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

#### 2. Keep Components Focused

```vue
<!-- Good: Single responsibility -->
<script setup>
// UserProfile.vue - displays user info
const props = defineProps(['user'])
</script>

<!-- Avoid: Too many responsibilities -->
<script setup>
// Dashboard.vue doing too much
// - Fetching data
// - Authentication
// - Payment processing
// - Analytics
</script>
```

#### 3. Extract Composables

```javascript
// composables/useLocalStorage.js
export function useLocalStorage(key, defaultValue) {
  const value = ref(defaultValue)

  const load = () => {
    const saved = localStorage.getItem(key)
    if (saved) value.value = JSON.parse(saved)
  }

  const save = () => {
    localStorage.setItem(key, JSON.stringify(value.value))
  }

  watch(value, save, { deep: true })
  load()

  return { value, save, load }
}
```

**Usage**:

```vue
<script setup>
import { useLocalStorage } from '@/composables/useLocalStorage'

const { value: settings } = useLocalStorage('settings', { theme: 'light' })
</script>
```

### Code Quality

#### 1. Meaningful Variable Names

```javascript
// Good
const isAuthenticated = computed(() => !!user.value)
const totalPrice = computed(() => items.reduce((sum, item) => sum + item.price, 0))

// Bad
const x = computed(() => !!u.value)
const tp = computed(() => i.reduce((s, itm) => s + itm.p, 0))
```

#### 2. Early Returns

```javascript
// Good
const checkout = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  if (!cartStore.hasItems) {
    alert('Cart is empty')
    return
  }

  await processPayment()
}

// Avoid: Nested conditions
const checkout = async () => {
  if (authStore.isAuthenticated) {
    if (cartStore.hasItems) {
      await processPayment()
    } else {
      alert('Cart is empty')
    }
  } else {
    router.push('/login')
  }
}
```

#### 3. Error Handling

```javascript
// Good: Proper error handling
const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    data.value = await api.getData()
  } catch (err) {
    error.value = err.message
    console.error('Failed to fetch data:', err)
  } finally {
    loading.value = false
  }
}

// Bad: Silent failures
const fetchData = async () => {
  try {
    data.value = await api.getData()
  } catch (err) {
    // Nothing happens
  }
}
```

### Performance

#### 1. Lazy Load Routes

```javascript
// Good: Lazy loading
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/pages/Dashboard.vue')
  }
]

// Avoid: Eager loading
import Dashboard from '@/pages/Dashboard.vue'
const routes = [
  {
    path: '/dashboard',
    component: Dashboard
  }
]
```

#### 2. Use v-show for Toggle, v-if for Conditional

```vue
<!-- Good: v-show for frequent toggling -->
<div v-show="isVisible">Toggled content</div>

<!-- Good: v-if for conditional rendering -->
<div v-if="userStore.hasPurchasedApp(appId)">
  Download button
</div>
```

#### 3. Avoid Watchers When Computed Works

```javascript
// Good: Computed property
const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// Avoid: Watcher
watch([firstName, lastName], () => {
  fullName.value = `${firstName.value} ${lastName.value}`
})
```

---

## Debugging

### Vue DevTools

**Install**: [Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

**Features**:

- Component inspector
- Pinia store inspector
- Router inspector
- Performance profiling

**Usage**:

1. Open DevTools (F12)
2. Click "Vue" tab
3. Inspect components, state, routes

### Console Debugging

```javascript
// Temporary debug logging
console.log('User:', authStore.user)
console.log('Cart items:', cartStore.items)

// Conditional debugging
if (import.meta.env.DEV) {
  console.log('Debug info:', data)
}

// Table format
console.table(cartStore.items)
```

### Network Debugging

```javascript
// Log all Axios requests
import axios from 'axios'

axios.interceptors.request.use(request => {
  console.log('Request:', request)
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
})
```

### Common Issues

#### 1. Reactivity Not Working

```javascript
// Problem: Direct array modification
items.push(newItem)  // May not trigger reactivity

// Solution: Use ref properly
items.value.push(newItem)  // Correct
```

#### 2. Store Not Updating UI

```javascript
// Problem: Destructuring loses reactivity
const { user } = useAuthStore()
console.log(user)  // Not reactive

// Solution: Use store directly
const authStore = useAuthStore()
console.log(authStore.user)  // Reactive
```

#### 3. Environment Variables Not Working

```bash
# Problem: Missing VITE_ prefix
API_KEY=123

# Solution: Add VITE_ prefix
VITE_API_KEY=123
```

**After changing .env**: Restart dev server!

---

## Next Steps

After mastering development:

1. **Read Deployment Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. **Explore Architecture**: [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)
3. **Contribute**: [CONTRIBUTING.md](./CONTRIBUTING.md)

---

**Happy Coding!** If you encounter issues, check the [API Reference](./API_REFERENCE.md) or troubleshooting sections.
