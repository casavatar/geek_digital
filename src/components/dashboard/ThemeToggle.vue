<template>
  <button
    @click="toggleDarkMode"
    class="relative flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
    :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <!-- Moon Icon (Dark Mode) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="scale-0 rotate-90 opacity-0"
      enter-to-class="scale-100 rotate-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="scale-100 rotate-0 opacity-100"
      leave-to-class="scale-0 -rotate-90 opacity-0"
    >
      <svg v-if="isDarkMode" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </Transition>

    <!-- Sun Icon (Light Mode) -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="scale-0 rotate-90 opacity-0"
      enter-to-class="scale-100 rotate-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="scale-100 rotate-0 opacity-100"
      leave-to-class="scale-0 -rotate-90 opacity-0"
    >
      <svg v-if="!isDarkMode" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </Transition>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDarkMode, toggleDarkMode } = useTheme()
</script>

<style scoped>
/* Ensure smooth icon transitions */
button {
  position: relative;
  overflow: visible;
}

svg {
  pointer-events: none;
}
</style>
