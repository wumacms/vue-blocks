<script setup>
import { computed } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'StatsBlock'
})

const props = defineProps({
  variant: {
    type: [String, Number],
    default: '1'
  },
  data: {
    type: Object,
    default: () => ({})
  },
  styles: {
    type: Object,
    default: () => ({})
  }
})

const data = computed(() => mergeData(defaultData, props.data))
const styles = computed(() => resolveStyles(defaultStyles, props.variant, props.styles))
</script>

<template>
  <section :class="styles.root">
    <div :class="styles.container">
      <slot name="stats" :stats="data.stats">
        <div :class="styles.grid">
          <div
            v-for="(item, idx) in data.stats"
            :key="idx"
            :class="styles.item"
          >
            <div :class="styles.value">{{ item.value }}</div>
            <div :class="styles.label">{{ item.label }}</div>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
