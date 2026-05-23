<template>
  <!-- BlogPost — Full article detail page.
       Reads the :slug param from the route, resolves it against posts.js,
       and renders a two-column layout: prose content (70%) + sticky sidebar (30%). -->
  <div>

    <!-- ── 404 state ──────────────────────────────────────────────────────── -->
    <div v-if="!post" class="container-custom pt-40 pb-24 text-center">
      <div class="text-6xl mb-4">📭</div>
      <h1 class="text-2xl font-display font-bold mb-2" style="color: var(--text-1)">Article not found</h1>
      <p class="text-sm mb-6" style="color: var(--text-3)">
        This post may have been moved or deleted.
      </p>
      <router-link to="/blog" class="btn btn-primary">Back to blog</router-link>
    </div>

    <!-- ── Article ────────────────────────────────────────────────────────── -->
    <div v-else>

      <!-- ── POST HERO ────────────────────────────────────────────────────── -->
      <!-- pt-16 clears the fixed navbar. pt-12 adds breathing room (total 112px). -->
      <section class="glass-header pt-16">
        <div class="glass-header-ambient" />

        <!-- Cover strip -->
        <div
          class="w-full h-48 md:h-64 flex items-center justify-center text-7xl md:text-8xl"
          :style="`background: linear-gradient(135deg, ${post.gradient[0]}20, ${post.gradient[1]}20)`"
        >
          {{ post.emoji }}
        </div>

        <div class="container-custom pt-10 pb-12 relative z-10">
          <!-- Breadcrumbs -->
          <nav class="flex items-center gap-2 text-xs mb-6 flex-wrap" style="color: var(--text-3)">
            <router-link to="/" class="hover:underline" style="color: var(--text-3)">Home</router-link>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <router-link to="/blog" class="hover:underline" style="color: var(--text-3)">Blog</router-link>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
            <span
              class="px-2 py-0.5 rounded-full text-xs font-semibold"
              :style="categoryStyle"
            >
              {{ post.category }}
            </span>
          </nav>

          <!-- Title -->
          <h1
            class="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-6 max-w-4xl"
            style="color: var(--text-1)"
          >
            {{ post.title }}
          </h1>

          <!-- Metadata row -->
          <div class="flex items-center gap-5 flex-wrap">
            <!-- Author -->
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                :style="`background: linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})`"
              >
                {{ post.author.initials }}
              </div>
              <div>
                <p class="text-sm font-semibold" style="color: var(--text-1)">{{ post.author.name }}</p>
                <p class="text-xs" style="color: var(--text-3)">{{ post.author.role }}</p>
              </div>
            </div>

            <div class="w-px h-8" style="background: var(--glass-border)" />

            <!-- Date -->
            <div class="flex items-center gap-1.5 text-sm" style="color: var(--text-3)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke-width="2" stroke-linecap="round"/>
                <line x1="8"  y1="2" x2="8"  y2="6" stroke-width="2" stroke-linecap="round"/>
                <line x1="3"  y1="10" x2="21" y2="10" stroke-width="2"/>
              </svg>
              {{ post.dateFormatted }}
            </div>

            <!-- Reading time -->
            <div class="flex items-center gap-1.5 text-sm" style="color: var(--text-3)">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                <polyline points="12 6 12 12 16 14" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ post.readTime }} min read
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-5">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs px-2.5 py-1 rounded-full"
              style="background: var(--glass-bg-2); color: var(--text-3); border: 1px solid var(--glass-border)"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </section>

      <div class="luminous-divider" />

      <!-- ── TWO-COLUMN LAYOUT ─────────────────────────────────────────────── -->
      <div class="container-custom py-14">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">

          <!-- ── MAIN COLUMN: Article prose ─────────────────────────────────── -->
          <article>
            <div class="prose" v-html="post.content" />

            <!-- Related posts -->
            <div class="mt-14 pt-10" style="border-top: 1px solid var(--glass-border)">
              <h2 class="text-lg font-display font-bold mb-6" style="color: var(--text-1)">
                Related Articles
              </h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <router-link
                  v-for="related in relatedPosts"
                  :key="related.id"
                  :to="`/blog/${related.slug}`"
                  class="glass-card glass-card-interactive p-4 flex items-start gap-3 group"
                >
                  <span class="text-2xl flex-shrink-0">{{ related.emoji }}</span>
                  <div>
                    <p class="text-sm font-semibold leading-snug group-hover:underline decoration-dotted"
                       style="color: var(--text-1)">
                      {{ related.title }}
                    </p>
                    <p class="text-xs mt-1" style="color: var(--text-3)">
                      {{ related.readTime }} min read · {{ related.dateFormatted }}
                    </p>
                  </div>
                </router-link>
              </div>
            </div>

            <!-- Comments -->
            <div class="mt-14 pt-10" style="border-top: 1px solid var(--glass-border)">
              <CommentSection
                :slug="post.slug"
                :initial-comments="post.initialComments"
              />
            </div>
          </article>

          <!-- ── SIDEBAR ────────────────────────────────────────────────────── -->
          <aside class="hidden lg:block">
            <div class="sticky top-24 space-y-5">

              <!-- Table of Contents -->
              <div class="glass-card p-5" v-if="tocItems.length > 0">
                <p class="text-xs font-semibold uppercase tracking-widest mb-4"
                   style="color: var(--text-3)">
                  In this article
                </p>
                <nav>
                  <ul class="space-y-1">
                    <li v-for="item in tocItems" :key="item.id">
                      <a
                        :href="`#${item.id}`"
                        @click.prevent="scrollTo(item.id)"
                        :class="[
                          'toc-link block px-3 py-1.5 rounded-lg text-sm transition-all duration-150',
                          activeHeading === item.id ? 'toc-link-active' : '',
                        ]"
                      >
                        {{ item.text }}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <!-- Progress indicator -->
              <div class="glass-card p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs" style="color: var(--text-3)">Reading progress</span>
                  <span class="text-xs font-semibold" style="color: #26cfff">{{ readProgress }}%</span>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background: var(--glass-bg-2)">
                  <div
                    class="h-full rounded-full transition-all duration-300"
                    style="background: linear-gradient(90deg, #26cfff, #9b5aff)"
                    :style="`width: ${readProgress}%`"
                  />
                </div>
              </div>

              <!-- CTA Widget -->
              <div
                class="glass-card overflow-hidden"
                style="border: 1px solid rgba(38,207,255,0.2)"
              >
                <div
                  class="h-2"
                  style="background: linear-gradient(90deg, #26cfff, #9b5aff)"
                />
                <div class="p-5">
                  <div class="text-2xl mb-3">🚀</div>
                  <h3 class="font-display font-bold text-sm mb-2" style="color: var(--text-1)">
                    Level up your data stack
                  </h3>
                  <p class="text-xs leading-relaxed mb-4" style="color: var(--text-3)">
                    Get the Data Pipeline Starter Kit — production-ready templates for Airflow,
                    dbt, and Delta Lake with step-by-step guides.
                  </p>
                  <router-link to="/shop" class="btn btn-primary w-full justify-center text-sm">
                    View in Shop
                  </router-link>
                  <p class="text-xs text-center mt-2" style="color: var(--text-3)">
                    From $49 · Instant download
                  </p>
                </div>
              </div>

              <!-- Share -->
              <div class="glass-card p-5">
                <p class="text-xs font-semibold uppercase tracking-widest mb-3"
                   style="color: var(--text-3)">
                  Share this article
                </p>
                <div class="flex items-center gap-2">
                  <a
                    :href="`https://x.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${currentUrl}`"
                    target="_blank" rel="noopener noreferrer"
                    class="btn btn-ghost text-xs py-2 px-3 flex-1 justify-center"
                    title="Share on X"
                  >
                    𝕏 Tweet
                  </a>
                  <button
                    @click="copyLink"
                    class="btn btn-ghost text-xs py-2 px-3 flex-1 justify-center"
                    :title="linkCopied ? 'Copied!' : 'Copy link'"
                  >
                    {{ linkCopied ? '✓ Copied' : '🔗 Copy link' }}
                  </button>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import CommentSection from '@/components/blog/CommentSection.vue'
import { getPostBySlug, posts, CATEGORY_COLORS } from '@/data/posts.js'

const route = useRoute()

/* ── Post resolution ───────────────────────────────────────── */
const post = computed(() => getPostBySlug(route.params.slug))

/** Up to 2 posts from the same category, excluding the current post. */
const relatedPosts = computed(() => {
  if (!post.value) return []
  return posts
    .filter(p => p.id !== post.value.id && p.category === post.value.category)
    .slice(0, 2)
})

/** Inline style string for the category badge. */
const categoryStyle = computed(() => {
  const c = CATEGORY_COLORS[post.value?.category]
  if (!c) return ''
  return `color:${c.text}; background:${c.bg}; border:1px solid ${c.border}`
})

/* ── Page title ────────────────────────────────────────────── */
watch(post, (p) => {
  document.title = p ? `${p.title} — GeekDigital` : 'Article — GeekDigital'
}, { immediate: true })

/* ── Table of Contents ─────────────────────────────────────── */
/** Parses <h2 id="..."> tags from the post HTML to build the TOC. */
const tocItems = computed(() => {
  if (!post.value) return []
  const tmp = document.createElement('div')
  tmp.innerHTML = post.value.content
  return [...tmp.querySelectorAll('h2[id]')].map(h => ({
    id:   h.id,
    text: h.textContent,
  }))
})

const activeHeading = ref('')

/** Smooth-scroll to a heading and update the active TOC item. */
function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 88 // navbar height + some breathing room
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

/* ── Reading progress ──────────────────────────────────────── */
const readProgress = ref(0)

function updateProgress() {
  const doc    = document.documentElement
  const scroll = doc.scrollTop || document.body.scrollTop
  const height = doc.scrollHeight - doc.clientHeight
  readProgress.value = height > 0 ? Math.round((scroll / height) * 100) : 0
}

/* ── IntersectionObserver for active TOC heading ───────────── */
let headingObserver = null

function initObserver() {
  if (headingObserver) headingObserver.disconnect()
  headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activeHeading.value = entry.target.id
    })
  }, { rootMargin: '-15% 0px -75% 0px' })

  document.querySelectorAll('.prose h2[id]').forEach(h => headingObserver.observe(h))
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  // Defer observer init until content is rendered
  setTimeout(initObserver, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  headingObserver?.disconnect()
})

/* ── Share ─────────────────────────────────────────────────── */
const linkCopied   = ref(false)
const currentUrl   = computed(() => window.location.href)

function copyLink() {
  navigator.clipboard.writeText(currentUrl.value)
  linkCopied.value = true
  setTimeout(() => { linkCopied.value = false }, 2500)
}
</script>

<style scoped>
/* ── Prose content styles ── */
.prose { color: var(--text-2); line-height: 1.8; }

.prose :deep(h2) {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-1);
  margin: 2.5rem 0 0.875rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--glass-border);
  font-family: inherit;
  scroll-margin-top: 88px;
}

.prose :deep(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-1);
  margin: 1.75rem 0 0.625rem;
}

.prose :deep(p) {
  margin-bottom: 1.1rem;
  max-width: 72ch;
}

.prose :deep(blockquote) {
  border-left: 3px solid #26cfff;
  padding: 0.875rem 1.25rem;
  margin: 1.75rem 0;
  background: rgba(38, 207, 255, 0.06);
  border-radius: 0 0.5rem 0.5rem 0;
}
.prose :deep(blockquote p) {
  margin: 0;
  font-style: italic;
  color: var(--text-2);
}

.prose :deep(pre) {
  background: rgba(0, 0, 0, 0.38);
  border: 1px solid var(--glass-border);
  border-radius: 0.625rem;
  padding: 1.25rem 1.375rem;
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 0.78rem;
  line-height: 1.75;
  color: #e2e8f0;
  margin: 1.5rem 0;
}

.prose :deep(code) {
  font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 0.82em;
  background: rgba(38, 207, 255, 0.1);
  color: #26cfff;
  padding: 2px 6px;
  border-radius: 3px;
}
.prose :deep(pre code) {
  background: transparent;
  color: #e2e8f0;
  padding: 0;
  font-size: 1em;
}

.prose :deep(ul) {
  list-style: none;
  padding: 0;
  margin: 1rem 0 1.25rem;
  space-y: 0.5rem;
}
.prose :deep(li) {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.25rem 0;
  color: var(--text-2);
  font-size: 0.95rem;
}
.prose :deep(li)::before {
  content: '';
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #26cfff;
  flex-shrink: 0;
  margin-top: 0.55em;
}

.prose :deep(strong) { color: var(--text-1); font-weight: 600; }
.prose :deep(em)     { color: var(--text-2); }

.prose :deep(a) { color: #26cfff; text-decoration: underline; text-decoration-style: dotted; }
.prose :deep(a:hover) { text-decoration-style: solid; }

/* ── TOC ── */
.toc-link { color: var(--text-3); text-decoration: none; font-size: 0.83rem; }
.toc-link:hover { color: var(--text-1); background: var(--glass-bg-2); }
.toc-link-active { color: #26cfff !important; background: rgba(38,207,255,0.08) !important; font-weight: 500; }
</style>
