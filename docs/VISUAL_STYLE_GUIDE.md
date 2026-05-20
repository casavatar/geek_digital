# Visual Style Guide - Liquid Glass Design System

**Last Updated:** 2025-01-21
**Version:** 1.0.0
**Status:** Production Ready

## Table of Contents

1. [Design Principles](#design-principles)
2. [Visual Language](#visual-language)
3. [Color Palette](#color-palette)
4. [Typography System](#typography-system)
5. [Spacing & Rhythm](#spacing--rhythm)
6. [Component Gallery](#component-gallery)
7. [Usage Guidelines](#usage-guidelines)
8. [Accessibility Standards](#accessibility-standards)

---

## Design Principles

### 1. Glassmorphism Aesthetic

The Liquid Glass design system is built on the principle of **glassmorphism** - a modern design trend that creates depth through transparency, blur effects, and layered elements.

**Core Characteristics:**
- **Semi-transparency:** Elements allow background visibility
- **Backdrop blur:** Creates frosted glass effect
- **Subtle borders:** Defines edges without harsh lines
- **Layered depth:** Multiple levels create visual hierarchy
- **Smooth transitions:** All interactions feel fluid and natural

**Philosophy:**
> "Design should feel like looking through a window - clear enough to see through, but refined enough to notice the glass itself."

### 2. Consistency Over Creativity

While glassmorphism allows for creative expression, **consistency** is paramount:
- Use established patterns from this guide
- Maintain uniform spacing and sizing
- Apply consistent hover/active states
- Follow the defined color palette
- Respect typography hierarchy

### 3. Performance First

Beautiful design should never compromise performance:
- Limit backdrop-blur to visible elements
- Use hardware-accelerated properties (transform, opacity)
- Implement progressive enhancement
- Optimize for 60fps interactions

### 4. Accessibility Always

Visual beauty must be accessible to all users:
- Minimum WCAG AA contrast ratios (4.5:1 for text)
- Visible focus indicators on all interactive elements
- Support for reduced motion preferences
- Color is never the only indicator of state

---

## Visual Language

### Glassmorphism Effect Anatomy

```
┌─────────────────────────────────────────┐
│   ┌─────────────────────────────────┐   │ ← Subtle border (white/50% or gray-700/50%)
│   │                                 │   │
│   │   Semi-transparent Background   │   │ ← bg-white/80 or bg-gray-900/80
│   │   with Backdrop Blur            │   │
│   │                                 │   │ ← backdrop-blur-md (8px)
│   │   Content with High Contrast    │   │
│   │                                 │   │ ← text-gray-900 or text-gray-100
│   └─────────────────────────────────┘   │
│                                         │ ← Soft shadow (shadow-lg)
└─────────────────────────────────────────┘
```

### Light Mode vs Dark Mode

**Light Mode:**
- Background: Light, airy gradients (primary-50, secondary-50)
- Glass: White with 80% opacity (rgba(255, 255, 255, 0.8))
- Text: Dark grays (gray-900, gray-600)
- Borders: Light white overlays (white/50)

**Dark Mode:**
- Background: Deep, subtle gradients (gray-900, primary-900/20)
- Glass: Dark with 80% opacity (rgba(17, 24, 39, 0.8))
- Text: Light grays (gray-100, gray-300)
- Borders: Medium gray overlays (gray-700/50)

### Depth Hierarchy

**Level 1: Page Background**
- Purpose: Ambient environment
- Implementation: Subtle gradients from brand colors
- Example: `bg-gradient-to-br from-primary-50 via-secondary-50/20 to-primary-50`

**Level 2: Glass Containers**
- Purpose: Primary content areas
- Implementation: Semi-transparent cards with blur
- Example: `bg-white/80 backdrop-blur-md`

**Level 3: Interactive Elements**
- Purpose: Buttons, inputs, badges
- Implementation: Slightly more opaque, gradient fills
- Example: `bg-gradient-to-r from-primary-600 to-primary-700`

**Level 4: Elevated Content**
- Purpose: Modals, dropdowns, tooltips
- Implementation: Higher opacity, stronger blur
- Example: `bg-white/90 backdrop-blur-xl`

---

## Color Palette

### Brand Colors

#### Primary (Blue)
Professional, trustworthy, tech-forward

```css
/* Tailwind scale */
primary-50:  #eff6ff  /* Lightest - backgrounds */
primary-100: #dbeafe  /* Light - hover states */
primary-200: #bfdbfe
primary-300: #93c5fd
primary-400: #60a5fa
primary-500: #3b82f6  /* Base primary */
primary-600: #2563eb  /* Main action color - buttons, links */
primary-700: #1d4ed8  /* Hover state */
primary-800: #1e40af  /* Active/pressed state */
primary-900: #1e3a8a  /* Darkest - dark mode backgrounds */
```

**Usage Examples:**
- Buttons: `from-primary-600 to-primary-700`
- Links: `text-primary-600 dark:text-primary-400`
- Backgrounds: `bg-primary-50` (light), `bg-primary-900/20` (dark)

#### Secondary (Purple)
Creative, innovative, distinct

```css
secondary-50:  #faf5ff
secondary-100: #f3e8ff
secondary-200: #e9d5ff
secondary-300: #d8b4fe
secondary-400: #c084fc
secondary-500: #a855f7  /* Base secondary */
secondary-600: #9333ea  /* Main secondary action */
secondary-700: #7e22ce  /* Hover state */
secondary-800: #6b21a8
secondary-900: #581c87  /* Darkest */
```

**Usage Examples:**
- Accent elements: `text-secondary-600`
- Gradients: `to-secondary-600`
- Badges: `bg-secondary-100/60`

### Neutral Colors

#### Light Mode Grays
```css
gray-50:  #f9fafb  /* Lightest backgrounds */
gray-100: #f3f4f6  /* Light backgrounds */
gray-200: #e5e7eb  /* Borders, dividers */
gray-300: #d1d5db  /* Input borders */
gray-400: #9ca3af  /* Placeholder text */
gray-500: #6b7280  /* Icons, secondary text */
gray-600: #4b5563  /* Secondary text */
gray-700: #374151  /* Primary text (light mode) */
gray-800: #1f2937  /* Headings */
gray-900: #111827  /* Primary text, headings */
```

#### Dark Mode Grays
```css
gray-50:  #f9fafb  /* Primary text (dark mode) */
gray-100: #f3f4f6  /* Primary text */
gray-200: #e5e7eb  /* High emphasis text */
gray-300: #d1d5db  /* Secondary text */
gray-400: #9ca3af  /* Tertiary text */
gray-500: #6b7280  /* Icons */
gray-600: #4b5563  /* Borders */
gray-700: #374151  /* Dividers */
gray-800: #1f2937  /* Card backgrounds */
gray-900: #111827  /* Page backgrounds */
gray-950: #030712  /* Deep backgrounds */
```

### Semantic Colors

#### Success (Green)
```css
green-50:  #f0fdf4
green-500: #10b981  /* Success state */
green-700: #047857  /* Success hover */
```

**Usage:** Success messages, completed states, positive feedback

#### Warning (Yellow/Amber)
```css
yellow-50:  #fefce8
yellow-500: #f59e0b  /* Warning state */
yellow-700: #d97706  /* Warning emphasis */
```

**Usage:** Warnings, caution states, pending actions

#### Error (Red)
```css
red-50:  #fef2f2
red-500: #ef4444  /* Error state */
red-700: #dc2626  /* Error emphasis */
```

**Usage:** Errors, destructive actions, failed states

#### Info (Blue)
```css
blue-50:  #eff6ff
blue-500: #3b82f6  /* Info state */
blue-700: #1d4ed8  /* Info emphasis */
```

**Usage:** Informational messages, help text

### Glass-Specific Colors

#### Light Mode Glass
```css
--glass-bg-primary:   rgba(255, 255, 255, 0.8)  /* Main containers */
--glass-bg-secondary: rgba(255, 255, 255, 0.6)  /* Secondary containers */
--glass-bg-tertiary:  rgba(255, 255, 255, 0.4)  /* Tertiary elements */

--glass-border-light:  rgba(255, 255, 255, 0.5)  /* Bright borders */
--glass-border-medium: rgba(255, 255, 255, 0.3)  /* Medium borders */
--glass-border-dark:   rgba(209, 213, 219, 0.3)  /* Subtle borders */
```

#### Dark Mode Glass
```css
--glass-bg-primary:   rgba(17, 24, 39, 0.8)   /* Main containers */
--glass-bg-secondary: rgba(31, 41, 55, 0.8)   /* Secondary containers */
--glass-bg-tertiary:  rgba(55, 65, 81, 0.7)   /* Tertiary elements */

--glass-border-light:  rgba(75, 85, 99, 0.5)  /* Bright borders */
--glass-border-medium: rgba(55, 65, 81, 0.5)  /* Medium borders */
--glass-border-dark:   rgba(31, 41, 55, 0.5)  /* Subtle borders */
```

### Color Usage Guidelines

**DO:**
- ✅ Use semantic colors for their intended purpose
- ✅ Maintain contrast ratios in both light and dark modes
- ✅ Use brand colors for primary actions
- ✅ Use neutral grays for text hierarchy
- ✅ Test colors with accessibility tools

**DON'T:**
- ❌ Use semantic colors decoratively (red for non-errors)
- ❌ Mix too many brand colors in one interface
- ❌ Rely on color alone to convey information
- ❌ Use colors with insufficient contrast
- ❌ Hardcode hex values (use Tailwind classes)

---

## Typography System

### Font Families

#### Sans Serif (Primary)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Usage:** All UI text, headings, body copy
**Characteristics:** Clean, modern, highly legible
**Weights Available:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

#### Monospace (Code/Data)
```css
font-family: 'Fira Code', 'Courier New', monospace;
```

**Usage:** Code snippets, license keys, technical data
**Characteristics:** Fixed-width, developer-friendly

### Type Scale

#### Heading Sizes
```css
/* H1 - Page Titles */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }     /* 36px */
.text-5xl { font-size: 3rem; line-height: 1; }             /* 48px */
.text-6xl { font-size: 3.75rem; line-height: 1; }          /* 60px */

/* H2 - Section Headings */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }   /* 30px */

/* H3 - Subsection Headings */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }        /* 24px */

/* H4 - Component Titles */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }     /* 20px */
```

#### Body Sizes
```css
/* Large Body */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }    /* 18px */

/* Base Body (Default) */
.text-base { font-size: 1rem; line-height: 1.5rem; }       /* 16px */

/* Small Body */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }    /* 14px */

/* Extra Small (Captions, Labels) */
.text-xs { font-size: 0.75rem; line-height: 1rem; }        /* 12px */
```

### Font Weights

```css
.font-normal   { font-weight: 400; }  /* Body text */
.font-medium   { font-weight: 500; }  /* Emphasis, buttons */
.font-semibold { font-weight: 600; }  /* Headings, titles */
.font-bold     { font-weight: 700; }  /* Strong headings */
```

### Line Heights

```css
.leading-none    { line-height: 1; }      /* Tight headings */
.leading-tight   { line-height: 1.25; }   /* Headings */
.leading-snug    { line-height: 1.375; }  /* Subheadings */
.leading-normal  { line-height: 1.5; }    /* Body text */
.leading-relaxed { line-height: 1.625; }  /* Comfortable reading */
.leading-loose   { line-height: 2; }      /* Very relaxed */
```

### Typography Patterns

#### Page Title (Hero)
```vue
<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold
           bg-gradient-to-r from-primary-600 to-secondary-600
           dark:from-primary-400 dark:to-secondary-400
           bg-clip-text text-transparent">
  Welcome to GeekDigital
</h1>
```

#### Section Heading
```vue
<h2 class="text-3xl md:text-4xl font-bold text-center mb-12
           text-gray-900 dark:text-gray-100">
  Our Services
</h2>
```

#### Card Title
```vue
<h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
  Card Title
</h3>
```

#### Body Text
```vue
<p class="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
  This is standard body text with good readability.
</p>
```

#### Small Text / Captions
```vue
<span class="text-sm text-gray-600 dark:text-gray-400">
  Last updated: January 2025
</span>
```

### Typography Guidelines

**DO:**
- ✅ Use gradient text for hero titles
- ✅ Maintain consistent heading hierarchy (H1 → H2 → H3)
- ✅ Use leading-relaxed for long-form content
- ✅ Apply font-semibold or font-bold to headings
- ✅ Ensure sufficient contrast in both themes

**DON'T:**
- ❌ Skip heading levels (H1 → H3)
- ❌ Use more than 3 font sizes on one screen
- ❌ Set line-height too tight for body text
- ❌ Use font-bold for body text
- ❌ Mix serif and sans-serif fonts

---

## Spacing & Rhythm

### Spacing Scale

Based on 4px (0.25rem) increments:

```css
0    → 0px       /* None */
px   → 1px       /* Hairline */
0.5  → 2px       /* Micro */
1    → 4px       /* Tiny */
1.5  → 6px       /* Extra small */
2    → 8px       /* Small */
3    → 12px      /* Medium */
4    → 16px      /* Base (1rem) */
5    → 20px      /* Large */
6    → 24px      /* Extra large */
8    → 32px      /* 2x */
10   → 40px      /* 2.5x */
12   → 48px      /* 3x */
16   → 64px      /* 4x */
20   → 80px      /* 5x */
24   → 96px      /* 6x */
```

### Common Spacing Patterns

#### Component Padding
```css
/* Card padding */
.glass-card { @apply p-6; }                    /* 24px all sides */

/* Card header/footer */
.glass-card-header { @apply p-6 pb-4; }        /* 24px horizontal, 16px bottom */

/* Button padding */
.glass-btn { @apply px-6 py-2.5; }             /* 24px horizontal, 10px vertical */

/* Input padding */
.glass-input { @apply px-4 py-2.5; }           /* 16px horizontal, 10px vertical */
```

#### Section Spacing
```css
/* Page sections */
.glass-section { @apply py-16 md:py-20; }      /* 64px → 80px vertical */

/* Section with content */
.glass-container { @apply px-4 sm:px-6 lg:px-8; }  /* Responsive horizontal */

/* Component gaps */
.glass-grid { @apply gap-6; }                  /* 24px between items */
```

#### Stacking Rhythm
```css
/* Tight spacing (form groups) */
.space-y-2 { margin-bottom: 8px; }

/* Standard spacing (card sections) */
.space-y-4 { margin-bottom: 16px; }

/* Loose spacing (page sections) */
.space-y-8 { margin-bottom: 32px; }
```

### Responsive Spacing

Use Tailwind's responsive prefixes:

```vue
<div class="p-4 md:p-6 lg:p-8">
  <!-- 16px mobile, 24px tablet, 32px desktop -->
</div>

<section class="py-8 md:py-12 lg:py-16">
  <!-- Responsive vertical padding -->
</section>
```

---

## Component Gallery

### 1. Glass Card (Standard)

**Visual:**
```
┌─────────────────────────────────────┐
│  Card Title                    🟦   │  ← Header with badge
├─────────────────────────────────────┤
│  This is the card body content.     │  ← Body
│  It contains main information and   │
│  supports various content types.    │
├─────────────────────────────────────┤
│                     [Cancel] [Save] │  ← Footer with actions
└─────────────────────────────────────┘
```

**Code:**
```vue
<div class="glass-card">
  <div class="glass-card-header">
    <h3 class="glass-card-title">Card Title</h3>
    <span class="glass-badge glass-badge-primary">New</span>
  </div>
  <div class="glass-card-body">
    <p class="text-gray-700 dark:text-gray-300">
      This is the card body content.
    </p>
  </div>
  <div class="glass-card-footer">
    <button class="glass-btn-outline">Cancel</button>
    <button class="glass-btn-primary">Save</button>
  </div>
</div>
```

**Light Mode:** Semi-transparent white with subtle shadow
**Dark Mode:** Semi-transparent dark gray with stronger shadow

---

### 2. Glass Buttons

**Visual:**
```
Primary:   [  Action  ]  ← Gradient fill, shadow, scale on hover
Secondary: [  Action  ]  ← Purple gradient
Outline:   [  Action  ]  ← Transparent with border
Ghost:     [  Action  ]  ← Minimal, hover background
Icon:      [ 🔍 ]        ← Square/circular icon button
```

**Code:**
```vue
<!-- Primary -->
<button class="glass-btn-primary">Primary Action</button>

<!-- Secondary -->
<button class="glass-btn-secondary">Secondary Action</button>

<!-- Outline -->
<button class="glass-btn-outline">Outline Action</button>

<!-- Ghost -->
<button class="glass-btn-ghost">Ghost Action</button>

<!-- Icon -->
<button class="glass-btn-icon">
  <svg class="w-5 h-5">...</svg>
</button>
```

**States:**
- Default: Standard appearance
- Hover: Slight scale (105%), darker gradient
- Active: Scale back to 100%
- Focus: Ring outline (4px, primary-300)
- Disabled: 50% opacity, no cursor

---

### 3. Glass Inputs

**Visual:**
```
Label: Email Address
┌─────────────────────────────────┐
│ user@example.com               │  ← Semi-transparent, blur
└─────────────────────────────────┘
Hint: We'll never share your email.

Error State (red border, red ring)
Success State (green border, green ring)
```

**Code:**
```vue
<div class="glass-input-group">
  <label class="glass-label">Email Address</label>
  <input
    type="email"
    class="glass-input"
    placeholder="user@example.com"
  />
  <span class="glass-input-hint">We'll never share your email.</span>
</div>

<!-- Error state -->
<input class="glass-input glass-input-error" />

<!-- Success state -->
<input class="glass-input glass-input-success" />
```

---

### 4. Glass Badges

**Visual:**
```
Status: [Active] [Pending] [Error] [Success]
Colors: Blue     Yellow    Red      Green
```

**Code:**
```vue
<span class="glass-badge glass-badge-primary">Primary</span>
<span class="glass-badge glass-badge-warning">Warning</span>
<span class="glass-badge glass-badge-error">Error</span>
<span class="glass-badge glass-badge-success">Success</span>
<span class="glass-badge glass-badge-info">Info</span>
```

---

### 5. Glass Navigation

**Visual:**
```
┌─────────────────────────────────────────────────────┐
│  G GeekDigital    Home Catalog Shop    🛒 👤       │ ← Fixed, blur
└─────────────────────────────────────────────────────┘
```

**Code:**
```vue
<nav class="glass-nav">
  <div class="glass-nav-container">
    <router-link to="/" class="flex items-center space-x-2">
      <div class="glass-nav-logo">G</div>
      <span class="glass-nav-brand-text">GeekDigital</span>
    </router-link>

    <div class="glass-nav-links">
      <router-link to="/" class="glass-nav-link">Home</router-link>
      <router-link to="/catalog" class="glass-nav-link">Catalog</router-link>
    </div>
  </div>
</nav>
```

---

### 6. Glass Modal

**Visual:**
```
[Dark overlay with blur]
  ┌─────────────────────────────┐
  │  Modal Title            ✕   │
  ├─────────────────────────────┤
  │  Modal content goes here.   │
  │                             │
  ├─────────────────────────────┤
  │           [Cancel] [Confirm]│
  └─────────────────────────────┘
```

**Code:**
```vue
<Transition name="glass-fade">
  <div v-if="isOpen" class="glass-modal" @click.self="close">
    <div class="glass-modal-overlay"></div>
    <Transition name="glass-scale">
      <div class="glass-modal-content">
        <div class="glass-modal-header">
          <h3 class="glass-modal-title">Modal Title</h3>
          <button class="glass-modal-close" @click="close">×</button>
        </div>
        <div class="glass-modal-body">
          Content
        </div>
        <div class="glass-modal-footer">
          <button class="glass-btn-outline" @click="close">Cancel</button>
          <button class="glass-btn-primary" @click="confirm">Confirm</button>
        </div>
      </div>
    </Transition>
  </div>
</Transition>
```

---

## Usage Guidelines

### DO's ✅

1. **Use glassmorphism for primary content containers**
   - Cards, modals, navigation
   - Maintain 80% opacity for visibility

2. **Apply consistent hover states**
   - Scale: 102-105% for cards
   - Shadow increase: lg → xl
   - Slight opacity increase

3. **Layer elements properly**
   - Background gradients at bottom
   - Glass containers in middle
   - Interactive elements on top

4. **Test in both themes**
   - Verify contrast ratios
   - Check border visibility
   - Ensure focus states work

5. **Use smooth transitions**
   - 200-300ms for most interactions
   - Ease-out for natural feel

### DON'Ts ❌

1. **Don't stack more than 2 blur layers**
   - Performance impact
   - Visual confusion
   - Use sparingly

2. **Don't use extreme opacity**
   - Avoid < 0.6 (too transparent)
   - Avoid > 0.95 (defeats purpose)
   - Stick to 0.7-0.9 range

3. **Don't mix design systems**
   - Use glass OR solid, not both
   - Maintain consistency

4. **Don't forget dark mode**
   - Always include dark: variants
   - Test visibility

5. **Don't sacrifice accessibility**
   - Maintain contrast
   - Provide focus indicators
   - Support keyboard navigation

---

## Accessibility Standards

### WCAG AA Compliance

**Contrast Ratios:**
- Normal text (< 18px): Minimum 4.5:1
- Large text (≥ 18px): Minimum 3:1
- Interactive elements: Minimum 3:1

**Testing Tools:**
- WebAIM Contrast Checker
- Chrome DevTools Accessibility
- axe DevTools browser extension

### Text Contrast Examples

**Light Mode:**
```css
/* ✅ PASS: 14.3:1 */
.text-gray-900 on .bg-white

/* ✅ PASS: 7.0:1 */
.text-gray-700 on .bg-white

/* ⚠️ BORDERLINE: 4.5:1 */
.text-gray-600 on .bg-white
```

**Dark Mode:**
```css
/* ✅ PASS: 15.8:1 */
.text-gray-100 on .bg-gray-900

/* ✅ PASS: 8.6:1 */
.text-gray-300 on .bg-gray-900

/* ⚠️ BORDERLINE: 4.6:1 */
.text-gray-400 on .bg-gray-900
```

### Focus Indicators

All interactive elements MUST have visible focus indicators:

```css
/* Button focus */
.glass-btn-primary:focus {
  @apply ring-4 ring-primary-300 dark:ring-primary-800;
}

/* Input focus */
.glass-input:focus {
  @apply ring-2 ring-primary-500 border-primary-500;
}

/* Link focus */
.glass-nav-link:focus {
  @apply ring-2 ring-offset-2 ring-primary-500;
}
```

### Keyboard Navigation

Support full keyboard navigation:
- Tab: Move between interactive elements
- Enter/Space: Activate buttons/links
- Escape: Close modals/dropdowns
- Arrow keys: Navigate within lists

### Screen Reader Support

Use semantic HTML and ARIA labels:

```vue
<!-- Good: Semantic button -->
<button class="glass-btn-icon" aria-label="Close modal">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Good: Navigation landmark -->
<nav class="glass-nav" aria-label="Main navigation">
  ...
</nav>

<!-- Good: Status announcement -->
<div role="status" aria-live="polite">
  {{ statusMessage }}
</div>
```

### Reduced Motion

Respect user motion preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Blindness Considerations

Don't rely solely on color:

```vue
<!-- Bad: Color only -->
<span class="text-red-600">Error</span>

<!-- Good: Icon + color + text -->
<span class="text-red-600 dark:text-red-400">
  <svg class="inline w-4 h-4"><!-- X icon --></svg>
  Error: Invalid input
</span>
```

---

## Quick Reference

### Most Common Classes

```css
/* Cards */
.glass-card
.glass-card-interactive
.glass-card-header
.glass-card-title
.glass-card-body

/* Buttons */
.glass-btn-primary
.glass-btn-secondary
.glass-btn-outline
.glass-btn-ghost
.glass-btn-icon

/* Forms */
.glass-input
.glass-label
.glass-input-hint

/* Badges */
.glass-badge
.glass-badge-primary
.glass-badge-success
.glass-badge-warning
.glass-badge-error

/* Navigation */
.glass-nav
.glass-nav-container
.glass-nav-link

/* Layout */
.glass-container
.glass-section
.glass-grid
```

### Color Quick Reference

```css
/* Brand */
primary-600    /* Main blue */
secondary-600  /* Main purple */

/* Semantic */
green-500      /* Success */
yellow-500     /* Warning */
red-500        /* Error */
blue-500       /* Info */

/* Neutrals */
gray-50        /* Lightest */
gray-900       /* Darkest */
```

### Spacing Quick Reference

```css
/* Component padding */
p-4  → 16px
p-6  → 24px
p-8  → 32px

/* Gaps */
gap-4  → 16px
gap-6  → 24px

/* Section spacing */
py-12  → 48px vertical
py-16  → 64px vertical
py-20  → 80px vertical
```

---

**Document Version:** 1.0.0
**Last Updated:** 2025-01-21
**Next Review:** 2025-04-21
**Maintained by:** GeekDigital Design Team

For implementation details, see:
- [COMPONENT_ARCHITECTURE.md](./COMPONENT_ARCHITECTURE.md)
- [DESIGN_SYSTEM_TOKENS.md](./DESIGN_SYSTEM_TOKENS.md)
- [DARK_MODE_SUPPORT.md](./DARK_MODE_SUPPORT.md)
