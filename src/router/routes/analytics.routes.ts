import type { RouteRecordRaw } from 'vue-router'

export const analyticsRoutes: RouteRecordRaw[] = [
  {
    path: 'analytics',
    meta: {
      title: 'Analytics',
      requiresAuth: false,
      section: 'analytics'
    },
    children: [
      {
        path: 'dashboard',
        name: 'analytics-dashboard',
        component: () => import('../../views/analytics/AnalyticsDashboard.vue'),
        meta: {
          title: 'Analytics Dashboard',
          description: 'Overview of key analytics metrics and visualizations',
          icon: 'chart-bar'
        }
      },
      {
        path: 'reports',
        name: 'analytics-reports',
        component: () => import('../../views/analytics/Reports.vue'),
        meta: {
          title: 'Analytics Reports',
          description: 'Access and generate various data reports',
          icon: 'document-text'
        }
      },
      {
        path: 'metrics',
        name: 'analytics-metrics',
        component: () => import('../../views/analytics/Metrics.vue'),
        meta: {
          title: 'Analytics Metrics',
          description: 'Monitor key performance indicators and data trends',
          icon: 'chart-line'
        }
      }
    ]
  }
]
