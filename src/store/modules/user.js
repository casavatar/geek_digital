import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'

export const useUserStore = defineStore('user', () => {
  // State
  const purchasedApps = ref([])
  const licenses = ref([])
  const profile = ref(null)
  const loading = ref(false)

  // Getters
  const hasPurchasedApp = computed(() => (appId) => {
    return purchasedApps.value.some(app => app.id === appId)
  })

  const activeLicenses = computed(() =>
    licenses.value.filter(license => license.status === 'active')
  )

  // Actions
  const loadUserData = async () => {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) return

    loading.value = true
    try {
      // In a real app, fetch from backend API
      const savedData = localStorage.getItem(`user_data_${authStore.user.uid}`)
      if (savedData) {
        const data = JSON.parse(savedData)
        purchasedApps.value = data.purchasedApps || []
        licenses.value = data.licenses || []
        profile.value = data.profile || null
      }
    } catch (err) {
      console.error('Error loading user data:', err)
    } finally {
      loading.value = false
    }
  }

  const addPurchasedApp = (app) => {
    const exists = purchasedApps.value.find(a => a.id === app.id)
    if (!exists) {
      purchasedApps.value.push({
        id: app.id,
        name: app.name,
        purchaseDate: new Date().toISOString(),
        ...app
      })
      saveUserData()
    }
  }

  const addLicense = (license) => {
    licenses.value.push({
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'active',
      ...license
    })
    saveUserData()
  }

  const updateProfile = (profileData) => {
    profile.value = { ...profile.value, ...profileData }
    saveUserData()
  }

  const saveUserData = () => {
    const authStore = useAuthStore()
    if (!authStore.user) return

    const data = {
      purchasedApps: purchasedApps.value,
      licenses: licenses.value,
      profile: profile.value
    }
    localStorage.setItem(`user_data_${authStore.user.uid}`, JSON.stringify(data))
  }

  const clearUserData = () => {
    purchasedApps.value = []
    licenses.value = []
    profile.value = null
  }

  return {
    // State
    purchasedApps,
    licenses,
    profile,
    loading,
    // Getters
    hasPurchasedApp,
    activeLicenses,
    // Actions
    loadUserData,
    addPurchasedApp,
    addLicense,
    updateProfile,
    clearUserData
  }
})
