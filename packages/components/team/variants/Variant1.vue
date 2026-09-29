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
      <slot name="grid" :members="data.members">
        <div :class="styles.grid">
          <div
            v-for="(member, idx) in data.members"
            :key="idx"
            :class="styles.card"
          >
            <img :src="member.avatar" :alt="member.name" :class="styles.avatar" />
            <h3 :class="styles.name">{{ member.name }}</h3>
            <p :class="styles.role">{{ member.role }}</p>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
