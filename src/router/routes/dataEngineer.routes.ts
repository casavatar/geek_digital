import type { RouteRecordRaw } from 'vue-router'

export const dataEngineerRoutes: RouteRecordRaw[] = [
  {
    path: 'data-engineer',
    meta: {
      title: 'Data Engineering',
      requiresAuth: false,
      section: 'data-engineer'
    },
    children: [
      {
        path: 'pipelines',
        name: 'data-engineer-pipelines',
        component: () => import('../../views/dataEngineer/Pipelines.vue'),
        meta: {
          title: 'Data Pipelines',
          description: 'Manage and monitor your data ingestion and processing pipelines',
          icon: 'lightning-bolt'
        }
      },
      {
        path: 'etl-jobs',
        name: 'data-engineer-etl-jobs',
        component: () => import('../../views/dataEngineer/ETLJobs.vue'),
        meta: {
          title: 'ETL Jobs',
          description: 'Overview and management of your Extract, Transform, Load jobs',
          icon: 'cog'
        }
      },
      {
        path: 'data-models',
        name: 'data-engineer-data-models',
        component: () => import('../../views/dataEngineer/DataModels.vue'),
        meta: {
          title: 'Data Models',
          description: 'Define and manage your data schemas and relationships',
          icon: 'cube'
        }
      }
    ]
  }
]
