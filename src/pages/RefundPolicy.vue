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
          <span class="gradient-text">Refund Policy</span>
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

          <!-- Commitment banner -->
          <div class="glass-card glass-card-elevated p-6 text-center">
            <div class="text-4xl mb-3">🛡️</div>
            <h2 class="text-xl font-display font-bold mb-2" style="color: var(--text-1)">
              Our Commitment to You
            </h2>
            <p class="text-sm leading-relaxed max-w-lg mx-auto" style="color: var(--text-2)">
              We stand behind the quality of every product we sell. If something doesn't work as
              described, we'll make it right — no hassle, no runaround.
            </p>
          </div>

          <!-- At a glance -->
          <div id="at-a-glance" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="stat in glanceStats" :key="stat.label"
                 class="glass-card p-5 text-center">
              <div class="text-3xl font-display font-bold mb-1" style="color: #26cfff">
                {{ stat.value }}
              </div>
              <div class="text-sm font-medium mb-1" style="color: var(--text-1)">{{ stat.label }}</div>
              <div class="text-xs" style="color: var(--text-3)">{{ stat.desc }}</div>
            </div>
          </div>

          <!-- Eligibility -->
          <div id="eligibility" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">✅</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  1. Eligibility for a Refund
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-4">
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                You are eligible to request a full refund within <strong style="color: var(--text-1)">14 calendar days</strong>
                of your purchase date if one or more of the following applies:
              </p>
              <div class="space-y-2.5">
                <div v-for="item in eligibleReasons" :key="item"
                     class="flex items-start gap-3">
                  <svg class="w-4 h-4 mt-0.5 flex-shrink-0" style="color: #4ade80"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span class="text-sm" style="color: var(--text-2)">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Non-refundable -->
          <div id="non-refundable" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">🚫</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  2. Non-Refundable Situations
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-3">
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                We reserve the right to decline refund requests in the following circumstances:
              </p>
              <div class="space-y-2.5">
                <div v-for="item in nonRefundable" :key="item"
                     class="flex items-start gap-3">
                  <svg class="w-4 h-4 mt-0.5 flex-shrink-0" style="color: #f87171"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  <span class="text-sm" style="color: var(--text-2)">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- How to request -->
          <div id="how-to-request" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">📝</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  3. How to Request a Refund
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-6">
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                Follow these steps to submit a refund request:
              </p>
              <div class="space-y-5">
                <div v-for="step in requestSteps" :key="step.step" class="flex gap-4">
                  <div class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                       style="background: linear-gradient(135deg, #26cfff22, #9b5aff22); border: 1px solid #26cfff44; color: #26cfff">
                    {{ step.step }}
                  </div>
                  <div>
                    <h3 class="font-semibold text-sm mb-1" style="color: var(--text-1)">{{ step.title }}</h3>
                    <p class="text-sm leading-relaxed" style="color: var(--text-3)">{{ step.desc }}</p>
                  </div>
                </div>
              </div>
              <div class="rounded-xl p-4" style="background: rgba(38,207,255,0.07); border: 1px solid rgba(38,207,255,0.2)">
                <p class="text-sm" style="color: var(--text-2)">
                  <strong style="color: #26cfff">Email template: </strong>
                  Subject — "Refund Request — Order #[your order ID]".
                  Include your order ID, the product name, and a brief description of the issue.
                </p>
              </div>
            </div>
          </div>

          <!-- Processing -->
          <div id="processing" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">⏱️</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  4. Processing Time &amp; Method
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-4">
              <div class="space-y-3">
                <div v-for="row in processingRows" :key="row.label"
                     class="flex items-start justify-between gap-4 py-3"
                     style="border-bottom: 1px solid var(--glass-border)">
                  <span class="text-sm font-medium" style="color: var(--text-2)">{{ row.label }}</span>
                  <span class="text-sm text-right" style="color: var(--text-1); font-weight: 500">{{ row.value }}</span>
                </div>
              </div>
              <p class="text-sm leading-relaxed" style="color: var(--text-3)">
                Refunds are returned to the original payment method. We do not issue refunds to a
                different card or account. Processing times may vary depending on your bank or payment provider.
              </p>
            </div>
          </div>

          <!-- Exceptions -->
          <div id="exceptions" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3">
                <span class="text-xl">⚖️</span>
                <h2 class="text-lg font-display font-bold" style="color: var(--text-1)">
                  5. Special Cases &amp; Exceptions
                </h2>
              </div>
            </div>
            <div class="glass-card-body space-y-3">
              <div v-for="exception in exceptions" :key="exception.title"
                   class="flex items-start gap-3">
                <span class="text-base flex-shrink-0">{{ exception.icon }}</span>
                <div>
                  <p class="text-sm font-semibold" style="color: var(--text-1)">{{ exception.title }}</p>
                  <p class="text-sm" style="color: var(--text-3)">{{ exception.desc }}</p>
                </div>
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
                We reserve the right to update this Refund Policy at any time. Material changes will
                be communicated via email to registered users at least 7 days before taking effect.
                The policy in force at the time of purchase applies to that transaction.
              </p>
            </div>
          </div>

          <!-- Send us a message -->
          <div id="contact" class="glass-card glass-card-elevated p-8 text-center">
            <div class="text-4xl mb-3">💬</div>
            <h2 class="text-xl font-display font-bold mb-2" style="color: var(--text-1)">
              Ready to request a refund?
            </h2>
            <p class="text-sm leading-relaxed max-w-md mx-auto mb-6" style="color: var(--text-3)">
              Send us your order ID and a brief description of the issue. We review every request
              within 1 business day and will make it right.
            </p>
            <div class="flex items-center justify-center gap-3 flex-wrap">
              <router-link to="/support" class="btn btn-primary">
                Send us a message
              </router-link>
              <a href="mailto:ing.ekastel@gmail.com?subject=Refund Request" class="btn btn-outline">
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
  { id: 'at-a-glance',    title: 'At a Glance' },
  { id: 'eligibility',    title: '1. Eligibility for a Refund' },
  { id: 'non-refundable', title: '2. Non-Refundable Situations' },
  { id: 'how-to-request', title: '3. How to Request a Refund' },
  { id: 'processing',     title: '4. Processing Time & Method' },
  { id: 'exceptions',     title: '5. Special Cases & Exceptions' },
  { id: 'changes',        title: '6. Changes to This Policy' },
  { id: 'contact',        title: '7. Send us a message' },
]

const glanceStats = [
  { value: '14',    label: 'Day Window',        desc: 'From purchase date to file a claim' },
  { value: '1–5',   label: 'Business Days',     desc: 'Average refund processing time' },
  { value: '100%',  label: 'Original Method',   desc: 'Refunds returned to payment source' },
]

const eligibleReasons = [
  'The product does not function as described in its listing.',
  'You received a corrupted, incomplete, or incorrect file.',
  'A technical issue on our end prevented you from accessing or downloading the product.',
  'You were charged more than once for the same order due to a system error.',
  'The product is significantly different from what was advertised.',
]

const nonRefundable = [
  'Requests submitted more than 14 calendar days after the purchase date.',
  'Products that have been downloaded and the license key activated, where no technical defect is present.',
  'Change of mind or accidental purchases discovered more than 48 hours after the transaction.',
  'Requests citing incompatibility with software versions or environments not listed in the product requirements.',
  'Accounts suspended or terminated for violation of our Terms of Service.',
  'Promotional or discounted purchases explicitly marked as non-refundable at checkout.',
]

const requestSteps = [
  {
    step: 1,
    title: 'Locate your order ID',
    desc: 'Find your order ID in the confirmation email you received after purchase, or in the Dashboard under "My Purchases".',
  },
  {
    step: 2,
    title: 'Send us an email',
    desc: 'Email ing.ekastel@gmail.com with the subject "Refund Request — Order #[your order ID]". Include your order ID, the product name, and a clear description of the issue.',
  },
  {
    step: 3,
    title: 'Await our review',
    desc: 'Our team will review your request within 1 business day and may ask for additional information or screenshots to diagnose the issue.',
  },
  {
    step: 4,
    title: 'Receive confirmation',
    desc: 'Once approved, you will receive a confirmation email. The refund is then processed to your original payment method.',
  },
]

const processingRows = [
  { label: 'Review decision',        value: 'Within 1 business day' },
  { label: 'Stripe refund',          value: '5–10 business days' },
  { label: 'PayPal refund',          value: '3–5 business days' },
  { label: 'Currency',               value: 'Original purchase currency (USD)' },
  { label: 'Partial refunds',        value: 'Available for bundle purchases' },
]

const exceptions = [
  {
    icon: '🎁',
    title: 'Bundle purchases',
    desc: 'If you purchased a bundle, refunds are calculated on a pro-rata basis for the specific item(s) that are defective, not the entire bundle.',
  },
  {
    icon: '🔁',
    title: 'Duplicate charges',
    desc: 'If you were charged twice due to a payment error, we will issue a full refund for the duplicate charge immediately upon verification — no waiting period applies.',
  },
  {
    icon: '📅',
    title: 'Goodwill exceptions',
    desc: 'In exceptional circumstances (e.g., medical emergencies, service outages), we may grant refunds outside the standard 14-day window at our sole discretion. Contact us to discuss.',
  },
  {
    icon: '🌍',
    title: 'Consumer protection laws',
    desc: 'Nothing in this policy limits rights granted to you by applicable consumer protection legislation in your jurisdiction. Your statutory rights are unaffected.',
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
