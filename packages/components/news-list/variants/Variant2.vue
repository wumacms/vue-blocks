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
      <slot name="news" :news="data.news">
        <div :class="styles.grid">
          <article
            v-for="(item, idx) in data.news"
            :key="idx"
            :class="styles.card"
          >
            <div v-if="item.image" :class="styles.imageWrapper">
              <img :src="item.image" :alt="item.imageAlt || item.title" :class="styles.image" />
            </div>
            <div :class="styles.cardBody">
              <div :class="styles.meta">
                <span v-if="item.category" :class="styles.category">{{ item.category }}</span>
                <span v-if="item.date" :class="styles.date">{{ item.date }}</span>
              </div>
              <h3 :class="styles.newsTitle">
                <a :href="item.link || '#'">{{ item.title }}</a>
              </h3>
              <p :class="styles.summary">{{ item.summary }}</p>
              <div>
                <a :href="item.link || '#'" :class="styles.moreLink">
                  阅读全文 →
                </a>
              </div>
            </div>
          </article>
        </div>
      </slot>
      <div v-if="data.moreText" :class="styles.bottomMore">
        <a
          :href="data.moreLink || '#'"
          :target="data.moreNewWindow ? '_blank' : '_self'"
          class="inline-block bg-[#120b48] dark:bg-[#ffb347] text-white dark:text-[#120b48] border-3 border-[#ffb347] dark:border-[#ff5c8a] px-8 py-3.5 rounded-full text-base font-black shadow-[4px_4px_0_#ff5c8a] dark:shadow-[4px_4px_0_#b47aff] hover:shadow-[1px_1px_0_#ff5c8a] transition-all"
        >
          {{ data.moreText }}
        </a>
      </div>
    </div>
  </section>
</template>
