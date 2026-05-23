<template>
  <div style="min-height: 100vh; background: var(--body-bg);">

    <!-- ── Hero Header ── -->
    <div
      class="glass-header pt-20 pb-10 px-4"
      style="background: var(--glass-bg-1); border-bottom: 1px solid var(--glass-border); backdrop-filter: blur(20px);"
    >
      <div class="container-custom">
        <div class="flex flex-col sm:flex-row sm:items-center gap-5">
          <!-- Avatar -->
          <div
            class="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0"
            style="background: linear-gradient(135deg, #26cfff 0%, #9b5aff 100%);"
          >
            {{ currentUser?.initials || authStore.userName[0]?.toUpperCase() || 'U' }}
          </div>

          <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-bold" style="color: var(--text-1);">
              {{ currentUser?.name || authStore.userName }}
            </h1>
            <p class="text-sm mt-0.5" style="color: var(--text-2);">{{ authStore.userEmail }}</p>
          </div>

          <!-- Status badge -->
          <span
            class="self-start sm:self-center text-xs font-semibold px-3 py-1.5 rounded-full"
            :style="currentUser?.status === 'active'
              ? 'background: rgba(74,222,128,0.12); color: #4ade80; border: 1px solid rgba(74,222,128,0.25);'
              : 'background: rgba(251,191,36,0.12); color: #fbbf24; border: 1px solid rgba(251,191,36,0.25);'"
          >
            {{ currentUser?.status === 'active' ? 'Active Account' : 'Account Suspended' }}
          </span>
        </div>

        <!-- Tabs -->
        <div class="flex gap-1 mt-8 border-b" style="border-color: var(--glass-border);">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-all duration-200"
            :style="activeTab === tab.id
              ? 'border-color: #26cfff; color: #26cfff;'
              : 'border-color: transparent; color: var(--text-2);'"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── Tab Content ── -->
    <div class="container-custom py-8">

      <!-- Tab 1: My Apps -->
      <div v-if="activeTab === 'apps'">
        <!-- Empty state -->
        <div v-if="userApps.length === 0" class="glass-card p-12 text-center max-w-md mx-auto">
          <span class="text-5xl block mb-4">🧩</span>
          <h3 class="text-lg font-semibold mb-2" style="color: var(--text-1);">No applications yet</h3>
          <p class="text-sm mb-6" style="color: var(--text-2);">Browse our catalog to find the right tools for your workflow.</p>
          <RouterLink to="/catalog" class="btn btn-primary">Browse Catalog</RouterLink>
        </div>

        <!-- Apps grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="app in userApps"
            :key="app.id"
            class="glass-card overflow-hidden flex flex-col"
          >
            <!-- Gradient strip -->
            <div class="h-1 w-full shrink-0" :style="`background: linear-gradient(90deg, ${app.gradient[0]}, ${app.gradient[1]});`" />

            <!-- Cover -->
            <div
              class="h-32 flex items-center justify-center text-5xl"
              :style="`background: linear-gradient(135deg, ${app.gradient[0]}22, ${app.gradient[1]}22);`"
            >{{ app.emoji }}</div>

            <!-- Body -->
            <div class="p-4 flex flex-col flex-1">
              <div class="flex items-center justify-between gap-2 mb-2">
                <h3 class="font-bold text-sm" style="color: var(--text-1);">{{ app.name }}</h3>
                <span
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style="background: var(--glass-bg-2); color: var(--text-3);"
                >{{ app.category }}</span>
              </div>

              <!-- Status / billing -->
              <div class="mb-3">
                <span
                  v-if="app.status === 'maintenance'"
                  class="text-xs font-medium px-2.5 py-1 rounded-full"
                  style="background: rgba(251,191,36,0.12); color: #fbbf24;"
                >Under maintenance</span>
                <span
                  v-else
                  class="text-xs font-medium px-2.5 py-1 rounded-full"
                  style="background: rgba(38,207,255,0.10); color: #26cfff;"
                >{{ getSubBilling(app.id) }}</span>
              </div>

              <!-- Price -->
              <p class="text-sm font-semibold mb-4" style="color: var(--text-1);">
                {{ getAppPriceLabel(app) }}
              </p>

              <button
                class="btn w-full flex items-center justify-center gap-2 mt-auto"
                :class="app.status === 'maintenance' ? 'btn-outline opacity-50 cursor-not-allowed' : 'btn-primary'"
                :disabled="app.status === 'maintenance'"
              >
                <ExternalLink class="w-4 h-4" />
                {{ app.status === 'maintenance' ? 'Under Maintenance' : 'Open Application' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: Subscriptions -->
      <div v-if="activeTab === 'subscriptions'" class="space-y-4 max-w-2xl">
        <div v-if="userSubs.length === 0" class="glass-card p-10 text-center">
          <p class="text-sm" style="color: var(--text-2);">No active subscriptions found.</p>
        </div>

        <div
          v-for="sub in userSubs"
          :key="sub.id"
          class="glass-card p-5"
        >
          <div v-if="getSubApp(sub.appId)" class="space-y-4">
            <!-- App row -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ getSubApp(sub.appId).emoji }}</span>
                <div>
                  <p class="font-semibold text-sm" style="color: var(--text-1);">{{ getSubApp(sub.appId).name }}</p>
                  <p class="text-xs" style="color: var(--text-3);">{{ getSubApp(sub.appId).category }}</p>
                </div>
              </div>
              <span
                class="text-xs font-semibold px-2.5 py-1 rounded-full"
                :style="sub.billing === 'annual'
                  ? 'background: rgba(74,222,128,0.12); color: #4ade80;'
                  : 'background: rgba(38,207,255,0.10); color: #26cfff;'"
              >{{ sub.billing === 'annual' ? 'Annual' : 'Monthly' }}</span>
            </div>

            <!-- Billing switcher -->
            <div>
              <p class="text-xs font-medium mb-2" style="color: var(--text-3);">Choose billing cycle</p>
              <div
                class="inline-flex rounded-xl p-1 gap-1"
                style="background: var(--glass-bg-2);"
              >
                <button
                  @click="adminStore.setSubscriptionBilling(sub.id, 'monthly')"
                  class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                  :style="sub.billing === 'monthly'
                    ? 'background: linear-gradient(135deg, #26cfff, #9b5aff); color: white; box-shadow: 0 2px 8px rgba(38,207,255,0.3);'
                    : 'color: var(--text-2);'"
                >
                  Monthly ${{ getSubApp(sub.appId).basePrice }}/mo
                </button>
                <button
                  @click="adminStore.setSubscriptionBilling(sub.id, 'annual')"
                  class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                  :style="sub.billing === 'annual'
                    ? 'background: linear-gradient(135deg, #4ade80, #26cfff); color: white; box-shadow: 0 2px 8px rgba(74,222,128,0.3);'
                    : 'color: var(--text-2);'"
                >
                  Annual ${{ adminStore.computePrice(getSubApp(sub.appId), 'annual') }}/mo
                  <span class="text-[10px] ml-0.5">–{{ getSubApp(sub.appId).annualDiscount }}%</span>
                </button>
              </div>
            </div>

            <!-- Savings callout -->
            <div
              v-if="sub.billing === 'annual'"
              class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
              style="background: rgba(74,222,128,0.08); color: #4ade80;"
            >
              <span>You save ${{ annualSavings(getSubApp(sub.appId)).toFixed(2) }}/year vs monthly billing</span>
            </div>

            <!-- Details row -->
            <div class="flex flex-wrap gap-x-6 gap-y-1 text-xs" style="color: var(--text-3);">
              <span>Next billing: {{ formatDate(sub.nextBillingAt) }}</span>
              <span>{{ paymentMethodLabel(sub.paymentMethod) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 3: Billing -->
      <div v-if="activeTab === 'billing'" class="max-w-lg space-y-5">
        <!-- Total spend summary -->
        <div class="glass-card p-5">
          <p class="text-xs font-medium mb-1" style="color: var(--text-3);">Estimated Monthly Spend</p>
          <p class="text-3xl font-bold" style="color: var(--text-1);">${{ totalMonthlySpend.toFixed(2) }}</p>
          <p class="text-xs mt-1" style="color: var(--text-3);">Across {{ userSubs.length }} subscription{{ userSubs.length !== 1 ? 's' : '' }}</p>
        </div>

        <!-- Default payment method -->
        <div class="glass-card p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold" style="color: var(--text-1);">Default Payment Method</h3>
            <button @click="showPaymentModal = true" class="btn btn-outline text-xs py-1.5 px-3">
              Change
            </button>
          </div>

          <div v-if="defaultPaymentMethod" class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center"
              style="background: var(--glass-bg-2);"
            >
              <CreditCard v-if="defaultPaymentMethod.type === 'card'" class="w-5 h-5" style="color: var(--text-2);" />
              <span v-else class="text-base">🅿️</span>
            </div>
            <div>
              <p class="text-sm font-medium" style="color: var(--text-1);">
                {{ defaultPaymentMethod.type === 'card'
                    ? `${defaultPaymentMethod.brand} •••• ${defaultPaymentMethod.last4}`
                    : `PayPal — ${defaultPaymentMethod.email}` }}
              </p>
              <p class="text-xs" style="color: var(--text-3);">
                {{ defaultPaymentMethod.type === 'card' ? 'Credit / Debit Card' : 'PayPal Account' }}
              </p>
            </div>
          </div>
          <p v-else class="text-sm" style="color: var(--text-3);">No payment method on file.</p>
        </div>

        <!-- Payment Modal -->
        <Teleport to="body">
          <Transition name="fade">
            <div
              v-if="showPaymentModal"
              class="fixed inset-0 z-50 flex items-center justify-center p-4"
              style="background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);"
              @click.self="showPaymentModal = false"
            >
              <div class="glass-card w-full max-w-md" style="overflow: visible;">
                <!-- Header -->
                <div class="flex items-center justify-between p-5" style="border-bottom: 1px solid var(--glass-border);">
                  <h3 class="text-base font-semibold" style="color: var(--text-1);">Update Payment Method</h3>
                  <button
                    @click="showPaymentModal = false"
                    class="w-8 h-8 rounded-lg flex items-center justify-center"
                    style="background: var(--glass-bg-2); color: var(--text-2);"
                  ><X class="w-4 h-4" /></button>
                </div>

                <!-- Payment tabs -->
                <div class="flex gap-1 px-5 pt-5 pb-0">
                  <button
                    @click="paymentTab = 'card'"
                    class="flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                    :style="paymentTab === 'card'
                      ? 'background: linear-gradient(135deg, #26cfff20, #9b5aff20); color: #26cfff; border: 1px solid rgba(38,207,255,0.25);'
                      : 'color: var(--text-2); border: 1px solid var(--glass-border);'"
                  >Credit Card</button>
                  <button
                    @click="paymentTab = 'paypal'"
                    class="flex-1 py-2 rounded-xl text-sm font-medium ml-2 transition-all duration-200"
                    :style="paymentTab === 'paypal'
                      ? 'background: linear-gradient(135deg, #26cfff20, #9b5aff20); color: #26cfff; border: 1px solid rgba(38,207,255,0.25);'
                      : 'color: var(--text-2); border: 1px solid var(--glass-border);'"
                  >PayPal</button>
                </div>

                <!-- Card form -->
                <div v-if="paymentTab === 'card'" class="p-5 space-y-3">
                  <div>
                    <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Card Number</label>
                    <input
                      v-model="cardForm.number"
                      type="text"
                      class="input w-full font-mono"
                      placeholder="•••• •••• •••• ____"
                      maxlength="19"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Expiry (MM/YY)</label>
                      <input v-model="cardForm.expiry" type="text" class="input w-full" placeholder="MM/YY" maxlength="5" />
                    </div>
                    <div>
                      <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">CVV</label>
                      <input v-model="cardForm.cvv" type="text" class="input w-full" placeholder="•••" maxlength="4" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Cardholder Name</label>
                    <input v-model="cardForm.name" type="text" class="input w-full" placeholder="Name on card" />
                  </div>
                </div>

                <!-- PayPal form -->
                <div v-if="paymentTab === 'paypal'" class="p-5">
                  <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">PayPal Email</label>
                  <input v-model="paypalEmail" type="email" class="input w-full" placeholder="you@example.com" />
                </div>

                <!-- Footer -->
                <div class="flex justify-end gap-3 p-5" style="border-top: 1px solid var(--glass-border);">
                  <button @click="showPaymentModal = false" class="btn btn-outline">Cancel</button>
                  <button @click="savePaymentMethod" class="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>

        <!-- Success toast -->
        <Transition name="toast">
          <div
            v-if="showToast"
            class="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium text-white shadow-2xl"
            style="background: linear-gradient(135deg, #4ade80, #26cfff); box-shadow: 0 8px 24px rgba(74,222,128,0.4);"
          >
            <CheckCircle class="w-4 h-4 shrink-0" />
            Payment method updated successfully.
          </div>
        </Transition>
      </div>

      <!-- Tab 4: Profile -->
      <div v-if="activeTab === 'profile'" class="max-w-lg">
        <div class="glass-card p-6 space-y-4">
          <h3 class="text-base font-semibold mb-2" style="color: var(--text-1);">Profile Settings</h3>

          <div>
            <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Display Name</label>
            <input v-model="profileForm.displayName" type="text" class="input w-full" placeholder="Your name" />
          </div>

          <div>
            <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Email</label>
            <input :value="authStore.userEmail" type="email" class="input w-full opacity-60 cursor-not-allowed" disabled />
          </div>

          <!-- Account status -->
          <div class="flex items-center justify-between pt-2">
            <div>
              <p class="text-xs font-medium" style="color: var(--text-2);">Account Status</p>
            </div>
            <span
              class="text-xs font-semibold px-3 py-1 rounded-full"
              :style="currentUser?.status === 'active'
                ? 'background: rgba(74,222,128,0.12); color: #4ade80;'
                : 'background: rgba(251,191,36,0.12); color: #fbbf24;'"
            >{{ currentUser?.status || 'unknown' }}</span>
          </div>

          <button
            @click="handleProfileSave"
            class="btn btn-primary w-full"
            :disabled="profileSaving"
          >
            {{ profileSaving ? 'Saving…' : 'Save Changes' }}
          </button>

          <Transition name="fade">
            <p v-if="profileSaved" class="text-xs text-center" style="color: #4ade80;">Profile updated successfully.</p>
          </Transition>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useAdminStore } from '@/store/modules/admin'
import { ExternalLink, CreditCard, X, CheckCircle } from 'lucide-vue-next'

const authStore  = useAuthStore()
const adminStore = useAdminStore()

// ── Current user ──
const currentUser = computed(() => adminStore.getOrFallback(authStore.userEmail))
const userSubs    = computed(() => adminStore.getUserSubscriptions(currentUser.value?.id))
const userApps    = computed(() => adminStore.getUserGrantedApps(currentUser.value?.id))

// ── Tabs ──
const activeTab = ref('apps')
const tabs = [
  { id: 'apps',          label: 'My Apps' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'billing',       label: 'Billing' },
  { id: 'profile',       label: 'Profile' },
]

// ── My Apps helpers ──
function getSubBilling(appId) {
  const sub = adminStore.getSubscriptionForApp(currentUser.value?.id, appId)
  if (!sub) return 'Granted'
  return sub.billing === 'annual' ? 'Annual Plan' : 'Monthly Plan'
}

function getAppPriceLabel(app) {
  const sub = adminStore.getSubscriptionForApp(currentUser.value?.id, app.id)
  if (!sub) return 'Free'
  return `$${adminStore.computePrice(app, sub.billing)}/mo`
}

// ── Subscriptions helpers ──
function getSubApp(appId) {
  return adminStore.applications.find(a => a.id === appId) || null
}

function annualSavings(app) {
  const monthly = app.basePrice
  const annual  = adminStore.computePrice(app, 'annual')
  return (monthly - annual) * 12
}

function paymentMethodLabel(pm) {
  if (!pm) return ''
  if (pm.type === 'card') return `${pm.brand} •••• ${pm.last4}`
  return `PayPal: ${pm.email}`
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ── Billing ──
const totalMonthlySpend = computed(() =>
  userSubs.value.reduce((sum, sub) => {
    const app = getSubApp(sub.appId)
    if (!app) return sum
    return sum + adminStore.computePrice(app, sub.billing)
  }, 0)
)

const defaultPaymentMethod = computed(() => {
  if (!userSubs.value.length) return null
  return userSubs.value[userSubs.value.length - 1].paymentMethod
})

// ── Payment Modal ──
const showPaymentModal = ref(false)
const paymentTab       = ref('card')
const showToast        = ref(false)
const paypalEmail      = ref('')

const cardForm = reactive({
  number: '',
  expiry: '',
  cvv: '',
  name: '',
})

function savePaymentMethod() {
  if (paymentTab.value === 'card') {
    const last4 = cardForm.number.replace(/\D/g, '').slice(-4) || '0000'
    adminStore.setPaymentMethod(currentUser.value.id, {
      type: 'card',
      brand: 'Visa',
      last4,
    })
  } else {
    adminStore.setPaymentMethod(currentUser.value.id, {
      type: 'paypal',
      email: paypalEmail.value || authStore.userEmail,
    })
  }
  showPaymentModal.value = false
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 3000)
}

// ── Profile ──
const profileForm = reactive({ displayName: '' })
const profileSaving = ref(false)
const profileSaved  = ref(false)

onMounted(() => {
  profileForm.displayName = currentUser.value?.name || authStore.userName
})

async function handleProfileSave() {
  profileSaving.value = true
  profileSaved.value  = false
  await new Promise(r => setTimeout(r, 800))
  profileSaving.value = false
  profileSaved.value  = true
  setTimeout(() => { profileSaved.value = false }, 3000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}
</style>
