# Footer 页脚

页面底部品牌标识、版权信息与导航链接展示区块。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>FooterBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <FooterBlock />
  </div>
</div>

```vue
<FooterBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { FooterBlock } from 'vue-blocks'

const customData = {
  logo: 'https://placehold.co/32x32/4F46E5/white?text=Logo',
  brandName: 'ChatFlow',
  copyright: '© 2025 ChatFlow Technologies · 企业聊天解决方案。 保留所有权利。'
}
</script>

<template>
  <FooterBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { FooterBlock } from 'vue-blocks'

const customStyles = {
  root: 'bg-gray-900 text-gray-300 py-12 transition-colors duration-300 border-t border-gray-800',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6',
  brandWrapper: 'flex items-center gap-3',
  logo: 'h-8 w-auto rounded-md shadow-sm',
  brandName: 'text-xl font-bold text-white tracking-tight',
  copyright: 'text-sm text-gray-400 text-center md:text-right'
}
</script>

<template>
  <FooterBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `logo` | `image` | 页脚 Logo 图片 URL | `https://placehold.co/32x32/4F46E5/white?text=Logo` |
| `brandName` | `text` | 品牌或公司名称 | `ChatFlow` |
| `copyright` | `text` | 版权所有与法律声明文本 | `© 2025 ChatFlow Technologies · 企业聊天解决方案。 保留所有权利。` |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 页脚外层 `<footer>` 根容器（控制背景色、上下内边距与顶部分割线） | `bg-gray-900 text-gray-300 py-12 transition-colors duration-300 border-t border-gray-800` |
| `container` | 内容居中容器，支持两端对齐或居中排版 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6` |
| `brandWrapper` | 品牌 Logo 与企业名称组合容器 | `flex items-center gap-3` |
| `logo` | 页脚 Logo 图片样式 | `h-8 w-auto rounded-md shadow-sm` |
| `brandName` | 品牌名称文本样式 | `text-xl font-bold text-white tracking-tight` |
| `copyright` | 版权声明文字小字样式 | `text-sm text-gray-400 text-center md:text-right` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
