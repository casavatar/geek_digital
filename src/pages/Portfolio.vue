<template>
  <div>
    <!-- Glass Header Section -->
    <section class="glass-header">
      <div class="glass-header-ambient"></div>
      <div class="glass-header-content">
        <h1 class="glass-header-title">Data Engineering Portfolio</h1>
        <p class="glass-header-subtitle">
          Explore professional data engineering projects, ETL solutions, and analytics implementations
        </p>
      </div>
    </section>

    <!-- Portfolio Content Section -->
    <section class="glass-section bg-gray-50 dark:bg-gray-900">
      <div class="glass-container">
        <!-- Portfolio Card -->
        <div class="max-w-4xl mx-auto">
          <div class="glass-card-elevated p-8 md:p-12">
            <!-- Icon and Title -->
            <div class="flex flex-col items-center text-center mb-8">
              <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                View My Complete Portfolio
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Visit my dedicated portfolio site to explore detailed case studies, technical implementations,
                and real-world data engineering solutions.
              </p>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="text-center p-4">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">Real-Time Pipelines</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Streaming ETL solutions</p>
              </div>

              <div class="text-center p-4">
                <div class="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">Data Warehouses</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Modern cloud architectures</p>
              </div>

              <div class="text-center p-4">
                <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-1">Analytics Solutions</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">Data quality & governance</p>
              </div>
            </div>

            <!-- CTA Button -->
            <div class="text-center">
              <a
                href="https://dataengineerportfolio.geekdigital.site/"
                target="_blank"
                rel="noopener noreferrer"
                class="glass-btn-primary inline-flex items-center gap-2 text-lg"
              >
                Visit Portfolio Site
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Opens in a new tab
              </p>
            </div>
          </div>
        </div>

        <!-- Additional Info Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
          <div class="glass-card p-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Technical Expertise</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Deep dive into projects built with Python, Apache Spark, Kafka, Airflow, dbt, Snowflake, and AWS.
                </p>
              </div>
            </div>
          </div>

          <div class="glass-card p-6">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-2">Case Studies</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Detailed project breakdowns with architecture diagrams, challenges faced, and solutions implemented.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No data needed - this is a redirect/link page
</script>
