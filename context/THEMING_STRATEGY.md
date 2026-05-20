# Theming Strategy - Light & Dark Mode Implementation

## Table of Contents

1. [Theme Architecture](#theme-architecture)
2. [Implementation Approach](#implementation-approach)
3. [Dark Mode Configuration](#dark-mode-configuration)
4. [Theme Toggle System](#theme-toggle-system)
5. [Component Theming](#component-theming)
6. [Best Practices](#best-practices)

---

## Theme Architecture

### Theme System Overview

```
User Preference
    │
    ▼
localStorage / System Preference
    │
    ▼
Theme Controller (Vue Composable)
    │
    ▼
HTML Class Toggle (<html class="dark">)
    │
    ▼
Tailwind dark: Variants
    │
    ▼
CSS Custom Properties Update
    │
    ▼
Component Re-render (Reactive)
```

### Strategy: Class-Based Dark Mode

We use Tailwind's `class` strategy for dark mode, allowing programmatic control:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // class-based strategy
  // ...
}
```

**Benefits:**
- Full control over theme switching
- Persistent user preference
- No flash of unstyled content
- Works with SSR

---

## Implementation Approach

### 1. Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', /* ... */ 900: '#1e3a8a' },
        secondary: { 50: '#faf5ff', /* ... */ 900: '#581c87' },
      }
    }
  }
}
```

### 2. Theme Composable

```javascript
// src/composables/useTheme.js
import { ref, onMounted, watch } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  const setTheme = (dark) => {
    isDark.value = dark
  }

  const updateDOM = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const savePreference = () => {
    localStorage.setItem('geek-digital-theme', isDark.value ? 'dark' : 'light')
  }

  const loadPreference = () => {
    const saved = localStorage.getItem('geek-digital-theme')

    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      // Respect system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  // Watch for changes
  watch(isDark, () => {
    updateDOM()
    savePreference()
  })

  // Initialize on mount
  onMounted(() => {
    loadPreference()
    updateDOM()
  })

  return {
    isDark,
    toggleTheme,
    setTheme
  }
}
```

### 3. App-Level Integration

```vue
<!-- App.vue -->
<script setup>
import { useTheme } from '@/composables/useTheme'
import { useAuthStore } from '@/store/modules/auth'
import { onMounted } from 'vue'

const { isDark, toggleTheme } = useTheme()
const authStore = useAuthStore()

onMounted(async () => {
  await authStore.initializeAuth()
})
</script>

<template>
  <router-view />
</template>
```

### 4. Theme Toggle Component

```vue
<!-- components/ThemeToggle.vue -->
<template>
  <button
    @click="toggleTheme"
    class="glass-btn-icon"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Sun icon (show in dark mode) -->
    <svg
      v-if="isDark"
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- Moon icon (show in light mode) -->
    <svg
      v-else
      class="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>
```

### 5. Integration in Navbar

```vue
<!-- components/layout/Navbar.vue -->
<template>
  <nav class="glass-nav">
    <div class="glass-nav-container">
      <!-- Logo and links -->

      <div class="glass-nav-actions">
        <!-- Theme toggle -->
        <ThemeToggle />

        <!-- Cart, User menu, etc. -->
      </div>
    </div>
  </nav>
</template>

<script setup>
import ThemeToggle from '@/components/ThemeToggle.vue'
// ...
</script>
```

---

## Dark Mode Configuration

### CSS Custom Properties Strategy

```css
/* src/assets/main.css */
@layer base {
  :root {
    /* Light mode variables */
    --color-bg-primary: 255 255 255;
    --color-bg-secondary: 249 250 251;

    --color-text-primary: 17 24 39;
    --color-text-secondary: 75 85 99;

    --glass-bg-primary: rgba(255, 255, 255, 0.8);
    --glass-border: rgba(255, 255, 255, 0.5);
  }

  .dark {
    /* Dark mode variables */
    --color-bg-primary: 17 24 39;
    --color-bg-secondary: 31 41 55;

    --color-text-primary: 243 244 246;
    --color-text-secondary: 209 213 219;

    --glass-bg-primary: rgba(17, 24, 39, 0.8);
    --glass-border: rgba(75, 85, 99, 0.5);
  }

  body {
    @apply bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100;
    @apply transition-colors duration-200;
  }
}
```

### Tailwind dark: Variant Usage

```css
/* Component classes */
@layer components {
  .glass-card {
    @apply bg-white/80 dark:bg-gray-900/80;
    @apply border-white/50 dark:border-gray-700/50;
    @apply text-gray-900 dark:text-gray-100;
  }

  .glass-btn-primary {
    @apply bg-gradient-to-r from-primary-600 to-primary-700;
    @apply hover:from-primary-700 hover:to-primary-800;
    @apply focus:ring-primary-300 dark:focus:ring-primary-800;
  }
}
```

---

## Component Theming

### Glass Components Dark Mode

**Cards:**
```css
.glass-card {
  /* Light mode */
  @apply bg-white/80 backdrop-blur-md;
  @apply border border-white/50;
  @apply shadow-lg;

  /* Dark mode */
  @apply dark:bg-gray-900/80;
  @apply dark:border-gray-700/50;
  @apply dark:shadow-dark-lg;
}
```

**Buttons:**
```css
.glass-btn-outline {
  /* Light mode */
  @apply bg-white/50 border-gray-300 text-gray-700;
  @apply hover:bg-white/80 hover:border-gray-400;

  /* Dark mode */
  @apply dark:bg-gray-900/50 dark:border-gray-600 dark:text-gray-300;
  @apply dark:hover:bg-gray-800/50 dark:hover:border-gray-500;
}
```

**Inputs:**
```css
.glass-input {
  /* Light mode */
  @apply bg-white/50 border-gray-300;
  @apply text-gray-900 placeholder:text-gray-400;
  @apply focus:bg-white/70;

  /* Dark mode */
  @apply dark:bg-gray-900/50 dark:border-gray-600;
  @apply dark:text-gray-100 dark:placeholder:text-gray-500;
  @apply dark:focus:bg-gray-900/70;
}
```

**Navigation:**
```css
.glass-nav {
  /* Light mode */
  @apply bg-white/80 backdrop-blur-md;
  @apply border-b border-white/50;

  /* Dark mode */
  @apply dark:bg-gray-900/80;
  @apply dark:border-b dark:border-gray-700/50;
}

.glass-nav-link {
  /* Light mode */
  @apply text-gray-700 hover:text-primary-600;

  /* Dark mode */
  @apply dark:text-gray-300 dark:hover:text-primary-400;
}
```

### Page-Specific Theming

**Home Hero:**
```css
.glass-header-ambient {
  /* Light mode */
  @apply bg-gradient-to-br from-primary-100 via-secondary-50 to-primary-50;

  /* Dark mode */
  @apply dark:from-gray-900 dark:via-primary-900/20 dark:to-secondary-900/20;
}

.glass-header-title {
  /* Light mode */
  @apply from-primary-600 to-secondary-600;

  /* Dark mode */
  @apply dark:from-primary-400 dark:to-secondary-400;
}
```

**Dashboard Stats:**
```css
.glass-stat-value {
  /* Primary stat */
  @apply text-primary-600 dark:text-primary-400;
}

.glass-stat-icon-primary {
  /* Light mode */
  @apply bg-gradient-to-br from-primary-100 to-primary-200;
  @apply text-primary-600 border-primary-200;

  /* Dark mode */
  @apply dark:from-primary-900/50 dark:to-primary-800/50;
  @apply dark:text-primary-400 dark:border-primary-800;
}
```

---

## Best Practices

### 1. Always Provide Dark Variants

```css
/* Good: Both modes defined */
.glass-card {
  @apply bg-white/80 dark:bg-gray-900/80;
}

/* Bad: Missing dark mode */
.glass-card {
  @apply bg-white/80;
}
```

### 2. Test Contrast in Both Modes

```css
/* Ensure readability */
.glass-card-title {
  @apply text-gray-900 dark:text-gray-100; /* High contrast both modes */
}

.glass-card-description {
  @apply text-gray-600 dark:text-gray-400; /* Medium contrast both modes */
}
```

### 3. Use Semantic Color Names

```css
/* Good: Semantic naming */
@apply text-primary-600 dark:text-primary-400;

/* Bad: Hardcoded values */
@apply text-blue-600 dark:text-blue-400;
```

### 4. Transition Smoothly

```css
/* Add transition to avoid jarring theme switches */
.glass-card {
  @apply transition-colors duration-200;
}

body {
  @apply transition-colors duration-200;
}
```

### 5. Respect System Preferences

```javascript
// Initialize with system preference if no saved preference
const loadPreference = () => {
  const saved = localStorage.getItem('geek-digital-theme')

  if (saved) {
    isDark.value = saved === 'dark'
  } else {
    // Fallback to system preference
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}
```

### 6. Provide Manual Override

```vue
<!-- Allow users to choose regardless of system -->
<select v-model="themePreference" @change="applyTheme">
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="system">System</option>
</select>
```

### 7. Test Glass Effects in Both Modes

```css
/* Ensure glass effect works in both themes */
.glass-card {
  @apply backdrop-blur-md; /* Works in both */
  @apply bg-white/80 dark:bg-gray-900/80; /* Appropriate opacity */
}
```

### 8. Consider Gradient Adjustments

```css
/* Gradients may need different colors in dark mode */
.glass-btn-primary {
  @apply bg-gradient-to-r from-primary-600 to-primary-700;
  /* Often works in dark mode too, but test visually */
}

.glass-header-ambient {
  /* Definitely needs dark variant */
  @apply bg-gradient-to-br from-primary-100 to-secondary-50;
  @apply dark:from-gray-900 dark:to-primary-900/20;
}
```

---

## Accessibility Considerations

### 1. Contrast Ratios

```css
/* Maintain WCAG AA compliance (4.5:1 for normal text) */
.glass-card-title {
  @apply text-gray-900 dark:text-gray-100; /* High contrast */
}

.glass-card-body {
  @apply text-gray-700 dark:text-gray-300; /* Medium contrast */
}
```

### 2. Focus Indicators

```css
/* Visible focus in both modes */
.glass-btn-primary:focus {
  @apply ring-4 ring-primary-300 dark:ring-primary-800;
}

.glass-input:focus {
  @apply ring-2 ring-primary-500; /* Works in both modes */
}
```

### 3. Color Blindness

```css
/* Don't rely solely on color changes */
.glass-nav-link-active {
  @apply text-primary-600 dark:text-primary-400;
  /* Also add underline or other visual indicator */
}

.glass-nav-link-active::after {
  @apply content-[''] absolute -bottom-1 left-0 w-full h-0.5;
  @apply bg-gradient-to-r from-primary-600 to-secondary-600;
}
```

---

## Testing Checklist

- [ ] All components have dark mode variants
- [ ] Contrast ratios meet WCAG AA in both modes
- [ ] Focus indicators visible in both modes
- [ ] Theme preference persists across sessions
- [ ] System preference respected on first visit
- [ ] No flash of unstyled content
- [ ] Glass effects work in both modes
- [ ] Gradients appropriate for both modes
- [ ] Transitions smooth when switching themes
- [ ] All text readable in both modes

---

**Version:** 1.0.0
**Last Updated:** 2025-01-21
**Maintained by:** GeekDigital Design System Team
