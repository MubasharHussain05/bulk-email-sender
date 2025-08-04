<template>
  <div class="mb-4">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="inputClasses"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    label: String,
    placeholder: String,
    required: Boolean,
    disabled: Boolean,
    error: String,
    id: String
  },
  computed: {
    inputClasses() {
      const base = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
      const error = this.error ? 'border-red-300' : 'border-gray-300'
      const disabled = this.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
      
      return `${base} ${error} ${disabled}`
    }
  }
}
</script>