<script setup lang="ts">
import UserProfile from '@/components/dashboard/UserProfile.vue'
import ServicesSection from '@/components/dashboard/ServicesSection.vue'
import ContactSection from '@/components/dashboard/ContactSection.vue'
import ScheduleMeeting from '@/components/dashboard/ScheduleMeeting.vue'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { personalInfo } = usePortfolioData()
</script>

<template>
  <div class="space-y-16">
    <!-- Welcome Header -->
    <div class="text-center">
      <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {{ $t('home.title') }}
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        {{ $t('home.subtitle') }}
      </p>
    </div>

    <!-- User Profile Section -->
    <section id="profile" class="scroll-mt-20">
      <UserProfile :personal-info="personalInfo" />
    </section>

    <!-- Services Section -->
    <section id="services" class="scroll-mt-20">
      <ServicesSection :personal-info="personalInfo" />
    </section>

    <!-- Contact Section -->
    <section id="contact" class="scroll-mt-20">
      <ContactSection />
    </section>

    <!-- Schedule Meeting Section -->
    <section id="schedule" class="scroll-mt-20">
      <ScheduleMeeting />
    </section>
  </div>
</template>
