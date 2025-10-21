<template>
  <div class="py-12 bg-gray-50 min-h-screen">
    <div class="container-custom">
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2">Welcome, {{ authStore.userName }}</h1>
        <p class="text-gray-600">Manage your applications and licenses</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Purchased Apps</p>
              <p class="text-3xl font-bold text-primary-600">{{ userStore.purchasedApps.length }}</p>
            </div>
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Active Licenses</p>
              <p class="text-3xl font-bold text-secondary-600">{{ userStore.activeLicenses.length }}</p>
            </div>
            <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Account Status</p>
              <p class="text-3xl font-bold text-green-600">Active</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-4 mb-6 border-b border-gray-200">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-2 font-medium border-b-2 transition-colors',
            activeTab === tab.id
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- My Apps Tab -->
      <div v-if="activeTab === 'apps'" class="space-y-4">
        <div v-if="userStore.purchasedApps.length === 0" class="card text-center py-12">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No apps yet</h3>
          <p class="text-gray-600 mb-4">Browse our catalog to find the perfect app for your needs</p>
          <router-link to="/catalog" class="btn btn-primary">
            Browse Catalog
          </router-link>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="app in userStore.purchasedApps" :key="app.id" class="card">
            <h3 class="text-xl font-semibold mb-2">{{ app.name }}</h3>
            <p class="text-sm text-gray-600 mb-4">Purchased on {{ formatDate(app.purchaseDate) }}</p>
            <button class="btn btn-primary w-full">Launch App</button>
          </div>
        </div>
      </div>

      <!-- Licenses Tab -->
      <div v-if="activeTab === 'licenses'" class="space-y-4">
        <div v-if="userStore.licenses.length === 0" class="card text-center py-12">
          <p class="text-gray-600">No licenses found</p>
        </div>

        <div v-else class="card">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-3 px-4 font-semibold text-gray-700">License Key</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th class="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="license in userStore.licenses" :key="license.id" class="border-b border-gray-100">
                  <td class="py-3 px-4 font-mono text-sm">{{ license.key || 'XXXX-XXXX-XXXX' }}</td>
                  <td class="py-3 px-4">{{ license.product || 'Product Name' }}</td>
                  <td class="py-3 px-4">
                    <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {{ license.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-600">{{ formatDate(license.createdAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Profile Tab -->
      <div v-if="activeTab === 'profile'" class="card max-w-2xl">
        <h2 class="text-2xl font-bold mb-6">Profile Settings</h2>
        <form @submit.prevent="updateProfile" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" :value="authStore.userEmail" disabled class="input bg-gray-50" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input v-model="profileForm.displayName" type="text" class="input" />
          </div>

          <button type="submit" class="btn btn-primary">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/store/modules/auth'
import { useUserStore } from '@/store/modules/user'

const authStore = useAuthStore()
const userStore = useUserStore()

const activeTab = ref('apps')
const tabs = [
  { id: 'apps', label: 'My Apps' },
  { id: 'licenses', label: 'Licenses' },
  { id: 'profile', label: 'Profile' }
]

const profileForm = reactive({
  displayName: ''
})

onMounted(async () => {
  await userStore.loadUserData()
  profileForm.displayName = authStore.userName
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const updateProfile = () => {
  userStore.updateProfile({ displayName: profileForm.displayName })
  alert('Profile updated successfully!')
}
</script>
