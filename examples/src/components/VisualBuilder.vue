<script setup>
/**
 * VisualBuilder 兼容性导出包装层
 * 核心实现已重构并移至 packages/components/visual-builder 独立模块
 */
import { VisualBuilder } from 'vue-blocks'

defineOptions({
  name: 'VisualBuilderWrapper',
  inheritAttrs: false
})
</script>

<template>
  <VisualBuilder v-bind="$attrs" />
</template>
