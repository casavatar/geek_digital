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
            Data Pipelines
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-base font-medium">
            Monitor and manage your data processing pipelines and workflows
          </p>
        </div>

        <div class="flex items-center space-x-4">
          <button aria-label="Create new pipeline"
            class="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/40 hover:scale-105">
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New Pipeline</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Pipeline Status Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-5">
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Pipelines</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">12</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              All Running
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
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
        'hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-700/30'
      ]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">94.2%</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +2.1%
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Data Volume</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">2.4 TB</p>
            <p class="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              +8.5%
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Failed Runs</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">3</p>
            <p class="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
              -1.5%
            </p>
          </div>
          <div class="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Pipeline List -->
    <div :class="[
      'relative overflow-hidden rounded-2xl',
      'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
      'border border-gray-200/40 dark:border-gray-700/40',
      'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40'
    ]">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Pipeline Runs</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">Monitor the latest pipeline executions and their status
        </p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Pipeline</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Start Time</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Duration</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Records</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200/20 dark:divide-gray-700/20">
            <tr class="group hover:bg-white/10 dark:hover:bg-gray-700/10 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-blue-100/80 dark:bg-blue-900/40 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110">
                    <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 px-2">
                      Customer Data ETL</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 px-2">High Priority</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100/80 text-green-800 dark:bg-green-900/40 dark:text-green-400 backdrop-blur-sm border border-green-200/50 dark:border-green-800/50">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                  Completed
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2024-09-24 10:00</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">1h 30m</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">1.2M</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  class="px-3 py-1.5 text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white bg-transparent hover:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-all duration-200 hover:shadow-md">View</button>
              </td>
            </tr>
            <tr class="group hover:bg-white/10 dark:hover:bg-gray-700/10 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-purple-100/80 dark:bg-purple-900/40 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110">
                    <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 px-2">
                      Marketing Campaign Analysis</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 px-2">Medium Priority</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100/80 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
                  <div class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></div>
                  Running
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2024-09-24 11:15</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">0h 45m</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">0.5M</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  class="px-3 py-1.5 text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white bg-transparent hover:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-all duration-200 hover:shadow-md">View</button>
              </td>
            </tr>
            <tr class="group hover:bg-white/10 dark:hover:bg-gray-700/10 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-orange-100/80 dark:bg-orange-900/40 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 group-hover:scale-110">
                    <svg class="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 px-2">
                      Fraud Detection Model Training</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 px-2">High Priority</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100/80 text-red-800 dark:bg-red-900/40 dark:text-red-400 backdrop-blur-sm border border-red-200/50 dark:border-red-800/50">
                  <div class="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></div>
                  Failed
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2024-09-24 09:00</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2h 00m</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2.1M</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  class="px-3 py-1.5 text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white bg-transparent hover:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-all duration-200 hover:shadow-md">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Data Pipelines View
defineOptions({
  name: 'DataPipelines'
})
</script>
