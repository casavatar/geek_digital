<template>
  <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Left side - Profile and Info -->
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-3">
          <img
            :src="personalInfo.avatar"
            :alt="`${personalInfo.name} avatar`"
            class="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
          />
          <div>
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ personalInfo.name }}
            </h1>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ personalInfo.title }}
            </p>
          </div>
        </div>
      </div>

      <!-- Right side - Actions -->
      <div class="flex items-center space-x-4">
        <!-- Status Indicator -->
        <StatusBadge status="online" animated />

        <!-- Download CV Button -->
        <Button
          v-if="personalInfo.cvUrl"
          :href="personalInfo.cvUrl"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="md"
          icon="download"
        >
          {{ $t('header.downloadCv') }}
        </Button>

        <!-- Language Switcher -->
        <LanguageSwitcher />

        <!-- Theme Toggle -->
        <ThemeToggle />

        <!-- Notifications -->
        <Button
          variant="ghost"
          size="md"
          icon="bell"
          class="relative"
          :title="$t('header.notifications')"
        >
          <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </Button>

        <!-- Settings -->
        <Button
          variant="ghost"
          size="md"
          icon="cog"
          :title="$t('header.settings')"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { PersonalInfo } from '@/types'
import ThemeToggle from './ThemeToggle.vue'
import { StatusBadge, Button } from '@/components/ui'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

interface Props {
  personalInfo: PersonalInfo
}

defineProps<Props>()
</script>
