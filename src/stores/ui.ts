import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // UI State
  const isSidebarCollapsed = ref(false)
  const isMobileSidebarOpen = ref(false)

  // Sidebar Actions
  const toggleSidebarCollapse = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  const openMobileSidebar = () => {
    isMobileSidebarOpen.value = true
  }

  const closeMobileSidebar = () => {
    isMobileSidebarOpen.value = false
  }

  const toggleMobileSidebar = () => {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  }

  return {
    // State
    isSidebarCollapsed,
    isMobileSidebarOpen,
    
    // Actions
    toggleSidebarCollapse,
    openMobileSidebar,
    closeMobileSidebar,
    toggleMobileSidebar
  }
})
