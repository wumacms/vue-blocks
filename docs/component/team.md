# Team 核心团队

核心创始人与团队成员展示卡片，展示专家头像、姓名与职称职务。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>TeamBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <TeamBlock />
  </div>
</div>

```vue
<TeamBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { TeamBlock } from 'vue-blocks'

const customData = {
  title: '核心团队',
  description: '来自全球顶尖企业的协作专家',
  members: [
    {
      name: '张伟',
      role: 'CEO & 创始人',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=128&h=128&fit=crop'
    },
    {
      name: '陈敏',
      role: 'CTO',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop'
    },
    {
      name: '王磊',
      role: '产品总监',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=128&h=128&fit=crop'
    },
    {
      name: '李莉',
      role: '设计负责人',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop'
    }
  ]
}
</script>

<template>
  <TeamBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { TeamBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center max-w-3xl mx-auto mb-16',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8',
  card: 'text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition',
  avatar: 'w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md border-2 border-white dark:border-gray-700',
  name: 'text-lg font-bold text-gray-900 dark:text-white',
  role: 'text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1'
}
</script>

<template>
  <TeamBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 团队模块主标题 | `核心团队` |
| `description` | `text` | 团队简述或副标题 | `来自全球顶尖企业的协作专家` |
| `members` | `repeater` | 核心团队成员列表 | `[4 项数据]` |

### `members` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `name` | `text` | 成员姓名 |
| `role` | `text` | 成员头衔/职位 |
| `avatar` | `image` | 成员头像图片 URL |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 团队区块最外层 `<section>` 容器 | `py-20 bg-white dark:bg-gray-900 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 标题区包裹容器 | `text-center max-w-3xl mx-auto mb-16` |
| `title` | 区块主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4` |
| `description` | 区块副标题 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-400` |
| `grid` | 成员卡片网格布局容器 | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8` |
| `card` | 单个成员卡片容器（背景、内边距、悬停背景渐变） | `text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition` |
| `avatar` | 成员圆形头像图片样式（尺寸、圆角、白边与阴影） | `w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-md border-2 border-white dark:border-gray-700` |
| `name` | 成员姓名文本样式 | `text-lg font-bold text-gray-900 dark:text-white` |
| `role` | 成员职位头衔文本样式 | `text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1` |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过 Slot Props 传入）：

| 插槽名 | 作用域参数 (Slot Props) | 说明 |
|---|---|---|
| `title` | `{ title }` | 团队成员区块主标题 |
| `description` | `{ description }` | 团队成员区块副标题说明 |
| `grid` | `{ members }` | 团队成员卡片列表网格，支持自定义社交媒体链接图标与介绍 |

### 插槽使用示例

```vue
<template>
  <TeamBlock>
    <!-- 1. 自定义主标题 -->
    <template #title="{ title }">
      <h2 class="text-4xl font-black text-center text-gray-900 dark:text-white mb-3">{{ title }}</h2>
    </template>

    <!-- 2. 自定义副标题 -->
    <template #description="{ description }">
      <p class="text-lg text-center text-gray-500 mb-12">{{ description }}</p>
    </template>

    <!-- 3. 自定义成员卡片网格 -->
    <template #grid="{ members }">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(m, idx) in members" :key="idx" class="text-center p-6 rounded-2xl border bg-white dark:bg-gray-900 shadow-sm">
          <img :src="m.avatar" :alt="m.name" class="w-28 h-28 rounded-full mx-auto object-cover mb-4 ring-4 ring-indigo-50" />
          <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ m.name }}</h3>
          <p class="text-indigo-600 text-sm font-medium mt-1">{{ m.role }}</p>
        </div>
      </div>
    </template>
  </TeamBlock>
</template>
```

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
