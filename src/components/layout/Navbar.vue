<template>
  <nav :class="['glass-nav', isScrolled && 'glass-nav-scrolled']">
    <div class="glass-nav-container">

      <!-- Logo -->
      <router-link to="/" class="flex items-center group">
        <img
          :src="logoUrl"
          alt="GeekDigital"
          class="h-[62px] w-auto transition-all duration-300 group-hover:scale-105"
        />
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex glass-nav-links">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="['glass-nav-link', isActive(link.to) && 'glass-nav-link-active']"
        >
          {{ link.label }}
        </router-link>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">

        <!-- Theme Toggle -->
        <button
          @click="themeStore.toggleTheme"
          class="glass-btn-icon"
          :title="themeStore.isDark ? 'Light mode' : 'Dark mode'"
        >
          <!-- Sun -->
          <svg v-if="themeStore.isDark" class="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
          <!-- Moon -->
          <svg v-else class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        </button>

        <!-- Cart -->
        <button
          @click="$router.push('/shop')"
          class="glass-btn-icon relative"
          title="Cart"
        >
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span
            v-if="cartStore.itemCount > 0"
            class="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold text-white"
            style="background: linear-gradient(135deg, #00c6ff, #7c3aed)"
          >
            {{ cartStore.itemCount }}
          </span>
        </button>

        <!-- User menu -->
        <div v-if="authStore.isAuthenticated" class="relative">
          <button
            @click="toggleUserMenu"
            class="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-200 glass-btn-icon"
          >
            <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                 style="background: linear-gradient(135deg, #9b5aff, #ec4899)">
              {{ authStore.userName[0].toUpperCase() }}
            </div>
          </button>

          <Transition name="glass-scale">
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 rounded-xl py-1 z-50"
              style="background: var(--glass-bg-1); border: 1px solid var(--glass-border); backdrop-filter: blur(20px); box-shadow: var(--glass-shadow);"
            >
              <router-link
                to="/dashboard"
                class="block px-4 py-2.5 text-sm font-medium transition-colors duration-150"
                style="color: var(--text-2)"
                @mouseenter="e => e.target.style.color = 'var(--text-1)'"
                @mouseleave="e => e.target.style.color = 'var(--text-2)'"
                @click="showUserMenu = false"
              >
                Dashboard
              </router-link>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:text-red-400 transition-colors duration-150"
              >
                Logout
              </button>
            </div>
          </Transition>
        </div>

        <!-- Login -->
        <router-link
          v-else
          to="/auth/login"
          class="glass-btn-primary text-sm px-4 py-2"
        >
          Sign In
        </router-link>

        <!-- Mobile menu button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden glass-btn-icon"
        >
          <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="glass-slide-up">
      <div
        v-if="showMobileMenu"
        class="md:hidden px-4 pb-4 space-y-1"
        style="border-top: 1px solid var(--glass-border)"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="['block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200', isActive(link.to) ? 'glass-nav-link-active' : 'glass-nav-link']"
          @click="showMobileMenu = false"
        >
          {{ link.label }}
        </router-link>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logoUrl from '@/components/GeekDigital.webp'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useCartStore } from '@/store/modules/cart'
import { useThemeStore } from '@/store/modules/theme'

const route  = useRoute()
const router = useRouter()
const authStore  = useAuthStore()
const cartStore  = useCartStore()
const themeStore = useThemeStore()

const showUserMenu   = ref(false)
const showMobileMenu = ref(false)
const isScrolled     = ref(false)

const navLinks = [
  { to: '/',          label: 'Home' },
  { to: '/catalog',   label: 'Catalog' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/shop',      label: 'Shop' },
  { to: '/blog',      label: 'Blog' },
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const toggleUserMenu   = () => { showUserMenu.value = !showUserMenu.value }
const toggleMobileMenu = () => { showMobileMenu.value = !showMobileMenu.value }

const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
  router.push('/')
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 12
}

onMounted(()  => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
