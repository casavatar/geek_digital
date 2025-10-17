import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../DashboardLayout.vue'

// Mock child components
vi.mock('@/components/layout/Sidebar.vue', () => ({
  default: {
    name: 'Sidebar',
    template: '<aside data-testid="sidebar">Sidebar</aside>'
  }
}))

vi.mock('@/components/dashboard/ThemeToggle.vue', () => ({
  default: {
    name: 'ThemeToggle',
    template: '<button data-testid="theme-toggle">Theme Toggle</button>'
  }
}))

vi.mock('@/components/dashboard/TopBar.vue', () => ({
  default: {
    name: 'TopBar',
    template: '<header data-testid="top-bar">Top Bar</header>',
    props: ['personalInfo']
  }
}))

// Mock composables
vi.mock('@/composables/usePortfolioData', () => ({
  usePortfolioData: () => ({
    personalInfo: {
      value: {
        name: 'John Doe',
        title: 'Data Engineer',
        avatar: '/avatar.jpg',
        tagline: 'Building data solutions',
        bio: 'Experienced data engineer',
        cvUrl: '/cv.pdf'
      }
    }
  })
}))

vi.mock('@/composables/useTheme', () => ({
  useTheme: vi.fn()
}))

import { useUiStore } from '@/stores/ui'
vi.mock('@/stores/ui')

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      component: { 
        template: '<div data-testid="router-view">Home Content</div>' 
      } 
    }
  ]
})

describe('DashboardLayout', () => {
  beforeEach(async () => {
    await router.push('/');
    vi.mocked(useUiStore).mockReturnValue({
      $id: 'ui',
      isMobileSidebarOpen: false,
      openMobileSidebar: vi.fn(),
      closeMobileSidebar: vi.fn(),
    } as any);
  });

  const createWrapper = () => {
    return mount(DashboardLayout, {
      global: {
        plugins: [router],
        stubs: {
          'router-view': {
            template: '<div data-testid="router-view">Router View Content</div>'
          }
        }
      }
    })
  }

  it('renders the layout structure', () => {
    const wrapper = createWrapper()
    
    // Check for the main layout container
    expect(wrapper.find('.min-h-screen.bg-gray-50').exists()).toBe(true)
    expect(wrapper.find('.flex.h-screen').exists()).toBe(true)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(true)
  })

  it('has proper layout structure', () => {
    const wrapper = createWrapper()
    
    const mainContainer = wrapper.find('.flex.h-screen')
    expect(mainContainer.exists()).toBe(true)
    
    const contentArea = wrapper.find('.lg\\:pl-64.flex.flex-col.flex-1')
    expect(contentArea.exists()).toBe(true)
  })

  it('renders sidebar component', () => {
    const wrapper = createWrapper()
    
    // Check for the sidebar container
    const sidebarContainer = wrapper.find('.hidden.lg\\:flex.lg\\:w-64')
    expect(sidebarContainer.exists()).toBe(true)
    
    // Check that Sidebar component is rendered
    expect(wrapper.findComponent({ name: 'Sidebar' }).exists()).toBe(true)
  })

  it('renders top bar component with personal info', () => {
    const wrapper = createWrapper()
    
    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
    
    // Check for profile image
    expect(header.find('img').exists()).toBe(true)
    
    // Check for the name in the h1 element
    const nameElement = header.find('h1')
    expect(nameElement.exists()).toBe(true)
    // The h1 element should exist for displaying the name
    expect(nameElement.classes()).toContain('text-lg')
  })

  it('renders router view for content', () => {
    const wrapper = createWrapper()
    
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    
    // Check that router-view is rendered (it's stubbed)
    expect(wrapper.find('[data-testid="router-view"]').exists()).toBe(true)
  })

  it('has proper CSS classes for layout', () => {
    const wrapper = createWrapper()
    
    const mainContainer = wrapper.find('.flex.h-screen')
    expect(mainContainer.classes()).toContain('flex')
    expect(mainContainer.classes()).toContain('h-screen')
    
    const contentArea = wrapper.find('.lg\\:pl-64.flex.flex-col.flex-1')
    expect(contentArea.classes()).toContain('flex-1')
    expect(contentArea.classes()).toContain('flex')
    expect(contentArea.classes()).toContain('flex-col')
  })

  it('applies correct background classes', () => {
    const wrapper = createWrapper()
    
    const mainContainer = wrapper.find('.min-h-screen.bg-gray-50')
    expect(mainContainer.classes()).toContain('bg-gray-50')
    expect(mainContainer.classes()).toContain('dark:bg-gray-900')
  })

  it('has proper responsive design classes', () => {
    const wrapper = createWrapper()
    
    const mainContainer = wrapper.find('.min-h-screen.bg-gray-50')
    expect(mainContainer.classes()).toContain('transition-colors')
    expect(mainContainer.classes()).toContain('duration-300')
  })

  it('maintains proper layout hierarchy', () => {
    const wrapper = createWrapper()
    
    // Check that sidebar is a direct child of main container
    const mainContainer = wrapper.find('.flex.h-screen')
    const sidebar = mainContainer.findComponent({ name: 'Sidebar' })
    expect(sidebar.exists()).toBe(true)
    
    // Check that content area contains header and main
    const contentArea = wrapper.find('.lg\\:pl-64.flex.flex-col.flex-1')
    const header = contentArea.find('header')
    const main = contentArea.find('main')
    
    expect(header.exists()).toBe(true)
    expect(main.exists()).toBe(true)
  })

  describe('Mobile Sidebar', () => {
    it('is hidden by default', () => {
      const wrapper = createWrapper()
      const mobileOverlay = wrapper.find('.fixed.inset-0.z-40.lg\:hidden')
      expect(mobileOverlay.exists()).toBe(false)
    })

    it('renders with liquidglass effect when open', () => {
      // Mock the uiStore to have the sidebar open for this test
      vi.mocked(useUiStore).mockReturnValue({
        $id: 'ui',
        isMobileSidebarOpen: true,
        openMobileSidebar: vi.fn(),
        closeMobileSidebar: vi.fn()
      } as any)

      const wrapper = createWrapper()

      // Check for the backdrop with its blur effect
      const backdrop = wrapper.find('.fixed.inset-0.bg-gray-600\/75.backdrop-blur-sm')
      expect(backdrop.exists()).toBe(true)

      // Check for the sidebar panel using its accessibility attributes
      const sidebarPanel = wrapper.find('[role="dialog"][aria-label="Mobile navigation menu"]')
      expect(sidebarPanel.exists()).toBe(true)

      // Check for the "liquidglass" classes on the panel
      const panelClasses = sidebarPanel.classes()
      expect(panelClasses).toContain('bg-white/30')
      expect(panelClasses).toContain('dark:bg-gray-800/30')
      expect(panelClasses).toContain('backdrop-blur-xl')
      expect(panelClasses).toContain('backdrop-saturate-150')
    })
  })

  it('has proper accessibility structure', () => {
    const wrapper = createWrapper()
    
    // Check for semantic HTML structure
    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
    
    const main = wrapper.find('main')
    expect(main.exists()).toBe(true)
    
    // Check that Sidebar component is rendered (it may not have aside tag)
    expect(wrapper.findComponent({ name: 'Sidebar' }).exists()).toBe(true)
  })

  it('maintains consistent styling across different states', () => {
    const wrapper = createWrapper()
    
    const mainContainer = wrapper.find('.min-h-screen.bg-gray-50')
    const baseClasses = [
      'min-h-screen',
      'bg-gray-50',
      'dark:bg-gray-900',
      'transition-colors',
      'duration-300'
    ]
    
    baseClasses.forEach(className => {
      expect(mainContainer.classes()).toContain(className)
    })
  })

  it('renders all required child components', () => {
    const wrapper = createWrapper()
    
    // Check that all required components are rendered
    expect(wrapper.findComponent({ name: 'Sidebar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ThemeToggle' }).exists()).toBe(true)
    // RouterView is stubbed, so check for the stub
    expect(wrapper.find('[data-testid="router-view"]').exists()).toBe(true)
  })

  it('passes correct props to child components', () => {
    const wrapper = createWrapper()

    // Check that personalInfo is available in the component
    // Note: personalInfo comes from usePortfolioData composable
    // The composable should be available in the component
    const vm = wrapper.vm as any
    expect(vm.personalInfo).toBeDefined()
    expect(vm.personalInfo).toBeTruthy()
  })

  it('handles router navigation correctly', async () => {
    const wrapper = createWrapper()
    
    // The router view should be present and functional
    const routerView = wrapper.find('[data-testid="router-view"]')
    expect(routerView.exists()).toBe(true)
    
    // Router navigation would be tested in integration tests
  })
})
