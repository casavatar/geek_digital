import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email || '')
  const userName = computed(() => user.value?.displayName || user.value?.email || 'User')

  // Actions
  const initializeAuth = async () => {
    loading.value = true
    try {
      const currentUser = await authService.getCurrentUser()
      user.value = currentUser
    } catch (err) {
      console.error('Auth initialization error:', err)
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const login = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const userData = await authService.login(email, password)
      user.value = userData
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const register = async (email, password, displayName) => {
    loading.value = true
    error.value = null
    try {
      const userData = await authService.register(email, password, displayName)
      user.value = userData
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    error.value = null
    try {
      await authService.logout()
      user.value = null
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (email) => {
    loading.value = true
    error.value = null
    try {
      await authService.resetPassword(email)
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    loading,
    error,
    // Getters
    isAuthenticated,
    userEmail,
    userName,
    // Actions
    initializeAuth,
    login,
    register,
    logout,
    resetPassword,
    clearError
  }
})
