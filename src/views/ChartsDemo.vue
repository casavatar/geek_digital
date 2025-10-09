<!-- ChartsDemo.vue - Demo Dashboard showcasing Top 5 Business & Financial Charts -->
<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Business Analytics Dashboard
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Top 5 most used charts in financial and business sectors with Chart.js best practices
      </p>
    </div>

    <!-- 1. LINE CHART - Revenue Trend Analysis -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
            1
          </span>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Line Chart - Revenue Trend Analysis
          </h2>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 ml-10">
          Most popular for tracking trends over time: revenue, sales, growth metrics, KPIs
        </p>
      </div>
      <div class="h-80">
        <LineChart :labels="revenueData.labels" :datasets="revenueData.datasets" title="Monthly Revenue Trend (2024)"
          y-axis-label="Revenue" :currency="true" />
      </div>
    </div>

    <!-- 2. BAR CHART - Department Performance Comparison -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
            2
          </span>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Bar Chart - Performance Comparisons
          </h2>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 ml-10">
          Essential for comparing categories: sales by region, departmental budgets, product performance
        </p>
      </div>
      <div class="h-80">
        <ChartBarChart :labels="departmentData.labels" :datasets="departmentData.datasets"
          title="Quarterly Department Sales Performance" y-axis-label="Sales" :currency="true" :stacked="false" />
      </div>
    </div>

    <!-- 3. PIE CHART - Market Share Distribution -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold">
            3
          </span>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Pie Chart - Market Share Distribution
          </h2>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 ml-10">
          Perfect for showing proportions: market share, budget allocation, customer segments
        </p>
      </div>
      <div class="h-96">
        <PieChart :labels="marketShareData.labels" :datasets="marketShareData.datasets"
          title="Market Share by Product Category" :percentage="true" legend-position="right" />
      </div>
    </div>

    <!-- 4. AREA CHART - Cash Flow Analysis -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
            4
          </span>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Area Chart - Cash Flow & Volume Analysis
          </h2>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 ml-10">
          Ideal for volume data: cash flow, inventory levels, trading volumes, accumulated values
        </p>
      </div>
      <div class="h-80">
        <AreaChart :labels="cashFlowData.labels" :datasets="cashFlowData.datasets" title="Monthly Cash Flow Analysis"
          y-axis-label="Amount" :currency="true" :stacked="true" />
      </div>
    </div>

    <!-- 5. DOUGHNUT CHART - Portfolio Allocation -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="mb-4">
        <div class="flex items-center gap-2 mb-2">
          <span
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold">
            5
          </span>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Doughnut Chart - Portfolio & KPI Distribution
          </h2>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 ml-10">
          Modern alternative to pie charts: portfolio allocation, expense breakdown, resource distribution
        </p>
      </div>
      <div class="h-96">
        <ChartDoughnutChart :labels="portfolioData.labels" :datasets="portfolioData.datasets"
          title="Investment Portfolio Allocation" center-text="$2.5M" center-subtext="Total Assets" :currency="true"
          legend-position="right" cutout="65%" />
      </div>
    </div>

    <!-- Best Practices Section -->
    <div
      class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-sm border border-blue-200 dark:border-gray-700 p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Chart.js Best Practices Applied
      </h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">✓ Accessibility</h3>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• High contrast colors for readability</li>
            <li>• Proper labeling and tooltips</li>
            <li>• Responsive design for all devices</li>
          </ul>
        </div>
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">✓ Performance</h3>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Optimized rendering with canvas</li>
            <li>• Efficient data updates</li>
            <li>• Proper component lifecycle management</li>
          </ul>
        </div>
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">✓ User Experience</h3>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Interactive hover effects</li>
            <li>• Clear legends and labels</li>
            <li>• Consistent color schemes</li>
          </ul>
        </div>
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">✓ Data Visualization</h3>
          <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Appropriate chart type for data</li>
            <li>• Clear axis labeling</li>
            <li>• Currency and percentage formatting</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LineChart from '@/components/charts/LineChart.vue'
import ChartBarChart from '@/components/charts/ChartBarChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import AreaChart from '@/components/charts/AreaChart.vue'
import ChartDoughnutChart from '@/components/charts/ChartDoughnutChart.vue'

// 1. LINE CHART DATA - Revenue Trend
const revenueData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: '2024 Revenue',
      data: [450000, 520000, 480000, 610000, 590000, 720000, 680000, 750000, 820000, 880000, 920000, 1050000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      label: '2023 Revenue',
      data: [380000, 420000, 410000, 480000, 520000, 580000, 560000, 610000, 650000, 690000, 720000, 800000],
      borderColor: 'rgb(156, 163, 175)',
      backgroundColor: 'rgba(156, 163, 175, 0.1)',
    }
  ]
})

// 2. BAR CHART DATA - Department Performance
const departmentData = ref({
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'North America',
      data: [450000, 520000, 610000, 680000],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgb(59, 130, 246)',
    },
    {
      label: 'Europe',
      data: [380000, 420000, 480000, 520000],
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: 'rgb(16, 185, 129)',
    },
    {
      label: 'Asia Pacific',
      data: [320000, 380000, 450000, 510000],
      backgroundColor: 'rgba(249, 115, 22, 0.8)',
      borderColor: 'rgb(249, 115, 22)',
    }
  ]
})

// 3. PIE CHART DATA - Market Share
const marketShareData = ref({
  labels: ['Enterprise Software', 'Cloud Services', 'Consulting', 'Hardware', 'Support'],
  datasets: [
    {
      data: [35, 28, 18, 12, 7],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(249, 115, 22)',
        'rgb(168, 85, 247)',
        'rgb(236, 72, 153)',
      ],
    }
  ]
})

// 4. AREA CHART DATA - Cash Flow
const cashFlowData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Operating Income',
      data: [320000, 340000, 310000, 380000, 370000, 420000, 410000, 450000, 480000, 510000, 530000, 580000],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.3)',
    },
    {
      label: 'Investing Activities',
      data: [80000, 90000, 85000, 100000, 95000, 110000, 105000, 115000, 120000, 130000, 135000, 150000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
    },
    {
      label: 'Financing Activities',
      data: [50000, 60000, 55000, 70000, 65000, 80000, 75000, 85000, 90000, 95000, 100000, 110000],
      borderColor: 'rgb(249, 115, 22)',
      backgroundColor: 'rgba(249, 115, 22, 0.3)',
    }
  ]
})

// 5. DOUGHNUT CHART DATA - Portfolio Allocation
const portfolioData = ref({
  labels: ['Stocks', 'Bonds', 'Real Estate', 'Commodities', 'Cash'],
  datasets: [
    {
      data: [1250000, 750000, 300000, 150000, 50000],
      backgroundColor: [
        'rgba(59, 130, 246, 0.85)',
        'rgba(16, 185, 129, 0.85)',
        'rgba(249, 115, 22, 0.85)',
        'rgba(168, 85, 247, 0.85)',
        'rgba(236, 72, 153, 0.85)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(249, 115, 22)',
        'rgb(168, 85, 247)',
        'rgb(236, 72, 153)',
      ],
    }
  ]
})
</script>
