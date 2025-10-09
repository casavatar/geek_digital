<!-- ChartBarChart.vue - Bar Chart for Comparisons (Sales, Revenue, Performance Metrics) -->
<template>
  <div class="w-full h-full">
    <Bar :data="chartData" :options="(chartOptions as any)" :plugins="plugins" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type Plugin,
  type TooltipItem
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface BarChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
  borderRadius?: number
}

interface BarChartProps {
  labels: string[]
  datasets: BarChartDataset[]
  title?: string
  subtitle?: string
  yAxisLabel?: string
  horizontal?: boolean
  stacked?: boolean
  currency?: boolean
  percentage?: boolean
  height?: number
}

const props = withDefaults(defineProps<BarChartProps>(), {
  title: '',
  subtitle: '',
  yAxisLabel: '',
  horizontal: false,
  stacked: false,
  currency: false,
  percentage: false,
  height: 300
})

// Default color palette optimized for financial data visualization
const defaultColors = [
  'rgba(59, 130, 246, 0.8)',    // blue-500
  'rgba(16, 185, 129, 0.8)',    // emerald-500
  'rgba(249, 115, 22, 0.8)',    // orange-500
  'rgba(168, 85, 247, 0.8)',    // purple-500
  'rgba(236, 72, 153, 0.8)',    // pink-500
  'rgba(14, 165, 233, 0.8)',    // sky-500
  'rgba(244, 63, 94, 0.8)',     // rose-500
]

const defaultBorderColors = [
  'rgb(59, 130, 246)',
  'rgb(16, 185, 129)',
  'rgb(249, 115, 22)',
  'rgb(168, 85, 247)',
  'rgb(236, 72, 153)',
  'rgb(14, 165, 233)',
  'rgb(244, 63, 94)',
]

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((dataset, index) => ({
    label: dataset.label,
    data: dataset.data,
    backgroundColor: dataset.backgroundColor || defaultColors[index % defaultColors.length],
    borderColor: dataset.borderColor || defaultBorderColors[index % defaultBorderColors.length],
    borderWidth: dataset.borderWidth ?? 2,
    borderRadius: dataset.borderRadius ?? 6,
    borderSkipped: false,
  }))
}))

const chartOptions = computed(() => ({
  indexAxis: props.horizontal ? 'y' : 'x',
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: props.datasets.length > 1,
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'rectRounded',
        padding: 15,
        font: {
          size: 12,
          weight: '500'
        },
        color: 'rgb(255, 255, 255)' // white - for better readability
      }
    },
    title: {
      display: !!props.title,
      text: props.title,
      align: 'start',
      font: {
        size: 16,
        weight: '600'
      },
      color: 'rgb(255, 255, 255)', // white - for better readability
      padding: {
        bottom: 20
      }
    },
    subtitle: {
      display: !!props.subtitle,
      text: props.subtitle,
      align: 'start',
      font: {
        size: 13,
        weight: '400'
      },
      color: 'rgb(255, 255, 255)', // white - for better readability
      padding: {
        bottom: 15
      }
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(17, 24, 39, 0.95)', // gray-900
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 6,
      usePointStyle: true,
      callbacks: {
        label: (context: TooltipItem<'bar'>) => {
          let label = context.dataset.label || ''
          if (label) {
            label += ': '
          }
          if (context.parsed.y !== null) {
            const value = props.horizontal ? context.parsed.x : context.parsed.y
            if (props.currency) {
              label += '$' + value.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              })
            } else if (props.percentage) {
              label += value.toFixed(1) + '%'
            } else {
              label += value.toLocaleString('en-US')
            }
          }
          return label
        }
      }
    }
  },
  scales: {
    x: {
      stacked: props.stacked,
      grid: {
        display: !props.horizontal,
        color: 'rgba(255, 255, 255, 0.1)', // white with 10% opacity - subtle gridlines
        drawTicks: false
      },
      ticks: {
        padding: 8,
        font: {
          size: 11
        },
        color: 'rgb(255, 255, 255)', // white - for better readability
        callback: function (value: string | number) {
          if (props.horizontal) {
            if (props.currency) {
              return '$' + (value as number).toLocaleString('en-US')
            } else if (props.percentage) {
              return (value as number) + '%'
            }
          }
          return value
        }
      },
      border: {
        display: false
      }
    },
    y: {
      stacked: props.stacked,
      beginAtZero: true,
      grid: {
        display: props.horizontal,
        color: 'rgba(255, 255, 255, 0.1)', // white with 10% opacity - subtle gridlines
        drawTicks: false
      },
      ticks: {
        padding: 12,
        font: {
          size: 11
        },
        color: 'rgb(255, 255, 255)', // white - for better readability
        callback: function (value: string | number) {
          if (!props.horizontal) {
            if (props.currency) {
              return '$' + (value as number).toLocaleString('en-US')
            } else if (props.percentage) {
              return (value as number) + '%'
            }
          }
          return value
        }
      },
      border: {
        display: false
      },
      title: {
        display: !!props.yAxisLabel,
        text: props.yAxisLabel,
        font: {
          size: 12,
          weight: '500'
        },
        color: 'rgb(255, 255, 255)' // white - for better readability
      }
    }
  }
}))

const plugins = computed<Plugin<'bar'>[]>(() => [
  {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart) => {
      const { ctx } = chart
      ctx.save()
      ctx.globalCompositeOperation = 'destination-over'
      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, chart.width, chart.height)
      ctx.restore()
    }
  }
])
</script>

<style scoped>
/* Additional styling can be added here if needed */
</style>
