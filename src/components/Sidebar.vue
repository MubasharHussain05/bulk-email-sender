<template>
  <!-- Desktop Sidebar -->
  <div class="flex-col hidden text-white bg-gray-900 lg:flex lg:w-64">
    <div class="p-4 border-b border-gray-700">
      <h2 class="text-xl font-bold">Fame Mail</h2>
    </div>
    <nav class="flex-1 p-4">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center px-4 py-2 mb-2 transition-colors rounded hover:bg-gray-700"
        :class="{ 'bg-gray-700': $route.path === item.path }"
      >
        <span class="mr-3">{{ item.icon }}</span>
        {{ item.name }}
      </router-link>
    </nav>
    <!-- Logout Button -->
    <div class="p-4 border-t border-gray-700">
      <button
        @click="handleLogout"
        class="flex items-center w-full px-4 py-2 text-red-400 transition-colors rounded hover:bg-red-600 hover:text-white"
      >
        <span class="mr-3">🚪</span>
        Logout
      </button>
    </div>
  </div>

  <!-- Mobile Sidebar -->
  <div v-if="isMobileOpen" class="fixed inset-0 z-50 flex lg:hidden">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
    <!-- Sidebar -->
    <div class="relative flex flex-col w-64 text-white bg-gray-900">
      <div class="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 class="text-xl font-bold">Bulk Mail</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <nav class="flex-1 p-4">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          @click="$emit('close')"
          class="flex items-center px-4 py-2 mb-2 transition-colors rounded hover:bg-gray-700"
          :class="{ 'bg-gray-700': $route.path === item.path }"
        >
          <span class="mr-3">{{ item.icon }}</span>
          {{ item.name }}
        </router-link>
      </nav>
      <!-- Mobile Logout Button -->
      <div class="p-4 border-t border-gray-700">
        <button
          @click="handleLogout"
          class="flex items-center w-full px-4 py-2 text-red-400 transition-colors rounded hover:bg-red-600 hover:text-white"
        >
          <span class="mr-3">🚪</span>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService';

export default {
  name: 'Sidebar',
  props: {
    isMobileOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    return {
      menuItems: [
        { name: 'Dashboard', path: '/', icon: '📊' },
        { name: 'Campaigns', path: '/campaigns', icon: '📧' },
        { name: 'Contacts', path: '/contacts', icon: '👥' },
        { name: 'Templates', path: '/templates', icon: '📝' },
        { name: 'Analytics', path: '/analytics', icon: '📈' },
        { name: 'Settings', path: '/settings', icon: '⚙️' }
      ]
    }
  },
  methods: {
    handleLogout() {
      if (confirm('Are you sure you want to logout?')) {
        authService.logout();
        this.$emit('close'); // Close mobile sidebar if open
      }
    }
  }
}
</script>