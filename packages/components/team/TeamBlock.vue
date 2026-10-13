<script setup>
import { computed } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'TeamBlock'
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
      <slot name="grid" :members="data.members">
        <div :class="styles.grid">
          <div
            v-for="(member, idx) in data.members"
            :key="idx"
            :class="styles.card"
          >
            <img :src="member.avatar" :alt="member.name" :class="styles.avatar" />
            <h3 :class="styles.name">{{ member.name }}</h3>
            <p :class="styles.role">{{ member.role }}</p>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
