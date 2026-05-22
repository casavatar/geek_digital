<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden"
       style="background-color: var(--body-bg)">

    <!-- Aurora ambient orbs -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div class="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full"
           style="background: radial-gradient(circle, rgba(0,198,255,0.10) 0%, transparent 68%)" />
      <div class="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full"
           style="background: radial-gradient(circle, rgba(155,90,255,0.09) 0%, transparent 68%)" />
      <div class="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full"
           style="background: radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 68%)" />
    </div>

    <!-- Luminous grid lines (subtle) -->
    <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] pointer-events-none"
         style="background-image: linear-gradient(rgba(0,198,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,1) 1px, transparent 1px); background-size: 48px 48px" />

    <router-view />
  </div>
</template>
