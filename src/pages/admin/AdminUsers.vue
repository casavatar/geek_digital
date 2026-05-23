<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold" style="color: var(--text-1);">User Management</h2>
      <span class="text-sm" style="color: var(--text-3);">{{ adminStore.users.length }} users</span>
    </div>

    <!-- Search -->
    <div class="mb-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or email…"
        class="input w-full max-w-sm"
      />
    </div>

    <!-- Table -->
    <div class="glass-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr style="border-bottom: 1px solid var(--glass-border);">
              <th class="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide" style="color: var(--text-3);">User</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide" style="color: var(--text-3);">Email</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide" style="color: var(--text-3);">Role</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide" style="color: var(--text-3);">Status</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide" style="color: var(--text-3);">Apps</th>
              <th class="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wide" style="color: var(--text-3);">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="transition-colors duration-150"
              style="border-bottom: 1px solid var(--glass-border);"
              @mouseenter="e => e.currentTarget.style.background = 'var(--glass-bg-2)'"
              @mouseleave="e => e.currentTarget.style.background = 'transparent'"
            >
              <!-- User -->
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div
                    class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    :style="user.role === 'admin'
                      ? 'background: linear-gradient(135deg, #26cfff, #9b5aff);'
                      : 'background: linear-gradient(135deg, #9b5aff, #ec4899);'"
                  >{{ user.initials }}</div>
                  <span class="font-medium" style="color: var(--text-1);">{{ user.name }}</span>
                </div>
              </td>

              <!-- Email -->
              <td class="px-5 py-3.5" style="color: var(--text-2);">{{ user.email }}</td>

              <!-- Role -->
              <td class="px-5 py-3.5">
                <span
                  class="text-xs font-semibold px-2.5 py-1 rounded-full"
                  :style="user.role === 'admin'
                    ? 'background: rgba(38,207,255,0.12); color: #26cfff;'
                    : 'background: var(--glass-bg-2); color: var(--text-2);'"
                >{{ user.role }}</span>
              </td>

              <!-- Status toggle -->
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-2">
                  <!-- iOS-style toggle -->
                  <button
                    @click="adminStore.toggleUserStatus(user.id)"
                    :disabled="user.role === 'admin'"
                    :class="[
                      'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200',
                      user.status === 'active' ? 'bg-cyan-500' : 'bg-gray-600',
                      user.role === 'admin' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                    ]"
                    :title="user.role === 'admin' ? 'Cannot suspend admin' : 'Toggle status'"
                  >
                    <span
                      :class="[
                        'inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200',
                        user.status === 'active' ? 'translate-x-4' : 'translate-x-0.5'
                      ]"
                    />
                  </button>
                  <span
                    class="text-xs font-medium"
                    :style="user.status === 'active' ? 'color: #4ade80;' : 'color: var(--text-3);'"
                  >{{ user.status }}</span>
                </div>
              </td>

              <!-- Apps granted -->
              <td class="px-5 py-3.5">
                <span
                  class="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style="background: rgba(155,90,255,0.12); color: #a78bfa;"
                >{{ user.grantedApps.length }} / {{ adminStore.applications.length }}</span>
              </td>

              <!-- Actions -->
              <td class="px-5 py-3.5">
                <button
                  @click="openModal(user)"
                  class="btn btn-outline text-xs py-1.5 px-3"
                >
                  Manage Access
                </button>
              </td>
            </tr>

            <tr v-if="filteredUsers.length === 0">
              <td colspan="6" class="px-5 py-10 text-center text-sm" style="color: var(--text-3);">
                No users match your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ── Access Modal ── -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showModal && selectedUser"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          style="background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);"
          @click.self="closeModal"
        >
          <div
            class="glass-card w-full max-w-md"
            style="overflow: visible;"
          >
            <!-- Modal header -->
            <div class="flex items-center justify-between p-5" style="border-bottom: 1px solid var(--glass-border);">
              <div>
                <h3 class="text-base font-semibold" style="color: var(--text-1);">App Access</h3>
                <p class="text-xs mt-0.5" style="color: var(--text-3);">{{ selectedUser.name }}</p>
              </div>
              <button
                @click="closeModal"
                class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                style="background: var(--glass-bg-2); color: var(--text-2);"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Modal body -->
            <div class="p-5 space-y-3">
              <div
                v-for="app in adminStore.applications"
                :key="app.id"
                class="flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors duration-150"
                style="background: var(--glass-bg-2);"
              >
                <div class="flex items-center gap-3">
                  <span class="text-xl">{{ app.emoji }}</span>
                  <div>
                    <p class="text-sm font-medium" style="color: var(--text-1);">{{ app.name }}</p>
                    <span
                      class="text-[10px] font-medium"
                      :style="app.status === 'active' ? 'color: #4ade80;' : 'color: #fbbf24;'"
                    >{{ app.status }}</span>
                  </div>
                </div>

                <!-- App access toggle -->
                <button
                  @click="adminStore.toggleAppAccess(selectedUser.id, app.id)"
                  :class="[
                    'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 cursor-pointer',
                    selectedUser.grantedApps.includes(app.id) ? 'bg-cyan-500' : 'bg-gray-600'
                  ]"
                >
                  <span
                    :class="[
                      'inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200',
                      selectedUser.grantedApps.includes(app.id) ? 'translate-x-4' : 'translate-x-0.5'
                    ]"
                  />
                </button>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="flex justify-end p-5" style="border-top: 1px solid var(--glass-border);">
              <button @click="closeModal" class="btn btn-primary">Done</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAdminStore } from '@/store/modules/admin'
import { X } from 'lucide-vue-next'

const adminStore = useAdminStore()

const searchQuery = ref('')
const showModal   = ref(false)
const selectedUser = ref(null)

const filteredUsers = computed(() =>
  adminStore.users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

function openModal(user) {
  selectedUser.value = user
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedUser.value = null
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
</style>
