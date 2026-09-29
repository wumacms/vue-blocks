# Pricing 价格方案

三档标准套餐价格卡片，支持突出显示推荐方案（Popular 徽章与主强调色）。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>PricingBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <PricingBlock />
  </div>
</div>

```vue
<PricingBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { PricingBlock } from 'vue-blocks'

const customData = {
  title: '灵活定价',
  description: '按需选择，无隐藏费用',
  plans: [
    {
      name: '基础版',
      unit: '/月/人',
      showBadge: false,
      price: '¥49',
      btnLink: '#',
      btnText: '选择基础版',
      features: "✓ 消息历史1年\n✓ 10GB 文件存储\n✓ 基础集成",
      newWindow: false,
      isPrimary: false
    },
    {
      name: '商业版',
      unit: '/月/人',
      showBadge: true,
      price: '¥99',
      btnLink: '#',
      btnText: '选择商业版',
      features: "✓ 无限历史\n✓ 100GB 存储\n✓ 所有集成 + API\n✓ 高级支持",
      newWindow: false,
      isPrimary: true
    },
    {
      name: '企业版',
      unit: '',
      showBadge: false,
      price: '定制',
      btnLink: '#',
      btnText: '联系销售',
      features: "✓ 本地部署选项\n✓ 无限存储\n✓ 专属客户成功\n✓ SSO/合规",
      newWindow: false,
      isPrimary: false
    }
  ]
}
</script>

<template>
  <PricingBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { PricingBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-16 max-w-3xl mx-auto',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  grid: 'grid md:grid-cols-3 gap-8 items-stretch',
  card: 'bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col justify-between relative transition hover:shadow-lg',
  cardPrimary: 'bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border-2 border-indigo-600 dark:border-indigo-500 flex flex-col justify-between relative ring-4 ring-indigo-50 dark:ring-indigo-950/40',
  badge: 'absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wide',
  planName: 'text-xl font-bold text-gray-900 dark:text-white',
  price: 'text-4xl font-extrabold text-gray-900 dark:text-white mt-4',
  unit: 'text-sm font-normal text-gray-500 dark:text-gray-400',
  featuresList: 'mt-8 space-y-3 text-sm text-gray-600 dark:text-gray-300 flex-1 whitespace-pre-line',
  button: 'mt-8 w-full text-center py-3 px-6 rounded-full font-semibold transition border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800',
  buttonPrimary: 'mt-8 w-full text-center py-3 px-6 rounded-full font-semibold transition bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20'
}
</script>

<template>
  <PricingBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 定价区块主标题 | `灵活定价` |
| `description` | `text` | 定价说明或副标题 | `按需选择，无隐藏费用` |
| `plans` | `repeater` | 定价方案卡片列表 | `[3 项数据]` |

### `plans` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `name` | `text` | 方案名称（如“基础版”、“商业版”、“企业版”） |
| `price` | `text` | 价格金额显示（如“¥49”、“¥99”、“定制”） |
| `unit` | `text` | 计费周期单位（如“/月/人”） |
| `showBadge` | `boolean` | 是否在卡片上方展示推荐徽标 |
| `features` | `textarea` | 包含功能权益列表（换行分隔每条权益） |
| `btnText` | `text` | 购买或咨询按钮文字 |
| `btnLink` | `text` | 按钮跳转链接 |
| `isPrimary` | `boolean` | 是否为主推高亮方案（采用高亮卡片与按钮样式） |
| `newWindow` | `boolean` | 是否新窗口打开 |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 定价区块最外层 `<section>` 容器 | `py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 标题区包裹容器 | `text-center mb-16 max-w-3xl mx-auto` |
| `title` | 区块主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4` |
| `description` | 区块副标题 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-400` |
| `grid` | 价格方案卡片横向网格排列容器 | `grid md:grid-cols-3 gap-8 items-stretch` |
| `card` | 普通方案卡片外框样式 | `bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col justify-between relative transition hover:shadow-lg` |
| `cardPrimary` | 主推推荐方案卡片外框（高亮双边框、外光环 ring 与深阴影） | `bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border-2 border-indigo-600 dark:border-indigo-500 flex flex-col justify-between relative ring-4 ring-indigo-50 dark:ring-indigo-950/40` |
| `badge` | 主推卡片顶部推荐徽章药丸样式 | `absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wide` |
| `planName` | 方案名称标题样式 | `text-xl font-bold text-gray-900 dark:text-white` |
| `price` | 金额超大粗体文本样式 | `text-4xl font-extrabold text-gray-900 dark:text-white mt-4` |
| `unit` | 计费周期单位浅色小字样式 | `text-sm font-normal text-gray-500 dark:text-gray-400` |
| `featuresList` | 功能条目列表容器（多行换行排版） | `mt-8 space-y-3 text-sm text-gray-600 dark:text-gray-300 flex-1 whitespace-pre-line` |
| `button` | 普通方案订购按钮样式 | `mt-8 w-full text-center py-3 px-6 rounded-full font-semibold transition border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800` |
| `buttonPrimary` | 主推方案高亮订购按钮样式 | `mt-8 w-full text-center py-3 px-6 rounded-full font-semibold transition bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20` |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过 Slot Props 传入）：

| 插槽名 | 作用域参数 (Slot Props) | 说明 |
|---|---|---|
| `title` | `{ title }` | 价格方案区块主标题 |
| `description` | `{ description }` | 价格方案区块副标题说明 |
| `plans` | `{ plans }` | 价格卡片列表区域，支持自定义卡片内部布局、角标与购买按钮交互 |

### 插槽使用示例

```vue
<template>
  <PricingBlock>
    <!-- 1. 自定义主标题 -->
    <template #title="{ title }">
      <h2 class="text-4xl font-black text-center text-indigo-600 mb-3">{{ title }}</h2>
    </template>

    <!-- 2. 自定义副标题 -->
    <template #description="{ description }">
      <p class="text-lg text-center text-gray-500 mb-12">{{ description }}</p>
    </template>

    <!-- 3. 自定义价格方案卡片列表 -->
    <template #plans="{ plans }">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(plan, idx) in plans" :key="idx" class="p-8 rounded-2xl border bg-white dark:bg-gray-900 shadow-xl relative">
          <span v-if="plan.badge" class="absolute -top-3 right-6 px-3 py-1 bg-indigo-600 text-white text-xs rounded-full">
            {{ plan.badge }}
          </span>
          <h3 class="text-xl font-bold">{{ plan.name }}</h3>
          <p class="text-3xl font-extrabold my-4 text-indigo-600">{{ plan.price }}</p>
          <ul class="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
            <li v-for="(feat, fIdx) in plan.features" :key="fIdx">✓ {{ feat }}</li>
          </ul>
          <button class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition">
            {{ plan.btnText || '立即选择' }}
          </button>
        </div>
      </div>
    </template>
  </PricingBlock>
</template>
```

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
