# Interactive Components - Forms, Buttons, Feedback

**Last Updated:** 2025-01-21
**Version:** 1.0.0

## Overview

Complete reference for all interactive components in the Liquid Glass design system, including forms, buttons, badges, loading states, and feedback elements.

## Form Components

### Text Input

```vue
<template>
  <div class="glass-input-group">
    <label class="glass-label">
      Email Address
      <span class="text-red-500">*</span>
    </label>
    <input
      type="email"
      class="glass-input"
      placeholder="user@example.com"
      v-model="email"
    />
    <span class="glass-input-hint">We'll never share your email.</span>
  </div>
</template>
```

**States:**
- Default: Semi-transparent, subtle border
- Focus: Primary ring, increased opacity
- Error: Red border and ring
- Success: Green border and ring
- Disabled: 50% opacity, no interaction

### Search Input

```vue
<div class="glass-search">
  <svg class="glass-search-icon w-5 h-5"><!-- search icon --></svg>
  <input
    type="search"
    class="glass-search-input"
    placeholder="Search applications..."
    v-model="searchQuery"
  />
</div>
```

### Textarea

```vue
<div class="glass-input-group">
  <label class="glass-label">Description</label>
  <textarea
    class="glass-input min-h-[120px] resize-y"
    placeholder="Enter description..."
    v-model="description"
  ></textarea>
</div>
```

### Select Dropdown

```vue
<select class="glass-input">
  <option value="">Select category</option>
  <option value="data">Data Engineering</option>
  <option value="web">Web Development</option>
  <option value="mobile">Mobile Apps</option>
</select>
```

### Checkbox

```vue
<label class="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    class="w-4 h-4 rounded border-gray-300 dark:border-gray-600
           text-primary-600 focus:ring-2 focus:ring-primary-500"
    v-model="agreed"
  />
  <span class="text-sm text-gray-700 dark:text-gray-300">
    I agree to the terms
  </span>
</label>
```

### Radio Buttons

```vue
<div class="space-y-2">
  <label v-for="option in options" :key="option.value"
         class="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      :value="option.value"
      v-model="selected"
      class="w-4 h-4 border-gray-300 dark:border-gray-600
             text-primary-600 focus:ring-2 focus:ring-primary-500"
    />
    <span class="text-sm text-gray-700 dark:text-gray-300">
      {{ option.label }}
    </span>
  </label>
</div>
```

### Form Validation

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div class="glass-input-group">
      <label class="glass-label">Email</label>
      <input
        type="email"
        :class="['glass-input', { 'glass-input-error': errors.email }]"
        v-model="form.email"
        @blur="validateEmail"
      />
      <span v-if="errors.email" class="glass-input-hint text-red-600 dark:text-red-400">
        {{ errors.email }}
      </span>
    </div>

    <button type="submit" class="glass-btn-primary" :disabled="!isValid">
      Submit
    </button>
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue'

const form = reactive({ email: '' })
const errors = reactive({ email: '' })

const validateEmail = () => {
  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
  } else {
    errors.email = ''
  }
}

const isValid = computed(() => !errors.email && form.email)
</script>
```

## Button Components

### Primary Button

```vue
<button class="glass-btn-primary" @click="handleAction">
  Primary Action
</button>
```

**Features:**
- Gradient background (primary-600 → primary-700)
- Scale on hover (105%)
- Shadow increase on hover
- Focus ring (4px, primary-300)
- Active state (scale back to 100%)

### Button with Icon

```vue
<button class="glass-btn-primary">
  <svg class="w-5 h-5 mr-2"><!-- icon --></svg>
  Download
</button>
```

### Loading Button

```vue
<button class="glass-btn-primary" :disabled="loading">
  <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
  {{ loading ? 'Processing...' : 'Submit' }}
</button>
```

### Button Group

```vue
<div class="inline-flex rounded-lg shadow-md overflow-hidden">
  <button class="glass-btn-outline rounded-r-none border-r-0">
    Option 1
  </button>
  <button class="glass-btn-outline rounded-none border-r-0">
    Option 2
  </button>
  <button class="glass-btn-outline rounded-l-none">
    Option 3
  </button>
</div>
```

### Icon Button

```vue
<button class="glass-btn-icon" aria-label="Settings">
  <svg class="w-5 h-5"><!-- settings icon --></svg>
</button>
```

## Badge Components

### Status Badges

```vue
<span class="glass-badge glass-badge-success">Active</span>
<span class="glass-badge glass-badge-warning">Pending</span>
<span class="glass-badge glass-badge-error">Failed</span>
<span class="glass-badge glass-badge-primary">New</span>
```

### Count Badge

```vue
<button class="glass-btn-icon relative">
  <svg class="w-5 h-5"><!-- bell icon --></svg>
  <span class="glass-badge glass-badge-error absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] text-center">
    3
  </span>
</button>
```

### Removable Badge

```vue
<span class="glass-badge glass-badge-primary inline-flex items-center gap-1">
  Tag Name
  <button @click="removeTag" class="hover:text-primary-900 dark:hover:text-primary-100">
    <svg class="w-3 h-3"><!-- X icon --></svg>
  </button>
</span>
```

## Loading States

### Spinner

```vue
<div class="flex items-center justify-center p-8">
  <svg class="animate-spin h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path class="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
</div>
```

### Skeleton Loader

```vue
<div class="glass-card">
  <div class="glass-skeleton h-6 w-3/4 mb-4"></div>
  <div class="glass-skeleton h-4 w-full mb-2"></div>
  <div class="glass-skeleton h-4 w-2/3"></div>
</div>
```

```css
.glass-skeleton {
  @apply bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200;
  @apply dark:from-gray-800 dark:via-gray-700 dark:to-gray-800;
  @apply bg-[length:200%_100%] animate-shimmer rounded-lg;
}
```

### Progress Bar

```vue
<div class="glass-progress">
  <div
    class="glass-progress-bar"
    :style="{ width: `${progress}%` }"
  ></div>
</div>
```

```css
.glass-progress {
  @apply w-full h-2 rounded-full overflow-hidden;
  @apply bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm;
}

.glass-progress-bar {
  @apply h-full rounded-full;
  @apply bg-gradient-to-r from-primary-600 to-secondary-600;
  @apply transition-all duration-300 ease-out;
}
```

## Empty States

### Basic Empty State

```vue
<div class="glass-empty-state">
  <div class="glass-empty-icon">
    <svg class="w-8 h-8"><!-- empty box icon --></svg>
  </div>
  <h3 class="glass-empty-title">No items found</h3>
  <p class="glass-empty-description">
    Get started by adding your first item.
  </p>
  <button class="glass-btn-primary mt-4">
    Add Item
  </button>
</div>
```

```css
.glass-empty-state {
  @apply flex flex-col items-center justify-center py-12 px-6 text-center;
  @apply bg-white/50 backdrop-blur-sm dark:bg-gray-900/50;
  @apply rounded-xl border border-gray-200 dark:border-gray-700;
}

.glass-empty-icon {
  @apply w-16 h-16 rounded-full;
  @apply bg-gradient-to-br from-gray-100 to-gray-200;
  @apply dark:from-gray-800 dark:to-gray-700;
  @apply flex items-center justify-center;
  @apply text-gray-400 dark:text-gray-500 mb-4;
}
```

## Toast Notifications

```vue
<Transition name="glass-slide-up">
  <div v-if="show" class="fixed bottom-4 right-4 z-50">
    <div class="glass-card flex items-center gap-3 p-4 min-w-[300px] shadow-xl">
      <svg class="w-5 h-5 text-green-600 dark:text-green-400"><!-- check icon --></svg>
      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
        {{ message }}
      </p>
      <button @click="close" class="ml-auto text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
        <svg class="w-4 h-4"><!-- X icon --></svg>
      </button>
    </div>
  </div>
</Transition>
```

## Dropdown Menu

```vue
<div class="relative" ref="dropdown">
  <button @click="isOpen = !isOpen" class="glass-btn-outline">
    Options
    <svg class="w-4 h-4 ml-2"><!-- chevron down --></svg>
  </button>

  <Transition name="glass-scale">
    <div v-if="isOpen" class="glass-dropdown">
      <button @click="handleAction('edit')" class="glass-dropdown-item">
        Edit
      </button>
      <button @click="handleAction('delete')" class="glass-dropdown-item glass-dropdown-item-danger">
        Delete
      </button>
    </div>
  </Transition>
</div>
```

```css
.glass-dropdown {
  @apply absolute right-0 mt-2 w-48;
  @apply bg-white/90 backdrop-blur-xl dark:bg-gray-900/90;
  @apply rounded-xl shadow-2xl;
  @apply border border-white/50 dark:border-gray-700/50;
  @apply py-2 z-50;
}

.glass-dropdown-item {
  @apply w-full text-left px-4 py-2 text-sm;
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:bg-white/50 dark:hover:bg-gray-800/50;
  @apply transition-colors duration-150;
}

.glass-dropdown-item-danger {
  @apply text-red-600 dark:text-red-400;
}
```

## Accessibility Features

### Keyboard Navigation

```vue
<div
  @keydown.enter="handleAction"
  @keydown.space.prevent="handleAction"
  @keydown.escape="handleClose"
  tabindex="0"
  role="button"
  class="glass-card-interactive"
>
  Keyboard accessible card
</div>
```

### ARIA Labels

```vue
<!-- Icon-only button -->
<button class="glass-btn-icon" aria-label="Close modal">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Loading state -->
<button class="glass-btn-primary" :aria-busy="loading">
  {{ loading ? 'Loading...' : 'Submit' }}
</button>

<!-- Required field -->
<label class="glass-label">
  Email <span aria-label="required">*</span>
</label>
```

### Focus Management

```javascript
// Auto-focus first input on modal open
onMounted(() => {
  if (isOpen.value) {
    nextTick(() => {
      const input = modalRef.value?.querySelector('input')
      input?.focus()
    })
  }
})

// Trap focus within modal
const handleKeydown = (e) => {
  if (e.key === 'Tab') {
    const focusable = modalRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}
```

---

**Component Count:** 30+ interactive patterns
**Accessibility:** WCAG AA compliant

See [VISUAL_STYLE_GUIDE.md](./VISUAL_STYLE_GUIDE.md) for styling guidelines.
