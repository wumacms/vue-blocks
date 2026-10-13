<script setup>
import { computed, ref } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'FaqBlock'
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

const openIndices = ref([0])

function toggle(idx) {
  const pos = openIndices.value.indexOf(idx)
  if (pos > -1) {
    openIndices.value.splice(pos, 1)
  } else {
    openIndices.value.push(idx)
  }
}
</script>

<template>
  <section :class="styles.root">
    <div :class="styles.container">
      <div :class="styles.header">
        <slot name="title" :title="data.title">
          <h2 :class="styles.title" v-html="data.title" />
        </slot>
        <slot v-if="data.description" name="description" :description="data.description">
          <p :class="styles.description">{{ data.description }}</p>
        </slot>
      </div>
      <slot name="faqs" :faqs="data.faqs">
        <div :class="styles.accordionList">
          <div
            v-for="(faq, idx) in data.faqs"
            :key="idx"
            :class="[styles.item, openIndices.includes(idx) ? styles.itemActive : '']"
            @click="toggle(idx)"
          >
            <div :class="styles.trigger">
              <span>{{ faq.question }}</span>
              <svg
                :class="[styles.icon, openIndices.includes(idx) ? styles.iconOpen : '']"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" :stroke-width="styles.strokeWidth || 2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div v-show="openIndices.includes(idx)" :class="styles.content">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
