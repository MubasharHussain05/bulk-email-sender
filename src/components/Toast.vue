<template>
  <div
    v-if="show"
    :class="toastClasses"
    class="fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-all duration-300"
  >
    <div class="flex items-center">
      <span class="mr-2">{{ icon }}</span>
      <span>{{ message }}</span>
      <button @click="$emit('close')" class="ml-4 text-white hover:text-gray-200">
        ✕
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    show: Boolean,
    message: String,
    type: {
      type: String,
      default: 'info',
      validator: value => ['success', 'error', 'warning', 'info'].includes(value)
    }
  },
  computed: {
    toastClasses() {
      const types = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
      }
      return types[this.type]
    },
    icon() {
      const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
      }
      return icons[this.type]
    }
  }
}
</script>