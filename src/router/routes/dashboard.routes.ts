import type { RouteRecordRaw } from 'vue-router'
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import { analyticsRoutes } from './analytics.routes'
import { dataEngineerRoutes } from './dataEngineer.routes'

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DashboardLayout,
    meta: {
      title: 'Dashboard',
      requiresAuth: false,
      layout: 'dashboard'
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../../views/HomeView.vue'),
        meta: {
          title: 'Home - Data Portfolio',
          description: 'Eduardo Castellanos - Data Engineer & Analyst Portfolio'
        }
      },
      // Include analytics routes as children
      ...analyticsRoutes,
      // Include data engineer routes as children
      ...dataEngineerRoutes
    ]
  }
]
