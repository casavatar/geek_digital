# Visual Components - Liquid Glass Component Library

## Table of Contents

1. [Component Overview](#component-overview)
2. [Current Component Analysis](#current-component-analysis)
3. [Liquid Glass Component Patterns](#liquid-glass-component-patterns)
4. [Component Mapping](#component-mapping)
5. [Layout Components](#layout-components)
6. [Navigation Components](#navigation-components)
7. [Page Components](#page-components)
8. [Content Components](#content-components)
9. [Form Components](#form-components)
10. [Feedback Components](#feedback-components)

---

## Component Overview

This document provides a comprehensive analysis of all Vue components in the GeekDigital application, mapping existing styling to Liquid Glass patterns and providing implementation guidance.

### Component Categories

- **Layout Components**: Structural wrappers (DefaultLayout, AuthLayout)
- **Navigation Components**: Navigation elements (Navbar, Footer)
- **Page Components**: Route-level views (Home, Dashboard, Catalog, etc.)
- **Content Components**: Reusable content containers (Cards, Modals)
- **Form Components**: Input elements (Inputs, Buttons, Selects)
- **Feedback Components**: User feedback (Badges, Alerts, Empty States)

---

## Current Component Analysis

### Existing Styling Approach

**Current System:**
- Tailwind utility classes directly in templates
- Custom component classes in `main.css`
- Scoped styles in some components
- Simple color palette (primary blue, secondary purple)
- Standard shadows and borders
- No glassmorphism effects

**Custom Classes Currently Defined:**

```css
/* src/assets/main.css */
.btn                 /* Base button */
.btn-primary         /* Primary button */
.btn-secondary       /* Secondary button */
.btn-outline         /* Outline button */
.card                /* Content card */
.input               /* Form input */
.container-custom    /* Max-width container */
```

**Current Color Usage:**
- Gradients: `from-primary-600 to-secondary-600`
- Backgrounds: `bg-white`, `bg-gray-50`, `bg-gray-900`
- Borders: `border-gray-200`, `border-gray-300`
- Text: `text-gray-900`, `text-gray-600`

---

## Liquid Glass Component Patterns

### Pattern Structure

Each Liquid Glass component follows this structure:

```vue
<template>
  <div class="glass-[component-name] glass-[variant]">
    <!-- Header (optional) -->
    <div class="glass-[component]-header">
      <h3 class="glass-[component]-title">Title</h3>
      <span class="glass-badge">Badge</span>
    </div>

    <!-- Body -->
    <div class="glass-[component]-body">
      <slot />
    </div>

    <!-- Footer (optional) -->
    <div class="glass-[component]-footer">
      <button class="glass-btn-primary">Action</button>
    </div>
  </div>
</template>
```

### Base Glass Properties

All glass components share:
- Semi-transparent background (`bg-white/80` or `bg-gray-900/80`)
- Backdrop blur (`backdrop-blur-md`)
- Subtle borders (`border-white/50` or `border-gray-700/50`)
- Soft shadows (`shadow-lg`)
- Smooth transitions (`transition-all duration-300`)

---

## Component Mapping

### Layout Components Mapping

#### DefaultLayout.vue

**Current Implementation:**
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
```

**Liquid Glass Migration:**
```vue
<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-primary-50/20 to-secondary-50/20 dark:from-gray-950 dark:via-primary-950/20 dark:to-secondary-950/20">
    <Navbar /> <!-- Already glass-nav -->
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
```

**Changes:**
- Add ambient gradient background
- Background adapts to dark mode
- Subtle color tints for brand identity

#### AuthLayout.vue

**Current Implementation:**
```vue
<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4">
    <router-view />
  </div>
</template>
```

**Liquid Glass Migration:**
```vue
<template>
  <div class="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
    <!-- Ambient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-50 to-primary-50 dark:from-gray-900 dark:via-primary-900/20 dark:to-secondary-900/20"></div>

    <!-- Glass overlay -->
    <div class="absolute inset-0 backdrop-blur-sm"></div>

    <!-- Content -->
    <div class="relative z-10">
      <router-view />
    </div>
  </div>
</template>
```

**Changes:**
- Layered background with ambient gradient
- Add backdrop blur overlay
- Dark mode support
- Increased depth perception

---

## Navigation Components

### Navbar.vue Analysis

**Current Structure:**
```vue
<nav class="bg-white shadow-sm border-b border-gray-200">
  <div class="container-custom">
    <!-- Logo -->
    <router-link to="/" class="flex items-center space-x-2">
      <div class="w-8 h-8 bg-primary-600 rounded-lg">G</div>
      <span class="text-xl font-bold">GeekDigital</span>
    </router-link>

    <!-- Navigation links -->
    <!-- User menu -->
    <!-- Mobile menu -->
  </div>
</nav>
```

**Liquid Glass Migration:**
```vue
<nav class="glass-nav">
  <div class="glass-nav-container">
    <!-- Logo with gradient -->
    <router-link to="/" class="glass-nav-brand">
      <div class="glass-nav-logo">G</div>
      <span class="glass-nav-brand-text">GeekDigital</span>
    </router-link>

    <!-- Navigation links -->
    <div class="glass-nav-links">
      <router-link to="/" class="glass-nav-link glass-nav-link-active">
        Home
      </router-link>
      <router-link to="/catalog" class="glass-nav-link">
        Catalog
      </router-link>
    </div>

    <!-- User menu -->
    <div class="glass-nav-actions">
      <!-- Cart button with glass effect -->
      <button class="glass-btn-icon relative">
        <svg>...</svg>
        <span v-if="cartStore.itemCount > 0" class="glass-badge glass-badge-primary absolute -top-1 -right-1">
          {{ cartStore.itemCount }}
        </span>
      </button>

      <!-- User avatar -->
      <div v-if="authStore.isAuthenticated" class="relative">
        <button @click="toggleUserMenu" class="glass-avatar">
          {{ authStore.userName[0].toUpperCase() }}
        </button>

        <!-- Dropdown with glass effect -->
        <div v-if="showUserMenu" class="glass-dropdown">
          <router-link to="/dashboard" class="glass-dropdown-item">
            Dashboard
          </router-link>
          <button @click="handleLogout" class="glass-dropdown-item glass-dropdown-item-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
```

**CSS Implementation:**
```css
.glass-nav {
  @apply fixed top-0 w-full z-50;
  @apply bg-white/80 backdrop-blur-md dark:bg-gray-900/80;
  @apply border-b border-white/50 dark:border-gray-700/50;
  @apply shadow-md;
}

.glass-nav-container {
  @apply container-custom py-4;
  @apply flex items-center justify-between;
}

.glass-nav-brand {
  @apply flex items-center space-x-2;
}

.glass-nav-logo {
  @apply w-10 h-10 rounded-xl flex items-center justify-center;
  @apply bg-gradient-to-br from-primary-600 to-secondary-600;
  @apply text-white font-bold text-xl;
  @apply shadow-lg;
}

.glass-nav-brand-text {
  @apply text-xl font-bold;
  @apply bg-gradient-to-r from-primary-600 to-secondary-600;
  @apply bg-clip-text text-transparent;
}

.glass-nav-links {
  @apply hidden md:flex items-center gap-6;
}

.glass-nav-link {
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
  @apply font-medium transition-colors duration-200;
  @apply relative;
}

.glass-nav-link-active {
  @apply text-primary-600 dark:text-primary-400;
}

.glass-nav-link-active::after {
  @apply content-[''] absolute -bottom-1 left-0 w-full h-0.5;
  @apply bg-gradient-to-r from-primary-600 to-secondary-600;
  @apply rounded-full;
}

.glass-avatar {
  @apply w-10 h-10 rounded-full;
  @apply bg-gradient-to-br from-primary-100 to-secondary-100;
  @apply dark:from-primary-900/50 dark:to-secondary-900/50;
  @apply text-primary-700 dark:text-primary-300;
  @apply font-semibold;
  @apply flex items-center justify-center;
  @apply border-2 border-white/50 dark:border-gray-700/50;
  @apply hover:scale-110 transition-transform duration-200;
}

.glass-dropdown {
  @apply absolute right-0 mt-2 w-48;
  @apply bg-white/90 backdrop-blur-xl dark:bg-gray-900/90;
  @apply rounded-xl shadow-2xl;
  @apply border border-white/50 dark:border-gray-700/50;
  @apply py-2;
  @apply z-50;
}

.glass-dropdown-item {
  @apply block px-4 py-2 text-sm;
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:bg-white/50 dark:hover:bg-gray-800/50;
  @apply transition-colors duration-150;
}

.glass-dropdown-item-danger {
  @apply text-red-600 dark:text-red-400;
}
```

### Footer.vue Analysis

**Current Implementation:**
```vue
<footer class="bg-gray-900 text-gray-300">
  <div class="container-custom py-12">
    <!-- Footer content -->
  </div>
</footer>
```

**Liquid Glass Migration:**
```vue
<footer class="glass-footer">
  <div class="glass-footer-ambient"></div>
  <div class="glass-footer-container">
    <!-- Brand section -->
    <div class="glass-footer-section">
      <div class="glass-footer-brand">
        <div class="glass-nav-logo">G</div>
        <span class="glass-nav-brand-text">GeekDigital</span>
      </div>
      <p class="glass-footer-description">
        Professional data engineering portfolio and digital products platform.
      </p>
    </div>

    <!-- Links sections -->
    <div class="glass-footer-section">
      <h3 class="glass-footer-title">Quick Links</h3>
      <ul class="glass-footer-links">
        <li><router-link to="/" class="glass-footer-link">Home</router-link></li>
      </ul>
    </div>
  </div>

  <!-- Bottom bar -->
  <div class="glass-footer-bottom">
    <p>&copy; {{ currentYear }} GeekDigital. All rights reserved.</p>
    <div class="flex space-x-6">
      <a href="#" class="glass-footer-social">GitHub</a>
    </div>
  </div>
</footer>
```

**CSS Implementation:**
```css
.glass-footer {
  @apply relative mt-auto;
  @apply bg-gray-900/95 dark:bg-gray-950/95;
  @apply backdrop-blur-sm;
  @apply border-t border-gray-700/50;
}

.glass-footer-ambient {
  @apply absolute inset-0 opacity-30;
  @apply bg-gradient-to-br from-primary-900/20 to-secondary-900/20;
}

.glass-footer-container {
  @apply relative z-10 container-custom py-12;
  @apply grid grid-cols-1 md:grid-cols-4 gap-8;
}

.glass-footer-section {
  @apply space-y-4;
}

.glass-footer-brand {
  @apply flex items-center space-x-2 mb-4;
}

.glass-footer-description {
  @apply text-sm text-gray-400;
}

.glass-footer-title {
  @apply text-lg font-semibold text-gray-100;
}

.glass-footer-links {
  @apply space-y-2;
}

.glass-footer-link {
  @apply text-gray-400 hover:text-primary-400;
  @apply transition-colors duration-200;
}

.glass-footer-bottom {
  @apply relative z-10 container-custom py-6;
  @apply border-t border-gray-800/50;
  @apply flex flex-col md:flex-row justify-between items-center;
  @apply text-sm text-gray-500;
}

.glass-footer-social {
  @apply text-gray-400 hover:text-primary-400;
  @apply transition-colors duration-200;
}
```

---

## Page Components

### Home.vue Analysis

**Current Structure:**
- Hero section with gradient background
- Features section (3 cards)
- CTA section

**Hero Section Migration:**

**Current:**
```vue
<section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
  <div class="container-custom">
    <h1 class="text-5xl md:text-6xl font-bold mb-6">
      Welcome to GeekDigital
    </h1>
  </div>
</section>
```

**Liquid Glass:**
```vue
<header class="glass-header">
  <div class="glass-header-ambient"></div>
  <div class="glass-header-content">
    <h1 class="glass-header-title">Welcome to GeekDigital</h1>
    <p class="glass-header-subtitle">
      Data Engineering Projects, Professional Applications & Digital Products
    </p>
    <div class="glass-header-actions">
      <router-link to="/catalog" class="glass-btn-primary">
        Explore Apps
      </router-link>
      <router-link to="/portfolio" class="glass-btn-outline">
        View Portfolio
      </router-link>
    </div>
  </div>
</header>
```

**CSS:**
```css
.glass-header {
  @apply relative min-h-[400px] overflow-hidden;
}

.glass-header-ambient {
  @apply absolute inset-0;
  @apply bg-gradient-to-br from-primary-100 via-secondary-50 to-primary-50;
  @apply dark:from-gray-900 dark:via-primary-900/20 dark:to-secondary-900/20;
}

.glass-header-content {
  @apply relative z-10 flex flex-col items-center justify-center min-h-[400px] px-6;
  @apply backdrop-blur-md bg-white/40 dark:bg-gray-900/40;
  @apply border-b border-white/50 dark:border-gray-700/50;
  @apply shadow-lg;
}

.glass-header-title {
  @apply text-4xl md:text-5xl lg:text-6xl font-bold text-center;
  @apply bg-gradient-to-r from-primary-600 to-secondary-600;
  @apply dark:from-primary-400 dark:to-secondary-400;
  @apply bg-clip-text text-transparent;
  @apply mb-6;
}

.glass-header-subtitle {
  @apply text-lg md:text-xl text-gray-700 dark:text-gray-300;
  @apply text-center max-w-2xl mb-8;
}

.glass-header-actions {
  @apply flex flex-col sm:flex-row gap-4 justify-center;
}
```

**Features Section Migration:**

**Current:**
```vue
<section class="py-16 bg-white">
  <div class="container-custom">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="card text-center">
        <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-lg ...">
          <svg>...</svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Title</h3>
        <p class="text-gray-600">Description</p>
      </div>
    </div>
  </div>
</section>
```

**Liquid Glass:**
```vue
<section class="glass-section">
  <div class="glass-container">
    <h2 class="glass-section-title">What We Offer</h2>
    <div class="glass-grid">
      <div class="glass-feature-card">
        <div class="glass-feature-icon glass-feature-icon-primary">
          <svg>...</svg>
        </div>
        <h3 class="glass-feature-title">Data Engineering Portfolio</h3>
        <p class="glass-feature-description">
          Explore professional data pipeline projects, ETL solutions, and analytics implementations.
        </p>
      </div>
    </div>
  </div>
</section>
```

**CSS:**
```css
.glass-section {
  @apply py-16 md:py-20;
  @apply relative;
}

.glass-container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.glass-section-title {
  @apply text-3xl md:text-4xl font-bold text-center mb-12;
  @apply text-gray-900 dark:text-gray-100;
}

.glass-grid {
  @apply grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
}

.glass-feature-card {
  @apply glass-card text-center;
  @apply hover:-translate-y-1 hover:shadow-xl;
  @apply transition-all duration-300;
}

.glass-feature-icon {
  @apply w-16 h-16 rounded-xl;
  @apply flex items-center justify-center mx-auto mb-4;
  @apply backdrop-blur-sm;
  @apply shadow-md;
}

.glass-feature-icon-primary {
  @apply bg-gradient-to-br from-primary-100 to-primary-200;
  @apply dark:from-primary-900/50 dark:to-primary-800/50;
  @apply text-primary-600 dark:text-primary-400;
  @apply border border-primary-200 dark:border-primary-800;
}

.glass-feature-icon-secondary {
  @apply bg-gradient-to-br from-secondary-100 to-secondary-200;
  @apply dark:from-secondary-900/50 dark:to-secondary-800/50;
  @apply text-secondary-600 dark:text-secondary-400;
  @apply border border-secondary-200 dark:border-secondary-800;
}

.glass-feature-title {
  @apply text-xl font-semibold mb-3;
  @apply text-gray-900 dark:text-gray-100;
}

.glass-feature-description {
  @apply text-gray-600 dark:text-gray-400;
}
```

### Dashboard.vue Analysis

**Current Stats Cards:**
```vue
<div class="card">
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm text-gray-600 mb-1">Purchased Apps</p>
      <p class="text-3xl font-bold text-primary-600">{{ count }}</p>
    </div>
    <div class="w-12 h-12 bg-primary-100 rounded-lg">
      <svg>...</svg>
    </div>
  </div>
</div>
```

**Liquid Glass Migration:**
```vue
<div class="glass-stat-card glass-stat-card-primary">
  <div class="glass-stat-content">
    <p class="glass-stat-label">Purchased Apps</p>
    <p class="glass-stat-value">{{ userStore.purchasedApps.length }}</p>
  </div>
  <div class="glass-stat-icon glass-stat-icon-primary">
    <svg>...</svg>
  </div>
</div>
```

**CSS:**
```css
.glass-stat-card {
  @apply glass-card;
  @apply flex items-center justify-between;
  @apply hover:scale-105 transition-transform duration-300;
}

.glass-stat-content {
  @apply space-y-1;
}

.glass-stat-label {
  @apply text-sm text-gray-600 dark:text-gray-400;
  @apply font-medium;
}

.glass-stat-value {
  @apply text-3xl font-bold;
}

.glass-stat-card-primary .glass-stat-value {
  @apply text-primary-600 dark:text-primary-400;
}

.glass-stat-card-secondary .glass-stat-value {
  @apply text-secondary-600 dark:text-secondary-400;
}

.glass-stat-card-success .glass-stat-value {
  @apply text-green-600 dark:text-green-400;
}

.glass-stat-icon {
  @apply w-12 h-12 rounded-xl;
  @apply flex items-center justify-center;
  @apply backdrop-blur-sm shadow-md;
}

.glass-stat-icon-primary {
  @apply bg-gradient-to-br from-primary-100 to-primary-200;
  @apply dark:from-primary-900/50 dark:to-primary-800/50;
  @apply text-primary-600 dark:text-primary-400;
  @apply border border-primary-200 dark:border-primary-800;
}
```

**Current Tabs:**
```vue
<div class="flex gap-4 mb-6 border-b border-gray-200">
  <button
    :class="[
      'px-4 py-2 font-medium border-b-2 transition-colors',
      activeTab === tab.id ? 'border-primary-600 text-primary-600' : '...'
    ]"
  >
    {{ tab.label }}
  </button>
</div>
```

**Liquid Glass Migration:**
```vue
<div class="glass-tabs">
  <button
    v-for="tab in tabs"
    :key="tab.id"
    @click="activeTab = tab.id"
    :class="[
      'glass-tab',
      activeTab === tab.id ? 'glass-tab-active' : ''
    ]"
  >
    {{ tab.label }}
  </button>
</div>
```

**CSS:**
```css
.glass-tabs {
  @apply flex gap-2 mb-6;
  @apply p-1 rounded-xl;
  @apply bg-white/50 backdrop-blur-sm dark:bg-gray-900/50;
  @apply border border-gray-200 dark:border-gray-700;
}

.glass-tab {
  @apply px-6 py-2.5 rounded-lg;
  @apply font-medium text-sm;
  @apply text-gray-600 dark:text-gray-400;
  @apply transition-all duration-200;
  @apply hover:text-gray-900 dark:hover:text-gray-100;
}

.glass-tab-active {
  @apply bg-white dark:bg-gray-800;
  @apply text-primary-600 dark:text-primary-400;
  @apply shadow-md;
}
```

---

## Content Components

### Glass Cards

**Standard Card:**
```css
.glass-card {
  @apply relative rounded-xl overflow-hidden;
  @apply bg-white/80 backdrop-blur-md dark:bg-gray-900/80;
  @apply border border-white/50 dark:border-gray-700/50;
  @apply shadow-lg;
  @apply transition-all duration-300;
}

.glass-card-header {
  @apply flex items-center justify-between p-6 pb-4;
  @apply border-b border-gray-200/50 dark:border-gray-700/50;
}

.glass-card-title {
  @apply text-xl font-semibold text-gray-900 dark:text-gray-100;
}

.glass-card-body {
  @apply p-6 pt-4;
}

.glass-card-footer {
  @apply p-6 pt-4;
  @apply border-t border-gray-200/50 dark:border-gray-700/50;
  @apply flex items-center justify-end gap-3;
}
```

**Interactive Card:**
```css
.glass-card-interactive {
  @apply glass-card;
  @apply hover:shadow-xl hover:scale-[1.02];
  @apply hover:bg-white/90 dark:hover:bg-gray-900/90;
  @apply cursor-pointer;
}
```

**Product Card (for Shop.vue):**
```vue
<template>
  <div class="glass-product-card">
    <div class="glass-product-image">
      <img :src="product.image" :alt="product.name" />
      <span class="glass-badge glass-badge-primary">New</span>
    </div>
    <div class="glass-product-content">
      <h3 class="glass-product-title">{{ product.name }}</h3>
      <p class="glass-product-description">{{ product.description }}</p>
      <div class="glass-product-footer">
        <span class="glass-product-price">${{ product.price }}</span>
        <button class="glass-btn-primary" @click="addToCart(product)">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
```

```css
.glass-product-card {
  @apply glass-card-interactive;
  @apply flex flex-col;
}

.glass-product-image {
  @apply relative aspect-video overflow-hidden;
  @apply bg-gradient-to-br from-gray-100 to-gray-200;
  @apply dark:from-gray-800 dark:to-gray-700;
}

.glass-product-image img {
  @apply w-full h-full object-cover;
}

.glass-product-content {
  @apply p-6 flex-grow flex flex-col;
}

.glass-product-title {
  @apply text-lg font-semibold mb-2;
  @apply text-gray-900 dark:text-gray-100;
}

.glass-product-description {
  @apply text-sm text-gray-600 dark:text-gray-400;
  @apply flex-grow mb-4;
}

.glass-product-footer {
  @apply flex items-center justify-between;
}

.glass-product-price {
  @apply text-2xl font-bold;
  @apply bg-gradient-to-r from-primary-600 to-secondary-600;
  @apply dark:from-primary-400 dark:to-secondary-400;
  @apply bg-clip-text text-transparent;
}
```

### Glass Modals

```vue
<template>
  <Transition name="glass-fade">
    <div v-if="isOpen" class="glass-modal" @click.self="close">
      <div class="glass-modal-overlay"></div>
      <Transition name="glass-scale">
        <div class="glass-modal-content">
          <div class="glass-modal-header">
            <h3 class="glass-modal-title">{{ title }}</h3>
            <button class="glass-modal-close" @click="close">&times;</button>
          </div>
          <div class="glass-modal-body">
            <slot />
          </div>
          <div class="glass-modal-footer">
            <button class="glass-btn-outline" @click="close">Cancel</button>
            <button class="glass-btn-primary" @click="confirm">Confirm</button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
```

```css
.glass-modal {
  @apply fixed inset-0 z-50 flex items-center justify-center p-4;
}

.glass-modal-overlay {
  @apply absolute inset-0 bg-black/50 backdrop-blur-sm;
}

.glass-modal-content {
  @apply relative z-10 w-full max-w-md;
  @apply bg-white/90 backdrop-blur-xl dark:bg-gray-900/90;
  @apply rounded-2xl shadow-2xl;
  @apply border border-white/50 dark:border-gray-700/50;
  @apply max-h-[90vh] overflow-y-auto;
}

.glass-modal-header {
  @apply flex items-center justify-between p-6 pb-4;
  @apply border-b border-gray-200/50 dark:border-gray-700/50;
}

.glass-modal-title {
  @apply text-xl font-semibold text-gray-900 dark:text-gray-100;
}

.glass-modal-close {
  @apply text-gray-400 hover:text-gray-600 dark:hover:text-gray-300;
  @apply text-3xl leading-none;
  @apply transition-colors duration-200;
}

.glass-modal-body {
  @apply p-6;
}

.glass-modal-footer {
  @apply flex items-center justify-end gap-3 p-6 pt-4;
  @apply border-t border-gray-200/50 dark:border-gray-700/50;
}
```

---

## Form Components

### Glass Inputs

```css
.glass-input-group {
  @apply space-y-2;
}

.glass-label {
  @apply block text-sm font-medium;
  @apply text-gray-700 dark:text-gray-300;
}

.glass-input {
  @apply w-full px-4 py-2.5 rounded-lg;
  @apply bg-white/50 backdrop-blur-sm dark:bg-gray-900/50;
  @apply border border-gray-300 dark:border-gray-600;
  @apply text-gray-900 dark:text-gray-100;
  @apply placeholder:text-gray-400 dark:placeholder:text-gray-500;
  @apply focus:outline-none focus:ring-2 focus:ring-primary-500;
  @apply focus:border-primary-500 focus:bg-white/70 dark:focus:bg-gray-900/70;
  @apply transition-all duration-200;
}

.glass-input-hint {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

/* Error state */
.glass-input-error {
  @apply border-red-500 dark:border-red-400;
  @apply focus:ring-red-500 focus:border-red-500;
}

/* Success state */
.glass-input-success {
  @apply border-green-500 dark:border-green-400;
  @apply focus:ring-green-500 focus:border-green-500;
}

/* Search input */
.glass-search {
  @apply relative;
}

.glass-search-icon {
  @apply absolute left-3 top-1/2 -translate-y-1/2;
  @apply text-gray-400 dark:text-gray-500;
  @apply pointer-events-none;
}

.glass-search-input {
  @apply glass-input pl-10;
}
```

### Glass Buttons

```css
/* Base button */
.glass-btn {
  @apply px-6 py-2.5 rounded-lg font-medium;
  @apply transition-all duration-200;
  @apply focus:outline-none focus:ring-4;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Primary button */
.glass-btn-primary {
  @apply glass-btn;
  @apply bg-gradient-to-r from-primary-600 to-primary-700;
  @apply text-white shadow-md;
  @apply hover:from-primary-700 hover:to-primary-800;
  @apply hover:shadow-lg hover:scale-105;
  @apply focus:ring-primary-300 dark:focus:ring-primary-800;
}

/* Secondary button */
.glass-btn-secondary {
  @apply glass-btn;
  @apply bg-gradient-to-r from-secondary-600 to-secondary-700;
  @apply text-white shadow-md;
  @apply hover:from-secondary-700 hover:to-secondary-800;
  @apply hover:shadow-lg hover:scale-105;
  @apply focus:ring-secondary-300 dark:focus:ring-secondary-800;
}

/* Outline button */
.glass-btn-outline {
  @apply glass-btn;
  @apply bg-white/50 backdrop-blur-sm dark:bg-gray-900/50;
  @apply border-2 border-gray-300 dark:border-gray-600;
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:bg-white/80 dark:hover:bg-gray-800/50;
  @apply hover:border-gray-400 dark:hover:border-gray-500;
  @apply focus:ring-gray-200 dark:focus:ring-gray-700;
}

/* Ghost button */
.glass-btn-ghost {
  @apply glass-btn;
  @apply bg-transparent;
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:bg-gray-100/50 dark:hover:bg-gray-800/50;
  @apply focus:ring-gray-200 dark:focus:ring-gray-700;
}

/* Icon button */
.glass-btn-icon {
  @apply p-2.5 rounded-lg;
  @apply bg-white/50 backdrop-blur-sm dark:bg-gray-900/50;
  @apply border border-gray-200 dark:border-gray-700;
  @apply text-gray-600 dark:text-gray-400;
  @apply hover:bg-white/80 dark:hover:bg-gray-800/50;
  @apply hover:text-gray-900 dark:hover:text-gray-100;
  @apply transition-all duration-200;
}
```

---

## Feedback Components

### Glass Badges

```css
.glass-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium;
  @apply bg-white/60 backdrop-blur-sm dark:bg-gray-800/60;
  @apply border border-gray-300 dark:border-gray-600;
  @apply text-gray-700 dark:text-gray-300;
}

.glass-badge-primary {
  @apply bg-primary-100/60 dark:bg-primary-900/30;
  @apply border-primary-300 dark:border-primary-700;
  @apply text-primary-700 dark:text-primary-300;
}

.glass-badge-secondary {
  @apply bg-secondary-100/60 dark:bg-secondary-900/30;
  @apply border-secondary-300 dark:border-secondary-700;
  @apply text-secondary-700 dark:text-secondary-300;
}

.glass-badge-success {
  @apply bg-green-100/60 dark:bg-green-900/30;
  @apply border-green-300 dark:border-green-700;
  @apply text-green-700 dark:text-green-300;
}

.glass-badge-warning {
  @apply bg-yellow-100/60 dark:bg-yellow-900/30;
  @apply border-yellow-300 dark:border-yellow-700;
  @apply text-yellow-700 dark:text-yellow-300;
}

.glass-badge-error {
  @apply bg-red-100/60 dark:bg-red-900/30;
  @apply border-red-300 dark:border-red-700;
  @apply text-red-700 dark:text-red-300;
}

.glass-badge-info {
  @apply bg-blue-100/60 dark:bg-blue-900/30;
  @apply border-blue-300 dark:border-blue-700;
  @apply text-blue-700 dark:text-blue-300;
}
```

### Glass Empty States

```css
.glass-empty-state {
  @apply flex flex-col items-center justify-center;
  @apply py-12 px-6 text-center;
  @apply bg-white/50 backdrop-blur-sm dark:bg-gray-900/50;
  @apply rounded-xl border border-gray-200 dark:border-gray-700;
}

.glass-empty-icon {
  @apply w-16 h-16 rounded-full;
  @apply bg-gradient-to-br from-gray-100 to-gray-200;
  @apply dark:from-gray-800 dark:to-gray-700;
  @apply flex items-center justify-center;
  @apply text-gray-400 dark:text-gray-500;
  @apply mb-4;
}

.glass-empty-title {
  @apply text-lg font-semibold text-gray-900 dark:text-gray-100;
  @apply mb-2;
}

.glass-empty-description {
  @apply text-sm text-gray-600 dark:text-gray-400;
  @apply max-w-sm mb-6;
}
```

---

**Version:** 1.0.0
**Last Updated:** 2025-01-21
**Component Count:** 50+ patterns documented
