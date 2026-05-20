# Layout Guidelines - Liquid Glass Design System

**Last Updated:** 2025-01-21
**Version:** 1.0.0

## Table of Contents

1. [Layout System Overview](#layout-system-overview)
2. [Route-to-Layout Mapping](#route-to-layout-mapping)
3. [Layout Composition](#layout-composition)
4. [Responsive Design](#responsive-design)
5. [Grid Systems](#grid-systems)
6. [Page Structure Templates](#page-structure-templates)
7. [Navigation Patterns](#navigation-patterns)
8. [SEO & Meta Tags](#seo--meta-tags)

---

## Layout System Overview

### Architecture

```
App.vue (Root)
  └── <router-view /> (Dynamic layout injection)
      ├── DefaultLayout.vue (Main application)
      │   ├── Navbar (fixed)
      │   ├── <router-view /> (page content)
      │   └── Footer
      │
      └── AuthLayout.vue (Authentication)
          └── <router-view /> (auth forms)
```

### Layout Responsibilities

**DefaultLayout.vue:**
- Global navigation (Navbar)
- Ambient gradient background
- Page content area
- Site footer
- Theme support

**AuthLayout.vue:**
- Minimal chrome (no navbar/footer)
- Centered content
- Full-screen gradient background
- Clean authentication experience

---

## Route-to-Layout Mapping

### Router Configuration

```javascript
// src/router/index.js
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/Home.vue'),
        meta: { title: 'Home - GeekDigital' }
      },
      {
        path: 'catalog',
        name: 'Catalog',
        component: () => import('@/pages/Catalog.vue'),
        meta: { title: 'App Catalog - GeekDigital', requiresAuth: false }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/Dashboard.vue'),
        meta: { title: 'Dashboard - GeekDigital', requiresAuth: true }
      }
      // ... more DefaultLayout routes
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/Login.vue'),
        meta: { title: 'Login - GeekDigital', guest: true }
      }
    ]
  }
]
```

### Layout Selection Strategy

**Use DefaultLayout when:**
- User needs global navigation
- Page is part of main application flow
- Footer information should be visible
- Standard page structure applies

**Use AuthLayout when:**
- User is logging in or registering
- Minimal distractions needed
- Full-screen design preferred
- No navigation required

---

## Layout Composition

### DefaultLayout.vue

```vue
<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-primary-50/20 to-secondary-50/20 dark:from-gray-950 dark:via-primary-950/20 dark:to-secondary-950/20">
    <!-- Fixed Navigation -->
    <Navbar />

    <!-- Main Content Area -->
    <main class="flex-grow pt-16">
      <!-- pt-16 accounts for fixed navbar height -->
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>
```

**Key Features:**
- Ambient gradient background (theme-aware)
- Fixed navbar with padding compensation
- Flex-grow main content (pushes footer down)
- Automatic theme transitions

### AuthLayout.vue

```vue
<template>
  <div class="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
    <!-- Ambient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-50 to-primary-50 dark:from-gray-900 dark:via-primary-900/20 dark:to-secondary-900/20"></div>

    <!-- Blur Overlay -->
    <div class="absolute inset-0 backdrop-blur-sm"></div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-md">
      <router-view />
    </div>
  </div>
</template>
```

**Key Features:**
- Layered background (gradient + blur)
- Centered content
- Max-width constraint (max-w-md = 448px)
- Responsive padding

---

## Responsive Design

### Breakpoints

Tailwind's default breakpoints:

```css
sm:  640px  /* Small tablets */
md:  768px  /* Tablets */
lg:  1024px /* Desktops */
xl:  1280px /* Large desktops */
2xl: 1536px /* Extra large screens */
```

### Mobile-First Approach

Always style mobile first, then add responsive variants:

```vue
<div class="p-4 md:p-6 lg:p-8">
  <!-- 16px → 24px → 32px padding as screen grows -->
</div>

<h1 class="text-3xl md:text-4xl lg:text-5xl">
  <!-- 30px → 36px → 48px heading -->
</h1>
```

### Responsive Navigation

```vue
<!-- Desktop: Horizontal links -->
<!-- Mobile: Hamburger menu -->
<div class="hidden md:flex items-center gap-6">
  <!-- Desktop navigation -->
</div>

<button class="md:hidden glass-btn-icon" @click="toggleMobileMenu">
  <!-- Mobile hamburger -->
</button>
```

---

## Grid Systems

### Glass Grid (Standard)

```vue
<div class="glass-grid">
  <div class="glass-card">Card 1</div>
  <div class="glass-card">Card 2</div>
  <div class="glass-card">Card 3</div>
</div>
```

```css
.glass-grid {
  @apply grid gap-6;
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}
```

**Responsive Behavior:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

### Grid Variants

**2-Column Grid:**
```css
.glass-grid-2 {
  @apply grid gap-6;
  @apply grid-cols-1 lg:grid-cols-2;
}
```

**4-Column Grid:**
```css
.glass-grid-4 {
  @apply grid gap-6;
  @apply grid-cols-1 sm:grid-cols-2 lg:grid-cols-4;
}
```

**Auto-Fit Grid:**
```css
.glass-grid-auto {
  @apply grid gap-6;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### Usage Examples

```vue
<!-- Product grid -->
<div class="glass-grid">
  <div v-for="product in products" :key="product.id" class="glass-card">
    {{ product.name }}
  </div>
</div>

<!-- Two-column layout (sidebar + main) -->
<div class="glass-grid-2">
  <aside class="glass-card">Sidebar</aside>
  <main class="glass-card">Main Content</main>
</div>
```

---

## Page Structure Templates

### Standard Page Template

```vue
<template>
  <div>
    <!-- Page Header (Hero) -->
    <header class="glass-header">
      <div class="glass-header-ambient"></div>
      <div class="glass-header-content">
        <h1 class="glass-header-title">Page Title</h1>
        <p class="glass-header-subtitle">Page description</p>
      </div>
    </header>

    <!-- Main Content Section -->
    <section class="glass-section">
      <div class="glass-container">
        <h2 class="glass-section-title">Section Heading</h2>

        <!-- Content Grid -->
        <div class="glass-grid">
          <div v-for="item in items" :key="item.id" class="glass-card">
            {{ item.name }}
          </div>
        </div>
      </div>
    </section>

    <!-- Optional: Additional Sections -->
    <section class="glass-section bg-white/30 dark:bg-gray-900/30">
      <div class="glass-container">
        <!-- More content -->
      </div>
    </section>
  </div>
</template>
```

### Dashboard Page Template

```vue
<template>
  <div class="glass-section">
    <div class="glass-container">
      <!-- Page Title -->
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Dashboard
      </h1>

      <!-- Stats Grid -->
      <div class="glass-grid-4 mb-8">
        <div class="glass-stat-card glass-stat-card-primary">
          <!-- Stat content -->
        </div>
        <!-- More stats -->
      </div>

      <!-- Tabs -->
      <div class="glass-tabs mb-6">
        <button class="glass-tab glass-tab-active">Overview</button>
        <button class="glass-tab">Projects</button>
      </div>

      <!-- Tab Content -->
      <div class="glass-card">
        <!-- Tab content -->
      </div>
    </div>
  </div>
</template>
```

### Catalog/Shop Page Template

```vue
<template>
  <div>
    <!-- Header -->
    <header class="glass-header">
      <div class="glass-header-ambient"></div>
      <div class="glass-header-content">
        <h1 class="glass-header-title">Catalog</h1>
      </div>
    </header>

    <!-- Filters & Content -->
    <section class="glass-section">
      <div class="glass-container">
        <!-- Filters (optional) -->
        <div class="flex flex-col md:flex-row gap-4 mb-8">
          <div class="glass-search flex-grow">
            <input class="glass-search-input" placeholder="Search..." />
          </div>
          <select class="glass-input md:w-48">
            <option>All Categories</option>
          </select>
        </div>

        <!-- Product Grid -->
        <div class="glass-grid">
          <div v-for="product in products" :key="product.id" class="glass-product-card">
            <!-- Product content -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
```

---

## Navigation Patterns

### Horizontal Navigation (Desktop)

```vue
<nav class="glass-nav">
  <div class="glass-nav-container">
    <div class="glass-nav-links">
      <router-link to="/" class="glass-nav-link glass-nav-link-active">
        Home
      </router-link>
      <router-link to="/catalog" class="glass-nav-link">
        Catalog
      </router-link>
    </div>
  </div>
</nav>
```

### Mobile Menu (Slide-out)

```vue
<template>
  <!-- Hamburger Button -->
  <button @click="showMobileMenu = true" class="md:hidden glass-btn-icon">
    <svg class="w-6 h-6"><!-- menu icon --></svg>
  </button>

  <!-- Mobile Menu Overlay -->
  <Transition name="glass-fade">
    <div v-if="showMobileMenu" class="fixed inset-0 z-50 md:hidden">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showMobileMenu = false"></div>

      <!-- Slide-in Menu -->
      <Transition name="glass-slide-left">
        <div class="absolute right-0 top-0 h-full w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl p-6">
          <button @click="showMobileMenu = false" class="glass-btn-icon mb-6">
            <svg class="w-6 h-6"><!-- close icon --></svg>
          </button>

          <nav class="flex flex-col gap-4">
            <router-link to="/" class="glass-nav-link">Home</router-link>
            <router-link to="/catalog" class="glass-nav-link">Catalog</router-link>
          </nav>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
```

### Breadcrumb Navigation

```vue
<nav aria-label="Breadcrumb" class="mb-6">
  <ol class="flex items-center gap-2 text-sm">
    <li>
      <router-link to="/" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
        Home
      </router-link>
    </li>
    <li class="text-gray-400">/</li>
    <li>
      <router-link to="/catalog" class="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
        Catalog
      </router-link>
    </li>
    <li class="text-gray-400">/</li>
    <li class="text-gray-900 dark:text-gray-100 font-medium">
      Product Name
    </li>
  </ol>
</nav>
```

---

## SEO & Meta Tags

### Dynamic Meta Tags

```javascript
// src/router/index.js
router.beforeEach((to, from, next) => {
  // Set page title
  document.title = to.meta.title || 'GeekDigital'

  // Set meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || 'GeekDigital - Data Engineering Portfolio')
  }

  next()
})
```

### Route Meta Configuration

```javascript
{
  path: '/',
  component: Home,
  meta: {
    title: 'Home - GeekDigital',
    description: 'Professional data engineering portfolio and digital products platform',
    keywords: 'data engineering, ETL, analytics, digital products'
  }
}
```

### Open Graph Tags

```html
<!-- index.html -->
<head>
  <meta property="og:title" content="GeekDigital - Data Engineering Portfolio">
  <meta property="og:description" content="Professional data engineering solutions">
  <meta property="og:image" content="/og-image.jpg">
  <meta property="og:url" content="https://geekdigital.com">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

---

## Spacing Guidelines

### Container Widths

```css
.glass-container {
  @apply max-w-7xl mx-auto;                 /* 1280px max */
  @apply px-4 sm:px-6 lg:px-8;              /* Responsive padding */
}
```

### Section Spacing

```css
.glass-section {
  @apply py-12 md:py-16 lg:py-20;          /* Vertical rhythm */
}
```

### Component Spacing

```vue
<!-- Vertical spacing between sections -->
<section class="glass-section space-y-12">
  <div>Section 1</div>
  <div>Section 2</div>
</section>

<!-- Horizontal spacing in flex -->
<div class="flex gap-4 md:gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Best Practices

### DO:
- ✅ Use consistent container widths (.glass-container)
- ✅ Maintain vertical rhythm with section spacing
- ✅ Test layouts on all breakpoints
- ✅ Use semantic HTML (header, main, section, nav)
- ✅ Provide skip links for accessibility
- ✅ Account for fixed navbar height (pt-16)

### DON'T:
- ❌ Use fixed pixel widths for containers
- ❌ Nest too many layers of grids
- ❌ Forget mobile navigation patterns
- ❌ Ignore keyboard navigation
- ❌ Mix layout systems inconsistently

---

**Document Version:** 1.0.0
**Last Updated:** 2025-01-21
**Maintained by:** GeekDigital Design Team

See also:
- [VISUAL_STYLE_GUIDE.md](./VISUAL_STYLE_GUIDE.md)
- [COMPONENT_ARCHITECTURE.md](./COMPONENT_ARCHITECTURE.md)
- [DESIGN_SYSTEM_TOKENS.md](./DESIGN_SYSTEM_TOKENS.md)
