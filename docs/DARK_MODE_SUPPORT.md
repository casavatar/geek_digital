# Dark Mode Support - Implementation Guide

**Last Updated:** 2025-01-21
**Version:** 1.0.0

## Overview

Comprehensive guide for implementing and maintaining dark mode parity in the Liquid Glass design system.

## Implementation Strategy

### Class-Based Approach

```javascript
// tailwind.config.js
export default {
  darkMode: 'class'  // Toggle via HTML class
}
```

**Benefits:**

- Full programmatic control
- Persistent user preference
- No flash of unstyled content
- SSR compatible

## Theme Controller

### Vue Composable

```javascript
// src/composables/useTheme.js
import { ref, watch, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const updateDOM = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const savePreference = () => {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  const loadPreference = () => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  watch(isDark, () => {
    updateDOM()
    savePreference()
  })

  onMounted(() => {
    loadPreference()
    updateDOM()
  })

  return { isDark, toggleTheme }
}
```

### Theme Toggle Component

```vue
<!-- components/ThemeToggle.vue -->
<template>
  <button
    @click="toggleTheme"
    class="glass-btn-icon"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sun icon (light mode) -->
    <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>

    <!-- Moon icon (dark mode) -->
    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'
const { isDark, toggleTheme } = useTheme()
</script>
```

## Component Theming Patterns

### Glass Components

```css
.glass-card {
  /* Light mode */
  @apply bg-white/80 backdrop-blur-md;
  @apply border-white/50 shadow-lg;

  /* Dark mode */
  @apply dark:bg-gray-900/80;
  @apply dark:border-gray-700/50;
}
```

### Text Colors

```css
.glass-card-title {
  @apply text-gray-900 dark:text-gray-100;
}

.glass-card-description {
  @apply text-gray-600 dark:text-gray-400;
}
```

### Buttons

```css
.glass-btn-outline {
  @apply bg-white/50 dark:bg-gray-900/50;
  @apply border-gray-300 dark:border-gray-600;
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:bg-white/80 dark:hover:bg-gray-800/50;
}
```

## Contrast Requirements

### WCAG AA Compliance

**Light Mode:**
- text-gray-900 on bg-white: 14.3:1 ✅
- text-gray-700 on bg-white: 7.0:1 ✅
- text-gray-600 on bg-white: 4.5:1 ✅

**Dark Mode:**
- text-gray-100 on bg-gray-900: 15.8:1 ✅
- text-gray-300 on bg-gray-900: 8.6:1 ✅
- text-gray-400 on bg-gray-900: 4.6:1 ✅

## Testing Checklist

- [ ] All components have dark: variants
- [ ] Contrast ratios meet WCAG AA
- [ ] Focus indicators visible
- [ ] Theme persists across sessions
- [ ] System preference respected
- [ ] No flash on page load
- [ ] Glass effects work properly
- [ ] Gradients appropriate
- [ ] Smooth transitions

## Common Pitfalls

### Problem: Missing dark variants

```css
/* Bad */
.card { @apply bg-white; }

/* Good */
.card { @apply bg-white dark:bg-gray-900; }
```

### Problem: Low contrast in dark mode

```css
/* Bad */
.text { @apply text-gray-500 dark:text-gray-500; }

/* Good */
.text { @apply text-gray-600 dark:text-gray-400; }
```

### Problem: Invisible borders

```css
/* Bad */
.card { @apply border-gray-200; }

/* Good */
.card { @apply border-gray-200 dark:border-gray-700; }
```

## Performance Optimization

```css
/* Add smooth transitions */
body {
  @apply transition-colors duration-200;
}

/* Prevent animation during theme switch */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
```

## Browser Support

- Chrome/Edge 76+ ✅
- Firefox 67+ ✅
- Safari 12.1+ ✅

---

See [VISUAL_STYLE_GUIDE.md](./VISUAL_STYLE_GUIDE.md) for color guidelines.
