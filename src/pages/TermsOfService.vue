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
          <span class="gradient-text">Terms of Service</span>
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
              <li v-for="section in tocItems" :key="section.id">
                <a :href="`#${section.id}`" class="toc-link">{{ section.title }}</a>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Content -->
        <main class="lg:col-span-3 space-y-10">

          <!-- Intro -->
          <div class="glass-card p-6 rounded-2xl" style="border-left: 3px solid #9b5aff">
            <p class="text-sm leading-relaxed" style="color: var(--text-2)">
              Please read these Terms of Service ("Terms") carefully before using the GeekDigital
              platform operated by GeekDigital ("we", "us", "our"). By accessing or using any part
              of the platform, you agree to be bound by these Terms. If you do not agree, do not
              use the platform.
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
                  <span class="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style="background: #9b5aff" />
                  <span style="color: var(--text-2)">
                    <strong v-if="item.label" style="color: var(--text-1)">{{ item.label }}: </strong>
                    {{ item.label ? item.desc : item }}
                  </span>
                </li>
              </ul>
              <p v-if="section.closing" class="text-sm leading-relaxed" style="color: var(--text-2)">
                {{ section.closing }}
              </p>
            </div>
          </div>

          <!-- Warning box -->
          <div class="rounded-2xl p-5"
               style="background: rgba(248,113,113,0.07); border: 1px solid rgba(248,113,113,0.2)">
            <div class="flex items-start gap-3">
              <span class="text-lg">⚠️</span>
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                <strong style="color: #f87171">Disclaimer: </strong>
                The platform is provided "as is" without warranties of any kind, express or implied.
                GeekDigital shall not be liable for any indirect, incidental, or consequential damages
                arising from your use of the platform. Our maximum liability in any circumstance is
                limited to the amount you paid us in the 12 months preceding the claim.
              </p>
            </div>
          </div>

          <!-- Send us a message -->
          <div id="contact" class="glass-card glass-card-elevated p-8 text-center">
            <div class="text-4xl mb-3">💬</div>
            <h2 class="text-xl font-display font-bold mb-2" style="color: var(--text-1)">
              Have questions about these Terms?
            </h2>
            <p class="text-sm leading-relaxed max-w-md mx-auto mb-6" style="color: var(--text-3)">
              Our support team can clarify any clause or help you understand how these Terms
              apply to your situation. We respond within 24 hours.
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
  { id: 'acceptance',       title: '1. Acceptance of Terms' },
  { id: 'services',         title: '2. Description of Services' },
  { id: 'accounts',         title: '3. User Accounts' },
  { id: 'ip',               title: '4. Intellectual Property' },
  { id: 'payments',         title: '5. Payments & Licenses' },
  { id: 'prohibited',       title: '6. Prohibited Conduct' },
  { id: 'third-party',      title: '7. Third-Party Services' },
  { id: 'termination',      title: '8. Termination' },
  { id: 'governing-law',    title: '9. Governing Law' },
  { id: 'changes',          title: '10. Changes to Terms' },
  { id: 'contact',          title: '11. Send us a message' },
]

const contentSections = [
  {
    id: 'acceptance',
    icon: '✅',
    title: '1. Acceptance of Terms',
    intro: 'By creating an account or purchasing any product on GeekDigital, you confirm that you are at least 16 years of age, have read and understood these Terms, and have the legal capacity to enter into this agreement. If you are acting on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.',
  },
  {
    id: 'services',
    icon: '🖥️',
    title: '2. Description of Services',
    intro: 'GeekDigital provides the following services through its platform:',
    items: [
      { label: 'Portfolio',         desc: 'Showcase of data engineering and software development projects.' },
      { label: 'App Catalog',       desc: 'A curated listing of open-source and commercial applications.' },
      { label: 'Digital Shop',      desc: 'Sale of digital products including code templates, datasets, and toolkits.' },
      { label: 'User Dashboard',    desc: 'Management of purchases, license keys, and account settings.' },
    ],
    closing: 'We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.',
  },
  {
    id: 'accounts',
    icon: '👤',
    title: '3. User Accounts',
    items: [
      'You are responsible for maintaining the confidentiality of your login credentials.',
      'You must provide accurate and current information when creating your account.',
      'You are responsible for all activity that occurs under your account.',
      'You must notify us immediately at ing.ekastel@gmail.com if you suspect unauthorised access.',
      'We reserve the right to suspend accounts that violate these Terms without prior notice.',
    ],
  },
  {
    id: 'ip',
    icon: '©️',
    title: '4. Intellectual Property',
    intro: 'All content on the GeekDigital platform — including but not limited to software, text, graphics, logos, and data — is the property of GeekDigital or its licensors and is protected by applicable intellectual property laws.',
    items: [
      { label: 'Platform content', desc: 'You may not reproduce, distribute, or create derivative works without express written permission.' },
      { label: 'Purchased products', desc: 'A single-seat commercial license is granted upon purchase. See Section 5 for details.' },
      { label: 'User submissions', desc: 'By submitting content (e.g., support messages), you grant us a non-exclusive licence to use it for service-related purposes.' },
    ],
  },
  {
    id: 'payments',
    icon: '💳',
    title: '5. Payments & Licenses',
    intro: 'All prices are displayed in USD and are inclusive of applicable taxes unless stated otherwise.',
    items: [
      'Purchases are processed via Stripe or PayPal. Your financial data is governed by their respective privacy policies.',
      'Upon successful payment, you receive a non-transferable, non-exclusive, single-seat commercial license to use the purchased product.',
      'Licenses are personal and may not be resold, sublicensed, or shared with third parties.',
      'Refunds are subject to our Refund Policy. Please review it before purchasing.',
      'Subscription products (if applicable) renew automatically unless cancelled before the renewal date.',
    ],
  },
  {
    id: 'prohibited',
    icon: '🚫',
    title: '6. Prohibited Conduct',
    intro: 'You agree not to engage in any of the following activities:',
    items: [
      'Reverse engineering, decompiling, or disassembling any part of the platform or purchased products.',
      'Reselling, sublicensing, or redistributing purchased digital products without written permission.',
      'Attempting to gain unauthorised access to any system, account, or data.',
      'Uploading or transmitting malicious code, spam, or harmful content.',
      'Using the platform for any unlawful purpose or in violation of any applicable regulation.',
      'Scraping, crawling, or harvesting data from the platform without express consent.',
    ],
    closing: 'Violation of these restrictions may result in immediate account termination and legal action.',
  },
  {
    id: 'third-party',
    icon: '🔗',
    title: '7. Third-Party Services',
    intro: 'The platform integrates with third-party services including Firebase, Stripe, and PayPal. These services are governed by their own terms and privacy policies. GeekDigital is not responsible for the practices or content of any third-party service.',
  },
  {
    id: 'termination',
    icon: '🔚',
    title: '8. Termination',
    intro: 'Either party may terminate this agreement at any time. We may suspend or terminate your account immediately if you breach these Terms. Upon termination:',
    items: [
      'Your right to access the platform ceases immediately.',
      'Purchased licenses remain valid for the licensed period unless terminated for cause.',
      'We may retain data as required by law or our data retention policy.',
    ],
  },
  {
    id: 'governing-law',
    icon: '⚖️',
    title: '9. Governing Law',
    intro: 'These Terms are governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the platform shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration or the jurisdiction of the competent courts.',
  },
  {
    id: 'changes',
    icon: '🔄',
    title: '10. Changes to Terms',
    intro: 'We may revise these Terms at any time. We will notify registered users of material changes via email at least 14 days before they take effect. Continued use of the platform after the effective date constitutes acceptance of the revised Terms.',
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
  color: #9b5aff;
  background: rgba(155, 90, 255, 0.07);
}
</style>
