<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="container-custom">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">G</span>
          </div>
          <span class="text-xl font-bold text-gray-900">GeekDigital</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="nav-link"
            active-class="text-primary-600"
          >
            Home
          </router-link>
          <router-link
            to="/catalog"
            class="nav-link"
            active-class="text-primary-600"
          >
            Catalog
          </router-link>
          <router-link
            to="/portfolio"
            class="nav-link"
            active-class="text-primary-600"
          >
            Portfolio
          </router-link>
          <router-link
            to="/shop"
            class="nav-link"
            active-class="text-primary-600"
          >
            Shop
          </router-link>
        </div>

        <!-- Right side buttons -->
        <div class="flex items-center space-x-4">
          <!-- Cart -->
          <button
            @click="$router.push('/shop')"
            class="relative p-2 text-gray-600 hover:text-primary-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>

          <!-- User menu -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <div class="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                {{ authStore.userName[0].toUpperCase() }}
              </div>
            </button>

            <!-- Dropdown -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
            >
              <router-link
                to="/dashboard"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="showUserMenu = false"
              >
                Dashboard
              </router-link>
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>

          <!-- Login button -->
          <router-link
            v-else
            to="/auth/login"
            class="btn btn-primary"
          >
            Login
          </router-link>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="showMobileMenu" class="md:hidden py-4 border-t border-gray-200">
        <router-link to="/" class="mobile-nav-link" @click="showMobileMenu = false">Home</router-link>
        <router-link to="/catalog" class="mobile-nav-link" @click="showMobileMenu = false">Catalog</router-link>
        <router-link to="/portfolio" class="mobile-nav-link" @click="showMobileMenu = false">Portfolio</router-link>
        <router-link to="/shop" class="mobile-nav-link" @click="showMobileMenu = false">Shop</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useCartStore } from '@/store/modules/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const handleLogout = async () => {
  showUserMenu.value = false
  await authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-600 hover:text-primary-600 font-medium transition-colors;
}

.mobile-nav-link {
  @apply block py-2 text-gray-600 hover:text-primary-600 font-medium;
}
</style>
