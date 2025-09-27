import { createRouter, createWebHistory } from 'vue-router'
import { dashboardRoutes } from './routes/dashboard.routes'
// import { authRoutes } from './routes/auth.routes' // TODO: Enable when auth views are created
import { notFoundRoutes } from './routes/notFound.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Dashboard routes (main layout with home and nested routes)
    ...dashboardRoutes,
    
    // Authentication routes (standalone) - TODO: Enable when auth views are created
    // ...authRoutes,
    
    // 404 and other utility routes
    ...notFoundRoutes,
  ],
})

export default router
