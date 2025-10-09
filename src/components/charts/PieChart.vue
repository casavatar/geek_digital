<!-- PieChart.vue - Pie Chart for Distribution }

const props = withDefaults(defineProps<PieChartProps>(), {
  title: '',
  subtitle: '',
  currency: false,
  percentage: false,
  showLegend: true,
  legendPosition: 'right',
  height: 300
})

// Professional color palette optimized for business dashboards
const defaultBackgroundColors = [t Share Analysis -->
<template>
  <div class="w-full h-full">
    <Pie :data="chartData" :options="(chartOptions as any)" :plugins="plugins" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type Plugin,
  type TooltipItem,
  type Chart
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface PieChartDataset {
  label?: string
  data: number[]
  backgroundColor?: string[]
  borderColor?: string[]
  borderWidth?: number
}

interface PieChartProps {
  labels: string[]
  datasets: PieChartDataset[]
  title?: string
  subtitle?: string
  showLegend?: boolean
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  currency?: boolean
  percentage?: boolean
  height?: number
}

const props = withDefaults(defineProps<PieChartProps>(), {
  title: '',
  subtitle: '',
  currency: false,
  percentage: false,
  showLegend: true,
  legendPosition: 'right',
  height: 300
})

// Professional color palette for financial charts
const defaultBackgroundColors = [
  'rgba(59, 130, 246, 0.8)',    // blue-500
  'rgba(16, 185, 129, 0.8)',    // emerald-500
  'rgba(249, 115, 22, 0.8)',    // orange-500
  'rgba(168, 85, 247, 0.8)',    // purple-500
  'rgba(236, 72, 153, 0.8)',    // pink-500
  'rgba(14, 165, 233, 0.8)',    // sky-500
  'rgba(244, 63, 94, 0.8)',     // rose-500
  'rgba(139, 92, 246, 0.8)',    // violet-500
  'rgba(234, 179, 8, 0.8)',     // yellow-500
  'rgba(99, 102, 241, 0.8)',    // indigo-500
]

const defaultBorderColors = [
  'rgb(59, 130, 246)',
  'rgb(16, 185, 129)',
  'rgb(249, 115, 22)',
  'rgb(168, 85, 247)',
  'rgb(236, 72, 153)',
  'rgb(14, 165, 233)',
  'rgb(244, 63, 94)',
  'rgb(139, 92, 246)',
  'rgb(234, 179, 8)',
  'rgb(99, 102, 241)',
]

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((dataset) => ({
    label: dataset.label,
    data: dataset.data,
    backgroundColor: dataset.backgroundColor || defaultBackgroundColors.slice(0, props.labels.length),
    borderColor: dataset.borderColor || defaultBorderColors.slice(0, props.labels.length),
    borderWidth: dataset.borderWidth ?? 2,
    hoverOffset: 10,
    hoverBorderWidth: 3,
  }))
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: true,
  },
  plugins: {
    legend: {
      display: props.showLegend,
      position: props.legendPosition,
      align: 'center',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 15,
        font: {
          size: 12,
          weight: '500'
        },
        color: 'rgb(255, 255, 255)', // white - for better readability
        generateLabels: (chart: Chart) => {
          const datasets = chart.data.datasets
          if (datasets.length === 0) return []

          const data = datasets[0].data as number[]
          const total = data.reduce((sum: number, value: number) => sum + value, 0)

          return chart.data.labels?.map((label: unknown, i: number) => {
            const value = data[i]
            const percentage = ((value / total) * 100).toFixed(1)

            return {
              text: `${label} (${percentage}%)`,
              fillStyle: (datasets[0].backgroundColor as string[])[i],
              strokeStyle: (datasets[0].borderColor as string[])[i],
              lineWidth: 2,
              hidden: false,
              index: i,
              pointStyle: 'circle',
              fontColor: 'rgb(255, 255, 255)' // white - for better readability
            }
          }) || []
        }
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
        label: (context: TooltipItem<'pie'>) => {
          const label = context.label || ''
          const value = context.parsed
          const total = (context.dataset.data as number[]).reduce((sum, val) => sum + val, 0)
          const percentage = ((value / total) * 100).toFixed(1)

          let displayValue = ''
          if (props.currency) {
            displayValue = '$' + value.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            })
          } else if (props.percentage) {
            displayValue = value.toFixed(1) + '%'
          } else {
            displayValue = value.toLocaleString('en-US')
          }

          return `${label}: ${displayValue} (${percentage}%)`
        }
      }
    }
  }
}))

const plugins = computed<Plugin<'pie'>[]>(() => [
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
