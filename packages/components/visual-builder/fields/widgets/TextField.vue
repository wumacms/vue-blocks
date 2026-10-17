<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  field: {
    type: Object,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    type="text"
    :placeholder="field.placeholder || ''"
    class="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 text-zinc-800 dark:text-zinc-200 transition-colors"
  />
</template>
