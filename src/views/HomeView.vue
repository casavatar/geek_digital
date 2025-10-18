<script setup lang="ts">
import UserProfile from '@/components/dashboard/UserProfile.vue'
import ServicesSection from '@/components/dashboard/ServicesSection.vue'
import ContactSection from '@/components/dashboard/ContactSection.vue'
import ScheduleMeeting from '@/components/dashboard/ScheduleMeeting.vue'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { personalInfo } = usePortfolioData()
</script>

<template>
  <div class="space-y-16 py-8">
    <!-- Welcome Header -->
    <div class="w-full flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl w-full mx-auto text-center space-y-4">
        <h1
          class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
          {{ $t('home.title') }}
        </h1>
        <p
          class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
          {{ $t('home.subtitle') }}
        </p>
      </div>
    </div>

    <!-- User Profile Section -->
    <section id="profile" class="scroll-mt-20 py-8">
      <UserProfile :personal-info="personalInfo" />
    </section>

    <!-- Services Section -->
    <section id="services" class="scroll-mt-20 py-8">
      <ServicesSection :personal-info="personalInfo" />
    </section>

    <!-- Contact Section -->
    <section id="contact" class="scroll-mt-20 py-8">
      <ContactSection />
    </section>

    <!-- Schedule Meeting Section -->
    <section id="schedule" class="scroll-mt-20 py-8">
      <ScheduleMeeting />
    </section>
  </div>
</template>
