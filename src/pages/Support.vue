<template>
  <div>
    <!-- Hero -->
    <!-- pt-16 clears the fixed navbar (h-16 = 64px). pt-12 inside adds breathing room →
         total 112px from viewport top, matching pt-28 pages (Catalog, Shop). -->
    <section class="glass-header pt-16">
      <div class="glass-header-ambient" />
      <div class="container-custom pt-12 pb-16 relative z-10 text-center">
        <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">
          <span class="gradient-text">Support Center</span>
        </h1>
        <p class="text-lg max-w-2xl mx-auto mb-8" style="color: var(--text-2)">
          We're here to help. Search our knowledge base, browse FAQs, or reach out directly.
        </p>
        <div class="relative max-w-lg mx-auto">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style="color: var(--text-3)"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Search for answers..." class="input pl-12 w-full" />
        </div>
      </div>
    </section>

    <div class="luminous-divider" />

    <div class="container-custom py-16 space-y-16">

      <!-- Contact Options -->
      <section>
        <h2 class="text-2xl font-display font-bold mb-8 text-center" style="color: var(--text-1)">
          How can we help?
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div v-for="option in contactOptions" :key="option.title"
               class="glass-card glass-card-interactive hover-lift p-6 text-center">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                 :style="`background: ${option.color}18; border: 1px solid ${option.color}33`">
              <span class="text-2xl">{{ option.icon }}</span>
            </div>
            <h3 class="font-display font-semibold mb-2" style="color: var(--text-1)">{{ option.title }}</h3>
            <p class="text-sm mb-5" style="color: var(--text-3)">{{ option.desc }}</p>
            <a :href="option.link" :target="option.external ? '_blank' : null"
               :rel="option.external ? 'noopener noreferrer' : null"
               class="btn btn-outline text-sm py-2 w-full justify-center">
              {{ option.cta }}
            </a>
          </div>
        </div>
      </section>

      <!-- System Status -->
      <section class="glass-card">
        <div class="glass-card-header flex items-center justify-between flex-wrap gap-3">
          <h2 class="text-xl font-display font-bold" style="color: var(--text-1)">System Status</h2>
          <span class="flex items-center gap-2 text-sm" style="color: #4ade80">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            All systems operational
          </span>
        </div>
        <div class="glass-card-body space-y-0">
          <div v-for="(service, idx) in services" :key="service.name"
               class="flex items-center justify-between py-3"
               :style="idx < services.length - 1 ? 'border-bottom: 1px solid var(--glass-border)' : ''">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full flex-shrink-0" :class="statusColor(service.status)" />
              <span class="text-sm font-medium" style="color: var(--text-1)">{{ service.name }}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-xs" style="color: var(--text-3)">{{ service.latency }}</span>
              <span class="glass-badge text-xs" :class="statusBadge(service.status)">{{ service.status }}</span>
            </div>
          </div>
        </div>
        <div class="glass-card-footer text-right">
          <span class="text-xs" style="color: var(--text-3)">Last checked just now</span>
        </div>
      </section>

      <!-- FAQ -->
      <section>
        <h2 class="text-2xl font-display font-bold mb-2 text-center" style="color: var(--text-1)">
          Frequently Asked Questions
        </h2>
        <p class="text-center mb-8 text-sm" style="color: var(--text-3)">
          Quick answers to common questions
        </p>
        <div class="max-w-3xl mx-auto space-y-3">
          <div v-if="filteredFaqs.length === 0" class="text-center py-12" style="color: var(--text-3)">
            No results for "{{ searchQuery }}". Try a different term.
          </div>
          <div v-for="(faq, idx) in filteredFaqs" :key="idx" class="glass-card overflow-hidden">
            <button
              @click="toggleFaq(idx)"
              class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span class="font-medium text-sm" style="color: var(--text-1)">{{ faq.q }}</span>
              <svg :class="['w-4 h-4 flex-shrink-0 transition-transform duration-200', openFaq === idx && 'rotate-180']"
                   style="color: var(--text-3)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <Transition name="faq">
              <div v-if="openFaq === idx" class="px-5 pb-5">
                <div class="luminous-divider mb-4" />
                <p class="text-sm leading-relaxed" style="color: var(--text-2)">{{ faq.a }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      <!-- Contact Form -->
      <section>
        <div class="max-w-2xl mx-auto glass-card">
          <div class="glass-card-header text-center">
            <h2 class="text-xl font-display font-bold" style="color: var(--text-1)">Send us a message</h2>
            <p class="text-sm mt-1" style="color: var(--text-3)">We typically respond within 24 hours.</p>
          </div>
          <div class="glass-card-body space-y-5">
            <Transition name="glass-slide-up">
              <div v-if="formSuccess"
                   class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                   style="background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.25); color: #4ade80">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Message sent! We'll get back to you soon.
              </div>
            </Transition>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1.5" style="color: var(--text-2)">Name</label>
                <input v-model="form.name" type="text" placeholder="Your name" class="input w-full" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5" style="color: var(--text-2)">Email</label>
                <input v-model="form.email" type="email" placeholder="you@example.com" class="input w-full" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1.5" style="color: var(--text-2)">Subject</label>
              <select v-model="form.subject" class="input w-full">
                <option value="">Select a topic...</option>
                <option>Account &amp; Billing</option>
                <option>Technical Issue</option>
                <option>Product Inquiry</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1.5" style="color: var(--text-2)">Message</label>
              <textarea v-model="form.message" rows="5"
                        placeholder="Describe your issue or question..."
                        class="input w-full resize-none" />
            </div>
          </div>
          <div class="glass-card-footer flex justify-end">
            <button @click="submitForm" :disabled="submitting" class="btn btn-primary flex items-center gap-2">
              <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const openFaq = ref(null)
const formSuccess = ref(false)
const submitting = ref(false)
const form = ref({ name: '', email: '', subject: '', message: '' })

function toggleFaq(idx) {
  openFaq.value = openFaq.value === idx ? null : idx
}

async function submitForm() {
  if (!form.value.name || !form.value.email) return
  submitting.value = true
  await new Promise(r => setTimeout(r, 1200))
  submitting.value = false
  formSuccess.value = true
  form.value = { name: '', email: '', subject: '', message: '' }
  setTimeout(() => { formSuccess.value = false }, 5000)
}

function statusColor(status) {
  if (status === 'Operational') return 'bg-green-400'
  if (status === 'Degraded')    return 'bg-yellow-400'
  return 'bg-red-400'
}
function statusBadge(status) {
  if (status === 'Operational') return 'glass-badge-success'
  if (status === 'Degraded')    return 'glass-badge-warning'
  return 'glass-badge-error'
}

const contactOptions = [
  {
    icon: '📚', color: '#26cfff',
    title: 'Documentation',
    desc: 'Browse guides, tutorials, and API references for self-service answers.',
    link: '/docs', external: false, cta: 'Read the docs'
  },
  {
    icon: '🐙', color: '#9b5aff',
    title: 'GitHub Issues',
    desc: 'Found a bug or have a feature request? Open an issue on GitHub.',
    link: 'https://github.com/casavatar', external: true, cta: 'Open an issue'
  },
  {
    icon: '✉️', color: '#fbbf24',
    title: 'Email Support',
    desc: 'Reach our team directly for billing, licensing, or sensitive questions.',
    link: 'mailto:ing.ekastel@gmail.com', external: false, cta: 'Send email'
  },
]

const services = [
  { name: 'Web Application',           status: 'Operational', latency: '82 ms'  },
  { name: 'Authentication (Firebase)', status: 'Operational', latency: '120 ms' },
  { name: 'Payment Gateway',           status: 'Operational', latency: '210 ms' },
  { name: 'REST API',                  status: 'Operational', latency: '65 ms'  },
  { name: 'CDN / Asset Delivery',      status: 'Operational', latency: '18 ms'  },
]

const faqs = [
  {
    q: 'Do I need an account to browse products?',
    a: 'No — you can browse the catalog and portfolio without signing in. An account is required to purchase products or access your dashboard.'
  },
  {
    q: 'How does demo mode work?',
    a: 'Demo mode lets you explore the full application without configuring Firebase or Stripe. Auth uses localStorage-backed mock users, and payments return simulated transaction IDs.'
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit cards via Stripe, as well as PayPal. In production, payment sessions are created server-side to keep your secret keys secure.'
  },
  {
    q: 'How do I access purchased products?',
    a: "After a successful purchase, your license key and download link appear in the Dashboard under \"My Licenses\". You'll also receive a confirmation email."
  },
  {
    q: 'Can I use the products commercially?',
    a: 'Yes. All digital products sold on GeekDigital come with a single-seat commercial license. Contact us if you need a team or enterprise license.'
  },
  {
    q: 'Is my payment information stored securely?',
    a: 'GeekDigital never stores raw card data. All payment information is handled exclusively by Stripe, which is PCI DSS Level 1 certified.'
  },
  {
    q: 'How do I request a refund?',
    a: "Refunds are available within 14 days of purchase if the product doesn't work as described. Open a support ticket with your order ID and we'll process it promptly."
  },
]

const filteredFaqs = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return faqs
  return faqs.filter(f =>
    f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.faq-enter-active, .faq-leave-active { transition: all 0.2s ease; }
.faq-enter-from, .faq-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
