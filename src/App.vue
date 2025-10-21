<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize auth state on app mount
  authStore.initializeAuth()
})
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
