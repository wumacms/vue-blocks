# Navbar 导航栏

顶部固定吸顶导航栏，支持品牌 Logo、多级下拉菜单、CTA 转化按钮与移动端汉堡菜单折叠。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件自动使用内置的高保真默认数据与样式渲染：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>NavbarBlock 默认零配置预览 (鼠标悬停菜单项可展开二级菜单)</span>
  </div>
  <div class="block-preview-body block-preview-body-navbar bg-gradient-to-b from-transparent to-gray-50/60 dark:to-gray-900/60">
    <NavbarBlock />
    <div class="py-16 text-center text-xs text-gray-400 dark:text-gray-500">
      页面内容占位区域（悬停上方「产品」或「解决方案」即可向下展开二级菜单）
    </div>
  </div>
</div>

```vue
<NavbarBlock />
```

---

## 💻 代码示例

### 1. 内容覆写 (`data`)

在 `<script setup lang="ts">` 中定义自定义数据对象，通过 `:data` 属性传入。未声明的字段将自动继承默认配置：

```vue
<script setup lang="ts">
import { NavbarBlock } from 'vue-blocks'

const customData = {
  logo: 'https://placehold.co/32x32/4F46E5/white?text=Logo',
  brandName: 'ChatFlow',
  navLinks: [
    {
      text: '产品',
      link: '#',
      children: [
        {
          text: '即时通讯',
          link: '#',
          icon: '💬'
        },
        {
          text: '视频会议',
          link: '#',
          icon: '📹'
        },
        {
          text: 'AI 助手',
          link: '#',
          icon: '🤖'
        },
        {
          text: '数据洞察',
          link: '#',
          icon: '📊'
        }
      ]
    },
    {
      text: '解决方案',
      link: '#',
      children: [
        {
          text: '大型企业',
          link: '#',
          icon: '🏢'
        },
        {
          text: '初创团队',
          link: '#',
          icon: '🚀'
        },
        {
          text: '电商零售',
          link: '#',
          icon: '🛒'
        },
        {
          text: '医疗健康',
          link: '#',
          icon: '⚕️'
        }
      ]
    },
    {
      text: '资源',
      link: '#',
      children: [
        {
          text: '帮助文档',
          link: '#',
          icon: '📚'
        },
        {
          text: '开发者教程',
          link: '#',
          icon: '🎓'
        },
        {
          text: '最佳实践',
          link: '#',
          icon: '💡'
        },
        {
          text: '社区论坛',
          link: '#',
          icon: '🌐'
        }
      ]
    },
    {
      text: '价格',
      link: '#',
      newWindow: false,
      children: []
    }
  ],
  buttons: [
    {
      text: '开始免费试用',
      link: '#',
      isPrimary: true,
      newWindow: false
    }
  ]
}
</script>

<template>
  <NavbarBlock :data="customData" />
</template>
```

### 2. 样式覆写 (`styles`)

在 `<script setup lang="ts">` 中定义样式覆写映射，通过 `:styles` 属性传入。内置 `tailwind-merge` 实现无冲突安全合并：

```vue
<script setup lang="ts">
import { NavbarBlock } from 'vue-blocks'

const customStyles = {
  root: 'border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  navWrapper: 'flex items-center justify-between h-16 md:h-20',
  brandWrapper: 'flex items-center gap-3 shrink-0 cursor-pointer',
  logo: 'h-8 w-auto rounded-lg shadow-sm',
  brandName: 'text-xl font-semibold text-gray-800 dark:text-white tracking-tight',
  menuNav: 'hidden md:flex items-center space-x-1 lg:space-x-2',
  menuItem: 'px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800',
  dropdownTrigger: 'flex items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800',
  dropdownMenu: 'absolute left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 py-2',
  dropdownItem: 'flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition',
  actionsWrapper: 'flex items-center gap-3',
  ctaButton: 'hidden sm:inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors shadow-sm',
  mobileToggle: 'md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
  mobileMenu: 'md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-2 pb-6 space-y-2'
}
</script>

<template>
  <NavbarBlock :styles="customStyles" />
</template>
```

---

## 📋 数据字段规范 (Data Schema)

该组件对应的数据协议结构如下，支持全量字段定制：

### 基础字段

| 字段名 | 类型 | 说明 | 默认值 |
|---|---|---|---|
| `logo` | `image` | 导航栏 Logo 图片 URL（建议高度 32px，宽度自适应） | `https://placehold.co/32x32/4F46E5/white?text=Logo` |
| `brandName` | `text` | 品牌或网站名称文本 | `ChatFlow` |
| `navLinks` | `repeater` | 顶部导航菜单列表（支持二级下拉子菜单） | `[4 项数据]` |
| `buttons` | `repeater` | 导航右侧操作按钮列表（如登录、免费试用等） | `[1 项数据]` |

### `navLinks` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `text` | `text` | 菜单项显示名称 |
| `link` | `text` | 跳转链接地址（无二级菜单时生效） |
| `newWindow` | `boolean` | 是否在新标签页打开（无二级菜单时生效） |
| `children` | `repeater` | 二级下拉子菜单项列表（留空表示普通单层链接） |

### `navLinks.children` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `text` | `text` | 二级菜单项文字 |
| `link` | `text` | 二级菜单跳转链接 |
| `icon` | `text` | 二级菜单前置图标（支持 Emoji 或文字符号） |
| `newWindow` | `boolean` | 是否在新标签页打开 |

### `buttons` 列表项字段说明

| 字段名 | 类型 | 说明 |
|---|---|---|
| `text` | `text` | 按钮显示文字 |
| `link` | `text` | 按钮跳转链接 |
| `isPrimary` | `boolean` | 是否为主行动按钮（主色调实色高亮） |
| `newWindow` | `boolean` | 是否在新标签页打开 |

---

## 🎨 样式字段规范 (Styles Slots)

组件支持通过 `:styles` 属性针对每个内部 DOM 节点进行原子类定制，默认样式类名及说明如下：

| 样式字段名 | 作用元素 / 解释说明 | 默认 Tailwind CSS 类名 |
|---|---|---|
| `root` | 导航栏最外层 `<header>` / `<section>` 根容器，控制吸顶悬浮、背景模糊与底边框 | `border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300` |
| `container` | 导航栏内容居中容器，限制最大宽度并提供水平安全内边距 | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| `navWrapper` | 导航栏主体弹性盒布局，负责品牌区、菜单区与按钮区的对齐分布 | `flex items-center justify-between h-16 md:h-20` |
| `brandWrapper` | 品牌 Logo 与名称的外层包裹容器 | `flex items-center gap-3 shrink-0 cursor-pointer` |
| `logo` | Logo 图片元素样式（高度、圆角等） | `h-8 w-auto rounded-lg shadow-sm` |
| `brandName` | 品牌名称文本样式（字号、字重、颜色） | `text-xl font-semibold text-gray-800 dark:text-white tracking-tight` |
| `menuNav` | 桌面端导航菜单 `<nav>` 容器 | `hidden md:flex items-center space-x-1 lg:space-x-2` |
| `menuItem` | 一级导航菜单项包裹容器 | `px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800` |
| `dropdownTrigger` | 一级带下拉菜单项的触发按钮样式 | `flex items-center gap-1 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800` |
| `dropdownMenu` | 二级下拉菜单浮层容器（圆角、阴影、层级与悬浮展开过渡） | `absolute left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 py-2` |
| `dropdownItem` | 二级下拉菜单项单行链接样式 | `flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition` |
| `actionsWrapper` | 导航右侧按钮组包裹容器 | `flex items-center gap-3` |
| `ctaButton` | 行动号召主按钮样式（背景色、悬停过渡、圆角） | `hidden sm:inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-full transition-colors shadow-sm` |
| `mobileToggle` | 移动端汉堡折叠菜单切换按钮 | `md:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800` |
| `mobileMenu` | 移动端展开菜单面板 | `md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-2 pb-6 space-y-2` |

---

## 🧩 基础属性 (Props)

| 参数名 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `variant` | `string \| number` | `'1'` | 变体类型 |
| `data` | `object` | `{}` | 内容覆盖 JSON，按 Schema 结构深层合并 |
| `styles` | `object` | `{}` | 样式覆写映射对象（Tailwind CSS 类名） |
