<template>
  <div class="glass-section pt-28">
    <div class="container-custom">

      <!-- Header -->
      <div class="mb-12">
        <p class="text-xs tracking-widest uppercase mb-2" style="color: var(--text-3)">Browse</p>
        <h1 class="text-4xl md:text-5xl font-display font-bold mb-3">
          Application <span class="gradient-text">Catalog</span>
        </h1>
        <p class="text-base" style="color: var(--text-2)">
          Professional tools and financial applications built for real-world workflows.
        </p>
      </div>

      <!-- Filter pills -->
      <div class="flex gap-2 mb-10 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="['px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                   selectedCategory === cat ? 'filter-active' : 'filter-idle']"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Products grid -->
      <div v-if="filteredApps.length" class="grid grid-cols-1 lg:grid-cols-2 gap-7">
        <div
          v-for="app in filteredApps"
          :key="app.id"
          class="glass-card glass-card-interactive group flex flex-col"
        >
          <!-- Preview banner -->
          <div class="relative w-full h-52 overflow-hidden rounded-t-2xl flex items-end"
               :style="`background: linear-gradient(135deg, ${app.colorFrom} 0%, ${app.colorTo} 100%)`">

            <!-- Ambient glow -->
            <div class="absolute inset-0 opacity-40"
                 :style="`background: radial-gradient(ellipse 70% 60% at 30% 40%, ${app.glowColor} 0%, transparent 65%)`" />

            <!-- App icon -->
            <div class="absolute top-6 left-6 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                 style="background: rgba(255,255,255,0.12); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.15)">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="app.icon"/>
              </svg>
            </div>

            <!-- Live badge -->
            <div class="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                 style="background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.9)">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </div>

            <!-- Category -->
            <div class="relative z-10 pb-4 px-6 w-full">
              <span class="glass-badge text-xs"
                    style="background: rgba(0,0,0,0.35); border-color: rgba(255,255,255,0.12); color: rgba(255,255,255,0.8)">
                {{ app.category }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-start justify-between gap-3 mb-3">
              <h3 class="text-xl font-display font-semibold group-hover:text-primary-400 transition-colors duration-200"
                  style="color: var(--text-1)">
                {{ app.name }}
              </h3>
              <span class="text-xl font-display font-bold gradient-text-cool flex-shrink-0">
                {{ app.priceLabel }}
              </span>
            </div>

            <p class="text-sm leading-relaxed mb-5 flex-1" style="color: var(--text-2)">
              {{ app.description }}
            </p>

            <!-- Tech tags -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span v-for="tag in app.tags" :key="tag" class="glass-badge text-xs">{{ tag }}</span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3 pt-4" style="border-top: 1px solid var(--glass-border)">
              <a
                :href="app.url"
                target="_blank"
                rel="noopener noreferrer"
                class="glass-btn-primary flex-1 justify-center text-sm py-2.5"
              >
                Open App
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              <button
                @click="addToCart(app)"
                class="glass-btn-outline text-sm px-4 py-2.5"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="glass-empty-state mt-4">
        <div class="glass-empty-icon">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <p class="glass-empty-title">No apps in this category</p>
        <p class="glass-empty-description">Try selecting a different filter.</p>
        <button @click="selectedCategory = 'All'" class="glass-btn-outline">Clear filter</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/modules/cart'

const cartStore = useCartStore()

const selectedCategory = ref('All')
const categories = ['All', 'Web Apps', 'Finance', 'Productivity']

const apps = ref([
  {
    id: 1,
    name: 'PeakReturn',
    description: 'Advanced financial analysis platform for tracking return on investment across micro-transactions. Get real-time portfolio insights, automated ROI calculations, and intelligent performance analytics designed for the modern investor.',
    category: 'Finance',
    priceLabel: 'Free',
    price: 0,
    url: 'https://peakreturns.geekdigital.site/',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    colorFrom: '#030d08',
    colorTo:   '#052212',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    tags: ['Finance', 'Analytics', 'ROI', 'Micro-transactions', 'Portfolio'],
  },
  {
    id: 2,
    name: 'Facture',
    description: 'All-in-one invoicing and financial management system for freelancers and businesses. Generate professional invoices, track payments, manage expenses, and get a complete overview of your personal and business finances in one place.',
    category: 'Productivity',
    priceLabel: 'Free',
    price: 0,
    url: 'https://facture.geekdigital.site/',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    colorFrom: '#06030d',
    colorTo:   '#120522',
    glowColor: 'rgba(124, 58, 237, 0.35)',
    tags: ['Invoicing', 'Accounting', 'Finance', 'Business', 'Freelance'],
  },
])

const filteredApps = computed(() =>
  selectedCategory.value === 'All'
    ? apps.value
    : apps.value.filter(a => a.category === selectedCategory.value || a.tags.includes(selectedCategory.value))
)

const addToCart = (app) => {
  if (app.price > 0) {
    cartStore.addItem(app, 1)
  }
}
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
