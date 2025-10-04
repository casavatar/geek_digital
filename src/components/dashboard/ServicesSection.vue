<template>
  <div class="dashboard-card p-8 py-8">
    <!-- Section Header -->
    <div class="text-center mb-12 py-6">
      <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 py-2">
        {{ $t('services.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto py-2">
        {{ $t('services.subtitle') }}
      </p>
    </div>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
      <div
        v-for="service in services"
        :key="service.id"
        class="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 py-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <!-- Service Icon -->
        <div
          class="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 py-2 group-hover:scale-110 transition-transform duration-300"
        >
          <div class="w-8 h-8 text-blue-600 dark:text-blue-400 py-1">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.icon"></svg>
          </div>
        </div>

        <!-- Service Content -->
        <div class="space-y-4 py-3">
          <h3
            class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 py-1"
          >
            {{ service.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed py-1">
            {{ service.description }}
          </p>
        </div>

        <!-- Hover Effect Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        ></div>

        <!-- Learn More Link -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 py-2">
          <button
            @click="openModal(service)"
            class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 group-hover:translate-x-1 transform transition-transform duration-200"
          >
            <span>Learn more</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-12 text-center py-6">
      <div
        class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 py-8 border border-blue-200 dark:border-blue-800"
      >
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 py-2">
          {{ $t('services.cta') }}
        </h3>
        <div class="flex flex-col sm:flex-row gap-4 justify-center py-3">
          <a
            href="mailto:your.email@example.com"
            class="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Get in Touch</span>
          </a>
          <a
            v-if="personalInfo.cvUrl"
            :href="personalInfo.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/30 focus:ring-offset-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>View Portfolio</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal" @enter="onEnter" @leave="onLeave">
        <div
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>

          <!-- Modal Content -->
          <div
            class="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="selectedService?.id + '-modal-title'"
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Close modal"
            >
              <svg
                class="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <!-- Modal Header -->
            <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-t-3xl">
              <div class="flex items-start space-x-68">
                <div
                  class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0"
                >
                  <div class="w-8 h-8 text-white">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      v-html="selectedService?.icon"
                    ></svg>
                  </div>
                </div>
                <div class="flex-1 pt-1 pl-3">
                  <h3
                    :id="selectedService?.id + '-modal-title'"
                    class="text-3xl font-bold text-white mb-3"
                  >
                    {{ selectedService?.title }}
                  </h3>
                  <p class="text-blue-100 leading-relaxed">
                    {{ selectedService?.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Modal Body -->
            <div class="p-8 space-y-8">
              <!-- Business Impact Section -->
              <section>
                <h4
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center pb-4"
                >
                  <svg
                    class="w-6 h-6 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  Business Impact
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    v-for="(metric, index) in getServiceMetrics(selectedService?.id)"
                    :key="index"
                    class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800 transform hover:scale-105 transition-transform duration-300"
                    :style="{ animationDelay: `${index * 100}ms` }"
                  >
                    <div class="flex items-start space-x-4">
                      <div class="flex-shrink-0 pr-3">
                        <div
                          class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center"
                        >
                          <span class="text-2xl">{{ metric.icon }}</span>
                        </div>
                      </div>
                      <div class="flex-1">
                        <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {{ metric.value }}
                        </div>
                        <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {{ metric.label }}
                        </div>
                        <div class="text-xs text-gray-600 dark:text-gray-400">
                          {{ metric.description }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Key Benefits -->
              <section>
                <h4
                  class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center pt-6 pb-4"
                >
                  <svg
                    class="w-6 h-6 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Key Benefits
                </h4>
                <ul class="space-y-3">
                  <li
                    v-for="(benefit, index) in getServiceBenefits(selectedService?.id)"
                    :key="index"
                    class="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <svg
                      class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span class="text-gray-700 dark:text-gray-300">{{ benefit }}</span>
                  </li>
                </ul>
              </section>

              <!-- CTA Button -->
              <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  @click="closeModal"
                  class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started with This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PersonalInfo } from '@/types'

/**
 * Service interface
 */
interface Service {
  id: string
  title: string
  description: string
  icon: string
}

/**
 * Business metric interface for modal display
 */
interface BusinessMetric {
  icon: string
  value: string
  label: string
  description: string
}

interface Props {
  personalInfo: PersonalInfo
}

defineProps<Props>()
const { t } = useI18n()

// Modal state management
const isModalOpen = ref(false)
const selectedService = ref<Service | null>(null)

/**
 * Services configuration with i18n integration
 */
const services = computed<Service[]>(() => [
  {
    id: 'data-pipeline',
    title: t('services.dataPipelines.title'),
    description: t('services.dataPipelines.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />',
  },
  {
    id: 'dashboard-design',
    title: t('services.dashboardDesign.title'),
    description: t('services.dashboardDesign.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />',
  },
  {
    id: 'etl-automation',
    title: t('services.etlAutomation.title'),
    description: t('services.etlAutomation.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />',
  },
  {
    id: 'data-visualization',
    title: t('services.dataVisualization.title'),
    description: t('services.dataVisualization.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />',
  },
  {
    id: 'cloud-migration',
    title: t('services.cloudMigration.title'),
    description: t('services.cloudMigration.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />',
  },
  {
    id: 'data-quality',
    title: t('services.dataQuality.title'),
    description: t('services.dataQuality.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />',
  },
])

/**
 * Modal control methods
 */
const openModal = (service: Service) => {
  selectedService.value = service
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
  setTimeout(() => {
    selectedService.value = null
  }, 300)
}

/**
 * Animation hooks for smooth modal transitions
 * Using custom easing for spring-like effect
 */
const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.transform = 'scale(0.95) translateY(-20px)'

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.transition =
        'opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
      element.style.opacity = '1'
      element.style.transform = 'scale(1) translateY(0)'
    })
  })
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.transition =
    'opacity 0.3s cubic-bezier(0.4, 0, 1, 1), transform 0.3s cubic-bezier(0.4, 0, 1, 1)'
  element.style.opacity = '0'
  element.style.transform = 'scale(0.95) translateY(-20px)'
}

/**
 * Business metrics data for each service
 * Displays real business impact with percentages and improvements
 */
const getServiceMetrics = (serviceId: string | undefined): BusinessMetric[] => {
  const metricsMap: Record<string, BusinessMetric[]> = {
    'data-pipeline': [
      {
        icon: '⚡',
        value: '+65%',
        label: 'Processing Speed',
        description: 'Faster data processing and transformation',
      },
      {
        icon: '💰',
        value: '-40%',
        label: 'Infrastructure Costs',
        description: 'Reduced cloud and maintenance expenses',
      },
      {
        icon: '📊',
        value: '+80%',
        label: 'Data Quality',
        description: 'Improved accuracy and consistency',
      },
      {
        icon: '⏱️',
        value: '-70%',
        label: 'Manual Work',
        description: 'Automated repetitive tasks',
      },
    ],
    'dashboard-design': [
      {
        icon: '👁️',
        value: '+90%',
        label: 'Data Visibility',
        description: 'Real-time insights at a glance',
      },
      {
        icon: '🎯',
        value: '+55%',
        label: 'Decision Speed',
        description: 'Faster strategic decisions',
      },
      {
        icon: '📈',
        value: '+45%',
        label: 'Team Productivity',
        description: 'Streamlined reporting workflows',
      },
      {
        icon: '🔄',
        value: '24/7',
        label: 'Monitoring',
        description: 'Continuous business metrics tracking',
      },
    ],
    'etl-automation': [
      {
        icon: '🤖',
        value: '+85%',
        label: 'Automation Rate',
        description: 'Reduced manual data handling',
      },
      {
        icon: '✅',
        value: '+95%',
        label: 'Data Accuracy',
        description: 'Minimized human errors',
      },
      {
        icon: '⏰',
        value: '-60%',
        label: 'Processing Time',
        description: 'Faster ETL workflows',
      },
      {
        icon: '💎',
        value: '+75%',
        label: 'Resource Efficiency',
        description: 'Optimized system utilization',
      },
    ],
    'data-visualization': [
      {
        icon: '🎨',
        value: '+100%',
        label: 'Data Comprehension',
        description: 'Complex data made simple',
      },
      {
        icon: '💡',
        value: '+70%',
        label: 'Insight Discovery',
        description: 'Uncover hidden patterns',
      },
      {
        icon: '🤝',
        value: '+50%',
        label: 'Stakeholder Engagement',
        description: 'Better communication',
      },
      {
        icon: '📱',
        value: 'Multi-device',
        label: 'Accessibility',
        description: 'Access insights anywhere',
      },
    ],
    'cloud-migration': [
      {
        icon: '☁️',
        value: '+99.9%',
        label: 'Uptime',
        description: 'Enterprise-grade reliability',
      },
      {
        icon: '🚀',
        value: '+120%',
        label: 'Scalability',
        description: 'Grow without limits',
      },
      {
        icon: '💵',
        value: '-35%',
        label: 'Operating Costs',
        description: 'Pay only for what you use',
      },
      {
        icon: '🔒',
        value: '+80%',
        label: 'Security',
        description: 'Enhanced data protection',
      },
    ],
    'data-quality': [
      {
        icon: '✨',
        value: '+92%',
        label: 'Data Accuracy',
        description: 'Clean, reliable data',
      },
      {
        icon: '🎯',
        value: '+88%',
        label: 'Compliance Rate',
        description: 'Meet regulatory standards',
      },
      {
        icon: '🔍',
        value: '-75%',
        label: 'Error Detection Time',
        description: 'Proactive issue identification',
      },
      {
        icon: '💼',
        value: '+60%',
        label: 'Business Trust',
        description: 'Confidence in data-driven decisions',
      },
    ],
  }
  return metricsMap[serviceId || ''] || []
}

/**
 * Key benefits for each service
 * Provides detailed feature list for modal display
 */
const getServiceBenefits = (serviceId: string | undefined): string[] => {
  const benefitsMap: Record<string, string[]> = {
    'data-pipeline': [
      'Automated data ingestion from multiple sources',
      'Real-time data synchronization and updates',
      'Scalable architecture for growing data volumes',
      'Built-in error handling and monitoring',
      'Reduced manual intervention and human errors',
    ],
    'dashboard-design': [
      'Customizable KPI tracking and visualization',
      'Interactive charts and real-time updates',
      'Mobile-responsive design for on-the-go access',
      'Role-based access control and permissions',
      'Export capabilities for reports and presentations',
    ],
    'etl-automation': [
      'Scheduled and event-driven data processing',
      'Data validation and quality checks',
      'Version control and audit trails',
      'Integration with existing systems and tools',
      'Comprehensive logging and error notifications',
    ],
    'data-visualization': [
      'Advanced charting libraries and custom visuals',
      'Interactive filtering and drill-down capabilities',
      'Storytelling with data narratives',
      'Color-blind friendly palettes and accessibility',
      'Export to multiple formats (PDF, PNG, SVG)',
    ],
    'cloud-migration': [
      'Zero-downtime migration strategies',
      'Cost optimization and resource management',
      'Automated backup and disaster recovery',
      'Global content delivery and low latency',
      'Seamless integration with cloud services',
    ],
    'data-quality': [
      'Automated data profiling and anomaly detection',
      'Data standardization and normalization',
      'Duplicate detection and deduplication',
      'Master data management (MDM) integration',
      'Continuous monitoring and quality metrics',
    ],
  }
  return benefitsMap[serviceId || ''] || []
}
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
 * Modal content slide and scale animation
 */
@keyframes modal-slide-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modal-slide-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
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
</style>
