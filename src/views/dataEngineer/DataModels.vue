<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Data Models</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">
            Design and manage data models, schemas, and database structures
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Model
          </button>
        </div>
      </div>
    </div>

    <!-- Data Models Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Models</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">18</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Active data models</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Tables</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">156</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +8.2%
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0V4a1 1 0 011-1h4a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Relationships</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">89</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +12.5%
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Data Quality</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">94.7%</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +1.8%
            </p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Models List -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Core Models -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Core Data Models</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Customer Model</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">12 tables, 8 relationships</p>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full">
                Active
              </span>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Updated 2h ago</p>
            </div>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Sales Model</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">8 tables, 5 relationships</p>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded-full">
                Active
              </span>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Updated 1h ago</p>
            </div>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Product Model</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">15 tables, 12 relationships</p>
              </div>
            </div>
            <div class="text-right">
              <span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs font-medium rounded-full">
                Draft
              </span>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Updated 1d ago</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Model Relationships -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Model Relationships</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Customer → Sales</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">One-to-Many relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Strong</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Product → Sales</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Many-to-Many relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Strong</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Customer → Address</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">One-to-One relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Medium</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Product → Category</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Many-to-One relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Strong</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-pink-500 rounded-full"></div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Sales → Payment</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">One-to-One relationship</p>
              </div>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">Weak</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Model Visualization Placeholder -->
    <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Model Visualization</h3>
      <div class="h-96 flex items-center justify-center text-gray-400 dark:text-gray-600">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p>ERD visualization coming soon...</p>
          <p class="text-sm mt-2">Interactive database schema diagram will be available here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Data Models component
</script>
