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
      <slot name="items" :items="data.items">
        <div :class="styles.grid">
          <div
            v-for="(item, idx) in data.items"
            :key="idx"
            :class="styles.card"
          >
            <div :class="styles.iconWrapper">
              <span>{{ item.icon }}</span>
            </div>
            <div :class="styles.content">
              <h3 :class="styles.itemTitle">{{ item.title }}</h3>
              <p :class="styles.itemDescription">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
