<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
          Page Not Found
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <div class="space-y-4">
        <router-link
          to="/"
          class="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Go Home</span>
        </router-link>
        
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <p>Or try one of these pages:</p>
          <div class="mt-2 space-x-4">
            <router-link to="/analytics/dashboard" class="text-blue-600 dark:text-blue-400 hover:underline">
              Analytics
            </router-link>
            <router-link to="/data-engineer/pipelines" class="text-blue-600 dark:text-blue-400 hover:underline">
              Data Engineering
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 404 Not Found page component
</script>
