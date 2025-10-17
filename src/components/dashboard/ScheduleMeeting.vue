<template>
  <div :class="[
    'relative overflow-hidden rounded-2xl p-8 py-6',
    'bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150',
    'border border-gray-200/40 dark:border-gray-700/40',
    'shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40',
    'transition-all duration-300'
  ]">
    <!-- Section Header -->
    <div class="flex flex-col items-center text-center mb-12 py-4 space-y-4">
      <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
        Schedule a Meeting
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-4xl px-4 leading-relaxed py-2">
        Book a time to discuss your project, explore collaboration opportunities, or learn more
        about how I can help transform your data operations.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 py-4">
      <!-- Calendly Embed -->
      <div class="lg:col-span-2 py-2">
        <div
          class="bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150 rounded-2xl border border-gray-200/40 dark:border-gray-700/40 overflow-hidden shadow-xl py-3">
          <!-- Calendly Header -->
          <div
            class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-3 py-1">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="py-1">
                <h3 class="font-semibold text-gray-900 dark:text-white">Book Your Meeting</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Choose a time that works for you
                </p>
              </div>
            </div>
          </div>

          <!-- Calendly Iframe Container -->
          <div class="relative py-2">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-800 py-4">
              <div class="text-center py-2">
                <div
                  class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4">
                </div>
                <p class="text-gray-600 dark:text-gray-400">Loading calendar...</p>
              </div>
            </div>

            <!-- Calendly Iframe -->
            <iframe v-show="!isLoading && !hasError" ref="calendlyFrame" :src="calendlyUrl" width="100%" height="600"
              frameborder="0" title="Schedule a meeting with Eduardo Castellanos" class="w-full h-96 lg:h-[600px]"
              @load="handleIframeLoad" @error="handleIframeError"></iframe>

            <!-- Error Fallback -->
            <div v-if="hasError" class="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-800 py-4">
              <div class="text-center max-w-md mx-auto p-6 py-3">
                <div
                  class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 py-1">
                  <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 py-2">
                  Calendar Unavailable
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6 py-1">
                  The scheduling calendar couldn't load. Please use the contact options below to
                  reach out directly.
                </p>
                <button @click="retryLoad"
                  class="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Meeting Information & Contact Options -->
      <div class="flex flex-col gap-2 sm:gap-3 lg:gap-4">
        <!-- Meeting Types -->
        <div
          class="bg-gradient-to-br from-blue-50/40 to-indigo-50/40 dark:from-blue-900/40 dark:to-indigo-900/40 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 border border-blue-200/40 dark:border-blue-800/40 shadow-xl shadow-blue-500/10 dark:shadow-blue-700/20 py-3">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 py-2">Meeting Types</h3>
          <div class="space-y-4 py-2">
            <div class="flex items-start space-x-3 py-2">
              <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div class="py-1">
                <h4 class="font-semibold text-gray-900 dark:text-white px-2">Project Consultation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 px-2">
                  Discuss your data engineering needs and project requirements
                </p>
              </div>
            </div>
            <div class="flex items-start space-x-3 py-2">
              <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div class="py-1">
                <h4 class="font-semibold text-gray-900 dark:text-white px-2">Technical Review</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 px-2">
                  Review your current data infrastructure and optimization opportunities
                </p>
              </div>
            </div>
            <div class="flex items-start space-x-3 py-2">
              <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div class="py-1">
                <h4 class="font-semibold text-gray-900 dark:text-white px-2">Career Discussion</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 px-2">
                  Explore collaboration opportunities and career possibilities
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Meeting Duration & Timezone -->
        <div class="bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 border border-gray-200/40 dark:border-gray-700/40 shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40 py-3">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 py-2">Meeting Details</h3>
          <div class="space-y-4 py-2">
            <div class="flex items-center space-x-3 py-2">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="py-1">
                <p class="font-medium text-gray-900 dark:text-white px-2">Duration</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 px-2">30-60 minutes</p>
              </div>
            </div>
            <div class="flex items-center space-x-3 py-2">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="py-1">
                <p class="font-medium text-gray-900 dark:text-white px-2">Timezone</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 px-2">
                  Available in multiple timezones
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-3 py-2">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <div class="py-1">
                <p class="font-medium text-gray-900 dark:text-white px-2">Format</p>
                <p class="text-sm text-gray-600 dark:text-gray-400 px-2">
                  Video call (Google Meet/Zoom)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Calendly configuration - replace with your actual Calendly URL
const calendlyUrl = 'https://calendly.com/eduardo-castellanos/30min'

const isLoading = ref(true)
const hasError = ref(false)
const calendlyFrame = ref<HTMLIFrameElement | null>(null)

const handleIframeLoad = () => {
  isLoading.value = false
  hasError.value = false
}

const handleIframeError = () => {
  isLoading.value = false
  hasError.value = true
}

const retryLoad = () => {
  hasError.value = false
  isLoading.value = true

  // Force iframe reload by updating src
  if (calendlyFrame.value) {
    const currentSrc = calendlyFrame.value.src
    calendlyFrame.value.src = ''
    setTimeout(() => {
      if (calendlyFrame.value) {
        calendlyFrame.value.src = currentSrc
      }
    }, 100)
  }
}

// Set a timeout to show error if iframe doesn't load within 10 seconds
onMounted(() => {
  setTimeout(() => {
    if (isLoading.value) {
      isLoading.value = false
      hasError.value = true
    }
  }, 10000)
})
</script>
