<template>
  <div class="dashboard-card p-8">
    <!-- Profile Header -->
    <div
      class="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 mb-8"
    >
      <!-- Profile Image -->
      <div class="relative">
        <img
          :src="personalInfo.avatar"
          :alt="`${personalInfo.name} profile picture`"
          class="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover ring-4 ring-blue-100 dark:ring-blue-900 shadow-xl"
        />
        <!-- Status Indicator -->
        <div
          class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center"
        >
          <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- Profile Info -->
      <div class="flex-1">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {{ personalInfo.name }}
        </h1>
        <p class="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-4">
          {{ personalInfo.title }}
        </p>
        <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Remote / Hybrid</span>
        </div>

        <!-- Bio -->
        <div class="prose prose-gray dark:prose-invert max-w-none mb-6">
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ personalInfo.bio || $t('home.bio') }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 mt-6">
          <a
            v-if="personalInfo.cvUrl"
            :href="personalInfo.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>{{ $t('header.downloadCv') }}</span>
          </a>

          <a
            href="mailto:your.email@example.com"
            class="inline-flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/30 focus:ring-offset-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>{{ $t('contact.title') }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Skills Section -->
    <div class="pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {{ $t('home.skills') }}
      </h3>

      <!-- Skills Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="group flex items-center space-x-3 p-5 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 cursor-pointer"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-2xl">
            {{ skill.icon }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              {{ skill.name }}
            </p>
            <div class="flex items-center space-x-2 mt-1">
              <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  class="h-2 rounded-full transition-all duration-300"
                  :class="skill.levelColor"
                  :style="{ width: `${skill.level}%` }"
                ></div>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400"> {{ skill.level }}% </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {{ $t('home.quickStats') }}
      </h3>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center p-4">
          <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {{ stats.projects }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('home.projectsCompleted') }}
          </div>
        </div>

        <div class="text-center p-4">
          <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {{ stats.experience }}+
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('home.yearsExperience') }}
          </div>
        </div>

        <div class="text-center p-4">
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {{ stats.datasets }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('home.dataProcessed') }}
          </div>
        </div>

        <div class="text-center p-4">
          <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
            {{ stats.technologies }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('home.skills') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PersonalInfo } from '@/types'

interface Skill {
  name: string
  icon: string
  level: number
  levelColor: string
}

interface Stats {
  projects: number
  experience: number
  datasets: number
  technologies: number
}

interface Props {
  personalInfo: PersonalInfo
}

defineProps<Props>()

const skills = computed<Skill[]>(() => [
  { name: 'Python', icon: '🐍', level: 95, levelColor: 'bg-green-500' },
  { name: 'SAS', icon: '📈', level: 95, levelColor: 'bg-blue-500' },
  { name: 'C#', icon: '🔷', level: 95, levelColor: 'bg-purple-400' },
  { name: 'R', icon: '📊', level: 85, levelColor: 'bg-red-500' },
  { name: 'SQL', icon: '🗄️', level: 90, levelColor: 'bg-blue-500' },
  { name: 'NoSQL', icon: '🗃️', level: 80, levelColor: 'bg-purple-500' },
  { name: 'Apache Spark', icon: '⚡', level: 85, levelColor: 'bg-orange-500' },
  { name: 'Power BI', icon: '📊', level: 90, levelColor: 'bg-yellow-500' },
  { name: 'AWS', icon: '☁️', level: 80, levelColor: 'bg-orange-400' },
  { name: 'Azure', icon: '🔷', level: 80, levelColor: 'bg-blue-400' },
  { name: 'Docker', icon: '🐳', level: 90, levelColor: 'bg-blue-600' },
  { name: 'Kubernetes', icon: '⚙️', level: 70, levelColor: 'bg-blue-700' },
  { name: 'Pandas', icon: '🐼', level: 92, levelColor: 'bg-green-400' },
  { name: 'TensorFlow', icon: '🧠', level: 78, levelColor: 'bg-orange-600' },
  { name: 'Git', icon: '📝', level: 90, levelColor: 'bg-orange-400' },
  { name: 'Linux', icon: '🐧', level: 85, levelColor: 'bg-yellow-600' },
])

const stats = computed<Stats>(() => ({
  projects: 85,
  experience: 10,
  datasets: 250,
  technologies: 25,
}))
</script>
