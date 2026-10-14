# VueBlocks

基于 **Vue 3 + Tailwind CSS 4** 的现代化企业级落地页与全栈站点区块组件库。

开箱即用 · 零配置高保真预览 · OKLCH 科学色彩主题 · 4 大设计变体 · 单页与整站编排引擎 · 完整 TypeScript 支持

---

## 📦 安装

```bash
pnpm add vue-blocks
# 或
npm install vue-blocks
```

---

## 🎨 配置样式与主题

### 方式 A：项目中已启用 Tailwind CSS 4（推荐）

在项目的主 CSS 入口文件（如 `src/style.css`）中引入主题变量文件并声明组件扫描路径：

```css
@import "tailwindcss";
@import "vue-blocks/theme.css";
@source "../node_modules/vue-blocks";
```

### 方式 B：无 Tailwind 环境直接引入预编译 CSS

```js
import "vue-blocks/dist/style.css";
import "vue-blocks/theme.css";
```

---

## 🎭 4 大经典设计风格变体

组件库内置 4 套高度统一的设计语言，可通过 `variant` 属性一键切换（组件级、页面级、全站级均支持）：

| 变体代号 | 语义别名 (`alias`) | 视觉风格与设计特征 |
| :------- | :--------------------------------------------- | :------------------------------------------------------------- |
| `'1'` | `clean` / `modern` / `saas` | **SaaS 现代极简**：圆润卡片、细腻浅淡微渐变与轻量阴影 |
| `'2'` | `brutalism` / `retro` / `pop` | **波普复古新粗野主义**：4px 实体黑粗边框、纯硬阴影与拟物按压反馈 |
| `'3'` | `editorial` / `warm` / `paper` / `anthropic` | **人文科技纸质叙事**：OKLCH 暖调温润底色、古典衬线体与精致发丝边框 |
| `'4'` | `geek` / `developer` / `technical` / `code` | **工科极客技术终端**：前景色工程网格底纹、双色终端文字投影与等宽字体 |

---

## 🌈 OKLCH 动态主题与深浅色模式

基于先进的 OKLCH 科学色彩模型，组件库实现 **风格变体 × 色彩主题 × 明暗模式** 的完全正交解耦。全系组件内部无任何硬编码色值，纯净基于语义令牌（`bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground` 等）。

### 1. 预设色彩主题与任意色相角

支持以下官方主题别名，或直接传入 `0-360` 的任意色相数值：

- `'slate'` (240°) · `'blue'` (255°) · `'indigo'` (275°) · `'violet'` (295°) · `'rose'` (15°)
- `'orange'` (55°) · `'amber'` (80°) · `'emerald'` (155°) · `'teal'` (175°) · `'cyan'` (205°)

### 2. 通过编排容器直接绑定

```html
<template>
  <SiteRenderer
    :data="siteConfig"
    variant="1"
    theme="emerald"
    mode="light"
  />
</template>
```

### 3. 通过 JS 工具函数手动控制主题

```js
import { applyTheme } from "vue-blocks";

// 切换为紫罗兰深色主题
applyTheme({ theme: 'violet', mode: 'dark' });

// 切换为自定义色相 (310°) 浅色主题
applyTheme({ customHue: 310, mode: 'light' });
```

---

## 🚀 快速上手

### 1. 单个区块零配置即用

```html
<script setup>
import { NavbarBlock, HeroBlock, FeaturesBlock, PricingBlock, FooterBlock } from "vue-blocks";

const featuresData = {
  title: '企业级核心特性',
  subtitle: '全链路打通工作流，提升数字化交付效率。'
};
</script>

<template>
  <!-- 零配置默认渲染 (现代简约风格) -->
  <NavbarBlock />

  <!-- 指定变体切换 (全系统一 variant='2' 波普复古/新粗野主义风格) -->
  <HeroBlock variant="2" />

  <!-- 自定义内容覆盖 -->
  <FeaturesBlock variant="2" :data="featuresData" />

  <PricingBlock variant="2" />
  <FooterBlock variant="2" />
</template>
```

### 2. 单页面编排（`PageRenderer`）

传入页面区块列表 JSON，内置 HTML5 `<main>` 语义化标准与响应式 SEO 动态同步：

```html
<script setup>
import { PageRenderer } from "vue-blocks";

const pageData = {
  seo: { title: "企业级协作平台 - 落地页" },
  blocks: [
    { type: "hero", data: { title: "重新定义团队协作" } },
    { type: "features" },
    { type: "pricing" },
    { type: "faq" }
  ]
};
</script>

<template>
  <PageRenderer :data="pageData" variant="1" theme="indigo" mode="auto" />
</template>
```

### 3. 多页面全站编排（`SiteRenderer`）

传入整站配置 JSON，内置客户端路由调度（`hash` / `history` / `memory`）、菜单联动与公共头尾管理：

```html
<script setup>
import { SiteRenderer } from "vue-blocks";
import siteData from "./site.json";
</script>

<template>
  <SiteRenderer :data="siteData" route-mode="hash" variant="1" theme="emerald" />
</template>
```

---

## 🧩 22 款企业级区块组件

| 分类 | 组件名 | 说明 |
| :--- | :----- | :--- |
| **基础骨架** | `NavbarBlock` / `FooterBlock` | 顶部导航栏（支持下拉菜单与移动端抽屉）/ 全站页脚 |
| **首屏视觉** | `HeroBlock` | 主视觉首屏（大标题、操作按钮组与视觉插图） |
| **品牌背书** | `PartnersBlock` / `StatsBlock` | 合作伙伴 Logo 墙 / 核心里程碑数字统计 |
| **特性与服务** | `FeaturesBlock` / `ServiceListBlock` / `IconWallBlock` | 特性卡片墙 / 专业服务列表 / 核心能力图标矩阵 |
| **图文排版** | `TopTextBottomImageBlock` / `LeftImageRightTextBlock` / `RightImageLeftTextBlock` | 上文下图 / 左图右文 / 右图左文图文混排区块 |
| **商业展示** | `ProductListBlock` / `CourseListBlock` / `PricingBlock` / `ComparisonTableBlock` | 产品展示列表 / 课程培训列表 / 商业阶梯定价 / 功能对比表格 |
| **资讯动态** | `NewsListBlock` / `NewsDetailBlock` | 新闻资讯列表（分类筛选与分页）/ 富文本新闻详情 |
| **口碑团队** | `TestimonialsBlock` / `TeamBlock` | 客户口碑评价墙 / 核心团队介绍 |
| **转化互动** | `CtaBlock` / `ContactFormBlock` / `FaqBlock` | 行动呼吁横幅 / 咨询留资表单 / 折叠展开常见问题 |

---

## 📄 开源协议

本项目基于 [MIT License](./package.json) 开放源代码。
