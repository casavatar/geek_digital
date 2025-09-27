import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders as button by default', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('Click me')
  })

  it('renders as anchor when href is provided', () => {
    const wrapper = mount(Button, {
      props: {
        href: '/test'
      },
      slots: {
        default: 'Link'
      }
    })
    
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/test')
  })

  it('applies correct variant classes', () => {
    const variants = [
      { variant: 'primary', expectedClasses: ['bg-blue-600', 'hover:bg-blue-700', 'text-white'] },
      { variant: 'secondary', expectedClasses: ['bg-gray-600', 'hover:bg-gray-700', 'text-white'] },
      { variant: 'outline', expectedClasses: ['border', 'border-gray-300', 'bg-white'] },
      { variant: 'ghost', expectedClasses: ['text-gray-700', 'hover:bg-gray-100'] },
      { variant: 'danger', expectedClasses: ['bg-red-600', 'hover:bg-red-700', 'text-white'] },
      { variant: 'success', expectedClasses: ['bg-green-600', 'hover:bg-green-700', 'text-white'] }
    ] as const

    variants.forEach(({ variant, expectedClasses }) => {
      const wrapper = mount(Button, {
        props: { variant },
        slots: { default: 'Test' }
      })
      
      expectedClasses.forEach(className => {
        expect(wrapper.classes()).toContain(className)
      })
    })
  })

  it('applies correct size classes', () => {
    const sizes = [
      { size: 'xs', expectedClasses: ['px-2', 'py-1', 'text-xs'] },
      { size: 'sm', expectedClasses: ['px-3', 'py-1.5', 'text-sm'] },
      { size: 'md', expectedClasses: ['px-4', 'py-2', 'text-sm'] },
      { size: 'lg', expectedClasses: ['px-6', 'py-3', 'text-base'] },
      { size: 'xl', expectedClasses: ['px-8', 'py-4', 'text-lg'] }
    ] as const

    sizes.forEach(({ size, expectedClasses }) => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: 'Test' }
      })
      
      expectedClasses.forEach(className => {
        expect(wrapper.classes()).toContain(className)
      })
    })
  })

  it('renders with icon on the left', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'download'
      },
      slots: {
        default: 'Download'
      }
    })
    
    const icon = wrapper.findComponent({ name: 'Icon' })
    expect(icon.exists()).toBe(true)
    expect(icon.props('name')).toBe('download')
    expect(wrapper.text()).toContain('Download')
  })

  it('renders with icon on the right when iconRight is true', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-right',
        iconRight: true
      },
      slots: {
        default: 'Next'
      }
    })
    
    const icon = wrapper.findComponent({ name: 'Icon' })
    expect(icon.exists()).toBe(true)
    expect(icon.props('name')).toBe('arrow-right')
    expect(wrapper.text()).toContain('Next')
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled'
      }
    })
    
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('disabled:opacity-50')
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed')
  })

  it('applies loading state correctly', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'Loading'
      }
    })
    
    expect(wrapper.classes()).toContain('cursor-wait')
  })

  it('applies full width when specified', () => {
    const wrapper = mount(Button, {
      props: {
        fullWidth: true
      },
      slots: {
        default: 'Full Width'
      }
    })
    
    expect(wrapper.classes()).toContain('w-full')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click event when loading', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'Loading'
      }
    })
    
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('sets correct button type', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'submit'
      },
      slots: {
        default: 'Submit'
      }
    })
    
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('passes href attributes to anchor element', () => {
    const wrapper = mount(Button, {
      props: {
        href: '/test',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      slots: {
        default: 'Link'
      }
    })
    
    expect(wrapper.attributes('href')).toBe('/test')
    expect(wrapper.attributes('target')).toBe('_blank')
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
  })

  it('applies correct icon size based on button size', () => {
    const sizeIconMap = [
      { size: 'xs', expectedIconSize: 'xs' },
      { size: 'sm', expectedIconSize: 'sm' },
      { size: 'md', expectedIconSize: 'sm' },
      { size: 'lg', expectedIconSize: 'md' },
      { size: 'xl', expectedIconSize: 'md' }
    ] as const

    sizeIconMap.forEach(({ size, expectedIconSize }) => {
      const wrapper = mount(Button, {
        props: {
          size,
          icon: 'download'
        },
        slots: {
          default: 'Test'
        }
      })
      
      const icon = wrapper.findComponent({ name: 'Icon' })
      expect(icon.props('size')).toBe(expectedIconSize)
    })
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Accessible Button'
      }
    })
    
    expect(wrapper.classes()).toContain('focus:outline-none')
    expect(wrapper.classes()).toContain('focus:ring-2')
    expect(wrapper.classes()).toContain('focus:ring-offset-2')
  })

  it('maintains consistent base classes', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Test'
      }
    })
    
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-lg',
      'transition-all',
      'duration-200'
    ]
    
    baseClasses.forEach(className => {
      expect(wrapper.classes()).toContain(className)
    })
  })
})
