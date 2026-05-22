<template>
  <div>
    <!-- ======================================================
         HERO
         ====================================================== -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Aurora mesh -->
      <div class="absolute inset-0 aurora-mesh" aria-hidden="true" />

      <!-- Floating orbs -->
      <div class="absolute top-1/4 left-1/6 w-72 h-72 rounded-full opacity-20 dark:opacity-30 blur-3xl animate-float pointer-events-none"
           style="background: radial-gradient(circle, #00c6ff, transparent 70%)" />
      <div class="absolute bottom-1/4 right-1/6 w-64 h-64 rounded-full opacity-15 dark:opacity-25 blur-3xl animate-float-slow pointer-events-none"
           style="background: radial-gradient(circle, #9b5aff, transparent 70%)" />

      <!-- Content -->
      <div class="relative z-10 container-custom text-center py-32">
        <!-- Tag pill -->
        <div class="inline-flex items-center gap-2 mb-8">
          <span class="glass-badge glass-badge-primary text-xs px-3 py-1.5 tracking-wider uppercase font-medium">
            ✦ Data Engineering &amp; Digital Products
          </span>
        </div>

        <!-- Headline -->
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
          <span class="gradient-text">Build smarter.</span><br />
          <span style="color: var(--text-1)">Ship faster.</span>
        </h1>

        <p class="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style="color: var(--text-2)">
          Explore professional data engineering projects, curated desktop and web applications,
          and a digital product platform built for modern developers.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/catalog" class="glass-btn-primary text-base px-8 py-3">
            Explore Catalog
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </router-link>
          <router-link to="/portfolio" class="glass-btn-outline text-base px-8 py-3">
            View Portfolio
          </router-link>
        </div>

        <!-- Floating stats -->
        <div class="flex flex-wrap justify-center gap-4 mt-16">
          <div v-for="stat in stats" :key="stat.label"
               class="glass-card px-5 py-3 flex items-center gap-3">
            <span class="text-2xl font-display font-bold gradient-text-cool">{{ stat.value }}</span>
            <span class="text-sm" style="color: var(--text-2)">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span class="text-xs tracking-widest uppercase" style="color: var(--text-3)">Scroll</span>
        <div class="w-px h-8 animate-pulse" style="background: linear-gradient(180deg, rgba(0,198,255,0.6), transparent)"/>
      </div>
    </section>

    <!-- ======================================================
         WHAT WE OFFER — Bento Grid
         ====================================================== -->
    <section class="glass-section">
      <div class="container-custom">
        <div class="text-center mb-14">
          <p class="text-xs font-medium tracking-widest uppercase mb-3" style="color: var(--text-3)">Platform</p>
          <h2 class="text-3xl md:text-4xl font-display font-bold mb-4" style="color: var(--text-1)">
            What we <span class="gradient-text">offer</span>
          </h2>
          <p class="text-base max-w-xl mx-auto" style="color: var(--text-2)">
            A unified platform for exploring professional work, acquiring tools, and building better data products.
          </p>
        </div>

        <!-- Bento cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Large card -->
          <div class="md:col-span-2 glass-card p-8 glass-hover-lift group">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                 style="background: linear-gradient(135deg, rgba(0,198,255,0.15), rgba(0,198,255,0.05)); border: 1px solid rgba(0,198,255,0.2)">
              <svg class="w-7 h-7 text-primary-500 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-display font-semibold mb-3" style="color: var(--text-1)">Data Engineering Portfolio</h3>
            <p class="text-sm leading-relaxed mb-6" style="color: var(--text-2)">
              Deep-dive into production-grade ETL pipelines, streaming architectures, data warehouse designs,
              and analytics solutions. Built with Python, Spark, Kafka, Airflow, and modern cloud stacks.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="glass-badge glass-badge-primary">Apache Spark</span>
              <span class="glass-badge glass-badge-primary">Kafka</span>
              <span class="glass-badge glass-badge-primary">dbt</span>
              <span class="glass-badge glass-badge-primary">Snowflake</span>
              <span class="glass-badge glass-badge-primary">Airflow</span>
            </div>
          </div>

          <!-- Stack of 2 smaller cards -->
          <div class="flex flex-col gap-5">
            <div class="glass-card p-6 glass-hover-lift group flex-1">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                   style="background: linear-gradient(135deg, rgba(155,90,255,0.15), rgba(155,90,255,0.05)); border: 1px solid rgba(155,90,255,0.2)">
                <svg class="w-6 h-6 text-secondary-500 dark:text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 class="text-base font-display font-semibold mb-2" style="color: var(--text-1)">Desktop &amp; Web Apps</h3>
              <p class="text-sm" style="color: var(--text-2)">
                A curated catalog of professional-grade applications and developer tools.
              </p>
            </div>

            <div class="glass-card p-6 glass-hover-lift group flex-1">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                   style="background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05)); border: 1px solid rgba(245,158,11,0.2)">
                <svg class="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
              </div>
              <h3 class="text-base font-display font-semibold mb-2" style="color: var(--text-1)">Digital Product Store</h3>
              <p class="text-sm" style="color: var(--text-2)">
                Purchase licenses and get instant access to premium applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================
         TECH STACK TICKER
         ====================================================== -->
    <section class="py-10 overflow-hidden">
      <div class="luminous-divider mb-8" />
      <div class="container-custom">
        <p class="text-center text-xs tracking-widest uppercase mb-6" style="color: var(--text-3)">Technology Stack</p>
        <div class="flex flex-wrap justify-center gap-3">
          <span v-for="tech in techStack" :key="tech"
                class="glass-badge text-xs px-3 py-1.5 transition-all duration-200 hover:border-primary-500/30 hover:text-primary-500 dark:hover:text-primary-400 cursor-default">
            {{ tech }}
          </span>
        </div>
      </div>
      <div class="luminous-divider mt-8" />
    </section>

    <!-- ======================================================
         CTA
         ====================================================== -->
    <section class="glass-section">
      <div class="container-custom">
        <div class="glass-card-elevated relative overflow-hidden p-10 md:p-16 text-center">
          <!-- Background glow -->
          <div class="absolute inset-0 aurora-mesh opacity-50 pointer-events-none" />

          <div class="relative z-10">
            <p class="text-xs tracking-widest uppercase mb-4" style="color: var(--text-3)">Get started</p>
            <h2 class="text-3xl md:text-4xl font-display font-bold mb-4">
              <span class="gradient-text">Ready to explore?</span>
            </h2>
            <p class="text-base max-w-lg mx-auto mb-8" style="color: var(--text-2)">
              Create an account to access premium features, track your licenses, and unlock the full catalog.
            </p>

            <router-link
              v-if="!authStore.isAuthenticated"
              to="/auth/login"
              class="glass-btn-primary text-base px-10 py-3"
            >
              Create Free Account
            </router-link>
            <router-link
              v-else
              to="/dashboard"
              class="glass-btn-primary text-base px-10 py-3"
            >
              Go to Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()

const stats = [
  { value: '12+', label: 'Engineering Projects' },
  { value: '6',   label: 'Desktop & Web Apps' },
  { value: '3+',  label: 'Years Experience' },
]

const techStack = [
  'Python', 'Apache Spark', 'Apache Kafka', 'Apache Airflow',
  'dbt', 'Snowflake', 'BigQuery', 'AWS', 'GCP', 'Docker',
  'Kubernetes', 'PostgreSQL', 'Vue 3', 'FastAPI',
]
</script>
