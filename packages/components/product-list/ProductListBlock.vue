<script setup>
import { computed } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'ProductListBlock'
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
      <slot name="products" :products="data.products">
        <div :class="styles.grid">
          <div
            v-for="(prod, idx) in data.products"
            :key="idx"
            :class="styles.card"
          >
            <div :class="styles.imageWrapper">
              <img :src="prod.image" :alt="prod.imageAlt || prod.title" :class="styles.image" />
              <span v-if="prod.badge || prod.tag" :class="[styles.tag, prod.badgeColor]">
                {{ prod.badge || prod.tag }}
              </span>
            </div>
            <div :class="styles.cardBody">
              <h3 :class="styles.productTitle">{{ prod.title }}</h3>
              <p :class="styles.productDescription">{{ prod.description }}</p>
              <div v-if="prod.tags && prod.tags.length" class="flex flex-wrap gap-1.5 mb-4">
                <span
                  v-for="(t, tIdx) in prod.tags"
                  :key="tIdx"
                  class="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium"
                >
                  {{ t.text || t }}
                </span>
              </div>
              <div :class="styles.footer">
                <div v-if="prod.price" :class="styles.priceWrapper">
                  <span :class="styles.price">{{ prod.price }}</span>
                  <span v-if="prod.originalPrice" :class="styles.originalPrice">{{ prod.originalPrice }}</span>
                </div>
                <a
                  v-if="prod.link || prod.btnLink || prod.btnText"
                  :href="prod.link || prod.btnLink || '#'"
                  :target="prod.newWindow ? '_blank' : '_self'"
                  :class="styles.button"
                >
                  {{ prod.btnText || '了解详情 →' }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
