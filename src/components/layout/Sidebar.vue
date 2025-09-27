<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
    <!-- Sidebar Header -->
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <Icon name="chart-bar" class="text-white" size="lg" />
        </div>
        <div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ $t('sidebar.brand') }}</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">Eduardo Castellanos</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <template v-for="item in mainNavItems" :key="item.name">
        <!-- Simple Link (no children) -->
        <router-link
          v-if="!item.children"
          :to="item.route"
          @click="handleNavigation"
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
          :class="{ 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400': isActiveRoute(item.route) }"
        >
          <Icon :name="item.icon" />
          <span class="font-medium">{{ getTranslatedLabel(item) }}</span>
        </router-link>

        <!-- Expandable Section (with children) -->
        <div v-else class="space-y-1">
          <button
            @click="toggleSection(item.name)"
            class="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
          >
            <div class="flex items-center space-x-3">
              <Icon :name="item.icon" />
              <span class="font-medium">{{ getTranslatedLabel(item) }}</span>
            </div>
            <Icon 
              name="chevron-down" 
              size="sm"
              :class="`transition-transform duration-200 ${expandedSections[item.name] ? 'rotate-180' : ''}`"
            />
          </button>

          <!-- Submenu -->
          <div v-show="expandedSections[item.name]" class="ml-8 space-y-1">
            <router-link
              v-for="child in item.children"
              :key="child.name"
              :to="child.route"
              @click="handleNavigation"
              class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              :class="{ 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400': isActiveRoute(child.route) }"
            >
              <Icon :name="child.icon" size="sm" />
              <span>{{ getTranslatedLabel(child) }}</span>
            </router-link>
          </div>
        </div>
      </template>
    </nav>

    <!-- Sidebar Footer -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-700">
      <div class="text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>Data Engineering Portfolio</p>
        <p>© {{ currentYear }} Eduardo Castellanos</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'
import { getMainNavItems, type NavItem } from '@/constants/navItems'
import Icon from '@/components/ui/Icon.vue'

const route = useRoute()
const uiStore = useUiStore()
const { t } = useI18n()

// Get navigation items from centralized configuration
const mainNavItems = computed(() => getMainNavItems())

// Track expanded sections dynamically
const expandedSections = reactive<Record<string, boolean>>({})

const currentYear = computed(() => new Date().getFullYear())

const toggleSection = (sectionName: string) => {
  expandedSections[sectionName] = !expandedSections[sectionName]
}

// Close mobile sidebar when navigating (on mobile)
const handleNavigation = () => {
  if (window.innerWidth < 1024) { // lg breakpoint
    uiStore.closeMobileSidebar()
  }
}

// Check if a route is currently active
const isActiveRoute = (routePath: string): boolean => {
  return route.path === routePath
}

// Get translated label for navigation items
const getTranslatedLabel = (item: NavItem): string => {
  // Map navigation item names to translation keys
  const translationMap: Record<string, string> = {
    'home': 'sidebar.home',
    'analytics': 'sidebar.analytics',
    'data-engineer': 'sidebar.dataEngineer',
    'analytics-dashboard': 'sidebar.dashboards',
    'analytics-reports': 'sidebar.reports',
    'analytics-metrics': 'sidebar.metrics',
    'data-engineer-pipelines': 'sidebar.pipelines',
    'data-engineer-etl-jobs': 'sidebar.etlJobs',
    'data-engineer-data-models': 'sidebar.dataModels'
  }
  
  const translationKey = translationMap[item.name]
  return translationKey ? t(translationKey) : item.label
}

// Auto-expand sections based on current route
watch(route, (newRoute) => {
  // Reset all expanded sections
  Object.keys(expandedSections).forEach(key => {
    expandedSections[key] = false
  })
  
  // Expand section based on current route
  if (newRoute.path.startsWith('/analytics')) {
    expandedSections.analytics = true
  } else if (newRoute.path.startsWith('/data-engineer')) {
    expandedSections['data-engineer'] = true
  }
}, { immediate: true })
</script>
