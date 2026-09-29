# Partners 合作伙伴

企业客户与合作伙伴 Logo 墙，默认灰度显示，鼠标悬浮平滑过渡为品牌彩色与微放大动画。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>PartnersBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <PartnersBlock />
  </div>
</div>

```vue
<PartnersBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { PartnersBlock } from 'vue-blocks'

const customData = {
  title: '我们的合作伙伴',
  description: '全球领先的创新企业信赖之选',
  partners: [
    {
      name: 'Airbnb',
      logo: 'https://picsum.photos/seed/airbnb/120/40'
    },
    {
      name: 'Notion',
      logo: 'https://picsum.photos/seed/notion/120/40'
    },
    {
      name: 'Loom',
      logo: 'https://picsum.photos/seed/loom/120/40'
    },
    {
      name: 'Figma',
      logo: 'https://picsum.photos/seed/figma/120/40'
    },
    {
      name: 'Vercel',
      logo: 'https://picsum.photos/seed/vercel/120/40'
    },
    {
      name: 'Linear',
      logo: 'https://picsum.photos/seed/linear/120/40'
    }
  ]
}
</script>

<template>
  <PartnersBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { PartnersBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-12 max-w-3xl mx-auto',
  title: 'text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2',
  description: 'text-sm md:text-base text-gray-500 dark:text-gray-400',
  logoGrid: 'flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-75 dark:opacity-60',
  logoItem: 'transition-all duration-300 grayscale hover:grayscale-0 hover:scale-105 hover:opacity-100 flex flex-col items-center justify-center p-2',
  logoImg: 'h-8 md:h-10 w-auto object-contain',
  logoName: 'text-xs text-gray-400 mt-1'
}
</script>

<template>
  <PartnersBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 合作伙伴区块主标题 | `我们的合作伙伴` |
| `description` | `text` | 合作伙伴背书说明副标题 | `全球领先的创新企业信赖之选` |
| `partners` | `repeater` | 合作伙伴或客户企业徽标列表 | `[6 项数据]` |

### `partners` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `name` | `text` | 合作伙伴企业/机构名称 |
| `logo` | `image` | 合作伙伴企业 Logo 图片 URL |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 合作伙伴区块外层 `<section>` 容器 | `py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 标题区包裹容器 | `text-center mb-12 max-w-3xl mx-auto` |
| `title` | 区块主标题 `<h2>` 样式 | `text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2` |
| `description` | 区块副标题 `<p>` 样式 | `text-sm md:text-base text-gray-500 dark:text-gray-400` |
| `logoGrid` | 合作伙伴 Logo 网格排列容器 | `flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-75 dark:opacity-60` |
| `logoItem` | 单个 Logo 展示项包裹容器 | `transition-all duration-300 grayscale hover:grayscale-0 hover:scale-105 hover:opacity-100 flex flex-col items-center justify-center p-2` |
| `logoImg` | 合作伙伴 Logo 图片样式（灰度滤镜与 hover 彩色还原） | `h-8 md:h-10 w-auto object-contain` |
| `logoName` | 辅助无障碍的企业名称样式 | `text-xs text-gray-400 mt-1` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
