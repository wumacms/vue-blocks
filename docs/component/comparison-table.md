# ComparisonTable 对比表格

横向对比功能矩阵表格，清晰展现本产品对比竞品的核心优势与功能覆盖度。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<BlockPreview name="ComparisonTableBlock" title="ComparisonTableBlock 组件预览" />

```vue
<ComparisonTableBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data`
属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { ComparisonTableBlock } from 'vue-blocks'

const customData = {
  title: '为什么选择 ChatFlow',
  description: '与主流竞品对比，优势一目了然',
  firstColHeader: '功能',
  headers: [
    {
      text: 'ChatFlow',
      textColor: 'text-indigo-700'
    },
    {
      text: '竞品A',
      textColor: 'text-gray-500'
    },
    {
      text: '竞品B',
      textColor: 'text-gray-500'
    }
  ],
  rows: [
    {
      feature: '端到端加密',
      columns: [
        {
          value: '✓',
          textColor: 'text-green-600'
        },
        {
          value: '✗',
          textColor: 'text-red-400'
        },
        {
          value: '✓',
          textColor: 'text-green-600'
        }
      ]
    },
    {
      feature: '无限消息历史',
      columns: [
        {
          value: '✓',
          textColor: 'text-green-600'
        },
        {
          value: '✓',
          textColor: 'text-green-600'
        },
        {
          value: '✗',
          textColor: 'text-red-400'
        }
      ]
    },
    {
      feature: '私有部署',
      columns: [
        {
          value: '✓',
          textColor: 'text-green-600'
        },
        {
          value: '✗',
          textColor: 'text-red-400'
        },
        {
          value: '✓',
          textColor: 'text-green-600'
        }
      ]
    },
    {
      feature: 'AI 助手',
      columns: [
        {
          value: '✓',
          textColor: 'text-green-600'
        },
        {
          value: '✗',
          textColor: 'text-red-400'
        },
        {
          value: 'Beta',
          textColor: 'text-yellow-500'
        }
      ]
    },
    {
      feature: '200+ 集成',
      columns: [
        {
          value: '✓',
          textColor: 'text-green-600'
        },
        {
          value: '✓',
          textColor: 'text-green-600'
        },
        {
          value: '✗',
          textColor: 'text-red-400'
        }
      ]
    }
  ]
}
</script>

<template>
  <ComparisonTableBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置
`tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { ComparisonTableBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center max-w-3xl mx-auto mb-16',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  tableWrapper: 'overflow-x-auto shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800',
  table: 'w-full min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm text-left',
  thead: 'bg-gray-50 dark:bg-gray-800/80',
  th: 'px-6 py-4 font-semibold text-gray-700 dark:text-gray-200',
  tbody: 'divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900',
  tr: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 transition',
  tdFeature: 'px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap',
  tdValue: 'px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap'
}
</script>

<template>
  <ComparisonTableBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名           | 类型       | 说明                             | 默认值                         |
| ---------------- | ---------- | -------------------------------- | ------------------------------ |
| `title`          | `text`     | 对比表格区块主标题               | `为什么选择 ChatFlow`          |
| `description`    | `text`     | 对比说明副标题                   | `与主流竞品对比，优势一目了然` |
| `firstColHeader` | `text`     | 首列特性表头文字（如“功能特性”） | `功能`                         |
| `headers`        | `repeater` | 各对比方产品表头列表             | `[3 项数据]`                   |
| `rows`           | `repeater` | 特性对比行列表                   | `[5 项数据]`                   |

### `headers` 列表项字段说明

| 字段名      | 类型   | 说明                                             |
| ----------- | ------ | ------------------------------------------------ |
| `text`      | `text` | 对比方产品/方案名称                              |
| `textColor` | `text` | 表头文字颜色 Tailwind 类名（如主推方案突出显示） |

### `rows` 列表项字段说明

| 字段名    | 类型       | 说明                             |
| --------- | ---------- | -------------------------------- |
| `feature` | `text`     | 功能特性条目名称                 |
| `columns` | `repeater` | 当前功能在各个对比方下的具体表现 |

### `rows.columns` 列表项字段说明

| 字段名      | 类型   | 说明                                                |
| ----------- | ------ | --------------------------------------------------- |
| `value`     | `text` | 表现值（如 `✓`、`✗` 或文字说明）                    |
| `textColor` | `text` | 文字颜色类名（如 `text-green-600`、`text-red-400`） |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM
节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名     | 作用元素 / 解释说明                                | 默认 Tailwind CSS 类名                                                              |
| -------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `root`         | 对比表格区块外层 `<section>` 容器                  | `py-20 bg-white dark:bg-gray-900 transition-colors duration-300`                    |
| `container`    | 内容居中容器                                       | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`                                            |
| `header`       | 标题区包裹容器                                     | `text-center max-w-3xl mx-auto mb-16`                                               |
| `title`        | 区块主标题 `<h2>` 样式                             | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4`                 |
| `description`  | 区块副标题 `<p>` 样式                              | `text-lg text-gray-600 dark:text-gray-400`                                          |
| `tableWrapper` | 表格横向滚动包裹层（控制边框、圆角及小屏横向滚动） | `overflow-x-auto shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800` |
| `table`        | 原生 `<table>` 元素样式（全宽、分隔线）            | `w-full min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm text-left` |
| `thead`        | 表头 `<thead>` 区域样式                            | `bg-gray-50 dark:bg-gray-800/80`                                                    |
| `th`           | 表头单元格 `<th>` 样式                             | `px-6 py-4 font-semibold text-gray-700 dark:text-gray-200`                          |
| `tbody`        | 表体 `<tbody>` 区域样式                            | `divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900`           |
| `tr`           | 数据行 `<tr>` 悬浮过渡与分割线样式                 | `hover:bg-gray-50 dark:hover:bg-gray-800/50 transition`                             |
| `tdFeature`    | 首列特性名称单元格 `<td>` 样式（粗体、左对齐）     | `px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap`             |
| `tdValue`      | 对比值数据单元格 `<td>` 样式（居中、字体规范）     | `px-6 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap`                      |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过
Slot Props 传入）：

| 插槽名        | 作用域参数 (Slot Props) | 说明                                                 |
| ------------- | ----------------------- | ---------------------------------------------------- |
| `title`       | `{ title }`             | 版本对比区块主标题                                   |
| `description` | `{ description }`       | 版本对比区块副标题说明                               |
| `table`       | `{ data }`              | 对比表格主体，可自定义表格行、打勾图标与差异高亮样式 |

### 插槽使用示例

```vue
<template>
  <ComparisonTableBlock>
    <!-- 1. 自定义主标题 -->
    <template #title="{ title }">
      <h2 class="text-3xl font-extrabold text-center mb-3">{{ title }}</h2>
    </template>

    <!-- 2. 自定义副标题描述 -->
    <template #description="{ description }">
      <p class="text-base text-center text-gray-500 mb-8">{{ description }}</p>
    </template>

    <!-- 3. 自定义对比表格主体 -->
    <template #table="{ data }">
      <div class="overflow-x-auto rounded-2xl border shadow-lg">
        <table class="w-full text-left text-sm">
          <!-- 自定义渲染对比表格 -->
        </table>
      </div>
    </template>
  </ComparisonTableBlock>
</template>
```

## 🧩 基础属性 (Props)

| 参数名    | 类型               | 默认值 | 说明                                  |
| --------- | ------------------ | ------ | ------------------------------------- |
| `variant` | `string \| number` | `'1'`  | 变体类型                              |
| `data`    | `object`           | `{}`   | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles`  | `object`           | `{}`   | 样式覆写映射对象（Tailwind CSS 类名） |
