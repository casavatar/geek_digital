<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :href="tag === 'a' ? href : undefined"
    :target="tag === 'a' ? target : undefined"
    :rel="tag === 'a' ? rel : undefined"
    :disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <Icon
      v-if="icon && !iconRight"
      :name="icon"
      :size="iconSize"
      :class="iconClasses"
    />
    <span v-if="$slots.default" :class="textClasses">
      <slot />
    </span>
    <Icon
      v-if="icon && iconRight"
      :name="icon"
      :size="iconSize"
      :class="iconClasses"
    />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconRight?: boolean
  href?: string
  target?: string
  rel?: string
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  iconRight: false,
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const tag = computed(() => props.href ? 'a' : 'button')

const iconSize = computed(() => {
  const sizeMap = {
    xs: 'xs' as const,
    sm: 'sm' as const,
    md: 'sm' as const,
    lg: 'md' as const,
    xl: 'md' as const
  }
  return sizeMap[props.size]
})

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-sm hover:shadow-md',
    outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-blue-500',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-blue-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-sm hover:shadow-md',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-sm hover:shadow-md'
  }

  const widthClass = props.fullWidth ? 'w-full' : ''
  const loadingClass = props.loading ? 'cursor-wait' : ''

  return `${baseClasses} ${sizeClasses[props.size]} ${variantClasses[props.variant]} ${widthClass} ${loadingClass}`
})

const iconClasses = computed(() => {
  const spacingClasses = {
    xs: props.iconRight ? 'ml-1' : 'mr-1',
    sm: props.iconRight ? 'ml-1.5' : 'mr-1.5',
    md: props.iconRight ? 'ml-2' : 'mr-2',
    lg: props.iconRight ? 'ml-2' : 'mr-2',
    xl: props.iconRight ? 'ml-3' : 'mr-3'
  }
  
  return spacingClasses[props.size]
})

const textClasses = computed(() => {
  return props.icon ? '' : ''
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>
