<template>
  <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo and Name Section -->
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <img
              :src="personalInfo.avatar"
              :alt="`${personalInfo.name} avatar`"
              class="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ personalInfo.name }}
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ personalInfo.title }}
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-2" role="navigation" aria-label="Main navigation">
          <router-link
            v-for="item in mainNavItems"
            :key="item.name"
            :to="item.route"
            class="nav-link"
            :class="{ 'nav-link-active': isActiveRoute(item.route) }"
            :aria-current="isActiveRoute(item.route) ? 'page' : undefined"
          >
            <Icon :name="item.icon" size="sm" class="mr-2" />
            {{ item.label }}
          </router-link>
        </nav>

        <!-- Dark Mode Toggle & Mobile menu button -->
        <div class="flex items-center space-x-2">
          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2"
            aria-label="Toggle dark mode"
          >
            <svg
              v-if="!isDarkMode"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-show="isMobileMenuOpen"
        id="mobile-menu"
        class="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 py-4"
      >
        <div class="space-y-1">
          <router-link
            v-for="item in mainNavItems"
            :key="item.name"
            :to="item.route"
            class="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            :aria-current="isActiveRoute(item.route) ? 'page' : undefined"
            @click="closeMobileMenu"
          >
            <Icon :name="item.icon" size="sm" class="mr-3" />
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { PersonalInfo } from '@/types'
import { useTheme } from '@/composables/useTheme'
import { getMainNavItems } from '@/constants/navItems'
import Icon from '@/components/ui/Icon.vue'

interface Props {
  personalInfo: PersonalInfo
}

defineProps<Props>()

const route = useRoute()
const { isDarkMode, toggleDarkMode } = useTheme()
const isMobileMenuOpen = ref(false)

// Get navigation items from centralized configuration
const mainNavItems = computed(() => getMainNavItems())

// Check if a route is currently active
const isActiveRoute = (routePath: string): boolean => {
  return route.path === routePath
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>
