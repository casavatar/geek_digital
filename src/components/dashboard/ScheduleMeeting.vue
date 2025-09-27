<template>
  <div class="dashboard-card p-8">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Schedule a Meeting
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Book a time to discuss your project, explore collaboration opportunities, or learn more about how I can help transform your data operations.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Calendly Embed -->
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
          <!-- Calendly Header -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Book Your Meeting</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Choose a time that works for you</p>
              </div>
            </div>
          </div>

          <!-- Calendly Iframe Container -->
          <div class="relative">
            <!-- Loading State -->
            <div v-if="isLoading" class="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-800">
              <div class="text-center">
                <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p class="text-gray-600 dark:text-gray-400">Loading calendar...</p>
              </div>
            </div>

            <!-- Calendly Iframe -->
            <iframe
              v-show="!isLoading && !hasError"
              ref="calendlyFrame"
              :src="calendlyUrl"
              width="100%"
              height="600"
              frameborder="0"
              title="Schedule a meeting with Eduardo Castellanos"
              class="w-full h-96 lg:h-[600px]"
              @load="handleIframeLoad"
              @error="handleIframeError"
            ></iframe>

            <!-- Error Fallback -->
            <div v-if="hasError" class="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-800">
              <div class="text-center max-w-md mx-auto p-6">
                <div class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Calendar Unavailable
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-6">
                  The scheduling calendar couldn't load. Please use the contact options below to reach out directly.
                </p>
                <button
                  @click="retryLoad"
                  class="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Meeting Information & Contact Options -->
      <div class="space-y-6">
        <!-- Meeting Types -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Meeting Types
          </h3>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Project Consultation</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Discuss your data engineering needs and project requirements</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Technical Review</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Review your current data infrastructure and optimization opportunities</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white">Career Discussion</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">Explore collaboration opportunities and career possibilities</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Meeting Duration & Timezone -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Meeting Details
          </h3>
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Duration</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">30-60 minutes</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Timezone</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Available in multiple timezones</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Format</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Video call (Google Meet/Zoom)</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Alternative Contact -->
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Can't find a time?
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            If none of the available times work for you, feel free to reach out directly.
          </p>
          <div class="space-y-3">
            <a
              href="mailto:eduardo.castellanos@example.com"
              class="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200"
            >
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-gray-700 dark:text-gray-300 font-medium">Send an email</span>
            </a>
            <a
              href="https://linkedin.com/in/eduardo-castellanos"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200"
            >
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span class="text-gray-700 dark:text-gray-300 font-medium">Connect on LinkedIn</span>
            </a>
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
