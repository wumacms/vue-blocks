<script setup>
import { reactive, ref, useId } from 'vue'

const props = defineProps({
  data: { type: Object, required: true },
  styles: { type: Object, required: true }
})

const emit = defineEmits(['submit'])

const uid = useId()

const form = reactive({
  name: '',
  company: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitted = ref(false)

function handleSubmit() {
  isSubmitted.value = true
  emit('submit', { ...form })
}
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

      <div :class="styles.formCard">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div :class="styles.formGrid">
            <div :class="styles.field">
              <label :class="styles.label" :for="`${uid}-name`">{{ data.nameLabel || '姓名' }}</label>
              <input
                :id="`${uid}-name`"
                name="name"
                autocomplete="name"
                v-model="form.name"
                type="text"
                required
                placeholder="请输入您的姓名"
                :class="styles.input"
              />
            </div>
            <div :class="styles.field">
              <label :class="styles.label" :for="`${uid}-company`">{{ data.companyLabel || '公司名称' }}</label>
              <input
                :id="`${uid}-company`"
                name="company"
                autocomplete="organization"
                v-model="form.company"
                type="text"
                placeholder="请输入公司名称"
                :class="styles.input"
              />
            </div>
            <div :class="styles.field">
              <label :class="styles.label" :for="`${uid}-email`">{{ data.emailLabel || '电子邮箱' }}</label>
              <input
                :id="`${uid}-email`"
                name="email"
                autocomplete="email"
                v-model="form.email"
                type="email"
                required
                placeholder="name@company.com"
                :class="styles.input"
              />
            </div>
            <div :class="styles.field">
              <label :class="styles.label" :for="`${uid}-subject`">{{ data.subjectLabel || '咨询主题' }}</label>
              <select
                :id="`${uid}-subject`"
                name="subject"
                v-model="form.subject"
                :class="styles.select"
              >
                <option value="" disabled>请选择主题</option>
                <option v-for="(opt, idx) in data.subjectOptions" :key="idx" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>
            <div :class="styles.fieldFull">
              <label :class="styles.label" :for="`${uid}-message`">
                {{ data.messageLabel || '留言信息' }}
              </label>
              <textarea
                :id="`${uid}-message`"
                name="message"
                v-model="form.message"
                rows="4"
                required
                placeholder="请详细描述您的需求..."
                :class="styles.textarea"
              />
            </div>
          </div>

          <div>
            <button type="submit" :class="styles.submitButton">
              {{ data.submitText || '立即提交' }}
            </button>
            <p v-if="data.footerNote" :class="styles.footerNote">
              {{ data.footerNote }}
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
