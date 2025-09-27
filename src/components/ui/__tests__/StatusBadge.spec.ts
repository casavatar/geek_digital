import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '../StatusBadge.vue'

describe('StatusBadge', () => {
  it('renders with default props', () => {
    const wrapper = mount(StatusBadge, {
      props: {
        status: 'online'
      }
    })
    
    expect(wrapper.text()).toContain('Online')
    expect(wrapper.find('span').classes()).toContain('inline-flex')
  })

  it('renders correct label for each status', () => {
    const statuses = [
      { status: 'online', expectedLabel: 'Online' },
      { status: 'offline', expectedLabel: 'Offline' },
      { status: 'busy', expectedLabel: 'Busy' },
      { status: 'pending', expectedLabel: 'Pending' },
      { status: 'error', expectedLabel: 'Error' },
      { status: 'success', expectedLabel: 'Success' }
    ]

    statuses.forEach(({ status, expectedLabel }) => {
      const wrapper = mount(StatusBadge, {
        props: { status }
      })
      expect(wrapper.text()).toContain(expectedLabel)
    })
  })

  it('applies correct classes for online status', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'online' }
    })
    
    const badge = wrapper.find('span')
    expect(badge.classes()).toContain('bg-green-50')
    expect(badge.classes()).toContain('text-green-700')
    expect(badge.classes()).toContain('dark:bg-green-900/20')
    expect(badge.classes()).toContain('dark:text-green-400')
  })

  it('applies correct classes for offline status', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'offline' }
    })
    
    const badge = wrapper.find('span')
    expect(badge.classes()).toContain('bg-gray-50')
    expect(badge.classes()).toContain('text-gray-700')
    expect(badge.classes()).toContain('dark:bg-gray-900/20')
    expect(badge.classes()).toContain('dark:text-gray-400')
  })

  it('applies correct classes for error status', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'error' }
    })
    
    const badge = wrapper.find('span')
    expect(badge.classes()).toContain('bg-red-50')
    expect(badge.classes()).toContain('text-red-700')
    expect(badge.classes()).toContain('dark:bg-red-900/20')
    expect(badge.classes()).toContain('dark:text-red-400')
  })

  it('applies correct size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const
    
    sizes.forEach(size => {
      const wrapper = mount(StatusBadge, {
        props: { status: 'online', size }
      })
      
      const badge = wrapper.find('span')
      if (size === 'sm') {
        expect(badge.classes()).toContain('px-2')
        expect(badge.classes()).toContain('py-0.5')
        expect(badge.classes()).toContain('text-xs')
      } else if (size === 'md') {
        expect(badge.classes()).toContain('px-3')
        expect(badge.classes()).toContain('py-1')
        expect(badge.classes()).toContain('text-sm')
      } else if (size === 'lg') {
        expect(badge.classes()).toContain('px-4')
        expect(badge.classes()).toContain('py-1.5')
        expect(badge.classes()).toContain('text-base')
      }
    })
  })

  it('applies animation class when animated is true', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'online', animated: true }
    })
    
    const dot = wrapper.find('.w-2.h-2')
    expect(dot.classes()).toContain('animate-pulse')
  })

  it('does not apply animation class when animated is false', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'online', animated: false }
    })
    
    const dot = wrapper.find('.w-2.h-2')
    expect(dot.classes()).not.toContain('animate-pulse')
  })

  it('applies correct dot color for each status', () => {
    const statuses = [
      { status: 'online', expectedClass: 'bg-green-500' },
      { status: 'offline', expectedClass: 'bg-gray-500' },
      { status: 'busy', expectedClass: 'bg-yellow-500' },
      { status: 'pending', expectedClass: 'bg-blue-500' },
      { status: 'error', expectedClass: 'bg-red-500' },
      { status: 'success', expectedClass: 'bg-green-500' }
    ]

    statuses.forEach(({ status, expectedClass }) => {
      const wrapper = mount(StatusBadge, {
        props: { status }
      })
      
      const dot = wrapper.find('.w-2.h-2')
      expect(dot.classes()).toContain(expectedClass)
    })
  })

  it('renders dot element with correct structure', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'online' }
    })
    
    const dot = wrapper.find('.w-2.h-2')
    expect(dot.exists()).toBe(true)
    expect(dot.classes()).toContain('rounded-full')
    expect(dot.classes()).toContain('mr-2')
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'online' }
    })
    
    const badge = wrapper.find('span')
    expect(badge.attributes('class')).toContain('inline-flex')
    expect(badge.attributes('class')).toContain('items-center')
  })

  it('maintains consistent styling across different statuses', () => {
    const statuses = ['online', 'offline', 'busy', 'pending', 'error', 'success']
    
    statuses.forEach(status => {
      const wrapper = mount(StatusBadge, {
        props: { status }
      })
      
      const badge = wrapper.find('span')
      // All badges should have these base classes
      expect(badge.classes()).toContain('inline-flex')
      expect(badge.classes()).toContain('items-center')
      expect(badge.classes()).toContain('rounded-full')
      expect(badge.classes()).toContain('font-medium')
      expect(badge.classes()).toContain('transition-colors')
      expect(badge.classes()).toContain('duration-200')
    })
  })
})
