<template>
  <div>
    <h2 class="text-xl font-bold mb-6" style="color: var(--text-1);">Dashboard Overview</h2>

    <!-- ── Stat cards ── -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- Total Clients -->
      <div class="glass-card p-5 flex items-start justify-between">
        <div>
          <p class="text-xs font-medium mb-1" style="color: var(--text-3);">Total Clients</p>
          <p class="text-3xl font-bold" style="color: var(--text-1);">{{ adminStore.clientUsers.length }}</p>
        </div>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(38,207,255,0.12);">
          <Users class="w-5 h-5 text-cyan-400" />
        </div>
      </div>

      <!-- Active Clients -->
      <div class="glass-card p-5 flex items-start justify-between">
        <div>
          <p class="text-xs font-medium mb-1" style="color: var(--text-3);">Active Clients</p>
          <p class="text-3xl font-bold" style="color: var(--text-1);">{{ adminStore.activeClients }}</p>
        </div>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(74,222,128,0.12);">
          <UserCheck class="w-5 h-5 text-green-400" />
        </div>
      </div>

      <!-- Subscriptions -->
      <div class="glass-card p-5 flex items-start justify-between">
        <div>
          <p class="text-xs font-medium mb-1" style="color: var(--text-3);">Subscriptions</p>
          <p class="text-3xl font-bold" style="color: var(--text-1);">{{ adminStore.monthlySubsCount + adminStore.annualSubsCount }}</p>
        </div>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(155,90,255,0.12);">
          <CreditCard class="w-5 h-5 text-purple-400" />
        </div>
      </div>

      <!-- Simulated MRR -->
      <div class="glass-card p-5 flex items-start justify-between">
        <div>
          <p class="text-xs font-medium mb-1" style="color: var(--text-3);">Simulated MRR</p>
          <p class="text-3xl font-bold" style="color: var(--text-1);">${{ adminStore.simulatedMRR.toFixed(2) }}</p>
        </div>
        <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style="background: rgba(251,191,36,0.12);">
          <TrendingUp class="w-5 h-5 text-amber-400" />
        </div>
      </div>
    </div>

    <!-- ── Billing breakdown ── -->
    <div class="glass-card p-6 mb-6">
      <h3 class="text-base font-semibold mb-4" style="color: var(--text-1);">Billing Concurrency</h3>

      <div class="flex gap-2 mb-3 h-3 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500"
          :style="{ width: monthlyPct + '%', background: 'linear-gradient(90deg, #26cfff, #9b5aff)' }"
        />
        <div
          class="h-full rounded-full transition-all duration-500"
          :style="{ width: annualPct + '%', background: 'linear-gradient(90deg, #4ade80, #26cfff)' }"
        />
      </div>

      <div class="flex items-center gap-4 mb-3 text-sm">
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full" style="background: linear-gradient(135deg, #26cfff, #9b5aff);"></span>
          <span style="color: var(--text-2);">Monthly — {{ adminStore.monthlySubsCount }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-2.5 h-2.5 rounded-full" style="background: linear-gradient(135deg, #4ade80, #26cfff);"></span>
          <span style="color: var(--text-2);">Annual — {{ adminStore.annualSubsCount }}</span>
        </div>
      </div>

      <p class="text-xs" style="color: var(--text-3);">
        Annual subscribers save on average {{ avgAnnualSaving.toFixed(0) }}% compared to monthly billing.
      </p>
    </div>

    <!-- ── Application health ── -->
    <div class="glass-card p-6">
      <h3 class="text-base font-semibold mb-4" style="color: var(--text-1);">Application Health</h3>
      <div class="space-y-3">
        <div
          v-for="app in enrichedApps"
          :key="app.id"
          class="flex items-center justify-between py-3"
          style="border-bottom: 1px solid var(--glass-border);"
        >
          <div class="flex items-center gap-3 min-w-0">
            <span class="text-xl shrink-0">{{ app.emoji }}</span>
            <div class="min-w-0">
              <p class="text-sm font-semibold truncate" style="color: var(--text-1);">{{ app.name }}</p>
              <span
                class="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style="background: var(--glass-bg-2); color: var(--text-3);"
              >{{ app.category }}</span>
            </div>
          </div>

          <div class="flex items-center gap-4 shrink-0 ml-4">
            <span
              class="text-xs font-semibold px-2.5 py-1 rounded-full"
              :style="app.status === 'active'
                ? 'background: rgba(74,222,128,0.12); color: #4ade80;'
                : 'background: rgba(251,191,36,0.12); color: #fbbf24;'"
            >{{ app.status === 'active' ? 'Active' : 'Maintenance' }}</span>

            <span class="text-sm font-medium" style="color: var(--text-2);">${{ app.basePrice }}/mo</span>

            <div class="flex items-center gap-1 text-xs" style="color: var(--text-3);">
              <Users class="w-3.5 h-3.5" />
              {{ app.subCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAdminStore } from '@/store/modules/admin'
import { Users, UserCheck, CreditCard, TrendingUp } from 'lucide-vue-next'

const adminStore = useAdminStore()

const total = computed(() => adminStore.monthlySubsCount + adminStore.annualSubsCount)
const monthlyPct = computed(() => total.value > 0 ? (adminStore.monthlySubsCount / total.value) * 100 : 0)
const annualPct = computed(() => total.value > 0 ? (adminStore.annualSubsCount / total.value) * 100 : 0)

const avgAnnualSaving = computed(() => {
  const annualSubs = adminStore.subscriptions.filter(s => s.billing === 'annual')
  if (!annualSubs.length) return 0
  let totalDiscount = 0
  annualSubs.forEach(s => {
    const app = adminStore.applications.find(a => a.id === s.appId)
    if (app) totalDiscount += app.annualDiscount
  })
  return totalDiscount / annualSubs.length
})

const enrichedApps = computed(() =>
  adminStore.applications.map(app => ({
    ...app,
    subCount: adminStore.subscriptions.filter(s => s.appId === app.id && s.status === 'active').length,
  }))
)
</script>
