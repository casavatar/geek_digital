<template>
  <div class="flex flex-col lg:flex-row items-center justify-center gap-8">
    <!-- Donut Chart SVG -->
    <div class="relative w-64 h-64">
      <svg
        viewBox="0 0 200 200"
        class="transform -rotate-90 w-full h-full"
      >
        <!-- Background circle -->
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="currentColor"
          stroke-width="30"
          class="text-gray-200/30 dark:text-gray-700/30"
        />

        <!-- Segments -->
        <circle
          v-for="(segment, index) in segments"
          :key="index"
          cx="100"
          cy="100"
          r="80"
          fill="none"
          :stroke="segment.color"
          stroke-width="30"
          :stroke-dasharray="`${segment.percentage * circumference / 100} ${circumference}`"
          :stroke-dashoffset="segment.offset"
          class="transition-all duration-700 ease-out cursor-pointer hover:brightness-125 hover:saturate-150"
          :class="hoveredIndex === index ? 'opacity-100 drop-shadow-lg' : 'opacity-90'"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
          stroke-linecap="round"
        />
      </svg>

      <!-- Center text -->
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <div class="text-3xl font-bold text-gray-900 dark:text-white">
          {{ totalValue }}%
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Total
        </div>
      </div>

      <!-- Tooltip -->
      <div
        v-if="hoveredIndex !== null"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
      >
        <div
          class="bg-gray-900/90 dark:bg-gray-100/90 backdrop-blur-md text-white dark:text-gray-900 text-xs font-semibold px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
        >
          <div class="font-bold">{{ data[hoveredIndex].label }}</div>
          <div class="text-center mt-1">{{ data[hoveredIndex].value }}%</div>
        </div>
      </div>
    </div>

    <!-- Legend -->
    <div class="flex flex-col space-y-3">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="group flex items-center space-x-3 cursor-pointer transition-all duration-200 hover:translate-x-2"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <!-- Color indicator -->
        <div
          class="w-4 h-4 rounded-md transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg"
          :style="{
            backgroundColor: item.color,
            boxShadow: hoveredIndex === index ? `0 0 20px ${item.color}` : 'none'
          }"
        ></div>

        <!-- Label and value -->
        <div class="flex-1">
          <div
            class="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-200"
            :class="hoveredIndex === index ? 'text-blue-600 dark:text-blue-400' : ''"
          >
            {{ item.label }}
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">
            {{ item.value }}%
          </div>
        </div>

        <!-- Percentage bar -->
        <div class="w-16 h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700 ease-out"
            :style="{
              width: item.value + '%',
              backgroundColor: item.color,
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface DonutChartItem {
  label: string
  value: number
  color: string
}

const props = defineProps<{
  data: DonutChartItem[]
}>()

const hoveredIndex = ref<number | null>(null)
const radius = 80
const circumference = 2 * Math.PI * radius

const totalValue = computed(() => {
  return props.data.reduce((sum, item) => sum + item.value, 0)
})

const segments = computed(() => {
  let currentOffset = 0
  return props.data.map((item) => {
    const percentage = item.value
    const offset = circumference - currentOffset
    currentOffset += (percentage / 100) * circumference
    return {
      color: item.color,
      percentage,
      offset,
    }
  })
})
</script>
