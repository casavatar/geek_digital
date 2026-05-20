# GeekDigital - Context Documentation

## Welcome to GeekDigital

This folder contains comprehensive technical documentation for the GeekDigital Vue 3 + Vite project. These documents serve as the foundation for understanding the project's architecture, implementation patterns, and design decisions.

## About This Project

**GeekDigital** is a professional full-stack web application built with Vue 3 and Vite, serving as a central platform for:
- **Data Engineering Portfolio**: Showcase professional projects and expertise
- **Application Catalog**: Browse desktop and web applications
- **Digital Product Store**: Purchase licenses and manage digital products
- **User Dashboard**: Manage purchased apps and active licenses

## Documentation Structure

### Core Documentation Files

| Document | Purpose | For |
|----------|---------|-----|
| [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) | Complete project overview and quick reference | All developers |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture and design patterns | Architects, senior developers |
| [ROUTING.md](./ROUTING.md) | Route configuration and navigation guards | Frontend developers |
| [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) | Pinia stores and data flow | Frontend developers |
| [SERVICES.md](./SERVICES.md) | Service layer and external integrations | Backend integration developers |
| [AUTHENTICATION.md](./AUTHENTICATION.md) | Auth flow, Firebase setup, and security | Security-focused developers |
| [COMPONENTS.md](./COMPONENTS.md) | Component structure and patterns | UI/UX developers |

---

## Quick Start Guide

### For New Developers

**Start Here**:
1. Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) - Get the big picture (30 mins)
2. Skim [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand the layers (20 mins)
3. Review [COMPONENTS.md](./COMPONENTS.md) - See how UI is structured (15 mins)

**Then Dive Into**:
- Working on routing? → [ROUTING.md](./ROUTING.md)
- Working on state? → [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)
- Integrating APIs? → [SERVICES.md](./SERVICES.md)
- Implementing auth? → [AUTHENTICATION.md](./AUTHENTICATION.md)

### For Experienced Developers

**Quick Reference**:
- **File locations**: See [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) → Project Structure
- **Design patterns**: See [ARCHITECTURE.md](./ARCHITECTURE.md) → Design Patterns
- **API reference**: See specific component/store documentation in respective files

---

## Documentation Overview

### 1. PROJECT_CONTEXT.md

**What**: 30,000-foot view of the entire project

**Contains**:
- Project purpose and goals
- Technology stack breakdown
- Architecture overview
- Complete directory structure
- Key concepts and domain models
- Development workflow
- Entry points for new developers

**Read Time**: 30-45 minutes

**Best For**:
- New team members
- Onboarding
- Executive overview
- Documentation readers

---

### 2. ARCHITECTURE.md

**What**: Deep dive into system architecture and design patterns

**Contains**:
- Layered architecture (Presentation, State, Service, Integration)
- 7 design patterns used in the project
- Component architecture and hierarchy
- Data flow diagrams
- State management architecture
- Routing architecture
- Service layer architecture
- Security considerations
- Performance optimizations

**Read Time**: 60-90 minutes

**Best For**:
- System architects
- Senior developers
- Code reviewers
- Technical decision makers

---

### 3. ROUTING.md

**What**: Complete routing system documentation

**Contains**:
- Route map and hierarchy
- Navigation guards (auth, guest)
- Route meta fields
- Layout-based routing
- Programmatic navigation
- Scroll behavior
- Protected routes
- Redirect patterns

**Read Time**: 30-45 minutes

**Best For**:
- Frontend developers
- Feature implementation
- Navigation debugging
- Route security review

---

### 4. STATE_MANAGEMENT.md

**What**: Pinia store documentation and patterns

**Contains**:
- Store architecture (auth, cart, user)
- Complete API reference for each store
- State persistence strategies
- Store composition patterns
- Data flow diagrams
- Best practices
- Testing strategies

**Read Time**: 45-60 minutes

**Best For**:
- Frontend developers
- State management debugging
- Feature development
- Testing

---

### 5. SERVICES.md

**What**: Service layer and external integrations

**Contains**:
- Auth service (Firebase wrapper)
- Payment service (Stripe/PayPal)
- Firebase configuration
- Error handling strategies
- Demo mode implementation
- API integration patterns

**Read Time**: 45-60 minutes

**Best For**:
- Backend integration
- API developers
- Payment integration
- Firebase configuration

---

### 6. AUTHENTICATION.md

**What**: Complete authentication system documentation

**Contains**:
- Authentication architecture
- Login/register/logout flows
- Firebase setup guide
- Demo mode explained
- Route protection
- Session management
- Security considerations
- Troubleshooting guide

**Read Time**: 45-60 minutes

**Best For**:
- Security reviews
- Firebase configuration
- Auth debugging
- Security-focused developers

---

### 7. COMPONENTS.md

**What**: Component structure and UI patterns

**Contains**:
- Component hierarchy
- Layout components (DefaultLayout, AuthLayout)
- Page components (Home, Catalog, Portfolio, Shop, Dashboard, Login)
- Common components (Navbar, Footer)
- Component patterns (Composition API, stores, routing)
- Styling system (Tailwind + custom classes)
- Best practices

**Read Time**: 60-75 minutes

**Best For**:
- UI/UX developers
- Component development
- Frontend architecture
- Styling implementation

---

## Technology Stack Summary

### Core Technologies
- **Vue 3.4.21** - Frontend framework (Composition API)
- **Vite 5.1.6** - Build tool and dev server
- **Pinia 2.1.7** - State management
- **Vue Router 4.3.0** - Client-side routing
- **Tailwind CSS 3.4.1** - Utility-first CSS

### Backend Services
- **Firebase 10.9.0** - Authentication, Firestore, Storage
- **Supabase 2.39.7** - Alternative auth (configured but not used)

### Payment Integration
- **@stripe/stripe-js 3.0.6** - Stripe payments
- **PayPal SDK** - PayPal payments (script-loaded)

### HTTP & Utilities
- **Axios 1.6.7** - HTTP client

---

## Architecture at a Glance

```
┌─────────────────────────────────────────────────────┐
│                  Vue 3 Application                   │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │  Pages (Home, Catalog, Shop, Dashboard)   │    │
│  └──────────────────┬─────────────────────────┘    │
│                     │                               │
│  ┌──────────────────▼─────────────────────────┐    │
│  │  Pinia Stores (auth, cart, user)           │    │
│  └──────────────────┬─────────────────────────┘    │
│                     │                               │
│  ┌──────────────────▼─────────────────────────┐    │
│  │  Services (authService, paymentService)    │    │
│  └──────────────────┬─────────────────────────┘    │
│                     │                               │
└─────────────────────┼───────────────────────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  Firebase, Stripe, PayPal  │
        └────────────────────────────┘
```

---

## Key Features Overview

### 1. Authentication System
- Firebase email/password authentication
- Demo mode for development
- Protected routes
- Session persistence
- **See**: [AUTHENTICATION.md](./AUTHENTICATION.md)

### 2. Shopping Cart
- Add/remove products
- Persistent cart (localStorage)
- Real-time totals
- Checkout flow with auth guard
- **See**: [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md#cart-store)

### 3. User Dashboard
- Purchased apps management
- License key tracking
- Profile editing
- Usage statistics
- **See**: [COMPONENTS.md](./COMPONENTS.md#dashboardvue)

### 4. Routing & Navigation
- Public routes (Home, Catalog, Portfolio, Shop)
- Protected routes (Dashboard)
- Guest routes (Login)
- Route guards
- **See**: [ROUTING.md](./ROUTING.md)

### 5. Payment Integration
- Stripe checkout (demo mode)
- PayPal integration (demo mode)
- Transaction verification
- **See**: [SERVICES.md](./SERVICES.md#payment-service)

---

## Development Workflow

### Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure .env with Firebase/Stripe/PayPal credentials (optional for demo mode)

# Start development server
npm run dev
```

### Project Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
```

### Environment Variables

**Required for Production**:
- Firebase credentials (7 variables)
- Stripe public key
- PayPal client ID

**Optional for Development**:
- Demo mode works without any configuration

**See**: `.env.example` in project root

---

## Common Development Tasks

### Adding a New Page

1. Create component in `src/pages/NewPage.vue`
2. Add route in `src/router/index.js`
3. Add navigation link in `src/components/layout/Navbar.vue`
4. Update documentation

**Reference**: [ROUTING.md](./ROUTING.md) → Adding Routes

### Creating a Store Module

1. Create file in `src/store/modules/newStore.js`
2. Use `defineStore` with Composition API
3. Export and use in components
4. Document in [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)

**Reference**: [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) → Store Pattern

### Building a Component

1. Create `.vue` file in appropriate directory
2. Use Composition API with `<script setup>`
3. Import and use stores/composables
4. Apply Tailwind styling
5. Document in [COMPONENTS.md](./COMPONENTS.md)

**Reference**: [COMPONENTS.md](./COMPONENTS.md) → Component Patterns

### Integrating an API

1. Create/update service in `src/services/`
2. Call service from store action
3. Handle errors and loading states
4. Update documentation

**Reference**: [SERVICES.md](./SERVICES.md) → Service Pattern

---

## File Structure Quick Reference

```
src/
├── App.vue                    # Root component
├── main.js                    # App entry point
│
├── assets/
│   └── main.css              # Tailwind + custom styles
│
├── components/
│   ├── layout/
│   │   ├── Navbar.vue        # Navigation
│   │   └── Footer.vue        # Footer
│   └── common/               # Shared components (future)
│
├── layouts/
│   ├── DefaultLayout.vue     # Main layout
│   └── AuthLayout.vue        # Auth layout
│
├── pages/
│   ├── Home.vue              # Landing page
│   ├── Catalog.vue           # App catalog
│   ├── Portfolio.vue         # Portfolio
│   ├── Shop.vue              # Product store
│   ├── Dashboard.vue         # User dashboard
│   ├── Login.vue             # Authentication
│   └── NotFound.vue          # 404 page
│
├── router/
│   └── index.js              # Route configuration
│
├── store/
│   └── modules/
│       ├── auth.js           # Auth state
│       ├── cart.js           # Cart state
│       └── user.js           # User data
│
├── services/
│   ├── authService.js        # Firebase auth
│   ├── paymentService.js     # Payments
│   └── firebase.js           # Firebase config
│
├── utils/                     # Utilities (future)
│
├── context/                   # This folder! 📚
│   ├── README.md             # This file
│   ├── PROJECT_CONTEXT.md    # Project overview
│   ├── ARCHITECTURE.md       # System architecture
│   ├── ROUTING.md            # Routing system
│   ├── STATE_MANAGEMENT.md   # Pinia stores
│   ├── SERVICES.md           # Service layer
│   ├── AUTHENTICATION.md     # Auth system
│   └── COMPONENTS.md         # Components
│
└── docs/                      # Additional docs (future)
```

---

## Frequently Asked Questions

### Q: Where do I start as a new developer?

**A**: Read [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) first for the big picture, then skim [ARCHITECTURE.md](./ARCHITECTURE.md) to understand how things fit together.

### Q: How does authentication work?

**A**: See [AUTHENTICATION.md](./AUTHENTICATION.md) for the complete authentication flow, Firebase setup, and demo mode.

### Q: How do I add a new feature?

**A**:
1. Determine which layer (component, store, service)
2. Read the relevant documentation
3. Follow existing patterns
4. Update documentation

### Q: Why is there a demo mode?

**A**: Demo mode allows the app to run without Firebase/Stripe/PayPal configuration, perfect for development, testing, and demonstrations.

### Q: How do stores communicate?

**A**: Stores can import and use other stores. See [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) → Store Communication.

### Q: How are routes protected?

**A**: Navigation guards check `meta.requiresAuth` and redirect unauthenticated users to login. See [ROUTING.md](./ROUTING.md) → Navigation Guards.

### Q: Where is the backend API?

**A**: Currently, the app uses Firebase (auth, Firestore, Storage) and localStorage for demo purposes. A full backend API can be integrated via the service layer.

### Q: How do I style components?

**A**: Use Tailwind utility classes. Custom component classes are defined in `src/assets/main.css`. See [COMPONENTS.md](./COMPONENTS.md) → Styling System.

---

## Contributing to Documentation

### When to Update Documentation

- Adding new features
- Changing architecture
- Adding new stores/services
- Modifying routing
- Security changes

### Documentation Standards

- Clear, concise writing
- Code examples for patterns
- Diagrams for complex flows
- Updated timestamps
- Cross-references between docs

### File Naming

- Use UPPER_SNAKE_CASE.md for main docs
- Use descriptive names
- Keep files focused on single topics

---

## Additional Resources

### External Documentation

- [Vue 3 Docs](https://vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe Docs](https://stripe.com/docs)

### Project-Specific

- Main README: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/README.md`
- Environment Config: `.env.example`
- Tailwind Config: `tailwind.config.js`
- Vite Config: `vite.config.js`

---

## Documentation Maintenance

### Last Updated
- All documentation: 2025-01-21

### Documentation Authors
- Generated with Claude Code for comprehensive onboarding

### Feedback
If you find errors or areas for improvement in this documentation, please:
1. Update the relevant file
2. Add a note in commit message
3. Update the "Last updated" timestamp

---

## Quick Navigation

**By Role**:
- **New Developer** → [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)
- **Frontend Developer** → [COMPONENTS.md](./COMPONENTS.md), [ROUTING.md](./ROUTING.md)
- **State Management** → [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)
- **Backend Integration** → [SERVICES.md](./SERVICES.md)
- **Security Review** → [AUTHENTICATION.md](./AUTHENTICATION.md)
- **Architect** → [ARCHITECTURE.md](./ARCHITECTURE.md)

**By Topic**:
- **Authentication** → [AUTHENTICATION.md](./AUTHENTICATION.md)
- **Shopping Cart** → [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md#cart-store)
- **Protected Routes** → [ROUTING.md](./ROUTING.md#route-protection)
- **Payment Integration** → [SERVICES.md](./SERVICES.md#payment-service)
- **Component Patterns** → [COMPONENTS.md](./COMPONENTS.md#component-patterns)

---

**Happy Coding!** 🚀

This documentation is your guide to understanding and contributing to GeekDigital. Dive in, explore, and build amazing features!
