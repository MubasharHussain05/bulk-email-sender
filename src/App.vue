<template>
  <div v-if="authStore.isAuthenticated" class="flex h-screen bg-gray-50">
    <Sidebar :is-mobile-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Mobile menu button -->
      <div class="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
        <button @click="isMobileMenuOpen = true" class="text-gray-600 hover:text-gray-900">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <!-- Main content -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
  <!-- Auth pages (login/register) -->
  <div v-else>
    <router-view />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import { useAuthStore } from './stores/auth'

export default {
  name: 'App',
  components: {
    Sidebar
  },
  setup() {
    const authStore = useAuthStore()
    return {
      authStore
    }
  },
  data() {
    return {
      isMobileMenuOpen: false
    }
  }
}
</script>