<template>
  <div>
    <!-- Hero -->
    <!-- pt-16 clears the fixed navbar (h-16 = 64px). pt-12 inside adds breathing room →
         total 112px from viewport top, matching pt-28 pages (Catalog, Shop). -->
    <section class="glass-header pt-16">
      <div class="glass-header-ambient" />
      <div class="container-custom pt-12 pb-16 relative z-10">
        <div class="flex items-center gap-2 mb-4">
          <span class="glass-badge glass-badge-secondary">Legal</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-display font-bold mb-3">
          <span class="gradient-text">Cookie Policy</span>
        </h1>
        <div class="flex items-center gap-4 flex-wrap">
          <p class="text-sm" style="color: var(--text-3)">
            Effective date: <strong style="color: var(--text-2)">January 1, 2025</strong>
          </p>
          <span style="color: var(--glass-border)">·</span>
          <p class="text-sm" style="color: var(--text-3)">
            Last updated: <strong style="color: var(--text-2)">May 1, 2025</strong>
          </p>
        </div>
      </div>
    </section>

    <div class="luminous-divider" />

    <div class="container-custom py-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">

        <!-- Table of Contents -->
        <aside class="lg:col-span-1">
          <div class="sticky top-24 glass-card p-5">
            <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: var(--text-3)">
              Contents
            </p>
            <ul class="space-y-1">
              <li v-for="item in tocItems" :key="item.id">
                <a :href="`#${item.id}`" class="toc-link">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Content -->
        <main class="lg:col-span-3 space-y-10">

          <!-- Intro -->
          <div class="glass-card p-6 rounded-2xl" style="border-left: 3px solid #fbbf24">
            <p class="text-sm leading-relaxed" style="color: var(--text-2)">
              This Cookie Policy explains how GeekDigital uses cookies and similar tracking technologies
              when you visit our platform. It describes what these technologies are, why we use them, and
              your rights to control our use of them.
            </p>
          </div>

          <!-- What are cookies -->
          <div id="what-are-cookies" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">🍪</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  1. What Are Cookies?
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-3">
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                Cookies are small text files placed on your device by a website when you visit it. They are
                widely used to make websites work efficiently and to provide information to site owners.
                Cookies may be "session" cookies (deleted when you close your browser) or "persistent" cookies
                (remain on your device for a set period or until you delete them).
              </p>
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                We also use similar technologies such as local storage and session storage, which function
                similarly to cookies and are subject to this policy.
              </p>
            </div>
          </div>

          <!-- Cookie types -->
          <div id="types" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">📂</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  2. Types of Cookies We Use
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-4">
              <div v-for="type in cookieTypes" :key="type.name"
                   class="rounded-xl p-4" style="background: var(--glass-bg-2); border: 1px solid var(--glass-border)">
                <div class="flex items-center gap-3 mb-2">
                  <span class="glass-badge text-xs" :class="type.badgeClass">{{ type.label }}</span>
                  <h3 class="font-semibold text-sm" style="color: var(--text-1)">{{ type.name }}</h3>
                </div>
                <p class="text-sm leading-relaxed mb-2" style="color: var(--text-2)">{{ type.desc }}</p>
                <p class="text-xs" style="color: var(--text-3)">
                  <strong>Example: </strong>{{ type.example }}
                </p>
              </div>
            </div>
          </div>

          <!-- Cookie table -->
          <div id="cookie-list" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">📋</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  3. Specific Cookies We Set
                </h2>
              </div>
            </div>
            <div class="glass-card-body">
              <div class="overflow-x-auto rounded-xl" style="border: 1px solid var(--glass-border)">
                <table class="cookie-table w-full text-sm">
                  <thead>
                    <tr>
                      <th>Cookie Name</th>
                      <th>Category</th>
                      <th>Purpose</th>
                      <th>Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="cookie in cookieList" :key="cookie.name">
                      <td><code class="inline-code">{{ cookie.name }}</code></td>
                      <td>
                        <span class="glass-badge text-xs" :class="cookie.badgeClass">
                          {{ cookie.category }}
                        </span>
                      </td>
                      <td style="color: var(--text-2)">{{ cookie.purpose }}</td>
                      <td style="color: var(--text-3)">{{ cookie.expiry }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Third-party cookies -->
          <div id="third-party" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">🔗</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  4. Third-Party Cookies
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-3">
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                Some cookies are set by third-party services integrated into our platform. These services
                may collect data according to their own privacy policies.
              </p>
              <div class="space-y-3">
                <div v-for="provider in thirdParties" :key="provider.name"
                     class="flex items-start gap-3">
                  <span class="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: #fbbf24" />
                  <span class="text-sm" style="color: var(--text-2)">
                    <strong style="color: var(--text-1)">{{ provider.name }}: </strong>
                    {{ provider.desc }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Managing cookies -->
          <div id="managing" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">⚙️</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  5. How to Manage Cookies
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-4">
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                You can control and manage cookies in the following ways:
              </p>
              <div class="space-y-3">
                <div v-for="method in managementMethods" :key="method.title"
                     class="flex items-start gap-3">
                  <span class="text-base flex-shrink-0">{{ method.icon }}</span>
                  <div>
                    <p class="text-sm font-semibold" style="color: var(--text-1)">{{ method.title }}</p>
                    <p class="text-sm" style="color: var(--text-3)">{{ method.desc }}</p>
                  </div>
                </div>
              </div>
              <div class="rounded-xl p-4 mt-2"
                   style="background: rgba(251,191,36,0.07); border: 1px solid rgba(251,191,36,0.2)">
                <p class="text-sm" style="color: var(--text-2)">
                  <strong style="color: #fbbf24">Note: </strong>
                  Blocking or deleting essential cookies may impair certain platform features,
                  including authentication and cart persistence.
                </p>
              </div>
            </div>
          </div>

          <!-- Changes -->
          <div id="changes" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">🔄</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  6. Changes to This Policy
                </h2>
              </div>
            </div>
            <div class="glass-card-body">
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                We may update this Cookie Policy periodically to reflect changes in technology, legislation,
                or our data practices. When we make significant changes, we will update the date at the top
                of this page. We encourage you to review this policy regularly.
              </p>
            </div>
          </div>

          <!-- Send us a message -->
          <div id="contact" class="glass-card glass-card-elevated p-8 text-center">
            <div class="text-4xl mb-3">💬</div>
            <h2 class="text-xl font-display font-bold mb-2" style="color: var(--text-1)">
              Questions about our use of cookies?
            </h2>
            <p class="text-sm leading-relaxed max-w-md mx-auto mb-6" style="color: var(--text-3)">
              We're happy to explain exactly which cookies we set, why, and how to disable them.
              Send us a message and we'll get back to you within 24 hours.
            </p>
            <div class="flex items-center justify-center gap-3 flex-wrap">
              <router-link to="/support" class="btn btn-primary">
                Send us a message
              </router-link>
              <a href="mailto:ing.ekastel@gmail.com" class="btn btn-outline">
                Email us directly
              </a>
            </div>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
const tocItems = [
  { id: 'what-are-cookies', title: '1. What Are Cookies?' },
  { id: 'types',            title: '2. Types of Cookies We Use' },
  { id: 'cookie-list',      title: '3. Specific Cookies We Set' },
  { id: 'third-party',      title: '4. Third-Party Cookies' },
  { id: 'managing',         title: '5. How to Manage Cookies' },
  { id: 'changes',          title: '6. Changes to This Policy' },
  { id: 'contact',          title: '7. Send us a message' },
]

const cookieTypes = [
  {
    name: 'Essential Cookies',
    label: 'Essential',
    badgeClass: 'glass-badge-error',
    desc: 'These cookies are strictly necessary for the platform to function. They enable core features such as authentication, session management, and security. You cannot opt out of these cookies.',
    example: 'Firebase auth tokens, CSRF protection tokens.',
  },
  {
    name: 'Preference Cookies',
    label: 'Preference',
    badgeClass: 'glass-badge-warning',
    desc: 'These cookies remember your settings and choices to personalise your experience, such as your preferred theme (dark/light mode) or language.',
    example: 'Theme preference stored in localStorage.',
  },
  {
    name: 'Analytics Cookies',
    label: 'Analytics',
    badgeClass: 'glass-badge-primary',
    desc: 'These cookies help us understand how visitors interact with the platform by collecting anonymised usage statistics. This data helps us improve features and content.',
    example: 'Page view counts, session duration, feature engagement.',
  },
  {
    name: 'Functional Cookies',
    label: 'Functional',
    badgeClass: 'glass-badge-secondary',
    desc: 'These cookies enable enhanced functionality such as cart persistence and recently viewed items. Disabling them may reduce platform convenience.',
    example: 'Cart items stored under the geek_digital_cart key.',
  },
]

const cookieList = [
  {
    name: 'geek_digital_user',
    category: 'Essential',
    badgeClass: 'glass-badge-error',
    purpose: 'Stores the authenticated user session locally for auto-login on return visits.',
    expiry: 'Session / until logout',
  },
  {
    name: 'geek_digital_cart',
    category: 'Functional',
    badgeClass: 'glass-badge-secondary',
    purpose: 'Persists shopping cart contents between sessions.',
    expiry: '30 days',
  },
  {
    name: '__theme',
    category: 'Preference',
    badgeClass: 'glass-badge-warning',
    purpose: 'Remembers the user\'s selected UI theme (dark/light).',
    expiry: '1 year',
  },
  {
    name: '_firebase_auth',
    category: 'Essential',
    badgeClass: 'glass-badge-error',
    purpose: 'Firebase authentication token for secure session management.',
    expiry: '1 hour (auto-refreshed)',
  },
  {
    name: '__stripe_mid',
    category: 'Essential',
    badgeClass: 'glass-badge-error',
    purpose: 'Stripe fraud prevention and payment session continuity.',
    expiry: '1 year',
  },
]

const thirdParties = [
  {
    name: 'Firebase (Google)',
    desc: 'Sets cookies for authentication session management. Governed by Google\'s Privacy Policy.',
  },
  {
    name: 'Stripe',
    desc: 'Sets cookies for fraud detection and checkout session continuity. Governed by Stripe\'s Privacy Policy.',
  },
  {
    name: 'PayPal',
    desc: 'Sets cookies during PayPal checkout flows. Governed by PayPal\'s Privacy Policy.',
  },
]

const managementMethods = [
  {
    icon: '🌐',
    title: 'Browser settings',
    desc: 'Most browsers allow you to block or delete cookies via their settings. Refer to your browser\'s help section for instructions (Chrome, Firefox, Safari, Edge).',
  },
  {
    icon: '🔕',
    title: 'Opt-out tools',
    desc: 'Use tools like the Google Analytics Opt-out Browser Add-on or the Network Advertising Initiative opt-out page to control third-party analytics.',
  },
  {
    icon: '🗑️',
    title: 'Clear local storage',
    desc: 'Open your browser\'s developer tools (F12) → Application → Local Storage, and delete keys prefixed with geek_digital_ to reset platform preferences and cart data.',
  },
]
</script>

<style scoped>
.toc-link {
  display: block;
  padding: 0.3rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.8rem;
  color: var(--text-3);
  text-decoration: none;
  transition: all 0.15s ease;
}
.toc-link:hover {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.07);
}
.cookie-table th {
  text-align: left;
  padding: 0.5rem 0.875rem;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-3);
  border-bottom: 1px solid var(--glass-border);
  background: var(--glass-bg-2);
}
.cookie-table td {
  padding: 0.65rem 0.875rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  vertical-align: middle;
}
.cookie-table tr:last-child td { border-bottom: none; }
.inline-code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8em;
  background: rgba(251,191,36,0.1);
  color: #fbbf24;
  padding: 1px 5px;
  border-radius: 3px;
}
</style>
