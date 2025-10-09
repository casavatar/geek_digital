# Chart Components Library

Professional Chart.js components for business and financial data visualization, built with Vue 3, TypeScript, and best practices.

## Top 5 Business & Financial Charts

### 1. LineChart - Trend Analysis
**Use Cases:** Revenue tracking, growth metrics, KPIs over time, performance trends

```vue
<LineChart
  :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
  :datasets="[{
    label: 'Revenue 2024',
    data: [450000, 520000, 480000, 610000, 590000, 720000]
  }]"
  title="Monthly Revenue Trend"
  y-axis-label="Revenue"
  :currency="true"
/>
```

**Props:**
- `labels: string[]` - X-axis labels
- `datasets: LineChartDataset[]` - Data series
- `title?: string` - Chart title
- `yAxisLabel?: string` - Y-axis label
- `currency?: boolean` - Format values as currency
- `percentage?: boolean` - Format values as percentage
- `height?: number` - Chart height

---

### 2. ChartBarChart - Performance Comparisons
**Use Cases:** Sales by region, departmental budgets, product comparisons, quarterly results

```vue
<ChartBarChart
  :labels="['Q1', 'Q2', 'Q3', 'Q4']"
  :datasets="[
    {
      label: 'North America',
      data: [450000, 520000, 610000, 680000]
    },
    {
      label: 'Europe',
      data: [380000, 420000, 480000, 520000]
    }
  ]"
  title="Quarterly Sales by Region"
  :currency="true"
  :stacked="false"
/>
```

**Props:**
- `labels: string[]` - Category labels
- `datasets: BarChartDataset[]` - Data series
- `title?: string` - Chart title
- `yAxisLabel?: string` - Y-axis label
- `horizontal?: boolean` - Horizontal bar chart
- `stacked?: boolean` - Stack bars
- `currency?: boolean` - Format as currency
- `percentage?: boolean` - Format as percentage

---

### 3. PieChart - Market Share Distribution
**Use Cases:** Market share, budget allocation, customer segments, category proportions

```vue
<PieChart
  :labels="['Enterprise', 'Cloud', 'Consulting', 'Hardware']"
  :datasets="[{
    data: [35, 28, 18, 12]
  }]"
  title="Market Share by Product"
  :percentage="true"
  legend-position="right"
/>
```

**Props:**
- `labels: string[]` - Segment labels
- `datasets: PieChartDataset[]` - Data values
- `title?: string` - Chart title
- `currency?: boolean` - Format as currency
- `percentage?: boolean` - Format as percentage
- `showLegend?: boolean` - Show/hide legend (default: true)
- `legendPosition?: 'top' | 'bottom' | 'left' | 'right'` - Legend position

---

### 4. AreaChart - Cash Flow & Volume Analysis
**Use Cases:** Cash flow, inventory levels, trading volumes, accumulated values

```vue
<AreaChart
  :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']"
  :datasets="[
    {
      label: 'Operating Income',
      data: [320000, 340000, 310000, 380000, 370000, 420000]
    },
    {
      label: 'Investing',
      data: [80000, 90000, 85000, 100000, 95000, 110000]
    }
  ]"
  title="Monthly Cash Flow"
  :currency="true"
  :stacked="true"
/>
```

**Props:**
- `labels: string[]` - X-axis labels
- `datasets: AreaChartDataset[]` - Data series
- `title?: string` - Chart title
- `yAxisLabel?: string` - Y-axis label
- `stacked?: boolean` - Stack areas
- `currency?: boolean` - Format as currency
- `percentage?: boolean` - Format as percentage

---

### 5. ChartDoughnutChart - Portfolio & KPI Distribution
**Use Cases:** Portfolio allocation, expense breakdown, resource distribution, KPI dashboards

```vue
<ChartDoughnutChart
  :labels="['Stocks', 'Bonds', 'Real Estate', 'Cash']"
  :datasets="[{
    data: [1250000, 750000, 300000, 50000]
  }]"
  title="Investment Portfolio"
  center-text="$2.5M"
  center-subtext="Total Assets"
  :currency="true"
  cutout="65%"
/>
```

**Props:**
- `labels: string[]` - Segment labels
- `datasets: DoughnutChartDataset[]` - Data values
- `title?: string` - Chart title
- `centerText?: string` - Center text (e.g., total value)
- `centerSubtext?: string` - Center subtext
- `currency?: boolean` - Format as currency
- `percentage?: boolean` - Format as percentage
- `showLegend?: boolean` - Show/hide legend
- `legendPosition?: 'top' | 'bottom' | 'left' | 'right'` - Legend position
- `cutout?: string` - Inner radius (default: '70%')

---

## Best Practices Applied

### 🎨 Visual Design
- ✓ Consistent color palette optimized for business data
- ✓ High contrast for accessibility
- ✓ Professional gradients and shadows
- ✓ Smooth animations and transitions
- ✓ Dark mode support

### 📊 Data Visualization
- ✓ Appropriate chart types for different data
- ✓ Clear axis labels and gridlines
- ✓ Currency and percentage formatting
- ✓ Tooltips with detailed information
- ✓ Legend with percentages where applicable

### ⚡ Performance
- ✓ Canvas-based rendering for efficiency
- ✓ Optimized re-rendering with computed properties
- ✓ Proper component lifecycle management
- ✓ Minimal bundle size with tree-shaking

### ♿ Accessibility
- ✓ Semantic HTML structure
- ✓ ARIA labels where needed
- ✓ Keyboard navigation support
- ✓ Color-blind friendly palette
- ✓ Responsive design

### 🔧 Developer Experience
- ✓ TypeScript for type safety
- ✓ Props validation
- ✓ Comprehensive documentation
- ✓ Reusable and composable
- ✓ Easy to customize

---

## Installation

```bash
npm install chart.js vue-chartjs
```

## Usage Example

```vue
<script setup lang="ts">
import { LineChart, ChartBarChart, PieChart } from '@/components/charts'

const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{
    label: 'Sales',
    data: [100, 200, 150]
  }]
}
</script>

<template>
  <div class="grid gap-6">
    <LineChart v-bind="data" :currency="true" />
    <ChartBarChart v-bind="data" :currency="true" />
    <PieChart v-bind="data" :percentage="true" />
  </div>
</template>
```

## Demo

See [ChartsDemo.vue](../../views/ChartsDemo.vue) for complete examples with realistic financial data.

## Color Palette

Default colors used across all charts:
- Blue (#3B82F6) - Primary data, revenue
- Emerald (#10B981) - Positive metrics, growth
- Orange (#F97316) - Secondary data, alerts
- Purple (#A855F7) - Tertiary data
- Pink (#EC4899) - Accent data

---

## Chart Selection Guide

| Data Type | Best Chart | Alternative |
|-----------|-----------|-------------|
| Trends over time | LineChart | AreaChart |
| Category comparison | ChartBarChart | - |
| Proportions/percentages | PieChart | ChartDoughnutChart |
| Volume/accumulation | AreaChart | LineChart |
| KPIs/metrics | ChartDoughnutChart | PieChart |
| Multiple series comparison | ChartBarChart (stacked) | AreaChart (stacked) |
| Financial performance | LineChart + AreaChart | - |

---

## TypeScript Interfaces

```typescript
interface LineChartDataset {
  label: string
  data: number[]
  borderColor?: string
  backgroundColor?: string
  tension?: number
  fill?: boolean
  borderWidth?: number
}

interface BarChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
  borderRadius?: number
}

// Similar interfaces for Pie, Area, and Doughnut charts
```

---

## License

Part of the Geek Digital portfolio project.
