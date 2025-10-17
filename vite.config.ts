import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Only enable DevTools in development
    ...(process.env.NODE_ENV === 'development' ? [vueDevTools()] : []),
    tailwindcss(),
    // Security headers plugin
    {
      name: 'security-headers',
      configureServer(server) {
        server.middlewares.use((_req, res, next) => {
          // Content Security Policy
          res.setHeader(
            'Content-Security-Policy',
            "default-src 'self'; " +
              "script-src 'self'; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https:; " +
              "font-src 'self' data:; " +
              "connect-src 'self'; " +
              "frame-ancestors 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self';",
          )
          // Prevent clickjacking
          res.setHeader('X-Frame-Options', 'DENY')
          // Prevent MIME sniffing
          res.setHeader('X-Content-Type-Options', 'nosniff')
          // Referrer policy
          res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
          // Permissions policy
          res.setHeader(
            'Permissions-Policy',
            'geolocation=(), microphone=(), camera=(), payment=()',
          )
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
