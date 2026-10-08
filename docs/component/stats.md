# Stats 数据统计

四列大数字统计区块，展示企业客户数、留存率、日处理量等核心商业指标。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<BlockPreview name="StatsBlock" title="StatsBlock 组件预览" />

```vue
<StatsBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data`
属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { StatsBlock } from 'vue-blocks'

const customData = {
  stats: [
    {
      label: '企业客户',
      value: '500+'
    },
    {
      label: '客户留存率',
      value: '98%'
    },
    {
      label: '日消息量',
      value: '20M+'
    },
    {
      label: '技术支持',
      value: '24/7'
    }
  ]
}
</script>

<template>
  <StatsBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置
`tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { StatsBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  grid: 'grid grid-cols-2 md:grid-cols-4 gap-8 text-center',
  item: 'p-4',
  value: 'text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight',
  label: 'text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium mt-2'
}
</script>

<template>
  <StatsBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名  | 类型       | 说明                       | 默认值       |
| ------- | ---------- | -------------------------- | ------------ |
| `stats` | `repeater` | 核心业务与技术数据指标列表 | `[4 项数据]` |

### `stats` 列表项字段说明

| 字段名  | 类型   | 说明                                     |
| ------- | ------ | ---------------------------------------- |
| `label` | `text` | 指标名称标签（如“企业客户”、“日消息量”） |
| `value` | `text` | 指标数值（如“500+”、“99.9%”、“24/7”）    |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM
节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名  | 作用元素 / 解释说明                                     | 默认 Tailwind CSS 类名                                                                                         |
| ----------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `root`      | 统计区块外层 `<section>` 容器，控制垂直内边距与边框分割 | `py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors duration-300` |
| `container` | 内容最大宽度居中容器                                    | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`                                                                       |
| `grid`      | 数据指标响应式网格容器（两列至四列自适应）              | `grid grid-cols-2 md:grid-cols-4 gap-8 text-center`                                                            |
| `item`      | 单个数据单元格容器                                      | `p-4`                                                                                                          |
| `value`     | 指标数值特大粗体高亮文本样式                            | `text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight`                          |
| `label`     | 指标描述标签文本样式                                    | `text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium mt-2`                                       |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过
Slot Props 传入）：

| 插槽名  | 作用域参数 (Slot Props) | 说明                                                          |
| ------- | ----------------------- | ------------------------------------------------------------- |
| `stats` | `{ stats }`             | 数据统计指标网格列表，支持接入数字滚动动效库（如 CountUp 等） |

### 插槽使用示例

```vue
<template>
  <StatsBlock>
    <!-- 1. 自定义统计指标网格 -->
    <template #stats="{ stats }">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div v-for="(item, idx) in stats" :key="idx" class="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg">
          <div class="text-4xl font-black text-indigo-600 mb-2">{{ item.value }}</div>
          <div class="text-sm font-medium text-gray-500">{{ item.label }}</div>
        </div>
      </div>
    </template>
  </StatsBlock>
</template>
```

## 🧩 基础属性 (Props)

| 参数名    | 类型               | 默认值 | 说明                                  |
| --------- | ------------------ | ------ | ------------------------------------- |
| `variant` | `string \| number` | `'1'`  | 变体类型                              |
| `data`    | `object`           | `{}`   | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles`  | `object`           | `{}`   | 样式覆写映射对象（Tailwind CSS 类名） |
