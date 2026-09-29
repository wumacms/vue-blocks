<script setup>
defineProps({
  data: { type: Object, required: true },
  styles: { type: Object, required: true }
})
</script>

<template>
  <article :class="styles.root">
    <div :class="styles.container">
      <div :class="styles.meta">
        <span v-if="data.category" :class="styles.category">{{ data.category }}</span>
        <span v-if="data.date" :class="styles.date">{{ data.date }}</span>
      </div>
      <slot name="title" :title="data.title">
        <h1 :class="styles.title" v-html="data.title" />
      </slot>
      <slot name="media" :image="data.image" :image-alt="data.imageAlt">
        <div v-if="data.image" :class="styles.mediaWrapper">
          <img :src="data.image" :alt="data.imageAlt || data.title" :class="styles.image" />
        </div>
      </slot>
      <slot name="body" :body="data.body">
        <div :class="styles.body" v-html="data.body" />
      </slot>
      <slot name="tags" :tags="data.tags">
        <div v-if="data.tags && data.tags.length" :class="styles.tagsWrapper">
          <span class="text-xs text-gray-400 mr-2">标签:</span>
          <span v-for="(t, idx) in data.tags" :key="idx" :class="styles.tag">
            #{{ t.text }}
          </span>
        </div>
      </slot>
    </div>
  </article>
</template>
