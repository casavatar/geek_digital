# Avatar Styling Guide - Best Practices

## Overview

This guide documents the consistent avatar styling used across the application to maintain visual harmony between components.

## Unified Avatar Style

### ✅ Consistent Implementation

All avatar images across the application now use the same rounded border style and visual enhancements.

## Style Breakdown

### **Border Radius**

```html
rounded-2xl
```

- **Value**: `1rem` (16px)
- **Rationale**: Softer, more modern appearance than full circles
- **Consistency**: Matches card corners and other UI elements

### **Ring Border**

```html
ring-2 ring-blue-100 dark:ring-blue-900/50
```

- **Light Mode**: Subtle blue ring (`ring-blue-100`)
- **Dark Mode**: Semi-transparent darker blue (`ring-blue-900/50`)
- **Size**: 2px ring (proportional to smaller header avatar)
- **Purpose**: Provides visual separation from background

### **Shadow**

```html
shadow-md
```

- **Effect**: Medium shadow for depth
- **Rationale**: Lighter than profile page (`shadow-xl`) due to smaller size
- **Visual hierarchy**: Maintains focus on main content

### **Transitions**

```html
transition-transform duration-200 hover:scale-105
```

- **Property**: `transform`
- **Duration**: `200ms` (faster than profile page's 300ms)
- **Hover Effect**: `scale(1.05)` - subtle zoom on interaction
- **Purpose**: Provides interactive feedback

### **Performance**

```html
loading="lazy"
```

- **Native lazy loading**: Defers image loading until needed
- **Performance**: Reduces initial page load
- **Best Practice**: Required for all non-critical images

### **Accessibility**

```html
:alt="`${personalInfo.name} avatar`"
```

- **Dynamic alt text**: Includes user's name
- **Screen readers**: Properly describes image content
- **Compliance**: WCAG 2.1 Level A requirement

## Implementation Locations

### 1. **DashboardLayout.vue** (Top Bar)

```vue
<img
  :src="personalInfo.avatar"
  :alt="`${personalInfo.name} avatar`"
  class="h-10 w-10 rounded-2xl object-cover ring-2 ring-blue-100 dark:ring-blue-900/50 shadow-md transition-transform duration-200 hover:scale-105 flex-shrink-0"
  loading="lazy"
/>
```

**Size**: `40px × 40px` (compact for header)
**Context**: Always visible in top navigation
**Interaction**: Quick visual identification

### 2. **UserProfile.vue** (Profile Section)

```vue
<img
  :src="personalInfo.avatar"
  :alt="`${personalInfo.name} profile picture`"
  class="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover ring-4 ring-blue-100 dark:ring-blue-900/50 shadow-xl transition-transform duration-300 hover:scale-105"
  loading="lazy"
/>
```

**Size**: `128px × 128px` (mobile) / `160px × 160px` (desktop)
**Context**: Featured prominently on profile
**Interaction**: Status indicator overlay

## Differences by Context

| Property       | DashboardLayout    | UserProfile                             | Rationale                         |
| -------------- | ------------------ | --------------------------------------- | --------------------------------- |
| **Size**       | `h-10 w-10` (40px) | `w-32 h-32 lg:w-40 lg:h-40` (128-160px) | Header needs compact size         |
| **Ring**       | `ring-2`           | `ring-4`                                | Thicker ring for larger image     |
| **Shadow**     | `shadow-md`        | `shadow-xl`                             | Larger image = deeper shadow      |
| **Transition** | `duration-200`     | `duration-300`                          | Faster for smaller element        |
| **Alt Text**   | "avatar"           | "profile picture"                       | More descriptive for main profile |
| **Extras**     | None               | Status indicator                        | Profile shows availability        |

## Color Palette

### Light Mode

- **Ring**: `#DBEAFE` (blue-100)
- **Purpose**: Subtle border that doesn't overpower

### Dark Mode

- **Ring**: `#1E3A8A80` (blue-900 at 50% opacity)
- **Purpose**: Maintains visibility without harsh contrast

## CSS Classes Reference

### Core Styles (Always Applied)

```css
rounded-2xl       /* 1rem border radius */
object-cover      /* Maintain aspect ratio, fill container */
flex-shrink-0     /* Prevent image compression in flex */
```

### Theme-Aware Styles

```css
ring-blue-100                    /* Light mode ring */
dark:ring-blue-900/50           /* Dark mode ring with opacity */
```

### Interactive Styles

```css
transition-transform duration-200  /* Smooth hover animation */
hover:scale-105                   /* 5% scale on hover */
```

### Performance Styles

```css
loading="lazy"    /* Native browser lazy loading */
```

## Best Practices Applied

### ✅ **1. Consistency**

- Same border radius across all avatar instances
- Unified color scheme (blue theme)
- Consistent hover interactions

### ✅ **2. Accessibility**

- Descriptive alt text with dynamic content
- Proper ARIA attributes where needed
- Keyboard navigation support (via parent elements)

### ✅ **3. Performance**

- Lazy loading for deferred image loads
- CSS transitions (GPU-accelerated)
- `object-cover` prevents layout shifts

### ✅ **4. Dark Mode Support**

- All styles have dark mode variants
- Opacity adjustments for proper contrast
- Theme-aware ring colors

### ✅ **5. Responsive Design**

- Size adjustments for mobile/desktop (UserProfile)
- Maintains proportion at all breakpoints
- Touch-friendly hover states

### ✅ **6. Visual Hierarchy**

- Header avatar: Subtle, non-distracting
- Profile avatar: Featured, prominent
- Shadow depth matches importance

## Testing Checklist

When implementing avatar styles:

- [ ] Border radius is `rounded-2xl`
- [ ] Ring border matches theme (blue-100 / blue-900/50)
- [ ] Appropriate shadow depth for context
- [ ] Hover scale animation works smoothly
- [ ] Dark mode styling is properly applied
- [ ] Alt text is descriptive and dynamic
- [ ] Lazy loading attribute is present
- [ ] `object-cover` maintains aspect ratio
- [ ] Image doesn't shrink in flex containers
- [ ] Transitions are smooth (no jank)

## Migration Guide

To update an existing avatar to the new style:

### Before (Old Style)

```vue
<img :src="avatar" alt="User" class="h-10 w-10 rounded-full" />
```

### After (New Style)

```vue
<img
  :src="avatar"
  :alt="`${name} avatar`"
  class="h-10 w-10 rounded-2xl object-cover ring-2 ring-blue-100 dark:ring-blue-900/50 shadow-md transition-transform duration-200 hover:scale-105 flex-shrink-0"
  loading="lazy"
/>
```

### Key Changes

1. `rounded-full` → `rounded-2xl`
2. Added: `ring-2 ring-blue-100 dark:ring-blue-900/50`
3. Added: `shadow-md`
4. Added: `transition-transform duration-200 hover:scale-105`
5. Added: `object-cover` and `flex-shrink-0`
6. Added: `loading="lazy"`
7. Improved: Dynamic alt text

## Related Files

- `src/layouts/DashboardLayout.vue` - Top bar avatar
- `src/components/dashboard/UserProfile.vue` - Profile avatar
- `tailwind.config.js` - Theme configuration

## Future Considerations

- Avatar upload functionality
- Multiple avatar sizes (xs, sm, md, lg, xl)
- Avatar placeholder for missing images
- Profile status indicators
- Avatar group components for teams
