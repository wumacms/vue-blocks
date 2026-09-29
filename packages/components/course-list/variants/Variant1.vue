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
      <slot name="courses" :courses="data.courses">
        <div :class="styles.grid">
          <div
            v-for="(crs, idx) in data.courses"
            :key="idx"
            :class="styles.card"
          >
            <div :class="styles.imageWrapper">
              <img :src="crs.image" :alt="crs.imageAlt || crs.title" :class="styles.image" />
              <div v-if="crs.tags && crs.tags.length" :class="styles.tagsWrapper">
                <span v-for="(t, tIdx) in crs.tags" :key="tIdx" :class="styles.tag">
                  {{ t.text }}
                </span>
              </div>
            </div>
            <div :class="styles.cardBody">
              <h3 :class="styles.courseTitle">{{ crs.title }}</h3>
              <p :class="styles.courseDescription">{{ crs.description }}</p>
              <div v-if="crs.instructor" :class="styles.instructorWrapper">
                <img v-if="crs.instructorAvatar" :src="crs.instructorAvatar" :alt="crs.instructor" :class="styles.avatar" />
                <span :class="styles.instructorName">{{ crs.instructor }}</span>
              </div>
              <div :class="styles.meta">
                <span v-if="crs.lessons">{{ crs.lessons }}</span>
                <span v-if="crs.duration">{{ crs.duration }}</span>
                <span v-if="crs.level">{{ crs.level }}</span>
              </div>
              <div :class="styles.footer">
                <span v-if="crs.price" :class="styles.price">{{ crs.price }}</span>
                <a
                  v-if="crs.btnText"
                  :href="crs.btnLink || '#'"
                  :target="crs.newWindow ? '_blank' : '_self'"
                  :class="styles.button"
                >
                  {{ crs.btnText }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
