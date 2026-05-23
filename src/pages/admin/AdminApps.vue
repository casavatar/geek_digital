<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold" style="color: var(--text-1);">Application Catalog</h2>
      <button @click="openAddModal" class="btn btn-primary flex items-center gap-2">
        <Plus class="w-4 h-4" />
        Add Application
      </button>
    </div>

    <!-- App cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      <div
        v-for="app in adminStore.applications"
        :key="app.id"
        class="glass-card overflow-hidden flex flex-col"
      >
        <!-- Gradient strip -->
        <div
          class="h-1.5 w-full shrink-0"
          :style="`background: linear-gradient(90deg, ${app.gradient[0]}, ${app.gradient[1]});`"
        />

        <!-- Body -->
        <div class="p-5 flex flex-col flex-1">
          <!-- Row 1: emoji + name + status -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <div class="flex items-center gap-2 min-w-0">
              <span class="text-2xl shrink-0">{{ app.emoji }}</span>
              <h3 class="text-base font-bold leading-tight" style="color: var(--text-1);">{{ app.name }}</h3>
            </div>
            <span
              class="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
              :style="app.status === 'active'
                ? 'background: rgba(74,222,128,0.12); color: #4ade80;'
                : 'background: rgba(251,191,36,0.12); color: #fbbf24;'"
            >{{ app.status === 'active' ? 'Active' : 'Maintenance' }}</span>
          </div>

          <!-- Category badge -->
          <span
            class="text-[10px] font-semibold px-2 py-0.5 rounded-full mb-3 self-start"
            style="background: var(--glass-bg-2); color: var(--text-3);"
          >{{ app.category }}</span>

          <!-- Description -->
          <p class="text-xs leading-relaxed mb-4 line-clamp-2" style="color: var(--text-2);">
            {{ app.description }}
          </p>

          <!-- Price info -->
          <div class="mb-4 space-y-1">
            <p class="text-sm font-semibold" style="color: var(--text-1);">${{ app.basePrice }}/mo</p>
            <p class="text-xs" style="color: var(--text-3);">
              ${{ computeAnnualPrice(app) }}/mo annual (–{{ app.annualDiscount }}%)
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 mt-auto">
            <button
              @click="openEditModal(app)"
              class="btn btn-outline flex items-center gap-1.5 text-xs py-1.5 px-3"
            >
              <Pencil class="w-3.5 h-3.5" />
              Edit
            </button>
            <button
              @click="adminStore.toggleAppStatus(app.id)"
              class="btn btn-outline flex items-center gap-1.5 text-xs py-1.5 px-3"
              :style="app.status === 'maintenance' ? 'color: #4ade80; border-color: rgba(74,222,128,0.4);' : ''"
            >
              <Power class="w-3.5 h-3.5" />
              {{ app.status === 'active' ? 'Set Maintenance' : 'Activate' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Add / Edit Modal ── -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          style="background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);"
          @click.self="closeModal"
        >
          <div class="glass-card w-full max-w-lg" style="overflow: visible;">
            <!-- Header -->
            <div class="flex items-center justify-between p-5" style="border-bottom: 1px solid var(--glass-border);">
              <h3 class="text-base font-semibold" style="color: var(--text-1);">
                {{ editingApp ? `Edit — ${editingApp.name}` : 'New Application' }}
              </h3>
              <button
                @click="closeModal"
                class="w-8 h-8 rounded-lg flex items-center justify-center"
                style="background: var(--glass-bg-2); color: var(--text-2);"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Form -->
            <div class="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
              <!-- Name -->
              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Name *</label>
                <input v-model="form.name" type="text" class="input w-full" placeholder="My Application" required />
              </div>

              <!-- Category + Emoji row -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Category</label>
                  <input v-model="form.category" type="text" class="input w-full" placeholder="Analytics" />
                </div>
                <div>
                  <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Emoji</label>
                  <input v-model="form.emoji" type="text" class="input w-full" placeholder="📊" maxlength="2" />
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Description</label>
                <textarea v-model="form.description" rows="3" class="input w-full resize-none" placeholder="Describe the application…" />
              </div>

              <!-- Price + Discount row -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Base Monthly Price ($)</label>
                  <input v-model.number="form.basePrice" type="number" min="1" class="input w-full" placeholder="49" />
                </div>
                <div>
                  <label class="block text-xs font-medium mb-1.5" style="color: var(--text-2);">Annual Discount (%)</label>
                  <input v-model.number="form.annualDiscount" type="number" min="0" max="50" class="input w-full" placeholder="20" />
                </div>
              </div>

              <!-- Price preview -->
              <div
                class="rounded-xl p-4 space-y-1"
                style="background: var(--glass-bg-2); border: 1px solid var(--glass-border);"
              >
                <p class="text-xs font-semibold mb-2" style="color: var(--text-3);">Price Preview</p>
                <div class="flex justify-between text-sm">
                  <span style="color: var(--text-2);">Monthly</span>
                  <span class="font-semibold" style="color: var(--text-1);">${{ form.basePrice || 0 }}/mo</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span style="color: var(--text-2);">Annual</span>
                  <span class="font-semibold text-cyan-400">
                    ${{ computeAnnual(form) }}/mo
                    <span class="text-xs ml-1" style="color: var(--text-3);">(save {{ form.annualDiscount || 0 }}%)</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-3 p-5" style="border-top: 1px solid var(--glass-border);">
              <button @click="closeModal" class="btn btn-outline">Cancel</button>
              <button @click="saveApp" class="btn btn-primary" :disabled="!form.name.trim()">Save</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAdminStore } from '@/store/modules/admin'
import { Plus, Pencil, Power, X } from 'lucide-vue-next'

const adminStore = useAdminStore()

const showModal  = ref(false)
const editingApp = ref(null)

const defaultForm = () => ({
  name: '',
  category: '',
  emoji: '',
  description: '',
  basePrice: 29,
  annualDiscount: 10,
})

const form = reactive(defaultForm())

function computeAnnualPrice(app) {
  return (app.basePrice * (1 - app.annualDiscount / 100)).toFixed(2)
}

function computeAnnual(f) {
  const p = Number(f.basePrice) || 0
  const d = Number(f.annualDiscount) || 0
  return (p * (1 - d / 100)).toFixed(2)
}

function openAddModal() {
  editingApp.value = null
  Object.assign(form, defaultForm())
  showModal.value = true
}

function openEditModal(app) {
  editingApp.value = app
  Object.assign(form, {
    name: app.name,
    category: app.category,
    emoji: app.emoji,
    description: app.description,
    basePrice: app.basePrice,
    annualDiscount: app.annualDiscount,
  })
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingApp.value = null
}

function saveApp() {
  if (!form.name.trim()) return
  if (editingApp.value) {
    adminStore.updateApplication(editingApp.value.id, { ...form })
  } else {
    adminStore.addApplication({ ...form })
  }
  closeModal()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
