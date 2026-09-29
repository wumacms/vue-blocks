<script setup>
defineProps({
  data: { type: Object, required: true },
  styles: { type: Object, required: true }
})
</script>

<template>
  <section :class="styles.root">
    <div :class="styles.container">
      <div :class="styles.contentWrapper">
        <slot name="title" :title="data.title">
          <h2 :class="styles.title" v-html="data.title" />
        </slot>
        <slot name="description" :description="data.description">
          <p :class="styles.description">{{ data.description }}</p>
        </slot>
      </div>
      <slot name="media" :image="data.image" :image-alt="data.imageAlt">
        <div v-if="data.image" :class="styles.mediaWrapper">
          <img :src="data.image" :alt="data.imageAlt || 'Dashboard Preview'" :class="styles.image" />
        </div>
      </slot>
    </div>
  </section>
</template>
