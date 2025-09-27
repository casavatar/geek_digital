<template>
  <div class="dashboard-card p-8">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('services.title') }}
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {{ $t('services.subtitle') }}
      </p>
    </div>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(service, index) in services"
        :key="service.id"
        class="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        <!-- Service Icon -->
        <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <div class="w-8 h-8 text-blue-600 dark:text-blue-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="service.icon"></svg>
          </div>
        </div>

        <!-- Service Content -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {{ service.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ service.description }}
          </p>
        </div>

        <!-- Hover Effect Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <!-- Learn More Link -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a
            href="#"
            class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200 group-hover:translate-x-1 transform transition-transform duration-200"
          >
            <span>Learn more</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="mt-12 text-center">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('services.cta') }}
        </h3>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:your.email@example.com"
            class="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>View Portfolio</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PersonalInfo } from '@/types'

interface Service {
  id: string
  title: string
  description: string
  icon: string
}

interface Props {
  personalInfo: PersonalInfo
}

const props = defineProps<Props>()
const { t } = useI18n()

const services = computed<Service[]>(() => [
  {
    id: 'data-pipeline',
    title: t('services.dataPipelines.title'),
    description: t('services.dataPipelines.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />'
  },
  {
    id: 'dashboard-design',
    title: t('services.dashboardDesign.title'),
    description: t('services.dashboardDesign.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />'
  },
  {
    id: 'etl-automation',
    title: t('services.etlAutomation.title'),
    description: t('services.etlAutomation.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />'
  },
  {
    id: 'data-visualization',
    title: t('services.dataVisualization.title'),
    description: t('services.dataVisualization.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />'
  },
  {
    id: 'cloud-migration',
    title: t('services.cloudMigration.title'),
    description: t('services.cloudMigration.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />'
  },
  {
    id: 'data-quality',
    title: t('services.dataQuality.title'),
    description: t('services.dataQuality.description'),
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />'
  }
])
</script>
