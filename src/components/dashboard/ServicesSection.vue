<template>
  <div class="dashboard-card p-8 py-8">
    <!-- Section Header -->
    <div class="flex flex-col items-center text-center mb-12 py-4 space-y-4">
      <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
        {{ $t('services.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-4xl px-4 leading-relaxed py-2">
        {{ $t('services.subtitle') }}
      </p>
    </div>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
      <div v-for="service in services" :key="service.id"
        class="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 py-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-500/20 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer hover:border-blue-400/80 dark:hover:border-blue-500/80 hover:ring-2 hover:ring-blue-400/50 dark:hover:ring-blue-500/50 hover:ring-offset-2 hover:ring-offset-white/50 dark:hover:ring-offset-gray-900/50">
        <!-- Service Icon -->
        <div
          class="w-16 h-16 bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-blue-900/40 dark:to-indigo-900/40 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 py-2 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/50 ring-2 ring-blue-200/50 dark:ring-blue-800/50 group-hover:scale-110 group-hover:shadow-xl group-hover:ring-blue-300/60 dark:group-hover:ring-blue-700/60 transition-all duration-300">
          <div class="w-8 h-8 text-blue-600 dark:text-blue-400 py-1">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.icon"></svg>
          </div>
        </div>

        <!-- Service Content -->
        <div class="space-y-4 py-3">
          <h3
            class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 py-1 drop-shadow-sm">
            {{ service.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed py-1 drop-shadow-sm">
            {{ service.description }}
          </p>
        </div>

        <!-- Learn More Link -->
        <div class="mt-6 pt-6 border-t border-gray-200/30 dark:border-gray-700/30 py-2">
          <button @click="openModal(service)"
            class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 group-hover:translate-x-1 transform transition-transform duration-200">
            <span>Learn more</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-12 text-center py-6">
      <div
        class="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 py-8 border border-blue-200/50 dark:border-blue-800/50 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/50">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 py-2 drop-shadow-sm">
          {{ $t('services.cta') }}
        </h3>
        <div class="flex flex-col sm:flex-row gap-4 justify-center py-3">
          <a href="mailto:your.email@example.com"
            class="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600/90 hover:bg-blue-700/95 active:bg-blue-800/95 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 ring-2 ring-blue-400/20 hover:ring-blue-300/40 transform hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Get in Touch</span>
          </a>
          <a v-if="personalInfo.cvUrl" :href="personalInfo.cvUrl" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center justify-center space-x-2 px-8 py-4 border-2 border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md backdrop-saturate-150 text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-700/90 hover:border-gray-400/70 dark:hover:border-gray-500/70 active:bg-gray-100/95 dark:active:bg-gray-700/95 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/30 shadow-lg shadow-gray-300/40 dark:shadow-gray-900/40 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-gray-900/50 transform hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>View Portfolio</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <BaseModal :is-open="isModalOpen" :title="selectedService?.title" size="lg" @close="closeModal"
      class="modal-custom-sizing">
      <!-- Custom Header -->
      <template #header>
        <div class="flex items-start space-x-3">
          <div
            class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
            <div class="w-6 h-6 text-white">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="selectedService?.icon"></svg>
            </div>
          </div>
          <div class="flex-1 pt-0.5">
            <h3 class="text-2xl font-semibold text-white/90 mb-2 px-2">
              {{ selectedService?.title }}
            </h3>
            <p class="text-blue-100/90 leading-snug text-sm px-2">
              {{ selectedService?.description }}
            </p>
          </div>
        </div>
      </template>

      <!-- Modal Body -->
      <div class="space-y-6 p-6 sm:p-8">
        <!-- Business Impact Section -->
        <section>
          <div class="flex items-center space-x-4 mb-5 pt-4 pb-3 border-b border-gray-200/40 dark:border-gray-700/40">
            <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h4 class="text-xl font-semibold text-gray-900 dark:text-white tracking-tight px-2">
              Business Impact
            </h4>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(metric, index) in getServiceMetrics(selectedService?.id)" :key="index" class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20
                    rounded-2xl p-5 border border-blue-200/40 dark:border-blue-800/40
                    transform hover:scale-[1.01] transition-transform duration-200"
              :style="{ animationDelay: `${index * 100}ms` }">
              <div class="flex items-start space-x-5"> <!-- Added space-x-5 for clear separation -->
                <!-- Icon Container -->
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl
                          flex items-center justify-center shadow-md">
                    <span class="text-2xl text-white">{{ metric.icon }}</span>
                  </div>
                </div>

                <!-- Text Content -->
                <div class="flex-1 space-y-1">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 px-2">
                    {{ metric.value }}
                  </div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white px-2">
                    {{ metric.label }}
                  </div>
                  <div class="text-xs text-gray-600 dark:text-gray-400 leading-snug px-2">
                    {{ metric.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Key Benefits -->
        <section>
          <!-- Section Header -->
          <div class="flex items-center space-x-4 mb-5 pt-4 pb-3 border-b border-gray-200/40 dark:border-gray-700/40">
            <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 class="text-xl font-semibold text-gray-900 dark:text-white tracking-tight px-2">
              Key Benefits
            </h4>
          </div>

          <!-- Benefits List -->
          <ul class="space-y-3 mt-4">
            <li v-for="(benefit, index) in getServiceBenefits(selectedService?.id)" :key="index"
              class="flex items-start space-x-4 py-2">
              <!-- Icon -->
              <div class="flex-shrink-0 w-7 h-7 bg-green-100/80 dark:bg-green-900/40 rounded-lg
                      flex items-center justify-center shadow-sm">
                <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <!-- Benefit Text -->
              <span class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed px-2">
                {{ benefit }}
              </span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Footer with CTA -->
      <template #footer>
        <div class="flex justify-center items-center mt-6">
          <div class="max-w-md w-full text-center">
            <button @click="closeModal" class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                    text-white text-sm font-semibold py-3 px-8 rounded-xl
                    hover:scale-[1.02] hover:shadow-lg transition-transform duration-200
                    focus:outline-none focus:ring-4 focus:ring-blue-500/50
                    shadow-lg shadow-gray-200/40 dark:shadow-gray-900/40" aria-label="Get started with this service">
              Get Started with This Service
            </button>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BaseModal } from '@/components/ui'
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
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedService.value = null
  }, 300)
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
