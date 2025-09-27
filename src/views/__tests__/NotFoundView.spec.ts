import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '../NotFoundView.vue'

// Create a mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/contact', component: { template: '<div>Contact</div>' } }
  ]
})

describe('NotFoundView', () => {
  const createWrapper = () => {
    return mount(NotFoundView, {
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

  it('renders without errors', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('renders 404 error message', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('404')
    expect(wrapper.text()).toContain('Page Not Found')
  })

  it('renders error description', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('The page you are looking for doesn\'t exist or has been moved.')
  })

  it('renders navigation buttons', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Go Home')
    expect(wrapper.text()).toContain('Analytics')
    expect(wrapper.text()).toContain('Data Engineering')
  })

  it('has proper container structure', () => {
    const wrapper = createWrapper()
    
    const container = wrapper.find('.min-h-screen.flex.items-center.justify-center')
    expect(container.exists()).toBe(true)
  })

  it('applies correct CSS classes', () => {
    const wrapper = createWrapper()
    
    const container = wrapper.find('.min-h-screen.flex.items-center.justify-center')
    expect(container.classes()).toContain('flex')
    expect(container.classes()).toContain('items-center')
    expect(container.classes()).toContain('justify-center')
    expect(container.classes()).toContain('min-h-screen')
  })

  it('has proper responsive design classes', () => {
    const wrapper = createWrapper()
    
    const container = wrapper.find('.min-h-screen.flex.items-center.justify-center')
    expect(container.classes()).toContain('min-h-screen')
    expect(container.classes()).toContain('bg-gray-50')
    expect(container.classes()).toContain('dark:bg-gray-900')
  })

  it('renders 404 with correct styling', () => {
    const wrapper = createWrapper()
    
    const errorCode = wrapper.find('h1')
    expect(errorCode.classes()).toContain('text-9xl')
    expect(errorCode.classes()).toContain('font-bold')
    expect(errorCode.classes()).toContain('text-blue-600')
    expect(errorCode.classes()).toContain('dark:text-blue-400')
  })

  it('renders title with correct styling', () => {
    const wrapper = createWrapper()
    
    const title = wrapper.find('h2')
    expect(title.classes()).toContain('text-2xl')
    expect(title.classes()).toContain('font-semibold')
    expect(title.classes()).toContain('text-gray-900')
    expect(title.classes()).toContain('dark:text-white')
  })

  it('renders description with correct styling', () => {
    const wrapper = createWrapper()
    
    const description = wrapper.find('p')
    expect(description.classes()).toContain('text-gray-600')
    expect(description.classes()).toContain('dark:text-gray-400')
  })

  it('renders navigation buttons with proper styling', () => {
    const wrapper = createWrapper()
    
    const buttonsContainer = wrapper.find('.space-y-4')
    expect(buttonsContainer.exists()).toBe(true)
  })

  it('has proper dark mode support', () => {
    const wrapper = createWrapper()
    
    const errorCode = wrapper.find('h1')
    expect(errorCode.classes()).toContain('dark:text-blue-400')
    
    const title = wrapper.find('h2')
    expect(title.classes()).toContain('dark:text-white')
    
    const description = wrapper.find('p')
    expect(description.classes()).toContain('dark:text-gray-400')
  })

  it('maintains proper spacing between elements', () => {
    const wrapper = createWrapper()
    
    const errorCode = wrapper.find('h1')
    expect(errorCode.classes()).toContain('text-9xl')
    
    const title = wrapper.find('h2')
    expect(title.classes()).toContain('mt-4')
    
    const description = wrapper.find('p')
    expect(description.classes()).toContain('mt-2')
  })

  it('renders router links correctly', () => {
    const wrapper = createWrapper()
    
    // Router-link components render as <a> tags
    const routerLinks = wrapper.findAll('a')
    expect(routerLinks.length).toBe(3) // Go Home, Analytics, Data Engineering
  })
})
