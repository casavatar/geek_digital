<!--
  BaseModal.vue - Reusable Modal Component

  A highly responsive, accessible modal component following Vue 3 and TailwindCSS best practices.

  Props:
    - isOpen (boolean, required): Controls modal visibility
    - title (string, optional): Modal title for ARIA labeling
    - size ('sm' | 'md' | 'lg' | 'xl' | 'screen', default: 'lg'): Modal width
      - sm: 50% viewport width (max-w-[50vw])
      - md: 60% viewport width (max-w-[60vw])
      - lg: 75% viewport width (max-w-[75vw]) - Default
      - xl: 90% viewport width (max-w-[90vw])
      - screen: Full screen modal
    - maxHeight (string, default: '90vh'): Maximum modal height
    - closeOnBackdrop (boolean, default: true): Close modal when clicking backdrop
    - showCloseButton (boolean, default: true): Show close button in top-right

  Emits:
    - close: Emitted when modal should close
    - opened: Emitted after modal animation completes
    - closed: Emitted after modal close animation completes

  Slots:
    - header: Custom header content (overrides title prop)
    - default: Main modal body content
    - footer: Footer content for actions/buttons

  Features:
    ✅ Responsive sizing (75% on desktop, 100% on mobile)
    ✅ Smooth enter/leave animations with spring-like easing
    ✅ Body scroll lock when modal is open
    ✅ Keyboard accessibility (ESC to close)
    ✅ Focus trap and focus restoration
    ✅ ARIA compliant (role="dialog", aria-modal="true")
    ✅ Teleport to body for proper stacking
    ✅ Customizable max-height with scrollable content

  Usage Example:
    <BaseModal
      :is-open="isModalOpen"
      title="Service Details"
      size="lg"
      @close="closeModal"
    >
      <template #header>
        <div class="custom-header">...</div>
      </template>

      <div>Modal body content</div>

      <template #footer>
        <button @click="closeModal">Close</button>
      </template>
    </BaseModal>
-->

<template>
    <Teleport to="body">
        <Transition name="modal" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave"
            @after-leave="onAfterLeave">
            <div v-if="isOpen" ref="modalContainer"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" :class="sizeClasses.container"
                @click.self="handleBackdropClick" @keydown.esc="handleEscapeKey" role="dialog" aria-modal="true"
                :aria-labelledby="titleId">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
                    @click="handleBackdropClick"></div>

                <!-- Modal Content -->
                <div ref="modalContent"
                    class="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl backdrop-saturate-150 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transform"
                    :class="[sizeClasses.content, heightClasses]" :style="{ maxHeight }">
                    <!-- Close Button -->
                    <button v-if="showCloseButton" @click="close"
                        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-600/90 transition-all duration-200 shadow-md hover:shadow-lg ring-2 ring-gray-200/50 dark:ring-gray-600/50 hover:ring-gray-300/70 dark:hover:ring-gray-500/70 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                        aria-label="Close modal" type="button">
                        <svg class="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <!-- Header Slot or Default Title -->
                    <div v-if="$slots.header || title"
                        class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-3xl">
                        <slot name="header">
                            <h3 :id="titleId" class="text-2xl font-semibold text-white/90">
                                {{ title }}
                            </h3>
                        </slot>
                    </div>

                    <!-- Body Content -->
                    <div class="overflow-y-auto" :class="bodyClasses" :style="{ maxHeight: bodyMaxHeight }">
                        <slot></slot>
                    </div>

                    <!-- Footer Slot -->
                    <div v-if="$slots.footer"
                        class="p-6 border-t border-gray-200 dark:border-gray-700 rounded-b-3xl bg-gray-50/50 dark:bg-gray-900/50">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'screen'

interface Props {
    isOpen: boolean
    title?: string
    size?: ModalSize
    maxHeight?: string
    closeOnBackdrop?: boolean
    showCloseButton?: boolean
}

interface Emits {
    (e: 'close'): void
    (e: 'opened'): void
    (e: 'closed'): void
}

const props = withDefaults(defineProps<Props>(), {
    size: 'lg',
    maxHeight: '90vh',
    closeOnBackdrop: true,
    showCloseButton: true,
})

const emit = defineEmits<Emits>()

// Refs
const modalContainer = ref<HTMLElement | null>(null)
const modalContent = ref<HTMLElement | null>(null)
const previousActiveElement = ref<HTMLElement | null>(null)

// Generate unique ID for ARIA labeling
const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)

/**
 * Size class mappings for responsive modal widths
 * Updated to use fluid viewport-based sizing for better responsiveness
 */
const sizeClasses = computed(() => {
    const sizeMap = {
        sm: {
            container: 'px-4 sm:px-6',
            content: 'w-full sm:max-w-[50vw] max-w-full',
        },
        md: {
            container: 'px-4 sm:px-6',
            content: 'w-full sm:max-w-[60vw] max-w-full',
        },
        lg: {
            container: 'px-4 sm:px-6',
            content: 'max-w-[75vw] w-3/4 sm:w-[90vw] md:w-[80vw] lg:w-[75vw]',
        },
        xl: {
            container: 'px-4 sm:px-6',
            content: 'w-full sm:max-w-[90vw] max-w-full',
        },
        screen: {
            container: 'p-0',
            content: 'w-full h-full rounded-none',
        },
    }
    return sizeMap[props.size]
})

/**
 * Height and scroll classes
 */
const heightClasses = computed(() => {
    if (props.size === 'screen') {
        return 'h-full overflow-y-auto'
    }
    return 'max-h-[90vh] overflow-hidden'
})

const bodyClasses = computed(() => {
    if (props.size === 'screen') {
        return 'flex-1 h-full'
    }
    return ''
})

const bodyMaxHeight = computed(() => {
    if (props.size === 'screen') {
        return 'none'
    }
    return props.maxHeight
})

/**
 * Close modal handler
 */
const close = () => {
    emit('close')
}

/**
 * Handle backdrop click
 */
const handleBackdropClick = () => {
    if (props.closeOnBackdrop) {
        close()
    }
}

/**
 * Handle ESC key press
 */
const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        close()
    }
}

/**
 * Body scroll lock management
 */
const lockBodyScroll = () => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
    }
}

const unlockBodyScroll = () => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
}

/**
 * Focus management for accessibility
 */
const trapFocus = () => {
    if (!modalContent.value) return

    const focusableElements = modalContent.value.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement?.focus()
                e.preventDefault()
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement?.focus()
                e.preventDefault()
            }
        }
    }

    modalContainer.value?.addEventListener('keydown', handleTabKey)

    // Focus first focusable element
    nextTick(() => {
        firstElement?.focus()
    })

    return () => {
        modalContainer.value?.removeEventListener('keydown', handleTabKey)
    }
}

/**
 * Animation hooks for smooth modal transitions
 * Using custom easing for spring-like effect
 */
const onEnter = (el: Element) => {
    const element = el as HTMLElement
    const content = element.querySelector('[class*="relative"]') as HTMLElement

    if (content) {
        content.style.opacity = '0'
        content.style.transform = 'scale(0.95) translateY(-20px)'

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                content.style.transition =
                    'opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                content.style.opacity = '1'
                content.style.transform = 'scale(1) translateY(0)'
            })
        })
    }
}

const onAfterEnter = () => {
    emit('opened')
}

const onLeave = (el: Element) => {
    const element = el as HTMLElement
    const content = element.querySelector('[class*="relative"]') as HTMLElement

    if (content) {
        content.style.transition =
            'opacity 0.3s cubic-bezier(0.4, 0, 1, 1), transform 0.3s cubic-bezier(0.4, 0, 1, 1)'
        content.style.opacity = '0'
        content.style.transform = 'scale(0.95) translateY(-20px)'
    }
}

const onAfterLeave = () => {
    emit('closed')
}

/**
 * Watch for modal open/close state changes
 */
watch(
    () => props.isOpen,
    (newValue) => {
        if (newValue) {
            // Store currently focused element
            previousActiveElement.value = document.activeElement as HTMLElement

            // Lock body scroll
            lockBodyScroll()

            // Set up focus trap
            nextTick(() => {
                trapFocus()
            })
        } else {
            // Unlock body scroll
            unlockBodyScroll()

            // Restore focus to previously focused element
            nextTick(() => {
                previousActiveElement.value?.focus()
            })
        }
    }
)

/**
 * Cleanup on unmount
 */
onUnmounted(() => {
    if (props.isOpen) {
        unlockBodyScroll()
    }
})

/**
 * Ensure scroll is unlocked on mount if component is unmounted while open
 */
onMounted(() => {
    if (props.isOpen) {
        lockBodyScroll()
    }
})
</script>

<style scoped>
/**
 * Modal animations with enhanced transitions
 */
.modal-enter-active {
    transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-leave-active {
    transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

/**
 * Backdrop fade animation
 */
.modal-enter-active .absolute,
.modal-leave-active .absolute {
    transition: opacity 0.4s ease;
}

/**
 * Custom scrollbar styling for modal content
 */
.overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgb(59 130 246) rgb(243 244 246);
}

.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: rgb(243 244 246);
    border-radius: 4px;
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
    background: rgb(31 41 55);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgb(59 130 246);
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgb(37 99 235);
}

/**
 * Prevent background scroll on mobile
 */
body:has(.modal-enter-active),
body:has([role="dialog"][aria-modal="true"]) {
    overflow: hidden;
}
</style>
