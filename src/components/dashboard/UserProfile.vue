<template>
  <article class="dashboard-card p-6 sm:p-8 lg:p-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl backdrop-saturate-150 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50">
    <!-- Profile Header with Glass Overlay -->
    <header class="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8 mb-10 py-6 px-6 -mx-6 sm:-mx-8 lg:-mx-10 -mt-6 sm:-mt-8 lg:-mt-10 bg-gradient-to-br from-white/40 to-gray-50/40 dark:from-gray-800/40 dark:to-gray-900/40 rounded-t-2xl backdrop-blur-sm border-b border-gray-200/30 dark:border-gray-700/30">
      <!-- Profile Image -->
      <div class="relative flex-shrink-0">
        <img
          :src="personalInfo.avatar"
          :alt="`${personalInfo.name} profile picture`"
          class="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover ring-4 ring-blue-100/50 dark:ring-blue-900/50 shadow-xl shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 hover:ring-blue-200/70 dark:hover:ring-blue-800/70"
          loading="lazy"
        />
        <!-- Status Indicator with Glass Effect -->
        <div
          class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500/90 backdrop-blur-sm rounded-full border-4 border-white/80 dark:border-gray-800/80 flex items-center justify-center shadow-lg shadow-green-500/40"
          role="status"
          aria-label="Available"
        >
          <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- Profile Info -->
      <div class="flex-1 min-w-0 space-y-5">
        <div class="space-y-2 py-1">
          <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {{ personalInfo.name }}
          </h1>
          <p class="text-xl text-blue-600 dark:text-blue-400 font-semibold">
            {{ personalInfo.title }}
          </p>
        </div>

        <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 py-2">
          <svg
            class="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
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
        <div class="prose prose-gray dark:prose-invert max-w-none py-2">
          <p class="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ personalInfo.bio || $t('home.bio') }}
          </p>
        </div>

        <!-- Action Buttons with Glass Effects -->
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 pb-2">
          <a
            v-if="personalInfo.cvUrl"
            :href="personalInfo.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600/90 hover:bg-blue-700/90 active:bg-blue-800/90 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
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
            class="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300/50 dark:border-gray-600/50 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60 hover:border-gray-400/60 dark:hover:border-gray-500/60 active:bg-gray-100/70 dark:active:bg-gray-700/70 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/30 shadow-md shadow-gray-300/30 dark:shadow-gray-900/30 hover:shadow-lg hover:shadow-gray-300/40 dark:hover:shadow-gray-900/40 transform hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
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
    </header>

    <!-- Skills Section with Glass Separator -->
    <section class="pt-10 mt-2 pb-6 border-t border-gray-200/30 dark:border-gray-700/30">
      <div class="mb-8 py-2">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight drop-shadow-sm">
          {{ $t('home.skills') }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1 mb-2.5">
          Technical expertise and proficiency levels
        </p>
      </div>

      <!-- Skills Grid with Glass Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="group relative p-4 bg-gradient-to-br from-white/60 to-gray-50/60 dark:from-gray-700/60 dark:to-gray-800/60 backdrop-blur-md rounded-xl hover:from-blue-50/70 hover:to-indigo-50/70 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 border border-gray-200/30 dark:border-gray-700/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-300/50 dark:hover:shadow-gray-900/50 hover:border-blue-200/50 dark:hover:border-blue-800/50"
        >
          <div class="flex items-start gap-3 py-1">
            <div
              class="w-10 h-10 flex-shrink-0 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-2xl shadow-md shadow-gray-300/50 dark:shadow-gray-900/50 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 ring-1 ring-gray-200/50 dark:ring-gray-700/50"
              role="img"
              :aria-label="`${skill.name} icon`"
            >
              {{ skill.icon }}
            </div>
            <div class="flex-1 min-w-0 py-0.5">
              <p
                class="text-sm font-semibold text-gray-900 dark:text-white truncate mb-4.5 leading-snug"
              >
                {{ skill.name }}
              </p>
              <div class="flex items-center gap-2">
                <div
                  class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden"
                  role="progressbar"
                  :aria-valuenow="skill.level"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :aria-label="`${skill.name} proficiency: ${skill.level}%`"
                >
                  <div
                    class="h-full rounded-full transition-all duration-500 ease-out"
                    :class="skill.levelColor"
                    :style="{ width: `${skill.level}%` }"
                  ></div>
                </div>
                <span
                  class="text-xs font-medium text-gray-600 dark:text-gray-400 min-w-[2.5rem] text-right"
                >
                  {{ skill.level }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Stats with Glass Separator -->
    <section
      ref="statsSection"
      class="mt-10 pt-10 pb-6 border-t border-gray-200/30 dark:border-gray-700/30"
    >
      <div class="mb-8 py-2">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight drop-shadow-sm">
          {{ $t('home.quickStats') }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1 mb-2.5">
          Career highlights and achievements
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="card in statsCards"
          :key="card.key"
          class="group text-center p-6 bg-gradient-to-br rounded-xl backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30 hover:shadow-xl hover:shadow-gray-300/50 dark:hover:shadow-gray-900/50 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer hover:border-opacity-50"
          :class="[
            card.gradientFrom,
            card.gradientTo,
            card.darkGradientFrom,
            card.darkGradientTo,
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ]"
          :style="{
            transitionDelay: `${card.animationDelay}ms`,
            transitionProperty: 'all',
          }"
        >
          <div
            class="text-4xl font-bold mb-3 py-2 group-hover:scale-110 transition-all duration-300 ease-out drop-shadow-sm"
            :class="`text-${card.color}-600 dark:text-${card.color}-400`"
          >
            <span class="inline-block tabular-nums">
              {{ animatedStats[card.key] }}{{ card.suffix || '' }}
            </span>
          </div>
          <div
            class="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug mt-1 mb-2.5 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 drop-shadow-sm"
          >
            {{ $t(card.labelKey) }}
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { PersonalInfo } from '@/types'

// ============================================================================
// Types & Interfaces
// ============================================================================

interface Skill {
  name: string
  icon: string
  level: number
  levelColor: string
  category?: 'language' | 'database' | 'cloud' | 'tool' | 'framework'
}

interface Stats {
  projects: number
  experience: number
  datasets: number
  technologies: number
}

interface StatCard {
  key: keyof Stats
  color: string
  gradientFrom: string
  gradientTo: string
  darkGradientFrom: string
  darkGradientTo: string
  labelKey: string
  suffix?: string
  animationDelay: number
}

interface Props {
  personalInfo: PersonalInfo
}

// ============================================================================
// Props
// ============================================================================

defineProps<Props>()

// ============================================================================
// Reactive State
// ============================================================================

/** Controls whether stats animations are active */
const statsVisible = ref(false)

/** Animated counter values for stats */
const animatedStats = ref({
  projects: 0,
  experience: 0,
  datasets: 0,
  technologies: 0,
})

/** Reference to the stats section element */
const statsSection = ref<HTMLElement | null>(null)

/** Intersection observer instance */
let observer: IntersectionObserver | null = null

// ============================================================================
// Constants
// ============================================================================

/** Skill proficiency level color mappings */
const SKILL_COLORS = {
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500',
} as const

/** Skills data organized by category for better maintainability */
const SKILLS_DATA: Skill[] = [
  // Programming Languages
  { name: 'Python', icon: '🐍', level: 95, levelColor: SKILL_COLORS.green, category: 'language' },
  { name: 'SAS', icon: '📈', level: 95, levelColor: SKILL_COLORS.blue, category: 'language' },
  { name: 'C#', icon: '#️⃣', level: 95, levelColor: 'bg-purple-400', category: 'language' },
  { name: 'R', icon: '📊', level: 85, levelColor: SKILL_COLORS.red, category: 'language' },

  // Databases
  { name: 'SQL', icon: '🗄️', level: 90, levelColor: SKILL_COLORS.blue, category: 'database' },
  { name: 'NoSQL', icon: '🗃️', level: 80, levelColor: SKILL_COLORS.purple, category: 'database' },

  // Big Data & Analytics
  {
    name: 'Apache Spark',
    icon: '⚡',
    level: 85,
    levelColor: SKILL_COLORS.orange,
    category: 'framework',
  },
  { name: 'Power BI', icon: '📊', level: 90, levelColor: SKILL_COLORS.yellow, category: 'tool' },
  { name: 'Pandas', icon: '🐼', level: 92, levelColor: 'bg-green-400', category: 'framework' },
  { name: 'TensorFlow', icon: '🧠', level: 78, levelColor: 'bg-orange-600', category: 'framework' },

  // Cloud & Infrastructure
  { name: 'AWS', icon: '☁️', level: 80, levelColor: 'bg-orange-400', category: 'cloud' },
  { name: 'Azure', icon: '🔷', level: 80, levelColor: 'bg-blue-400', category: 'cloud' },
  { name: 'Docker', icon: '🐳', level: 90, levelColor: 'bg-blue-600', category: 'tool' },
  { name: 'Kubernetes', icon: '⚙️', level: 70, levelColor: 'bg-blue-700', category: 'tool' },

  // Development Tools
  { name: 'Git', icon: '📝', level: 90, levelColor: 'bg-orange-400', category: 'tool' },
  { name: 'Linux', icon: '🐧', level: 85, levelColor: 'bg-yellow-600', category: 'tool' },
]

/** Statistics configuration */
const STATS_CONFIG = {
  projects: 85,
  experience: 10,
  datasets: 250,
  technologies: 25,
} as const

/** Stats cards configuration with animation metadata */
const STATS_CARDS: StatCard[] = [
  {
    key: 'projects',
    color: 'blue',
    gradientFrom: 'from-blue-50',
    gradientTo: 'to-blue-100',
    darkGradientFrom: 'dark:from-blue-900/20',
    darkGradientTo: 'dark:to-blue-800/20',
    labelKey: 'home.projectsCompleted',
    animationDelay: 0,
  },
  {
    key: 'experience',
    color: 'green',
    gradientFrom: 'from-green-50',
    gradientTo: 'to-green-100',
    darkGradientFrom: 'dark:from-green-900/20',
    darkGradientTo: 'dark:to-green-800/20',
    labelKey: 'home.yearsExperience',
    suffix: '+',
    animationDelay: 100,
  },
  {
    key: 'datasets',
    color: 'purple',
    gradientFrom: 'from-purple-50',
    gradientTo: 'to-purple-100',
    darkGradientFrom: 'dark:from-purple-900/20',
    darkGradientTo: 'dark:to-purple-800/20',
    labelKey: 'home.dataProcessed',
    animationDelay: 200,
  },
  {
    key: 'technologies',
    color: 'orange',
    gradientFrom: 'from-orange-50',
    gradientTo: 'to-orange-100',
    darkGradientFrom: 'dark:from-orange-900/20',
    darkGradientTo: 'dark:to-orange-800/20',
    labelKey: 'home.skills',
    animationDelay: 300,
  },
]

// ============================================================================
// Computed Properties
// ============================================================================

/**
 * Computed skills list with proper typing and organization.
 * Can be extended to filter or sort skills by category.
 */
const skills = computed<Skill[]>(() => SKILLS_DATA)

/**
 * Computed stats cards with animation data
 */
const statsCards = computed(() => STATS_CARDS)

// ============================================================================
// Animation Functions
// ============================================================================

/**
 * Animates a counter from 0 to target value
 */
const animateCounter = (key: keyof Stats, targetValue: number, duration: number = 2000) => {
  const startTime = Date.now()
  const startValue = 0

  const updateCounter = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation (easeOutExpo)
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

    animatedStats.value[key] = Math.floor(startValue + (targetValue - startValue) * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      animatedStats.value[key] = targetValue
    }
  }

  requestAnimationFrame(updateCounter)
}

/**
 * Triggers animation for all stats counters with stagger
 */
const animateAllStats = () => {
  if (statsVisible.value) return

  statsVisible.value = true

  // Animate each stat with staggered delay
  Object.entries(STATS_CONFIG).forEach(([key, value], index) => {
    setTimeout(() => {
      animateCounter(key as keyof Stats, value, 2000)
    }, index * 100)
  })
}

/**
 * Sets up intersection observer for scroll-triggered animations
 */
const setupObserver = () => {
  if (!statsSection.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsVisible.value) {
          animateAllStats()
        }
      })
    },
    {
      threshold: 0.2, // Trigger when 20% of the section is visible
      rootMargin: '0px 0px -100px 0px', // Trigger slightly before it's fully visible
    },
  )

  observer.observe(statsSection.value)
}

// ============================================================================
// Lifecycle Hooks
// ============================================================================

onMounted(() => {
  setupObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
