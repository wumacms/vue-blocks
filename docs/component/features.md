# Features 特性区块

四列响应式特性卡片，支持丰富图标、特性标题与介绍说明，带悬停卡片阴影动画。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>FeaturesBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <FeaturesBlock />
  </div>
</div>

```vue
<FeaturesBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { FeaturesBlock } from 'vue-blocks'

const customData = {
  title: '专为商务打造的特性',
  description: '从安全到效率，面面俱到',
  features: [
    {
      icon: '🔒',
      title: '企业级安全',
      description: '端到端加密、SSO、DLP策略，满足合规需求。'
    },
    {
      icon: '⚡',
      title: '实时同步',
      description: '毫秒级延迟，跨设备已读回执与状态。'
    },
    {
      icon: '🧩',
      title: '无限集成',
      description: '连接200+企业应用，自定义机器人。'
    },
    {
      icon: '📊',
      title: '分析洞察',
      description: '团队活跃度、响应时间数据可视化。'
    }
  ]
}
</script>

<template>
  <FeaturesBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { FeaturesBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center max-w-3xl mx-auto mb-16',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
  card: 'bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800 flex flex-col',
  iconWrapper: 'w-12 h-12 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl flex items-center justify-center text-2xl mb-6',
  cardTitle: 'text-xl font-bold text-gray-900 dark:text-white mb-2',
  cardDescription: 'text-gray-600 dark:text-gray-400 text-sm leading-relaxed'
}
</script>

<template>
  <FeaturesBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 模块主标题 | `专为商务打造的特性` |
| `description` | `text` | 模块副标题或核心说明文字 | `从安全到效率，面面俱到` |
| `features` | `repeater` | 特性卡片列表数据 | `[4 项数据]` |

### `features` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `icon` | `text` | 特性图标（支持 Emoji、SVG 字符或文字图标） |
| `title` | `text` | 特性卡片标题 |
| `description` | `text` | 特性卡片详细说明文本 |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 特性区块最外层 `<section>` 容器 | `py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300` |
| `container` | 内容居中容器，限制最大宽度 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 顶部标题与描述文本包裹容器 | `text-center max-w-3xl mx-auto mb-16` |
| `title` | 区块主标题 `<h2>` 文本样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4` |
| `description` | 区块副标题 `<p>` 描述文本样式 | `text-lg text-gray-600 dark:text-gray-400` |
| `grid` | 特性卡片的响应式网格布局容器（单列到四列自适应） | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8` |
| `card` | 单个特性卡片外框（背景、圆角、边框、阴影及悬停反馈） | `bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-800 flex flex-col` |
| `iconWrapper` | 图标外层方形/圆形徽章容器 | `w-12 h-12 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl flex items-center justify-center text-2xl mb-6` |
| `cardTitle` | 特性卡片内标题 `<h3>` 文本样式 | `text-xl font-bold text-gray-900 dark:text-white mb-2` |
| `cardDescription` | 特性卡片内详细描述文本样式 | `text-gray-600 dark:text-gray-400 text-sm leading-relaxed` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
