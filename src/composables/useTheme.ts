import { ref, onMounted, onUnmounted, watch } from 'vue'

export function useTheme() {
  const isDarkMode = ref(false)
  const isInitialized = ref(false)
  let mediaQuery: MediaQueryList | null = null
  let mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null

  const initializeTheme = () => {
    if (isInitialized.value) return

    // Check for saved preference in localStorage
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        isDarkMode.value = savedTheme === 'dark'
        isInitialized.value = true
        return
      }
    }

    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      isDarkMode.value = mediaQuery.matches
      
      // Listen for system theme changes
      mediaQueryHandler = (e: MediaQueryListEvent) => {
        // Only update if no user preference is saved
        if (typeof localStorage !== 'undefined' && !localStorage.getItem('theme')) {
          isDarkMode.value = e.matches
        }
      }
      
      mediaQuery.addEventListener('change', mediaQueryHandler)
    }

    isInitialized.value = true
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  const applyTheme = (darkMode: boolean) => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', darkMode)
    }
  }

  const persistTheme = (darkMode: boolean) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    }
  }

  // Watch for dark mode changes and apply to DOM
  watch(isDarkMode, (newValue) => {
    applyTheme(newValue)
    persistTheme(newValue)
  }, { immediate: true })

  onMounted(() => {
    initializeTheme()
  })

  onUnmounted(() => {
    // Clean up media query listener
    if (mediaQuery && mediaQueryHandler) {
      mediaQuery.removeEventListener('change', mediaQueryHandler)
      mediaQuery = null
      mediaQueryHandler = null
    }
  })

  return {
    isDarkMode,
    isInitialized,
    toggleDarkMode,
    initializeTheme
  }
}
