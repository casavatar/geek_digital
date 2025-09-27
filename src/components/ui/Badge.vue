<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-200"
    :class="badgeClasses"
  >
    <Icon
      v-if="icon"
      :name="icon"
      size="xs"
      :class="iconClasses"
    />
    <span v-if="icon" class="ml-1">{{ label }}</span>
    <span v-else>{{ label }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

interface Props {
  label: string
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'xs' | 'sm' | 'md'
  icon?: string
  removable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
  removable: false
})

const emit = defineEmits<{
  remove: []
}>()

const badgeClasses = computed(() => {
  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  }

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
  }

  return `${sizeClasses[props.size]} ${variantClasses[props.variant]}`
})

const iconClasses = computed(() => {
  return 'text-current'
})

const handleRemove = () => {
  emit('remove')
}
</script>
