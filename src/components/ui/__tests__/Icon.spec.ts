import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from '../Icon.vue'

describe('Icon', () => {
  it('renders with default props', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home'
      }
    })
    
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('svg').classes()).toContain('w-5')
    expect(wrapper.find('svg').classes()).toContain('h-5')
  })

  it('renders correct SVG for home icon', () => {
    const wrapper = mount(Icon, {
      props: { name: 'home' }
    })
    
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('viewBox')).toBe('0 0 24 24')
    expect(svg.attributes('fill')).toBe('none')
    expect(svg.attributes('stroke')).toBe('currentColor')
  })

  it('applies correct size classes', () => {
    const sizes = [
      { size: 'xs', expectedClasses: ['w-3', 'h-3'] },
      { size: 'sm', expectedClasses: ['w-4', 'h-4'] },
      { size: 'md', expectedClasses: ['w-5', 'h-5'] },
      { size: 'lg', expectedClasses: ['w-6', 'h-6'] },
      { size: 'xl', expectedClasses: ['w-8', 'h-8'] }
    ] as const

    sizes.forEach(({ size, expectedClasses }) => {
      const wrapper = mount(Icon, {
        props: { name: 'home', size }
      })
      
      const svg = wrapper.find('svg')
      expectedClasses.forEach(className => {
        expect(svg.classes()).toContain(className)
      })
    })
  })

  it('applies custom class when provided', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home',
        class: 'text-blue-500 custom-class'
      }
    })
    
    const svg = wrapper.find('svg')
    expect(svg.classes()).toContain('text-blue-500')
    expect(svg.classes()).toContain('custom-class')
  })

  it('renders different icons correctly', () => {
    const icons = [
      'home', 'chart-bar', 'chart-line', 'document-text', 'cog',
      'lightning-bolt', 'cube', 'chevron-down', 'menu', 'close',
      'sun', 'moon', 'download', 'email', 'arrow-right', 'search',
      'filter', 'bell', 'user', 'users', 'database', 'server',
      'cloud', 'link', 'external-link', 'check', 'x', 'plus',
      'minus', 'edit', 'trash', 'eye', 'eye-off'
    ]

    icons.forEach(iconName => {
      const wrapper = mount(Icon, {
        props: { name: iconName }
      })
      
      const svg = wrapper.find('svg')
      expect(svg.exists()).toBe(true)
      expect(svg.find('path').exists()).toBe(true)
    })
  })

  it('renders fallback icon for unknown icon name', () => {
    const wrapper = mount(Icon, {
      props: { name: 'unknown-icon' }
    })
    
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.find('path').exists()).toBe(true)
  })

  it('has proper SVG attributes', () => {
    const wrapper = mount(Icon, {
      props: { name: 'home' }
    })
    
    const svg = wrapper.find('svg')
    expect(svg.attributes('viewBox')).toBe('0 0 24 24')
    expect(svg.attributes('fill')).toBe('none')
    expect(svg.attributes('stroke')).toBe('currentColor')
    expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
  })

  it('renders path elements with correct attributes', () => {
    const wrapper = mount(Icon, {
      props: { name: 'home' }
    })
    
    const path = wrapper.find('path')
    expect(path.exists()).toBe(true)
    expect(path.attributes('stroke-linecap')).toBe('round')
    expect(path.attributes('stroke-linejoin')).toBe('round')
    expect(path.attributes('stroke-width')).toBe('2')
    expect(path.attributes('d')).toBeDefined()
  })

  it('combines size and custom classes correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home',
        size: 'lg',
        class: 'text-red-500'
      }
    })
    
    const svg = wrapper.find('svg')
    expect(svg.classes()).toContain('w-6')
    expect(svg.classes()).toContain('h-6')
    expect(svg.classes()).toContain('text-red-500')
  })

  it('handles empty class prop', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home',
        class: ''
      }
    })
    
    const svg = wrapper.find('svg')
    expect(svg.classes()).toContain('w-5')
    expect(svg.classes()).toContain('h-5')
  })

  it('maintains consistent structure across different icons', () => {
    const iconNames = ['home', 'chart-bar', 'download', 'user']
    
    iconNames.forEach(iconName => {
      const wrapper = mount(Icon, {
        props: { name: iconName }
      })
      
      const svg = wrapper.find('svg')
      expect(svg.attributes('viewBox')).toBe('0 0 24 24')
      expect(svg.attributes('fill')).toBe('none')
      expect(svg.attributes('stroke')).toBe('currentColor')
      
      const path = svg.find('path')
      expect(path.exists()).toBe(true)
      expect(path.attributes('stroke-linecap')).toBe('round')
      expect(path.attributes('stroke-linejoin')).toBe('round')
      expect(path.attributes('stroke-width')).toBe('2')
    })
  })
})
