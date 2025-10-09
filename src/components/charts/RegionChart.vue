<template>
  <div class="w-full space-y-6">
    <div
      v-for="(region, index) in sortedData"
      :key="index"
      class="group relative"
    >
      <!-- Region header -->
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center space-x-3">
          <!-- Flag/Icon placeholder -->
          <div
            class="w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
            :style="{
              backgroundColor: region.color + '20',
              border: `2px solid ${region.color}40`
            }"
          >
            <svg
              class="w-5 h-5"
              :style="{ color: region.color }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <!-- Region name -->
          <div>
            <h4 class="text-base font-semibold text-gray-900 dark:text-white transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {{ region.region }}
            </h4>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              {{ region.percentage }}% of total
            </p>
          </div>
        </div>

        <!-- Value -->
        <div class="text-right">
          <div class="text-lg font-bold text-gray-900 dark:text-white">
            ${{ formatNumber(region.value) }}
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="relative h-8 bg-gray-200/30 dark:bg-gray-700/30 rounded-xl overflow-hidden backdrop-blur-sm">
        <!-- Animated fill -->
        <div
          class="h-full rounded-xl transition-all duration-1000 ease-out relative overflow-hidden group-hover:brightness-125 group-hover:saturate-150"
          :style="{
            width: animatedWidths[index] + '%',
            background: `linear-gradient(to right, ${region.color}E6, ${region.color}99)`,
            boxShadow: `0 4px 15px ${region.color}40`
          }"
        >
          <!-- Glass overlay effect -->
          <div
            class="absolute inset-0 bg-white/20 dark:bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <!-- Shimmer effect -->
          <div
            class="absolute inset-0 opacity-30"
            :style="{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
              animation: 'shimmer 2s infinite'
            }"
          ></div>
        </div>

        <!-- Tooltip on hover -->
        <div
          class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        >
          <div
            class="bg-gray-900/90 dark:bg-gray-100/90 backdrop-blur-md text-white dark:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg"
          >
            {{ region.percentage }}% • ${{ formatNumber(region.value) }}
          </div>
        </div>
      </div>

      <!-- Rank indicator -->
      <div
        class="absolute -left-2 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
        :style="{
          backgroundColor: region.color,
          boxShadow: `0 4px 12px ${region.color}60`
        }"
      >
        {{ index + 1 }}
      </div>
    </div>

    <!-- Summary stats -->
    <div class="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ data.length }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Regions
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            ${{ formatNumber(totalSales) }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Total Sales
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            ${{ formatNumber(averageSales) }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Avg. Sales
          </div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ topRegion?.region }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Top Region
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface RegionData {
  region: string
  value: number
  color: string
}

const props = defineProps<{
  data: RegionData[]
}>()

const animatedWidths = ref<number[]>([])

const totalSales = computed(() => {
  return props.data.reduce((sum, region) => sum + region.value, 0)
})

const averageSales = computed(() => {
  return Math.round(totalSales.value / props.data.length)
})

const sortedData = computed(() => {
  return props.data
    .map((region) => ({
      ...region,
      percentage: ((region.value / totalSales.value) * 100).toFixed(1),
    }))
    .sort((a, b) => b.value - a.value)
})

const topRegion = computed(() => sortedData.value[0])

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
  }
  return num.toString()
}

onMounted(() => {
  // Initialize widths at 0
  animatedWidths.value = new Array(props.data.length).fill(0)

  // Animate bars in sequence
  setTimeout(() => {
    sortedData.value.forEach((region, index) => {
      setTimeout(() => {
        animatedWidths.value[index] = parseFloat(region.percentage)
      }, index * 150)
    })
  }, 100)
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
