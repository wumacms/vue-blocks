# Hero 主视觉

落地页最核心的首屏转化区域，内置 4 种风格变体：SaaS现代简约、波普复古/新丑风、暗黑分割网格、全屏背景大图蒙版。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>HeroBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <HeroBlock />
  </div>
</div>

```vue
<HeroBlock />
```

### 变体 1：SaaS 现代简约（默认）

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>Variant 1: SaaS Clean (Default)</span>
  </div>
  <div class="block-preview-body">
    <HeroBlock variant="1" />
  </div>
</div>

```vue
<HeroBlock variant="1" />
```

### 变体 2：波普复古 / 新丑风粗边框重阴影

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>Variant 2: Neo-brutalist / Pop Retro</span>
  </div>
  <div class="block-preview-body">
    <HeroBlock variant="2" />
  </div>
</div>

```vue
<HeroBlock variant="2" />
```

### 变体 3：暗黑分割网格亮黄风

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>Variant 3: Dark Split Grid</span>
  </div>
  <div class="block-preview-body">
    <HeroBlock variant="3" />
  </div>
</div>

```vue
<HeroBlock variant="3" />
```

### 变体 4：全屏背景图蒙版

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>Variant 4: Background Image Hero</span>
  </div>
  <div class="block-preview-body">
    <HeroBlock variant="4" />
  </div>
</div>

```vue
<HeroBlock variant="4" />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { HeroBlock } from 'vue-blocks'

const customData = {
  title: '企业级即时通讯<br>让协作更快一步',
  description: '安全、高效、可定制——专为现代企业打造的智能聊天平台，集成工作流与数据洞察。',
  buttons: [
    {
      btnText: '开始免费使用',
      btnLink: '#',
      isPrimary: true,
      newWindow: false
    },
    {
      btnText: '联系销售',
      btnLink: '#',
      isPrimary: false,
      newWindow: false
    }
  ],
  image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
  imageAlt: '团队协作界面',
  bgImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  bgImageAlt: '现代办公空间全景',
  overlayOpacity: 60
}
</script>

<template>
  <HeroBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { HeroBlock } from 'vue-blocks'

const customStyles = {
  root: 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 antialiased relative bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 pt-16 pb-20 overflow-hidden transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  contentWrapper: 'text-center max-w-3xl mx-auto',
  title: 'text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6',
  description: 'text-lg text-gray-600 dark:text-gray-400 mb-10',
  buttonGroup: 'flex flex-wrap gap-4 justify-center',
  buttonPrimary: 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition',
  buttonSecondary: 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium shadow-sm transition',
  mediaWrapper: 'mt-16 max-w-5xl mx-auto',
  image: 'rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full h-auto object-cover'
}
</script>

<template>
  <HeroBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `textarea` | 巨幕主标题（支持 `<br>` 换行与 HTML 高亮） | `企业级即时通讯<br>让协作更快一步` |
| `description` | `textarea` | 核心价值主张与详细说明文本 | `安全、高效、可定制——专为现代企业打造的智能聊天平台，集成工作流与数据洞察。` |
| `buttons` | `repeater` | 操作按钮列表（支持主次按钮并排） | `[2 项数据]` |
| `image` | `image` | 产品界面或插画展示图片 URL（变体1、2、3） | `https://images.unsplash.com/photo-1557804506-66...` |
| `imageAlt` | `text` | 展示图片的替代文本（SEO与无障碍访问） | `团队协作界面` |
| `bgImage` | `image` | 全宽背景大图 URL（变体4全屏背景风格使用） | `https://images.unsplash.com/photo-1497215728101...` |
| `bgImageAlt` | `text` | 全宽背景大图的替代文本 | `现代办公空间全景` |
| `overlayOpacity` | `number` | 背景遮罩层黑色半透明不透明度百分比 (0-100) | `60` |

### `buttons` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `btnText` | `text` | 按钮显示文字 |
| `btnLink` | `text` | 按钮跳转链接 |
| `isPrimary` | `boolean` | 是否为主行动按钮（决定主/次样式） |
| `newWindow` | `boolean` | 是否在新标签页打开 |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 巨幕外层 `<section>` 根容器，控制内外边距、背景颜色及变体定位 | `bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 antialiased relative bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 pt-16 pb-20 overflow-hidden transition-colors duration-300` |
| `container` | 内容最大宽度居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `contentWrapper` | 文本与按钮内容区域的包裹容器 | `text-center max-w-3xl mx-auto` |
| `title` | 主标题 `<h1>` 样式（超大字号、粗体、紧凑字间距） | `text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6` |
| `description` | 描述文本 `<p>` 样式（字号、行距、文字颜色） | `text-lg text-gray-600 dark:text-gray-400 mb-10` |
| `buttonGroup` | 按钮组弹性布局容器（按钮间距与对齐方式） | `flex flex-wrap gap-4 justify-center` |
| `buttonPrimary` | 主行动按钮样式（实色/渐变背景、阴影与 hover 动效） | `bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition` |
| `buttonSecondary` | 次级行动按钮样式（边框、透明底或灰底） | `bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-medium shadow-sm transition` |
| `mediaWrapper` | 媒体展示区外层容器 | `mt-16 max-w-5xl mx-auto` |
| `image` | 产品界面预览图片元素 | `rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full h-auto object-cover` |
| `imageBox` | 图片装饰外框（带阴影、外边框与圆角） | - |
| `overlay` | 变体4背景暗色半透明遮罩层 | - |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
