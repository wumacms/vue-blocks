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
      <slot name="partners" :partners="data.partners">
        <div :class="styles.logoGrid">
          <a
            v-for="(p, idx) in data.partners"
            :key="idx"
            :href="p.link || '#'"
            :target="p.newWindow ? '_blank' : '_self'"
            :class="styles.logoItem"
          >
            <img v-if="p.logo" :src="p.logo" :alt="p.name || 'Partner Logo'" :class="styles.logoImg" />
            <span v-else :class="styles.logoName">{{ p.name }}</span>
          </a>
        </div>
      </slot>
    </div>
  </section>
</template>
