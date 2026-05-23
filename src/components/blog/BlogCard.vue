<template>
  <!-- BlogCard — Renders a single post preview card in the article grid.
       Props : post (object) — a post entry from posts.js
       Emits : nothing — navigates via router-link -->
  <article class="blog-card glass-card glass-card-interactive flex flex-col overflow-hidden">
    <!-- Cover gradient thumbnail -->
    <router-link :to="`/blog/${post.slug}`" class="block" tabindex="-1" aria-hidden="true">
      <div
        class="h-40 flex items-center justify-center text-5xl select-none"
        :style="`background: linear-gradient(135deg, ${post.gradient[0]}22, ${post.gradient[1]}22)`"
      >
        {{ post.emoji }}
      </div>
    </router-link>

    <!-- Card body -->
    <div class="p-5 flex flex-col flex-1">
      <!-- Category + read time -->
      <div class="flex items-center gap-2 mb-3 flex-wrap">
        <span
          class="category-badge text-xs font-semibold px-2.5 py-0.5 rounded-full"
          :style="`background:${color.bg}; color:${color.text}; border:1px solid ${color.border}`"
        >
          {{ post.category }}
        </span>
        <span class="flex items-center gap-1 text-xs" style="color: var(--text-3)">
          <!-- Clock icon -->
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <polyline points="12 6 12 12 16 14" stroke-width="2" stroke-linecap="round"/>
          </svg>
          {{ post.readTime }} min read
        </span>
      </div>

      <!-- Title -->
      <router-link :to="`/blog/${post.slug}`">
        <h3
          class="font-display font-bold text-base leading-snug mb-2 hover:underline decoration-dotted"
          style="color: var(--text-1)"
        >
          {{ post.title }}
        </h3>
      </router-link>

      <!-- Summary -->
      <p class="text-sm leading-relaxed flex-1 mb-4 line-clamp-3" style="color: var(--text-3)">
        {{ post.summary }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mb-4">
        <span
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded"
          style="background: var(--glass-bg-2); color: var(--text-3); border: 1px solid var(--glass-border)"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Footer: author + date + read link -->
      <div
        class="flex items-center justify-between pt-3"
        style="border-top: 1px solid var(--glass-border)"
      >
        <div class="flex items-center gap-2">
          <!-- Author avatar -->
          <div
            class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            :style="`background: linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})`"
          >
            {{ post.author.initials }}
          </div>
          <div>
            <p class="text-xs font-medium leading-none mb-0.5" style="color: var(--text-2)">
              {{ post.author.name }}
            </p>
            <p class="text-xs leading-none" style="color: var(--text-3)">
              {{ post.dateFormatted }}
            </p>
          </div>
        </div>

        <!-- Read article link -->
        <router-link
          :to="`/blog/${post.slug}`"
          class="read-link flex items-center gap-1 text-xs font-medium transition-all duration-150"
          :style="`color: ${color.text}`"
        >
          Read
          <svg class="w-3.5 h-3.5 read-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { CATEGORY_COLORS } from '@/data/posts.js'

const props = defineProps({
  post: { type: Object, required: true },
})

/** Resolves the color palette for this post's category. */
const color = computed(() =>
  CATEGORY_COLORS[props.post.category] ?? { text: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)' }
)
</script>

<style scoped>
.blog-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
.blog-card:hover { transform: translateY(-4px); }

.read-link:hover .read-arrow { transform: translateX(3px); }
.read-arrow { transition: transform 0.15s ease; }

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
