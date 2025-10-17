<template>
  <div class="flex flex-col space-y-10">
    <!-- Liquid Glass Header Section -->
    <div
      class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/20 to-gray-100/10 dark:from-gray-900/40 dark:to-gray-950/30 backdrop-blur-xl backdrop-saturate-150 border border-gray-200/40 dark:border-gray-700/40 shadow-lg shadow-blue-500/10 dark:shadow-blue-700/20 p-8 transition-all duration-300">
      <!-- Ambient Background Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-pink-600/10 pointer-events-none">
      </div>

      <div class="relative flex items-center justify-between">
        <div class="space-y-2">
          <h1
            class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 py-2">
            Data Models
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-base font-medium">
            Design and manage data models, schemas, and database structures
          </p>
        </div>

        <div class="flex items-center space-x-4">
          <button aria-label="Create new model"
            class="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/40 hover:scale-105">
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New Model</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Data Models Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-5">
      <div :class="[
        'group relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.03] hover:brightness-110',
        'hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-700/30'
      ]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">Total Models</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">18</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Active data models</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>

      <div :class="[
        'group relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.03] hover:brightness-110',
        'hover:shadow-2xl hover:shadow-green-500/20 dark:hover:shadow-green-700/30'
      ]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">Tables</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">156</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +8.2%
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h4a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
            </svg>
          </div>
        </div>
      </div>

      <div :class="[
        'group relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.03] hover:brightness-110',
        'hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-700/30'
      ]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">Relationships</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">89</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +12.5%
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
      </div>

      <div :class="[
        'group relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.03] hover:brightness-110',
        'hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-700/30'
      ]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">Data Quality</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">94.7%</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +1.8%
            </p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Models List -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 py-5">
      <!-- Core Models -->
      <div :class="[
        'relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300'
      ]">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 py-2">Core Data Models</h3>
        <div class="space-y-3">
          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 px-2">
                  Customer Model</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 px-2">12 tables, 8 relationships</p>
              </div>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-1 bg-green-100/80 dark:bg-green-900/40 text-green-800 dark:text-green-400 text-xs font-medium rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                Active
              </span>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Updated 2h ago</p>
            </div>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-green-100/80 dark:bg-green-900/40 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200 px-2">
                  Sales Model</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 px-2">8 tables, 5 relationships</p>
              </div>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-1 bg-green-100/80 dark:bg-green-900/40 text-green-800 dark:text-green-400 text-xs font-medium rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                Active
              </span>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Updated 1h ago</p>
            </div>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-purple-100/80 dark:bg-purple-900/40 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 px-2">
                  Product Model</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400 px-2">15 tables, 12 relationships</p>
              </div>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-1 bg-yellow-100/80 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-400 text-xs font-medium rounded-full backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/50">
                <div class="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></div>
                Draft
              </span>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Updated 1d ago</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Model Relationships -->
      <div :class="[
        'relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300'
      ]">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 py-2">Model Relationships</h3>
        <div class="space-y-3">
          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute inset-0 bg-blue-500/20 rounded-full blur-sm"></div>
                <div class="relative w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Customer → Sales</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">One-to-Many relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Strong</span>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute inset-0 bg-green-500/20 rounded-full blur-sm"></div>
                <div class="relative w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                  Product → Sales</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Many-to-Many relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Strong</span>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute inset-0 bg-purple-500/20 rounded-full blur-sm"></div>
                <div class="relative w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                  Customer → Address</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">One-to-One relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Medium</span>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute inset-0 bg-orange-500/20 rounded-full blur-sm"></div>
                <div class="relative w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                  Product → Category</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Many-to-One relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Strong</span>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute inset-0 bg-pink-500/20 rounded-full blur-sm"></div>
                <div class="relative w-2.5 h-2.5 bg-pink-500 rounded-full"></div>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-200">
                  Sales → Payment</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">One-to-One relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Weak</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Model Visualization Placeholder -->
    <div :class="[
      'relative overflow-hidden rounded-2xl p-6',
      'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
      'border border-gray-200/40 dark:border-gray-700/40',
      'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
      'transition-all duration-300'
    ]">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Model Visualization</h3>
      <div class="h-96 flex items-center justify-center text-gray-400 dark:text-gray-600">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p>ERD visualization coming soon...</p>
          <p class="text-sm mt-2">Interactive database schema diagram will be available here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DataModelsView'
})
// Data Models component
</script>
