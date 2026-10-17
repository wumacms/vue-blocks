<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  field: {
    type: Object,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div
    class="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60"
  >
    <span class="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
      {{ field.label || '开启状态' }}
    </span>
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        :checked="Boolean(modelValue)"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="sr-only peer"
      />
      <div
        class="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-indigo-600"
      ></div>
    </label>
  </div>
</template>
