<template>
  <svg
    :class="iconClass"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      v-if="name === 'home'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
    <path
      v-else-if="name === 'chart-bar'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
    <path
      v-else-if="name === 'chart-line'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
    <path
      v-else-if="name === 'document-text'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
    <path
      v-else-if="name === 'cog'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      v-else-if="name === 'lightning-bolt'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
    <path
      v-else-if="name === 'cube'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
    <path
      v-else-if="name === 'chevron-down'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 9l-7 7-7-7"
    />
    <path
      v-else-if="name === 'menu'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
    <path
      v-else-if="name === 'close'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    />
    <path
      v-else-if="name === 'sun'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
    <path
      v-else-if="name === 'moon'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
    <path
      v-else-if="name === 'download'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
    <path
      v-else-if="name === 'email'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
    <path
      v-else-if="name === 'arrow-right'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 5l7 7-7 7"
    />
    <path
      v-else-if="name === 'search'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
    <path
      v-else-if="name === 'filter'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
    />
    <path
      v-else-if="name === 'bell'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828zM4.828 17l2.586-2.586a2 2 0 012.828 0L12.828 17H4.828z"
    />
    <path
      v-else-if="name === 'user'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
    <path
      v-else-if="name === 'users'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
    />
    <path
      v-else-if="name === 'database'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
    />
    <path
      v-else-if="name === 'server'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
    />
    <path
      v-else-if="name === 'cloud'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
    />
    <path
      v-else-if="name === 'link'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
    <path
      v-else-if="name === 'external-link'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
    <path
      v-else-if="name === 'check'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 13l4 4L19 7"
    />
    <path
      v-else-if="name === 'x'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M6 18L18 6M6 6l12 12"
    />
    <path
      v-else-if="name === 'plus'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4v16m8-8H4"
    />
    <path
      v-else-if="name === 'minus'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20 12H4"
    />
    <path
      v-else-if="name === 'edit'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
    <path
      v-else-if="name === 'trash'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
    <path
      v-else-if="name === 'eye'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      v-else-if="name === 'eye-off'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
    />
    <path
      v-else-if="name === 'chevron-left'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 19l-7-7 7-7"
    />
    <path
      v-else-if="name === 'chevron-right'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 5l7 7-7 7"
    />
    <path
      v-else-if="name === 'chevron-up'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 15l7-7 7 7"
    />
    <path
      v-else-if="name === 'arrow-left'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
    <path
      v-else-if="name === 'arrow-up'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 10l7-7m0 0l7 7m-7-7v18"
    />
    <path
      v-else-if="name === 'arrow-down'"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
    />
    <!-- Fallback for unknown icons -->
    <path
      v-else
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  class: ''
})

const iconClass = computed(() => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  }
  
  return `${sizeClasses[props.size]} ${props.class}`.trim()
})
</script>
