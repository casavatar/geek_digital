<template>
  <div class="relative w-full h-80">
    <!-- Chart Container -->
    <div class="flex items-end justify-between h-full space-x-2 px-4">
      <div v-for="(value, index) in data.values" :key="index"
        class="group flex-1 flex flex-col items-center justify-end relative">
        <!-- Tooltip -->
        <div
          class="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <div
            class="bg-gray-900/90 dark:bg-gray-100/90 backdrop-blur-md text-white dark:text-gray-900 text-xs font-semibold px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            ${{ formatNumber(value) }}
          </div>
          <div class="w-2 h-2 bg-gray-900/90 dark:bg-gray-100/90 transform rotate-45 mx-auto -mt-1"></div>
        </div>

        <!-- Bar -->
        <div
          class="w-full rounded-t-xl transition-all duration-700 ease-out cursor-pointer relative overflow-hidden group-hover:brightness-125 group-hover:saturate-150"
          :style="{
            height: barHeight(value) + '%',
            background: getGradient(index),
            boxShadow: `0 4px 20px ${getColor(index, 0.3)}`,
          }" :class="animationClass">
          <!-- Glass overlay effect -->
          <div
            class="absolute inset-0 bg-white/20 dark:bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
        </div>

        <!-- Label -->
        <div class="mt-3 text-xs font-medium text-gray-600 dark:text-gray-400">
          {{ data.labels[index] }}
        </div>
      </div>
    </div>

    <!-- Y-axis grid lines (optional) -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="i in 5" :key="i" class="absolute left-0 right-0 border-t border-gray-200/30 dark:border-gray-700/30"
        :style="{ top: (i * 20) + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface BarChartData {
  labels: string[]
  values: number[]
}

const props = defineProps<{
  data: BarChartData
}>()

const animationClass = ref('')

onMounted(() => {
  setTimeout(() => {
    animationClass.value = 'animate-in'
  }, 100)
})

const maxValue = computed(() => Math.max(...props.data.values))

const barHeight = (value: number): number => {
  return (value / maxValue.value) * 100
}

const getColor = (index: number, opacity: number = 1): string => {
  const colors = [
    `rgba(59, 130, 246, ${opacity})`,   // blue
    `rgba(99, 102, 241, ${opacity})`,   // indigo
    `rgba(139, 92, 246, ${opacity})`,   // violet
    `rgba(168, 85, 247, ${opacity})`,   // purple
    `rgba(217, 70, 239, ${opacity})`,   // fuchsia
    `rgba(236, 72, 153, ${opacity})`,   // pink
    `rgba(239, 68, 68, ${opacity})`,    // red
    `rgba(251, 146, 60, ${opacity})`,   // orange
    `rgba(34, 197, 94, ${opacity})`,    // green
    `rgba(16, 185, 129, ${opacity})`,   // emerald
    `rgba(20, 184, 166, ${opacity})`,   // teal
    `rgba(6, 182, 212, ${opacity})`,    // cyan
  ]
  return colors[index % colors.length]
}

const getGradient = (index: number): string => {
  const color1 = getColor(index, 0.9)
  const color2 = getColor(index, 0.6)
  return `linear-gradient(to top, ${color1}, ${color2})`
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
@keyframes slideUp {
  from {
    transform: scaleY(0);
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

.animate-in {
  animation: slideUp 0.8s ease-out forwards;
  transform-origin: bottom;
}
</style>
