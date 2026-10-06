# 快速开始

本节将带您在 3 分钟内使用 VueBlocks 搭建一个现代化的企业官网落地页。

---

## 1. 注册与引入

### 全量全局注册

在 `main.js` 中全量安装组件库，即可在任意模板中使用全部 22 个区块：

```js [src/main.js]
import { createApp } from 'vue'
import App from './App.vue'
import VueBlocks from 'vue-blocks'
import './style.css'

const app = createApp(App)
app.use(VueBlocks)
app.mount('#app')
```

### 单个按需引入

```vue
<script setup>
import { NavbarBlock, HeroBlock, FeaturesBlock, FooterBlock } from 'vue-blocks'
</script>

<template>
  <NavbarBlock />
  <HeroBlock />
  <FeaturesBlock />
  <FooterBlock />
</template>
```

---

## 2. 基础使用演示

### 零配置预览

无需传递任何 `props`，所有区块内置真实的企业级文案与高清封面图，直接渲染：

```vue
<template>
  <!-- 直接渲染出标准的 SaaS 顶部导航 -->
  <NavbarBlock />

  <!-- 直接渲染出标准的 Hero 主视觉卡片 -->
  <HeroBlock />
</template>
```

### 变体切换 (统一主题体系)

全系 22 组区块均支持通过 `variant` 参数统一切换设计风格（支持单区块指定或由渲染器全站统一调度）：
- **`variant="1"`**：SaaS 现代简约风格（默认）
- **`variant="2"`**：波普复古 / 新粗野主义风格（粗描边、实体硬阴影、高反差撞色）

```vue
<template>
  <!-- 方式 1：单个区块直接指定变体 -->
  <NavbarBlock variant="2" />
  <HeroBlock variant="2" />
  <FeaturesBlock variant="2" />
  <PricingBlock variant="2" />

  <!-- 方式 2：通过编排容器实现全站 22 个区块一键联动换皮 -->
  <!-- <SiteRenderer :variant="'2'" /> -->
</template>
```

### 自定义内容覆盖 (`data`)

在 `<script setup lang="ts">` 中声明数据对象，通过 `:data` 传入。未指定的字段将自动沿用默认配置：

```vue
<script setup lang="ts">
import { HeroBlock } from 'vue-blocks'

const heroData = {
  title: '下一代智能协作平台',
  description: '让企业跨部门沟通与数据看板整合在一个极速界面中。',
  buttons: [
    { btnText: '免费预约演示', btnLink: '/demo', isPrimary: true }
  ]
}
</script>

<template>
  <HeroBlock :data="heroData" />
</template>
```

### 自定义样式覆盖 (`styles`)

在 `<script setup lang="ts">` 中声明样式对象，基于 `tailwind-merge` 实现无冲突的 Tailwind 类名覆盖：

```vue
<script setup lang="ts">
import { FeaturesBlock } from 'vue-blocks'

const featuresStyles = {
  root: 'py-28 bg-slate-950 text-white',
  title: 'text-5xl text-sky-400 font-black'
}
</script>

<template>
  <FeaturesBlock :styles="featuresStyles" />
</template>
```

### 自定义插槽覆盖 (`slots`)

当默认的 DOM 结构无法满足需求时，可通过具名作用域插槽（Scoped Slots）替换任意子区域，插槽会暴露对应的数据上下文（Slot Props）：

```vue
<script setup lang="ts">
import { HeroBlock } from 'vue-blocks'

function handleGetStarted() {
  alert('点击了自定义行动按钮！')
}
</script>

<template>
  <HeroBlock>
    <!-- 1. 替换标题：自定义渐变文字样式 -->
    <template #title="{ title }">
      <h1 class="text-5xl font-black bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-6">
        {{ title }}
      </h1>
    </template>

    <!-- 2. 替换按钮组：注入自定义事件与第三方 UI 库组件 -->
    <template #actions="{ buttons }">
      <div class="flex gap-4">
        <button
          @click="handleGetStarted"
          class="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition"
        >
          立即体验
        </button>
      </div>
    </template>

    <!-- 3. 替换媒体区域：将静态图片替换为自定义视频或其他媒体 -->
    <template #media="{ image, imageAlt }">
      <div class="mt-12 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
        <img :src="image" :alt="imageAlt" class="w-full object-cover" />
      </div>
    </template>
  </HeroBlock>
</template>
```
