import { ref, onMounted, onUnmounted, watch } from 'vue'

export function useScrollAnimation(options: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
} = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options

  const isVisible = ref(false)
  const elementRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  const createObserver = () => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      return null
    }

    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            // Unobserve after animation to prevent re-triggering if triggerOnce is true
            if (triggerOnce && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            isVisible.value = false
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )
  }

  const startObserving = () => {
    if (elementRef.value && observer) {
      observer.observe(elementRef.value)
    }
  }

  const stopObserving = () => {
    if (elementRef.value && observer) {
      observer.unobserve(elementRef.value)
    }
  }

  const disconnectObserver = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  // Watch for elementRef changes and start/stop observing accordingly
  watch(elementRef, (newElement, oldElement) => {
    if (oldElement && observer) {
      observer.unobserve(oldElement)
    }
    if (newElement && observer) {
      observer.observe(newElement)
    }
  })

  onMounted(() => {
    observer = createObserver()
    startObserving()
  })

  onUnmounted(() => {
    stopObserving()
    disconnectObserver()
  })

  return {
    isVisible,
    elementRef
  }
}
