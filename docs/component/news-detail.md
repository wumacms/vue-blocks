# NewsDetail 资讯详情

沉浸式文章详情阅读页区块，包含分类、发布时间、大标题、封面大图、富文本正文与标签。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>NewsDetailBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <NewsDetailBlock />
  </div>
</div>

```vue
<NewsDetailBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { NewsDetailBlock } from 'vue-blocks'

const customData = {
  category: '产品更新',
  date: '2026-08-20',
  title: '全新AI助手正式上线，支持智能摘要',
  image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
  imageAlt: 'AI助手界面示意图',
  body: '<p>我们很高兴地宣布，ChatFlow 全新 AI 助手功能已正式上线。该功能基于最新的大语言模型技术，能够自动为团队生成会议纪要、消息摘要和待办事项列表，帮助您和团队节省大量重复性工作时间。</p><p><strong>核心能力：</strong>智能摘要、会议纪要、待办提取、多语言支持。</p><p>所有 ChatFlow 商业版和企业版用户现已可以在桌面端和移动端体验 AI 助手功能。</p>',
  tags: [
    {
      text: 'AI'
    },
    {
      text: '产品更新'
    },
    {
      text: '效率工具'
    }
  ]
}
</script>

<template>
  <NewsDetailBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { NewsDetailBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
  container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  meta: 'flex items-center gap-3 mb-6',
  category: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full',
  date: 'text-gray-400 text-sm',
  title: 'text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-8',
  mediaWrapper: 'mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800',
  image: 'w-full h-auto object-cover max-h-[500px]',
  body: 'prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6',
  tagsWrapper: 'mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 flex-wrap',
  tag: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium'
}
</script>

<template>
  <NewsDetailBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 新闻文章完整大标题 | `全新AI助手正式上线，支持智能摘要` |
| `category` | `text` | 文章所属分类名称 | `产品更新` |
| `date` | `text` | 文章发布日期 | `2026-08-20` |
| `image` | `image` | 文章正文顶部大图 URL | `https://images.unsplash.com/photo-1557804506-66...` |
| `imageAlt` | `text` | 大图替代说明文本 | `AI助手界面示意图` |
| `body` | `textarea` | 文章正文富文本 HTML 内容 | `<p>我们很高兴地宣布，ChatFlow 全新 AI 助手功能已正式上线。该功能基于最新的大语...` |
| `tags` | `repeater` | 文章关联的话题标签列表 | `[3 项数据]` |

### `tags` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `text` | `text` | 话题标签名称文本（如“AI”、“效率工具”） |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 文章详情外层 `<article>` 容器 | `py-20 bg-white dark:bg-gray-900 transition-colors duration-300` |
| `container` | 适合长文阅读的最大宽度居中容器（通常为 `max-w-4xl`） | `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8` |
| `meta` | 顶部元数据信息容器 | `flex items-center gap-3 mb-6` |
| `category` | 分类标签徽章样式 | `bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full` |
| `date` | 发布日期浅色小字样式 | `text-gray-400 text-sm` |
| `title` | 文章主标题 `<h1>` 样式 | `text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-8` |
| `mediaWrapper` | 正文顶部头图展示容器 | `mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800` |
| `image` | 头图图片元素样式（大圆角、阴影） | `w-full h-auto object-cover max-h-[500px]` |
| `body` | 正文富文本排版样式（段落行高、标题字阶及阅读体验） | `prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-6` |
| `tagsWrapper` | 文章底部标签列表外层容器 | `mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 flex-wrap` |
| `tag` | 单个话题标签药丸样式 | `bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
