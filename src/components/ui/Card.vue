<template>
  <div
    :class="cardClasses"
  >
    <!-- Card Header -->
    <div
      v-if="$slots.header || title"
      class="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
    >
      <slot name="header">
        <div class="flex items-center justify-between">
          <div>
            <h3 v-if="title" class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </h3>
            <p v-if="subtitle" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ subtitle }}
            </p>
          </div>
          <div v-if="$slots.actions" class="flex items-center space-x-2">
            <slot name="actions" />
          </div>
        </div>
      </slot>
    </div>

    <!-- Card Body -->
    <div :class="bodyClasses">
      <slot />
    </div>

    <!-- Card Footer -->
    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-gray-200 dark:border-gray-700"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  variant?: 'default' | 'elevated' | 'outlined' | 'flat'
  size?: 'sm' | 'md' | 'lg'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  hover: false,
  padding: 'md'
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-xl border transition-all duration-300'
  
  const variantClasses = {
    default: 'border-gray-200 dark:border-gray-700 shadow-sm',
    elevated: 'border-gray-200 dark:border-gray-700 shadow-lg',
    outlined: 'border-gray-300 dark:border-gray-600 shadow-none',
    flat: 'border-transparent shadow-none'
  }

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const hoverClasses = props.hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''

  return `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]} ${hoverClasses}`
})

const bodyClasses = computed(() => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  return paddingClasses[props.padding]
})
</script>
