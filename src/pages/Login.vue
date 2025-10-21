<template>
  <div class="w-full max-w-md">
    <div class="card">
      <div class="text-center mb-8">
        <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-bold text-2xl">G</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p class="text-gray-600 mt-2">Login to access your dashboard</p>
      </div>

      <!-- Error message -->
      <div v-if="authStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
        {{ authStore.error }}
      </div>

      <!-- Tabs -->
      <div class="flex gap-4 mb-6">
        <button
          @click="activeTab = 'login'"
          :class="[
            'flex-1 py-2 font-medium border-b-2 transition-colors',
            activeTab === 'login'
              ? 'border-primary-600 text-primary-600'
              : 'border-gray-200 text-gray-600'
          ]"
        >
          Login
        </button>
        <button
          @click="activeTab = 'register'"
          :class="[
            'flex-1 py-2 font-medium border-b-2 transition-colors',
            activeTab === 'register'
              ? 'border-primary-600 text-primary-600'
              : 'border-gray-200 text-gray-600'
          ]"
        >
          Sign Up
        </button>
      </div>

      <!-- Login Form -->
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="loginForm.email"
            type="email"
            required
            class="input"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="loginForm.password"
            type="password"
            required
            class="input"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
            <span class="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" class="text-sm text-primary-600 hover:text-primary-700">Forgot password?</a>
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="btn btn-primary w-full"
        >
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <!-- Register Form -->
      <form v-else @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            v-model="registerForm.displayName"
            type="text"
            required
            class="input"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="registerForm.email"
            type="email"
            required
            class="input"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="registerForm.password"
            type="password"
            required
            minlength="6"
            class="input"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            v-model="registerForm.confirmPassword"
            type="password"
            required
            class="input"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="btn btn-primary w-full"
        >
          {{ authStore.loading ? 'Creating account...' : 'Create Account' }}
        </button>
      </form>

      <!-- Demo mode notice -->
      <div class="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p class="text-sm text-blue-700">
          <strong>Demo Mode:</strong> You can use any email/password to test the application.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const activeTab = ref('login')

const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const handleLogin = async () => {
  authStore.clearError()
  const result = await authStore.login(loginForm.email, loginForm.password)

  if (result.success) {
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  }
}

const handleRegister = async () => {
  authStore.clearError()

  if (registerForm.password !== registerForm.confirmPassword) {
    authStore.error = 'Passwords do not match'
    return
  }

  const result = await authStore.register(
    registerForm.email,
    registerForm.password,
    registerForm.displayName
  )

  if (result.success) {
    router.push('/dashboard')
  }
}
</script>
