<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <div class="fixed inset-0 bg-black opacity-50" @click="$emit('close')"></div>
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full">
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-medium">{{ title }}</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        <div class="p-4">
          <slot />
        </div>
        <div v-if="$slots.footer" class="flex justify-end space-x-2 p-4 border-t">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: Boolean,
    title: String
  }
}
</script>