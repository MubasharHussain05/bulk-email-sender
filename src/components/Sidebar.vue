<template>
  <!-- Desktop Sidebar -->
  <div class="hidden lg:flex lg:w-64 bg-gray-900 text-white flex-col">
    <div class="p-4 border-b border-gray-700">
      <h2 class="text-xl font-bold">Bulk Mail</h2>
    </div>
    <nav class="flex-1 p-4">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center px-4 py-2 mb-2 rounded hover:bg-gray-700 transition-colors"
        :class="{ 'bg-gray-700': $route.path === item.path }"
      >
        <span class="mr-3">{{ item.icon }}</span>
        {{ item.name }}
      </router-link>
    </nav>
  </div>

  <!-- Mobile Sidebar -->
  <div v-if="isMobileOpen" class="lg:hidden fixed inset-0 z-50 flex">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
    <!-- Sidebar -->
    <div class="relative w-64 bg-gray-900 text-white flex flex-col">
      <div class="p-4 border-b border-gray-700 flex justify-between items-center">
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
          class="flex items-center px-4 py-2 mb-2 rounded hover:bg-gray-700 transition-colors"
          :class="{ 'bg-gray-700': $route.path === item.path }"
        >
          <span class="mr-3">{{ item.icon }}</span>
          {{ item.name }}
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>