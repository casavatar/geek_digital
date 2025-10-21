<template>
  <div class="py-12 bg-gray-50">
    <div class="container-custom">
      <h1 class="text-4xl font-bold mb-4">Data Engineering Portfolio</h1>
      <p class="text-xl text-gray-600 mb-12">
        Explore my professional data engineering projects and solutions
      </p>

      <!-- Projects grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          v-for="project in projects"
          :key="project.id"
          class="card hover:shadow-lg transition-shadow"
        >
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-2xl font-semibold">{{ project.title }}</h3>
            <span class="text-sm bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full">
              {{ project.technology }}
            </span>
          </div>
          <p class="text-gray-600 mb-4">{{ project.description }}</p>

          <div class="space-y-2 mb-4">
            <h4 class="font-semibold text-sm text-gray-700">Key Features:</h4>
            <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>

          <div class="flex gap-2 flex-wrap">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {{ tag }}
            </span>
          </div>

          <div class="flex gap-3 mt-4 pt-4 border-t border-gray-200">
            <a href="#" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
              View Details →
            </a>
            <a
              v-if="project.github"
              :href="project.github"
              target="_blank"
              class="text-gray-600 hover:text-gray-700 font-medium text-sm"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    id: 1,
    title: 'Real-time Streaming ETL Pipeline',
    technology: 'Apache Kafka',
    description: 'Built a scalable real-time data pipeline processing millions of events per day with Apache Kafka, Spark Streaming, and PostgreSQL.',
    features: [
      'Processes 5M+ events daily',
      'Sub-second latency',
      'Automatic failover and recovery',
      'Real-time data quality checks'
    ],
    tags: ['Kafka', 'Spark', 'Python', 'PostgreSQL', 'Docker'],
    github: '#'
  },
  {
    id: 2,
    title: 'Data Warehouse Modernization',
    technology: 'Snowflake',
    description: 'Migrated legacy data warehouse to Snowflake, implementing modern ELT patterns and reducing query times by 80%.',
    features: [
      'Automated dbt transformations',
      '80% query performance improvement',
      'Cost reduction of 40%',
      'Comprehensive data lineage'
    ],
    tags: ['Snowflake', 'dbt', 'SQL', 'Python', 'Airflow']
  },
  {
    id: 3,
    title: 'ML Feature Store',
    technology: 'AWS',
    description: 'Developed centralized feature store for ML models using AWS services, serving 50+ ML models in production.',
    features: [
      'Low-latency feature serving',
      'Feature versioning and lineage',
      'Real-time and batch pipelines',
      'Integrated monitoring'
    ],
    tags: ['AWS', 'SageMaker', 'DynamoDB', 'Lambda', 'Python']
  },
  {
    id: 4,
    title: 'Data Quality Framework',
    technology: 'Great Expectations',
    description: 'Implemented comprehensive data quality framework with automated testing, monitoring, and alerting.',
    features: [
      '200+ data quality tests',
      'Automated anomaly detection',
      'Slack/email alerting',
      'Historical trend analysis'
    ],
    tags: ['Python', 'Great Expectations', 'Airflow', 'PostgreSQL']
  }
])
</script>
