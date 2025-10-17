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
            ETL Jobs
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-base font-medium">
            Manage Extract, Transform, and Load operations for data processing
          </p>
        </div>

        <div class="flex items-center space-x-4">
          <button aria-label="Create new ETL job"
            class="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/40 hover:scale-105">
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New ETL Job</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- ETL Jobs Overview -->
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Jobs</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">24</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Active ETL processes</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">96.8%</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +1.2%
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Data Processed</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">15.7 TB</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +12.3%
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Runtime</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">2h 15m</p>
            <p class="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
              +5.2%
            </p>
          </div>
          <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- ETL Jobs List -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Scheduled Jobs -->
      <div :class="[
        'relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300'
      ]">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 py-2">Scheduled Jobs</h3>
        <div class="space-y-3">
          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Daily Sales Import</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Runs daily at 2:00 AM</p>
              </div>
            </div>
            <span
              class="inline-flex items-center px-2.5 py-1 bg-green-100/80 dark:bg-green-900/40 text-green-800 dark:text-green-400 text-xs font-medium rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
              Active
            </span>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-purple-100/80 dark:bg-purple-900/40 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                  Customer Data Sync</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Runs every 4 hours</p>
              </div>
            </div>
            <span
              class="inline-flex items-center px-2.5 py-1 bg-green-100/80 dark:bg-green-900/40 text-green-800 dark:text-green-400 text-xs font-medium rounded-full backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
              Active
            </span>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-orange-100/80 dark:bg-orange-900/40 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                  Inventory Update</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Runs weekly on Sunday</p>
              </div>
            </div>
            <span
              class="inline-flex items-center px-2.5 py-1 bg-yellow-100/80 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-400 text-xs font-medium rounded-full backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-800/50">
              <div class="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></div>
              Paused
            </span>
          </div>
        </div>
      </div>

      <!-- Recent Executions -->
      <div :class="[
        'relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300'
      ]">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 py-2">Recent Executions</h3>
        <div class="space-y-3">
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
                  Daily Sales Import</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Completed 2 hours ago</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">1h 23m</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            </div>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute inset-0 bg-blue-500/20 rounded-full blur-sm animate-pulse"></div>
                <div class="relative w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Customer Data Sync</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Running for 15 minutes</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">15m</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Elapsed</p>
            </div>
          </div>

          <div
            class="group flex items-center justify-between p-4 bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-700/20 rounded-lg transition-all duration-200 border border-gray-200/20 dark:border-gray-700/20">
            <div class="flex items-center space-x-3">
              <div class="relative flex items-center justify-center w-8 h-8">
                <div class="absolute inset-0 bg-red-500/20 rounded-full blur-sm"></div>
                <div class="relative w-2.5 h-2.5 bg-red-500 rounded-full"></div>
              </div>
              <div>
                <h4
                  class="font-medium text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">
                  Inventory Update</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Failed 1 day ago</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">2h 45m</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            </div>
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
                  Marketing Data Export</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">Completed 3 hours ago</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900 dark:text-white">45m</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ETL Jobs View
defineOptions({
  name: 'EtlJobsView'
})
</script>
