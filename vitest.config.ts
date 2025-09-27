import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./src/test-setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'coverage/**',
          'dist/**',
          'packages/*/test{,s}/**',
          '**/*.d.ts',
          'cypress/**',
          'test{,s}/**',
          'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
          '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
          '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
          '**/__tests__/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
          '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/coverage/**',
          '**/*.config.js',
          '**/*.config.ts',
          '**/vite.config.ts',
          '**/vitest.config.ts',
          '**/tailwind.config.js',
          '**/postcss.config.js'
        ],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 75,
          statements: 80
        }
      }
    },
  }),
)
