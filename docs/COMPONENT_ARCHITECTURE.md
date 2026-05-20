# Component Architecture - Liquid Glass Design System

**Last Updated:** 2025-01-21
**Version:** 1.0.0
**Status:** Production Ready

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Categories](#component-categories)
3. [Component Anatomy](#component-anatomy)
4. [Styling Breakdown](#styling-breakdown)
5. [Composition Patterns](#composition-patterns)
6. [State Variants](#state-variants)
7. [Theme Variants](#theme-variants)
8. [Store Integration](#store-integration)

---

## Architecture Overview

### Component Hierarchy

```
Application Root (App.vue)
│
├── Layouts
│   ├── DefaultLayout.vue
│   │   ├── Navbar (glass-nav)
│   │   ├── Router View (page content)
│   │   └── Footer (glass-footer)
│   │
│   └── AuthLayout.vue
│       └── Router View (auth forms)
│
├── Pages (Route Components)
│   ├── Home.vue
│   ├── Dashboard.vue
│   ├── Catalog.vue
│   ├── Shop.vue
│   ├── Portfolio.vue
│   ├── Login.vue
│   └── NotFound.vue
│
└── Reusable Components
    ├── Layout Components (Navbar, Footer)
    ├── Content Components (Cards, Modals)
    ├── Form Components (Inputs, Buttons)
    └── Feedback Components (Badges, Alerts)
```

### Design System Layers

```
Layer 4: Vue Components (.vue files)
         ↓ uses
Layer 3: Component Classes (.glass-card, .glass-btn-primary)
         ↓ composed from
Layer 2: Tailwind Utilities (.bg-white/80, .backdrop-blur-md)
         ↓ configured by
Layer 1: Design Tokens (colors, spacing, effects)
```

---

## Component Categories

### 1. Layout Components

**Purpose:** Structural organization of pages

#### Navbar.vue
- **Role:** Global navigation, user menu, cart access
- **Styling:** Fixed position, glassmorphism, responsive
- **State:** Authenticated vs guest, mobile menu open/closed

#### Footer.vue
- **Role:** Site information, links, branding
- **Styling:** Dark glass overlay, ambient gradient
- **State:** Static (no interactive states)

#### DefaultLayout.vue
- **Role:** Main application wrapper
- **Styling:** Ambient gradient background, flex column
- **State:** Theme-reactive background

#### AuthLayout.vue
- **Role:** Login/register page wrapper
- **Styling:** Centered content, full-screen gradient
- **State:** Clean, minimal chrome

---

### 2. Navigation Components

#### Glass Navigation Bar

**Component Structure:**
```vue
<template>
  <nav class="glass-nav">
    <div class="glass-nav-container">
      <!-- Logo -->
      <!-- Links -->
      <!-- Actions (cart, user, theme) -->
    </div>
  </nav>
</template>
```

**Styling Breakdown:**

```css
/* Container - Fixed, full-width, blurred background */
.glass-nav {
  @apply fixed top-0 w-full z-50;
  @apply bg-white/80 backdrop-blur-md dark:bg-gray-900/80;
  @apply border-b border-white/50 dark:border-gray-700/50;
  @apply shadow-md;
}

/* Inner container - Constrained width, flex layout */
.glass-nav-container {
  @apply container-custom py-4;
  @apply flex items-center justify-between;
}

/* Logo - Gradient background, rounded */
.glass-nav-logo {
  @apply w-10 h-10 rounded-xl;
  @apply bg-gradient-to-br from-primary-600 to-secondary-600;
  @apply flex items-center justify-center;
  @apply text-white font-bold text-xl shadow-lg;
}

/* Brand text - Gradient text */
.glass-nav-brand-text {
  @apply text-xl font-bold;
  @apply bg-gradient-to-r from-primary-600 to-secondary-600;
  @apply dark:from-primary-400 dark:to-secondary-400;
  @apply bg-clip-text text-transparent;
}

/* Navigation links */
.glass-nav-links {
  @apply hidden md:flex items-center gap-6;
}

/* Individual link */
.glass-nav-link {
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:text-primary-600 dark:hover:text-primary-400;
  @apply font-medium transition-colors duration-200;
  @apply relative;
}

/* Active link underline */
.glass-nav-link-active::after {
  @apply content-[''] absolute -bottom-1 left-0 w-full h-0.5;
  @apply bg-gradient-to-r from-primary-600 to-secondary-600;
  @apply rounded-full;
}
```

**Props Interface:**
```typescript
interface NavbarProps {
  // No props - uses global stores
}
```

**Emits:**
```typescript
// None - navigation handled by router-link
```

**Store Dependencies:**
```javascript
import { useAuthStore } from '@/store/modules/auth'
import { useCartStore } from '@/store/modules/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
```

---

### 3. Content Components

#### Glass Card (Standard)

**Component Structure:**
```vue
<template>
  <div :class="cardClasses">
    <!-- Optional header -->
    <div v-if="$slots.header || title" class="glass-card-header">
      <h3 v-if="title" class="glass-card-title">{{ title }}</h3>
      <slot name="header" />
    </div>

    <!-- Body content -->
    <div class="glass-card-body">
      <slot />
    </div>

    <!-- Optional footer -->
    <div v-if="$slots.footer" class="glass-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  interactive: Boolean,
  elevated: Boolean
})

const cardClasses = computed(() => [
  'glass-card',
  {
    'glass-card-interactive': props.interactive,
    'glass-card-elevated': props.elevated
  }
])
</script>
```

**Styling Breakdown:**

```css
/* Base card - Semi-transparent, blurred */
.glass-card {
  @apply relative rounded-xl overflow-hidden;
  @apply bg-white/80 backdrop-blur-md dark:bg-gray-900/80;
  @apply border border-white/50 dark:border-gray-700/50;
  @apply shadow-lg;
  @apply transition-all duration-300;
}

/* Interactive variant - Hover effects, cursor */
.glass-card-interactive {
  @apply hover:shadow-xl hover:scale-[1.02];
  @apply hover:bg-white/90 dark:hover:bg-gray-900/90;
  @apply cursor-pointer;
}

/* Elevated variant - More prominent */
.glass-card-elevated {
  @apply shadow-xl bg-white/90 dark:bg-gray-900/90;
  @apply border-white/60 dark:border-gray-700/60;
}

/* Card sections */
.glass-card-header {
  @apply flex items-center justify-between p-6 pb-4;
  @apply border-b border-gray-200/50 dark:border-gray-700/50;
}

.glass-card-title {
  @apply text-xl font-semibold;
  @apply text-gray-900 dark:text-gray-100;
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

**Props Interface:**
```typescript
interface GlassCardProps {
  title?: string           // Optional title in header
  interactive?: boolean    // Enable hover effects
  elevated?: boolean       // Increase prominence
}
```

**Slots:**
```typescript
{
  header: () => VNode[]    // Header content (right side)
  default: () => VNode[]   // Body content
  footer: () => VNode[]    // Footer actions
}
```

**Usage Examples:**

```vue
<!-- Standard card -->
<GlassCard title="My Card">
  <p>Card content goes here</p>
</GlassCard>

<!-- Interactive card with custom header -->
<GlassCard interactive>
  <template #header>
    <h3 class="glass-card-title">Custom Title</h3>
    <span class="glass-badge glass-badge-success">Active</span>
  </template>

  <p>Click me!</p>

  <template #footer>
    <button class="glass-btn-outline">Cancel</button>
    <button class="glass-btn-primary">Save</button>
  </template>
</GlassCard>

<!-- Elevated card -->
<GlassCard title="Important" elevated>
  <p>This card stands out more</p>
</GlassCard>
```

#### Glass Modal

**Component Structure:**
```vue
<template>
  <Teleport to="body">
    <Transition name="glass-fade">
      <div v-if="isOpen" class="glass-modal" @click.self="handleClose">
        <!-- Backdrop -->
        <div class="glass-modal-overlay"></div>

        <!-- Modal content -->
        <Transition name="glass-scale">
          <div class="glass-modal-content" role="dialog" aria-modal="true">
            <!-- Header -->
            <div class="glass-modal-header">
              <h3 class="glass-modal-title">{{ title }}</h3>
              <button
                class="glass-modal-close"
                @click="handleClose"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <!-- Body -->
            <div class="glass-modal-body">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="glass-modal-footer">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  closeOnEscape: { type: Boolean, default: true },
  closeOnOverlay: { type: Boolean, default: true }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  if (props.closeOnOverlay) {
    emit('close')
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.closeOnEscape) {
    emit('close')
  }
}

onMounted(() => {
  if (props.closeOnEscape) {
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
```

**Styling Breakdown:**

```css
/* Modal overlay container */
.glass-modal {
  @apply fixed inset-0 z-50;
  @apply flex items-center justify-center p-4;
}

/* Backdrop */
.glass-modal-overlay {
  @apply absolute inset-0;
  @apply bg-black/50 backdrop-blur-sm;
}

/* Modal content box */
.glass-modal-content {
  @apply relative z-10 w-full max-w-md;
  @apply bg-white/90 backdrop-blur-xl dark:bg-gray-900/90;
  @apply rounded-2xl shadow-2xl;
  @apply border border-white/50 dark:border-gray-700/50;
  @apply max-h-[90vh] overflow-y-auto;
}

/* Modal sections */
.glass-modal-header {
  @apply flex items-center justify-between p-6 pb-4;
  @apply border-b border-gray-200/50 dark:border-gray-700/50;
}

.glass-modal-title {
  @apply text-xl font-semibold;
  @apply text-gray-900 dark:text-gray-100;
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

**Props Interface:**
```typescript
interface GlassModalProps {
  isOpen: boolean           // Control visibility
  title: string            // Modal title
  closeOnEscape?: boolean  // Close on ESC key (default: true)
  closeOnOverlay?: boolean // Close on backdrop click (default: true)
}
```

**Emits:**
```typescript
{
  close: () => void  // Emitted when modal should close
}
```

---

### 4. Form Components

#### Glass Button

**Component Structure:**
```vue
<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>

    <!-- Icon slot (left) -->
    <slot name="icon-left" />

    <!-- Default slot (text) -->
    <slot />

    <!-- Icon slot (right) -->
    <slot name="icon-right" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'icon'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: Boolean,
  loading: Boolean
})

defineEmits(['click'])

const buttonClasses = computed(() => [
  'glass-btn',
  `glass-btn-${props.variant}`,
  `glass-btn-${props.size}`
])
</script>
```

**Styling Breakdown:**

```css
/* Base button - Shared properties */
.glass-btn {
  @apply px-6 py-2.5 rounded-lg font-medium;
  @apply transition-all duration-200;
  @apply focus:outline-none focus:ring-4;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply inline-flex items-center justify-center;
}

/* Size variants */
.glass-btn-sm {
  @apply px-3 py-1.5 text-sm;
}

.glass-btn-md {
  @apply px-6 py-2.5 text-base;
}

.glass-btn-lg {
  @apply px-8 py-3 text-lg;
}

/* Primary variant - Gradient fill */
.glass-btn-primary {
  @apply bg-gradient-to-r from-primary-600 to-primary-700;
  @apply text-white shadow-md;
  @apply hover:from-primary-700 hover:to-primary-800;
  @apply hover:shadow-lg hover:scale-105;
  @apply focus:ring-primary-300 dark:focus:ring-primary-800;
  @apply active:scale-100;
}

/* Secondary variant - Purple gradient */
.glass-btn-secondary {
  @apply bg-gradient-to-r from-secondary-600 to-secondary-700;
  @apply text-white shadow-md;
  @apply hover:from-secondary-700 hover:to-secondary-800;
  @apply hover:shadow-lg hover:scale-105;
  @apply focus:ring-secondary-300 dark:focus:ring-secondary-800;
}

/* Outline variant - Transparent with border */
.glass-btn-outline {
  @apply bg-white/50 backdrop-blur-sm dark:bg-gray-900/50;
  @apply border-2 border-gray-300 dark:border-gray-600;
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:bg-white/80 dark:hover:bg-gray-800/50;
  @apply hover:border-gray-400 dark:hover:border-gray-500;
  @apply focus:ring-gray-200 dark:focus:ring-gray-700;
}

/* Ghost variant - Minimal */
.glass-btn-ghost {
  @apply bg-transparent;
  @apply text-gray-700 dark:text-gray-300;
  @apply hover:bg-gray-100/50 dark:hover:bg-gray-800/50;
  @apply focus:ring-gray-200 dark:focus:ring-gray-700;
}

/* Icon variant - Square/circular */
.glass-btn-icon {
  @apply p-2.5 rounded-lg;
  @apply bg-white/50 backdrop-blur-sm dark:bg-gray-900/50;
  @apply border border-gray-200 dark:border-gray-700;
  @apply text-gray-600 dark:text-gray-400;
  @apply hover:bg-white/80 dark:hover:bg-gray-800/50;
  @apply hover:text-gray-900 dark:hover:text-gray-100;
}
```

**Props Interface:**
```typescript
interface GlassButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}
```

**Usage Examples:**

```vue
<!-- Primary button -->
<GlassButton variant="primary" @click="handleSave">
  Save Changes
</GlassButton>

<!-- Button with loading state -->
<GlassButton variant="primary" :loading="isSubmitting">
  Submit
</GlassButton>

<!-- Button with icon -->
<GlassButton variant="outline">
  <template #icon-left>
    <svg class="w-5 h-5"><!-- icon --></svg>
  </template>
  Download
</GlassButton>

<!-- Icon-only button -->
<GlassButton variant="icon" aria-label="Settings">
  <svg class="w-5 h-5"><!-- settings icon --></svg>
</GlassButton>
```

#### Glass Input

**Component Structure:**
```vue
<template>
  <div class="glass-input-group">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="glass-label">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Input wrapper (for icons) -->
    <div class="relative">
      <!-- Left icon -->
      <div v-if="$slots['icon-left']" class="glass-input-icon-left">
        <slot name="icon-left" />
      </div>

      <!-- Input element -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />

      <!-- Right icon -->
      <div v-if="$slots['icon-right']" class="glass-input-icon-right">
        <slot name="icon-right" />
      </div>
    </div>

    <!-- Hint or error message -->
    <span v-if="hint || error" :class="messageClasses">
      {{ error || hint }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  label: String,
  placeholder: String,
  hint: String,
  error: String,
  disabled: Boolean,
  required: Boolean
})

defineEmits(['update:modelValue', 'blur', 'focus'])

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => [
  'glass-input',
  {
    'glass-input-error': props.error,
    'glass-input-success': !props.error && props.modelValue,
    'pl-10': !!this.$slots['icon-left'],
    'pr-10': !!this.$slots['icon-right']
  }
])

const messageClasses = computed(() => [
  'glass-input-hint',
  {
    'text-red-600 dark:text-red-400': props.error
  }
])
</script>
```

**Styling Breakdown:**

```css
/* Input group container */
.glass-input-group {
  @apply space-y-2;
}

/* Label */
.glass-label {
  @apply block text-sm font-medium;
  @apply text-gray-700 dark:text-gray-300;
}

/* Input field */
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

/* Hint/error message */
.glass-input-hint {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

/* Icon positioning */
.glass-input-icon-left {
  @apply absolute left-3 top-1/2 -translate-y-1/2;
  @apply text-gray-400 dark:text-gray-500;
  @apply pointer-events-none;
}

.glass-input-icon-right {
  @apply absolute right-3 top-1/2 -translate-y-1/2;
  @apply text-gray-400 dark:text-gray-500;
  @apply pointer-events-none;
}
```

---

### 5. Feedback Components

#### Glass Badge

**Styling Breakdown:**

```css
/* Base badge */
.glass-badge {
  @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium;
  @apply bg-white/60 backdrop-blur-sm dark:bg-gray-800/60;
  @apply border border-gray-300 dark:border-gray-600;
  @apply text-gray-700 dark:text-gray-300;
}

/* Semantic variants */
.glass-badge-primary {
  @apply bg-primary-100/60 dark:bg-primary-900/30;
  @apply border-primary-300 dark:border-primary-700;
  @apply text-primary-700 dark:text-primary-300;
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
```

**Usage:**
```vue
<span class="glass-badge glass-badge-primary">New</span>
<span class="glass-badge glass-badge-success">Active</span>
<span class="glass-badge glass-badge-warning">Pending</span>
<span class="glass-badge glass-badge-error">Failed</span>
```

---

## Composition Patterns

### Parent-Child Communication

**Pattern 1: Props Down, Events Up**
```vue
<!-- Parent -->
<template>
  <GlassModal :isOpen="showModal" @close="showModal = false">
    <GlassCard title="Confirm">
      <p>Are you sure?</p>
    </GlassCard>
  </GlassModal>
</template>

<!-- Child emits close event, parent handles state -->
```

**Pattern 2: Store-Based State**
```vue
<!-- Component accesses global state -->
<script setup>
import { useCartStore } from '@/store/modules/cart'

const cartStore = useCartStore()

const handleAddToCart = (product) => {
  cartStore.addItem(product)
}
</script>
```

### Slot Composition

**Named Slots for Flexibility:**
```vue
<!-- Flexible card with multiple slots -->
<GlassCard>
  <template #header>
    <h3>Custom Header</h3>
    <button>Action</button>
  </template>

  <p>Main content</p>

  <template #footer>
    <button class="glass-btn-primary">Save</button>
  </template>
</GlassCard>
```

---

## State Variants

### Interactive States

All interactive components support these states:

**Default:**
- Standard appearance
- Ready for interaction

**Hover:**
- Visual feedback on pointer enter
- Typically: brightness increase, scale up, shadow increase

**Active (Pressed):**
- Visual feedback while pressed
- Typically: scale down slightly, darker color

**Focus:**
- Keyboard navigation indicator
- Ring outline (4px, appropriate color)

**Disabled:**
- Non-interactive state
- 50% opacity, cursor-not-allowed

**Loading:**
- Processing state
- Spinner icon, disabled interaction

---

## Theme Variants

Every component has light and dark mode variants:

```css
/* Light mode */
.glass-card {
  @apply bg-white/80 dark:bg-gray-900/80;
  @apply border-white/50 dark:border-gray-700/50;
  @apply text-gray-900 dark:text-gray-100;
}
```

**Testing Checklist:**
- [ ] Component renders correctly in light mode
- [ ] Component renders correctly in dark mode
- [ ] Contrast ratios meet WCAG AA in both modes
- [ ] Borders visible in both modes
- [ ] Focus indicators visible in both modes

---

## Store Integration

### Using Pinia Stores in Components

```vue
<script setup>
import { useAuthStore } from '@/store/modules/auth'
import { useCartStore } from '@/store/modules/cart'

// Access stores
const authStore = useAuthStore()
const cartStore = useCartStore()

// Use computed state
const isAuthenticated = computed(() => authStore.isAuthenticated)
const cartItemCount = computed(() => cartStore.itemCount)

// Call actions
const handleLogout = async () => {
  const result = await authStore.logout()
  if (result.success) {
    router.push('/auth/login')
  }
}
</script>

<template>
  <div class="glass-nav">
    <div v-if="isAuthenticated">
      <button class="glass-btn-icon">
        <svg><!-- cart icon --></svg>
        <span class="glass-badge glass-badge-primary">{{ cartItemCount }}</span>
      </button>
      <button @click="handleLogout" class="glass-btn-outline">Logout</button>
    </div>
  </div>
</template>
```

---

**Document Version:** 1.0.0
**Last Updated:** 2025-01-21
**Next Review:** 2025-04-21
**Maintained by:** GeekDigital Design Team

For related documentation, see:
- [VISUAL_STYLE_GUIDE.md](./VISUAL_STYLE_GUIDE.md)
- [INTERACTIVE_COMPONENTS.md](./INTERACTIVE_COMPONENTS.md)
- [DESIGN_SYSTEM_TOKENS.md](./DESIGN_SYSTEM_TOKENS.md)
