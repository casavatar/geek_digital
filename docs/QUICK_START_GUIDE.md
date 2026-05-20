# Quick Start Guide - Liquid Glass in 5 Minutes

**Last Updated:** 2025-01-21
**Version:** 1.0.0

## Setup (2 minutes)

### 1. Install Dependencies

```bash
cd C:\Users\ingek\OneDrive\Documents\Desarrollo\Vue\geek_digital
npm install
```

### 2. Verify Tailwind Config

```javascript
// tailwind.config.js - Should include:
export default {
  darkMode: 'class',
  theme: {
    extend: {
      backdropBlur: {
        sm: '4px', md: '8px', lg: '12px'
      }
    }
  }
}
```

### 3. Check Glass Classes Available

```bash
npm run dev
# Open DevTools → inspect any element → try typing "glass-" to see autocomplete
```

## First Component (3 minutes)

### Create a Glass Card

```vue
<!-- src/components/MyFirstGlassCard.vue -->
<template>
  <div class="glass-card">
    <div class="glass-card-header">
      <h3 class="glass-card-title">My First Glass Card</h3>
      <span class="glass-badge glass-badge-success">Active</span>
    </div>

    <div class="glass-card-body">
      <p class="text-gray-700 dark:text-gray-300">
        This is a glassmorphism card with backdrop blur and semi-transparency.
      </p>
    </div>

    <div class="glass-card-footer">
      <button class="glass-btn-outline">Cancel</button>
      <button class="glass-btn-primary">Save</button>
    </div>
  </div>
</template>
```

### Use in a Page

```vue
<!-- src/pages/Test.vue -->
<template>
  <div class="glass-section">
    <div class="glass-container">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Test Page
      </h1>

      <div class="glass-grid">
        <MyFirstGlassCard />
        <MyFirstGlassCard />
        <MyFirstGlassCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import MyFirstGlassCard from '@/components/MyFirstGlassCard.vue'
</script>
```

## Common Patterns Cheatsheet

### Buttons

```vue
<!-- Primary action -->
<button class="glass-btn-primary">Save Changes</button>

<!-- Secondary action -->
<button class="glass-btn-secondary">Alternative</button>

<!-- Outline button -->
<button class="glass-btn-outline">Cancel</button>

<!-- Ghost button -->
<button class="glass-btn-ghost">Subtle Action</button>

<!-- Icon button -->
<button class="glass-btn-icon">
  <svg class="w-5 h-5">...</svg>
</button>
```

### Form Inputs

```vue
<div class="glass-input-group">
  <label class="glass-label">Email</label>
  <input
    type="email"
    class="glass-input"
    placeholder="user@example.com"
    v-model="email"
  />
  <span class="glass-input-hint">We'll never share your email</span>
</div>
```

### Cards

```vue
<!-- Standard card -->
<div class="glass-card">
  <div class="glass-card-body">
    Content
  </div>
</div>

<!-- Interactive card (clickable) -->
<div class="glass-card-interactive" @click="handleClick">
  <div class="glass-card-body">
    Click me!
  </div>
</div>

<!-- Elevated card (more prominent) -->
<div class="glass-card-elevated">
  <div class="glass-card-body">
    Important content
  </div>
</div>
```

### Badges

```vue
<span class="glass-badge glass-badge-primary">Primary</span>
<span class="glass-badge glass-badge-success">Success</span>
<span class="glass-badge glass-badge-warning">Warning</span>
<span class="glass-badge glass-badge-error">Error</span>
```

### Grid Layouts

```vue
<!-- 3-column grid (responsive) -->
<div class="glass-grid">
  <div class="glass-card">Item 1</div>
  <div class="glass-card">Item 2</div>
  <div class="glass-card">Item 3</div>
</div>

<!-- 2-column grid -->
<div class="glass-grid-2">
  <aside class="glass-card">Sidebar</aside>
  <main class="glass-card">Main</main>
</div>

<!-- 4-column grid -->
<div class="glass-grid-4">
  <div class="glass-card">1</div>
  <div class="glass-card">2</div>
  <div class="glass-card">3</div>
  <div class="glass-card">4</div>
</div>
```

### Dark Mode

```vue
<!-- Text colors -->
<p class="text-gray-900 dark:text-gray-100">Primary text</p>
<p class="text-gray-600 dark:text-gray-400">Secondary text</p>

<!-- Backgrounds -->
<div class="bg-white dark:bg-gray-900">Content</div>

<!-- Borders -->
<div class="border border-gray-200 dark:border-gray-700">Content</div>
```

## Troubleshooting

### Issue: Glass effect not visible

**Solution:**
```bash
# Verify backdrop-blur is in Tailwind config
# Check browser supports backdrop-filter (Chrome 76+, Firefox 103+, Safari 15.4+)
```

### Issue: Dark mode not working

**Solution:**
```javascript
// Add to tailwind.config.js
export default {
  darkMode: 'class'  // Make sure this is set
}

// Toggle dark mode
document.documentElement.classList.add('dark')
```

### Issue: Classes not applying

**Solution:**
```bash
# Rebuild Tailwind
npm run dev

# Check main.css has @tailwind directives
# Verify component classes in @layer components
```

### Issue: Borders not visible

**Solution:**
```vue
<!-- Increase border opacity for dark mode -->
<div class="border border-white/50 dark:border-gray-700/60">
  <!-- Try 60% or 70% opacity instead of 50% -->
</div>
```

### Issue: Text too hard to read

**Solution:**
```vue
<!-- Increase background opacity -->
<div class="glass-card bg-white/90 dark:bg-gray-900/90">
  <!-- Use 90% instead of 80% for better readability -->
</div>
```

## Next Steps

1. **Read Full Guides:**
   - [VISUAL_STYLE_GUIDE.md](./VISUAL_STYLE_GUIDE.md) - Complete design reference
   - [COMPONENT_ARCHITECTURE.md](./COMPONENT_ARCHITECTURE.md) - Component details
   - [DARK_MODE_SUPPORT.md](./DARK_MODE_SUPPORT.md) - Dark mode implementation

2. **Explore Examples:**
   - [EXAMPLES_GALLERY.md](./EXAMPLES_GALLERY.md) - Real-world patterns

3. **Best Practices:**
   - [BEST_PRACTICES.md](./BEST_PRACTICES.md) - Development guidelines

## Essential Classes Quick Reference

```css
/* Layout */
.glass-container    /* Max-width container with padding */
.glass-section      /* Section with vertical spacing */
.glass-grid         /* 3-column responsive grid */

/* Cards */
.glass-card         /* Standard glass card */
.glass-card-interactive  /* Clickable card */
.glass-card-header  /* Card header section */
.glass-card-body    /* Card body section */
.glass-card-footer  /* Card footer section */

/* Buttons */
.glass-btn-primary  /* Primary action button */
.glass-btn-secondary /* Secondary button */
.glass-btn-outline  /* Outline button */
.glass-btn-ghost    /* Minimal button */
.glass-btn-icon     /* Icon button */

/* Forms */
.glass-input        /* Text input */
.glass-label        /* Form label */
.glass-input-hint   /* Helper text */

/* Badges */
.glass-badge        /* Base badge */
.glass-badge-primary /* Primary badge */
.glass-badge-success /* Success badge */
.glass-badge-warning /* Warning badge */
.glass-badge-error  /* Error badge */

/* Navigation */
.glass-nav          /* Navigation bar */
.glass-nav-link     /* Navigation link */
```

## Color Classes Quick Reference

```css
/* Brand Colors */
primary-600    /* Main blue */
secondary-600  /* Main purple */

/* Semantic Colors */
green-500      /* Success */
yellow-500     /* Warning */
red-500        /* Error */
blue-500       /* Info */

/* Text Colors (with dark mode) */
text-gray-900 dark:text-gray-100  /* Primary text */
text-gray-700 dark:text-gray-300  /* Secondary text */
text-gray-600 dark:text-gray-400  /* Tertiary text */
```

## Code Snippets Library

### Complete Form

```vue
<form @submit.prevent="handleSubmit" class="glass-card max-w-md mx-auto">
  <div class="glass-card-header">
    <h3 class="glass-card-title">Contact Form</h3>
  </div>

  <div class="glass-card-body space-y-4">
    <div class="glass-input-group">
      <label class="glass-label">Name</label>
      <input type="text" class="glass-input" v-model="form.name" />
    </div>

    <div class="glass-input-group">
      <label class="glass-label">Email</label>
      <input type="email" class="glass-input" v-model="form.email" />
    </div>

    <div class="glass-input-group">
      <label class="glass-label">Message</label>
      <textarea class="glass-input min-h-[120px]" v-model="form.message"></textarea>
    </div>
  </div>

  <div class="glass-card-footer">
    <button type="button" class="glass-btn-outline">Cancel</button>
    <button type="submit" class="glass-btn-primary">Send</button>
  </div>
</form>
```

### Stats Dashboard

```vue
<div class="glass-grid-4">
  <div class="glass-stat-card glass-stat-card-primary">
    <div class="glass-stat-content">
      <p class="glass-stat-label">Total Users</p>
      <p class="glass-stat-value">1,234</p>
    </div>
    <div class="glass-stat-icon glass-stat-icon-primary">
      <svg class="w-6 h-6"><!-- users icon --></svg>
    </div>
  </div>
  <!-- Repeat for other stats -->
</div>
```

### Modal Dialog

```vue
<Transition name="glass-fade">
  <div v-if="showModal" class="glass-modal" @click.self="showModal = false">
    <div class="glass-modal-overlay"></div>
    <Transition name="glass-scale">
      <div class="glass-modal-content">
        <div class="glass-modal-header">
          <h3 class="glass-modal-title">Confirm Action</h3>
          <button class="glass-modal-close" @click="showModal = false">×</button>
        </div>
        <div class="glass-modal-body">
          <p>Are you sure you want to proceed?</p>
        </div>
        <div class="glass-modal-footer">
          <button class="glass-btn-outline" @click="showModal = false">Cancel</button>
          <button class="glass-btn-primary" @click="confirm">Confirm</button>
        </div>
      </div>
    </Transition>
  </div>
</Transition>
```

---

**Time to First Component:** < 5 minutes
**Learning Curve:** Easy (if familiar with Tailwind CSS)
**Browser Support:** Chrome 76+, Firefox 103+, Safari 15.4+

Ready to build! See [EXAMPLES_GALLERY.md](./EXAMPLES_GALLERY.md) for more patterns.
