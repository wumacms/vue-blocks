<script setup>
defineProps({
  modelValue: {
    type: String,
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
  <div class="space-y-2">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="图片 URL 地址"
      class="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 text-zinc-800 dark:text-zinc-200 transition-colors"
    />
    <div
      v-if="modelValue"
      class="h-20 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative group"
    >
      <img
        :src="modelValue"
        class="w-full h-full object-cover transition-transform group-hover:scale-105"
        alt="Preview"
        @error="$event.target.style.display = 'none'"
      />
    </div>
  </div>
</template>
