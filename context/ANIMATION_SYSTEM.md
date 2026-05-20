# Animation System - Liquid Glass Transitions & Animations

## Table of Contents

1. [Animation Philosophy](#animation-philosophy)
2. [Transition Patterns](#transition-patterns)
3. [Hover Effects](#hover-effects)
4. [Page Transitions](#page-transitions)
5. [Loading States](#loading-states)
6. [Performance Guidelines](#performance-guidelines)

---

## Animation Philosophy

### Principles

1. **Purposeful**: Every animation serves a purpose
2. **Performant**: Hardware-accelerated properties only
3. **Subtle**: Enhance without distracting
4. **Consistent**: Predictable timing and easing

### Animation Properties

**Prefer (hardware-accelerated):**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (with caution)

**Avoid:**
- `width`, `height` (causes reflow)
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

---

## Transition Patterns

### Vue Transition Classes

```css
/* Fade transition */
.glass-fade-enter-active,
.glass-fade-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.glass-fade-enter-from,
.glass-fade-leave-to {
  @apply opacity-0;
}

/* Slide up transition */
.glass-slide-up-enter-active,
.glass-slide-up-leave-active {
  @apply transition-all duration-300 ease-out;
}

.glass-slide-up-enter-from {
  @apply opacity-0 translate-y-4;
}

.glass-slide-up-leave-to {
  @apply opacity-0 -translate-y-4;
}

/* Scale transition */
.glass-scale-enter-active,
.glass-scale-leave-active {
  @apply transition-all duration-200 ease-in-out;
}

.glass-scale-enter-from,
.glass-scale-leave-to {
  @apply opacity-0 scale-95;
}

/* Slide and fade */
.glass-slide-fade-enter-active,
.glass-slide-fade-leave-active {
  @apply transition-all duration-300 ease-out;
}

.glass-slide-fade-enter-from {
  @apply opacity-0 translate-x-8;
}

.glass-slide-fade-leave-to {
  @apply opacity-0 -translate-x-8;
}
```

**Usage:**
```vue
<Transition name="glass-fade">
  <div v-if="show" class="glass-card">Content</div>
</Transition>

<Transition name="glass-scale">
  <div v-if="isOpen" class="glass-modal-content">Modal</div>
</Transition>
```

---

## Hover Effects

### Card Hover Effects

```css
/* Lift effect */
.glass-hover-lift {
  @apply transition-all duration-300 ease-out;
  @apply hover:-translate-y-1 hover:shadow-xl;
}

/* Scale effect */
.glass-hover-scale {
  @apply transition-transform duration-200 ease-out;
  @apply hover:scale-105;
}

/* Glow effect */
.glass-hover-glow {
  @apply transition-all duration-300 ease-out;
  @apply hover:shadow-lg hover:shadow-primary-500/50;
  @apply dark:hover:shadow-primary-500/30;
}

/* Brightness effect */
.glass-hover-brighten {
  @apply transition-all duration-300 ease-out;
  @apply hover:bg-white/90 dark:hover:bg-gray-900/90;
}
```

**Component Usage:**
```vue
<div class="glass-card glass-hover-lift glass-hover-brighten">
  <!-- Interactive card with lift and brighten on hover -->
</div>
```

### Button Hover Effects

```css
.glass-btn-primary {
  @apply transition-all duration-200 ease-out;
  @apply hover:scale-105 hover:shadow-lg;
  @apply active:scale-100;
}

.glass-btn-outline {
  @apply transition-all duration-200 ease-out;
  @apply hover:bg-white/80 dark:hover:bg-gray-800/50;
  @apply hover:border-gray-400 dark:hover:border-gray-500;
}

.glass-btn-ghost {
  @apply transition-all duration-150 ease-out;
  @apply hover:bg-gray-100/50 dark:hover:bg-gray-800/50;
}
```

### Link Hover Effects

```css
.glass-nav-link {
  @apply transition-colors duration-200 ease-out;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
}

/* Underline animation */
.glass-link-underline {
  @apply relative;
  @apply after:absolute after:bottom-0 after:left-0;
  @apply after:h-0.5 after:w-0;
  @apply after:bg-gradient-to-r after:from-primary-600 after:to-secondary-600;
  @apply after:transition-all after:duration-300;
  @apply hover:after:w-full;
}
```

---

## Page Transitions

### Router View Transitions

```vue
<!-- App.vue or Layout -->
<template>
  <router-view v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'glass-fade'" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
</template>
```

**Route Configuration:**
```javascript
const routes = [
  {
    path: '/',
    component: Home,
    meta: { transition: 'glass-slide-fade' }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { transition: 'glass-fade' }
  }
]
```

### Scroll Reveal Animations

```vue
<template>
  <div
    v-for="item in items"
    :key="item.id"
    class="glass-card"
    :class="{ 'glass-reveal': isVisible(item) }"
  >
    {{ item.name }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const items = ref([])
const visibleItems = ref(new Set())

const isVisible = (item) => visibleItems.value.has(item.id)
</script>

<style>
.glass-reveal {
  @apply opacity-0 translate-y-8;
  @apply transition-all duration-700 ease-out;
}

.glass-reveal.is-visible {
  @apply opacity-100 translate-y-0;
}
</style>
```

---

## Loading States

### Skeleton Loaders

```css
.glass-skeleton {
  @apply bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200;
  @apply dark:from-gray-800 dark:via-gray-700 dark:to-gray-800;
  @apply bg-[length:200%_100%];
  @apply animate-shimmer;
  @apply rounded-lg;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Tailwind Config:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      }
    }
  }
}
```

**Usage:**
```vue
<template>
  <div v-if="loading" class="glass-card">
    <div class="glass-skeleton h-6 w-3/4 mb-4"></div>
    <div class="glass-skeleton h-4 w-full mb-2"></div>
    <div class="glass-skeleton h-4 w-2/3"></div>
  </div>

  <div v-else class="glass-card">
    <!-- Actual content -->
  </div>
</template>
```

### Spinner

```vue
<template>
  <div class="glass-spinner">
    <div class="glass-spinner-ring"></div>
  </div>
</template>

<style>
.glass-spinner {
  @apply inline-block relative w-12 h-12;
}

.glass-spinner-ring {
  @apply block w-full h-full;
  @apply border-4 border-t-primary-600 border-r-transparent;
  @apply border-b-transparent border-l-transparent;
  @apply rounded-full;
  @apply animate-spin;
}
</style>
```

### Progress Bar

```vue
<template>
  <div class="glass-progress">
    <div
      class="glass-progress-bar"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<style>
.glass-progress {
  @apply w-full h-2 rounded-full overflow-hidden;
  @apply bg-gray-200/50 dark:bg-gray-800/50;
  @apply backdrop-blur-sm;
}

.glass-progress-bar {
  @apply h-full rounded-full;
  @apply bg-gradient-to-r from-primary-600 to-secondary-600;
  @apply transition-all duration-300 ease-out;
}
</style>
```

---

## Performance Guidelines

### 1. Use Transform and Opacity

```css
/* Good: Hardware accelerated */
.glass-card-interactive {
  @apply hover:scale-105 hover:opacity-90;
  @apply transition-all duration-300;
}

/* Bad: Causes reflow */
.bad-card {
  @apply hover:w-[110%] hover:h-[110%];
}
```

### 2. Limit Concurrent Animations

```css
/* Good: One animation per element */
.glass-btn {
  @apply transition-all duration-200;
  @apply hover:scale-105;
}

/* Avoid: Multiple simultaneous transforms */
.overanimated {
  @apply animate-bounce animate-pulse animate-spin; /* Too much! */
}
```

### 3. Use will-change Sparingly

```css
/* Use only when needed and remove after */
.glass-modal-content {
  will-change: transform, opacity;
}

/* Remove after animation */
.glass-modal-content.is-open {
  will-change: auto;
}
```

### 4. Optimize Blur Animations

```css
/* Avoid: Animating blur is expensive */
.bad-blur {
  @apply hover:backdrop-blur-xl;
  @apply transition-all duration-300;
}

/* Good: Use static blur, animate other properties */
.glass-card {
  @apply backdrop-blur-md; /* Static */
  @apply hover:scale-105; /* Animate transform only */
}
```

### 5. Use requestAnimationFrame

```javascript
// For custom animations
const animateElement = () => {
  requestAnimationFrame(() => {
    element.value.style.transform = `translateY(${scrollY}px)`
  })
}
```

### 6. Debounce Expensive Operations

```javascript
import { useDebounceFn } from '@vueuse/core'

const handleScroll = useDebounceFn(() => {
  // Expensive scroll operation
}, 100)
```

---

## Animation Timing Functions

### Easing Curves

```css
/* Tailwind easing utilities */
.ease-linear     /* linear */
.ease-in         /* cubic-bezier(0.4, 0, 1, 1) */
.ease-out        /* cubic-bezier(0, 0, 0.2, 1) */
.ease-in-out     /* cubic-bezier(0.4, 0, 0.2, 1) */
```

**Custom Easings:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    }
  }
}
```

### Duration Guidelines

- **Micro-interactions**: 150ms (button hover)
- **Small elements**: 200-300ms (card hover, tooltip)
- **Medium elements**: 300-500ms (modal open, drawer)
- **Large elements**: 500-700ms (page transitions)
- **Ambient animations**: 1000ms+ (background effects)

---

**Version:** 1.0.0
**Last Updated:** 2025-01-21
**Animation Patterns:** 25+ documented
