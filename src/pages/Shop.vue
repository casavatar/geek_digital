<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1 class="text-4xl font-bold mb-8">Digital Product Shop</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Products -->
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="product in products"
              :key="product.id"
              class="card hover:shadow-lg transition-shadow"
            >
              <div class="w-full h-40 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4"></div>
              <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
              <p class="text-gray-600 mb-4 text-sm">{{ product.description }}</p>
              <div class="flex items-center justify-between mb-4">
                <span class="text-2xl font-bold text-primary-600">${{ product.price }}</span>
                <span class="text-sm text-gray-500">{{ product.type }}</span>
              </div>
              <button
                @click="addToCart(product)"
                class="btn btn-primary w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Cart -->
        <div class="lg:col-span-1">
          <div class="card sticky top-4">
            <h2 class="text-2xl font-bold mb-4">Shopping Cart</h2>

            <div v-if="cartStore.hasItems" class="space-y-4">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="flex items-center justify-between py-2 border-b border-gray-200"
              >
                <div class="flex-1">
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-sm text-gray-600">${{ item.price }}</p>
                </div>
                <button
                  @click="cartStore.removeItem(item.id)"
                  class="text-red-600 hover:text-red-700"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="pt-4 border-t border-gray-200">
                <div class="flex justify-between mb-2">
                  <span class="font-medium">Total:</span>
                  <span class="text-2xl font-bold text-primary-600">{{ cartStore.formattedTotal }}</span>
                </div>
              </div>

              <button @click="checkout" class="btn btn-primary w-full">
                Proceed to Checkout
              </button>
            </div>

            <div v-else class="text-center py-8 text-gray-500">
              <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>Your cart is empty</p>
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

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const products = ref([
  {
    id: 1,
    name: 'Data Pipeline Pro',
    description: 'Complete ETL pipeline management solution',
    price: 99.99,
    type: 'Desktop App',
    image: ''
  },
  {
    id: 2,
    name: 'Analytics Dashboard',
    description: 'Real-time data visualization platform',
    price: 49.99,
    type: 'Web App',
    image: ''
  },
  {
    id: 3,
    name: 'API Testing Suite',
    description: 'Comprehensive API testing toolkit',
    price: 79.99,
    type: 'Desktop App',
    image: ''
  },
  {
    id: 4,
    name: 'Code Generator',
    description: 'Automated code generation tool',
    price: 39.99,
    type: 'Utility',
    image: ''
  }
])

const addToCart = (product) => {
  cartStore.addItem(product, 1)
}

const checkout = () => {
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login', query: { redirect: '/shop' } })
    return
  }
  // In production, this would redirect to payment page
  alert('Checkout functionality will redirect to payment processing')
}
</script>
