<template>
  <div class="glass-section pt-28">
    <div class="container-custom">

      <!-- Header -->
      <div class="mb-10">
        <p class="text-xs tracking-widest uppercase mb-2" style="color: var(--text-3)">Store</p>
        <h1 class="text-4xl md:text-5xl font-display font-bold mb-3">
          Digital <span class="gradient-text">Product Store</span>
        </h1>
        <p class="text-base" style="color: var(--text-2)">
          Premium licenses and applications for data engineers and developers.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Products -->
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div
              v-for="product in products"
              :key="product.id"
              class="glass-card glass-card-interactive group"
            >
              <!-- Preview -->
              <div class="relative w-full h-36 overflow-hidden rounded-t-2xl flex items-center justify-center"
                   :style="`background: linear-gradient(135deg, ${product.colorFrom}, ${product.colorTo})`">
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                     style="background: rgba(255,255,255,0.12); backdrop-filter: blur(8px)">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="product.icon"/>
                  </svg>
                </div>
                <div class="absolute top-3 right-3">
                  <span class="glass-badge text-xs"
                        style="background: rgba(0,0,0,0.35); border-color: rgba(255,255,255,0.12); color: rgba(255,255,255,0.85); backdrop-filter: blur(8px)">
                    {{ product.type }}
                  </span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-5">
                <h3 class="text-base font-display font-semibold mb-1.5 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors"
                    style="color: var(--text-1)">
                  {{ product.name }}
                </h3>
                <p class="text-sm mb-4 line-clamp-2" style="color: var(--text-2)">{{ product.description }}</p>

                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-2xl font-display font-bold gradient-text-cool">${{ product.price }}</span>
                    <span class="text-xs ml-1.5" style="color: var(--text-3)">/ license</span>
                  </div>
                  <button
                    @click="addToCart(product)"
                    class="glass-btn-primary text-xs px-4 py-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cart sidebar -->
        <div class="lg:col-span-1">
          <div class="glass-card-elevated p-6 sticky top-24">

            <!-- Cart header -->
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-display font-semibold" style="color: var(--text-1)">Cart</h2>
              <span v-if="cartStore.hasItems"
                    class="glass-badge glass-badge-primary text-xs">
                {{ cartStore.itemCount }} item{{ cartStore.itemCount !== 1 ? 's' : '' }}
              </span>
            </div>

            <!-- Items -->
            <div v-if="cartStore.hasItems" class="space-y-3">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-center justify-between py-3"
                style="border-bottom: 1px solid var(--glass-border)"
              >
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate" style="color: var(--text-1)">{{ item.name }}</p>
                  <p class="text-xs mt-0.5 gradient-text-cool font-semibold">${{ item.price }}</p>
                </div>
                <button
                  @click="cartStore.removeItem(item.id)"
                  class="glass-btn-icon ml-3 p-1.5 text-red-400 hover:text-red-300"
                  style="border-color: rgba(239,68,68,0.15); background: rgba(239,68,68,0.06)"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <!-- Total -->
              <div class="pt-4">
                <div class="flex items-center justify-between mb-4">
                  <span class="text-sm font-medium" style="color: var(--text-2)">Total</span>
                  <span class="text-2xl font-display font-bold gradient-text">{{ cartStore.formattedTotal }}</span>
                </div>
                <button @click="checkout" class="glass-btn-primary w-full text-sm py-3">
                  Proceed to Checkout
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Empty cart -->
            <div v-else class="text-center py-10">
              <div class="glass-empty-icon w-14 h-14 mx-auto mb-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <p class="text-sm font-medium mb-1" style="color: var(--text-1)">Your cart is empty</p>
              <p class="text-xs" style="color: var(--text-3)">Add products from the catalog to get started.</p>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/store/modules/cart'
import { useAuthStore } from '@/store/modules/auth'

const router    = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const products = ref([
  {
    id: 1,
    name: 'Data Pipeline Pro',
    description: 'Complete ETL pipeline management solution with visual workflow editor and monitoring.',
    price: 99.99,
    type: 'Desktop App',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    colorFrom: '#0f172a',
    colorTo: '#1e3a5f',
  },
  {
    id: 2,
    name: 'Analytics Dashboard',
    description: 'Real-time data visualization platform with customizable charts and KPI widgets.',
    price: 49.99,
    type: 'Web App',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    colorFrom: '#0c1a2e',
    colorTo: '#1a0a3e',
  },
  {
    id: 3,
    name: 'API Testing Suite',
    description: 'Comprehensive API testing, mocking, and documentation toolkit for modern services.',
    price: 79.99,
    type: 'Desktop App',
    icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    colorFrom: '#0a1a10',
    colorTo: '#0a2e1a',
  },
  {
    id: 4,
    name: 'Code Generator',
    description: 'Automated code generation for data models, ORM schemas, and API boilerplate.',
    price: 39.99,
    type: 'Utility',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    colorFrom: '#1a0a00',
    colorTo: '#2e1800',
  },
])

const addToCart = (product) => {
  cartStore.addItem(product, 1)
}

const checkout = () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login', query: { redirect: '/shop' } })
    return
  }
  alert('Checkout functionality will redirect to payment processing')
}
</script>
