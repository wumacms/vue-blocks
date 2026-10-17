<script setup>
import { computed } from 'vue'
import { fieldRegistry } from './fieldRegistry.js'

const props = defineProps({
  field: {
    type: Object,
    required: true
  },
  modelValue: {
    type: null,
    default: undefined
  },
  blockData: {
    type: Object,
    default: () => ({})
  },
  parentPath: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// 条件动态联动 (showWhen 机制)
const isVisible = computed(() => {
  if (!props.field.showWhen) return true
  const { field, equals } = props.field.showWhen
  return props.blockData?.[field] === equals
})

const widgetComponent = computed(() => {
  return fieldRegistry.get(props.field.type)
})

function handleUpdate(val) {
  emit('update:modelValue', val)
}
</script>

<template>
  <div v-if="isVisible" class="space-y-1.5" :data-wuma-field-editor="field.name">
    <!-- 控件头部标签区 -->
    <div class="flex items-center justify-between">
      <label class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        {{ field.label || field.name }}
        <span
          v-if="field.type === 'repeater'"
          class="text-[10px] text-zinc-400 font-mono ml-1"
        >
          ({{ (Array.isArray(modelValue) ? modelValue : []).length }} 项)
        </span>
      </label>
      <span v-if="field.type" class="text-[10px] font-mono text-zinc-400 uppercase">
        {{ field.type }}
      </span>
    </div>

    <!-- 动态表单控件 -->
    <component
      :is="widgetComponent"
      :field="field"
      :model-value="modelValue"
      :block-data="blockData"
      :parent-path="parentPath ? `${parentPath}.${field.name}` : field.name"
      @update:model-value="handleUpdate"
    />

    <!-- 字段帮助提示 -->
    <p v-if="field.help" class="text-[10px] text-zinc-400 leading-normal">
      {{ field.help }}
    </p>
  </div>
</template>
