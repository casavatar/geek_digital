<template>
  <section id="projects" class="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-72 h-72 bg-indigo-400/5 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <h2 class="section-title">
          Featured Projects
        </h2>
        <p class="section-subtitle">
          A showcase of my recent work, highlighting the impact and technologies used in each project.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <ProjectCard
            :project="project"
            @click="handleProjectClick"
          />
        </div>
      </div>

      <!-- View All Projects Button -->
      <div class="text-center mt-16">
        <button class="btn-secondary group">
          <span class="group-hover:scale-105 transition-transform duration-200">
            View All Projects
          </span>
          <svg
            class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import type { Project } from '@/types'

interface Props {
  projects: Project[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  projectClick: [project: Project]
}>()

const handleProjectClick = (project: Project) => {
  emit('projectClick', project)
  // You can add additional logic here, such as opening a modal or navigating to a detail page
  console.log('Project clicked:', project.title)
}
</script>
