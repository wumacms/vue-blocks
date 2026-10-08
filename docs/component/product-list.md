# ProductList 产品列表

产品矩阵卡片列表，展示多款产品特色、价格区间与购买操作按钮。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<BlockPreview name="ProductListBlock" title="ProductListBlock 组件预览" />

```vue
<ProductListBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data`
属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { ProductListBlock } from 'vue-blocks'

const customData = {
  title: '我们的产品',
  description: '为企业打造的智能协作工具矩阵',
  products: [
    {
      image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: '即时通讯产品界面截图',
      title: '即时通讯',
      description: '企业级实时消息系统，支持群聊、私聊、富媒体分享，消息历史永久保存。',
      tags: [
        {
          text: '端到端加密'
        },
        {
          text: '已读回执'
        },
        {
          text: '多端同步'
        }
      ],
      link: '#',
      newWindow: false,
      badge: '热门',
      badgeColor: 'bg-indigo-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: '视频会议产品界面截图',
      title: '视频会议',
      description: '高清音视频通话，支持屏幕共享、录制、虚拟背景，最多容纳500人同时在线。',
      tags: [
        {
          text: '1080p'
        },
        {
          text: 'AI 降噪'
        },
        {
          text: '实时字幕'
        }
      ],
      link: '#',
      newWindow: false,
      badge: '',
      badgeColor: 'bg-indigo-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: 'AI智能助手产品界面截图',
      title: 'AI 智能助手',
      description: '基于大语言模型，自动生成会议纪要、消息摘要、待办事项，提升团队效率。',
      tags: [
        {
          text: '智能摘要'
        },
        {
          text: '多语言'
        },
        {
          text: 'API 开放'
        }
      ],
      link: '#',
      newWindow: false,
      badge: '新品',
      badgeColor: 'bg-emerald-500'
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: '数据洞察产品界面截图',
      title: '数据洞察',
      description: '实时团队活跃度分析、响应时间监控、消息量统计，数据可视化助力决策。',
      tags: [
        {
          text: '实时仪表盘'
        },
        {
          text: '导出报表'
        },
        {
          text: 'API 集成'
        }
      ],
      link: '#',
      newWindow: false,
      badge: '',
      badgeColor: 'bg-indigo-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: '集成中心产品界面截图',
      title: '集成中心',
      description: '连接 200+ 企业应用（Jira、GitLab、Salesforce 等），打造统一工作平台。',
      tags: [
        {
          text: '200+ 连接器'
        },
        {
          text: '自定义机器人'
        },
        {
          text: 'Webhook'
        }
      ],
      link: '#',
      newWindow: false,
      badge: '',
      badgeColor: 'bg-indigo-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: '安全合规产品界面截图',
      title: '安全合规',
      description: '端到端加密、SSO 单点登录、DLP 策略、审计日志，满足企业安全合规需求。',
      tags: [
        {
          text: '端到端加密'
        },
        {
          text: 'SSO'
        },
        {
          text: '审计日志'
        }
      ],
      link: '#',
      newWindow: false,
      badge: '',
      badgeColor: 'bg-indigo-600'
    }
  ]
}
</script>

<template>
  <ProductListBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置
`tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { ProductListBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-16 max-w-3xl mx-auto',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  card: 'bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition flex flex-col',
  imageWrapper: 'relative aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-800',
  image: 'w-full h-full object-cover transition-transform duration-300 hover:scale-105',
  tag: 'absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm',
  cardBody: 'p-6 flex-1 flex flex-col',
  productTitle: 'text-xl font-bold text-gray-900 dark:text-white mb-2',
  productDescription: 'text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1',
  footer: 'flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto',
  priceWrapper: 'flex items-baseline gap-2',
  price: 'text-2xl font-black text-gray-900 dark:text-white',
  originalPrice: 'text-sm text-gray-400 line-through',
  button: 'bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-full transition shadow-sm'
}
</script>

<template>
  <ProductListBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名        | 类型       | 说明               | 默认值                         |
| ------------- | ---------- | ------------------ | ------------------------------ |
| `title`       | `text`     | 产品列表区块主标题 | `我们的产品`                   |
| `description` | `text`     | 产品列表副标题     | `为企业打造的智能协作工具矩阵` |
| `products`    | `repeater` | 产品条目卡片列表   | `[6 项数据]`                   |

### `products` 列表项字段说明

| 字段名          | 类型       | 说明                                     |
| --------------- | ---------- | ---------------------------------------- |
| `title`         | `text`     | 产品名称                                 |
| `description`   | `textarea` | 产品核心功能与特点简述                   |
| `image`         | `image`    | 产品展示图或图标 URL                     |
| `imageAlt`      | `text`     | 展示图说明                               |
| `tag`           | `text`     | 产品特色或状态标签（如“热门”、“企业版”） |
| `price`         | `text`     | 产品售价（如“¥299”）                     |
| `originalPrice` | `text`     | 产品划线原价（如“¥399”）                 |
| `btnText`       | `text`     | 购买或了解详情按钮文字                   |
| `btnLink`       | `text`     | 按钮跳转链接                             |
| `newWindow`     | `boolean`  | 是否新窗口打开                           |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM
节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名           | 作用元素 / 解释说明               | 默认 Tailwind CSS 类名                                                                                                                                                 |
| -------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`               | 产品列表区块外层 `<section>` 容器 | `py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300`                                                                                                     |
| `container`          | 内容居中容器                      | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`                                                                                                                               |
| `header`             | 标题区包裹容器                    | `text-center mb-16 max-w-3xl mx-auto`                                                                                                                                  |
| `title`              | 区块主标题 `<h2>` 样式            | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4`                                                                                                    |
| `description`        | 区块副标题 `<p>` 样式             | `text-lg text-gray-600 dark:text-gray-400`                                                                                                                             |
| `grid`               | 产品卡片多列网格容器              | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`                                                                                                                 |
| `card`               | 单个产品卡片外框                  | `bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition flex flex-col`                 |
| `imageWrapper`       | 产品图片裁剪与展示容器            | `relative aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-800`                                                                                                     |
| `image`              | 产品图片样式（带 hover 缩放）     | `w-full h-full object-cover transition-transform duration-300 hover:scale-105`                                                                                         |
| `tag`                | 左上角浮动特色标签样式            | `absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm` |
| `cardBody`           | 产品内容区域包裹层                | `p-6 flex-1 flex flex-col`                                                                                                                                             |
| `productTitle`       | 产品标题文本样式                  | `text-xl font-bold text-gray-900 dark:text-white mb-2`                                                                                                                 |
| `productDescription` | 产品说明简述文字                  | `text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1`                                                                                                    |
| `footer`             | 价格与操作按钮底部栏              | `flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto`                                                                         |
| `priceWrapper`       | 价格区域包裹容器                  | `flex items-baseline gap-2`                                                                                                                                            |
| `price`              | 现价特大醒目文本样式              | `text-2xl font-black text-gray-900 dark:text-white`                                                                                                                    |
| `originalPrice`      | 原价划线浅色小字样式              | `text-sm text-gray-400 line-through`                                                                                                                                   |
| `button`             | 产品操作/购买按钮样式             | `bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-full transition shadow-sm`                                                         |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过
Slot Props 传入）：

| 插槽名        | 作用域参数 (Slot Props) | 说明                                                         |
| ------------- | ----------------------- | ------------------------------------------------------------ |
| `title`       | `{ title }`             | 产品中心区块主标题                                           |
| `description` | `{ description }`       | 产品中心区块副标题描述                                       |
| `products`    | `{ products }`          | 产品卡片网格列表，可自定义购物车按钮、价格标签或快速预览弹窗 |

### 插槽使用示例

```vue
<template>
  <ProductListBlock>
    <!-- 1. 自定义主标题 -->
    <template #title="{ title }">
      <h2 class="text-4xl font-black text-center mb-3">{{ title }}</h2>
    </template>

    <!-- 2. 自定义副标题 -->
    <template #description="{ description }">
      <p class="text-lg text-center text-gray-500 mb-12">{{ description }}</p>
    </template>

    <!-- 3. 自定义产品卡片列表 -->
    <template #products="{ products }">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(prod, idx) in products" :key="idx" class="rounded-2xl border p-5 shadow-lg bg-white dark:bg-gray-800">
          <img :src="prod.image" :alt="prod.name" class="w-full h-52 object-cover rounded-xl mb-4" />
          <h3 class="font-bold text-lg mb-1">{{ prod.name }}</h3>
          <p class="text-indigo-600 font-extrabold text-xl">{{ prod.price }}</p>
        </div>
      </div>
    </template>
  </ProductListBlock>
</template>
```

## 🧩 基础属性 (Props)

| 参数名    | 类型               | 默认值 | 说明                                  |
| --------- | ------------------ | ------ | ------------------------------------- |
| `variant` | `string \| number` | `'1'`  | 变体类型                              |
| `data`    | `object`           | `{}`   | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles`  | `object`           | `{}`   | 样式覆写映射对象（Tailwind CSS 类名） |
