<script setup>
defineProps({
  data: { type: Object, required: true },
  styles: { type: Object, required: true }
})
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
                <th v-for="(header, hIdx) in data.headers" :key="hIdx" scope="col"
                  :class="[styles.th, header.textColor || '']">
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
                  :class="[styles.tdValue, typeof col === 'object' && col ? (col.textColor || '') : '']"
                >
                  <template v-if="typeof col === 'object' && col !== null">
                    <span v-if="col.value === true || col.value === '✓'" class="font-bold text-base">✓</span>
                    <span v-else-if="col.value === false || col.value === '—' || col.value === '-'">—</span>
                    <span v-else-if="col.value === '✗'" class="font-bold text-base">✗</span>
                    <span v-else>{{ col.value }}</span>
                  </template>
                  <template v-else>
                    <span v-if="col === true || col === '✓'" class="text-green-500 font-bold text-base">✓</span>
                    <span v-else-if="col === false || col === '—' || col === '-'" class="text-gray-400">—</span>
                    <span v-else-if="col === '✗'" class="text-red-400 font-bold text-base">✗</span>
                    <span v-else>{{ col }}</span>
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
