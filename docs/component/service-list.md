# ServiceList 服务列表

全链路专业服务卡片列表，展示从战略咨询到落地运维的各项专业服务。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>ServiceListBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <ServiceListBlock />
  </div>
</div>

```vue
<ServiceListBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { ServiceListBlock } from 'vue-blocks'

const customData = {
  title: '我们的服务',
  description: '从咨询到落地，全链路助力企业数字化升级',
  services: [
    {
      icon: '📋',
      title: '咨询与规划',
      description: '深入了解业务需求，制定个性化企业协作解决方案，提供从战略到落地的全流程咨询。',
      points: [
        {
          text: '需求分析与调研'
        },
        {
          text: '解决方案设计'
        },
        {
          text: '实施路线图规划'
        }
      ],
      link: '#',
      newWindow: false
    },
    {
      icon: '🚀',
      title: '部署与实施',
      description: '快速部署 ChatFlow 平台，支持云端、私有云及本地部署，确保系统稳定上线运行。',
      points: [
        {
          text: '一键式云端部署'
        },
        {
          text: '私有化环境适配'
        },
        {
          text: '数据迁移与对接'
        }
      ],
      link: '#',
      newWindow: false
    },
    {
      icon: '🎓',
      title: '培训与赋能',
      description: '提供系统化的培训课程和操作指南，帮助团队快速上手，最大化产品使用价值。',
      points: [
        {
          text: '管理员培训工作坊'
        },
        {
          text: '员工使用手册'
        },
        {
          text: '在线视频教程库'
        }
      ],
      link: '#',
      newWindow: false
    },
    {
      icon: '🔧',
      title: '定制化开发',
      description: '根据业务场景定制功能模块、集成第三方系统，打造贴合企业需求的专属解决方案。',
      points: [
        {
          text: '功能定制开发'
        },
        {
          text: '第三方系统集成'
        },
        {
          text: 'API 接口开发'
        }
      ],
      link: '#',
      newWindow: false
    },
    {
      icon: '🛡️',
      title: '运维与保障',
      description: '提供 7×24 小时系统监控、定期巡检和应急响应，确保平台持续稳定运行。',
      points: [
        {
          text: '7×24 实时监控'
        },
        {
          text: '定期安全巡检'
        },
        {
          text: '故障快速响应'
        }
      ],
      link: '#',
      newWindow: false
    },
    {
      icon: '📈',
      title: '增长与优化',
      description: '通过数据分析和用户反馈，持续优化协作流程，提升团队效率和业务成果。',
      points: [
        {
          text: '使用数据分析报告'
        },
        {
          text: '流程效率优化'
        },
        {
          text: '持续迭代建议'
        }
      ],
      link: '#',
      newWindow: false
    }
  ],
  moreText: '查看全部服务',
  moreLink: '#',
  moreNewWindow: false
}
</script>

<template>
  <ServiceListBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { ServiceListBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-white dark:bg-gray-900 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-16 max-w-3xl mx-auto',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  card: 'p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300 flex flex-col',
  iconWrapper: 'w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-3xl mb-6 text-indigo-600 dark:text-indigo-400',
  serviceTitle: 'text-xl font-bold text-gray-900 dark:text-white mb-3',
  serviceDescription: 'text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6',
  pointsList: 'space-y-2 mb-6 flex-1 text-sm text-gray-600 dark:text-gray-400',
  pointItem: 'flex items-center gap-2',
  pointIcon: 'text-indigo-500 font-bold',
  link: 'text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline inline-flex items-center gap-1 mt-auto'
}
</script>

<template>
  <ServiceListBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 服务列表区块主标题 | `我们的服务` |
| `description` | `text` | 服务业务说明副标题 | `从咨询到落地，全链路助力企业数字化升级` |
| `services` | `repeater` | 服务项目列表 | `[6 项数据]` |
| `moreText` | `text` | 底部查看全部服务按钮文字 | `查看全部服务` |
| `moreLink` | `text` | 底部按钮跳转链接 | `#` |
| `moreNewWindow` | `boolean` | 底部按钮是否新窗口打开 | `false` |

### `services` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `icon` | `text` | 服务项目图标（Emoji 或 SVG 字符） |
| `title` | `text` | 服务项目名称 |
| `description` | `textarea` | 服务内容详细说明 |
| `points` | `repeater` | 服务包含的核心要点清单 |
| `link` | `text` | 服务详情页链接 |
| `linkText` | `text` | 详情链接文本 |
| `newWindow` | `boolean` | 是否新窗口打开 |

### `services.points` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `text` | `text` | 单条服务要点内容文本 |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 服务列表区块外层 `<section>` 容器 | `py-20 bg-white dark:bg-gray-900 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 标题区包裹容器 | `text-center mb-16 max-w-3xl mx-auto` |
| `title` | 区块主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4` |
| `description` | 区块副标题 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-400` |
| `grid` | 服务卡片多列网格容器 | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` |
| `card` | 单个服务卡片外框（背景、边框及 hover 浮动效果） | `p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300 flex flex-col` |
| `iconWrapper` | 服务大图标外层方形圆角徽章容器 | `w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-3xl mb-6 text-indigo-600 dark:text-indigo-400` |
| `serviceTitle` | 服务名称标题样式 | `text-xl font-bold text-gray-900 dark:text-white mb-3` |
| `serviceDescription` | 服务详细描述文字 | `text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6` |
| `pointsList` | 核心要点清单列表垂直容器 | `space-y-2 mb-6 flex-1 text-sm text-gray-600 dark:text-gray-400` |
| `pointItem` | 单条要点条目弹性对齐容器 | `flex items-center gap-2` |
| `pointIcon` | 要点前置图标样式 | `text-indigo-500 font-bold` |
| `link` | 了解详情跳转链接样式 | `text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline inline-flex items-center gap-1 mt-auto` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
