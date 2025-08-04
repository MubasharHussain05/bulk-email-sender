<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      :class="selectClasses"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    options: {
      type: Array,
      default: () => []
    },
    required: Boolean,
    disabled: Boolean,
    error: String,
    id: String
  },
  computed: {
    selectClasses() {
      const base = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
      const error = this.error ? 'border-red-300' : 'border-gray-300'
      const disabled = this.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
      
      return `${base} ${error} ${disabled}`
    }
  }
}
</script>