<template>
  <div>
    <!-- ── HERO ──────────────────────────────────────────────────────────── -->
    <!-- pt-16 clears the fixed navbar (h-16 = 64px). pt-12 adds breathing room →
         total 112px from viewport top, matching pt-28 pages (Catalog, Shop). -->
    <section class="glass-header pt-16">
      <div class="glass-header-ambient" />
      <div class="container-custom pt-12 pb-14 relative z-10">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span class="glass-badge glass-badge-primary mb-3 inline-block">Journal</span>
            <h1 class="text-4xl md:text-5xl font-display font-bold mb-3">
              <span class="gradient-text">GeekDigital Blog</span>
            </h1>
            <p class="text-base max-w-xl" style="color: var(--text-2)">
              Deep dives on data engineering, pipeline architecture, product development,
              and the tools we actually use in production.
            </p>
          </div>
          <!-- Search -->
          <div class="relative md:w-72 flex-shrink-0">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style="color: var(--text-3)"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search articles..."
              class="input pl-10 w-full text-sm"
            />
          </div>
        </div>
      </div>
    </section>

    <div class="luminous-divider" />

    <div class="container-custom py-14">

      <!-- ── CATEGORY FILTER ─────────────────────────────────────────────── -->
      <div class="flex items-center gap-2 flex-wrap mb-10">
        <button
          v-for="cat in CATEGORIES"
          :key="cat"
          @click="setCategory(cat)"
          :class="[
            'category-tab text-sm py-1.5 px-4 rounded-full font-medium transition-all duration-200',
            activeCategory === cat ? 'category-tab-active' : 'category-tab-idle',
          ]"
          :style="activeCategory === cat && cat !== 'All' ? activeCategoryStyle(cat) : ''"
        >
          {{ cat }}
        </button>
      </div>

      <!-- ── FEATURED POST (hero card) ───────────────────────────────────── -->
      <Transition name="fade-slide">
        <div
          v-if="showFeatured && featuredPost"
          class="glass-card glass-card-elevated hover-lift mb-12 overflow-hidden featured-card"
        >
          <div class="grid grid-cols-1 lg:grid-cols-[1fr_55%]">
            <!-- Visual side -->
            <div
              class="flex flex-col items-center justify-center p-14 min-h-64 gap-4"
              :style="`background: linear-gradient(135deg, ${featuredPost.gradient[0]}20, ${featuredPost.gradient[1]}20)`"
            >
              <span class="text-7xl">{{ featuredPost.emoji }}</span>
              <span class="glass-badge glass-badge-primary text-xs tracking-wider uppercase">
                Featured Article
              </span>
            </div>
            <!-- Content side -->
            <div class="p-8 md:p-10 flex flex-col justify-center">
              <div class="flex items-center gap-2 mb-4 flex-wrap">
                <span
                  class="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  :style="categoryStyle(featuredPost.category)"
                >
                  {{ featuredPost.category }}
                </span>
                <span class="flex items-center gap-1 text-xs" style="color: var(--text-3)">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                    <polyline points="12 6 12 12 16 14" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  {{ featuredPost.readTime }} min read
                </span>
              </div>

              <h2 class="text-2xl md:text-3xl font-display font-bold mb-3 leading-tight"
                  style="color: var(--text-1)">
                {{ featuredPost.title }}
              </h2>
              <p class="text-sm leading-relaxed mb-6" style="color: var(--text-3)">
                {{ featuredPost.summary }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mb-6">
                <span
                  v-for="tag in featuredPost.tags.slice(0, 4)"
                  :key="tag"
                  class="text-xs px-2 py-0.5 rounded"
                  style="background: var(--glass-bg-2); color: var(--text-3); border: 1px solid var(--glass-border)"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    :style="`background: linear-gradient(135deg, ${featuredPost.gradient[0]}, ${featuredPost.gradient[1]})`"
                  >
                    {{ featuredPost.author.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-medium" style="color: var(--text-1)">
                      {{ featuredPost.author.name }}
                    </p>
                    <p class="text-xs" style="color: var(--text-3)">
                      {{ featuredPost.dateFormatted }}
                    </p>
                  </div>
                </div>
                <router-link :to="`/blog/${featuredPost.slug}`" class="btn btn-primary text-sm">
                  Read article
                  <svg class="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- ── ARTICLE GRID ────────────────────────────────────────────────── -->
      <div v-if="gridPosts.length > 0">
        <!-- Result count -->
        <p class="text-sm mb-5" style="color: var(--text-3)">
          <span v-if="searchQuery">
            {{ gridPosts.length }} result{{ gridPosts.length !== 1 ? 's' : '' }} for
            "<strong style="color: var(--text-2)">{{ searchQuery }}</strong>"
          </span>
          <span v-else>
            {{ gridPosts.length }} article{{ gridPosts.length !== 1 ? 's' : '' }}
            <span v-if="activeCategory !== 'All'">
              in <strong style="color: var(--text-2)">{{ activeCategory }}</strong>
            </span>
          </span>
        </p>

        <TransitionGroup
          name="grid-fade"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <BlogCard
            v-for="post in gridPosts"
            :key="post.id"
            :post="post"
          />
        </TransitionGroup>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-24">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-lg font-display font-semibold mb-2" style="color: var(--text-1)">
          No articles found
        </p>
        <p class="text-sm mb-6" style="color: var(--text-3)">
          Try a different search term or browse all categories.
        </p>
        <button @click="resetFilters" class="btn btn-outline">Clear filters</button>
      </div>

      <!-- ── NEWSLETTER CTA ──────────────────────────────────────────────── -->
      <div class="mt-20 glass-card glass-card-elevated overflow-hidden">
        <div class="relative p-10 text-center">
          <!-- Ambient glow -->
          <div class="absolute inset-0 pointer-events-none"
               style="background: radial-gradient(ellipse 60% 80% at 50% 120%, rgba(38,207,255,0.12), transparent)"/>
          <div class="relative z-10 max-w-lg mx-auto">
            <div class="text-4xl mb-4">📬</div>
            <h2 class="text-2xl font-display font-bold mb-2" style="color: var(--text-1)">
              Stay ahead of the curve
            </h2>
            <p class="text-sm mb-6" style="color: var(--text-3)">
              Get new deep dives on data engineering, architecture, and digital products
              delivered to your inbox. No filler, unsubscribe anytime.
            </p>
            <Transition name="glass-slide-up">
              <div
                v-if="subscribed"
                class="flex items-center justify-center gap-2 mb-4 text-sm"
                style="color: #4ade80"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                You're subscribed — welcome to the community!
              </div>
            </Transition>
            <div class="flex gap-3 max-w-sm mx-auto">
              <input
                v-model="newsletterEmail"
                type="email"
                placeholder="you@example.com"
                class="input flex-1"
                @keydown.enter="subscribe"
              />
              <button @click="subscribe" :disabled="subscribed" class="btn btn-primary px-5">
                {{ subscribed ? 'Done!' : 'Subscribe' }}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BlogCard from '@/components/blog/BlogCard.vue'
import { posts, CATEGORIES, CATEGORY_COLORS, getFeaturedPost } from '@/data/posts.js'

/* ── State ─────────────────────────────────────────────────── */
const activeCategory  = ref('All')
const searchQuery     = ref('')
const newsletterEmail = ref('')
const subscribed      = ref(false)

/* ── Computed ──────────────────────────────────────────────── */
const featuredPost = computed(() => getFeaturedPost())

/** Featured hero is only shown when no filters are active. */
const showFeatured = computed(() => activeCategory.value === 'All' && !searchQuery.value.trim())

/**
 * Posts shown in the grid.
 * Excludes the featured post when the hero is visible to avoid duplication.
 * Applies category and search filters.
 */
const gridPosts = computed(() => {
  let list = posts

  if (showFeatured.value) {
    list = list.filter(p => !p.featured)
  }

  if (activeCategory.value !== 'All') {
    list = list.filter(p => p.category === activeCategory.value)
  }

  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    )
  }

  return list
})

/* ── Helpers ───────────────────────────────────────────────── */
function setCategory(cat) {
  activeCategory.value = cat
  searchQuery.value    = ''
}

function resetFilters() {
  activeCategory.value = 'All'
  searchQuery.value    = ''
}

function categoryStyle(cat) {
  const c = CATEGORY_COLORS[cat] ?? { text: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)' }
  return `color:${c.text}; background:${c.bg}; border:1px solid ${c.border}`
}

function activeCategoryStyle(cat) {
  const c = CATEGORY_COLORS[cat]
  if (!c) return ''
  return `color:${c.text}; background:${c.bg}; border-color:${c.border}`
}

function subscribe() {
  if (!newsletterEmail.value.trim()) return
  subscribed.value      = true
  newsletterEmail.value = ''
  setTimeout(() => { subscribed.value = false }, 6000)
}
</script>

<style scoped>
/* Category filter tabs */
.category-tab {
  border: 1px solid transparent;
  cursor: pointer;
}
.category-tab-idle {
  color: var(--text-3);
  background: transparent;
  border-color: transparent;
}
.category-tab-idle:hover {
  color: var(--text-1);
  background: var(--glass-bg-2);
  border-color: var(--glass-border);
}
.category-tab-active {
  font-weight: 600;
  border-width: 1px;
}
/* "All" tab active state — uses primary colour */
.category-tab-active[style=""] {
  color: #26cfff;
  background: rgba(38,207,255,0.1);
  border-color: rgba(38,207,255,0.25);
}

/* Featured card */
.featured-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
.featured-card:hover { transform: translateY(-4px); }

/* Grid transitions */
.grid-fade-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.grid-fade-enter-from   { opacity: 0; transform: translateY(10px); }
.grid-fade-leave-active { transition: opacity 0.15s ease; position: absolute; }
.grid-fade-leave-to     { opacity: 0; }

/* Hero fade-slide */
.fade-slide-enter-active { transition: all 0.3s ease; }
.fade-slide-enter-from   { opacity: 0; transform: translateY(-8px); }
</style>
