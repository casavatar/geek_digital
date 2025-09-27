<template>
  <div class="relative">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Left Icon -->
      <div
        v-if="leftIcon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <Icon
          :name="leftIcon"
          size="sm"
          class="text-gray-400"
        />
      </div>

      <!-- Input Field -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Right Icon -->
      <div
        v-if="rightIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <Icon
          :name="rightIcon"
          size="sm"
          class="text-gray-400"
        />
      </div>

      <!-- Clear Button -->
      <button
        v-if="clearable && modelValue && !disabled"
        type="button"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
        @click="handleClear"
      >
        <Icon
          name="close"
          size="sm"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        />
      </button>
    </div>

    <!-- Helper Text -->
    <p
      v-if="helperText"
      class="mt-1 text-sm text-gray-500 dark:text-gray-400"
    >
      {{ helperText }}
    </p>

    <!-- Error Message -->
    <p
      v-if="error"
      class="mt-1 text-sm text-red-600 dark:text-red-400"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from './Icon.vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'
  leftIcon?: string
  rightIcon?: string
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'default',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  const baseClasses = 'block w-full rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }

  const variantClasses = {
    default: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500',
    filled: 'border-transparent bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800',
    outlined: 'border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
  }

  const errorClasses = props.error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
  const leftIconClasses = props.leftIcon ? 'pl-10' : ''
  const rightIconClasses = (props.rightIcon || props.clearable) ? 'pr-10' : ''

  return `${baseClasses} ${sizeClasses[props.size]} ${variantClasses[props.variant]} ${errorClasses} ${leftIconClasses} ${rightIconClasses}`
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>
