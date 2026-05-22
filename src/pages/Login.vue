<template>
  <div class="w-full max-w-md relative z-10">

    <!-- Glass card -->
    <div class="glass-card-elevated overflow-visible" style="border-color: rgba(0,198,255,0.14)">

      <!-- Top glow line -->
      <div class="h-px w-full" style="background: linear-gradient(90deg, transparent, rgba(0,198,255,0.5), rgba(155,90,255,0.5), transparent)" />

      <div class="p-8">
        <!-- Logo + heading -->
        <div class="text-center mb-8">
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
               style="background: linear-gradient(135deg, #00c6ff 0%, #7c3aed 100%); box-shadow: 0 0 28px rgba(0,198,255,0.35)">
            <span class="text-white font-display font-bold text-2xl leading-none">G</span>
          </div>
          <h1 class="text-2xl font-display font-bold mb-1" style="color: var(--text-1)">
            {{ activeTab === 'login' ? 'Welcome back' : 'Create account' }}
          </h1>
          <p class="text-sm" style="color: var(--text-2)">
            {{ activeTab === 'login' ? 'Sign in to access your dashboard' : 'Join GeekDigital today' }}
          </p>
        </div>

        <!-- Error message -->
        <Transition name="glass-slide-up">
          <div v-if="authStore.error"
               class="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-5 text-sm"
               style="background: rgba(239,68,68,0.10); border: 1px solid rgba(239,68,68,0.22); color: #f87171">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ authStore.error }}
          </div>
        </Transition>

        <!-- Tabs -->
        <div class="flex gap-1 mb-7 p-1 rounded-xl" style="background: var(--glass-bg-3); border: 1px solid var(--glass-border)">
          <button
            @click="activeTab = 'login'"
            :class="['flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200', activeTab === 'login' ? 'tab-active' : 'tab-idle']"
          >
            Sign In
          </button>
          <button
            @click="activeTab = 'register'"
            :class="['flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200', activeTab === 'register' ? 'tab-active' : 'tab-idle']"
          >
            Sign Up
          </button>
        </div>

        <!-- Login Form -->
        <Transition name="glass-fade" mode="out-in">
          <form v-if="activeTab === 'login'" key="login" @submit.prevent="handleLogin" class="space-y-4">

            <div class="glass-input-group">
              <label class="glass-label">Email address</label>
              <input
                v-model="loginForm.email"
                type="email"
                required
                class="glass-input"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </div>

            <div class="glass-input-group">
              <div class="flex items-center justify-between mb-1.5">
                <label class="glass-label">Password</label>
                <a href="#" class="text-xs transition-colors duration-150" style="color: #26cfff"
                   onmouseover="this.style.color='#4dd2ff'" onmouseout="this.style.color='#26cfff'">
                  Forgot password?
                </a>
              </div>
              <input
                v-model="loginForm.password"
                type="password"
                required
                class="glass-input"
                placeholder="••••••••"
                autocomplete="current-password"
              />
            </div>

            <div class="flex items-center gap-2 pt-1">
              <input type="checkbox" id="remember"
                     class="w-4 h-4 rounded accent-primary-500"
                     style="cursor: pointer">
              <label for="remember" class="text-xs cursor-pointer" style="color: var(--text-2)">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              :disabled="authStore.loading"
              class="glass-btn-primary w-full justify-center py-3 text-sm mt-2"
            >
              <svg v-if="authStore.loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ authStore.loading ? 'Signing in…' : 'Sign In' }}
            </button>

          </form>

          <!-- Register Form -->
          <form v-else key="register" @submit.prevent="handleRegister" class="space-y-4">

            <div class="glass-input-group">
              <label class="glass-label">Full name</label>
              <input
                v-model="registerForm.displayName"
                type="text"
                required
                class="glass-input"
                placeholder="John Doe"
                autocomplete="name"
              />
            </div>

            <div class="glass-input-group">
              <label class="glass-label">Email address</label>
              <input
                v-model="registerForm.email"
                type="email"
                required
                class="glass-input"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </div>

            <div class="glass-input-group">
              <label class="glass-label">Password</label>
              <input
                v-model="registerForm.password"
                type="password"
                required
                minlength="6"
                class="glass-input"
                placeholder="Min. 6 characters"
                autocomplete="new-password"
              />
            </div>

            <div class="glass-input-group">
              <label class="glass-label">Confirm password</label>
              <input
                v-model="registerForm.confirmPassword"
                type="password"
                required
                class="glass-input"
                placeholder="••••••••"
                autocomplete="new-password"
              />
            </div>

            <button
              type="submit"
              :disabled="authStore.loading"
              class="glass-btn-primary w-full justify-center py-3 text-sm mt-2"
            >
              <svg v-if="authStore.loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ authStore.loading ? 'Creating account…' : 'Create Account' }}
            </button>

          </form>
        </Transition>

        <!-- Demo notice -->
        <div class="mt-6 flex items-start gap-2.5 px-4 py-3 rounded-xl text-xs"
             style="background: rgba(0,198,255,0.06); border: 1px solid rgba(0,198,255,0.14)">
          <svg class="w-4 h-4 flex-shrink-0 mt-0.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span style="color: var(--text-2)">
            <span class="font-semibold" style="color: #4dd2ff">Demo mode:</span>
            Use any email and password to explore the platform.
          </span>
        </div>
      </div>
    </div>

    <!-- Back link -->
    <div class="text-center mt-6">
      <router-link to="/" class="text-xs transition-colors duration-150" style="color: var(--text-3)"
                   onmouseover="this.style.color='var(--text-2)'" onmouseout="this.style.color='var(--text-3)'">
        ← Back to home
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'

const router    = useRouter()
const route     = useRoute()
const authStore = useAuthStore()

const activeTab = ref('login')

const loginForm = reactive({ email: '', password: '' })

const registerForm = reactive({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
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
    registerForm.displayName,
  )
  if (result.success) {
    router.push('/dashboard')
  }
}
</script>

<style scoped>
.tab-active {
  background: linear-gradient(135deg, rgba(0,198,255,0.18), rgba(155,90,255,0.12));
  border: 1px solid rgba(0,198,255,0.28);
  color: #26cfff;
}

.tab-idle {
  color: var(--text-2);
}

.tab-idle:hover {
  color: var(--text-1);
  background: var(--glass-bg-3);
}
</style>
