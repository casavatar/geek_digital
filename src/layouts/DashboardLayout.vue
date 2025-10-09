<!-- DashboardLayout.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-950 transition-colors duration-500">
    <div class="flex h-screen overflow-hidden">

      <!-- Sidebar -->
      <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <div
          class="flex-1 flex flex-col min-h-0 bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-200 border-r border-gray-200/40 dark:border-gray-700/40 shadow-xl shadow-gray-200/50 dark:shadow-gray-950/50">
          <Sidebar />
        </div>
      </div>

      <!-- Mobile Sidebar Overlay -->
      <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="uiStore.isMobileSidebarOpen" class="fixed inset-0 z-50 lg:hidden">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-gray-900/60 backdrop-blur-md transition-all duration-300"
            @click="uiStore.closeMobileSidebar" aria-hidden="true"></div>

          <!-- Mobile Sidebar Panel -->
          <Transition enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="-translate-x-full" enter-to-class="translate-x-0"
            leave-active-class="transition-transform duration-200 ease-in" leave-from-class="translate-x-0"
            leave-to-class="-translate-x-full">
            <div v-if="uiStore.isMobileSidebarOpen"
              class="relative flex-1 flex flex-col max-w-xs w-full bg-white/40 dark:bg-gray-800/40 backdrop-blur-2xl backdrop-saturate-200 border-r border-gray-200/50 dark:border-gray-700/50 shadow-2xl shadow-gray-900/30"
              role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
              <!-- Close Button -->
              <div class="absolute top-0 right-0 -mr-12 pt-5">
                <button @click="uiStore.closeMobileSidebar"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 hover:scale-110"
                  aria-label="Close mobile menu">
                  <svg class="h-6 w-6 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <Sidebar />
            </div>
          </Transition>
        </div>
      </Transition>

      <!-- Main Content Area -->
      <div class="lg:pl-64 flex flex-col flex-1 min-w-0">

        <!-- Header -->
        <header
          class="sticky top-0 z-40 bg-white/50 dark:bg-gray-800/50 backdrop-blur-2xl backdrop-saturate-200 border-b border-gray-200/40 dark:border-gray-700/40 shadow-lg shadow-gray-200/30 dark:shadow-gray-950/40 transition-all duration-300">
          <div class="px-6 sm:px-8 lg:px-10 py-5">
            <div class="flex items-center justify-between gap-5">

              <!-- Left Section: Mobile Menu + Avatar + Info -->
              <div class="flex items-center gap-4 min-w-0 flex-1">

                <!-- Mobile Menu Button -->
                <button @click="uiStore.openMobileSidebar"
                  class="lg:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100/50 hover:bg-gray-200/60 dark:bg-gray-700/50 dark:hover:bg-gray-600/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 hover:scale-105"
                  aria-label="Open mobile menu">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <!-- Avatar + User Info -->
                <div class="flex items-center gap-3 min-w-0 flex-1">
                  <div class="relative group flex-shrink-0">
                    <div
                      class="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-60 group-hover:opacity-100 blur transition-all duration-300">
                    </div>
                    <img :src="personalInfo.avatar" :alt="`${personalInfo.name} avatar`"
                      class="relative h-11 w-11 rounded-2xl object-cover ring-2 ring-white/50 dark:ring-gray-700/50 shadow-lg transition-transform duration-300 group-hover:scale-105"
                      loading="lazy" />
                  </div>

                  <div class="min-w-0 flex-1">
                    <h1
                      class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate tracking-tight">
                      {{ personalInfo.name }}
                    </h1>
                    <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                      {{ personalInfo.title }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Right Section: Actions -->
              <div class="flex items-center gap-3 flex-shrink-0">

                <!-- Download CV Button -->
                <a v-if="personalInfo.cvUrl" :href="personalInfo.cvUrl" target="_blank" rel="noopener noreferrer"
                  class="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] whitespace-nowrap overflow-hidden">
                  <div
                    class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                  <svg class="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-y-0.5"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="relative z-10 hidden sm:inline">Download CV</span>
                  <span class="relative z-10 sm:hidden">CV</span>
                </a>

                <!-- Theme Toggle -->
                <div class="flex-shrink-0">
                  <ThemeToggle />
                </div>
              </div>

            </div>
          </div>
        </header>

        <!-- Main Dashboard Content -->
        <main class="flex-1 overflow-y-auto scroll-smooth">
          <div class="px-6 sm:px-8 lg:px-10 py-5 space-y-5">
            <router-view v-slot="{ Component, route }">
              <Transition mode="out-in" enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-4">
                <component :is="Component" :key="route.path" />
              </Transition>
            </router-view>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layout/AppSidebar.vue'
import ThemeToggle from '@/components/dashboard/ThemeToggle.vue'
import { usePortfolioData } from '@/composables/usePortfolioData'
import { useUiStore } from '@/stores/ui'

const { personalInfo } = usePortfolioData()
const uiStore = useUiStore()
</script>

<style scoped>
/* Custom Scrollbar Styling */
main::-webkit-scrollbar {
  width: 8px;
}

main::-webkit-scrollbar-track {
  background-color: rgb(243 244 246 / 0.5);
}

:global(.dark) main::-webkit-scrollbar-track {
  background-color: rgb(31 41 55 / 0.5);
}

main::-webkit-scrollbar-thumb {
  background-color: rgb(209 213 219 / 0.8);
  border-radius: 9999px;
  transition: background-color 200ms;
}

main::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175 / 0.8);
}

:global(.dark) main::-webkit-scrollbar-thumb {
  background-color: rgb(75 85 99 / 0.8);
}

:global(.dark) main::-webkit-scrollbar-thumb:hover {
  background-color: rgb(107 114 128 / 0.8);
}

/* Smooth Gradient Animation */
@keyframes gradient-shift {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient-shift 15s ease infinite;
}
</style>
