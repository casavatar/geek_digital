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
          <span class="gradient-text">Privacy Policy</span>
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
              <li v-for="section in sections" :key="section.id">
                <a :href="`#${section.id}`" class="toc-link">{{ section.title }}</a>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Content -->
        <main class="lg:col-span-3 space-y-10">

          <!-- Intro -->
          <div class="glass-card p-6 rounded-2xl" style="border-left: 3px solid #26cfff">
            <p class="text-sm leading-relaxed" style="color: var(--text-2)">
              GeekDigital ("we", "our", "us") is committed to protecting your personal information.
              This Privacy Policy explains what data we collect, why we collect it, how we use it,
              and the rights you have regarding your information. By using our platform, you agree
              to the practices described in this document.
            </p>
          </div>

          <!-- Sections -->
          <div v-for="section in contentSections" :key="section.id" :id="section.id" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">{{ section.icon }}</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  {{ section.title }}
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-4">
              <p v-if="section.intro" class="text-sm leading-relaxed" style="color: var(--text-2)">
                {{ section.intro }}
              </p>
              <ul v-if="section.items" class="space-y-2.5">
                <li v-for="item in section.items" :key="item.label || item"
                    class="flex items-start gap-3 text-sm">
                  <span class="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: #26cfff" />
                  <span style="color: var(--text-2)">
                    <strong v-if="item.label" style="color: var(--text-1)">{{ item.label }}: </strong>
                    {{ item.label ? item.desc : item }}
                  </span>
                </li>
              </ul>
              <div v-if="section.subsections" class="space-y-4">
                <div v-for="sub in section.subsections" :key="sub.title">
                  <h3 class="text-sm font-semibold mb-2" style="color: var(--text-1)">{{ sub.title }}</h3>
                  <p class="text-sm leading-relaxed" style="color: var(--text-2)">{{ sub.body }}</p>
                </div>
              </div>
              <p v-if="section.closing" class="text-sm leading-relaxed" style="color: var(--text-2)">
                {{ section.closing }}
              </p>
            </div>
          </div>

          <!-- Send us a message -->
          <div id="contact" class="glass-card glass-card-elevated p-8 text-center">
            <div class="text-4xl mb-3">💬</div>
            <h2 class="text-xl font-display font-bold mb-2" style="color: var(--text-1)">
              Have questions about this policy?
            </h2>
            <p class="text-sm leading-relaxed max-w-md mx-auto mb-6" style="color: var(--text-3)">
              Our support team is happy to clarify anything in this Privacy Policy or help you
              exercise your data rights. We respond within 24 hours.
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
const sections = [
  { id: 'information-we-collect', title: '1. Information We Collect' },
  { id: 'how-we-use',             title: '2. How We Use Your Information' },
  { id: 'sharing',                title: '3. Sharing of Information' },
  { id: 'data-retention',         title: '4. Data Retention' },
  { id: 'your-rights',            title: '5. Your Rights' },
  { id: 'cookies',                title: '6. Cookies' },
  { id: 'security',               title: '7. Security' },
  { id: 'children',               title: '8. Children\'s Privacy' },
  { id: 'changes',                title: '9. Changes to This Policy' },
  { id: 'contact',                title: '10. Send us a message' },
]

const contentSections = [
  {
    id: 'information-we-collect',
    icon: '📋',
    title: '1. Information We Collect',
    intro: 'We collect information you provide directly and data generated automatically when you use our platform.',
    items: [
      { label: 'Account information', desc: 'Name, email address, and password when you register.' },
      { label: 'Purchase data', desc: 'Billing details, order history, and license keys associated with your purchases.' },
      { label: 'Usage data', desc: 'Pages visited, features used, session duration, and referring URLs.' },
      { label: 'Device information', desc: 'Browser type, operating system, IP address, and language preferences.' },
      { label: 'Communications', desc: 'Messages you send via the support form or email.' },
    ],
  },
  {
    id: 'how-we-use',
    icon: '⚙️',
    title: '2. How We Use Your Information',
    intro: 'We use the data we collect exclusively to operate and improve the GeekDigital platform.',
    items: [
      'Provide, authenticate, and secure your account.',
      'Process purchases and deliver digital products and license keys.',
      'Send transactional emails (receipts, license delivery, password resets).',
      'Respond to support requests and improve our customer service.',
      'Analyse usage patterns to improve platform features.',
      'Comply with legal obligations and enforce our Terms of Service.',
    ],
    closing: 'We do not sell your personal data or use it for automated profiling that produces legal effects.',
  },
  {
    id: 'sharing',
    icon: '🤝',
    title: '3. Sharing of Information',
    intro: 'We share your data only with trusted service providers necessary to operate the platform.',
    items: [
      { label: 'Firebase (Google)', desc: 'Authentication and session management.' },
      { label: 'Stripe', desc: 'Payment processing. Card data never touches our servers.' },
      { label: 'PayPal', desc: 'Alternative payment processing.' },
      { label: 'Hosting providers', desc: 'Infrastructure to serve the application (e.g., Vercel, Netlify).' },
    ],
    closing: 'All third-party providers are contractually bound to use your data only for the services they provide to us. We do not share your information with advertisers.',
  },
  {
    id: 'data-retention',
    icon: '🗄️',
    title: '4. Data Retention',
    intro: 'We retain your personal data only as long as necessary to fulfil the purposes outlined in this policy.',
    items: [
      'Account data is retained for the duration of your account and for 90 days after deletion.',
      'Purchase and order records are retained for 7 years to meet accounting and tax obligations.',
      'Support communications are retained for 2 years.',
      'Usage and analytics data is retained for 12 months in aggregated, anonymised form.',
    ],
  },
  {
    id: 'your-rights',
    icon: '⚖️',
    title: '5. Your Rights',
    intro: 'Depending on your jurisdiction, you may have the following rights regarding your personal data.',
    items: [
      { label: 'Access', desc: 'Request a copy of the personal data we hold about you.' },
      { label: 'Correction', desc: 'Request that we correct inaccurate or incomplete data.' },
      { label: 'Deletion', desc: 'Request erasure of your personal data, subject to legal retention requirements.' },
      { label: 'Portability', desc: 'Receive your data in a structured, machine-readable format.' },
      { label: 'Objection', desc: 'Object to processing based on legitimate interests.' },
      { label: 'Withdrawal', desc: 'Withdraw consent at any time where processing is consent-based.' },
    ],
    closing: 'To exercise any of these rights, please contact us at ing.ekastel@gmail.com. We will respond within 30 days.',
  },
  {
    id: 'cookies',
    icon: '🍪',
    title: '6. Cookies',
    intro: 'We use cookies and similar technologies to operate and improve the platform. See our Cookie Policy for full details.',
    items: [
      { label: 'Essential cookies', desc: 'Required for authentication, session management, and security.' },
      { label: 'Analytics cookies', desc: 'Help us understand how visitors interact with the platform.' },
      { label: 'Preference cookies', desc: 'Remember your settings such as theme and language.' },
    ],
    closing: 'You can manage cookie preferences through your browser settings. Disabling essential cookies may affect platform functionality.',
  },
  {
    id: 'security',
    icon: '🔒',
    title: '7. Security',
    intro: 'We implement industry-standard security measures to protect your personal data.',
    items: [
      'All data is transmitted over encrypted HTTPS connections.',
      'Passwords are hashed using Firebase\'s secure authentication infrastructure.',
      'Payment data is handled exclusively by Stripe (PCI DSS Level 1 certified).',
      'Access to production systems is restricted to authorised personnel.',
    ],
    closing: 'No transmission or storage method is 100% secure. If you believe your account has been compromised, contact us immediately.',
  },
  {
    id: 'children',
    icon: '👶',
    title: "8. Children's Privacy",
    intro: 'GeekDigital is not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.',
  },
  {
    id: 'changes',
    icon: '🔄',
    title: '9. Changes to This Policy',
    intro: 'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. For material changes, we will notify registered users by email. Your continued use of the platform after changes are posted constitutes acceptance of the updated policy.',
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
  color: #26cfff;
  background: rgba(38, 207, 255, 0.07);
}
</style>
