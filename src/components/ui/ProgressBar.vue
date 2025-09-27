<template>
  <div class="w-full">
    <!-- Progress Label -->
    <div v-if="label || showPercentage" class="flex justify-between items-center mb-2">
      <span v-if="label" class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ label }}
      </span>
      <span v-if="showPercentage" class="text-sm text-gray-500 dark:text-gray-400">
        {{ Math.round(percentage) }}%
      </span>
    </div>

    <!-- Progress Bar Container -->
    <div
      class="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      :class="containerClasses"
    >
      <!-- Progress Fill -->
      <div
        class="h-full transition-all duration-500 ease-out"
        :class="progressClasses"
        :style="{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }"
      >
        <!-- Animated Stripes (optional) -->
        <div
          v-if="animated"
          class="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"
        ></div>
      </div>
    </div>

    <!-- Progress Description -->
    <p v-if="description" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  percentage: number
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  animated?: boolean
  showPercentage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'default',
  animated: false,
  showPercentage: true
})

const containerClasses = computed(() => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }
  
  return sizeClasses[props.size]
})

const progressClasses = computed(() => {
  const variantClasses = {
    default: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500'
  }
  
  return variantClasses[props.variant]
})
</script>
