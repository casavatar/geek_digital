<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useThemeStore } from '@/store/modules/theme'

const authStore = useAuthStore()
const themeStore = useThemeStore()

onMounted(() => {
  // Initialize theme on app mount
  themeStore.initializeTheme()
  // Initialize auth state on app mount
  authStore.initializeAuth()
})
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
