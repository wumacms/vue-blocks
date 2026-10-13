<script setup>
import { computed } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'IconWallBlock'
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
      <div :class="styles.header">
        <slot name="title" :title="data.title">
          <h2 :class="styles.title" v-html="data.title" />
        </slot>
        <slot name="description" :description="data.description">
          <p :class="styles.description">{{ data.description }}</p>
        </slot>
      </div>
      <slot name="items" :items="data.items">
        <div :class="styles.grid">
          <div
            v-for="(item, idx) in data.items"
            :key="idx"
            :class="styles.card"
          >
            <div :class="styles.iconWrapper">
              <span>{{ item.icon }}</span>
            </div>
            <div :class="styles.content">
              <h3 :class="styles.itemTitle">{{ item.title }}</h3>
              <p :class="styles.itemDescription">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
