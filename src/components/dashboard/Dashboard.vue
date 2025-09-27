<template>
  <div class="p-6 space-y-6">
    <!-- User Profile Section -->
    <UserProfile :personal-info="personalInfo" />

    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Data Engineering Dashboard
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">
            Monitor your data pipelines, experiments, and analytics workflows
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            New Pipeline
          </button>
          <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        </div>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Active Pipelines"
        subtitle="Currently running"
        :value="12"
        icon="🔄"
        icon-bg-class="bg-blue-100 dark:bg-blue-900/30"
        description="Data processing workflows"
        :trend="15"
        color="blue"
      />
      
      <MetricCard
        title="Success Rate"
        subtitle="Last 30 days"
        :value="94.2"
        unit="%"
        icon="✅"
        icon-bg-class="bg-green-100 dark:bg-green-900/30"
        description="Pipeline completion rate"
        :trend="2.1"
        :progress="94"
        color="green"
      />
      
      <MetricCard
        title="Data Volume"
        subtitle="Processed today"
        :value="2.4"
        unit="TB"
        icon="📊"
        icon-bg-class="bg-purple-100 dark:bg-purple-900/30"
        description="Total data processed"
        :trend="-5.2"
        color="purple"
      />
      
      <MetricCard
        title="Failed Runs"
        subtitle="Requires attention"
        :value="3"
        icon="⚠️"
        icon-bg-class="bg-red-100 dark:bg-red-900/30"
        description="Pipelines needing fixes"
        :trend="-25"
        color="red"
      />
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Pipeline Performance Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Pipeline Performance
          </h3>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
              7 Days
            </button>
            <button class="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
              30 Days
            </button>
          </div>
        </div>
        <div class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div class="text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-gray-500 dark:text-gray-400">Chart placeholder</p>
            <p class="text-sm text-gray-400 dark:text-gray-500">Integration with Chart.js or similar</p>
          </div>
        </div>
      </div>

      <!-- Data Quality Metrics -->
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Data Quality Score
          </h3>
          <span class="text-sm text-gray-600 dark:text-gray-400">Last updated: 2 hours ago</span>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Completeness</span>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 95%"></div>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">95%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Accuracy</span>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" style="width: 88%"></div>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">88%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Consistency</span>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-yellow-500 h-2 rounded-full" style="width: 76%"></div>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">76%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600 dark:text-gray-400">Timeliness</span>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="bg-red-500 h-2 rounded-full" style="width: 62%"></div>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">62%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <DataTable
      title="Recent Pipeline Runs"
      subtitle="Monitor your latest data processing jobs"
      :columns="tableColumns"
      :data="tableData"
    />

    <!-- Services Section -->
    <ServicesSection :personal-info="personalInfo" />

    <!-- Contact Section -->
    <ContactSection />

    <!-- Schedule Meeting Section -->
    <ScheduleMeeting />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import MetricCard from './MetricCard.vue'
import DataTable from './DataTable.vue'
import UserProfile from './UserProfile.vue'
import ServicesSection from './ServicesSection.vue'
import ContactSection from './ContactSection.vue'
import ScheduleMeeting from './ScheduleMeeting.vue'
import type { PersonalInfo } from '@/types'

interface Props {
  personalInfo: PersonalInfo
}

defineProps<Props>()

const tableColumns = [
  { key: 'name', label: 'Pipeline Name', type: 'text' as const },
  { key: 'status', label: 'Status', type: 'status' as const },
  { key: 'priority', label: 'Priority', type: 'badge' as const },
  { key: 'startTime', label: 'Start Time', type: 'date' as const },
  { key: 'duration', label: 'Duration', type: 'text' as const },
  { key: 'records', label: 'Records Processed', type: 'text' as const }
]

const tableData = reactive([
  {
    name: 'Customer Data ETL',
    status: 'Completed',
    priority: 'High',
    startTime: new Date('2024-01-15T10:30:00'),
    duration: '2h 15m',
    records: '1.2M'
  },
  {
    name: 'Sales Analytics Pipeline',
    status: 'Running',
    priority: 'Medium',
    startTime: new Date('2024-01-15T11:45:00'),
    duration: '45m',
    records: '850K'
  },
  {
    name: 'Inventory Sync',
    status: 'Failed',
    priority: 'High',
    startTime: new Date('2024-01-15T09:15:00'),
    duration: '1h 30m',
    records: '0'
  },
  {
    name: 'Marketing Data Processing',
    status: 'Completed',
    priority: 'Low',
    startTime: new Date('2024-01-15T08:00:00'),
    duration: '3h 20m',
    records: '2.8M'
  },
  {
    name: 'Financial Reports',
    status: 'Pending',
    priority: 'High',
    startTime: new Date('2024-01-15T12:00:00'),
    duration: '-',
    records: '-'
  }
])
</script>
