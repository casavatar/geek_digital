import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'

// Get saved locale from localStorage or default to 'en'
const savedLocale = localStorage.getItem('locale') || 'en'

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

// Helper function to change locale
export const setLocale = (locale: string) => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
}

// Helper function to get current locale
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}
