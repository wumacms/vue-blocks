<script setup>
defineProps({
  data: { type: Object, required: true },
  styles: { type: Object, required: true }
})
</script>

<template>
  <section :class="styles.root">
    <div :class="styles.container">
      <div :class="styles.grid">
        <div :class="styles.contentWrapper">
          <slot name="title" :title="data.title">
            <h2 :class="styles.title" v-html="data.title" />
          </slot>
          <slot name="description" :description="data.description">
            <p :class="styles.description">{{ data.description }}</p>
          </slot>
          <slot name="tags" :tags="data.tags">
            <div v-if="data.tags && data.tags.length" :class="styles.tagList">
              <div v-for="(tag, idx) in data.tags" :key="idx" :class="styles.tagItem">
                <span :class="styles.tagIcon">✓</span>
                <span>{{ tag.text }}</span>
              </div>
            </div>
          </slot>
        </div>
        <slot name="media" :image="data.image" :image-alt="data.imageAlt">
          <div :class="styles.mediaWrapper">
            <div :class="styles.imageBox">
              <img :src="data.image" :alt="data.imageAlt || 'Right Image'" :class="styles.image" />
            </div>
          </div>
        </slot>
      </div>
    </div>
  </section>
</template>
