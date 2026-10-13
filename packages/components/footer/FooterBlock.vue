<script setup>
import { computed } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'FooterBlock'
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
  <footer :class="styles.root">
    <div :class="styles.container">
      <slot name="brand" :data="data">
        <div :class="styles.brandWrapper">
          <img
            v-if="data.logo"
            :src="data.logo"
            :alt="data.brandName || 'Footer Logo'"
            :class="styles.logo"
            onerror="this.src='https://placehold.co/32x32/4F46E5/white?text=Logo'"
          />
          <span v-if="data.brandName" :class="styles.brandName">{{ data.brandName }}</span>
        </div>
      </slot>
      <slot name="copyright" :copyright="data.copyright">
        <div :class="styles.copyright">
          {{ data.copyright }}
        </div>
      </slot>
    </div>
  </footer>
</template>
