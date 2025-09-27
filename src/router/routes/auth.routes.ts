import type { RouteRecordRaw } from 'vue-router'

// TODO: Create auth views before enabling these routes
// Create the following views in src/views/auth/:
// - LoginView.vue
// - RegisterView.vue  
// - ForgotPasswordView.vue
// - ResetPasswordView.vue

export const authRoutes: RouteRecordRaw[] = [
  // {
  //   path: '/auth',
  //   meta: {
  //     title: 'Authentication',
  //     requiresAuth: false,
  //     layout: 'auth',
  //     hideFromNavigation: true
  //   },
  //   children: [
  //     {
  //       path: 'login',
  //       name: 'auth-login',
  //       component: () => import('../../views/auth/LoginView.vue'),
  //       meta: {
  //         title: 'Login',
  //         description: 'Sign in to your account',
  //         requiresGuest: true
  //       }
  //     },
  //     {
  //       path: 'register',
  //       name: 'auth-register',
  //       component: () => import('../../views/auth/RegisterView.vue'),
  //       meta: {
  //         title: 'Register',
  //         description: 'Create a new account',
  //         requiresGuest: true
  //       }
  //     },
  //     {
  //       path: 'forgot-password',
  //       name: 'auth-forgot-password',
  //       component: () => import('../../views/auth/ForgotPasswordView.vue'),
  //       meta: {
  //         title: 'Forgot Password',
  //         description: 'Reset your password',
  //         requiresGuest: true
  //       }
  //     },
  //     {
  //       path: 'reset-password',
  //       name: 'auth-reset-password',
  //       component: () => import('../../views/auth/ResetPasswordView.vue'),
  //       meta: {
  //         title: 'Reset Password',
  //         description: 'Set your new password',
  //         requiresGuest: true
  //       }
  //     }
  //   ]
  // }
]
