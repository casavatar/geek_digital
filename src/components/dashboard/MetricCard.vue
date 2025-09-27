<template>
  <Card
    variant="elevated"
    hover
    padding="lg"
    class="hover:shadow-lg transition-all duration-300"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-3">
        <div 
          class="w-10 h-10 rounded-lg flex items-center justify-center"
          :class="iconBgClass"
        >
          <span class="text-lg">{{ icon }}</span>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-500">
            {{ subtitle }}
          </p>
        </div>
      </div>
      <div v-if="trend" class="flex items-center space-x-1">
        <Icon
          :name="trend > 0 ? 'arrow-up' : 'arrow-down'"
          size="sm"
          :class="trend > 0 ? 'text-green-500' : 'text-red-500'"
        />
        <span 
          class="text-sm font-medium"
          :class="trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
        >
          {{ Math.abs(trend) }}%
        </span>
      </div>
    </div>

    <!-- Value -->
    <div class="mb-2">
      <span class="text-3xl font-bold text-gray-900 dark:text-white">
        {{ formattedValue }}
      </span>
      <span v-if="unit" class="text-lg text-gray-600 dark:text-gray-400 ml-1">
        {{ unit }}
      </span>
    </div>

    <!-- Description -->
    <p v-if="description" class="text-sm text-gray-600 dark:text-gray-400">
      {{ description }}
    </p>

    <!-- Progress Bar (optional) -->
    <ProgressBar
      v-if="progress !== undefined"
      :percentage="progress"
      label="Progress"
      :variant="getProgressVariant(color)"
      class="mt-4"
    />
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card, Icon, ProgressBar } from '@/components/ui'

interface Props {
  title: string
  subtitle?: string
  value: number | string
  unit?: string
  icon: string
  iconBgClass?: string
  description?: string
  trend?: number
  progress?: number
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo'
}

const props = withDefaults(defineProps<Props>(), {
  iconBgClass: 'bg-blue-100 dark:bg-blue-900/30',
  color: 'blue'
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    if (props.value >= 1000000) {
      return (props.value / 1000000).toFixed(1) + 'M'
    } else if (props.value >= 1000) {
      return (props.value / 1000).toFixed(1) + 'K'
    }
    return props.value.toLocaleString()
  }
  return props.value
})

const getProgressVariant = (color: string) => {
  const colorMap: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
    blue: 'default',
    green: 'success',
    yellow: 'warning',
    red: 'danger',
    purple: 'info',
    indigo: 'info'
  }
  return colorMap[color] || 'default'
}
</script>
