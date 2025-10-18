import { fileURLToPath, URL } from 'node:url'
import type { ServerResponse } from 'node:http'

import { defineConfig } from 'vite'
import type { Connect, ViteDevServer } from 'vite'
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
    // Security headers plugin (only for production builds)
    ...(process.env.NODE_ENV === 'production'
      ? [
          {
            name: 'security-headers',
            configureServer(server: ViteDevServer) {
              server.middlewares.use(
                (
                  _req: Connect.IncomingMessage,
                  res: ServerResponse,
                  next: Connect.NextFunction,
                ) => {
                  // Content Security Policy - Production
                  res.setHeader(
                    'Content-Security-Policy',
                    "default-src 'self'; " +
                      "script-src 'self' 'unsafe-inline'; " +
                      "style-src 'self' 'unsafe-inline'; " +
                      "img-src 'self' data: https: blob:; " +
                      "font-src 'self' data:; " +
                      "connect-src 'self'; " +
                      "frame-ancestors 'none'; " +
                      "base-uri 'self'; " +
                      "form-action 'self'; " +
                      "object-src 'none';",
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
                  // Strict Transport Security (HTTPS only)
                  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
                  next()
                },
              )
            },
          },
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Development server configuration
  server: {
    port: 5174,
    strictPort: false,
    host: true,
    open: true,
    cors: true,
    // Enable HMR
    hmr: {
      overlay: true,
    },
  },
  // Build optimizations
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'chart-vendor': ['chart.js', 'vue-chartjs'],
        },
      },
    },
  },
  // Optimizations
  optimizeDeps: {
    include: ['vue', 'vue-router', 'chart.js', 'vue-chartjs'],
    exclude: ['vite-plugin-vue-devtools'],
  },
})
