# LeftImageRightText 左图右文

左侧大图，右侧标题、深度描述与带对勾图标的核心要点列表。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>LeftImageRightTextBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <LeftImageRightTextBlock />
  </div>
</div>

```vue
<LeftImageRightTextBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { LeftImageRightTextBlock } from 'vue-blocks'

const customData = {
  title: '无缝沟通，跨越部门',
  description: '打破信息孤岛，通过话题群组、私聊和富媒体分享，让每个人都能快速找到所需信息。集成企业目录，一键联系同事。',
  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=30',
  imageAlt: '三位年轻职场人士在开放式办公室使用笔记本电脑进行团队讨论',
  tags: [
    {
      text: '✓ 端到端加密'
    },
    {
      text: '✓ 无限历史记录'
    }
  ]
}
</script>

<template>
  <LeftImageRightTextBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { LeftImageRightTextBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  grid: 'grid md:grid-cols-2 gap-12 items-center',
  mediaWrapper: 'relative',
  image: 'rounded-2xl shadow-xl w-full h-auto object-cover border border-gray-100 dark:border-gray-800',
  contentWrapper: 'space-y-6',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight',
  description: 'text-lg text-gray-600 dark:text-gray-300 leading-relaxed',
  tagList: 'space-y-3 pt-2',
  tagItem: 'flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium',
  tagIcon: 'flex-shrink-0 w-5 h-5 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 rounded-full flex items-center justify-center text-xs font-bold'
}
</script>

<template>
  <LeftImageRightTextBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 模块主标题 | `无缝沟通，跨越部门` |
| `description` | `textarea` | 详细深度业务介绍正文 | `打破信息孤岛，通过话题群组、私聊和富媒体分享，让每个人都能快速找到所需信息。集成企业目录，一键...` |
| `image` | `image` | 左侧业务示意或界面大图 URL | `https://images.unsplash.com/photo-1522071820081...` |
| `imageAlt` | `text` | 图片替代说明文本 | `三位年轻职场人士在开放式办公室使用笔记本电脑进行团队讨论` |
| `tags` | `repeater` | 功能优势或支持特性要点标签列表 | `[2 项数据]` |

### `tags` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `text` | `text` | 要点条目文字 |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 左图右文区块最外层 `<section>` 容器 | `py-20 bg-white dark:bg-gray-900 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `grid` | 左图右文响应式双列网格布局容器 | `grid md:grid-cols-2 gap-12 items-center` |
| `mediaWrapper` | 左侧大图媒体容器 | `relative` |
| `image` | 大图图片元素样式（大圆角、阴影与边框） | `rounded-2xl shadow-xl w-full h-auto object-cover border border-gray-100 dark:border-gray-800` |
| `contentWrapper` | 右侧文本与列表内容排版包裹容器 | `space-y-6` |
| `title` | 区块主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight` |
| `description` | 正文说明文本 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-300 leading-relaxed` |
| `tagList` | 要点条目垂直清单容器 | `space-y-3 pt-2` |
| `tagItem` | 单个要点条目弹性对齐容器 | `flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium` |
| `tagIcon` | 要点前置对勾/图标徽章样式 | `flex-shrink-0 w-5 h-5 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 rounded-full flex items-center justify-center text-xs font-bold` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
