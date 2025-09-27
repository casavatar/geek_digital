<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
    :class="badgeClasses"
  >
    <span 
      class="w-2 h-2 rounded-full mr-2 transition-colors duration-200"
      :class="dotClasses"
    ></span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  status: 'online' | 'offline' | 'busy' | 'pending' | 'error' | 'success'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  animated: false
})

const label = computed(() => {
  const labels = {
    online: 'Online',
    offline: 'Offline',
    busy: 'Busy',
    pending: 'Pending',
    error: 'Error',
    success: 'Success'
  }
  return labels[props.status]
})

const badgeClasses = computed(() => {
  const baseClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }

  const statusClasses = {
    online: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    offline: 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
    busy: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    pending: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    error: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
    success: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
  }

  return `${baseClasses[props.size]} ${statusClasses[props.status]}`
})

const dotClasses = computed(() => {
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-yellow-500',
    pending: 'bg-blue-500',
    error: 'bg-red-500',
    success: 'bg-green-500'
  }

  const animationClass = props.animated && props.status === 'online' ? 'animate-pulse' : ''
  
  return `${statusClasses[props.status]} ${animationClass}`
})
</script>
