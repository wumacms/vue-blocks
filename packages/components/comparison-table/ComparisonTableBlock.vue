<script setup>
import { computed } from 'vue'
import { mergeData, resolveStyles } from '@vue-blocks/utils'
import { defaultData } from './defaultData'
import { defaultStyles } from './defaultStyles'

defineOptions({
  name: 'ComparisonTableBlock'
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
      <slot name="table" :data="data">
        <div :class="styles.tableWrapper">
          <table :class="styles.table">
            <thead :class="styles.thead">
              <tr>
                <th scope="col" :class="styles.th">{{ data.firstColHeader || '功能' }}</th>
                <th
                  v-for="(header, hIdx) in data.headers"
                  :key="hIdx"
                  scope="col"
                  :class="[styles.th, header.isPrimary ? styles.thPrimary : '']"
                >
                  {{ header.text }}
                </th>
              </tr>
            </thead>
            <tbody :class="styles.tbody">
              <tr v-for="(row, rIdx) in data.rows" :key="rIdx" :class="styles.tr">
                <td :class="styles.tdFeature">{{ row.feature }}</td>
                <td
                  v-for="(col, vIdx) in (row.columns || row.values || [row.val1, row.val2, row.val3])"
                  :key="vIdx"
                  :class="[styles.tdValue, data.headers?.[vIdx]?.isPrimary ? styles.tdPrimary : '']"
                >
                  <template v-if="typeof col === 'object' && col !== null">
                    <span v-if="col.value === true || col.value === '✓'" :class="styles.iconCheck">✓</span>
                    <span v-else-if="col.value === false || col.value === '—' || col.value === '-'" :class="styles.iconDash">—</span>
                    <span v-else-if="col.value === '✗'" :class="styles.iconCross">✗</span>
                    <span v-else :class="styles.badge">{{ col.value }}</span>
                  </template>
                  <template v-else>
                    <span v-if="col === true || col === '✓'" :class="styles.iconCheck">✓</span>
                    <span v-else-if="col === false || col === '—' || col === '-'" :class="styles.iconDash">—</span>
                    <span v-else-if="col === '✗'" :class="styles.iconCross">✗</span>
                    <span v-else :class="styles.badge">{{ col }}</span>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </slot>
    </div>
  </section>
</template>
