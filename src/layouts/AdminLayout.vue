<template>
  <div class="flex h-screen overflow-hidden" style="background: var(--body-bg); color: var(--text-1);">

    <!-- ── Sidebar ── -->
    <aside
      class="flex flex-col shrink-0"
      style="width:220px; background: var(--glass-bg-1); border-right: 1px solid var(--glass-border); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);"
    >
      <!-- Brand -->
      <div class="flex items-center gap-2.5 px-4 h-16 shrink-0" style="border-bottom: 1px solid var(--glass-border);">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style="background: linear-gradient(135deg, #26cfff 0%, #9b5aff 100%);"
        >G</div>
        <span class="text-sm font-semibold gradient-text leading-tight">GeekDigital Admin</span>
      </div>

      <!-- Nav links -->
      <nav class="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <RouterLink
          to="/admin"
          :class="navLinkClass(route.path === '/admin')"
        >
          <LayoutDashboard class="w-4 h-4 shrink-0" />
          Overview
        </RouterLink>
        <RouterLink
          to="/admin/users"
          :class="navLinkClass(route.path.startsWith('/admin/users'))"
        >
          <Users class="w-4 h-4 shrink-0" />
          Users
        </RouterLink>
        <RouterLink
          to="/admin/apps"
          :class="navLinkClass(route.path.startsWith('/admin/apps'))"
        >
          <Package class="w-4 h-4 shrink-0" />
          Applications
        </RouterLink>
      </nav>

      <!-- Bottom section -->
      <div class="shrink-0 p-3 space-y-2" style="border-top: 1px solid var(--glass-border);">
        <RouterLink
          to="/"
          class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
          style="color: var(--text-2);"
          @mouseenter="e => e.currentTarget.style.background = 'var(--glass-bg-2)'"
          @mouseleave="e => e.currentTarget.style.background = 'transparent'"
        >
          <ArrowLeft class="w-4 h-4" />
          Back to site
        </RouterLink>

        <!-- Admin avatar -->
        <div class="flex items-center gap-2.5 px-3 py-2">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
            style="background: linear-gradient(135deg, #26cfff 0%, #9b5aff 100%);"
          >E</div>
          <div class="min-w-0">
            <p class="text-xs font-semibold truncate" style="color: var(--text-1);">Eduardo Castellanos</p>
            <p class="text-[10px] truncate" style="color: var(--text-3);">Administrator</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- ── Right column ── -->
    <div class="flex flex-col flex-1 min-w-0">

      <!-- Top bar -->
      <header
        class="flex items-center justify-between px-6 h-16 shrink-0"
        style="background: var(--glass-bg-1); border-bottom: 1px solid var(--glass-border); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);"
      >
        <h1 class="text-base font-semibold" style="color: var(--text-1);">
          {{ pageTitle }}
        </h1>
        <div class="flex items-center gap-3">
          <!-- MRR pill -->
          <span
            class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style="background: rgba(74,222,128,0.12); color: #4ade80; border: 1px solid rgba(74,222,128,0.25);"
          >
            ~${{ adminStore.simulatedMRR.toFixed(0) }} MRR
          </span>
          <!-- Logout -->
          <button
            @click="handleLogout"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
            style="color: var(--text-2); border: 1px solid var(--glass-border);"
            @mouseenter="e => e.currentTarget.style.color = 'var(--text-1)'"
            @mouseleave="e => e.currentTarget.style.color = 'var(--text-2)'"
          >
            <LogOut class="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useAdminStore } from '@/store/modules/admin'
import { LayoutDashboard, Users, Package, ArrowLeft, LogOut } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const adminStore = useAdminStore()

const pageTitle = computed(() => {
  const title = route.meta?.title || 'Admin'
  return title.replace(' - GeekDigital Admin', '')
})

function navLinkClass(isActive) {
  const base = 'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200'
  if (isActive) {
    return base + ' text-cyan-400'
  }
  return base
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<style scoped>
/* Active nav link gradient highlight */
a.router-link-exact-active,
a[style*="cyan"],
nav a:is(.text-cyan-400) {
  background: linear-gradient(135deg, rgba(38,207,255,0.15) 0%, rgba(155,90,255,0.10) 100%);
}
</style>
