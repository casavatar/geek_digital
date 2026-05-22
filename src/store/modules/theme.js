import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref(false)

  // Getters
  const currentTheme = computed(() => isDark.value ? 'dark' : 'light')

  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('geek_digital_theme')

    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = true // Default to dark mode
    }

    // Apply theme to DOM
    applyTheme()
  }

  // Apply theme to document element
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
    localStorage.setItem('geek_digital_theme', isDark.value ? 'dark' : 'light')
  }

  // Set specific theme
  const setTheme = (theme) => {
    isDark.value = theme === 'dark'
    applyTheme()
    localStorage.setItem('geek_digital_theme', theme)
  }

  // Watch for changes and persist
  watch(isDark, (newValue) => {
    localStorage.setItem('geek_digital_theme', newValue ? 'dark' : 'light')
  })

  return {
    // State
    isDark,
    // Getters
    currentTheme,
    // Actions
    initializeTheme,
    toggleTheme,
    setTheme
  }
})
