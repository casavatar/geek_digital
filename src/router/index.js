import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/modules/auth'
import { useAdminStore } from '@/store/modules/admin'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

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
      },
      {
        path: 'docs',
        name: 'Documentation',
        component: () => import('@/pages/Documentation.vue'),
        meta: { title: 'Documentation - GeekDigital' }
      },
      {
        path: 'api-reference',
        name: 'ApiReference',
        component: () => import('@/pages/ApiReference.vue'),
        meta: { title: 'API Reference - GeekDigital' }
      },
      {
        path: 'support',
        name: 'Support',
        component: () => import('@/pages/Support.vue'),
        meta: { title: 'Support - GeekDigital' }
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('@/pages/Blog.vue'),
        meta: { title: 'Blog - GeekDigital' }
      },
      {
        path: 'blog/:slug',
        name: 'BlogPost',
        component: () => import('@/pages/BlogPost.vue'),
        meta: { title: 'Article - GeekDigital' }
      },
      {
        path: 'privacy-policy',
        name: 'PrivacyPolicy',
        component: () => import('@/pages/PrivacyPolicy.vue'),
        meta: { title: 'Privacy Policy - GeekDigital' }
      },
      {
        path: 'terms-of-service',
        name: 'TermsOfService',
        component: () => import('@/pages/TermsOfService.vue'),
        meta: { title: 'Terms of Service - GeekDigital' }
      },
      {
        path: 'cookie-policy',
        name: 'CookiePolicy',
        component: () => import('@/pages/CookiePolicy.vue'),
        meta: { title: 'Cookie Policy - GeekDigital' }
      },
      {
        path: 'refund-policy',
        name: 'RefundPolicy',
        component: () => import('@/pages/RefundPolicy.vue'),
        meta: { title: 'Refund Policy - GeekDigital' }
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
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: '',
        name: 'AdminOverview',
        component: () => import('@/pages/admin/AdminOverview.vue'),
        meta: { title: 'Overview - GeekDigital Admin', requiresAdmin: true }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/pages/admin/AdminUsers.vue'),
        meta: { title: 'Users - GeekDigital Admin', requiresAdmin: true }
      },
      {
        path: 'apps',
        name: 'AdminApps',
        component: () => import('@/pages/admin/AdminApps.vue'),
        meta: { title: 'Applications - GeekDigital Admin', requiresAdmin: true }
      },
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

  document.title = to.meta.title || 'GeekDigital'

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresAdmin) {
    const adminStore = useAdminStore()
    const storeUser = adminStore.getUserByEmail(authStore.user?.email)
    if (!storeUser || storeUser.role !== 'admin') {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  } else if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
