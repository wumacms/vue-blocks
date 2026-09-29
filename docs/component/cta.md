# Cta 转化号召

高对比度转化行动横幅，配备行动号召文案与主次双转化按钮。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>CtaBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <CtaBlock />
  </div>
</div>

```vue
<CtaBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { CtaBlock } from 'vue-blocks'

const customData = {
  title: '立即提升团队协作效率',
  description: '加入数百家信任我们的企业，开启高效沟通之旅。',
  buttons: [
    {
      btnLink: '#',
      btnText: '免费试用30天',
      isPrimary: true,
      newWindow: false
    },
    {
      btnLink: '#',
      btnText: '预约演示',
      isPrimary: false,
      newWindow: true
    }
  ]
}
</script>

<template>
  <CtaBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { CtaBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-indigo-600 dark:bg-indigo-950 relative overflow-hidden transition-colors duration-300',
  container: 'max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10',
  title: 'text-3xl md:text-5xl font-black text-white mb-6 leading-tight',
  description: 'text-lg md:text-xl text-indigo-100 dark:text-indigo-200 mb-10 max-w-2xl mx-auto',
  buttonGroup: 'flex flex-wrap gap-4 justify-center',
  buttonPrimary: 'bg-white hover:bg-gray-100 text-indigo-600 px-8 py-3.5 rounded-full font-bold shadow-lg shadow-black/10 transition transform hover:-translate-y-0.5',
  buttonSecondary: 'bg-indigo-700/60 hover:bg-indigo-700 text-white border border-indigo-400/40 px-8 py-3.5 rounded-full font-bold transition'
}
</script>

<template>
  <CtaBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 行动号召模块主标题 | `立即提升团队协作效率` |
| `description` | `text` | 行动号召详细说明/引导文案 | `加入数百家信任我们的企业，开启高效沟通之旅。` |
| `buttons` | `repeater` | 操作按钮列表 | `[2 项数据]` |

### `buttons` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `btnText` | `text` | 按钮显示文字 |
| `btnLink` | `text` | 按钮跳转链接 |
| `isPrimary` | `boolean` | 是否为主行动按钮 |
| `newWindow` | `boolean` | 是否在新标签页打开 |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | CTA 区块外层 `<section>` 容器 | `py-20 bg-indigo-600 dark:bg-indigo-950 relative overflow-hidden transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10` |
| `title` | 主标题 `<h2>` 样式（大字号、粗体） | `text-3xl md:text-5xl font-black text-white mb-6 leading-tight` |
| `description` | 描述副标题 `<p>` 样式 | `text-lg md:text-xl text-indigo-100 dark:text-indigo-200 mb-10 max-w-2xl mx-auto` |
| `buttonGroup` | 按钮组横向弹性布局容器 | `flex flex-wrap gap-4 justify-center` |
| `buttonPrimary` | 主要行动按钮样式（亮色背景、高对比度文字） | `bg-white hover:bg-gray-100 text-indigo-600 px-8 py-3.5 rounded-full font-bold shadow-lg shadow-black/10 transition transform hover:-translate-y-0.5` |
| `buttonSecondary` | 次要行动按钮样式（幽灵按钮或线框样式） | `bg-indigo-700/60 hover:bg-indigo-700 text-white border border-indigo-400/40 px-8 py-3.5 rounded-full font-bold transition` |
| `card` | CTA 主体卡片容器（背景深色渐变、大圆角与内边距） | - |
| `contentWrapper` | 文字与按钮内容的居中排版包裹层 | - |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过 Slot Props 传入）：

| 插槽名 | 作用域参数 (Slot Props) | 说明 |
|---|---|---|
| `title` | `{ title }` | 行动号召区块主标题 |
| `description` | `{ description }` | 行动号召区块副标题描述 |
| `actions` | `{ buttons }` | 行动按钮组，可自定义按钮交互、弹窗触发等 |

### 插槽使用示例

```vue
<template>
  <CtaBlock>
    <!-- 1. 自定义主标题 -->
    <template #title="{ title }">
      <h2 class="text-4xl font-extrabold text-white mb-4">{{ title }}</h2>
    </template>

    <!-- 2. 自定义描述文案 -->
    <template #description="{ description }">
      <p class="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">{{ description }}</p>
    </template>

    <!-- 3. 自定义行动按钮 -->
    <template #actions="{ buttons }">
      <div class="flex gap-4 justify-center">
        <button class="px-8 py-3.5 bg-white text-indigo-600 font-bold rounded-xl shadow-xl hover:bg-gray-50 transition">
          免费注册体验
        </button>
      </div>
    </template>
  </CtaBlock>
</template>
```

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
