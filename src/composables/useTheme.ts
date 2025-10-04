import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

// Singleton state to ensure theme is consistent across all component instances
const isDarkMode = ref(false)
const isInitialized = ref(false)
let mediaQuery: MediaQueryList | null = null
let mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null

/**
 * Composable for managing dark/light theme with best practices:
 * - Persists user preference in localStorage
 * - Respects system preference if no user preference exists
 * - Listens for system theme changes
 * - Singleton pattern to prevent multiple initializations
 * - Proper cleanup of event listeners
 */
export function useTheme() {
  const applyTheme = (darkMode: boolean) => {
    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const persistTheme = (darkMode: boolean) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    }
  }

  const initializeTheme = () => {
    // Prevent multiple initializations
    if (isInitialized.value) return

    let initialTheme = false

    // Priority 1: Check for saved user preference in localStorage
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        initialTheme = savedTheme === 'dark'
        isDarkMode.value = initialTheme
        applyTheme(initialTheme)
        isInitialized.value = true

        // Still listen for system changes but don't override user preference
        if (typeof window !== 'undefined' && window.matchMedia) {
          mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          mediaQueryHandler = (e: MediaQueryListEvent) => {
            // Only update if user clears their preference
            if (!localStorage.getItem('theme')) {
              isDarkMode.value = e.matches
            }
          }
          mediaQuery.addEventListener('change', mediaQueryHandler)
        }
        return
      }
    }

    // Priority 2: Check system preference if no user preference exists
    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      initialTheme = mediaQuery.matches
      isDarkMode.value = initialTheme
      applyTheme(initialTheme)

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
    applyTheme(isDarkMode.value)
    persistTheme(isDarkMode.value)
  }

  const setTheme = (darkMode: boolean) => {
    isDarkMode.value = darkMode
    applyTheme(darkMode)
    persistTheme(darkMode)
  }

  // Watch for dark mode changes (for external updates)
  watch(isDarkMode, (newValue) => {
    if (isInitialized.value) {
      applyTheme(newValue)
      persistTheme(newValue)
    }
  })

  onMounted(() => {
    // Initialize theme on mount
    initializeTheme()
  })

  onBeforeUnmount(() => {
    // Clean up media query listener when last component unmounts
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
    setTheme,
    initializeTheme,
  }
}

/**
 * Initialize theme immediately on app load (call this in main.ts)
 * This ensures the correct theme is applied before any components render
 */
export function initThemeOnLoad() {
  let initialTheme = false

  // Check localStorage first
  if (typeof localStorage !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      initialTheme = savedTheme === 'dark'
    } else if (typeof window !== 'undefined' && window.matchMedia) {
      // Fall back to system preference
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  // Apply theme immediately to prevent flash
  if (typeof document !== 'undefined') {
    if (initialTheme) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return initialTheme
}
