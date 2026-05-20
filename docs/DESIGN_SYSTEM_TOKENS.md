# Design System Tokens - Complete Reference

**Last Updated:** 2025-01-21
**Version:** 1.0.0

## Overview

Design tokens are the atomic values that power the Liquid Glass design system. This document provides a complete reference of all tokens with implementation details.

## Token Architecture

```
Primitive Tokens (Base values: #2563eb, 16px, etc.)
    ↓ used by
Semantic Tokens (primary-600, space-4, etc.)
    ↓ used by
Component Tokens (card-bg, btn-padding, etc.)
    ↓ used by
Vue Components
```

## Color Tokens

### Brand Colors

```javascript
// Primary (Blue)
primary: {
  50: '#eff6ff',   100: '#dbeafe',   200: '#bfdbfe',
  300: '#93c5fd',  400: '#60a5fa',   500: '#3b82f6',
  600: '#2563eb',  700: '#1d4ed8',   800: '#1e40af',
  900: '#1e3a8a'
}

// Secondary (Purple)
secondary: {
  50: '#faf5ff',   100: '#f3e8ff',   200: '#e9d5ff',
  300: '#d8b4fe',  400: '#c084fc',   500: '#a855f7',
  600: '#9333ea',  700: '#7e22ce',   800: '#6b21a8',
  900: '#581c87'
}
```

### Semantic Colors

```javascript
success: { 50: '#f0fdf4', 500: '#10b981', 700: '#047857' }
warning: { 50: '#fefce8', 500: '#f59e0b', 700: '#d97706' }
error:   { 50: '#fef2f2', 500: '#ef4444', 700: '#dc2626' }
info:    { 50: '#eff6ff', 500: '#3b82f6', 700: '#1d4ed8' }
```

### Glass Colors (CSS Variables)

```css
:root {
  --glass-bg-primary: rgba(255, 255, 255, 0.8);
  --glass-bg-secondary: rgba(255, 255, 255, 0.6);
  --glass-border: rgba(255, 255, 255, 0.5);
}

.dark {
  --glass-bg-primary: rgba(17, 24, 39, 0.8);
  --glass-bg-secondary: rgba(31, 41, 55, 0.8);
  --glass-border: rgba(75, 85, 99, 0.5);
}
```

## Typography Tokens

### Font Families

```javascript
fontFamily: {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  mono: ['Fira Code', 'Courier New', 'monospace']
}
```

### Font Sizes

```javascript
fontSize: {
  xs:   ['0.75rem',   { lineHeight: '1rem' }],     // 12px
  sm:   ['0.875rem',  { lineHeight: '1.25rem' }],  // 14px
  base: ['1rem',      { lineHeight: '1.5rem' }],   // 16px
  lg:   ['1.125rem',  { lineHeight: '1.75rem' }],  // 18px
  xl:   ['1.25rem',   { lineHeight: '1.75rem' }],  // 20px
  '2xl': ['1.5rem',   { lineHeight: '2rem' }],     // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
  '4xl': ['2.25rem',  { lineHeight: '2.5rem' }],   // 36px
  '5xl': ['3rem',     { lineHeight: '1' }],        // 48px
  '6xl': ['3.75rem',  { lineHeight: '1' }]         // 60px
}
```

### Font Weights

```javascript
fontWeight: {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700'
}
```

## Spacing Tokens

```javascript
spacing: {
  0: '0',      1: '0.25rem',   2: '0.5rem',    3: '0.75rem',
  4: '1rem',   5: '1.25rem',   6: '1.5rem',    8: '2rem',
  10: '2.5rem', 12: '3rem',    16: '4rem',     20: '5rem',
  24: '6rem'
}
```

**Usage:**
- Inner padding: `p-4` to `p-6`
- Gap between: `gap-4` to `gap-6`
- Section spacing: `py-12` to `py-20`

## Effect Tokens

### Blur

```javascript
backdropBlur: {
  sm: '4px',   md: '8px',   lg: '12px',
  xl: '16px',  '2xl': '24px', '3xl': '32px'
}
```

### Shadow

```javascript
boxShadow: {
  sm:  '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md:  '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg:  '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl:  '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
}
```

### Border Radius

```javascript
borderRadius: {
  sm: '0.375rem',  // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px'
}
```

## Implementation

### Tailwind Config

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { /* blue palette */ },
        secondary: { /* purple palette */ }
      },
      backdropBlur: {
        sm: '4px', md: '8px', lg: '12px'
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
    --glass-bg-primary: rgba(255, 255, 255, 0.8);
    --blur-md: 8px;
  }
  .dark {
    --glass-bg-primary: rgba(17, 24, 39, 0.8);
  }
}
```

### Component Usage

```vue
<div class="bg-primary-600 text-white px-6 py-4 rounded-lg shadow-lg">
  <!-- Uses: color, spacing, radius, shadow tokens -->
</div>
```

## Token Maintenance

### Adding New Tokens
1. Add to Tailwind config
2. Document in this file
3. Update component examples
4. Test in light/dark modes

### Deprecating Tokens
1. Mark as deprecated (comments)
2. Update migration guide
3. Provide replacement
4. Remove after 2 versions

---

**Total Tokens:** 200+
**Categories:** 6 (Color, Typography, Spacing, Effects, Animation, Component)

See [VISUAL_STYLE_GUIDE.md](./VISUAL_STYLE_GUIDE.md) for usage examples.
