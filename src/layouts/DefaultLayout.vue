<template>
  <div class="min-h-screen flex flex-col" :style="{ backgroundColor: 'var(--body-bg)' }">
    <!-- Aurora ambient orbs (visible in dark mode) -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      <div
        class="absolute -top-64 -left-64 w-[700px] h-[700px] rounded-full opacity-0 dark:opacity-100 transition-opacity duration-700 animate-float-slow"
        style="background: radial-gradient(circle, rgba(0,198,255,0.09) 0%, transparent 68%)"
      />
      <div
        class="absolute -bottom-64 -right-64 w-[600px] h-[600px] rounded-full opacity-0 dark:opacity-100 transition-opacity duration-700 animate-float"
        style="background: radial-gradient(circle, rgba(155,90,255,0.08) 0%, transparent 68%)"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-0 dark:opacity-100 transition-opacity duration-700"
        style="background: radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 68%)"
      />
    </div>

    <Navbar />

    <main class="flex-grow relative z-10">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>
