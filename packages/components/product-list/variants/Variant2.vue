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
      <slot name="products" :products="data.products">
        <div :class="styles.grid">
          <div
            v-for="(prod, idx) in data.products"
            :key="idx"
            :class="styles.card"
          >
            <div :class="styles.imageWrapper">
              <img :src="prod.image" :alt="prod.imageAlt || prod.title" :class="styles.image" />
              <span v-if="prod.tag" :class="styles.tag">{{ prod.tag }}</span>
            </div>
            <div :class="styles.cardBody">
              <h3 :class="styles.productTitle">{{ prod.title }}</h3>
              <p :class="styles.productDescription">{{ prod.description }}</p>
              <div :class="styles.footer">
                <div :class="styles.priceWrapper">
                  <span v-if="prod.price" :class="styles.price">{{ prod.price }}</span>
                  <span v-if="prod.originalPrice" :class="styles.originalPrice">{{ prod.originalPrice }}</span>
                </div>
                <a
                  v-if="prod.btnText"
                  :href="prod.btnLink || '#'"
                  :target="prod.newWindow ? '_blank' : '_self'"
                  :class="styles.button"
                >
                  {{ prod.btnText }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
