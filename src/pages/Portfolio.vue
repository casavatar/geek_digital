<template>
  <div>
    <!-- ======================================================
         GLASS HEADER
         ====================================================== -->
    <section class="relative overflow-hidden min-h-[420px] flex items-center">
      <!-- Deep aurora background -->
      <div class="absolute inset-0" style="background-color: var(--body-bg)">
        <div class="absolute inset-0"
             style="background: radial-gradient(ellipse 90% 70% at 25% 50%, rgba(0,198,255,0.16) 0%, transparent 62%), radial-gradient(ellipse 70% 60% at 75% 50%, rgba(155,90,255,0.13) 0%, transparent 62%)"/>
      </div>

      <!-- Floating geometric accent -->
      <div class="absolute right-10 top-10 w-40 h-40 rounded-3xl opacity-20 dark:opacity-30 animate-float pointer-events-none"
           style="background: linear-gradient(135deg, rgba(0,198,255,0.3), rgba(155,90,255,0.2)); border: 1px solid rgba(255,255,255,0.1)" />
      <div class="absolute left-16 bottom-8 w-24 h-24 rounded-2xl opacity-15 dark:opacity-25 animate-float-slow pointer-events-none"
           style="background: linear-gradient(135deg, rgba(245,158,11,0.3), rgba(155,90,255,0.2)); border: 1px solid rgba(255,255,255,0.08)" />

      <div class="relative z-10 container-custom py-20 text-center">
        <div class="inline-flex items-center gap-2 mb-6">
          <span class="glass-badge glass-badge-primary text-xs px-3 py-1.5 tracking-wider uppercase font-medium">
            ✦ Portfolio
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 gradient-text">
          Data Engineering<br />Portfolio
        </h1>
        <p class="text-lg max-w-2xl mx-auto" style="color: var(--text-2)">
          Explore professional data engineering projects, ETL solutions, streaming architectures,
          and analytics implementations built for scale.
        </p>
      </div>
    </section>

    <div class="luminous-divider" />

    <!-- ======================================================
         MAIN CONTENT
         ====================================================== -->
    <section class="glass-section">
      <div class="glass-container">
        <div class="max-w-4xl mx-auto">

          <!-- Primary card -->
          <div class="glass-card-elevated p-8 md:p-12 mb-6">
            <!-- Icon -->
            <div class="flex flex-col items-center text-center mb-10">
              <div class="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 animate-float"
                   style="background: linear-gradient(135deg, #00c6ff, #7c3aed); box-shadow: 0 0 32px rgba(0,198,255,0.3)">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>

              <h2 class="text-2xl md:text-3xl font-display font-bold mb-4" style="color: var(--text-1)">
                View My Complete Portfolio
              </h2>
              <p class="text-base max-w-xl leading-relaxed" style="color: var(--text-2)">
                Visit my dedicated portfolio site to explore detailed case studies, architectural diagrams,
                and real-world data engineering solutions built with modern cloud technologies.
              </p>
            </div>

            <!-- Features grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div v-for="feat in features" :key="feat.title"
                   class="glass-card-subtle p-5 text-center group">
                <div class="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                     :style="`background: linear-gradient(135deg, ${feat.from}, ${feat.to}); border: 1px solid ${feat.border}`">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feat.icon"/>
                  </svg>
                </div>
                <h3 class="text-sm font-display font-semibold mb-1" style="color: var(--text-1)">{{ feat.title }}</h3>
                <p class="text-xs" style="color: var(--text-2)">{{ feat.desc }}</p>
              </div>
            </div>

            <!-- CTA -->
            <div class="text-center">
              <a
                href="https://dataengineerportfolio.geekdigital.site/"
                target="_blank"
                rel="noopener noreferrer"
                class="glass-btn-primary inline-flex items-center gap-2 text-base px-8 py-3"
              >
                Visit Portfolio Site
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              <p class="text-xs mt-3" style="color: var(--text-3)">Opens in a new tab</p>
            </div>
          </div>

          <!-- Info cards grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div v-for="card in infoCards" :key="card.title"
                 class="glass-card p-6 glass-hover-lift group">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                     :style="`background: linear-gradient(135deg, ${card.from}, ${card.to}); border: 1px solid ${card.border}`">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="card.icon"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-display font-semibold mb-1.5" style="color: var(--text-1)">{{ card.title }}</h3>
                  <p class="text-sm leading-relaxed" style="color: var(--text-2)">{{ card.desc }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'Real-Time Pipelines',
    desc:  'Streaming ETL and event-driven architectures',
    icon:  'M13 10V3L4 14h7v7l9-11h-7z',
    from:  'rgba(0,198,255,0.18)',
    to:    'rgba(0,198,255,0.06)',
    border:'rgba(0,198,255,0.25)',
  },
  {
    title: 'Data Warehouses',
    desc:  'Modern cloud-native warehouse designs',
    icon:  'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    from:  'rgba(155,90,255,0.18)',
    to:    'rgba(155,90,255,0.06)',
    border:'rgba(155,90,255,0.25)',
  },
  {
    title: 'Analytics Solutions',
    desc:  'Data quality, governance & observability',
    icon:  'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    from:  'rgba(245,158,11,0.18)',
    to:    'rgba(245,158,11,0.06)',
    border:'rgba(245,158,11,0.25)',
  },
]

const infoCards = [
  {
    title: 'Technical Expertise',
    desc:  'Deep-dive projects built with Python, Apache Spark, Kafka, Airflow, dbt, Snowflake, and AWS.',
    icon:  'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    from:  'rgba(0,198,255,0.15)',
    to:    'rgba(0,198,255,0.05)',
    border:'rgba(0,198,255,0.22)',
  },
  {
    title: 'Case Studies',
    desc:  'Detailed project breakdowns with architecture diagrams, challenges faced, and solutions shipped.',
    icon:  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    from:  'rgba(155,90,255,0.15)',
    to:    'rgba(155,90,255,0.05)',
    border:'rgba(155,90,255,0.22)',
  },
]
</script>
