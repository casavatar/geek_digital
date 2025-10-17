<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
      :aria-expanded="isOpen"
      aria-haspopup="true"
    >
      <Icon name="globe-alt" size="sm" />
      <span class="hidden sm:inline">{{ currentLanguage.name }}</span>
      <Icon
        :name="isOpen ? 'chevron-up' : 'chevron-down'"
        size="xs"
        :class="`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`"
      />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
      role="menu"
    >
      <div class="py-1">
        <button
          v-for="language in languages"
          :key="language.code"
          @click="selectLanguage(language.code)"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-3"
          :class="{ 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400': language.code === currentLocale }"
          role="menuitem"
        >
          <span class="text-lg">{{ language.flag }}</span>
          <span>{{ language.name }}</span>
          <Icon 
            v-if="language.code === currentLocale" 
            name="check" 
            size="sm" 
            class="ml-auto text-blue-600 dark:text-blue-400"
          />
        </button>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      @click="closeDropdown"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '../../plugins/i18n'
import Icon from './Icon.vue'

interface Language {
  code: string
  name: string
  flag: string
}

const { locale } = useI18n()

const isOpen = ref(false)

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]

const currentLocale = computed(() => locale.value)

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === currentLocale.value) || languages[0]
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectLanguage = (languageCode: string) => {
  setLocale(languageCode)
  closeDropdown()
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
