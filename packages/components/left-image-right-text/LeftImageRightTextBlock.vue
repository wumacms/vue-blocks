<script setup>
import { computed } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'LeftImageRightTextBlock'
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
      <div :class="styles.grid">
        <slot name="media" :image="data.image" :image-alt="data.imageAlt">
          <div :class="styles.mediaWrapper">
            <div :class="styles.imageBox">
              <img :src="data.image" :alt="data.imageAlt || 'Left Image'" :class="styles.image" />
            </div>
          </div>
        </slot>
        <div :class="styles.contentWrapper">
          <slot name="title" :title="data.title">
            <h2 :class="styles.title" v-html="data.title" />
          </slot>
          <slot name="description" :description="data.description">
            <p :class="styles.description">{{ data.description }}</p>
          </slot>
          <slot name="tags" :tags="data.tags">
            <div v-if="data.tags && data.tags.length" :class="styles.tagList">
              <div v-for="(tag, idx) in data.tags" :key="idx" :class="styles.tagItem">
                <span :class="styles.tagIcon">✓</span>
                <span>{{ tag.text }}</span>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>
