import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageSwitcher from '../LanguageSwitcher.vue'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders without errors', () => {
    const wrapper = mount(LanguageSwitcher)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders language options', () => {
    const wrapper = mount(LanguageSwitcher)
    
    // Check if the dropdown button is rendered
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    
    // Check if the button contains the globe icon
    const globeIcon = wrapper.find('svg')
    expect(globeIcon.exists()).toBe(true)
  })

  it('shows dropdown when clicked', async () => {
    const wrapper = mount(LanguageSwitcher)
    
    // Initially dropdown should be closed
    expect(wrapper.find('.absolute.right-0.mt-2').exists()).toBe(false)
    
    // Click the button to open dropdown
    await wrapper.find('button').trigger('click')
    
    // Dropdown should now be visible
    expect(wrapper.find('.absolute.right-0.mt-2').exists()).toBe(true)
  })

  it('renders language options in dropdown', async () => {
    const wrapper = mount(LanguageSwitcher)
    
    // Open dropdown
    await wrapper.find('button').trigger('click')
    
    // Check if language options are rendered
    const languageButtons = wrapper.findAll('button[role="menuitem"]')
    expect(languageButtons).toHaveLength(2) // English and Spanish
    
    // Check if flags are rendered
    const flags = wrapper.findAll('.text-lg')
    expect(flags).toHaveLength(2)
    expect(flags[0].text()).toBe('🇺🇸')
    expect(flags[1].text()).toBe('🇪🇸')
  })

  it('closes dropdown when clicking outside', async () => {
    const wrapper = mount(LanguageSwitcher)
    
    // Open dropdown
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.absolute.right-0.mt-2').exists()).toBe(true)
    
    // Click outside (backdrop)
    const backdrop = wrapper.find('.fixed.inset-0')
    await backdrop.trigger('click')
    
    // Dropdown should be closed
    expect(wrapper.find('.absolute.right-0.mt-2').exists()).toBe(false)
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(LanguageSwitcher)
    
    const button = wrapper.find('button')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(button.attributes('aria-haspopup')).toBe('true')
  })

  it('updates aria-expanded when dropdown is opened', async () => {
    const wrapper = mount(LanguageSwitcher)
    
    const button = wrapper.find('button')
    expect(button.attributes('aria-expanded')).toBe('false')
    
    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
  })

  it('has proper responsive design classes', () => {
    const wrapper = mount(LanguageSwitcher)
    
    const button = wrapper.find('button')
    expect(button.classes()).toContain('flex')
    expect(button.classes()).toContain('items-center')
    expect(button.classes()).toContain('space-x-2')
  })

  it('maintains consistent styling across different states', async () => {
    const wrapper = mount(LanguageSwitcher)
    
    const button = wrapper.find('button')
    const initialClasses = button.classes()
    
    // Open dropdown
    await button.trigger('click')
    
    // Classes should remain consistent
    expect(button.classes()).toEqual(initialClasses)
  })
})
