<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1 class="text-4xl font-bold mb-8">Application Catalog</h1>

      <!-- Filter tabs -->
      <div class="flex gap-4 mb-8 flex-wrap">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-6 py-2 rounded-lg font-medium transition-all',
            selectedCategory === category
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Apps grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="app in filteredApps"
          :key="app.id"
          class="card hover:shadow-lg transition-shadow"
        >
          <div class="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4 flex items-center justify-center">
            <svg class="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ app.name }}</h3>
          <p class="text-gray-600 mb-4">{{ app.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-sm bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
              {{ app.category }}
            </span>
            <span class="text-lg font-bold text-primary-600">${{ app.price }}</span>
          </div>
          <button class="btn btn-primary w-full mt-4">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('All')
const categories = ['All', 'Desktop Apps', 'Web Apps', 'Tools', 'Utilities']

const apps = ref([
  {
    id: 1,
    name: 'Data Pipeline Manager',
    description: 'Comprehensive ETL pipeline management tool',
    category: 'Desktop Apps',
    price: 49.99
  },
  {
    id: 2,
    name: 'Analytics Dashboard',
    description: 'Real-time data visualization and analytics',
    category: 'Web Apps',
    price: 29.99
  },
  {
    id: 3,
    name: 'Code Generator Pro',
    description: 'Automated code generation for data models',
    category: 'Tools',
    price: 39.99
  },
  {
    id: 4,
    name: 'Schema Validator',
    description: 'Validate and transform data schemas',
    category: 'Utilities',
    price: 19.99
  },
  {
    id: 5,
    name: 'API Testing Suite',
    description: 'Complete API testing and monitoring solution',
    category: 'Desktop Apps',
    price: 59.99
  },
  {
    id: 6,
    name: 'Log Analyzer',
    description: 'Advanced log parsing and analysis tool',
    category: 'Web Apps',
    price: 34.99
  }
])

const filteredApps = computed(() => {
  if (selectedCategory.value === 'All') {
    return apps.value
  }
  return apps.value.filter(app => app.category === selectedCategory.value)
})
</script>
