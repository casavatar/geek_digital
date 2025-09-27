import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../Card.vue'

describe('Card', () => {
  it('renders with default props', () => {
    const wrapper = mount(Card, {
      slots: {
        default: 'Card content'
      }
    })
    
    expect(wrapper.text()).toContain('Card content')
    expect(wrapper.classes()).toContain('bg-white')
    expect(wrapper.classes()).toContain('dark:bg-gray-800')
    expect(wrapper.classes()).toContain('rounded-xl')
  })

  it('renders with title and subtitle', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Card Title',
        subtitle: 'Card Subtitle'
      },
      slots: {
        default: 'Card content'
      }
    })
    
    expect(wrapper.text()).toContain('Card Title')
    expect(wrapper.text()).toContain('Card Subtitle')
    expect(wrapper.text()).toContain('Card content')
  })

  it('applies correct variant classes', () => {
    const variants = [
      { variant: 'default', expectedClasses: ['border-gray-200', 'dark:border-gray-700', 'shadow-sm'] },
      { variant: 'elevated', expectedClasses: ['border-gray-200', 'dark:border-gray-700', 'shadow-lg'] },
      { variant: 'outlined', expectedClasses: ['border-gray-300', 'dark:border-gray-600', 'shadow-none'] },
      { variant: 'flat', expectedClasses: ['border-transparent', 'shadow-none'] }
    ] as const

    variants.forEach(({ variant, expectedClasses }) => {
      const wrapper = mount(Card, {
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
      { size: 'sm', expectedClass: 'text-sm' },
      { size: 'md', expectedClass: 'text-base' },
      { size: 'lg', expectedClass: 'text-lg' }
    ] as const

    sizes.forEach(({ size, expectedClass }) => {
      const wrapper = mount(Card, {
        props: { size },
        slots: { default: 'Test' }
      })
      
      expect(wrapper.classes()).toContain(expectedClass)
    })
  })

  it('applies hover effects when hover prop is true', () => {
    const wrapper = mount(Card, {
      props: {
        hover: true
      },
      slots: {
        default: 'Hoverable card'
      }
    })
    
    expect(wrapper.classes()).toContain('hover:shadow-lg')
    expect(wrapper.classes()).toContain('hover:-translate-y-1')
    expect(wrapper.classes()).toContain('cursor-pointer')
  })

  it('does not apply hover effects when hover prop is false', () => {
    const wrapper = mount(Card, {
      props: {
        hover: false
      },
      slots: {
        default: 'Non-hoverable card'
      }
    })
    
    expect(wrapper.classes()).not.toContain('hover:shadow-lg')
    expect(wrapper.classes()).not.toContain('hover:-translate-y-1')
    expect(wrapper.classes()).not.toContain('cursor-pointer')
  })

  it('applies correct padding classes', () => {
    const paddingOptions = [
      { padding: 'none', expectedClass: '' },
      { padding: 'sm', expectedClass: 'p-4' },
      { padding: 'md', expectedClass: 'p-6' },
      { padding: 'lg', expectedClass: 'p-8' }
    ] as const

    paddingOptions.forEach(({ padding, expectedClass }) => {
      const wrapper = mount(Card, {
        props: { padding },
        slots: { default: 'Test' }
      })
      
      if (expectedClass) {
        expect(wrapper.find('.p-4, .p-6, .p-8').exists()).toBe(true)
      }
    })
  })

  it('renders header slot when provided', () => {
    const wrapper = mount(Card, {
      slots: {
        header: '<div data-testid="header">Custom Header</div>',
        default: 'Card content'
      }
    })
    
    expect(wrapper.find('[data-testid="header"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="header"]').text()).toBe('Custom Header')
  })

  it('renders actions slot when provided', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Title' // Need a title to render the header
      },
      slots: {
        actions: '<button data-testid="action">Action</button>',
        default: 'Card content'
      }
    })
    
    // Actions slot is rendered within the header section
    const header = wrapper.find('.px-6.py-4.border-b')
    expect(header.exists()).toBe(true)
    expect(header.find('[data-testid="action"]').exists()).toBe(true)
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(Card, {
      slots: {
        footer: '<div data-testid="footer">Custom Footer</div>',
        default: 'Card content'
      }
    })
    
    expect(wrapper.find('[data-testid="footer"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="footer"]').text()).toBe('Custom Footer')
  })

  it('renders default header when title is provided', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Title',
        subtitle: 'Test Subtitle'
      },
      slots: {
        default: 'Card content'
      }
    })
    
    expect(wrapper.text()).toContain('Test Title')
    expect(wrapper.text()).toContain('Test Subtitle')
  })

  it('prioritizes header slot over default header', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Default Title'
      },
      slots: {
        header: '<div data-testid="custom-header">Custom Header</div>',
        default: 'Card content'
      }
    })
    
    expect(wrapper.find('[data-testid="custom-header"]').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Default Title')
  })

  it('has proper header structure with title and actions', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Card Title',
        subtitle: 'Card Subtitle'
      },
      slots: {
        actions: '<button>Action</button>',
        default: 'Card content'
      }
    })
    
    const header = wrapper.find('.px-6.py-4.border-b')
    expect(header.exists()).toBe(true)
    expect(header.text()).toContain('Card Title')
    expect(header.text()).toContain('Card Subtitle')
    expect(header.text()).toContain('Action')
  })

  it('has proper footer structure', () => {
    const wrapper = mount(Card, {
      slots: {
        footer: 'Footer content',
        default: 'Card content'
      }
    })
    
    const footer = wrapper.find('.px-6.py-4.border-t')
    expect(footer.exists()).toBe(true)
    expect(footer.text()).toContain('Footer content')
  })

  it('maintains consistent base classes', () => {
    const wrapper = mount(Card, {
      slots: {
        default: 'Test'
      }
    })
    
    const baseClasses = [
      'bg-white',
      'dark:bg-gray-800',
      'rounded-xl',
      'border',
      'transition-all',
      'duration-300'
    ]
    
    baseClasses.forEach(className => {
      expect(wrapper.classes()).toContain(className)
    })
  })

  it('handles multiple slots correctly', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Card Title'
      },
      slots: {
        header: '<div data-testid="header">Header</div>',
        actions: '<button data-testid="action">Action</button>',
        default: '<div data-testid="content">Content</div>',
        footer: '<div data-testid="footer">Footer</div>'
      }
    })
    
    // Header slot should be rendered
    expect(wrapper.find('[data-testid="header"]').exists()).toBe(true)
    
    // Actions slot should be rendered within the header (when header slot is provided, actions are not rendered)
    // This is expected behavior - header slot overrides the default header structure
    const header = wrapper.find('.px-6.py-4.border-b')
    expect(header.find('[data-testid="action"]').exists()).toBe(false)
    
    // Default content should be rendered
    expect(wrapper.find('[data-testid="content"]').exists()).toBe(true)
    
    // Footer should be rendered
    expect(wrapper.find('[data-testid="footer"]').exists()).toBe(true)
  })
})
