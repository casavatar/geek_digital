<template>
  <div>
    <!-- Hero -->
    <!-- pt-16 clears the fixed navbar (h-16 = 64px). pt-12 inside adds breathing room →
         total 112px from viewport top, matching pt-28 pages (Catalog, Shop). -->
    <section class="glass-header pt-16">
      <div class="glass-header-ambient" />
      <div class="container-custom pt-12 pb-16 relative z-10">
        <div class="max-w-2xl">
          <div class="flex items-center gap-2 mb-4">
            <span class="glass-badge glass-badge-primary">v1.0</span>
            <span class="glass-badge glass-badge-secondary">Beta</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">
            <span class="gradient-text">Documentation</span>
          </h1>
          <p class="text-lg mb-8" style="color: var(--text-2)">
            Everything you need to integrate, deploy, and extend the GeekDigital platform.
          </p>
          <div class="relative max-w-lg">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style="color: var(--text-3)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input v-model="searchQuery" type="text" placeholder="Search documentation..." class="input pl-12 w-full" />
          </div>
        </div>
      </div>
    </section>

    <div class="luminous-divider" />

    <div class="container-custom py-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <nav class="sticky top-24 space-y-6">
            <div v-for="section in sections" :key="section.title">
              <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--text-3)">{{ section.title }}</p>
              <ul class="space-y-1">
                <li v-for="item in section.items" :key="item">
                  <button
                    @click="activeSection = item"
                    :class="['doc-link w-full text-left', activeSection === item && 'doc-link-active']"
                  >
                    {{ item }}
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="lg:col-span-3 space-y-10">

          <!-- Quick Start Cards -->
          <div>
            <h2 class="text-2xl font-display font-bold mb-6" style="color: var(--text-1)">Quick Start</h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div v-for="card in quickStart" :key="card.title"
                   class="glass-card glass-card-interactive hover-lift p-5 cursor-pointer">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                     :style="`background: ${card.color}22`">
                  <span class="text-xl">{{ card.icon }}</span>
                </div>
                <h3 class="font-display font-semibold mb-1" style="color: var(--text-1)">{{ card.title }}</h3>
                <p class="text-sm" style="color: var(--text-3)">{{ card.desc }}</p>
              </div>
            </div>
          </div>

          <div class="luminous-divider" />

          <!-- Getting Started -->
          <div class="glass-card">
            <div class="glass-card-header">
              <h2 class="text-xl font-display font-bold" style="color: var(--text-1)">Getting Started</h2>
            </div>
            <div class="glass-card-body space-y-6">
              <div v-for="step in gettingStarted" :key="step.step" class="flex gap-4">
                <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                     style="background: linear-gradient(135deg, #00c6ff22, #9b5aff22); border: 1px solid #00c6ff44; color: #26cfff">
                  {{ step.step }}
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold mb-1" style="color: var(--text-1)">{{ step.title }}</h3>
                  <p class="text-sm mb-3" style="color: var(--text-3)">{{ step.desc }}</p>
                  <pre v-if="step.code" class="code-block"><code>{{ step.code }}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Core Concepts -->
          <div class="glass-card">
            <div class="glass-card-header">
              <h2 class="text-xl font-display font-bold" style="color: var(--text-1)">Core Concepts</h2>
            </div>
            <div class="glass-card-body space-y-3">
              <div v-for="concept in coreConcepts" :key="concept.title"
                   class="flex items-start gap-3 p-4 rounded-xl" style="background: var(--glass-bg-2)">
                <span class="text-2xl flex-shrink-0">{{ concept.icon }}</span>
                <div>
                  <h3 class="font-semibold mb-1" style="color: var(--text-1)">{{ concept.title }}</h3>
                  <p class="text-sm" style="color: var(--text-3)">{{ concept.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Guides Grid -->
          <div>
            <h2 class="text-2xl font-display font-bold mb-6" style="color: var(--text-1)">Guides</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="guide in guides" :key="guide.title"
                   class="glass-card glass-card-interactive hover-lift p-5 cursor-pointer">
                <div class="flex items-center gap-2 mb-3">
                  <span class="glass-badge" :class="guide.badgeClass">{{ guide.badge }}</span>
                </div>
                <h3 class="font-display font-semibold mb-2" style="color: var(--text-1)">{{ guide.title }}</h3>
                <p class="text-sm mb-4" style="color: var(--text-3)">{{ guide.desc }}</p>
                <div class="flex items-center gap-1 text-xs" style="color: #26cfff">
                  <span>Read guide</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const activeSection = ref('Introduction')

const sections = [
  {
    title: 'Getting Started',
    items: ['Introduction', 'Installation', 'Quick Start', 'Configuration']
  },
  {
    title: 'Core Concepts',
    items: ['Architecture', 'Authentication', 'Data Pipelines', 'State Management']
  },
  {
    title: 'Integrations',
    items: ['Firebase', 'Stripe / PayPal', 'REST APIs', 'Webhooks']
  },
  {
    title: 'Deployment',
    items: ['Production Build', 'Environment Variables', 'CI/CD', 'Monitoring']
  }
]

const quickStart = [
  { icon: '⚡', color: '#fbbf24', title: 'Installation', desc: 'Set up the project locally in under 5 minutes.' },
  { icon: '🔐', color: '#26cfff', title: 'Authentication', desc: 'Configure Firebase auth and demo mode.' },
  { icon: '🛒', color: '#9b5aff', title: 'Payments', desc: 'Integrate Stripe and PayPal checkout flows.' },
]

const gettingStarted = [
  {
    step: 1,
    title: 'Clone the repository',
    desc: 'Start by cloning the GeekDigital repository to your local machine.',
    code: 'git clone https://github.com/casavatar/geek_digital.git\ncd geek_digital'
  },
  {
    step: 2,
    title: 'Install dependencies',
    desc: 'Install all required packages using npm.',
    code: 'npm install'
  },
  {
    step: 3,
    title: 'Configure environment',
    desc: 'Copy the environment template and fill in your credentials. Demo mode works without credentials.',
    code: 'cp .env.example .env'
  },
  {
    step: 4,
    title: 'Start the dev server',
    desc: 'Launch the development server on port 3000.',
    code: 'npm run dev'
  }
]

const coreConcepts = [
  {
    icon: '🏗️',
    title: 'Layered Architecture',
    desc: 'The platform is structured in four layers: Presentation, State Management, Service, and Integration — each with a clear responsibility.'
  },
  {
    icon: '🔒',
    title: 'Route Protection',
    desc: 'Navigation guards enforce authentication on protected routes. Guest-only routes redirect authenticated users automatically.'
  },
  {
    icon: '📦',
    title: 'Pinia Stores',
    desc: 'State is managed via three Pinia modules — auth, cart, and user — using Composition API style throughout.'
  },
  {
    icon: '🌐',
    title: 'Demo Mode',
    desc: 'Every service has a demo fallback. The app runs fully without Firebase or Stripe credentials, ideal for development and previews.'
  },
]

const guides = [
  {
    badge: 'Firebase', badgeClass: 'glass-badge-warning',
    title: 'Firebase Authentication Setup',
    desc: 'Configure Google sign-in, email/password auth, and security rules for Firestore.'
  },
  {
    badge: 'Stripe', badgeClass: 'glass-badge-success',
    title: 'Stripe Checkout Integration',
    desc: 'Create checkout sessions, handle webhooks, and verify payments server-side.'
  },
  {
    badge: 'Vue 3', badgeClass: 'glass-badge-primary',
    title: 'Adding New Pages',
    desc: 'Follow the routing pattern to add new pages with layout wrappers and navigation guards.'
  },
  {
    badge: 'Vite', badgeClass: 'glass-badge-secondary',
    title: 'Production Deployment',
    desc: 'Build, optimize, and deploy the SPA to Vercel, Netlify, or a custom server.'
  },
  {
    badge: 'Pinia', badgeClass: 'glass-badge-primary',
    title: 'Custom Store Modules',
    desc: 'Create new Pinia stores that compose with existing auth and cart state.'
  },
  {
    badge: 'CI/CD', badgeClass: 'glass-badge-secondary',
    title: 'GitHub Actions Pipeline',
    desc: 'Automate builds, linting, and deployment previews on every pull request.'
  },
]
</script>

<style scoped>
.doc-link {
  display: block;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-3);
  transition: all 0.15s ease;
  cursor: pointer;
  background: transparent;
  border: none;
}
.doc-link:hover {
  color: var(--text-1);
  background: var(--glass-bg-2);
}
.doc-link-active {
  color: #26cfff !important;
  background: rgba(38, 207, 255, 0.08) !important;
  font-weight: 500;
}
.code-block {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--glass-border);
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
  font-size: 0.78rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  color: #26cfff;
  overflow-x: auto;
  white-space: pre;
  line-height: 1.6;
}
</style>
