# Glass Card Utility System

## Overview

The `.glass-card` utility class provides a consistent Liquid Glass (Glassmorphism) design pattern across the entire dashboard, ensuring uniform vertical padding (`py-5`), visual hierarchy, and professional-grade aesthetics.

---

## Available Classes

### 1. **`.glass-card`** (Default)

The standard glass card with balanced spacing for most use cases.

**Specifications:**

- **Padding**: `py-5 px-6` (1.25rem vertical, 1.5rem horizontal)
- **Background**: `bg-white/20 dark:bg-gray-800/30` (normalized opacity)
- **Backdrop**: `backdrop-blur-xl backdrop-saturate-150`
- **Border**: `border-gray-200/40 dark:border-gray-700/40`
- **Shadows**: `shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40` with hover effect `hover:shadow-2xl`
- **Border Radius**: `rounded-2xl` (1rem)
- **Transitions**: `transition-all duration-300`
- **Hover Effects**: `hover:scale-[1.03] hover:brightness-110`

**Usage Example:**

```vue
<template>
  <div class="glass-card">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Analytics Overview</h3>
    <p class="text-sm text-gray-600 dark:text-gray-300">Your performance metrics for this month.</p>
  </div>
</template>
```

---

### 2. **`.glass-card-compact`**

A more condensed version for tight layouts or sidebar widgets.

**Specifications:**

- **Padding**: `py-4 px-5` (1rem vertical, 1.25rem horizontal)
- Inherits all other `.glass-card` properties

**Usage Example:**

```vue
<template>
  <div class="glass-card-compact">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-200">Total Users</span>
      <span class="text-2xl font-bold text-gray-900 dark:text-white">1,247</span>
    </div>
  </div>
</template>
```

---

### 3. **`.glass-card-lg`**

Larger card with extra padding for prominent sections or feature highlights.

**Specifications:**

- **Padding**: `py-6 px-8` (1.5rem vertical, 2rem horizontal)
- Inherits all other `.glass-card` properties

**Usage Example:**

```vue
<template>
  <div class="glass-card-lg">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Featured Project</h2>
    <p class="text-base text-gray-600 dark:text-gray-300 mb-5">
      Full-stack analytics dashboard with real-time data visualization.
    </p>
    <button class="btn-primary">View Details</button>
  </div>
</template>
```

---

## Design Principles

### 1. **Consistent Vertical Rhythm**

All glass cards use multiples of `0.25rem` (Tailwind's spacing scale) to maintain vertical harmony:

- Compact: `py-4` (1rem)
- Default: `py-5` (1.25rem)
- Large: `py-6` (1.5rem)

### 2. **Spacing Between Elements**

Use `space-y-5` or `gap-5` for consistent separation between sibling glass cards:

```vue
<div class="space-y-5">
  <div class="glass-card">Card 1</div>
  <div class="glass-card">Card 2</div>
  <div class="glass-card">Card 3</div>
</div>
```

### 3. **Avoid Redundant Padding**

Never nest multiple `py-*` utilities inside a `.glass-card`:

❌ **Incorrect:**

```vue
<div class="glass-card">
  <div class="py-5"> <!-- Redundant padding -->
    Content
  </div>
</div>
```

✅ **Correct:**

```vue
<div class="glass-card">
  <div class="space-y-3"> <!-- Use spacing utilities instead -->
    Content
  </div>
</div>
```

---

## Grid Layouts with Glass Cards

For responsive grid systems (charts, stats, etc.), combine with Tailwind grid utilities:

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    <div class="glass-card">
      <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Revenue</h4>
      <p class="text-3xl font-bold text-gray-900 dark:text-white">$24,580</p>
    </div>

    <div class="glass-card">
      <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Users</h4>
      <p class="text-3xl font-bold text-gray-900 dark:text-white">1,847</p>
    </div>

    <div class="glass-card">
      <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Conversion</h4>
      <p class="text-3xl font-bold text-gray-900 dark:text-white">3.2%</p>
    </div>
  </div>
</template>
```

---

## Accessibility Considerations

1. **Focus States**: Glass cards automatically inherit focus-visible styles from Tailwind
2. **Color Contrast**: Test text contrast against glass backgrounds (WCAG AA minimum)
3. **Interactive Cards**: Add appropriate ARIA attributes and keyboard navigation:

```vue
<button class="glass-card text-left w-full focus:ring-2 focus:ring-blue-500/50">
  <span class="sr-only">View analytics details</span>
  <h3>Analytics</h3>
</button>
```

---

## Dark Mode Behavior

All glass cards automatically adapt to dark mode via Tailwind's `dark:` variant:

- **Light Mode**: `bg-white/20` with `border-gray-200/40` and `shadow-gray-900/20`
- **Dark Mode**: `bg-gray-800/30` with `border-gray-700/40` and `shadow-gray-950/40`

No additional configuration required. The normalized opacity values ensure consistent visual hierarchy across both themes.

---

## Performance Notes

- **Backdrop filters** (`backdrop-blur-xl`) may impact performance on older devices
- Use `will-change-transform` for animated glass cards if necessary
- Consider reducing blur intensity on mobile for better performance:

```vue
<div class="glass-card backdrop-blur-md lg:backdrop-blur-xl">
  <!-- Lighter blur on mobile, full blur on desktop -->
</div>
```

---

## Examples in DashboardLayout

The main layout uses consistent `py-5` spacing:

```vue
<!-- Main content container -->
<main class="flex-1 overflow-y-auto scroll-smooth">
  <div class="px-6 sm:px-8 lg:px-10 py-5 space-y-5">
    <!-- All child components inherit this rhythm -->
    <router-view />
  </div>
</main>
```

---

## Migration Guide

To convert existing cards to the glass-card system:

**Before:**

```vue
<div class="bg-white dark:bg-gray-800 p-6 rounded-xl border shadow-lg">
  Content
</div>
```

**After (with normalized liquid glass pattern):**

```vue
<div class="glass-card">
  Content
</div>

<!-- Or inline for custom cases: -->
<div class="relative overflow-hidden rounded-2xl p-6 bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150 border border-gray-200/40 dark:border-gray-700/40 shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40 transition-all duration-300 hover:scale-[1.03] hover:brightness-110">
  Content
</div>
```

---

## Summary

- Use `.glass-card` for standard containers
- Use `.glass-card-compact` for condensed layouts
- Use `.glass-card-lg` for prominent sections
- Maintain `space-y-5` or `gap-5` between siblings
- Avoid nested padding utilities
- All classes support dark mode automatically
- **Normalized opacity values**: `/20` (light mode bg), `/30` (dark mode bg), `/40` (borders, gradients)
- **Enhanced shadows**: `shadow-xl` with proper color values for depth
- **Hover effects**: `hover:scale-[1.03]` and `hover:brightness-110` for interactivity

For questions or enhancements, refer to [DashboardLayout.vue](../src/layouts/DashboardLayout.vue), [main.css](../src/assets/main.css), and [LIQUID_GLASS_VIEW_FORMAT.md](../context/LIQUID_GLASS_VIEW_FORMAT.md).
