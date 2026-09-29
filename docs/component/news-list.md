# NewsList 资讯列表

三列响应式资讯动态卡片，包含分类胶囊标签、发布时间、摘要与阅读全文链接。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>NewsListBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <NewsListBlock />
  </div>
</div>

```vue
<NewsListBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { NewsListBlock } from 'vue-blocks'

const customData = {
  title: '最新动态',
  description: '产品更新 · 行业洞察 · 客户故事',
  news: [
    {
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=40',
      imageAlt: '团队在会议室使用AI助手进行协作',
      category: '产品更新',
      date: '2026-08-20',
      title: '全新AI助手正式上线，支持智能摘要',
      summary: '通过大语言模型自动生成会议纪要、消息摘要，帮助团队快速对齐信息，减少沟通成本。',
      link: '#',
      newWindow: false
    },
    {
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=40',
      imageAlt: '科技趋势分析图表与笔记本电脑',
      category: '行业洞察',
      date: '2026-08-18',
      title: '2026年企业协作趋势：AI原生与安全合规',
      summary: '报告显示，超过70%的企业计划在明年引入AI驱动的协作工具，同时数据主权成为决策关键。',
      link: '#',
      newWindow: false
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=40',
      imageAlt: '零售团队在办公区交流协作',
      category: '客户故事',
      date: '2026-08-15',
      title: '某全球零售品牌借助ChatFlow提升跨部门效率',
      summary: '通过集成库存系统与即时通讯，该品牌将补货响应时间缩短了40%，团队协作更加透明。',
      link: '#',
      newWindow: false
    }
  ],
  moreText: '查看全部新闻',
  moreLink: '#',
  moreNewWindow: false
}
</script>

<template>
  <NewsListBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { NewsListBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-16 max-w-3xl mx-auto',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  card: 'bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition flex flex-col',
  imageWrapper: 'relative aspect-video overflow-hidden',
  image: 'w-full h-full object-cover transition-transform duration-300 hover:scale-105',
  cardBody: 'p-6 flex-1 flex flex-col',
  meta: 'flex items-center gap-2 mb-3 text-xs',
  category: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold px-2.5 py-1 rounded-full',
  date: 'text-gray-400',
  newsTitle: 'text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition mb-2 line-clamp-2',
  summary: 'text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1',
  moreLink: 'text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline inline-flex items-center gap-1',
  bottomMore: 'text-center mt-12'
}
</script>

<template>
  <NewsListBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 新闻列表区块主标题 | `最新动态` |
| `description` | `text` | 副标题或栏目说明 | `产品更新 · 行业洞察 · 客户故事` |
| `news` | `repeater` | 新闻文章卡片列表 | `[3 项数据]` |
| `moreText` | `text` | 底部“查看全部”按钮文字 | `查看全部新闻` |
| `moreLink` | `text` | 底部按钮跳转链接 | `#` |
| `moreNewWindow` | `boolean` | 底部按钮是否新窗口打开 | `false` |

### `news` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `image` | `image` | 文章封面缩略图 URL |
| `imageAlt` | `text` | 封面图片替代文本 |
| `category` | `text` | 文章分类标签（如“产品更新”） |
| `date` | `text` | 发布日期文本（如“2026-08-20”） |
| `title` | `text` | 文章标题 |
| `summary` | `textarea` | 文章简短摘要导读 |
| `moreLink` | `text` | 跳转链接地址 |
| `newWindow` | `boolean` | 是否新窗口打开 |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 新闻列表区块外层 `<section>` 容器 | `py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 标题区包裹容器 | `text-center mb-16 max-w-3xl mx-auto` |
| `title` | 区块主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4` |
| `description` | 区块副标题 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-400` |
| `grid` | 新闻卡片响应式多列网格容器 | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` |
| `card` | 单个新闻卡片外框（背景、圆角、边框及悬停卡片阴影） | `bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition flex flex-col` |
| `imageWrapper` | 封面图片外层裁剪容器 | `relative aspect-video overflow-hidden` |
| `image` | 封面图片元素样式（带 hover 缩放动画） | `w-full h-full object-cover transition-transform duration-300 hover:scale-105` |
| `cardBody` | 卡片文字内容区域包裹层 | `p-6 flex-1 flex flex-col` |
| `meta` | 分类与日期元数据行容器 | `flex items-center gap-2 mb-3 text-xs` |
| `category` | 分类药丸小徽章样式 | `bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-semibold px-2.5 py-1 rounded-full` |
| `date` | 发布日期浅色文字样式 | `text-gray-400` |
| `newsTitle` | 文章标题样式（粗体、两行截断或完整显示） | `text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition mb-2 line-clamp-2` |
| `summary` | 摘要正文文字样式 | `text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1` |
| `moreLink` | 阅读全文行动链接样式 | `text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline inline-flex items-center gap-1` |
| `bottomMore` | 底部“查看更多”按钮外层容器 | `text-center mt-12` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
