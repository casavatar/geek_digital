# Design Tokens - Liquid Glass Token System

## Table of Contents

1. [Token System Overview](#token-system-overview)
2. [Color Tokens](#color-tokens)
3. [Typography Tokens](#typography-tokens)
4. [Spacing Tokens](#spacing-tokens)
5. [Effect Tokens](#effect-tokens)
6. [Component Tokens](#component-tokens)
7. [Implementation Guide](#implementation-guide)

---

## Token System Overview

Design tokens are the atomic visual design decisions that make up the Liquid Glass design system. They provide a single source of truth for all visual properties and enable consistent theming across the application.

### Token Architecture

```
Design Tokens
├── Primitive Tokens (Colors, Sizes, etc.)
│   └── Used by: Semantic Tokens
├── Semantic Tokens (Primary, Secondary, etc.)
│   └── Used by: Component Tokens
└── Component Tokens (Card BG, Button Text, etc.)
    └── Used by: Vue Components
```

### Implementation Layers

1. **CSS Custom Properties** (`--token-name`) - Runtime values
2. **Tailwind Config** - Build-time compilation
3. **Component Classes** - Reusable patterns
4. **Vue Components** - Application usage

---

## Color Tokens

### Brand Color Palette

#### Primary (Blue)
```javascript
primary: {
  50: '#eff6ff',   // Lightest - backgrounds
  100: '#dbeafe',  // Light - hover states
  200: '#bfdbfe',  //
  300: '#93c5fd',  //
  400: '#60a5fa',  //
  500: '#3b82f6',  // Base primary
  600: '#2563eb',  // Primary action (buttons)
  700: '#1d4ed8',  // Primary hover
  800: '#1e40af',  // Primary pressed
  900: '#1e3a8a',  // Darkest
}
```

**Usage:**
- Buttons: `from-primary-600 to-primary-700`
- Links: `text-primary-600 dark:text-primary-400`
- Icons: `text-primary-600`
- Backgrounds: `bg-primary-50` (light), `bg-primary-900` (dark)

#### Secondary (Purple)
```javascript
secondary: {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',  // Base secondary
  600: '#9333ea',  // Secondary action
  700: '#7e22ce',  // Secondary hover
  800: '#6b21a8',
  900: '#581c87',
}
```

**Usage:**
- Accent elements
- Secondary CTAs
- Gradient endpoints
- Badge variants

### Glass Background Tokens

```css
/* CSS Custom Properties */
:root {
  /* Light Mode Glass */
  --glass-bg-primary: rgba(255, 255, 255, 0.8);
  --glass-bg-secondary: rgba(255, 255, 255, 0.6);
  --glass-bg-tertiary: rgba(255, 255, 255, 0.4);

  /* Dark Mode Glass */
  --glass-bg-primary-dark: rgba(17, 24, 39, 0.8);
  --glass-bg-secondary-dark: rgba(31, 41, 55, 0.8);
  --glass-bg-tertiary-dark: rgba(55, 65, 81, 0.7);
}
```

**Tailwind Implementation:**
```css
.glass-card {
  @apply bg-white/80 dark:bg-gray-900/80;
}
```

### Border Tokens

```css
:root {
  /* Light Mode Borders */
  --glass-border-light: rgba(255, 255, 255, 0.5);
  --glass-border-medium: rgba(255, 255, 255, 0.3);
  --glass-border-dark: rgba(209, 213, 219, 0.3);

  /* Dark Mode Borders */
  --glass-border-light-dark: rgba(75, 85, 99, 0.5);
  --glass-border-medium-dark: rgba(55, 65, 81, 0.5);
  --glass-border-dark-dark: rgba(31, 41, 55, 0.5);
}
```

**Usage:**
```css
.glass-card {
  @apply border border-white/50 dark:border-gray-700/50;
}
```

### Text Color Tokens

```css
:root {
  /* Light Mode Text */
  --text-primary: rgb(17, 24, 39);        /* gray-900 */
  --text-secondary: rgb(75, 85, 99);      /* gray-600 */
  --text-tertiary: rgb(156, 163, 175);    /* gray-400 */

  /* Dark Mode Text */
  --text-primary-dark: rgb(243, 244, 246); /* gray-100 */
  --text-secondary-dark: rgb(209, 213, 219); /* gray-300 */
  --text-tertiary-dark: rgb(156, 163, 175); /* gray-400 */
}
```

**Tailwind Usage:**
```css
.glass-card-title {
  @apply text-gray-900 dark:text-gray-100;
}

.glass-card-description {
  @apply text-gray-600 dark:text-gray-400;
}
```

### Semantic Color Tokens

```javascript
// Feedback colors
colors: {
  success: {
    50: '#f0fdf4',
    500: '#10b981',
    700: '#047857',
  },
  warning: {
    50: '#fefce8',
    500: '#f59e0b',
    700: '#d97706',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    700: '#dc2626',
  },
  info: {
    50: '#eff6ff',
    500: '#3b82f6',
    700: '#1d4ed8',
  }
}
```

---

## Typography Tokens

### Font Families

```javascript
fontFamily: {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  mono: ['Fira Code', 'Courier New', 'monospace'],
}
```

**CSS Variables:**
```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
}
```

### Font Size Scale

```javascript
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
  sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
  base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
  lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
  xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
  '5xl': ['3rem', { lineHeight: '1' }],           // 48px
  '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
}
```

**Usage Guidelines:**
- Body text: `text-base` (16px)
- Small text: `text-sm` (14px)
- Tiny text: `text-xs` (12px)
- H1: `text-4xl` or `text-5xl`
- H2: `text-3xl`
- H3: `text-2xl`
- H4: `text-xl`

### Font Weight Tokens

```javascript
fontWeight: {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}
```

**Usage:**
- Body text: `font-normal` (400)
- Emphasis: `font-medium` (500)
- Headings: `font-semibold` (600) or `font-bold` (700)
- Buttons: `font-medium` (500)

### Line Height Tokens

```javascript
lineHeight: {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
}
```

---

## Spacing Tokens

### Spacing Scale (4px base unit)

```javascript
spacing: {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
}
```

**Usage Guidelines:**
- Inner padding: `p-4` to `p-6`
- Gap between elements: `gap-4` to `gap-6`
- Section padding: `py-12` to `py-20`
- Margins: Use sparingly, prefer gap/padding

### Border Radius Tokens

```javascript
borderRadius: {
  none: '0',
  sm: '0.375rem',   // 6px
  DEFAULT: '0.5rem', // 8px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  full: '9999px',   // Circles/pills
}
```

**Usage:**
- Buttons: `rounded-lg` (12px)
- Cards: `rounded-xl` (16px)
- Modals: `rounded-2xl` (24px)
- Badges: `rounded-full`
- Inputs: `rounded-lg` (12px)

---

## Effect Tokens

### Shadow Tokens

```javascript
boxShadow: {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
}
```

**Dark Mode Shadows:**
```javascript
// Darker shadows for dark mode
boxShadow: {
  'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
  'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.6)',
  'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.7)',
}
```

**Usage:**
```css
.glass-card {
  @apply shadow-lg dark:shadow-dark-lg;
}
```

### Blur Tokens

```javascript
backdropBlur: {
  none: '0',
  sm: '4px',
  DEFAULT: '8px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
}
```

**Usage:**
- Standard cards: `backdrop-blur-md` (8px)
- Navbar: `backdrop-blur-md` (8px)
- Modals: `backdrop-blur-xl` (16px)
- Overlays: `backdrop-blur-sm` (4px)

**Performance Consideration:** Prefer `md` (8px) over larger values for better performance.

### Opacity Tokens

```javascript
opacity: {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
}
```

**Glass Effect Usage:**
- Primary glass: `bg-white/80` (80% opacity)
- Secondary glass: `bg-white/60` (60% opacity)
- Borders: `border-white/50` (50% opacity)

---

## Component Tokens

### Button Tokens

```css
/* Button Sizes */
.glass-btn-sm {
  @apply px-3 py-1.5 text-sm;
}

.glass-btn {
  @apply px-6 py-2.5 text-base;
}

.glass-btn-lg {
  @apply px-8 py-3 text-lg;
}

/* Button Colors */
--btn-primary-from: theme('colors.primary.600');
--btn-primary-to: theme('colors.primary.700');
--btn-primary-hover-from: theme('colors.primary.700');
--btn-primary-hover-to: theme('colors.primary.800');
```

### Card Tokens

```css
/* Card Spacing */
--card-padding: theme('spacing.6');
--card-gap: theme('spacing.4');

/* Card Effects */
--card-bg: rgba(255, 255, 255, 0.8);
--card-border: rgba(255, 255, 255, 0.5);
--card-blur: 8px;
--card-shadow: theme('boxShadow.lg');

/* Dark Mode */
.dark {
  --card-bg: rgba(17, 24, 39, 0.8);
  --card-border: rgba(75, 85, 99, 0.5);
}
```

### Input Tokens

```css
/* Input Sizing */
--input-height-sm: 2rem;
--input-height: 2.75rem;
--input-height-lg: 3.5rem;

/* Input Colors */
--input-bg: rgba(255, 255, 255, 0.5);
--input-border: theme('colors.gray.300');
--input-focus-ring: theme('colors.primary.500');

/* Dark Mode */
.dark {
  --input-bg: rgba(17, 24, 39, 0.5);
  --input-border: theme('colors.gray.600');
}
```

---

## Implementation Guide

### Tailwind Config Setup

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { /* ... */ },
        secondary: { /* ... */ },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'glass-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'glass-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      }
    }
  }
}
```

### CSS Custom Properties

```css
/* src/assets/main.css */
@layer base {
  :root {
    /* Glass backgrounds */
    --glass-bg-primary: rgba(255, 255, 255, 0.8);
    --glass-bg-secondary: rgba(255, 255, 255, 0.6);

    /* Borders */
    --glass-border-light: rgba(255, 255, 255, 0.5);
    --glass-border-dark: rgba(209, 213, 219, 0.3);

    /* Blur */
    --blur-sm: 4px;
    --blur-md: 8px;
    --blur-lg: 12px;
  }

  .dark {
    --glass-bg-primary: rgba(17, 24, 39, 0.8);
    --glass-bg-secondary: rgba(31, 41, 55, 0.8);
    --glass-border-light: rgba(75, 85, 99, 0.5);
    --glass-border-dark: rgba(31, 41, 55, 0.5);
  }
}
```

### Component Usage

```vue
<template>
  <div class="glass-card">
    <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
      Card Title
    </h3>
    <p class="text-base text-gray-600 dark:text-gray-400">
      Card description
    </p>
    <button class="glass-btn-primary mt-4">
      Action
    </button>
  </div>
</template>
```

### Token Reference in Code

```javascript
// Access tokens programmatically
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)
const primaryColor = fullConfig.theme.colors.primary[600]
```

---

**Version:** 1.0.0
**Last Updated:** 2025-01-21
**Total Tokens:** 200+ design tokens defined
