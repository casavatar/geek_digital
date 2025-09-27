import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

// Mock child components
vi.mock('@/components/dashboard/UserProfile.vue', () => ({
  default: {
    name: 'UserProfile',
    template: '<div data-testid="user-profile">User Profile</div>'
  }
}))

vi.mock('@/components/dashboard/ServicesSection.vue', () => ({
  default: {
    name: 'ServicesSection',
    template: '<div data-testid="services-section">Services Section</div>'
  }
}))

vi.mock('@/components/dashboard/ContactSection.vue', () => ({
  default: {
    name: 'ContactSection',
    template: '<div data-testid="contact-section">Contact Section</div>'
  }
}))

vi.mock('@/components/dashboard/ScheduleMeeting.vue', () => ({
  default: {
    name: 'ScheduleMeeting',
    template: '<div data-testid="schedule-meeting">Schedule Meeting</div>'
  }
}))

describe('HomeView', () => {
  it('renders without errors', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders all main sections', () => {
    const wrapper = mount(HomeView)
    
    expect(wrapper.find('[data-testid="user-profile"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="services-section"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="contact-section"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="schedule-meeting"]').exists()).toBe(true)
  })

  it('has proper container structure', () => {
    const wrapper = mount(HomeView)
    
    const container = wrapper.find('.space-y-16')
    expect(container.exists()).toBe(true)
  })

  it('has proper spacing between sections', () => {
    const wrapper = mount(HomeView)
    
    const sections = wrapper.findAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(HomeView)
    
    const container = wrapper.find('.space-y-16')
    expect(container.classes()).toContain('space-y-16')
  })

  it('renders child components in correct order', () => {
    const wrapper = mount(HomeView)
    
    const userProfile = wrapper.find('[data-testid="user-profile"]')
    const servicesSection = wrapper.find('[data-testid="services-section"]')
    const contactSection = wrapper.find('[data-testid="contact-section"]')
    const scheduleMeeting = wrapper.find('[data-testid="schedule-meeting"]')
    
    // Check that components are rendered in the expected order
    expect(userProfile.element.compareDocumentPosition(servicesSection.element)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(servicesSection.element.compareDocumentPosition(contactSection.element)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
    expect(contactSection.element.compareDocumentPosition(scheduleMeeting.element)).toBe(Node.DOCUMENT_POSITION_FOLLOWING)
  })

  it('has proper responsive design classes', () => {
    const wrapper = mount(HomeView)
    
    const welcomeHeader = wrapper.find('.text-center')
    expect(welcomeHeader.exists()).toBe(true)
  })

  it('maintains proper layout structure', () => {
    const wrapper = mount(HomeView)
    
    const mainContainer = wrapper.find('.space-y-16')
    expect(mainContainer.exists()).toBe(true)
  })
})
