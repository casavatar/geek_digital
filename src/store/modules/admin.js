import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────
  const users = ref([
    { id: 1, name: 'Eduardo Castellanos', email: 'admin@geekdigital.io',  role: 'admin',  status: 'active',    initials: 'EC', joinedAt: '2024-01-01', grantedApps: [1,2,3,4,5] },
    { id: 2, name: 'María Torres',        email: 'maria@acmecorp.com',    role: 'client', status: 'active',    initials: 'MT', joinedAt: '2024-02-15', grantedApps: [1,3] },
    { id: 3, name: 'James Liu',           email: 'jliu@datapulse.io',     role: 'client', status: 'active',    initials: 'JL', joinedAt: '2024-03-22', grantedApps: [2,4] },
    { id: 4, name: 'Sofía Ramírez',       email: 'sofia@techflow.mx',     role: 'client', status: 'suspended', initials: 'SR', joinedAt: '2024-04-10', grantedApps: [] },
    { id: 5, name: 'Lucas Ferreira',      email: 'lucas@shipfast.br',     role: 'client', status: 'active',    initials: 'LF', joinedAt: '2024-05-01', grantedApps: [1,2,3,5] },
  ])

  const applications = ref([
    { id: 1, name: 'Analytics Pro',       slug: 'analytics-pro',       description: 'Real-time dashboards, funnel analysis, and cohort tracking for SaaS metrics.',              basePrice: 49,  annualDiscount: 20, category: 'Analytics',      status: 'active',      emoji: '📊', gradient: ['#26cfff','#9b5aff'] },
    { id: 2, name: 'Shipping API',         slug: 'shipping-api',        description: 'Multi-carrier shipping rates, label generation, and real-time tracking webhooks.',           basePrice: 79,  annualDiscount: 15, category: 'Logistics',      status: 'active',      emoji: '📦', gradient: ['#fb923c','#fbbf24'] },
    { id: 3, name: 'DataPipeline Studio',  slug: 'datapipeline-studio', description: 'Visual ETL builder with Airflow orchestration and dbt model management.',                  basePrice: 129, annualDiscount: 20, category: 'Data Eng.',      status: 'active',      emoji: '⚙️', gradient: ['#4ade80','#26cfff'] },
    { id: 4, name: 'EmailCast',            slug: 'emailcast',           description: 'Transactional and marketing email delivery with open/click analytics and deliverability.',   basePrice: 29,  annualDiscount: 10, category: 'Communication',  status: 'active',      emoji: '✉️', gradient: ['#a78bfa','#ec4899'] },
    { id: 5, name: 'FormForge',            slug: 'formforge',           description: 'Drag-and-drop form builder with conditional logic, webhooks, and submission analytics.',     basePrice: 19,  annualDiscount: 10, category: 'Productivity',   status: 'maintenance', emoji: '📝', gradient: ['#fbbf24','#fb923c'] },
  ])

  const subscriptions = ref([
    { id: 1, userId: 2, appId: 1, billing: 'monthly', status: 'active', startedAt: '2024-03-01', nextBillingAt: '2025-07-01', paymentMethod: { type: 'card',   brand: 'Visa',       last4: '4242' } },
    { id: 2, userId: 2, appId: 3, billing: 'annual',  status: 'active', startedAt: '2024-04-01', nextBillingAt: '2025-04-01', paymentMethod: { type: 'paypal', email: 'maria@acmecorp.com' } },
    { id: 3, userId: 3, appId: 2, billing: 'monthly', status: 'active', startedAt: '2024-05-15', nextBillingAt: '2025-07-15', paymentMethod: { type: 'card',   brand: 'Mastercard', last4: '8888' } },
    { id: 4, userId: 3, appId: 4, billing: 'annual',  status: 'active', startedAt: '2024-02-01', nextBillingAt: '2025-02-01', paymentMethod: { type: 'card',   brand: 'Mastercard', last4: '8888' } },
    { id: 5, userId: 5, appId: 1, billing: 'annual',  status: 'active', startedAt: '2024-06-01', nextBillingAt: '2025-06-01', paymentMethod: { type: 'card',   brand: 'Amex',       last4: '0005' } },
    { id: 6, userId: 5, appId: 2, billing: 'monthly', status: 'active', startedAt: '2024-07-01', nextBillingAt: '2025-07-01', paymentMethod: { type: 'card',   brand: 'Amex',       last4: '0005' } },
    { id: 7, userId: 5, appId: 3, billing: 'annual',  status: 'active', startedAt: '2024-08-01', nextBillingAt: '2025-08-01', paymentMethod: { type: 'card',   brand: 'Amex',       last4: '0005' } },
    { id: 8, userId: 5, appId: 5, billing: 'monthly', status: 'active', startedAt: '2024-09-01', nextBillingAt: '2025-09-01', paymentMethod: { type: 'card',   brand: 'Amex',       last4: '0005' } },
  ])

  // ─────────────────────────────────────────
  // COMPUTED — METRICS
  // ─────────────────────────────────────────
  const clientUsers = computed(() => users.value.filter(u => u.role === 'client'))

  const activeClients = computed(() => clientUsers.value.filter(u => u.status === 'active').length)

  const monthlySubsCount = computed(() => subscriptions.value.filter(s => s.billing === 'monthly').length)

  const annualSubsCount = computed(() => subscriptions.value.filter(s => s.billing === 'annual').length)

  const totalActiveApps = computed(() => applications.value.filter(a => a.status === 'active').length)

  const simulatedMRR = computed(() => {
    return subscriptions.value
      .filter(s => s.status === 'active')
      .reduce((total, sub) => {
        const app = applications.value.find(a => a.id === sub.appId)
        if (!app) return total
        const price = computePrice(app, sub.billing)
        return total + price
      }, 0)
  })

  // ─────────────────────────────────────────
  // ACTIONS
  // ─────────────────────────────────────────
  function toggleUserStatus(userId) {
    const user = users.value.find(u => u.id === userId)
    if (!user || user.role === 'admin') return
    user.status = user.status === 'active' ? 'suspended' : 'active'
  }

  function toggleAppAccess(userId, appId) {
    const user = users.value.find(u => u.id === userId)
    if (!user) return
    const idx = user.grantedApps.indexOf(appId)
    if (idx === -1) {
      user.grantedApps.push(appId)
    } else {
      user.grantedApps.splice(idx, 1)
    }
  }

  function addApplication(data) {
    const maxId = applications.value.reduce((max, a) => Math.max(max, a.id), 0)
    const slug = (data.name || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    applications.value.push({
      id: maxId + 1,
      name: data.name,
      slug,
      description: data.description || '',
      basePrice: Number(data.basePrice) || 0,
      annualDiscount: Number(data.annualDiscount) || 0,
      category: data.category || '',
      emoji: data.emoji || '📦',
      status: 'active',
      gradient: ['#26cfff', '#9b5aff'],
    })
  }

  function updateApplication(appId, patch) {
    const app = applications.value.find(a => a.id === appId)
    if (!app) return
    if (patch.name !== undefined)           app.name           = patch.name
    if (patch.description !== undefined)    app.description    = patch.description
    if (patch.basePrice !== undefined)      app.basePrice      = Number(patch.basePrice)
    if (patch.annualDiscount !== undefined) app.annualDiscount = Number(patch.annualDiscount)
    if (patch.category !== undefined)       app.category       = patch.category
    if (patch.emoji !== undefined)          app.emoji          = patch.emoji
  }

  function toggleAppStatus(appId) {
    const app = applications.value.find(a => a.id === appId)
    if (!app) return
    app.status = app.status === 'active' ? 'maintenance' : 'active'
  }

  function setSubscriptionBilling(subId, billing) {
    const sub = subscriptions.value.find(s => s.id === subId)
    if (sub) sub.billing = billing
  }

  function setPaymentMethod(userId, method) {
    subscriptions.value
      .filter(s => s.userId === userId)
      .forEach(s => { s.paymentMethod = { ...method } })
  }

  // ─────────────────────────────────────────
  // QUERY HELPERS
  // ─────────────────────────────────────────
  function getUserByEmail(email) {
    if (!email) return null
    return users.value.find(u => u.email.toLowerCase() === email.toLowerCase()) || null
  }

  function getOrFallback(email) {
    const found = getUserByEmail(email)
    if (!found || found.role === 'admin') {
      return users.value[1] // María Torres — demo client
    }
    return found
  }

  function getUserSubscriptions(userId) {
    return subscriptions.value.filter(s => s.userId === userId)
  }

  function getUserGrantedApps(userId) {
    const user = users.value.find(u => u.id === userId)
    if (!user) return []
    return applications.value.filter(a => user.grantedApps.includes(a.id))
  }

  function getSubscriptionForApp(userId, appId) {
    return subscriptions.value.find(s => s.userId === userId && s.appId === appId) || null
  }

  function computePrice(app, billing) {
    if (billing === 'annual') {
      return Math.round(app.basePrice * (1 - app.annualDiscount / 100) * 100) / 100
    }
    return app.basePrice
  }

  return {
    // State
    users,
    applications,
    subscriptions,
    // Computed
    clientUsers,
    activeClients,
    monthlySubsCount,
    annualSubsCount,
    totalActiveApps,
    simulatedMRR,
    // Actions
    toggleUserStatus,
    toggleAppAccess,
    addApplication,
    updateApplication,
    toggleAppStatus,
    setSubscriptionBilling,
    setPaymentMethod,
    // Query helpers
    getUserByEmail,
    getOrFallback,
    getUserSubscriptions,
    getUserGrantedApps,
    getSubscriptionForApp,
    computePrice,
  }
})
