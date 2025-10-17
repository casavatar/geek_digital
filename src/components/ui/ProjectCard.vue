<template>
  <article 
    class="card group cursor-pointer relative overflow-hidden" 
    @click="handleCardClick"
    role="button"
    tabindex="0"
    @keydown.enter="handleCardClick"
    @keydown.space.prevent="handleCardClick"
  >
    <!-- Background gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <!-- Project Icon -->
    <div class="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-300">
      <svg class="w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="project.iconPath" />
      </svg>
    </div>

    <!-- Project Title -->
    <h3 class="relative text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
      {{ project.title }}
    </h3>

    <!-- Project Description -->
    <p class="relative text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
      {{ project.description }}
    </p>

    <!-- Impact Metric -->
    <div class="relative flex items-center space-x-3 mb-6">
      <div class="impact-badge">
        <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <span>{{ project.impact }}</span>
      </div>
    </div>

    <!-- Technologies -->
    <div class="relative flex flex-wrap gap-3 mb-6">
      <span
        v-for="tech in project.technologies"
        :key="tech"
        class="tech-tag"
      >
        {{ tech }}
      </span>
    </div>

    <!-- Action Links -->
    <div class="relative flex space-x-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
      <a
        v-if="project.liveUrl"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold transition-all duration-200 hover:scale-105"
        @click.stop
        aria-label="View live demo of {{ project.title }}"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        <span>Live Demo</span>
      </a>

      <a
        v-if="project.githubUrl"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-semibold transition-all duration-200 hover:scale-105"
        @click.stop
        aria-label="View source code of {{ project.title }}"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>Source Code</span>
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '@/types'

interface Props {
  project: Project
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [project: Project]
}>()

const handleCardClick = () => {
  emit('click', props.project)
}
</script>
