# CourseList 课程列表

在线学习与培训课程卡片列表，展示课程封面、讲师头像、课时时长、难度等级与价格。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>CourseListBlock 默认零配置预览</span>
  </div>
  <div class="block-preview-body">
    <CourseListBlock />
  </div>
</div>

```vue
<CourseListBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { CourseListBlock } from 'vue-blocks'

const customData = {
  title: '热门课程',
  description: '系统化学习路径，助力团队快速掌握协作技能',
  courses: [
    {
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: 'ChatFlow 入门指南课程封面',
      tags: [
        {
          text: '入门',
          bgColor: 'bg-indigo-600'
        }
      ],
      duration: '2.5 小时',
      chapters: '6',
      instructor: '张伟',
      title: 'ChatFlow 从入门到精通',
      description: '全面了解 ChatFlow 核心功能，快速搭建企业协作平台。',
      ratingStars: '★★★★★',
      ratingCount: '86',
      price: '¥199',
      btnText: '立即学习',
      link: '#',
      newWindow: false
    },
    {
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: '团队管理课程封面',
      tags: [
        {
          text: '进阶',
          bgColor: 'bg-emerald-500'
        },
        {
          text: '热门',
          bgColor: 'bg-orange-500'
        }
      ],
      duration: '4 小时',
      chapters: '8',
      instructor: '陈敏',
      title: '高效团队协作管理',
      description: '掌握团队沟通、任务分配与进度追踪的实战技巧。',
      ratingStars: '★★★★★',
      ratingCount: '124',
      price: '¥299',
      btnText: '立即学习',
      link: '#',
      newWindow: false
    },
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: 'AI 助手课程封面',
      tags: [
        {
          text: '高级',
          bgColor: 'bg-purple-500'
        },
        {
          text: '新品',
          bgColor: 'bg-rose-500'
        }
      ],
      duration: '3 小时',
      chapters: '5',
      instructor: '王磊',
      title: 'AI 助手实战应用',
      description: '利用 AI 自动生成会议纪要、摘要和待办事项。',
      ratingStars: '★★★★☆',
      ratingCount: '53',
      price: '¥249',
      btnText: '立即学习',
      link: '#',
      newWindow: false
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: '数据洞察课程封面',
      tags: [
        {
          text: '入门',
          bgColor: 'bg-indigo-600'
        }
      ],
      duration: '2 小时',
      chapters: '4',
      instructor: '李莉',
      title: '数据洞察与团队分析',
      description: '通过数据可视化了解团队活跃度与协作效率。',
      ratingStars: '★★★★☆',
      ratingCount: '41',
      price: '¥199',
      btnText: '立即学习',
      link: '#',
      newWindow: false
    },
    {
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: '集成中心课程封面',
      tags: [
        {
          text: '进阶',
          bgColor: 'bg-emerald-500'
        }
      ],
      duration: '3.5 小时',
      chapters: '7',
      instructor: '张伟',
      title: '集成中心与自动化工作流',
      description: '连接 200+ 应用，打造自动化协作工作流。',
      ratingStars: '★★★★★',
      ratingCount: '67',
      price: '¥349',
      btnText: '立即学习',
      link: '#',
      newWindow: false
    },
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
      imageAlt: '安全合规课程封面',
      tags: [
        {
          text: '高级',
          bgColor: 'bg-purple-500'
        }
      ],
      duration: '2.5 小时',
      chapters: '5',
      instructor: '陈敏',
      title: '企业安全合规实战',
      description: '掌握端到端加密、SSO 与数据合规最佳实践。',
      ratingStars: '★★★★☆',
      ratingCount: '38',
      price: '¥299',
      btnText: '立即学习',
      link: '#',
      newWindow: false
    }
  ],
  moreText: '查看全部课程',
  moreLink: '#',
  moreNewWindow: false
}
</script>

<template>
  <CourseListBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { CourseListBlock } from 'vue-blocks'

const customStyles = {
  root: 'py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  header: 'text-center mb-16 max-w-3xl mx-auto',
  title: 'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4',
  description: 'text-lg text-gray-600 dark:text-gray-400',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  card: 'bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition flex flex-col',
  imageWrapper: 'relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800',
  image: 'w-full h-full object-cover transition-transform duration-300 hover:scale-105',
  tagsWrapper: 'absolute top-3 left-3 flex gap-2',
  tag: 'bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full',
  cardBody: 'p-6 flex-1 flex flex-col',
  courseTitle: 'text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1',
  courseDescription: 'text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4',
  instructorWrapper: 'flex items-center gap-3 mb-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-sm',
  avatar: 'w-8 h-8 rounded-full object-cover',
  instructorName: 'font-medium text-gray-800 dark:text-gray-200',
  meta: 'flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4',
  footer: 'flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto',
  price: 'text-2xl font-black text-indigo-600 dark:text-indigo-400',
  button: 'bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition shadow-sm'
}
</script>

<template>
  <CourseListBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `title` | `text` | 课程列表区块主标题 | `热门课程` |
| `description` | `text` | 课程分类或栏目副标题 | `系统化学习路径，助力团队快速掌握协作技能` |
| `courses` | `repeater` | 课程卡片列表 | `[6 项数据]` |
| `moreText` | `text` | 底部“查看全部”按钮文字 | `查看全部课程` |
| `moreLink` | `text` | 底部按钮跳转链接 | `#` |
| `moreNewWindow` | `boolean` | 底部按钮是否新窗口打开 | `false` |

### `courses` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `title` | `text` | 课程名称 |
| `description` | `textarea` | 课程大纲与简介 |
| `image` | `image` | 课程封面图 URL |
| `imageAlt` | `text` | 封面图片说明 |
| `tag` | `text` | 课程难度或分类标签（如“进阶”、“实战”） |
| `duration` | `text` | 课时时长信息（如“8课时 · 12小时”） |
| `instructor` | `text` | 讲师姓名 |
| `instructorAvatar` | `image` | 讲师头像图片 URL |
| `rating` | `text` | 课程评分数值（如“4.9分”） |
| `link` | `text` | 课程详情页跳转链接 |
| `newWindow` | `boolean` | 是否新窗口打开 |

---

## 🎨 样式类名规范 (Styles Classes)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 课程列表区块外层 `<section>` 容器 | `py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300` |
| `container` | 内容居中容器 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `header` | 标题区包裹容器 | `text-center mb-16 max-w-3xl mx-auto` |
| `title` | 区块主标题 `<h2>` 样式 | `text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4` |
| `description` | 区块副标题 `<p>` 样式 | `text-lg text-gray-600 dark:text-gray-400` |
| `grid` | 课程卡片响应式网格容器 | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` |
| `card` | 单个课程卡片外框 | `bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition flex flex-col` |
| `imageWrapper` | 课程封面图片容器 | `relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800` |
| `image` | 封面图片样式 | `w-full h-full object-cover transition-transform duration-300 hover:scale-105` |
| `tagsWrapper` | 内部 `tagsWrapper` 元素样式 | `absolute top-3 left-3 flex gap-2` |
| `tag` | 内部 `tag` 元素样式 | `bg-indigo-600/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full` |
| `cardBody` | 课程内容文字区域包裹层 | `p-6 flex-1 flex flex-col` |
| `courseTitle` | 课程标题文本样式 | `text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1` |
| `courseDescription` | 课程简述文本样式 | `text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4` |
| `instructorWrapper` | 讲师头像与姓名弹性对齐容器 | `flex items-center gap-3 mb-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-sm` |
| `avatar` | 内部 `avatar` 元素样式 | `w-8 h-8 rounded-full object-cover` |
| `instructorName` | 讲师姓名样式 | `font-medium text-gray-800 dark:text-gray-200` |
| `meta` | 课时与时长元信息栏 | `flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4` |
| `footer` | 卡片底部讲师与评分栏 | `flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto` |
| `price` | 内部 `price` 元素样式 | `text-2xl font-black text-indigo-600 dark:text-indigo-400` |
| `button` | 内部 `button` 元素样式 | `bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition shadow-sm` |
| `badge` | 难度或分类角标样式 | - |
| `duration` | 课时时长文本样式 | - |
| `instructorAvatar` | 讲师圆形小头像样式 | - |
| `rating` | 评分文本样式 | - |
| `bottomMore` | 底部查看全部按钮包裹容器 | - |
| `moreLink` | 底部按钮样式 | - |

---

## 🧩 插槽规范 (Slots)

组件支持通过 Vue 模板插槽实现对局部结构与交互的完全自定义覆盖（作用域参数通过 Slot Props 传入）：

| 插槽名 | 作用域参数 (Slot Props) | 说明 |
|---|---|---|
| `title` | `{ title }` | 课程列表主标题 |
| `description` | `{ description }` | 课程列表副标题说明 |
| `courses` | `{ courses }` | 课程卡片列表网格，可自定义讲师标签、课时展示与报名按钮 |

### 插槽使用示例

```vue
<template>
  <CourseListBlock>
    <!-- 1. 自定义主标题 -->
    <template #title="{ title }">
      <h2 class="text-4xl font-black text-center text-gray-900 dark:text-white mb-3">{{ title }}</h2>
    </template>

    <!-- 2. 自定义副标题 -->
    <template #description="{ description }">
      <p class="text-lg text-center text-gray-500 mb-12">{{ description }}</p>
    </template>

    <!-- 3. 自定义课程卡片列表 -->
    <template #courses="{ courses }">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(c, idx) in courses" :key="idx" class="rounded-2xl border overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
          <img :src="c.cover" :alt="c.title" class="w-full h-48 object-cover" />
          <div class="p-6">
            <h3 class="font-bold text-lg mb-2">{{ c.title }}</h3>
            <p class="text-indigo-600 font-extrabold text-xl">{{ c.price }}</p>
          </div>
        </div>
      </div>
    </template>
  </CourseListBlock>
</template>
```

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
