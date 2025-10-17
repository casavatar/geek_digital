import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'

/**
 * Safe localStorage access with SSR guard
 * Prevents crashes in server-side rendering environments
 */
const getSavedLocale = (): string => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return 'en' // Default for SSR
  }

  try {
    return localStorage.getItem('locale') || 'en'
  } catch (error) {
    console.warn('Failed to access localStorage for locale:', error)
    return 'en'
  }
}

const savedLocale = getSavedLocale()

export const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    es
  },
  // Enable legacy mode for Vue 3 compatibility
  legacy: false,
  // Global injection
  globalInjection: true
})

/**
 * Helper function to change locale with validation and error handling
 */
export const setLocale = (locale: string) => {
  // Validate locale to prevent injection
  const allowedLocales = ['en', 'es'] as const
  if (!allowedLocales.includes(locale as 'en' | 'es')) {
    console.error(`Invalid locale: ${locale}. Allowed locales are: ${allowedLocales.join(', ')}`)
    return
  }

  i18n.global.locale.value = locale as 'en' | 'es'

  // Safe localStorage write
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('locale', locale)

      // Update HTML lang attribute for accessibility
      if (typeof document !== 'undefined') {
        document.documentElement.lang = locale
      }
    } catch (error) {
      console.warn('Failed to save locale to localStorage:', error)
    }
  }
}

/**
 * Helper function to get current locale
 */
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}
