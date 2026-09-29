# Testimonials 客户评价

真实用户反馈与评价卡片，包含五星评分、真实引言、客户头像与职级认证。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>TestimonialsBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <TestimonialsBlock />
  </div>
</div>

```vue
<TestimonialsBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { TestimonialsBlock } from 'vue-blocks'

const customData = {
  title: '客户心声',
  description: '来自全球团队的信任与反馈',
  testimonials: [
    {
      quote: 'ChatFlow 彻底改变了我们团队的沟通方式。从混乱的邮件到实时协作，效率至少提升了40%。',
      name: '赵明远',
      position: '技术总监',
      company: '云创科技',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=30'
    },
    {
      quote: '安全性和集成能力是我们选择 ChatFlow 的关键。现在我们的销售、产品、支持团队都在同一个平台上协同。',
      name: '陈雅文',
      position: '运营副总裁',
      company: '海纳集团',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=30'
    },
    {
      quote: '非常直观的界面，员工上手几乎没有学习成本。而且移动端体验非常流畅，出差也能随时处理工作。',
      name: '王景行',
      position: '产品负责人',
      company: '极客工坊',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=30'
    }
  ]
}
</script>

<template>
  <TestimonialsBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { TestimonialsBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-16 max-w-3xl mx-auto',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  card: 'bg-gray-50 dark:bg-gray-800/60 p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm flex flex-col justify-between hover:shadow-md transition',
  stars: 'text-amber-400 text-lg mb-4 tracking-wider',
  quote: 'text-gray-700 dark:text-gray-300 text-base leading-relaxed italic mb-6 flex-1',
  authorWrapper: 'flex items-center gap-4 pt-4 border-t border-gray-200/60 dark:border-gray-700',
  avatar: 'w-12 h-12 rounded-full object-cover shadow-sm',
  authorName: 'font-bold text-gray-900 dark:text-white text-sm',
  authorRole: 'text-xs text-gray-500 dark:text-gray-400'
}
</script>

<template>
  <TestimonialsBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 评价区块主标题 | `客户心声` |
| `description` | `text` | 区块副标题 | `来自全球团队的信任与反馈` |
| `testimonials` | `repeater` | 客户真实评价卡片列表 | `[3 项数据]` |

### `testimonials` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `quote` | `textarea` | 客户评价原文正文 |
| `name` | `text` | 客户姓名 |
| `position` | `text` | 客户职务头衔 |
| `company` | `text` | 客户所在企业/机构名称 |
| `avatar` | `image` | 客户头像图片 URL |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 评价区块外层 `<section>` 容器 | `py-20 bg-white dark:bg-gray-900 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 标题区包裹容器 | `text-center mb-16 max-w-3xl mx-auto` |
| `title` | 区块主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4` |
| `description` | 区块副标题 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-400` |
| `grid` | 评价卡片响应式网格容器 | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` |
| `card` | 评价卡片外框（背景、大圆角、细边框与悬停阴影） | `bg-gray-50 dark:bg-gray-800/60 p-8 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm flex flex-col justify-between hover:shadow-md transition` |
| `stars` | 星级评分显示区域样式 | `text-amber-400 text-lg mb-4 tracking-wider` |
| `quote` | 评价正文引用文本样式（行高、斜体与文字颜色） | `text-gray-700 dark:text-gray-300 text-base leading-relaxed italic mb-6 flex-1` |
| `authorWrapper` | 评价人信息底部区域容器（顶部分割线与对齐） | `flex items-center gap-4 pt-4 border-t border-gray-200/60 dark:border-gray-700` |
| `avatar` | 评价人圆形头像图片样式 | `w-12 h-12 rounded-full object-cover shadow-sm` |
| `authorName` | 评价人姓名文本样式 | `font-bold text-gray-900 dark:text-white text-sm` |
| `authorRole` | 评价人职位与公司名浅色小字样式 | `text-xs text-gray-500 dark:text-gray-400` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
