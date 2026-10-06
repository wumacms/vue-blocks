<script setup>
defineProps({
  data: { type: Object, required: true },
  styles: { type: Object, required: true }
})
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
