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
            Reports
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-base font-medium">
            Generate and manage analytical reports and insights
          </p>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Search Bar -->
          <div class="relative">
            <input v-model="searchQuery" type="text" placeholder="Search reports…" aria-label="Search reports"
              class="w-64 px-4 py-2.5 pl-10 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-gray-300/50 dark:border-gray-600/50 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-300" />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <!-- New Report Button with Glow -->
          <button aria-label="Create new report"
            class="group relative w-35 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/40 hover:ring-2 hover:ring-offset-2 hover:ring-blue-500/40 hover:scale-105">
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>New Report</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Reports Grid with TransitionGroup Animation -->
    <TransitionGroup v-if="filteredReports.length > 0" name="report-card" tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      <div v-for="report in filteredReports" :key="report.id" :class="[
        'group relative overflow-hidden rounded-2xl p-6 py-5',
        'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
        'border border-gray-200/40 dark:border-gray-700/40',
        'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.03] hover:brightness-110',
        'hover:shadow-2xl',
        getHoverShadowClass(report.status),
        'cursor-pointer'
      ]">
        <!-- Gradient Border Accent based on Status -->
        <div :class="[
          'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
          'bg-gradient-to-br p-[2px]',
          getGradientBorderClass(report.status)
        ]">
          <div class="w-full h-full bg-white/90 dark:bg-gray-800/90 rounded-2xl"></div>
        </div>

        <!-- Card Content -->
        <div class="relative z-10">
          <!-- Icon & Status Header -->
          <div class="flex items-start justify-between mb-4">
            <!-- Animated Icon Container -->
            <div :class="[
              'w-14 h-14 rounded-xl flex items-center justify-center',
              'shadow-lg transition-all duration-300 ease-out',
              'group-hover:rotate-3 group-hover:scale-110',
              report.iconBg
            ]">
              <svg :class="['w-7 h-7', report.iconColor]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="report.iconPath" />
              </svg>
            </div>

            <!-- Status Badge with Pulse for Active -->
            <span :class="[
              'px-3 py-1.5 text-xs font-semibold rounded-full backdrop-blur-sm',
              'border transition-all duration-300',
              report.statusClass,
              report.status === 'Active' ? 'animate-pulse-subtle' : ''
            ]">
              {{ report.status }}
            </span>
          </div>

          <!-- Report Title -->
          <h3
            class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 py-2">
            {{ report.title }}
          </h3>

          <!-- Report Description -->
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
            {{ report.description }}
          </p>

          <!-- Footer: Last Updated & Action -->
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500 dark:text-gray-500 font-medium flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ report.lastUpdated }}</span>
            </span>
            <button
              class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform duration-300"
              aria-label="View report details">
              <span>View</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- Empty State -->
    <div v-else
      class="flex flex-col items-center justify-center py-20 px-6 rounded-2xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-gray-200/30 dark:border-gray-700/30">
      <svg class="w-20 h-20 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor"
        viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No reports found</h3>
      <p class="text-gray-500 dark:text-gray-500 text-sm">Try adjusting your search query</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({
  name: 'AnalyticsReports'
})

// Types
interface Report {
  id: number
  title: string
  description: string
  lastUpdated: string
  status: 'Active' | 'Pending' | 'Error' | 'Scheduled'
  iconPath: string
  iconBg: string
  iconColor: string
  statusClass: string
}

// Search Query
const searchQuery = ref('')

// Reports Data
const reports = ref<Report[]>([
  {
    id: 1,
    title: 'Monthly Sales Report',
    description: 'Comprehensive monthly sales analysis with trends and forecasts',
    lastUpdated: '2 hours ago',
    status: 'Active',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-blue-100/80 dark:bg-blue-900/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
    statusClass: 'bg-green-100/80 dark:bg-green-900/40 text-green-800 dark:text-green-400 border-green-200/50 dark:border-green-800/50'
  },
  {
    id: 2,
    title: 'User Engagement Analysis',
    description: 'Detailed analysis of user behavior and engagement metrics',
    lastUpdated: '1 day ago',
    status: 'Pending',
    iconPath: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
    iconBg: 'bg-purple-100/80 dark:bg-purple-900/40',
    iconColor: 'text-purple-600 dark:text-purple-400',
    statusClass: 'bg-yellow-100/80 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-400 border-yellow-200/50 dark:border-yellow-800/50'
  },
  {
    id: 3,
    title: 'Performance Metrics',
    description: 'System performance and optimization recommendations',
    lastUpdated: '30 minutes ago',
    status: 'Active',
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    iconBg: 'bg-green-100/80 dark:bg-green-900/40',
    iconColor: 'text-green-600 dark:text-green-400',
    statusClass: 'bg-green-100/80 dark:bg-green-900/40 text-green-800 dark:text-green-400 border-green-200/50 dark:border-green-800/50'
  },
  {
    id: 4,
    title: 'Financial Summary',
    description: 'Quarterly financial performance and budget analysis',
    lastUpdated: '3 days ago',
    status: 'Error',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    iconBg: 'bg-orange-100/80 dark:bg-orange-900/40',
    iconColor: 'text-orange-600 dark:text-orange-400',
    statusClass: 'bg-red-100/80 dark:bg-red-900/40 text-red-800 dark:text-red-400 border-red-200/50 dark:border-red-800/50'
  },
  {
    id: 5,
    title: 'Marketing Campaign',
    description: 'ROI analysis and campaign effectiveness metrics',
    lastUpdated: '1 hour ago',
    status: 'Active',
    iconPath: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    iconBg: 'bg-indigo-100/80 dark:bg-indigo-900/40',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    statusClass: 'bg-green-100/80 dark:bg-green-900/40 text-green-800 dark:text-green-400 border-green-200/50 dark:border-green-800/50'
  },
  {
    id: 6,
    title: 'Customer Satisfaction',
    description: 'Customer feedback analysis and satisfaction trends',
    lastUpdated: 'Tomorrow',
    status: 'Scheduled',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    iconBg: 'bg-pink-100/80 dark:bg-pink-900/40',
    iconColor: 'text-pink-600 dark:text-pink-400',
    statusClass: 'bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 border-blue-200/50 dark:border-blue-800/50'
  }
])

// Filtered Reports based on Search
const filteredReports = computed(() => {
  if (!searchQuery.value.trim()) {
    return reports.value
  }
  const query = searchQuery.value.toLowerCase()
  return reports.value.filter(
    (report) =>
      report.title.toLowerCase().includes(query) ||
      report.description.toLowerCase().includes(query) ||
      report.status.toLowerCase().includes(query)
  )
})

// Helper Functions for Dynamic Styling
const getGradientBorderClass = (status: Report['status']) => {
  switch (status) {
    case 'Active':
      return 'from-green-500/40 to-emerald-400/20'
    case 'Pending':
      return 'from-yellow-400/40 to-amber-300/20'
    case 'Error':
      return 'from-red-500/40 to-pink-400/20'
    case 'Scheduled':
      return 'from-blue-500/40 to-indigo-400/20'
    default:
      return 'from-gray-500/40 to-gray-400/20'
  }
}

const getHoverShadowClass = (status: Report['status']) => {
  switch (status) {
    case 'Active':
      return 'hover:shadow-green-500/30 dark:hover:shadow-green-700/40'
    case 'Pending':
      return 'hover:shadow-yellow-500/30 dark:hover:shadow-yellow-700/40'
    case 'Error':
      return 'hover:shadow-red-500/30 dark:hover:shadow-red-700/40'
    case 'Scheduled':
      return 'hover:shadow-blue-500/30 dark:hover:shadow-blue-700/40'
    default:
      return 'hover:shadow-gray-500/30 dark:hover:shadow-gray-700/40'
  }
}
</script>

<style scoped>
/* Subtle Pulse Animation for Active Status */
@keyframes pulse-subtle {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.85;
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* TransitionGroup Animations for Report Cards */
.report-card-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.report-card-leave-active {
  transition: all 0.3s ease-out;
}

.report-card-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.report-card-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}

.report-card-move {
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
