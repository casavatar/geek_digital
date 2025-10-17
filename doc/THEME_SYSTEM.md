# Theme System Documentation

## Overview

This application uses a robust dark/light theme system built with Vue 3 Composition API and Tailwind CSS's dark mode.

## Best Practices Implementation

### ✅ **1. Singleton Pattern**

The theme state is shared across all component instances using module-level refs:

```typescript
const isDarkMode = ref(false)
const isInitialized = ref(false)
```

This prevents multiple initializations and ensures consistent state.

### ✅ **2. Theme Initialization Priority**

1. User Preference (localStorage) - Highest priority
2. System Preference (prefers-color-scheme) - Fallback
3. Default (light mode) - Last resort

### ✅ **3. Prevent Flash of Wrong Theme (FOUC)**

The `initThemeOnLoad()` function is called in `main.ts` **before** the Vue app mounts:

```typescript
// main.ts
initThemeOnLoad() // Apply theme immediately
const app = createApp(App)
app.mount('#app')
```

### ✅ **4. Proper Event Listener Cleanup**

Media query listeners are properly cleaned up in `onBeforeUnmount` to prevent memory leaks.

### ✅ **5. Accessibility Features**

- `aria-label` for screen readers
- `title` attribute for tooltips
- Keyboard navigation support
- Focus ring indicators

### ✅ **6. Smooth Transitions**

Vue's `<Transition>` component with custom timing:

- Scale: `0 → 100`
- Rotate: `90deg → 0deg`
- Opacity: `0 → 1`
- Duration: `300ms`

### ✅ **7. System Theme Change Listener**

Automatically detects when user changes their OS theme preference (only if no user preference is saved).

## Usage

### In Components

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDarkMode, toggleDarkMode, setTheme } = useTheme()

// Toggle theme
const handleToggle = () => {
  toggleDarkMode()
}

// Set specific theme
const setDarkMode = () => {
  setTheme(true)
}
</script>
```

### CSS Classes

Use Tailwind's `dark:` variant for dark mode styles:

```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Content adapts to theme</div>
```

### Theme System with Liquid Glass Design

The application's liquid glass design pattern uses theme-aware opacity values:

```html
<!-- Normalized glass pattern -->
<div class="bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150 border border-gray-200/40 dark:border-gray-700/40 shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40">
  Glass container with proper dark mode support
</div>
```

**Key differences between themes**:
- **Light mode**: Uses `white/20` backgrounds with `gray-900/20` shadows
- **Dark mode**: Uses `gray-800/30` backgrounds with `gray-950/40` shadows
- **Borders**: Both use `/40` opacity for consistency
- **Gradients**: Active states use `/40` opacity in both themes

See [LIQUID-GLASS-DESIGN-GUIDE.md](./LIQUID-GLASS-DESIGN-GUIDE.md) for complete glass effect specifications.

## API Reference

### `useTheme()`

Returns an object with:

- **`isDarkMode`** (Ref\<boolean\>): Current theme state
- **`isInitialized`** (Ref\<boolean\>): Whether theme system is ready
- **`toggleDarkMode()`**: Switch between light and dark mode
- **`setTheme(darkMode: boolean)`**: Set specific theme
- **`initializeTheme()`**: Manually initialize (called automatically)

### `initThemeOnLoad()`

Call this function in `main.ts` before mounting the app to prevent FOUC.

## Testing

### Manual Testing Checklist

- [ ] Toggle button switches theme correctly
- [ ] Theme persists after page reload
- [ ] System preference is respected on first visit
- [ ] No flash of wrong theme on page load
- [ ] Smooth icon transitions
- [ ] Keyboard navigation works
- [ ] Screen reader announces theme changes

### Browser Console Testing

```javascript
// Check current theme
localStorage.getItem('theme')

// Clear saved preference
localStorage.removeItem('theme')

// Check system preference
window.matchMedia('(prefers-color-scheme: dark)').matches
```

## Troubleshooting

### Theme not persisting

**Cause**: localStorage might be disabled or blocked  
**Solution**: Check browser settings and privacy extensions

### Flash of wrong theme

**Cause**: `initThemeOnLoad()` not called before app mount  
**Solution**: Ensure it's in `main.ts` before `app.mount()`

### Theme not updating

**Cause**: Multiple instances of theme state  
**Solution**: Use the singleton pattern (already implemented)

### Icons not transitioning smoothly

**Cause**: CSS conflicts or missing transitions  
**Solution**: Check that ThemeToggle.vue has proper transitions

## Performance Considerations

- **Minimal re-renders**: Only affected components re-render
- **No flickering**: Theme applied before initial render
- **Efficient listeners**: Single media query listener shared
- **Proper cleanup**: Event listeners removed on unmount
- **localStorage caching**: Instant theme load on subsequent visits

## Browser Support

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile browsers: Full support
- ⚠️ IE11: Not supported (uses modern web APIs)

## Future Enhancements

Potential improvements for consideration:

1. Custom theme colors (beyond light/dark)
2. Theme transition animations on the entire page
3. Per-route theme preferences
4. Theme scheduling (auto-switch based on time)
5. Sync across tabs (using localStorage events)

## Related Files

- `src/composables/useTheme.ts` - Core theme logic
- `src/components/dashboard/ThemeToggle.vue` - Toggle button component
- `src/main.ts` - Theme initialization
- `tailwind.config.js` - Dark mode configuration
