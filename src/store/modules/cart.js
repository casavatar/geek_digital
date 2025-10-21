import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([])
  const loading = ref(false)

  // Getters
  const itemCount = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  )

  const formattedTotal = computed(() => `$${totalPrice.value.toFixed(2)}`)

  const hasItems = computed(() => items.value.length > 0)

  // Actions
  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find(item => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      })
    }

    // Save to localStorage
    saveCart()
  }

  const removeItem = (productId) => {
    const index = items.value.findIndex(item => item.id === productId)
    if (index > -1) {
      items.value.splice(index, 1)
      saveCart()
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeItem(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  const clearCart = () => {
    items.value = []
    saveCart()
  }

  const saveCart = () => {
    localStorage.setItem('geek_digital_cart', JSON.stringify(items.value))
  }

  const loadCart = () => {
    const savedCart = localStorage.getItem('geek_digital_cart')
    if (savedCart) {
      try {
        items.value = JSON.parse(savedCart)
      } catch (err) {
        console.error('Error loading cart:', err)
        items.value = []
      }
    }
  }

  // Initialize cart from localStorage
  loadCart()

  return {
    // State
    items,
    loading,
    // Getters
    itemCount,
    totalPrice,
    formattedTotal,
    hasItems,
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loadCart
  }
})
