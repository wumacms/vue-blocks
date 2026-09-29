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
      <slot name="plans" :plans="data.plans">
        <div :class="styles.grid">
          <div
            v-for="(plan, idx) in data.plans"
            :key="idx"
            :class="plan.isPrimary || plan.showBadge ? styles.cardPrimary : styles.card"
          >
            <span v-if="plan.showBadge || plan.isPrimary" :class="styles.badge">
              {{ plan.badgeText || '最受欢迎' }}
            </span>
            <div>
              <h3 :class="styles.planName">{{ plan.name }}</h3>
              <p :class="styles.price">
                {{ plan.price }}
                <span :class="styles.unit">{{ plan.unit }}</span>
              </p>
              <div :class="styles.featuresList">
                {{ plan.features }}
              </div>
            </div>
            <a
              :href="plan.btnLink || '#'"
              :target="plan.newWindow ? '_blank' : '_self'"
              :class="plan.isPrimary ? styles.buttonPrimary : styles.button"
            >
              {{ plan.btnText || '立即开通' }}
            </a>
          </div>
        </div>
      </slot>
    </div>
  </section>
</template>
