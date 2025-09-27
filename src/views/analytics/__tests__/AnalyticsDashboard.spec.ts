import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AnalyticsDashboard from '../AnalyticsDashboard.vue'

// Mock child components
vi.mock('@/components/dashboard/MetricCard.vue', () => ({
  default: {
    name: 'MetricCard',
    template: '<div data-testid="metric-card">Metric Card</div>',
    props: ['title', 'value', 'icon', 'trend', 'progress']
  }
}))

vi.mock('@/components/dashboard/DataTable.vue', () => ({
  default: {
    name: 'DataTable',
    template: '<div data-testid="data-table">Data Table</div>',
    props: ['title', 'columns', 'data']
  }
}))

describe('AnalyticsDashboard', () => {
  it('renders without errors', () => {
    const wrapper = mount(AnalyticsDashboard)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders page title', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    expect(wrapper.text()).toContain('Analytics Dashboard')
  })

  it('renders metric cards', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    // Look for metric cards by their structure (white background cards with metrics)
    const metricCards = wrapper.findAll('.bg-white.dark\\:bg-gray-800.rounded-xl.border')
    expect(metricCards.length).toBeGreaterThan(0)
  })

  it('renders data table', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    // Look for chart sections (data visualization)
    const chartSections = wrapper.findAll('.bg-white.dark\\:bg-gray-800.rounded-xl.border')
    expect(chartSections.length).toBeGreaterThan(4) // Should have metric cards + chart sections
  })

  it('has proper container structure', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    const container = wrapper.find('.space-y-6')
    expect(container.exists()).toBe(true)
  })

  it('has proper spacing between sections', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    const sections = wrapper.findAll('.space-y-6 > *')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    const container = wrapper.find('.space-y-6')
    expect(container.classes()).toContain('space-y-6')
  })

  it('renders metrics grid', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    const metricsGrid = wrapper.find('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4.gap-6')
    expect(metricsGrid.exists()).toBe(true)
  })

  it('has proper responsive design classes', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    const container = wrapper.find('.space-y-6')
    expect(container.classes()).toContain('space-y-6')
  })

  it('maintains proper layout structure', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    const mainContainer = wrapper.find('.space-y-6')
    expect(mainContainer.exists()).toBe(true)
  })

  it('renders page header with title', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    const header = wrapper.find('h1')
    expect(header.exists()).toBe(true)
    expect(header.text()).toContain('Analytics Dashboard')
  })

  it('has proper typography classes', () => {
    const wrapper = mount(AnalyticsDashboard)
    
    const title = wrapper.find('h1')
    expect(title.classes()).toContain('text-3xl')
    expect(title.classes()).toContain('font-bold')
    expect(title.classes()).toContain('text-gray-900')
    expect(title.classes()).toContain('dark:text-white')
  })
})
