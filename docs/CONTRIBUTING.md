# Contributing to GeekDigital

Last Updated: 2025-01-21

## Table of Contents

1. [Welcome](#welcome)
2. [Code of Conduct](#code-of-conduct)
3. [Getting Started](#getting-started)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Git Workflow](#git-workflow)
7. [Pull Request Process](#pull-request-process)
8. [Testing Requirements](#testing-requirements)
9. [Documentation Guidelines](#documentation-guidelines)
10. [Issue Reporting](#issue-reporting)
11. [Community](#community)

---

## Welcome

Thank you for considering contributing to GeekDigital! We welcome contributions from the community and are excited to see what you'll build.

### Ways to Contribute

- **Code**: Bug fixes, new features, performance improvements
- **Documentation**: Improve guides, fix typos, add examples
- **Design**: UI/UX improvements, mockups, design assets
- **Testing**: Write tests, report bugs, test new features
- **Community**: Help answer questions, review PRs, share knowledge

### First Time Contributors

If this is your first time contributing to open source, we recommend:

1. Read this entire guide
2. Look for issues tagged with `good-first-issue`
3. Start with documentation or small bug fixes
4. Ask questions - we're here to help!

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive Behavior**:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards other community members

**Unacceptable Behavior**:

- Trolling, insulting/derogatory comments, personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, issues, and other contributions that don't align with this Code of Conduct.

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

1. **Completed Setup**: Follow [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. **Read Documentation**:
   - [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
   - [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)
   - [API_REFERENCE.md](./API_REFERENCE.md)
3. **Development Environment**: Working local setup with tests passing

### Quick Setup

```bash
# Fork and clone repository
git clone https://github.com/YOUR-USERNAME/geek_digital.git
cd geek_digital

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/geek_digital.git

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/my-new-feature

# Start development server
npm run dev
```

---

## Development Workflow

### 1. Find or Create an Issue

**Before starting work**:

- Check if an issue already exists
- If not, create a new issue describing the feature/bug
- Wait for approval from maintainers
- Get assigned to the issue

**Issue Template**:

```markdown
### Description
Clear description of the feature/bug

### Motivation
Why is this needed?

### Proposed Solution
How will you solve it?

### Additional Context
Screenshots, links, etc.
```

### 2. Create a Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/add-user-profile
# or
git checkout -b fix/cart-total-calculation
# or
git checkout -b docs/improve-api-reference
```

**Branch Naming Convention**:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring
- `test/description` - Adding tests
- `chore/description` - Maintenance tasks

### 3. Make Changes

Follow [Coding Standards](#coding-standards) and commit frequently.

```bash
# Make changes
# Test locally
npm run dev

# Commit changes
git add .
git commit -m "feat: add user profile page"
```

### 4. Test Your Changes

```bash
# Run tests (when implemented)
npm test

# Build production
npm run build

# Preview production build
npm run preview

# Check for errors
# - No console errors
# - All features work
# - Responsive design
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/add-user-profile

# Create pull request on GitHub
```

---

## Coding Standards

### JavaScript/Vue 3 Style

#### 1. Use Composition API

```javascript
// ✅ Good: Composition API with <script setup>
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

// ❌ Avoid: Options API
<script>
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    doubled() {
      return this.count * 2
    }
  }
}
</script>
```

#### 2. Component Organization

```vue
<script setup>
// 1. IMPORTS (external libraries first, then internal)
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

// 2. STORES AND COMPOSABLES
const authStore = useAuthStore()
const router = useRouter()

// 3. COMPONENT STATE (refs)
const loading = ref(false)
const data = ref([])

// 4. COMPUTED PROPERTIES
const filteredData = computed(() => /* ... */)

// 5. METHODS
const fetchData = async () => {
  // Implementation
}

// 6. LIFECYCLE HOOKS
onMounted(() => {
  fetchData()
})

// 7. WATCHERS (if needed)
// watch(source, callback)
</script>

<template>
  <!-- 8. TEMPLATE -->
</template>

<style scoped>
/* 9. COMPONENT-SPECIFIC STYLES (avoid when possible) */
</style>
```

#### 3. Naming Conventions

```javascript
// Variables: camelCase
const userName = 'John'
const isAuthenticated = true

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3
const API_TIMEOUT = 5000

// Components: PascalCase
import UserProfile from '@/components/UserProfile.vue'

// Files: PascalCase for components, camelCase for utilities
// - UserProfile.vue
// - authService.js
// - formatDate.js

// CSS classes: kebab-case
<div class="user-profile-card"></div>

// Pinia stores: use + StoreName + Store
const authStore = useAuthStore()
```

#### 4. Meaningful Names

```javascript
// ✅ Good: Descriptive names
const isUserAuthenticated = computed(() => !!user.value)
const totalCartPrice = computed(() => items.reduce((sum, item) => sum + item.price, 0))

// ❌ Bad: Unclear names
const x = computed(() => !!u.value)
const total = computed(() => i.reduce((s, itm) => s + itm.p, 0))
```

#### 5. Function Style

```javascript
// ✅ Good: Arrow functions for simple operations
const increment = () => count.value++
const double = (n) => n * 2

// ✅ Good: Async/await for asynchronous operations
const fetchData = async () => {
  try {
    const response = await api.getData()
    data.value = response
  } catch (error) {
    console.error(error)
  }
}

// ❌ Avoid: .then() chains
fetchData().then(data => {
  // ...
}).catch(error => {
  // ...
})
```

#### 6. Error Handling

```javascript
// ✅ Good: Always handle errors
const saveData = async () => {
  loading.value = true
  error.value = null
  try {
    await api.save(data.value)
  } catch (err) {
    error.value = err.message
    console.error('Failed to save:', err)
  } finally {
    loading.value = false
  }
}

// ❌ Bad: Silent failures
const saveData = async () => {
  try {
    await api.save(data.value)
  } catch (err) {
    // Nothing happens - user has no feedback
  }
}
```

### Vue Template Style

```vue
<!-- ✅ Good: Clear, readable -->
<template>
  <div class="container">
    <h1 class="title">{{ pageTitle }}</h1>

    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="content">
      <article v-for="post in posts" :key="post.id" class="post">
        <h2>{{ post.title }}</h2>
        <p>{{ post.excerpt }}</p>
        <button @click="readPost(post.id)">Read More</button>
      </article>
    </div>
  </div>
</template>

<!-- ❌ Avoid: Inline complex logic -->
<template>
  <div>
    <div v-if="user && user.profile && user.profile.settings && user.profile.settings.theme === 'dark'">
      Dark mode content
    </div>
  </div>
</template>
<!-- Instead: Use computed property -->
<script setup>
const isDarkMode = computed(() => user.value?.profile?.settings?.theme === 'dark')
</script>
<template>
  <div v-if="isDarkMode">Dark mode content</div>
</template>
```

### Tailwind CSS Style

```vue
<!-- ✅ Good: Use Tailwind utilities -->
<button class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
  Submit
</button>

<!-- ✅ Good: Use custom component classes for repetition -->
<!-- Defined in src/assets/main.css -->
<button class="btn-primary">Submit</button>

<!-- ❌ Avoid: Custom CSS when Tailwind suffices -->
<button class="custom-button">Submit</button>
<style>
.custom-button {
  padding: 0.5rem 1.5rem;
  background-color: #3B82F6;
  /* ... */
}
</style>
```

---

## Git Workflow

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```html
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring (no functional changes)
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

**Examples**:

```bash
# Feature
git commit -m "feat(shop): add product filtering by category"

# Bug fix
git commit -m "fix(cart): correct total price calculation"

# Documentation
git commit -m "docs(api): update auth store API reference"

# Refactoring
git commit -m "refactor(auth): simplify login error handling"

# Multiple lines
git commit -m "feat(user): add user profile page

- Add profile component
- Create profile route
- Integrate with user store
- Add profile form validation

Closes #123"
```

**Commit Best Practices**:

- Commit early and often
- Each commit should be a logical unit
- Write clear, descriptive messages
- Reference issue numbers when applicable

### Branch Management

```bash
# Keep your branch up to date with main
git checkout main
git pull upstream main
git checkout feature/my-feature
git merge main

# Or use rebase (cleaner history)
git checkout feature/my-feature
git rebase main

# Resolve conflicts if any
# Then continue rebase
git rebase --continue
```

### Before Submitting PR

```bash
# 1. Update your branch with latest main
git checkout main
git pull upstream main
git checkout feature/my-feature
git merge main

# 2. Run tests
npm test

# 3. Check build
npm run build

# 4. Review your changes
git diff main

# 5. Push to your fork
git push origin feature/my-feature
```

---

## Pull Request Process

### Creating a Pull Request

1. **Push your branch** to your fork
2. **Go to GitHub** and click "New Pull Request"
3. **Select branches**:
   - Base: `main` (upstream repository)
   - Compare: `feature/my-feature` (your fork)
4. **Fill out PR template** (see below)
5. **Submit** and wait for review

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issue
Closes #123

## Changes Made
- Added user profile page
- Created profile route
- Integrated with user store
- Added form validation

## Screenshots (if applicable)
![Screenshot](url)

## Testing Done
- [ ] Tested locally
- [ ] All existing features work
- [ ] New feature works as expected
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Production build works

## Checklist
- [ ] My code follows the coding standards
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

### Review Process

1. **Automated Checks**: CI/CD runs tests and builds
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address any comments or requested changes
4. **Approval**: Once approved, PR is merged
5. **Cleanup**: Delete your feature branch after merge

### Responding to Feedback

```bash
# Make requested changes
# Edit files

# Commit changes
git add .
git commit -m "fix: address PR feedback"

# Push to same branch
git push origin feature/my-feature

# PR automatically updates
```

### After PR is Merged

```bash
# Update your local main
git checkout main
git pull upstream main

# Delete feature branch locally
git branch -d feature/my-feature

# Delete feature branch on your fork
git push origin --delete feature/my-feature
```

---

## Testing Requirements

### Current Testing Strategy

The project currently has no automated tests. We welcome contributions to add testing infrastructure!

### Recommended Testing Stack

```bash
# Install testing dependencies
npm install -D vitest @vue/test-utils happy-dom
```

### Writing Tests

#### Unit Test Example

```javascript
// src/store/modules/__tests__/auth.spec.js
import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../auth'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with null user', () => {
    const store = useAuthStore()
    expect(store.user).toBe(null)
    expect(store.isAuthenticated).toBe(false)
  })

  it('should set user on successful login', async () => {
    const store = useAuthStore()
    const result = await store.login('test@example.com', 'password')

    expect(result.success).toBe(true)
    expect(store.user).toBeTruthy()
    expect(store.isAuthenticated).toBe(true)
  })
})
```

#### Component Test Example

```javascript
// src/components/__tests__/Navbar.spec.js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Navbar from '../layout/Navbar.vue'

describe('Navbar', () => {
  it('should render navigation links', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.find('a[href="/"]').exists()).toBe(true)
    expect(wrapper.find('a[href="/shop"]').exists()).toBe(true)
  })

  it('should show login link when not authenticated', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.find('a[href="/auth/login"]').exists()).toBe(true)
  })
})
```

### Manual Testing Checklist

Before submitting PR, verify:

- [ ] Feature works as expected
- [ ] No console errors or warnings
- [ ] All existing features still work
- [ ] Responsive on mobile (320px, 768px, 1024px, 1920px)
- [ ] Works in Chrome, Firefox, Safari (if possible)
- [ ] Authentication flow works
- [ ] Shopping cart functions correctly
- [ ] Payment flow (test mode) works
- [ ] Routes and navigation work
- [ ] Production build works (`npm run build && npm run preview`)

---

## Documentation Guidelines

### When to Update Documentation

Update documentation when you:

- Add a new feature
- Change an API
- Fix a bug that affects usage
- Improve existing functionality

### Documentation Files to Update

| Change | Files to Update |
|--------|----------------|
| New API | `API_REFERENCE.md` |
| Setup change | `SETUP_GUIDE.md` |
| Development workflow | `DEVELOPMENT_GUIDE.md` |
| Deployment change | `DEPLOYMENT_GUIDE.md` |
| Architecture change | `ARCHITECTURE_OVERVIEW.md` |
| New dependency | `package.json` + relevant docs |

### Documentation Style

```markdown
# Title (H1 - One per document)

## Section (H2)

### Subsection (H3)

Brief introduction paragraph.

**Key Points**:
- Point one
- Point two

#### Code Examples (H4)

```javascript
// Always include code comments
const example = 'code'
```

**Expected Output**:

```text
Show what the code produces
```

### Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |

```markdown
### Code Comments

```javascript
// ✅ Good: Explain why, not what
// Calculate discount based on user tier and cart value
const discount = calculateDiscount(user.tier, cart.total)

// ❌ Bad: State the obvious
// Set discount variable
const discount = calculateDiscount(user.tier, cart.total)
```

---

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues**: Your issue may already exist
2. **Check documentation**: Maybe it's a usage question
3. **Try latest version**: Bug might be fixed

### Bug Report Template

```markdown
### Bug Description
Clear description of the bug

### Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

### Expected Behavior
What should happen

### Actual Behavior
What actually happens

### Screenshots
If applicable

### Environment
- OS: [e.g. Windows 10, macOS 12]
- Browser: [e.g. Chrome 120, Firefox 121]
- Node.js version: [e.g. 18.19.0]
- npm version: [e.g. 10.2.3]

### Additional Context
Any other relevant information
```

### Feature Request Template

```markdown
### Feature Description
Clear description of the feature

### Problem Statement
What problem does this solve?

### Proposed Solution
How would you solve it?

### Alternatives Considered
Other solutions you've considered

### Additional Context
Mockups, examples, etc.
```

---

## Community

### Getting Help

- **Documentation**: Check docs first
- **Issues**: Search existing issues
- **Discussions**: Ask questions in GitHub Discussions
- **Discord**: Join our Discord server (if available)

### Helping Others

- Answer questions in issues/discussions
- Review pull requests
- Improve documentation
- Share your experience

### Recognition

Contributors are recognized in:

- GitHub contributors page
- README.md (for significant contributions)
- Release notes
- Community highlights

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## Questions?

If you have questions about contributing:

1. Check this guide and other documentation
2. Search existing issues and discussions
3. Create a new discussion or issue
4. Reach out to maintainers

**Remember**: There are no stupid questions! We're here to help.

---

## Thank You

Thank you for taking the time to contribute to GeekDigital. Every contribution, no matter how small, helps make this project better for everyone.

**Happy Contributing!**
