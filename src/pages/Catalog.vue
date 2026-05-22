<template>
  <div class="glass-section pt-28">
    <div class="container-custom">

      <!-- Header -->
      <div class="mb-10">
        <p class="text-xs tracking-widest uppercase mb-2" style="color: var(--text-3)">Browse</p>
        <h1 class="text-4xl md:text-5xl font-display font-bold mb-3">
          Application <span class="gradient-text">Catalog</span>
        </h1>
        <p class="text-base" style="color: var(--text-2)">
          Professional tools and applications for data engineering and development workflows.
        </p>
      </div>

      <!-- Filter pills -->
      <div class="flex gap-2 mb-8 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="['px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200', selectedCategory === cat ? 'filter-active' : 'filter-idle']"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Transition name="glass-scale" mode="out-in">
          <template v-if="filteredApps.length">
            <div
              v-for="app in filteredApps"
              :key="app.id"
              class="glass-card glass-card-interactive group"
            >
              <!-- Preview area -->
              <div class="relative w-full h-44 overflow-hidden rounded-t-2xl">
                <div class="absolute inset-0 flex items-center justify-center"
                     :style="`background: linear-gradient(135deg, ${app.colorFrom}, ${app.colorTo})`">
                  <div class="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                       style="background: rgba(255,255,255,0.15); backdrop-filter: blur(8px)">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="app.icon"/>
                    </svg>
                  </div>
                </div>
                <!-- Category badge -->
                <div class="absolute top-3 right-3">
                  <span class="glass-badge text-xs px-2.5 py-1"
                        style="background: rgba(0,0,0,0.35); border-color: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9); backdrop-filter: blur(8px)">
                    {{ app.category }}
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-5">
                <h3 class="text-base font-display font-semibold mb-1.5 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors"
                    style="color: var(--text-1)">
                  {{ app.name }}
                </h3>
                <p class="text-sm mb-4 line-clamp-2" style="color: var(--text-2)">{{ app.description }}</p>

                <div class="flex items-center justify-between">
                  <span class="text-xl font-display font-bold gradient-text-cool">${{ app.price }}</span>
                  <button class="glass-btn-primary text-xs px-4 py-2">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </template>
        </Transition>
      </div>

      <!-- Empty state -->
      <div v-if="!filteredApps.length" class="glass-empty-state mt-6">
        <div class="glass-empty-icon">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="glass-empty-title">No apps in this category</p>
        <p class="glass-empty-description">Try selecting a different category or check back soon.</p>
        <button @click="selectedCategory = 'All'" class="glass-btn-outline">Clear filter</button>
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
    description: 'Comprehensive ETL pipeline management and orchestration tool with visual workflow editor.',
    category: 'Desktop Apps',
    price: 49.99,
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    colorFrom: '#0f172a',
    colorTo: '#1e3a5f',
  },
  {
    id: 2,
    name: 'Analytics Dashboard',
    description: 'Real-time data visualization and analytics platform with customizable widgets.',
    category: 'Web Apps',
    price: 29.99,
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    colorFrom: '#0c1a2e',
    colorTo: '#1a0a3e',
  },
  {
    id: 3,
    name: 'Code Generator Pro',
    description: 'Automated code generation for data models, APIs, and boilerplate structures.',
    category: 'Tools',
    price: 39.99,
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    colorFrom: '#0a1f0a',
    colorTo: '#0a2e1a',
  },
  {
    id: 4,
    name: 'Schema Validator',
    description: 'Validate, transform, and enforce data schemas across multiple formats.',
    category: 'Utilities',
    price: 19.99,
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    colorFrom: '#1a0a00',
    colorTo: '#2e1a00',
  },
  {
    id: 5,
    name: 'API Testing Suite',
    description: 'Complete API testing, monitoring, and documentation solution for modern services.',
    category: 'Desktop Apps',
    price: 59.99,
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    colorFrom: '#0a0a1f',
    colorTo: '#1a0a2e',
  },
  {
    id: 6,
    name: 'Log Analyzer',
    description: 'Advanced log parsing, filtering, and anomaly detection for production systems.',
    category: 'Web Apps',
    price: 34.99,
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    colorFrom: '#1f0a1a',
    colorTo: '#2e0a2e',
  },
])

const filteredApps = computed(() =>
  selectedCategory.value === 'All'
    ? apps.value
    : apps.value.filter(a => a.category === selectedCategory.value)
)
</script>

<style scoped>
.filter-active {
  background: linear-gradient(135deg, rgba(0,198,255,0.18), rgba(155,90,255,0.12));
  border: 1px solid rgba(0,198,255,0.30);
  color: #26cfff;
}

.filter-idle {
  background: var(--glass-bg-3);
  border: 1px solid var(--glass-border);
  color: var(--text-2);
  backdrop-filter: blur(8px);
}

.filter-idle:hover {
  background: var(--glass-bg-2);
  border-color: var(--glass-border-hover);
  color: var(--text-1);
}
</style>
