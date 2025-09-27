<template>
  <div class="dashboard-card p-8">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Let's Work Together
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Ready to transform your data into actionable insights? I'd love to hear about your project and discuss how we can work together to achieve your goals.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Contact Form -->
      <div class="space-y-8">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Send me a message
          </h3>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Full Name Field -->
            <div>
              <label 
                for="fullName" 
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Full Name *
              </label>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                placeholder="Enter your full name"
                :class="{ 'border-red-500 dark:border-red-400': errors.fullName }"
              />
              <p v-if="errors.fullName" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ errors.fullName }}
              </p>
            </div>

            <!-- Email Field -->
            <div>
              <label 
                for="email" 
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
                placeholder="Enter your email address"
                :class="{ 'border-red-500 dark:border-red-400': errors.email }"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ errors.email }}
              </p>
            </div>

            <!-- Message Field -->
            <div>
              <label 
                for="message" 
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-vertical"
                placeholder="Tell me about your project, goals, or how I can help you..."
                :class="{ 'border-red-500 dark:border-red-400': errors.message }"
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-600 dark:text-red-400">
                {{ errors.message }}
              </p>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 disabled:transform-none disabled:cursor-not-allowed"
              >
                <svg 
                  v-if="isSubmitting" 
                  class="w-5 h-5 animate-spin" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg 
                  v-else 
                  class="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
              </button>
            </div>

            <!-- Success Message -->
            <div v-if="showSuccess" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-green-800 dark:text-green-200 font-medium">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Contact Information & Direct Links -->
      <div class="space-y-8">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Get in touch directly
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-8">
            Prefer to reach out directly? You can contact me through any of these channels:
          </p>

          <!-- Direct Contact Links -->
          <div class="space-y-4">
            <!-- Email -->
            <a
              href="mailto:eduardo.castellanos@example.com"
              class="group flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 hover:shadow-md"
            >
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Email
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  eduardo.castellanos@example.com
                </p>
              </div>
            </a>

            <!-- LinkedIn -->
            <a
              href="https://linkedin.com/in/eduardo-castellanos"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 hover:shadow-md"
            >
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  LinkedIn
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Connect with me professionally
                </p>
              </div>
            </a>

            <!-- GitHub -->
            <a
              href="https://github.com/eduardo-castellanos"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 hover:shadow-md"
            >
              <div class="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg class="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                  GitHub
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  View my code and projects
                </p>
              </div>
            </a>
          </div>
        </div>

        <!-- Response Time Info -->
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div class="flex items-start space-x-3">
            <div class="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 class="font-semibold text-green-900 dark:text-green-200 mb-1">
                Quick Response
              </h4>
              <p class="text-sm text-green-700 dark:text-green-300">
                I typically respond to messages within 24 hours. For urgent projects, feel free to reach out directly via email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface ContactForm {
  fullName: string
  email: string
  message: string
}

interface FormErrors {
  fullName?: string
  email?: string
  message?: string
}

const form = reactive<ContactForm>({
  fullName: '',
  email: '',
  message: ''
})

const errors = reactive<FormErrors>({})
const isSubmitting = ref(false)
const showSuccess = ref(false)

const validateForm = (): boolean => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key as keyof FormErrors])
  
  let isValid = true

  // Validate full name
  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required'
    isValid = false
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters'
    isValid = false
  }

  // Validate email
  if (!form.email.trim()) {
    errors.email = 'Email address is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Validate message
  if (!form.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call - replace with actual form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    form.fullName = ''
    form.email = ''
    form.message = ''
    
    // Show success message
    showSuccess.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Error submitting form:', error)
    // Handle error (show error message, etc.)
  } finally {
    isSubmitting.value = false
  }
}
</script>
