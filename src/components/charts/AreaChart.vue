<!-- AreaChart.vue - Area Chart for Volume Analysis (Stock Trading, Cash Flow) -->
<template>
  <div class="w-full h-full">
    <Line :data="chartData" :options="(chartOptions as any)" :plugins="plugins" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type Plugin,
  type TooltipItem
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface AreaChartDataset {
  label: string
  data: number[]
  borderColor?: string
  backgroundColor?: string
  tension?: number
  borderWidth?: number
}

interface AreaChartProps {
  labels: string[]
  datasets: AreaChartDataset[]
  title?: string
  subtitle?: string
  yAxisLabel?: string
  stacked?: boolean
  currency?: boolean
  percentage?: boolean
  height?: number
}

const props = withDefaults(defineProps<AreaChartProps>(), {
  title: '',
  subtitle: '',
  yAxisLabel: '',
  stacked: false,
  currency: false,
  percentage: false,
  height: 300
})

// Gradient-friendly color palette for area charts
const defaultColors = [
  {
    border: 'rgb(59, 130, 246)',      // blue-500
    background: 'rgba(59, 130, 246, 0.3)'
  },
  {
    border: 'rgb(16, 185, 129)',      // emerald-500
    background: 'rgba(16, 185, 129, 0.3)'
  },
  {
    border: 'rgb(249, 115, 22)',      // orange-500
    background: 'rgba(249, 115, 22, 0.3)'
  },
  {
    border: 'rgb(168, 85, 247)',      // purple-500
    background: 'rgba(168, 85, 247, 0.3)'
  },
  {
    border: 'rgb(236, 72, 153)',      // pink-500
    background: 'rgba(236, 72, 153, 0.3)'
  }
]

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map((dataset, index) => ({
    label: dataset.label,
    data: dataset.data,
    fill: true,
    borderColor: dataset.borderColor || defaultColors[index % defaultColors.length].border,
    backgroundColor: dataset.backgroundColor || defaultColors[index % defaultColors.length].background,
    tension: dataset.tension ?? 0.4,
    borderWidth: dataset.borderWidth ?? 2,
    pointRadius: 3,
    pointHoverRadius: 5,
    pointBackgroundColor: dataset.borderColor || defaultColors[index % defaultColors.length].border,
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: dataset.borderColor || defaultColors[index % defaultColors.length].border,
    pointHoverBorderWidth: 2,
  }))
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
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
        label: (context: TooltipItem<'line'>) => {
          let label = context.dataset.label || ''
          if (label) {
            label += ': '
          }
          if (context.parsed.y !== null) {
            if (props.currency) {
              label += '$' + context.parsed.y.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              })
            } else if (props.percentage) {
              label += context.parsed.y.toFixed(1) + '%'
            } else {
              label += context.parsed.y.toLocaleString('en-US')
            }
          }
          return label
        },
        footer: (tooltipItems: TooltipItem<'line'>[]) => {
          if (props.stacked) {
            const total = tooltipItems.reduce((sum: number, item: TooltipItem<'line'>) => sum + item.parsed.y, 0)
            if (props.currency) {
              return 'Total: $' + total.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              })
            }
            return 'Total: ' + total.toLocaleString('en-US')
          }
          return ''
        }
      }
    },
    filler: {
      propagate: false
    }
  },
  scales: {
    x: {
      stacked: props.stacked,
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)', // white with 10% opacity - subtle gridlines
        drawTicks: false
      },
      ticks: {
        padding: 8,
        font: {
          size: 11
        },
        color: 'rgb(255, 255, 255)' // white - for better readability
      },
      border: {
        display: false
      }
    },
    y: {
      stacked: props.stacked,
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(255, 255, 255, 0.1)', // white with 10% opacity - subtle gridlines
        drawTicks: false
      },
      ticks: {
        padding: 12,
        font: {
          size: 11
        },
        color: 'rgb(255, 255, 255)', // white - for better readability
        callback: (value: string | number) => {
          if (props.currency) {
            return '$' + (value as number).toLocaleString('en-US')
          } else if (props.percentage) {
            return (value as number) + '%'
          }
          return (value as number).toLocaleString('en-US')
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

const plugins = computed<Plugin<'line'>[]>(() => [
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
