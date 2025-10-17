<template>
  <!-- Liquid Glass Sidebar Container -->
  <div
    class="flex flex-col h-full bg-white/20 dark:bg-gray-800/30 backdrop-blur-xl backdrop-saturate-150 border-r border-gray-200/40 dark:border-gray-700/40 shadow-xl shadow-gray-900/20 dark:shadow-gray-950/40">
    <!-- Sidebar Header with Glass Effect -->
    <div
      class="p-6 border-b border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-br from-white/40 to-gray-50/40 dark:from-gray-800/40 dark:to-gray-900/40">
      <div class="flex items-center space-x-3">
        <!-- Glass Icon Container -->
        <div
          class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 backdrop-blur-sm ring-2 ring-blue-100/50 dark:ring-blue-900/50 transition-transform duration-200 hover:scale-105">
          <Icon name="chart-bar" class="text-white" size="lg" />
        </div>
        <div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white drop-shadow-sm px-2">
            {{ $t('sidebar.brand') }}
          </h2>
          <p class="text-xs text-gray-600 dark:text-gray-400 px-2">Eduardo Castellanos</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu with Glass Elements -->
    <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
      <template v-for="item in mainNavItems" :key="item.name">
        <!-- Simple Link (no children) with Glass Effect -->
        <router-link v-if="!item.children" :to="item.route" @click="handleNavigation"
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 backdrop-blur-sm transition-all duration-200 group hover:shadow-md hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 hover:scale-[1.02] hover:brightness-110"
          :class="{
            'bg-gradient-to-r from-blue-50/40 to-indigo-50/40 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/20 ring-2 ring-blue-100/50 dark:ring-blue-900/50 backdrop-blur-md':
              isActiveRoute(item.route),
          }">
          <Icon :name="item.icon"
            :class="isActiveRoute(item.route) ? 'text-blue-600 dark:text-blue-400 drop-shadow-sm' : ''" />
          <span class="font-medium px-2">{{ getTranslatedLabel(item) }}</span>
        </router-link>

        <!-- Expandable Section (with children) with Glass Effect -->
        <div v-else class="space-y-1">
          <button @click="toggleSection(item.name)"
            class="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 backdrop-blur-sm transition-all duration-200 group hover:shadow-md hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
            :class="{
              'bg-white/60 dark:bg-gray-700/60 shadow-md shadow-gray-200/50 dark:shadow-gray-900/50':
                expandedSections[item.name],
            }">
            <div class="flex items-center space-x-3">
              <Icon :name="item.icon" />
              <span class="font-medium px-2">{{ getTranslatedLabel(item) }}</span>
            </div>
            <Icon name="chevron-down" size="sm"
              :class="`transition-transform duration-200 ${expandedSections[item.name] ? 'rotate-180' : ''}`" />
          </button>

          <!-- Submenu with Glass Effect -->
          <div v-show="expandedSections[item.name]" class="ml-8 space-y-1">
            <router-link v-for="child in item.children" :key="child.name" :to="child.route" @click="handleNavigation"
              class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 backdrop-blur-sm transition-all duration-200 hover:shadow-sm hover:shadow-gray-200/30 dark:hover:shadow-gray-900/30 hover:brightness-110"
              :class="{
                'bg-gradient-to-r from-blue-50/40 to-indigo-50/40 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/10 ring-1 ring-blue-100/50 dark:ring-blue-900/50 backdrop-blur-sm':
                  isActiveRoute(child.route),
              }">
              <Icon :name="child.icon" size="sm"
                :class="isActiveRoute(child.route) ? 'text-blue-600 dark:text-blue-400' : ''" />
              <span class="font-medium px-2">{{ getTranslatedLabel(child) }}</span>
            </router-link>
          </div>
        </div>
      </template>
    </nav>

    <!-- Sidebar Footer with Glass Effect -->
    <div
      class="p-4 border-t border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-t from-white/40 to-transparent dark:from-gray-800/40">
      <div class="text-xs text-gray-600 dark:text-gray-400 text-center space-y-1">
        <p class="font-medium">Data Engineering Portfolio</p>
        <p class="opacity-75">© {{ currentYear }} Eduardo Castellanos</p>
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
  if (window.innerWidth < 1024) {
    // lg breakpoint
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
    home: 'sidebar.home',
    analytics: 'sidebar.analytics',
    'data-engineer': 'sidebar.dataEngineer',
    'analytics-dashboard': 'sidebar.dashboards',
    'analytics-reports': 'sidebar.reports',
    'analytics-metrics': 'sidebar.metrics',
    'data-engineer-pipelines': 'sidebar.pipelines',
    'data-engineer-etl-jobs': 'sidebar.etlJobs',
    'data-engineer-data-models': 'sidebar.dataModels',
  }

  const translationKey = translationMap[item.name]
  return translationKey ? t(translationKey) : item.label
}

// Auto-expand sections based on current route
watch(
  route,
  (newRoute) => {
    // Reset all expanded sections
    Object.keys(expandedSections).forEach((key) => {
      expandedSections[key] = false
    })

    // Expand section based on current route
    if (newRoute.path.startsWith('/analytics')) {
      expandedSections.analytics = true
    } else if (newRoute.path.startsWith('/data-engineer')) {
      expandedSections['data-engineer'] = true
    }
  },
  { immediate: true },
)
</script>
