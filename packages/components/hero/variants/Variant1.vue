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
          <h1 :class="styles.title" v-html="data.title" />
        </slot>
        <slot name="description" :description="data.description">
          <p :class="styles.description">{{ data.description }}</p>
        </slot>
        <slot name="actions" :buttons="data.buttons">
          <div v-if="data.buttons && data.buttons.length" :class="styles.buttonGroup">
            <a
              v-for="(btn, idx) in data.buttons"
              :key="idx"
              :href="btn.btnLink || '#'"
              :target="btn.newWindow ? '_blank' : '_self'"
              :class="btn.isPrimary ? styles.buttonPrimary : styles.buttonSecondary"
            >
              {{ btn.btnText }}
            </a>
          </div>
        </slot>
      </div>
      <slot name="media" :image="data.image" :image-alt="data.imageAlt">
        <div v-if="data.image" :class="styles.mediaWrapper">
          <img :src="data.image" :alt="data.imageAlt || 'Hero Media'" :class="styles.image" />
        </div>
      </slot>
    </div>
  </section>
</template>
