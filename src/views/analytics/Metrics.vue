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
            Metrics
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-base font-medium">
            Monitor and analyze key performance indicators and business metrics
          </p>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Time Range Filter -->
          <select
            class="px-4 py-2.5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>

          <!-- Refresh Button -->
          <button aria-label="Refresh metrics"
            class="group px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/40 hover:scale-105">
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Key Metrics Overview -->
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">Page Views</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">2.4M</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +18.2%
            </p>
          </div>
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out group-hover:rotate-3 group-hover:scale-110 bg-blue-100/80 dark:bg-blue-900/40 px-2">
            <svg class="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
        'hover:shadow-2xl hover:shadow-red-500/20 dark:hover:shadow-red-700/30'
      ]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">Bounce Rate</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">4.3%</p>
            <p class="text-sm text-red-600 dark:text-red-400 flex items-center mt-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
              +2.1%
            </p>
          </div>
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out group-hover:rotate-3 group-hover:scale-110 bg-red-100/80 dark:bg-red-900/40 px-2">
            <svg class="w-7 h-7 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">Avg. Session</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">3m 24s</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +12.5%
            </p>
          </div>
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out group-hover:rotate-3 group-hover:scale-110 bg-green-100/80 dark:bg-green-900/40 px-2">
            <svg class="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400 py-2">New Users</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">8,43</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-2">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +25.8%
            </p>
          </div>
          <div
            class="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-out group-hover:rotate-3 group-hover:scale-110 bg-purple-100/80 dark:bg-purple-900/40 px-2">
            <svg class="w-7 h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Metrics Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Top Pages -->
      <div :class="[
        'relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300'
      ]">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Top Pages</h3>
        <div class="space-y-4">
          <div
            class="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200 py-2">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium px-2">/dashboard</span>
            </div>
            <span class="text-gray-900 dark:text-white font-semibold">45,231</span>
          </div>
          <div
            class="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium px-2">/analytics</span>
            </div>
            <span class="text-gray-900 dark:text-white font-semibold">32,156</span>
          </div>
          <div
            class="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium px-2">/reports</span>
            </div>
            <span class="text-gray-900 dark:text-white font-semibold">28,943</span>
          </div>
          <div
            class="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium px-2">/metrics</span>
            </div>
            <span class="text-gray-900 dark:text-white font-semibold">21,567</span>
          </div>
          <div
            class="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium px-2">/settings</span>
            </div>
            <span class="text-gray-900 dark:text-white font-semibold">15,234</span>
          </div>
        </div>
      </div>

      <!-- Traffic Sources -->
      <div :class="[
        'relative overflow-hidden rounded-2xl p-6',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300'
      ]">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Traffic Sources</h3>
        <div class="space-y-4">
          <div
            class="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg flex items-center justify-center px-2">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </div>
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium px-2">Social Media</span>
            </div>
            <span class="text-gray-900 dark:text-white font-semibold">35.2%</span>
          </div>

          <div
            class="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-100/80 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium px-2">Direct</span>
            </div>
            <span class="text-gray-900 dark:text-white font-semibold">28.7%</span>
          </div>

          <div
            class="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-purple-100/80 dark:bg-purple-900/40 rounded-lg flex items-center justify-center px-2">
                <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
              </div>
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium px-2">Referral</span>
            </div>
            <span class="text-gray-900 dark:text-white font-semibold">22.1%</span>
          </div>

          <div
            class="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-orange-100/80 dark:bg-orange-900/40 rounded-lg flex items-center justify-center px-2">
                <svg class="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span class="text-gray-700 dark:text-gray-300 text-sm font-medium px-2">Email</span>
            </div>
            <span class="text-gray-900 dark:text-white font-semibold">14.0%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AnalyticsMetrics'
})
</script>
