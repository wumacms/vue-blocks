# TopTextBottomImage 上文下图

居中标题描述与宽屏大图展示，适用于核心看板、应用工作台或界面高保真图展示。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>TopTextBottomImageBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <TopTextBottomImageBlock />
  </div>
</div>

```vue
<TopTextBottomImageBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { TopTextBottomImageBlock } from 'vue-blocks'

const customData = {
  title: '全平台一致体验',
  description: '无论是在桌面、网页还是移动端，消息实时同步，操作流畅如一。',
  image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
  imageAlt: '办公桌上的笔记本和咖啡'
}
</script>

<template>
  <TopTextBottomImageBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { TopTextBottomImageBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  contentWrapper: 'text-center max-w-3xl mx-auto mb-16',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-300',
  mediaWrapper: 'max-w-5xl mx-auto',
  image: 'rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full h-auto object-cover'
}
</script>

<template>
  <TopTextBottomImageBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 居中主标题 | `全平台一致体验` |
| `description` | `textarea` | 居中详细说明描述文本 | `无论是在桌面、网页还是移动端，消息实时同步，操作流畅如一。` |
| `image` | `image` | 下方全景居中大图 URL | `https://images.unsplash.com/photo-1497032628192...` |
| `imageAlt` | `text` | 图片替代说明文本 | `办公桌上的笔记本和咖啡` |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 上文下图区块最外层 `<section>` 容器 | `py-20 bg-white dark:bg-gray-900 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `contentWrapper` | 上方标题与描述文本的居中排版包裹容器 | `text-center max-w-3xl mx-auto mb-16` |
| `title` | 主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4` |
| `description` | 描述说明文本 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-300` |
| `mediaWrapper` | 下方全景大图展示容器 | `max-w-5xl mx-auto` |
| `image` | 全景大图样式（大圆角、深阴影与外边框） | `rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full h-auto object-cover` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
