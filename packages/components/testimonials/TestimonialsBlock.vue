<script setup>
import { computed } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'TestimonialsBlock'
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
      <slot name="testimonials" :testimonials="data.testimonials">
        <div :class="styles.grid">
          <div
            v-for="(item, idx) in data.testimonials"
            :key="idx"
            :class="styles.card"
          >
            <div>
              <div :class="styles.stars">★★★★★</div>
              <p :class="styles.quote">“{{ item.quote }}”</p>
            </div>
            <div :class="styles.authorWrapper">
              <img v-if="item.avatar" :src="item.avatar" :alt="item.name" :class="styles.avatar" />
              <div>
                <h4 :class="styles.authorName">{{ item.name }}</h4>
                <p :class="styles.authorRole">
                  {{ item.position }} · {{ item.company }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
