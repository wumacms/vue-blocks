# IconWall 图标墙区块

多列图标矩阵，展示协同工具、功能模块或扩展生态。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>IconWallBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <IconWallBlock />
  </div>
</div>

```vue
<IconWallBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { IconWallBlock } from 'vue-blocks'

const customData = {
  title: '不止于聊天',
  description: '内建生产力工具，让工作更轻松',
  items: [
    {
      icon: '📅',
      title: '智能日程',
      description: '会议安排与提醒'
    },
    {
      icon: '📎',
      title: '文件协同',
      description: '在线预览与评论'
    },
    {
      icon: '🔍',
      title: '全局搜索',
      description: '消息/文件/联系人'
    },
    {
      icon: '🛡️',
      title: '安全水印',
      description: '防截屏与溯源'
    }
  ]
}
</script>

<template>
  <IconWallBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { IconWallBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center max-w-3xl mx-auto mb-16',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8',
  card: 'bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition flex items-start gap-4',
  iconWrapper: 'w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-2xl shrink-0',
  content: 'space-y-1',
  itemTitle: 'text-lg font-bold text-gray-900 dark:text-white',
  itemDescription: 'text-sm text-gray-600 dark:text-gray-400 leading-relaxed'
}
</script>

<template>
  <IconWallBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 模块主标题 | `不止于聊天` |
| `description` | `text` | 模块功能特性说明副标题 | `内建生产力工具，让工作更轻松` |
| `items` | `repeater` | 功能或工具亮点条目列表 | `[4 项数据]` |

### `items` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `icon` | `text` | 功能图标（Emoji 或文本符号） |
| `title` | `text` | 功能/工具名称标题 |
| `description` | `text` | 简要功能说明文本 |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 图标墙区块外层 `<section>` 容器 | `py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 标题区包裹容器 | `text-center max-w-3xl mx-auto mb-16` |
| `title` | 区块主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4` |
| `description` | 区块副标题 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-400` |
| `grid` | 多列图标亮点项网格容器 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8` |
| `card` | 内部 `card` 元素样式 | `bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition flex items-start gap-4` |
| `iconWrapper` | 图标外层徽章包裹层（圆角与柔和背景色） | `w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-2xl shrink-0` |
| `content` | 内部 `content` 元素样式 | `space-y-1` |
| `itemTitle` | 功能项目标题文本样式 | `text-lg font-bold text-gray-900 dark:text-white` |
| `itemDescription` | 功能说明文本小字样式 | `text-sm text-gray-600 dark:text-gray-400 leading-relaxed` |
| `item` | 单个图标单元项容器 | - |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过 Slot Props 传入）：

| 插槽名 | 作用域参数 (Slot Props) | 说明 |
|---|---|---|
| `title` | `{ title }` | 图标墙主标题 |
| `description` | `{ description }` | 图标墙副标题说明 |
| `items` | `{ items }` | 图标徽章卡片列表，可自定义图标尺寸与悬浮动效 |

### 插槽使用示例

```vue
<template>
  <IconWallBlock>
    <!-- 1. 自定义主标题 -->
    <template #title="{ title }">
      <h2 class="text-3xl font-bold text-center mb-3">{{ title }}</h2>
    </template>

    <!-- 2. 自定义副标题 -->
    <template #description="{ description }">
      <p class="text-base text-center text-gray-500 mb-10">{{ description }}</p>
    </template>

    <!-- 3. 自定义图标卡片列表 -->
    <template #items="{ items }">
      <div class="flex flex-wrap gap-4 justify-center">
        <div v-for="(item, idx) in items" :key="idx" class="px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center gap-3">
          <span class="text-2xl">{{ item.icon }}</span>
          <span class="font-medium text-sm">{{ item.text }}</span>
        </div>
      </div>
    </template>
  </IconWallBlock>
</template>
```

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
