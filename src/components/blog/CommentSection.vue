<template>
  <!-- CommentSection — Displays reader comments and a submission form.
       State is seeded from initialComments prop and extended via localStorage.
       Storage key: `gd_comments_${slug}` — one entry per article. -->
  <section class="space-y-6">
    <div class="flex items-center gap-3">
      <h2 class="text-xl font-display font-bold" style="color: var(--text-1)">
        Discussion
      </h2>
      <span
        class="text-sm font-semibold px-2.5 py-0.5 rounded-full"
        style="background: rgba(38,207,255,0.12); color: #26cfff; border: 1px solid rgba(38,207,255,0.25)"
      >
        {{ allComments.length }}
      </span>
    </div>

    <!-- Comment list -->
    <div class="space-y-4">
      <TransitionGroup name="comment-list" tag="div" class="space-y-4">
        <div
          v-for="comment in allComments"
          :key="comment.id"
          class="glass-card p-5"
        >
          <div class="flex items-start gap-3">
            <!-- Avatar -->
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              :style="`background: ${avatarGradient(comment.author)}`"
            >
              {{ comment.initials }}
            </div>
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-baseline gap-2 mb-1.5 flex-wrap">
                <span class="text-sm font-semibold" style="color: var(--text-1)">
                  {{ comment.author }}
                </span>
                <span class="text-xs" style="color: var(--text-3)">{{ comment.date }}</span>
              </div>
              <p class="text-sm leading-relaxed" style="color: var(--text-2)">
                {{ comment.content }}
              </p>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Add comment form -->
    <div class="glass-card">
      <div class="glass-card-header">
        <h3 class="font-display font-semibold" style="color: var(--text-1)">
          Add to the discussion
        </h3>
        <p class="text-xs mt-0.5" style="color: var(--text-3)">
          Share your thoughts, questions, or improvements.
        </p>
      </div>
      <div class="glass-card-body space-y-4">
        <!-- Success message -->
        <Transition name="glass-slide-up">
          <div
            v-if="submitted"
            class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style="background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.25); color: #4ade80"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Comment published! Thanks for joining the discussion.
          </div>
        </Transition>

        <!-- Error message -->
        <Transition name="glass-slide-up">
          <div
            v-if="formError"
            class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
            style="background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.25); color: #f87171"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ formError }}
          </div>
        </Transition>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-1.5" style="color: var(--text-2)">
              Your name <span style="color: #f87171">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Eduardo Castellanos"
              class="input w-full"
              maxlength="60"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1.5" style="color: var(--text-2)">
              Role / Company <span class="text-xs font-normal" style="color: var(--text-3)">(optional)</span>
            </label>
            <input
              v-model="form.role"
              type="text"
              placeholder="Data Engineer at Acme"
              class="input w-full"
              maxlength="60"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5" style="color: var(--text-2)">
            Comment <span style="color: #f87171">*</span>
          </label>
          <textarea
            v-model="form.content"
            rows="4"
            placeholder="Share your experience, ask a question, or suggest an improvement..."
            class="input w-full resize-none"
            maxlength="1200"
          />
          <p class="text-xs mt-1 text-right" style="color: var(--text-3)">
            {{ form.content.length }} / 1200
          </p>
        </div>
      </div>
      <div class="glass-card-footer flex items-center justify-between gap-4">
        <p class="text-xs" style="color: var(--text-3)">
          Comments are stored locally in your browser.
        </p>
        <button
          @click="submitComment"
          :disabled="submitting"
          class="btn btn-primary flex items-center gap-2"
        >
          <svg
            v-if="submitting"
            class="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
          {{ submitting ? 'Publishing...' : 'Publish comment' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  /** Post slug — used as localStorage key to isolate comments per article. */
  slug:            { type: String,  required: true },
  /** Seed comments from post data shown before any user adds new ones. */
  initialComments: { type: Array,   default: () => [] },
})

const STORAGE_KEY = computed(() => `gd_comments_${props.slug}`)

const userComments = ref([])
const form         = ref({ name: '', role: '', content: '' })
const submitting   = ref(false)
const submitted    = ref(false)
const formError    = ref('')

/** Merge seed comments with user-added comments from localStorage. */
const allComments = computed(() => [...props.initialComments, ...userComments.value])

onMounted(() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY.value)
    if (stored) userComments.value = JSON.parse(stored)
  } catch {
    userComments.value = []
  }
})

/** Saves comments array to localStorage. */
function persist() {
  localStorage.setItem(STORAGE_KEY.value, JSON.stringify(userComments.value))
}

/** Generates a stable gradient for an author's avatar based on their name. */
function avatarGradient(name) {
  const colors = [
    ['#26cfff', '#9b5aff'],
    ['#4ade80', '#26cfff'],
    ['#fbbf24', '#fb923c'],
    ['#f87171', '#9b5aff'],
    ['#a78bfa', '#4ade80'],
  ]
  const idx = name.charCodeAt(0) % colors.length
  return `linear-gradient(135deg, ${colors[idx][0]}, ${colors[idx][1]})`
}

async function submitComment() {
  formError.value  = ''
  submitted.value  = false

  if (!form.value.name.trim())    { formError.value = 'Please enter your name.';    return }
  if (!form.value.content.trim()) { formError.value = 'Please write a comment.';    return }
  if (form.value.content.trim().length < 20) {
    formError.value = 'Comment must be at least 20 characters.'
    return
  }

  submitting.value = true
  await new Promise(r => setTimeout(r, 800))

  const now = new Date()
  const dateFormatted = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const nameRaw = form.value.name.trim()
  const initials = nameRaw.split(' ').map(w => w[0]?.toUpperCase() ?? '').join('').slice(0, 2)

  const newComment = {
    id:      Date.now(),
    author:  nameRaw,
    initials,
    role:    form.value.role.trim(),
    date:    dateFormatted,
    content: form.value.content.trim(),
  }

  userComments.value.push(newComment)
  persist()

  form.value    = { name: '', role: '', content: '' }
  submitting.value = false
  submitted.value  = true
  setTimeout(() => { submitted.value = false }, 5000)
}
</script>

<style scoped>
.comment-list-enter-active { transition: all 0.35s ease; }
.comment-list-enter-from   { opacity: 0; transform: translateY(12px); }
</style>
