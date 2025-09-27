<template>
  <section id="home" class="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-20 lg:py-32 overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Avatar -->
        <div class="mb-12 animate-scale-in">
          <div class="relative inline-block">
            <img
              :src="personalInfo.avatar"
              :alt="`${personalInfo.name} avatar`"
              class="h-40 w-40 mx-auto rounded-full object-cover ring-4 ring-blue-100 dark:ring-blue-900 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
            />
            <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse"></div>
          </div>
        </div>

        <!-- Name and Title -->
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
          <span class="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
            {{ personalInfo.name }}
          </span>
        </h1>
        <p class="text-2xl md:text-3xl lg:text-4xl text-blue-600 dark:text-blue-400 font-semibold mb-8 animate-fade-in-up-delay-1">
          {{ personalInfo.title }}
        </p>

        <!-- Tagline -->
        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed animate-fade-in-up-delay-2">
          {{ personalInfo.tagline }}
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up-delay-3">
          <a
            href="#projects"
            class="btn-primary inline-flex items-center space-x-3 min-w-[220px] justify-center group"
            @click="scrollToSection"
          >
            <svg
              class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>View My Work</span>
          </a>

          <a
            v-if="personalInfo.cvUrl"
            :href="personalInfo.cvUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary inline-flex items-center space-x-3 min-w-[220px] justify-center group"
          >
            <svg
              class="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
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
            <span>Download CV</span>
          </a>
        </div>

        <!-- Scroll indicator -->
        <div class="mt-20 animate-bounce">
          <a
            href="#projects"
            class="inline-block text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
            @click="scrollToSection"
            aria-label="Scroll to projects section"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PersonalInfo } from '@/types'

interface Props {
  personalInfo: PersonalInfo
}

defineProps<Props>()

const scrollToSection = (event: Event) => {
  event.preventDefault()
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  if (href && href.startsWith('#')) {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
}
</script>
