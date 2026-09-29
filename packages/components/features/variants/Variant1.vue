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
      <slot name="grid" :features="data.features">
        <div :class="styles.grid">
          <div
            v-for="(item, idx) in data.features"
            :key="idx"
            :class="styles.card"
          >
            <div :class="styles.iconWrapper">
              <slot name="icon" :icon="item.icon" :index="idx">
                <span>{{ item.icon }}</span>
              </slot>
            </div>
            <h3 :class="styles.cardTitle">{{ item.title }}</h3>
            <p :class="styles.cardDescription">{{ item.description }}</p>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
