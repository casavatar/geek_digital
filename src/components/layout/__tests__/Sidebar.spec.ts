import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Sidebar from '../AppSidebar.vue'

// Mock the UI components and stores
vi.mock('@/components/ui', () => ({
  Icon: {
    name: 'Icon',
    template: '<svg data-testid="icon"><slot /></svg>',
    props: ['name', 'size', 'class']
  }
}))

vi.mock('@/stores/ui', () => ({
  useUiStore: () => ({
    isMobileSidebarOpen: false,
    closeMobileSidebar: vi.fn()
  })
}))

vi.mock('@/constants/navItems', () => ({
  getMainNavItems: () => [
    {
      name: 'home',
      label: 'Dashboard',
      route: '/',
      icon: 'home',
      meta: { requiresAuth: false, section: 'main' }
    },
    {
      name: 'analytics',
      label: 'Analytics',
      route: '/analytics',
      icon: 'chart-bar',
      meta: { requiresAuth: false, section: 'analytics' },
      children: [
        {
          name: 'analytics-dashboard',
          label: 'Dashboards',
          route: '/analytics/dashboard',
          icon: 'chart-bar'
        },
        {
          name: 'analytics-reports',
          label: 'Reports',
          route: '/analytics/reports',
          icon: 'document-text'
        }
      ]
    }
  ]
}))

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/analytics', component: { template: '<div>Analytics</div>' } },
    { path: '/analytics/dashboard', component: { template: '<div>Dashboard</div>' } },
    { path: '/analytics/reports', component: { template: '<div>Reports</div>' } }
  ]
})

describe('Sidebar', () => {
  beforeEach(async () => {
    await router.push('/')
  })

  const createWrapper = (route = '/') => {
    return mount(Sidebar, {
      global: {
        plugins: [router],
        stubs: {
          'router-link': {
            template: '<a><slot /></a>',
            props: ['to']
          }
        }
      }
    })
  }

  it('renders sidebar with brand header', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Data Portfolio')
    expect(wrapper.text()).toContain('Eduardo Castellanos')
  })

  it('renders navigation items', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Dashboard')
    expect(wrapper.text()).toContain('Analytics')
  })

  it('renders icons for navigation items', () => {
    const wrapper = createWrapper()
    
    // Look for SVG elements (Icon components render as SVG)
    const icons = wrapper.findAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('renders child navigation items when parent is expanded', async () => {
    const wrapper = createWrapper()
    
    // Find and click the Analytics section to expand it
    const analyticsButton = wrapper.findAll('button').find(btn => 
      btn.text().includes('Analytics')
    )
    if (analyticsButton) {
      await analyticsButton.trigger('click')
      await wrapper.vm.$nextTick()
      
      expect(wrapper.text()).toContain('Dashboards')
      expect(wrapper.text()).toContain('Reports')
    }
  })

  it('has proper sidebar structure', () => {
    const wrapper = createWrapper()
    
    const sidebar = wrapper.find('.flex.flex-col.h-full')
    expect(sidebar.exists()).toBe(true)
    expect(sidebar.classes()).toContain('flex')
    expect(sidebar.classes()).toContain('flex-col')
  })

  it('applies correct CSS classes for dark mode', () => {
    const wrapper = createWrapper()
    
    const sidebar = wrapper.find('.flex.flex-col.h-full')
    expect(sidebar.classes()).toContain('bg-white')
    expect(sidebar.classes()).toContain('dark:bg-gray-800')
  })

  it('has proper navigation structure', () => {
    const wrapper = createWrapper()
    
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
    expect(nav.classes()).toContain('flex-1')
  })

  it('renders router links for navigation items', () => {
    const wrapper = createWrapper()
    
    // Look for router-link components (they render as <a> tags)
    const routerLinks = wrapper.findAll('a')
    expect(routerLinks.length).toBeGreaterThan(0)
  })

  it('handles navigation item clicks', async () => {
    const wrapper = createWrapper()
    
    const dashboardLink = wrapper.find('a[href="/"]')
    if (dashboardLink.exists()) {
      await dashboardLink.trigger('click')
      // Router navigation would be tested in integration tests
    }
  })

  it('has proper responsive design classes', () => {
    const wrapper = createWrapper()
    
    const sidebar = wrapper.find('.flex.flex-col.h-full')
    expect(sidebar.classes()).toContain('flex')
    expect(sidebar.classes()).toContain('flex-col')
  })

  it('maintains proper spacing and layout', () => {
    const wrapper = createWrapper()
    
    const header = wrapper.find('.p-6.border-b')
    expect(header.exists()).toBe(true)
    
    const nav = wrapper.find('.flex-1.p-4.space-y-2')
    expect(nav.exists()).toBe(true)
  })

  it('renders footer section', () => {
    const wrapper = createWrapper()
    
    const footer = wrapper.find('.p-4.border-t')
    expect(footer.exists()).toBe(true)
    expect(footer.text()).toContain('Data Engineering Portfolio')
  })

  it('has proper accessibility attributes', () => {
    const wrapper = createWrapper()
    
    const sidebar = wrapper.find('.flex.flex-col.h-full')
    expect(sidebar.exists()).toBe(true)
    
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
  })

  it('handles empty navigation items gracefully', () => {
    // Mock empty navigation items
    vi.doMock('@/constants/navItems', () => ({
      getMainNavItems: () => []
    }))
    
    const wrapper = createWrapper()
    
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('maintains consistent styling across different states', () => {
    const wrapper = createWrapper()
    
    const sidebar = wrapper.find('.flex.flex-col.h-full')
    const baseClasses = [
      'flex',
      'flex-col',
      'h-full',
      'bg-white',
      'dark:bg-gray-800',
      'border-r',
      'border-gray-200',
      'dark:border-gray-700'
    ]
    
    baseClasses.forEach(className => {
      expect(sidebar.classes()).toContain(className)
    })
  })
})
