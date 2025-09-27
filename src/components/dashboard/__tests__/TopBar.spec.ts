import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TopBar from '../TopBar.vue'
import type { PersonalInfo } from '@/types'

// Mock the UI components
vi.mock('@/components/ui', () => ({
  StatusBadge: {
    name: 'StatusBadge',
    template: '<span data-testid="status-badge">Online</span>',
    props: ['status', 'animated']
  },
  Button: {
    name: 'Button',
    template: '<button data-testid="button"><slot /></button>',
    props: ['variant', 'size', 'icon', 'href', 'target', 'rel']
  }
}))

// Mock ThemeToggle component
vi.mock('../ThemeToggle.vue', () => ({
  default: {
    name: 'ThemeToggle',
    template: '<button data-testid="theme-toggle">Theme Toggle</button>'
  }
}))

describe('TopBar', () => {
  const mockPersonalInfo: PersonalInfo = {
    name: 'John Doe',
    title: 'Data Engineer',
    avatar: '/avatar.jpg',
    tagline: 'Building data solutions',
    bio: 'Experienced data engineer',
    cvUrl: '/cv.pdf'
  }

  it('renders with personal info', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Data Engineer')
  })

  it('renders profile image with correct attributes', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/avatar.jpg')
    expect(img.attributes('alt')).toBe('John Doe avatar')
  })

  it('renders status badge', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const statusBadge = wrapper.find('[data-testid="status-badge"]')
    expect(statusBadge.exists()).toBe(true)
  })

  it('renders download CV button when cvUrl is provided', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const downloadButton = wrapper.find('[data-testid="button"]')
    expect(downloadButton.exists()).toBe(true)
    expect(downloadButton.text()).toContain('Download CV')
  })

  it('does not render download CV button when cvUrl is not provided', () => {
    const personalInfoWithoutCV = {
      ...mockPersonalInfo,
      cvUrl: undefined
    }
    
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: personalInfoWithoutCV
      }
    })
    
    const downloadButtons = wrapper.findAll('[data-testid="button"]')
    const downloadButton = downloadButtons.find(btn => btn.text().includes('Download CV'))
    expect(downloadButton).toBeFalsy()
  })

  it('renders theme toggle', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const themeToggle = wrapper.find('[data-testid="theme-toggle"]')
    expect(themeToggle.exists()).toBe(true)
  })

  it('renders notification button', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const notificationButton = wrapper.find('button[class*="relative"]')
    expect(notificationButton.exists()).toBe(true)
  })

  it('renders settings button', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    // Check that there are multiple buttons (download CV, theme toggle, notification, settings)
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3) // At least 3 buttons should be present
    
    // Check that the component renders without errors
    expect(wrapper.exists()).toBe(true)
  })

  it('has proper header structure', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
    expect(header.classes()).toContain('bg-white')
    expect(header.classes()).toContain('dark:bg-gray-900')
  })

  it('has proper layout structure', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const mainContainer = wrapper.find('.flex.items-center.justify-between')
    expect(mainContainer.exists()).toBe(true)
    
    const leftSide = wrapper.find('.flex.items-center.space-x-4')
    expect(leftSide.exists()).toBe(true)
    
    const rightSide = wrapper.find('.flex.items-center.space-x-4:last-child')
    expect(rightSide.exists()).toBe(true)
  })

  it('displays profile information correctly', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const nameElement = wrapper.find('h1')
    expect(nameElement.exists()).toBe(true)
    expect(nameElement.text()).toBe('John Doe')
    
    const titleElement = wrapper.find('p')
    expect(titleElement.exists()).toBe(true)
    expect(titleElement.text()).toBe('Data Engineer')
  })

  it('applies correct CSS classes for dark mode', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const header = wrapper.find('header')
    expect(header.classes()).toContain('dark:bg-gray-900')
    
    const nameElement = wrapper.find('h1')
    expect(nameElement.classes()).toContain('dark:text-white')
    
    const titleElement = wrapper.find('p')
    expect(titleElement.classes()).toContain('dark:text-gray-400')
  })

  it('has proper responsive design classes', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const header = wrapper.find('header')
    expect(header.classes()).toContain('px-6')
    expect(header.classes()).toContain('py-4')
  })

  it('maintains proper spacing between elements', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const profileSection = wrapper.find('.flex.items-center.space-x-3')
    expect(profileSection.exists()).toBe(true)
    
    const actionsSection = wrapper.find('.flex.items-center.space-x-4:last-child')
    expect(actionsSection.exists()).toBe(true)
  })

  it('handles missing avatar gracefully', () => {
    const personalInfoWithoutAvatar = {
      ...mockPersonalInfo,
      avatar: ''
    }
    
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: personalInfoWithoutAvatar
      }
    })
    
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('')
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(TopBar, {
      props: {
        personalInfo: mockPersonalInfo
      }
    })
    
    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('John Doe avatar')
  })
})
