# Faq 常见问题

可交互的手风琴折叠问答列表，帮助用户快速解答疑问并消除顾虑。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<BlockPreview name="FaqBlock" title="FaqBlock 组件预览" />

```vue
<FaqBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data`
属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { FaqBlock } from 'vue-blocks'

const customData = {
  title: '常见问题',
  faqs: [
    {
      answer: '是的，企业版支持私有云或本地服务器部署，满足最高安全合规要求。',
      question: '支持本地部署吗？'
    },
    {
      answer: '所有新用户均可享受30天全功能免费试用，无需信用卡。',
      question: '可以试用多久？'
    },
    {
      answer: '数据存储在云端的独立数据库，可选中国大陆或海外区域，符合当地法规。',
      question: '数据存储在哪里？'
    },
    {
      answer: '我们提供专业迁移工具，支持从Slack、Teams等平台导入历史数据。',
      question: '如何迁移现有聊天记录？'
    }
  ]
}
</script>

<template>
  <FaqBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置
`tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { FaqBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
  container: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-16',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  accordionList: 'space-y-4',
  item: 'border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-200 bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer',
  itemActive: 'border-indigo-500/40 dark:border-indigo-500/40 bg-white dark:bg-gray-800 shadow-sm',
  trigger: 'flex justify-between items-center w-full text-left font-semibold text-gray-900 dark:text-white text-lg',
  icon: 'w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-200 shrink-0 ml-4',
  iconOpen: 'rotate-180',
  content: 'mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base border-t border-gray-100 dark:border-gray-700/60 pt-4'
}
</script>

<template>
  <FaqBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名  | 类型       | 说明               | 默认值       |
| ------- | ---------- | ------------------ | ------------ |
| `title` | `text`     | 常见问题区块主标题 | `常见问题`   |
| `faqs`  | `repeater` | 问答条目列表       | `[4 项数据]` |

### `faqs` 列表项字段说明

| 字段名     | 类型       | 说明             |
| ---------- | ---------- | ---------------- |
| `question` | `text`     | 问题标题文本     |
| `answer`   | `textarea` | 详细解答内容文本 |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM
节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名      | 作用元素 / 解释说明                                         | 默认 Tailwind CSS 类名                                                                                                                                                                |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`          | 常见问题区块外层 `<section>` 容器                           | `py-20 bg-white dark:bg-gray-900 transition-colors duration-300`                                                                                                                      |
| `container`     | 内容最大阅读宽度居中容器                                    | `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`                                                                                                                                              |
| `header`        | 顶部标题居中包裹层                                          | `text-center mb-16`                                                                                                                                                                   |
| `title`         | 区块主标题 `<h2>` 样式                                      | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4`                                                                                                                   |
| `description`   | 区块副标题 `<p>` 样式（可选）                               | `text-lg text-gray-600 dark:text-gray-400`                                                                                                                                            |
| `accordionList` | 手风琴条目列表垂直排布容器                                  | `space-y-4`                                                                                                                                                                           |
| `item`          | 单个折叠条目外框未激活样式（背景、圆角、边框与 hover 反馈） | `border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-all duration-200 bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-50 dark:hover:bg-gray-800/70 cursor-pointer` |
| `itemActive`    | 单个条目展开激活状态时的边框与阴影样式                      | `border-indigo-500/40 dark:border-indigo-500/40 bg-white dark:bg-gray-800 shadow-sm`                                                                                                  |
| `trigger`       | 问题触发栏弹性容器（问题文字与展开箭头两端对齐）            | `flex justify-between items-center w-full text-left font-semibold text-gray-900 dark:text-white text-lg`                                                                              |
| `icon`          | 右侧折叠箭头 SVG 图标基础样式                               | `w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-200 shrink-0 ml-4`                                                                                        |
| `iconOpen`      | 条目展开时箭头的旋转动画样式（`rotate-180`）                | `rotate-180`                                                                                                                                                                          |
| `content`       | 展开后显示的回答详细内容正文区域（带顶部分割线）            | `mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base border-t border-gray-100 dark:border-gray-700/60 pt-4`                                                    |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过
Slot Props 传入）：

| 插槽名  | 作用域参数 (Slot Props) | 说明                                                         |
| ------- | ----------------------- | ------------------------------------------------------------ |
| `title` | `{ title }`             | 常见问题区块主标题                                           |
| `faqs`  | `{ faqs }`              | 常见问题折叠面板列表，可接入第三方手风琴组件或自定义展开动效 |

### 插槽使用示例

```vue
<template>
  <FaqBlock>
    <!-- 1. 自定义标题 -->
    <template #title="{ title }">
      <h2 class="text-4xl font-black text-center text-gray-900 dark:text-white mb-10">{{ title }}</h2>
    </template>

    <!-- 2. 自定义 FAQ 折叠面板列表 -->
    <template #faqs="{ faqs }">
      <div class="space-y-4 max-w-3xl mx-auto">
        <details v-for="(item, idx) in faqs" :key="idx" class="p-5 rounded-2xl border bg-white dark:bg-gray-900 shadow-sm">
          <summary class="font-semibold text-lg cursor-pointer">{{ item.question }}</summary>
          <p class="mt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ item.answer }}</p>
        </details>
      </div>
    </template>
  </FaqBlock>
</template>
```

## 🧩 基础属性 (Props)

| 参数名    | 类型               | 默认值 | 说明                                  |
| --------- | ------------------ | ------ | ------------------------------------- |
| `variant` | `string \| number` | `'1'`  | 变体类型                              |
| `data`    | `object`           | `{}`   | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles`  | `object`           | `{}`   | 样式覆写映射对象（Tailwind CSS 类名） |
