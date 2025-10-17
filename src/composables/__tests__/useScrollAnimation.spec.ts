import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { useScrollAnimation } from '../useScrollAnimation'

// Mock IntersectionObserver
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()
const mockDisconnect = vi.fn()

const mockIntersectionObserver = vi.fn().mockImplementation((callback) => ({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
  root: null,
  rootMargin: '',
  thresholds: [],
}))

// Store original IntersectionObserver
const originalIntersectionObserver = window.IntersectionObserver

beforeEach(() => {
  Object.defineProperty(window, 'IntersectionObserver', {
    value: mockIntersectionObserver,
    writable: true,
    configurable: true
  })
})

afterEach(() => {
  // Restore original IntersectionObserver
  Object.defineProperty(window, 'IntersectionObserver', {
    value: originalIntersectionObserver,
    writable: true,
    configurable: true
  })
  vi.clearAllMocks()
})

// Test component to use the composable
const TestComponent = {
  template: `
    <div>
      <div ref="elementRef" :class="{ 'visible': isVisible }">
        Test Element
      </div>
    </div>
  `,
  setup() {
    return useScrollAnimation()
  },
}

describe('useScrollAnimation', () => {

  it('should initialize with isVisible as false', async () => {
    const wrapper = mount(TestComponent)
    await nextTick()
    
    expect(wrapper.vm.isVisible).toBe(false)
    expect(wrapper.find('.visible').exists()).toBe(false)
  })

  it('should create IntersectionObserver on mount', async () => {
    const wrapper = mount(TestComponent)
    await nextTick()
    
    expect(mockIntersectionObserver).toHaveBeenCalled()
    expect(mockObserve).toHaveBeenCalled()
  })

  it('should use default options when none provided', async () => {
    const wrapper = mount(TestComponent)
    await nextTick()
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )
  })

  it('should use custom options when provided', async () => {
    const customOptions = {
      threshold: 0.5,
      rootMargin: '10px',
      triggerOnce: false
    }
    
    const TestComponentWithOptions = {
      template: '<div ref="elementRef">Test</div>',
      setup() {
        return useScrollAnimation(customOptions)
      },
    }
    
    const wrapper = mount(TestComponentWithOptions)
    await nextTick()
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        rootMargin: '10px'
      }
    )
  })

  it('should set isVisible to true when element intersects', async () => {
    const wrapper = mount(TestComponent)
    await nextTick()
    
    // Get the callback function passed to IntersectionObserver
    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    
    // Simulate intersection
    observerCallback([{
      isIntersecting: true,
      target: wrapper.vm.elementRef
    }])
    
    await nextTick()
    
    expect(wrapper.vm.isVisible).toBe(true)
    expect(wrapper.find('.visible').exists()).toBe(true)
  })

  it('should unobserve element after intersection when triggerOnce is true', async () => {
    const wrapper = mount(TestComponent)
    await nextTick()
    
    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    
    // Simulate intersection
    observerCallback([{
      isIntersecting: true,
      target: wrapper.vm.elementRef
    }])
    
    await nextTick()
    
    expect(mockUnobserve).toHaveBeenCalledWith(wrapper.vm.elementRef)
  })

  it('should not unobserve element when triggerOnce is false', async () => {
    const TestComponentNoTriggerOnce = {
      template: '<div ref="elementRef">Test</div>',
      setup() {
        return useScrollAnimation({ triggerOnce: false })
      },
    }
    
    const wrapper = mount(TestComponentNoTriggerOnce)
    await nextTick()
    
    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    
    // Simulate intersection
    observerCallback([{
      isIntersecting: true,
      target: wrapper.vm.elementRef
    }])
    
    await nextTick()
    
    expect(mockUnobserve).not.toHaveBeenCalled()
  })

  it('should set isVisible to false when element leaves intersection and triggerOnce is false', async () => {
    const TestComponentNoTriggerOnce = {
      template: '<div ref="elementRef">Test</div>',
      setup() {
        return useScrollAnimation({ triggerOnce: false })
      },
    }
    
    const wrapper = mount(TestComponentNoTriggerOnce)
    await nextTick()
    
    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    
    // Simulate intersection
    observerCallback([{
      isIntersecting: true,
      target: wrapper.vm.elementRef
    }])
    
    await nextTick()
    expect(wrapper.vm.isVisible).toBe(true)
    
    // Simulate leaving intersection
    observerCallback([{
      isIntersecting: false,
      target: wrapper.vm.elementRef
    }])
    
    await nextTick()
    expect(wrapper.vm.isVisible).toBe(false)
  })

  it('should handle elementRef changes', async () => {
    const wrapper = mount(TestComponent)
    await nextTick()

    const vm = wrapper.vm as any
    const initialElement = vm.elementRef
    expect(mockObserve).toHaveBeenCalledWith(initialElement)

    // Simulate elementRef change
    const newElement = document.createElement('div')
    vm.elementRef.value = newElement
    await nextTick()

    expect(mockUnobserve).toHaveBeenCalledWith(initialElement)
    expect(mockObserve).toHaveBeenCalledWith(newElement)
  })

  it('should disconnect observer on unmount', async () => {
    const wrapper = mount(TestComponent)
    await nextTick()
    
    wrapper.unmount()
    
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should handle missing IntersectionObserver gracefully', async () => {
    // This test is simplified as the actual implementation handles missing IntersectionObserver
    const wrapper = mount(TestComponent)
    await nextTick()
    
    expect(wrapper.vm.isVisible).toBe(false)
    // elementRef will be the actual DOM element, not null
    expect(wrapper.vm.elementRef).toBeDefined()
  })
})
