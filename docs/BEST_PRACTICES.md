# Best Practices - Liquid Glass Development Guide

**Last Updated:** 2025-01-21
**Version:** 1.0.0

## Code Organization

### File Structure

```
src/
├── assets/
│   └── main.css               # Design system styles
├── components/
│   ├── layout/
│   │   ├── Navbar.vue
│   │   └── Footer.vue
│   └── [feature]/             # Organize by feature
│       └── FeatureCard.vue
├── composables/
│   └── useTheme.js            # Theme management
├── layouts/
│   ├── DefaultLayout.vue
│   └── AuthLayout.vue
├── pages/
│   └── [PageName].vue         # Route components
├── router/
│   └── index.js
└── store/
    └── modules/
        ├── auth.js
        └── cart.js
```

### Component Naming

```vue
<!-- Good: PascalCase for components -->
<template>
  <GlassCard>
    <UserProfile />
  </GlassCard>
</template>

<!-- Good: kebab-case for utility classes -->
<div class="glass-card glass-card-interactive">
  Content
</div>
```

### File Naming

```
✅ Good:
- UserDashboard.vue
- ProductCard.vue
- useTheme.js
- auth.js

❌ Bad:
- user-dashboard.vue
- product_card.vue
- UseTheme.js
- Auth.js
```

## Component Composition

### Single Responsibility

```vue
<!-- Good: Focused component -->
<template>
  <div class="glass-card">
    <div class="glass-card-header">
      <h3 class="glass-card-title">{{ title }}</h3>
    </div>
    <div class="glass-card-body">
      <slot />
    </div>
  </div>
</template>

<!-- Bad: Too many responsibilities -->
<template>
  <div class="glass-card">
    <!-- Card header -->
    <!-- User profile section -->
    <!-- Settings form -->
    <!-- Recent activity -->
    <!-- Analytics dashboard -->
  </div>
</template>
```

### Props Validation

```vue
<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  interactive: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'standard',
    validator: (v) => ['standard', 'elevated', 'interactive'].includes(v)
  }
})
</script>
```

### Emit Events Properly

```vue
<script setup>
// Define emits
const emit = defineEmits(['save', 'cancel', 'update:modelValue'])

// Use descriptive event names
const handleSave = () => {
  emit('save', formData.value)
}

// Don't emit raw events
// ❌ Bad: @click="$emit('click')"
// ✅ Good: @click="handleClick"
</script>
```

## Performance Optimization

### Blur Performance

```vue
<!-- Good: Limit blur layers -->
<div class="glass-card">               <!-- Blur layer 1 -->
  <div class="glass-modal-content">   <!-- Blur layer 2 -->
    <!-- Stop here, max 2 blur layers -->
  </div>
</div>

<!-- Bad: Too many blur layers -->
<div class="backdrop-blur-md">
  <div class="backdrop-blur-lg">
    <div class="backdrop-blur-xl">    <!-- 3 layers = performance hit -->
      <div class="backdrop-blur-2xl"> <!-- 4 layers = very slow -->
      </div>
    </div>
  </div>
</div>
```

### Animation Performance

```css
/* Good: Use transform and opacity */
.glass-card-interactive {
  @apply hover:scale-105 hover:opacity-95;
  @apply transition-all duration-300;
}

/* Bad: Animate layout properties */
.bad-card {
  @apply hover:w-[110%] hover:h-[110%];  /* Causes reflow */
  @apply hover:pl-8;                      /* Causes reflow */
}
```

### Lazy Loading

```javascript
// Good: Lazy load route components
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/pages/Dashboard.vue')  // Lazy loaded
  }
]

// Good: Lazy load heavy components
const HeavyChart = defineAsyncComponent(() =>
  import('@/components/HeavyChart.vue')
)
```

### Conditional Rendering

```vue
<!-- Good: v-if for rarely shown content -->
<div v-if="showExpensiveComponent">
  <ExpensiveComponent />
</div>

<!-- Good: v-show for frequently toggled content -->
<div v-show="isVisible" class="glass-card">
  Frequently toggled
</div>

<!-- Bad: v-show for heavy components that are rarely shown -->
<div v-show="showModal" class="glass-modal">
  <!-- Modal is rendered even when hidden -->
</div>
```

## Accessibility Best Practices

### Semantic HTML

```vue
<!-- Good: Semantic structure -->
<template>
  <article class="glass-card">
    <header class="glass-card-header">
      <h3 class="glass-card-title">Article Title</h3>
    </header>
    <section class="glass-card-body">
      <p>Content</p>
    </section>
    <footer class="glass-card-footer">
      <button class="glass-btn-primary">Read More</button>
    </footer>
  </article>
</template>

<!-- Bad: Divs everywhere -->
<template>
  <div class="glass-card">
    <div class="glass-card-header">
      <div class="glass-card-title">Article Title</div>
    </div>
    <div class="glass-card-body">
      <div>Content</div>
    </div>
  </div>
</template>
```

### ARIA Labels

```vue
<!-- Good: Descriptive labels -->
<button class="glass-btn-icon" aria-label="Close modal">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>

<nav aria-label="Main navigation" class="glass-nav">
  <!-- Navigation links -->
</nav>

<!-- Good: Live regions for dynamic content -->
<div role="status" aria-live="polite">
  {{ statusMessage }}
</div>
```

### Keyboard Navigation

```vue
<script setup>
const handleKeydown = (e) => {
  switch(e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault()
      handleAction()
      break
    case 'Escape':
      handleClose()
      break
  }
}
</script>

<template>
  <div
    tabindex="0"
    role="button"
    @keydown="handleKeydown"
    @click="handleAction"
    class="glass-card-interactive"
  >
    Keyboard accessible
  </div>
</template>
```

### Focus Management

```javascript
import { ref, onMounted, nextTick } from 'vue'

const firstInput = ref(null)

onMounted(() => {
  nextTick(() => {
    firstInput.value?.focus()
  })
})
```

## Testing Strategies

### Unit Testing (Vitest)

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GlassCard from '@/components/GlassCard.vue'

describe('GlassCard', () => {
  it('renders title prop', () => {
    const wrapper = mount(GlassCard, {
      props: { title: 'Test Title' }
    })
    expect(wrapper.find('.glass-card-title').text()).toBe('Test Title')
  })

  it('applies interactive class when prop is true', () => {
    const wrapper = mount(GlassCard, {
      props: { interactive: true }
    })
    expect(wrapper.classes()).toContain('glass-card-interactive')
  })

  it('emits click event when interactive', async () => {
    const wrapper = mount(GlassCard, {
      props: { interactive: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

### Component Testing

```javascript
// Test dark mode rendering
it('applies dark mode styles', async () => {
  document.documentElement.classList.add('dark')
  const wrapper = mount(GlassCard)

  // Check computed styles
  expect(getComputedStyle(wrapper.element).backgroundColor)
    .toContain('rgba(17, 24, 39')

  document.documentElement.classList.remove('dark')
})
```

### Accessibility Testing

```javascript
import { axe } from 'vitest-axe'

it('has no accessibility violations', async () => {
  const wrapper = mount(GlassCard, {
    props: { title: 'Accessible Card' }
  })

  const results = await axe(wrapper.element)
  expect(results).toHaveNoViolations()
})
```

## Git Workflow

### Branch Naming

```bash
# Feature branches
feature/liquid-glass-migration
feature/add-theme-toggle
feature/new-dashboard-cards

# Bug fixes
fix/navbar-z-index
fix/dark-mode-contrast

# Documentation
docs/update-style-guide
docs/add-examples
```

### Commit Messages

```bash
# Good: Clear, descriptive
git commit -m "feat: add glass modal component with transitions"
git commit -m "fix: improve dark mode contrast for badges"
git commit -m "style: update glass-card hover effects"
git commit -m "docs: add button examples to style guide"

# Bad: Vague
git commit -m "updates"
git commit -m "fix stuff"
git commit -m "wip"
```

### Commit Structure

```bash
# Conventional Commits format
<type>: <description>

[optional body]

[optional footer]

# Types:
feat:     New feature
fix:      Bug fix
docs:     Documentation only
style:    Code style/formatting (not CSS)
refactor: Code refactoring
perf:     Performance improvement
test:     Adding tests
chore:    Maintenance
```

## Design System Maintenance

### Adding New Components

```bash
1. Design review
   ├─ Sketch/prototype the component
   ├─ Review with team
   └─ Ensure it follows glass aesthetic

2. Implementation
   ├─ Create component file
   ├─ Add to COMPONENT_ARCHITECTURE.md
   ├─ Add examples to EXAMPLES_GALLERY.md
   └─ Update VISUAL_STYLE_GUIDE.md

3. Testing
   ├─ Unit tests
   ├─ Accessibility tests
   ├─ Dark mode tests
   └─ Browser compatibility tests

4. Documentation
   ├─ Update README.md
   ├─ Add to quick start if essential
   └─ Create usage examples
```

### Updating Tokens

```bash
1. Propose change
   ├─ Document reason
   ├─ Show impact analysis
   └─ Get team approval

2. Update
   ├─ Modify tailwind.config.js
   ├─ Update DESIGN_SYSTEM_TOKENS.md
   └─ Update affected components

3. Test
   ├─ Visual regression tests
   ├─ Check all components
   └─ Verify dark mode

4. Deploy
   ├─ Merge to main
   ├─ Tag version
   └─ Update changelog
```

## Common Mistakes to Avoid

### Styling Mistakes

```vue
<!-- ❌ Don't hardcode colors -->
<div class="bg-[#2563eb] text-[#ffffff]">

<!-- ✅ Use design tokens -->
<div class="bg-primary-600 text-white">

<!-- ❌ Don't mix systems -->
<div class="card glass-card">  <!-- Old + new -->

<!-- ✅ Use one system consistently -->
<div class="glass-card">

<!-- ❌ Don't forget dark mode -->
<div class="bg-white text-gray-900">

<!-- ✅ Always include dark variants -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

### Performance Mistakes

```vue
<!-- ❌ Don't animate expensive properties -->
<div class="hover:backdrop-blur-xl transition-all">

<!-- ✅ Keep blur static, animate other properties -->
<div class="backdrop-blur-md hover:scale-105 transition-transform">

<!-- ❌ Don't use v-if for frequently toggled content -->
<div v-if="tab === 'overview'">Heavy component</div>

<!-- ✅ Use v-show for frequent toggles -->
<div v-show="tab === 'overview'">Heavy component</div>
```

### Accessibility Mistakes

```vue
<!-- ❌ Icon-only button without label -->
<button class="glass-btn-icon">
  <svg><!-- icon --></svg>
</button>

<!-- ✅ Include aria-label -->
<button class="glass-btn-icon" aria-label="Close">
  <svg aria-hidden="true"><!-- icon --></svg>
</button>

<!-- ❌ Rely on color alone -->
<span class="text-red-600">Error</span>

<!-- ✅ Include icon and text -->
<span class="text-red-600">
  <svg class="inline w-4 h-4"><!-- X icon --></svg>
  Error: Invalid input
</span>
```

## Code Review Checklist

- [ ] Component follows Single Responsibility Principle
- [ ] Props properly validated
- [ ] Emits properly defined
- [ ] Dark mode variants included
- [ ] Accessibility features implemented (ARIA, keyboard nav)
- [ ] Performance optimized (no excessive blur, efficient animations)
- [ ] Responsive design tested
- [ ] Documentation updated
- [ ] Tests written and passing
- [ ] No console errors or warnings
- [ ] Code follows project style guide

## Resources

### Tools
- **Tailwind CSS IntelliSense** - VSCode extension for autocomplete
- **Vue DevTools** - Browser extension for debugging
- **axe DevTools** - Accessibility testing
- **WebAIM Contrast Checker** - Check color contrast
- **Lighthouse** - Performance and accessibility audits

### Learning
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Accessibility](https://web.dev/accessibility/)

---

**Version:** 1.0.0
**Last Updated:** 2025-01-21
**Next Review:** 2025-04-21

See [VISUAL_STYLE_GUIDE.md](./VISUAL_STYLE_GUIDE.md) for design guidelines.
