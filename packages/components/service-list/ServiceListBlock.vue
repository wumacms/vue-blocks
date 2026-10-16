<script setup>
import { computed } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'ServiceListBlock'
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
      <slot name="services" :services="data.services">
        <div :class="styles.grid">
          <div
            v-for="(svc, idx) in data.services"
            :key="idx"
            :class="styles.card"
          >
            <div :class="styles.iconWrapper">
              <span>{{ svc.icon }}</span>
            </div>
            <h3 :class="styles.serviceTitle">{{ svc.title }}</h3>
            <p :class="styles.serviceDescription">{{ svc.description }}</p>
            <div v-if="svc.points && svc.points.length" :class="styles.pointsList">
              <div v-for="(p, pIdx) in svc.points" :key="pIdx" :class="styles.pointItem">
                <span :class="styles.pointIcon">✓</span>
                <span>{{ p.text }}</span>
              </div>
            </div>
            <a
              v-if="svc.link"
              :href="svc.link || '#'"
              :target="svc.newWindow ? '_blank' : '_self'"
              :class="styles.link"
            >
              了解详情 →
            </a>
          </div>
        </div>
      </slot>
      <div v-if="data.moreText" :class="styles.bottomMore || 'mt-12 text-center'">
        <a
          :href="data.moreLink || '#'"
          :target="data.moreNewWindow ? '_blank' : '_self'"
          :class="styles.moreButton || 'inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-sm'"
        >
          {{ data.moreText }}
        </a>
      </div>
    </div>
  </section>
</template>
