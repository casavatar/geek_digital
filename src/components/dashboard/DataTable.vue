<template>
  <Card variant="default" class="overflow-hidden">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {{ subtitle }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <!-- Search -->
          <Input
            v-model="searchQuery"
            type="search"
            placeholder="Search..."
            left-icon="search"
            size="sm"
            class="w-64"
          />
          
          <!-- Filter -->
          <Button
            variant="ghost"
            size="sm"
            icon="filter"
          />
        </div>
      </div>
    </div>

    <!-- Table Content -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(row, index) in filteredData"
            :key="index"
            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap"
            >
              <div v-if="column.type === 'status'" class="flex items-center">
                <div
                  class="w-2 h-2 rounded-full mr-2"
                  :class="getStatusColor(row[column.key])"
                ></div>
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ row[column.key] }}
                </span>
              </div>
              <div v-else-if="column.type === 'badge'" class="flex items-center">
                <Badge
                  :label="row[column.key]"
                  :variant="getBadgeVariant(row[column.key])"
                />
              </div>
              <div v-else-if="column.type === 'date'" class="text-sm text-gray-900 dark:text-white">
                {{ formatDate(row[column.key]) }}
              </div>
              <div v-else class="text-sm text-gray-900 dark:text-white">
                {{ row[column.key] }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon="eye"
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon="edit"
                >
                  Edit
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Footer -->
    <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700 dark:text-gray-300">
          Showing {{ filteredData.length }} of {{ data.length }} results
        </div>
        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <Button
            variant="primary"
            size="sm"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, Input, Button, Badge } from '@/components/ui'

interface Column {
  key: string
  label: string
  type?: 'text' | 'status' | 'badge' | 'date'
}

interface Props {
  title: string
  subtitle?: string
  columns: Column[]
  data: Record<string, any>[]
}

const props = defineProps<Props>()
const searchQuery = ref('')

const filteredData = computed(() => {
  if (!searchQuery.value) return props.data
  
  return props.data.filter(row => {
    return Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    'Running': 'bg-green-500',
    'Completed': 'bg-blue-500',
    'Failed': 'bg-red-500',
    'Pending': 'bg-yellow-500',
    'Paused': 'bg-gray-500'
  }
  return statusMap[status] || 'bg-gray-500'
}

const getBadgeVariant = (value: string) => {
  const badgeMap: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'> = {
    'High': 'danger',
    'Medium': 'warning',
    'Low': 'success',
    'Production': 'primary',
    'Development': 'info'
  }
  return badgeMap[value] || 'default'
}

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
