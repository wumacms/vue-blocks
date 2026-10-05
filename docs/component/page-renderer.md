# PageRenderer 页面渲染器

`PageRenderer` 是一个轻量级的数据驱动页面渲染组件。用户只需传入一份包含区块列表及页面配置的 JSON 数据，组件内部即可自动分发并渲染各个区块，一键生成完整企业落地页。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件默认渲染一套高保真企业落地页完整示例（导航栏与页脚独立渲染在 `<main>` 标签外部，契合 HTML5 标准规范）：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>PageRenderer 零配置默认渲染预览</span>
  </div>
  <div class="block-preview-body">
    <PageRenderer :seo="false" />
  </div>
</div>

```vue
<PageRenderer />
```

---

## 📖 基础用法

### 1. 数组模式 (轻量直接)

直接传入一个区块配置数组，适合直接接收后端返回的区块列表：

```vue
<script setup lang="ts">
import { PageRenderer, type BlockItem } from 'vue-blocks'

const blocks: BlockItem[] = [
  {
    id: 'hero',
    type: 'HeroBlock',
    variant: '1',
    data: {
      title: '下一代智能协作平台',
      description: '全链路打通工作流，提供沉浸式团队沟通。'
    }
  },
  { id: 'features', type: 'FeaturesBlock', variant: '1' },
  { id: 'contact', type: 'ContactFormBlock' }
]
</script>

<template>
  <PageRenderer :data="blocks" />
</template>
```

### 2. 对象模式 (支持页面级全局容器配置)

通过传入包含 `containerClass` 和 `blocks` 的对象，可以控制页面最外层全局容器（`<div>`）的样式（例如设置整页背景色、文字基调、暗黑模式切换以及最小高度等），作用于包含导航栏、正文与页脚在内的整个页面全局：

```vue
<script setup lang="ts">
import { PageRenderer, type PageData } from 'vue-blocks'

const pageData: PageData = {
  containerClass: 'min-h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors',
  blocks: [
    { id: 'hero', type: 'HeroBlock', variant: '1' },
    { id: 'pricing', type: 'PricingBlock' },
    { id: 'faq', type: 'FaqBlock' }
  ]
}
</script>

<template>
  <PageRenderer :data="pageData" />
</template>
```

### 3. 单独配置导航栏与页脚 (HTML5 语义化)

`PageRenderer` 支持单独传入可选的 **导航栏组件 (`navbar`)** 和 **页脚组件 (`footer`)**。这两个组件会被**独立渲染在 `<main>` 标签外部**，确保完全符合 W3C HTML5 与无障碍标准（网站导航 `<header>` 和全局页脚 `<footer>` 严禁置于正文 `<main>` 内部）。

支持以下多种灵活传参方式：

#### 方式 A：通过 Props 传入组件对象或组件名

```vue
<script setup lang="ts">
import { PageRenderer, NavbarBlock, FooterBlock, type BlockItem } from 'vue-blocks'

const blocks: BlockItem[] = [
  { id: 'hero', type: 'HeroBlock', variant: '1' },
  { id: 'features', type: 'FeaturesBlock', variant: '1' },
  { id: 'contact', type: 'ContactFormBlock' }
]
</script>

<template>
  <!-- navbar / footer 支持传入组件对象、字符串组件名或区块配置对象 -->
  <PageRenderer
    :navbar="NavbarBlock"
    :footer="FooterBlock"
    :data="blocks"
  />
</template>
```

#### 方式 B：通过 `data` 对象统一配置

```vue
<script setup lang="ts">
import { PageRenderer, type PageData } from 'vue-blocks'

const pageData: PageData = {
  // 单独配置导航栏（支持配置变体、业务数据与样式）
  navbar: {
    type: 'NavbarBlock'
  },
  // 页面全局容器样式（作用于页面整体视口）
  containerClass: 'min-h-screen bg-white dark:bg-gray-900',
  // 正文主体区块列表（严格包裹在 <main> 内部）
  blocks: [
    { id: 'hero', type: 'HeroBlock', variant: '1' },
    { id: 'features', type: 'FeaturesBlock', variant: '1' }
  ],
  // 单独配置页脚
  footer: {
    type: 'FooterBlock'
  }
}
</script>

<template>
  <PageRenderer :data="pageData" />
</template>
```

#### 方式 C：通过插槽自定义

```vue
<template>
  <PageRenderer :data="pageData">
    <!-- 自定义导航栏插槽 -->
    <template #navbar>
      <MyCustomNavbar />
    </template>

    <!-- 自定义页脚插槽 -->
    <template #footer>
      <MyCustomFooter />
    </template>
  </PageRenderer>
</template>
```

---

### 4. 页面级 SEO 信息配置 (`seo`)

`PageRenderer` 内置了响应式的页面级 SEO 同步机制。只需在页面配置中传入 `seo` 对象，组件在挂载与数据更新时会自动同步更新浏览器的 `document.title` 以及 `<meta name="description">`、`<meta name="keywords">`、OpenGraph 等标签：

```vue
<script setup lang="ts">
import { PageRenderer, type PageData } from 'vue-blocks'

const pageData: PageData = {
  // 页面级 SEO 配置
  seo: {
    title: 'VueBlocks - 企业级落地页组件库',
    description: '无需从零手写，开箱即用的 Vue 3 + Tailwind CSS 企业级落地页区块组件库。',
    keywords: ['Vue3', 'TailwindCSS', '落地页', '组件库'],
    // 支持自定义或社交分享 Meta
    meta: {
      'og:title': 'VueBlocks - 现代企业级组件库',
      'og:type': 'website'
    }
  },
  containerClass: 'min-h-screen bg-white dark:bg-gray-900',
  blocks: [
    { id: 'hero', type: 'HeroBlock', variant: '1' }
  ]
}
</script>

<template>
  <!-- 也支持通过 :seo 属性显式覆盖或传入 :seo="false" 关闭 SEO 同步 -->
  <PageRenderer :data="pageData" />
</template>
```

---

## 📦 默认配置数据 (`defaultData`)

组件内置的默认数据结构如下，支持直接从库中按需导入并在其基础上进行扩展：

```javascript
import { pageRendererDefaultData } from 'vue-blocks'

console.log(pageRendererDefaultData)
```

```javascript
export const defaultData = {
  seo: {
    title: 'VueBlocks - 高性能企业级落地页组件库',
    description: '无需从零手写，仅需一份 JSON 配置即可自动渲染高保真、语义化、无障碍的企业级落地页。',
    keywords: 'Vue3, TailwindCSS, 落地页, 页面渲染器, PageRenderer'
  },
  containerClass: 'min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100',
  navbar: {
    type: 'NavbarBlock'
  },
  blocks: [
    { id: 'hero', type: 'HeroBlock', variant: '1' },
    { id: 'features', type: 'FeaturesBlock', variant: '1' },
    { id: 'contact', type: 'ContactFormBlock' }
  ],
  footer: {
    type: 'FooterBlock'
  }
}
```

---

## ⚡ 交互事件监听

`PageRenderer` 会自动转发内部区块触发的交互事件（如 `ContactFormBlock` 的表单提交），并附加触发源区块的上下文信息（`block` 与 `index`）：

```vue
<script setup lang="ts">
import { PageRenderer, type SubmitContext } from 'vue-blocks'

function handleFormSubmit(formData: any, context: SubmitContext) {
  console.log('表单内容:', formData)
  console.log('触发事件的区块:', context.block) // { id: 'contact', type: 'ContactFormBlock', ... }
  console.log('区块序号:', context.index)
  alert(`收到来自区块 [${context.block.id || context.block.type}] 的表单提交！`)
}
</script>

<template>
  <PageRenderer :data="pageData" @submit="handleFormSubmit" />
</template>
```

---

## 🧩 扩展自定义业务区块

若您有专属的私有业务区块，只需在应用入口通过 `app.component(...)` 注册，`PageRenderer` 即可通过组件名无缝调用：

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import CustomPromoBlock from './components/CustomPromoBlock.vue'

const app = createApp(App)
// 注册自定义组件
app.component('CustomPromoBlock', CustomPromoBlock)
app.mount('#app')
```

在配置数据中直接指定该组件的名称：

```json
{
  "blocks": [
    { "id": "hero", "type": "HeroBlock" },
    {
      "id": "promo",
      "type": "CustomPromoBlock",
      "data": { "promoCode": "VUEBLOCKS2026" }
    },
    { "id": "footer", "type": "FooterBlock" }
  ]
}
```

---

## 📚 内置 22 组区块组件类型速查表

`PageRenderer` 默认支持以下 22 组标准区块，可在 `blocks` 的 `type` 字段中直接使用：

| 分类 | `type` 名称 | 对应组件 | 支持变体 (`variant`) |
| :--- | :--- | :--- | :--- |
| **基础骨架** | `NavbarBlock` | 顶部导航栏 | 默认 1 种 |
| | `HeroBlock` | 主视觉首屏 | `'1'`, `'2'`, `'3'`, `'4'` |
| | `PartnersBlock` | 合作伙伴 / 客户墙 | 默认 1 种 |
| | `FooterBlock` | 页脚区域 | 默认 1 种 |
| **内容展示** | `FeaturesBlock` | 核心特性卡片 | `'1'`, `'2'` |
| | `TopTextBottomImageBlock` | 上文下图展示 | 默认 1 种 |
| | `StatsBlock` | 关键数据统计 | 默认 1 种 |
| | `LeftImageRightTextBlock` | 左图右文图文排版 | 默认 1 种 |
| | `RightImageLeftTextBlock` | 左文右图图文排版 | 默认 1 种 |
| | `IconWallBlock` | 生产力图标墙 | 默认 1 种 |
| **业务转化** | `PricingBlock` | 价格方案对比 | 默认 1 种 |
| | `ComparisonTableBlock` | 产品能力对比表格 | 默认 1 种 |
| | `CtaBlock` | 行动号召横幅 (CTA) | 默认 1 种 |
| | `TestimonialsBlock` | 用户与客户评价 | 默认 1 种 |
| | `FaqBlock` | 常见问题手风琴 | 默认 1 种 |
| | `ContactFormBlock` | 咨询联系表单 (支持 `@submit`) | 默认 1 种 |
| **列表资讯** | `ServiceListBlock` | 服务项目列表 | 默认 1 种 |
| | `ProductListBlock` | 产品展示列表 | 默认 1 种 |
| | `CourseListBlock` | 课程与培训列表 | 默认 1 种 |
| | `TeamBlock` | 核心团队成员展示 | 默认 1 种 |
| | `NewsListBlock` | 资讯新闻列表 | 默认 1 种 |
| | `NewsDetailBlock` | 资讯详情排版 | 默认 1 种 |

---

## 📋 API 规范

### Props

| 参数 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| `data` | 页面配置对象（支持对象或纯数组） | `PageData \| BlockItem[]` | `defaultData` |
| `navbar` | 可选导航栏组件（组件对象、组件名、区块配置或布尔值，在 `<main>` 外部渲染） | `Component \| string \| BlockItem \| boolean` | `undefined` |
| `footer` | 可选页脚组件（组件对象、组件名、区块配置或布尔值，在 `<main>` 外部渲染） | `Component \| string \| BlockItem \| boolean` | `undefined` |
| `seo` | 页面级 SEO 配置对象（设为 `false` 可完全关闭 SEO 同步） | `PageSEO \| boolean` | `undefined` |

### Slots

| 插槽名 | 说明 |
| :--- | :--- |
| `navbar` | 顶部导航栏插槽（渲染在 `<main>` 外部） |
| `footer` | 底部页脚插槽（渲染在 `<main>` 外部） |

### PageData 数据结构

| 属性 | 说明 | 类型 | 必填 |
| :--- | :--- | :--- | :---: |
| `seo` | 页面级 SEO 配置（包含标题、描述、关键词等） | `PageSEO` | 否 |
| `containerClass` | 页面全局外层根容器（`<div>`）的 CSS 类名 | `string` | 否 |
| `mainClass` | 页面正文主体容器（`<main>`）的 CSS 类名 | `string` | 否 |
| `navbar` | 导航栏区块配置（独立渲染在 `<main>` 外部） | `BlockItem \| Component \| string` | 否 |
| `blocks` | 正文区块配置列表（渲染在 `<main>` 内部） | `BlockItem[]` | 是 |
| `footer` | 页脚区块配置（独立渲染在 `<main>` 外部） | `BlockItem \| Component \| string` | 否 |

### PageSEO 数据结构

| 属性 | 说明 | 类型 | 必填 |
| :--- | :--- | :--- | :---: |
| `title` | 页面标题（自动同步至 `document.title`） | `string` | 否 |
| `description` | 页面描述（自动同步至 `<meta name="description">`） | `string` | 否 |
| `keywords` | 页面关键词（自动同步至 `<meta name="keywords">`） | `string \| string[]` | 否 |
| `meta` | 自定义或社交媒体 meta 键值对或对象数组 | `Record<string, string> \| Array<any>` | 否 |

### BlockItem 数据结构

| 属性 | 说明 | 类型 | 必填 |
| :--- | :--- | :--- | :---: |
| `type` | 区块组件名（如 `'HeroBlock'`、`'NavbarBlock'`） | `string` | 是 |
| `id` | 区块唯一标识（用作 `:key` 并挂载为 DOM 锚点 ID） | `string` | 否 |
| `variant` | 区块变体编号 | `string \| number` | 否 |
| `data` | 区块业务数据（与该区块默认数据深度合并） | `Record<string, any>` | 否 |
| `styles` | 区块自定义样式覆盖 | `Record<string, any>` | 否 |

### Emits

| 事件名 | 说明 | 回调参数 |
| :--- | :--- | :--- |
| `submit` | 内部表单类区块提交时触发 | `(payload: any, context: SubmitContext)` |

---

## 🔷 TypeScript 类型导入

组件库向外导出了完备的 TypeScript 类型，可在项目中按需引用：

```typescript
import type {
  PageData,
  PageSEO,
  BlockItem,
  SubmitContext,
  PageRendererComponentType
} from 'vue-blocks'
```
