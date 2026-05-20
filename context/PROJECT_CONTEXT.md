# GeekDigital - Project Context

## Overview

GeekDigital is a professional full-stack Vue 3 web application that serves as a comprehensive personal brand platform combining a data engineering portfolio showcase, application catalog, and digital product e-commerce store. The platform enables users to browse professional projects, discover desktop and web applications, purchase digital products, and manage their licenses through a secure user dashboard.

## Purpose & Goals

### Primary Objectives
- **Portfolio Showcase**: Display professional data engineering projects, ETL pipelines, and analytics solutions to potential clients and employers
- **Application Catalog**: Provide a centralized platform to browse and learn about desktop and web applications
- **Digital Commerce**: Enable direct sales of digital products, licenses, and software applications
- **User Management**: Offer authenticated users a personalized dashboard to manage purchased applications and active licenses
- **Professional Presence**: Establish a cohesive online presence that demonstrates technical expertise and commercial offerings

### Target Audience
- **Potential Employers/Clients**: Seeking to evaluate data engineering expertise and professional projects
- **Software Purchasers**: Individuals and businesses looking to acquire desktop/web applications and digital tools
- **Existing Customers**: Users managing their purchased products, licenses, and downloads

### Business Model
- Digital product sales (one-time purchases)
- Software license distribution
- Professional service inquiries
- Portfolio-driven client acquisition

## Technology Stack

### Frontend Framework
- **Vue 3** (v3.4.21) - Progressive JavaScript framework using Composition API
- **Vite** (v5.1.6) - Next-generation build tool providing fast development server and optimized production builds
- **JavaScript/ES6+** - Primary programming language (no TypeScript)

### Routing & Navigation
- **Vue Router 4** (v4.3.0) - Official Vue routing library
  - Nested layouts
  - Route-based code splitting
  - Navigation guards for authentication
  - Programmatic navigation

### State Management
- **Pinia** (v2.1.7) - Modern, intuitive state management
  - Composition API style stores
  - Modular store architecture
  - DevTools integration

### Styling & UI
- **Tailwind CSS** (v3.4.1) - Utility-first CSS framework
- **PostCSS** (v8.4.35) - CSS processing
- **Autoprefixer** (v10.4.18) - Automatic vendor prefixing
- **Custom Design System**: Primary (blue) and secondary (purple) color palettes

### Authentication & Backend Services
- **Firebase** (v10.9.0) - Primary authentication and backend services
  - Firebase Authentication (email/password)
  - Cloud Firestore (NoSQL database)
  - Firebase Storage (file storage)
- **Supabase** (v2.39.7) - Alternative authentication provider (configuration only)

### Payment Processing
- **Stripe** (@stripe/stripe-js v3.0.6) - Primary payment gateway
  - Checkout sessions
  - Payment processing
- **PayPal SDK** - Alternative payment method (script-loaded)

### HTTP & API Communication
- **Axios** (v1.6.7) - Promise-based HTTP client for API requests

### Development Tools
- **@vitejs/plugin-vue** (v5.0.4) - Vite plugin for Vue 3 support
- **Hot Module Replacement (HMR)** - Instant development feedback

## Architecture

### High-Level Architecture Pattern
GeekDigital follows a **Layered Frontend Architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        Presentation Layer                    │
│  (Vue Components - Pages, Layouts, UI Components)           │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                     State Management Layer                   │
│        (Pinia Stores - auth, cart, user modules)            │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                      Service Layer                           │
│   (authService, paymentService, firebase configuration)     │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   External Services                          │
│    (Firebase, Stripe, PayPal, Backend APIs)                 │
└─────────────────────────────────────────────────────────────┘
```

### Core Components

#### 1. Presentation Layer
- **Layouts**: `DefaultLayout` (with navbar/footer) and `AuthLayout` (clean authentication pages)
- **Pages**: Home, Catalog, Portfolio, Shop, Dashboard, Login, NotFound
- **Common Components**: Navbar, Footer (reusable UI elements)
- **Styling**: Tailwind-based custom component classes (cards, buttons, inputs)

#### 2. State Management
- **Auth Store**: User authentication state, login/register/logout actions
- **Cart Store**: Shopping cart management with localStorage persistence
- **User Store**: User-specific data (purchased apps, licenses, profile)

#### 3. Service Layer
- **Auth Service**: Firebase authentication wrapper with demo mode fallback
- **Payment Service**: Stripe and PayPal integration handlers
- **Firebase Config**: Centralized Firebase initialization

#### 4. Routing System
- **Layout-based routing**: Routes grouped by layout (default vs auth)
- **Route guards**: Authentication and guest-only protection
- **Lazy loading**: Code-split page components for performance

### Data Flow

#### Authentication Flow
```
User Input → Login Component → Auth Store → Auth Service → Firebase
                                    ↓
                            User State Updated
                                    ↓
                    Route Guard → Redirect to Dashboard
```

#### Shopping Cart Flow
```
Add to Cart → Cart Store → localStorage Persistence
                ↓
          Cart Updated (reactive)
                ↓
    Checkout → Auth Check → Payment Service → Stripe/PayPal
                                    ↓
                          Transaction Complete
                                    ↓
                    User Store → Add Purchased App
```

#### User Data Flow
```
App Mount → Auth Store Init → Auth Service Check Firebase
                                        ↓
                                 User Authenticated?
                                        ↓
                        User Store → Load User Data from localStorage
                                        ↓
                            Dashboard Display (reactive)
```

### External Integrations

#### Firebase Integration
- **Authentication**: Email/password authentication with user management
- **Firestore**: Prepared for storing user data, orders, licenses (currently using localStorage as demo)
- **Storage**: Available for storing product images, downloads
- **Demo Mode**: Graceful fallback when Firebase credentials not configured

#### Stripe Integration
- **Checkout Sessions**: Server-side session creation (stubbed for demo)
- **Payment Processing**: Client-side payment confirmation
- **Demo Mode**: Simulated successful payments without real transactions

#### PayPal Integration
- **SDK Loading**: Dynamic script injection
- **Order Creation**: PayPal order flow
- **Payment Capture**: Transaction verification
- **Demo Mode**: Simulated transactions

## Project Structure

```
geek_digital/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # CSS and static resources
│   │   └── main.css            # Tailwind + custom component styles
│   ├── components/              # Vue components
│   │   ├── common/             # Reusable UI components (empty - future)
│   │   └── layout/             # Layout components
│   │       ├── Navbar.vue      # Main navigation with auth integration
│   │       └── Footer.vue      # Site-wide footer
│   ├── layouts/                 # Page layout wrappers
│   │   ├── DefaultLayout.vue   # Standard layout with navbar/footer
│   │   └── AuthLayout.vue      # Clean layout for login/register
│   ├── pages/                   # Route page components
│   │   ├── Home.vue            # Landing page with hero section
│   │   ├── Catalog.vue         # Application catalog with filtering
│   │   ├── Portfolio.vue       # Data engineering projects showcase
│   │   ├── Shop.vue            # Digital product store with cart
│   │   ├── Login.vue           # Authentication (login/register tabs)
│   │   ├── Dashboard.vue       # User dashboard (protected route)
│   │   └── NotFound.vue        # 404 error page
│   ├── router/                  # Vue Router configuration
│   │   └── index.js            # Routes, guards, scroll behavior
│   ├── store/                   # Pinia state management
│   │   └── modules/            # Store modules
│   │       ├── auth.js         # Authentication state
│   │       ├── cart.js         # Shopping cart state
│   │       └── user.js         # User data state
│   ├── services/                # External service integrations
│   │   ├── authService.js      # Firebase auth wrapper
│   │   ├── paymentService.js   # Stripe/PayPal handlers
│   │   └── firebase.js         # Firebase initialization
│   ├── utils/                   # Utility functions (empty - future)
│   ├── context/                 # Project documentation (this folder)
│   ├── docs/                    # Additional documentation
│   ├── App.vue                  # Root component
│   └── main.js                  # Application entry point
├── index.html                   # HTML entry point
├── vite.config.js              # Vite configuration with @ alias
├── tailwind.config.js          # Tailwind theme customization
├── postcss.config.js           # PostCSS plugins
├── package.json                # Dependencies and scripts
├── .env.example                # Environment variable template
└── README.md                   # Project README
```

## Key Concepts

### Domain Models

#### User Model
```javascript
{
  uid: String,           // Firebase user ID
  email: String,         // User email
  displayName: String,   // User's display name
  emailVerified: Boolean // Email verification status
}
```

#### Cart Item Model
```javascript
{
  id: Number,           // Product ID
  name: String,         // Product name
  price: Number,        // Product price
  image: String,        // Product image URL
  quantity: Number      // Quantity in cart
}
```

#### Purchased App Model
```javascript
{
  id: Number,           // App ID
  name: String,         // App name
  purchaseDate: String, // ISO 8601 timestamp
  ...additionalFields   // Product-specific data
}
```

#### License Model
```javascript
{
  id: String,           // License ID
  key: String,          // License key
  product: String,      // Product name
  status: String,       // 'active', 'expired', etc.
  createdAt: String     // ISO 8601 timestamp
}
```

### Design Patterns

#### Composition API Pattern
All components use Vue 3's Composition API with `<script setup>` for:
- Better code organization
- Improved TypeScript support (future-ready)
- Enhanced reusability
- Better tree-shaking

#### Service Layer Pattern
Business logic abstracted into services:
- Centralized external API communication
- Consistent error handling
- Easy testing and mocking
- Demo mode fallbacks

#### Store Module Pattern
State management divided by domain:
- `auth`: Authentication concerns
- `cart`: Shopping functionality
- `user`: User-specific data
- Clear boundaries and responsibilities

#### Layout Pattern
Routes grouped by layout type:
- Default layout for main application
- Auth layout for authentication flows
- Easy addition of new layouts

### State Persistence Strategy

#### localStorage Usage
- **Cart**: Persisted to survive page refreshes
- **User Data**: Temporary storage (production would use Firestore)
- **Demo User**: Authentication state in demo mode

#### Reactive State
- Pinia stores provide reactive state
- Components auto-update on state changes
- Computed properties for derived state

## Development Workflow

### Build Process
1. **Development**: `npm run dev` → Vite dev server on port 3000
2. **Production**: `npm run build` → Optimized static files in `dist/`
3. **Preview**: `npm run preview` → Test production build locally

### Environment Configuration
Environment variables in `.env` file (based on `.env.example`):
- Firebase credentials (7 variables)
- Supabase credentials (2 variables)
- Stripe public key
- PayPal client ID
- API base URL

### Demo Mode Capability
Application functions without external service configuration:
- Mock authentication (localStorage-based)
- Simulated payments
- Local data storage
- Perfect for development and demos

### Code Organization Principles
- **Single Responsibility**: Each component/service has one clear purpose
- **Separation of Concerns**: UI, state, and services clearly separated
- **DRY Principle**: Tailwind custom classes reduce CSS duplication
- **Component Composition**: Layouts wrap pages, components are modular

## Entry Points

### For New Developers - Where to Start

#### 1. Application Bootstrap
- **File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/main.js`
- **What it does**: Initializes Vue app, Pinia, Router, and mounts to DOM

#### 2. Root Component
- **File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/App.vue`
- **What it does**: Auth initialization on mount, renders router-view

#### 3. Routing Configuration
- **File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/router/index.js`
- **What it does**: Defines all routes, layouts, navigation guards

#### 4. Authentication Flow
- **Files**:
  - `src/store/modules/auth.js` (state management)
  - `src/services/authService.js` (Firebase integration)
  - `src/pages/Login.vue` (UI)

#### 5. Main Layout
- **File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/layouts/DefaultLayout.vue`
- **What it does**: Wraps pages with Navbar and Footer

#### 6. Home Page
- **File**: `C:/Users/ingek/OneDrive/Documents/Desarrollo/Vue/geek_digital/src/pages/Home.vue`
- **What it does**: Landing page with hero, features, CTA

### Key Features Implementation Locations

| Feature | Component | Store | Service |
|---------|-----------|-------|---------|
| User Login | `pages/Login.vue` | `auth.js` | `authService.js` |
| Shopping Cart | `pages/Shop.vue` | `cart.js` | - |
| User Dashboard | `pages/Dashboard.vue` | `user.js` | - |
| App Catalog | `pages/Catalog.vue` | - | - |
| Portfolio | `pages/Portfolio.vue` | - | - |
| Payments | `pages/Shop.vue` | `cart.js` | `paymentService.js` |

### Common Development Tasks

#### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `src/router/index.js`
3. Add navigation link in `src/components/layout/Navbar.vue`

#### Adding a New Store Module
1. Create file in `src/store/modules/`
2. Use `defineStore` with Composition API
3. Export and use in components with `useXStore()`

#### Styling a Component
- Use Tailwind utility classes
- Custom component classes in `src/assets/main.css`
- Scoped styles in component `<style scoped>`

#### Connecting to Backend API
1. Create/update service in `src/services/`
2. Use Axios for HTTP requests
3. Call service from Pinia store action
4. Handle loading/error states in store

## Current Status & Future Considerations

### Production-Ready Features
- Complete frontend architecture
- Authentication flow (with Firebase)
- Shopping cart functionality
- User dashboard UI
- Responsive design
- Route protection

### Demo/Mock Features (Require Backend)
- Payment processing (simulated)
- User data persistence (localStorage)
- Product catalog (hardcoded)
- License generation (mocked)

### Future Enhancements
- Backend API integration (replace localStorage)
- Real payment processing
- Product management admin panel
- Email notifications
- Download management system
- Analytics integration
- Search functionality
- Product reviews/ratings

### Technical Debt & Notes
- TypeScript migration for type safety
- Unit tests (Vitest)
- E2E tests (Playwright/Cypress)
- Performance monitoring
- SEO optimization (meta tags, SSR/SSG)
- Accessibility improvements (ARIA labels)
- Internationalization (i18n)

---

*Last updated: 2025-01-21*
*Generated for: GeekDigital Vue 3 + Vite Project*
