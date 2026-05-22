<template>
  <footer class="relative mt-auto" style="background: var(--glass-bg-1); border-top: 1px solid var(--glass-border); backdrop-filter: blur(20px);">
    <!-- Aurora top line -->
    <div class="luminous-divider w-full" />

    <div class="container-custom py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

        <!-- Brand -->
        <div class="md:col-span-1">
          <div class="mb-4">
            <img :src="logoUrl" alt="GeekDigital" class="h-8 w-auto" />
          </div>
          <p class="text-sm leading-relaxed" style="color: var(--text-3)">
            Professional data engineering portfolio and curated digital products platform.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-display font-semibold mb-4 tracking-wide uppercase" style="color: var(--text-2)">Navigate</h3>
          <ul class="space-y-2.5">
            <li v-for="link in quickLinks" :key="link.to">
              <router-link :to="link.to" class="footer-link">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-sm font-display font-semibold mb-4 tracking-wide uppercase" style="color: var(--text-2)">Resources</h3>
          <ul class="space-y-2.5">
            <li v-for="item in resources" :key="item">
              <a href="#" class="footer-link">{{ item }}</a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-sm font-display font-semibold mb-4 tracking-wide uppercase" style="color: var(--text-2)">Legal</h3>
          <ul class="space-y-2.5">
            <li v-for="item in legal" :key="item">
              <a href="#" class="footer-link">{{ item }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
           style="border-top: 1px solid var(--glass-border)">
        <p class="text-xs" style="color: var(--text-3)">
          &copy; {{ currentYear }} GeekDigital. All rights reserved.
        </p>

        <div class="flex items-center gap-4">
          <a v-for="social in socials" :key="social.label" href="#" class="footer-social" :title="social.label">
            <span class="sr-only">{{ social.label }}</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" v-html="social.icon" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import logoUrl from '@/components/GeekDigital.webp'

const currentYear = computed(() => new Date().getFullYear())

const quickLinks = [
  { to: '/',          label: 'Home' },
  { to: '/catalog',   label: 'App Catalog' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/shop',      label: 'Shop' },
]

const resources = ['Documentation', 'API Reference', 'Support', 'Blog']
const legal     = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy']

const socials = [
  {
    label: 'GitHub',
    icon: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>',
  },
  {
    label: 'LinkedIn',
    icon: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  },
  {
    label: 'Twitter / X',
    icon: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
  },
]
</script>

<style scoped>
.footer-link {
  font-size: 0.875rem;
  color: var(--text-3);
  transition: color 0.18s ease;
  text-decoration: none;
}

.footer-link:hover {
  color: #26cfff;
}

.footer-social {
  color: var(--text-3);
  transition: color 0.18s ease, transform 0.18s ease;
  display: inline-block;
}

.footer-social:hover {
  color: #26cfff;
  transform: translateY(-2px);
}
</style>
