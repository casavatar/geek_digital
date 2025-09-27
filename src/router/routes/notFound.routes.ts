import type { RouteRecordRaw } from 'vue-router'

export const notFoundRoutes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../../views/AboutView.vue'),
    meta: {
      title: 'About',
      description: 'About Eduardo Castellanos - Data Engineer & Analyst',
      requiresAuth: false,
      layout: 'public'
    }
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import('../../views/NotFoundView.vue'),
    meta: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist',
      requiresAuth: false,
      layout: 'public',
      hideFromNavigation: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'catch-all',
    redirect: '/404',
    meta: {
      hideFromNavigation: true
    }
  }
]
