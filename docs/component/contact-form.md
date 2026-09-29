# ContactForm 联系表单

完善的企业联系与咨询表单，包含姓名、企业、邮箱、主题下拉与需求描述留言。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>ContactFormBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <ContactFormBlock />
  </div>
</div>

```vue
<ContactFormBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { ContactFormBlock } from 'vue-blocks'

const customData = {
  title: '联系我们',
  description: '有疑问或需求？我们的团队随时准备为您提供帮助',
  nameLabel: '您的姓名',
  companyLabel: '公司名称',
  emailLabel: '企业邮箱',
  subjectLabel: '咨询类型',
  subjectOptions: [
    {
      label: '产品咨询',
      value: 'product'
    },
    {
      label: '价格方案',
      value: 'pricing'
    },
    {
      label: '技术支持',
      value: 'tech'
    },
    {
      label: '商务合作',
      value: 'partnership'
    }
  ],
  messageLabel: '需求描述',
  submitText: '立即提交',
  footerNote: '我们尊重您的隐私，承诺绝不会泄露您的个人信息。'
}
</script>

<template>
  <ContactFormBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { ContactFormBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300',
  container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-14 max-w-2xl mx-auto',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  formCard: 'bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800',
  formGrid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  field: 'space-y-2',
  fieldFull: 'space-y-2 md:col-span-2',
  label: 'block text-sm font-semibold text-gray-700 dark:text-gray-300',
  input: 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition',
  select: 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition',
  textarea: 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition min-h-[120px]',
  submitButton: 'w-full py-4 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition transform hover:-translate-y-0.5',
  footerNote: 'text-center text-xs text-gray-400 mt-4'
}
</script>

<template>
  <ContactFormBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 表单区块主标题 | `联系我们` |
| `description` | `text` | 表单引导或咨询说明副标题 | `有疑问或需求？我们的团队随时准备为您提供帮助` |
| `nameLabel` | `text` | 姓名输入框标签 | `您的姓名` |
| `companyLabel` | `text` | 公司名称输入框标签 | `公司名称` |
| `emailLabel` | `text` | 电子邮箱输入框标签 | `企业邮箱` |
| `subjectLabel` | `text` | 咨询主题下拉框标签 | `咨询类型` |
| `subjectOptions` | `repeater` | 咨询主题下拉选项列表 | `[4 项数据]` |
| `messageLabel` | `text` | 留言/需求描述多行文本框标签 | `需求描述` |
| `submitText` | `text` | 提交按钮文字 | `立即提交` |
| `footerNote` | `text` | 表单底部隐私与数据合规说明提示 | `我们尊重您的隐私，承诺绝不会泄露您的个人信息。` |

### `subjectOptions` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `label` | `text` | 下拉选项显示文本 |
| `value` | `text` | 下拉选项提交值 |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 联系表单区块外层 `<section>` 容器 | `py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 标题与描述区域包裹容器 | `text-center mb-14 max-w-2xl mx-auto` |
| `title` | 区块主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3` |
| `description` | 区块副标题 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-400` |
| `formCard` | 表单卡片外框（背景、大圆角、细腻边框与阴影） | `bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800` |
| `formGrid` | 表单字段响应式双列网格布局容器 | `grid grid-cols-1 md:grid-cols-2 gap-6` |
| `field` | 单列字段包裹容器 | `space-y-2` |
| `fieldFull` | 跨整行全宽字段（如多行留言、提交按钮）包裹容器 | `space-y-2 md:col-span-2` |
| `label` | 表单输入项标签 `<label>` 文本样式 | `block text-sm font-semibold text-gray-700 dark:text-gray-300` |
| `input` | 单行输入框 `<input>` 样式（圆角、边框与 focus 聚焦环） | `w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition` |
| `select` | 下拉选择框 `<select>` 样式 | `w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition` |
| `textarea` | 多行文本框 `<textarea>` 样式 | `w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition min-h-[120px]` |
| `submitButton` | 提交表单大按钮样式（全宽或大圆角、实色背景） | `w-full py-4 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition transform hover:-translate-y-0.5` |
| `footerNote` | 表单底部隐私声明浅色小字样式 | `text-center text-xs text-gray-400 mt-4` |
| `form` | 原生 `<form>` 元素样式 | - |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过 Slot Props 传入）：

| 插槽名 | 作用域参数 (Slot Props) | 说明 |
|---|---|---|
| `title` | `{ title }` | 联系表单区块主标题 |
| `description` | `{ description }` | 联系表单区块副标题说明 |

### 插槽使用示例

```vue
<template>
  <ContactFormBlock @submit="handleFormSubmit">
    <!-- 1. 自定义表单主标题 -->
    <template #title="{ title }">
      <h2 class="text-3xl font-black text-indigo-600 mb-2">{{ title }}</h2>
    </template>

    <!-- 2. 自定义副标题说明 -->
    <template #description="{ description }">
      <p class="text-base text-gray-500 max-w-xl mx-auto">{{ description }}</p>
    </template>
  </ContactFormBlock>
</template>
```

---

## ⚡ 事件规范 (Events)

| 事件名 | 触发时机 | 回调参数 |
|---|---|---|
| `submit` | 用户点击提交表单且必填校验通过时触发 | `(formData: { name, company, email, subject, message })` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
