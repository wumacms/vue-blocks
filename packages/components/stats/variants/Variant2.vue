<script setup>
defineProps({
  data: { type: Object, required: true },
  styles: { type: Object, required: true }
})
</script>

<template>
  <section :class="styles.root">
    <div :class="styles.container">
      <slot name="stats" :stats="data.stats">
        <div :class="styles.grid">
          <div
            v-for="(item, idx) in data.stats"
            :key="idx"
            :class="styles.item"
          >
            <div :class="styles.value">{{ item.value }}</div>
            <div :class="styles.label">{{ item.label }}</div>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
