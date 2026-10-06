<script setup>
import { computed } from 'vue'
import { mergeData, mergeStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'
import Variant1 from './variants/Variant1.vue'
import Variant2 from './variants/Variant2.vue'

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

const resolvedData = computed(() => mergeData(defaultData, props.data))
const resolvedStyles = computed(() => {
  const base = defaultStyles[String(props.variant)] || defaultStyles['1'] || {}
  return mergeStyles(base, props.styles)
})

const variantMap = {
  '1': Variant1,
  '2': Variant2,
  default: Variant1
}

const currentVariant = computed(() => variantMap[String(props.variant)] || Variant1)
</script>

<template>
  <component
    :is="currentVariant"
    :data="resolvedData"
    :styles="resolvedStyles"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </component>
</template>
