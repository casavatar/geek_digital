<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            Welcome to GeekDigital
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-primary-100">
            Data Engineering Projects, Professional Applications & Digital Products
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/catalog" class="btn bg-white text-primary-600 hover:bg-gray-100">
              Explore Apps
            </router-link>
            <router-link to="/portfolio" class="btn bg-transparent border-2 border-white hover:bg-white/10">
              View Portfolio
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <h2 class="text-3xl font-bold text-center mb-12">What We Offer</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card text-center">
            <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Data Engineering Portfolio</h3>
            <p class="text-gray-600">
              Explore professional data pipeline projects, ETL solutions, and analytics implementations.
            </p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Desktop & Web Apps</h3>
            <p class="text-gray-600">
              Access our catalog of professional desktop applications and web-based tools.
            </p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Digital Product Store</h3>
            <p class="text-gray-600">
              Purchase licenses, download products, and get access to premium applications.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p class="text-xl text-gray-600 mb-8">
          Create an account to access premium features and purchased applications
        </p>
        <router-link
          v-if="!authStore.isAuthenticated"
          to="/auth/login"
          class="btn btn-primary text-lg"
        >
          Sign Up Now
        </router-link>
        <router-link
          v-else
          to="/dashboard"
          class="btn btn-primary text-lg"
        >
          Go to Dashboard
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()
</script>
