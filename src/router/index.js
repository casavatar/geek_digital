import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/Home.vue'),
        meta: { title: 'GeekDigital - Home' }
      },
      {
        path: 'catalog',
        name: 'Catalog',
        component: () => import('@/pages/Catalog.vue'),
        meta: { title: 'App Catalog - GeekDigital' }
      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: () => import('@/pages/Portfolio.vue'),
        meta: { title: 'Portfolio - GeekDigital' }
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('@/pages/Shop.vue'),
        meta: { title: 'Shop - GeekDigital' }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/Dashboard.vue'),
        meta: {
          title: 'Dashboard - GeekDigital',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/Login.vue'),
        meta: {
          title: 'Login - GeekDigital',
          guest: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
    meta: { title: '404 - Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Set page title
  document.title = to.meta.title || 'GeekDigital'

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  // Redirect authenticated users away from guest-only pages
  else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  }
  else {
    next()
  }
})

export default router
