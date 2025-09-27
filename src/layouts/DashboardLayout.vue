<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="flex h-screen">
      <!-- Sidebar -->
      <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>

      <!-- Mobile sidebar overlay -->
      <div v-if="uiStore.isMobileSidebarOpen" class="fixed inset-0 z-40 lg:hidden">
        <div
          class="fixed inset-0 bg-gray-600 bg-opacity-75"
          @click="uiStore.closeMobileSidebar"
        ></div>
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button
              @click="uiStore.closeMobileSidebar"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <Sidebar />
        </div>
      </div>

      <!-- Main content area -->
      <div class="lg:pl-64 flex flex-col flex-1">
        <!-- Top Bar -->
        <header
          class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30"
        >
          <div class="px-4 sm:px-6 lg:px-8 py-4">
            <div class="flex justify-between items-center min-h-[60px]">
              <div class="flex items-center space-x-4 flex-1 min-w-0">
                <!-- Mobile menu button -->
                <button
                  @click="uiStore.openMobileSidebar"
                  class="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                >
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <div class="flex items-center space-x-3 min-w-0 flex-1">
                  <img
                    :src="personalInfo.avatar"
                    :alt="`${personalInfo.name} avatar`"
                    class="h-10 w-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div class="min-w-0 flex-1">
                    <h1 class="text-lg font-semibold text-gray-900 dark:text-white truncate mb-1">
                      {{ personalInfo.name }}
                    </h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {{ personalInfo.title }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex items-center space-x-4 flex-shrink-0 ml-4">
                <a
                  v-if="personalInfo.cvUrl"
                  :href="personalInfo.cvUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Download CV</span>
                </a>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
          <div class="p-4 sm:p-6 lg:p-8">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue'
import ThemeToggle from '@/components/dashboard/ThemeToggle.vue'
import { usePortfolioData } from '@/composables/usePortfolioData'
import { useUiStore } from '@/stores/ui'
import { useTheme } from '@/composables/useTheme'

const { personalInfo } = usePortfolioData()
const uiStore = useUiStore()

// Initialize theme with proper lifecycle management
useTheme()
</script>
