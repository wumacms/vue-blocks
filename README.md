<p align="center">
  <img src="docs/public/images/logo.png" width="128" height="128" alt="VueBlocks Logo" />
</p>

<h1 align="center">VueBlocks</h1>

<p align="center">
  基于 <b>Vue 3 + Tailwind CSS 4</b> 的现代化企业级落地页与全栈站点组件库<br>
  原子区块 · 单页编排 · 站点路由 · 一键全局换皮 · 响应式 SEO
</p>

<p align="center">
  <a href="https://wumacms.github.io/vue-blocks/">📖 <b>在线文档 ↗</b></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://wumacms.github.io/vue-blocks/examples/">🎮 <b>在线演示 ↗</b></a>
</p>

---

## 🌟 核心特性

- **🌐 多页面站点编排（`SiteRenderer`）**：
  最高层级全站编排容器，传入一份全站 JSON 数据即可根据导航菜单路由无缝调度渲染对应页面。内置客户端无刷新路由拦截（支持 `Hash` / `History` / `Memory` 模式）、菜单高亮自动联动、持久化导航与 404 兜底。

- **🚀 单页面数据驱动（`PageRenderer`）**：
  单页面编排引擎，严格遵循 HTML5 `<main>` 语义化标准与无障碍规范，内置响应式动态 SEO 同步系统（`Title` / `Description` / `Meta` 自动更新与卸载清理）。

- **🎨 统一变体模式（极简全局换皮）**：
  支持在站点组件或页面组件顶层传入统一的 `variant` 参数，一键控制全站所有区块统一切换至指定设计风格（未声明该变体的区块自动优雅降级，保障视觉统一）。

- **⚡ 开箱即用（Zero-Config Preview）**：
  任何区块组件及渲染器未传参即可直接渲染高保真图文与设计排版，极大缩短原型与交付周期。

- **🎨 Tailwind CSS 4 原生驱动**：
  深度适配 Tailwind CSS 4 架构，零配置自适应 `dark:` 响应式深浅色主题。

- **🔄 双重智能覆盖机制**：
  - **内容覆盖 (`data`)**：传入 JSON 局部覆写默认文案、图片与列表数据。
  - **样式覆盖 (`styles`)**：传入 Tailwind 类名精准定制视觉样式，内置 `tailwind-merge` 无类名冲突。

- **🔌 Schema 协议驱动**：每个区块附带标准化字段 Schema，无缝对接无头 CMS 与可视化低代码构建器。

- **📦 完整 TypeScript 支持**：提供完备的类型声明文件，现代前端工程开箱即享精准的代码补全与类型检查。

---

## 🚀 快速上手

### 1. 安装组件库

```bash
pnpm add vue-blocks
# 或
npm install vue-blocks
```

### 2. 引入样式

#### 方式 A：项目中已启用 Tailwind CSS 4（推荐）

在主样式文件中加入组件扫描路径，Tailwind 即可自动编译对应类名：

```css
@import "tailwindcss";
@source "../node_modules/vue-blocks";
```

#### 方式 B：无 Tailwind 环境直接引入预编译 CSS

```js
import "vue-blocks/dist/style.css";
```

### 3. 使用姿态

#### 场景 1：多页面全站渲染（极简单 JSON 驱动整站）

通过 `SiteRenderer` 一键渲染包含路由导航跳转、公共头尾持久化的完整企业多页面网站：

```html
<script setup>
  import { SiteRenderer } from "vue-blocks";
  import siteConfig from "./site.json"; // 全站配置 JSON
</script>

<template>
  <!-- 支持 hash 路由模式零配置静态托管 -->
  <SiteRenderer :data="siteConfig" route-mode="hash" />
</template>
```

#### 场景 2：单页面落地页渲染（PageRenderer）

仅需一份页面区块列表配置，快速生成高转化单页落地页：

```html
<script setup>
  import { PageRenderer } from "vue-blocks";

  const pageData = {
    seo: { title: "企业协作平台 - 落地页" },
    blocks: [
      { type: "HeroBlock", variant: "1" },
      { type: "FeaturesBlock", variant: "1" },
      { type: "PricingBlock", variant: "1" },
      { type: "ContactFormBlock" }
    ]
  };
</script>

<template>
  <PageRenderer :data="pageData" />
</template>
```

#### 场景 3：一键切换全站风格（统一变体）

```html
<script setup>
  import { ref } from "vue";
  import { SiteRenderer } from "vue-blocks";

  const currentVariant = ref("2"); // 1 | 2 | 3 | 4
</script>

<template>
  <!-- 切换变体，全站区块实时联动换皮 -->
  <SiteRenderer :variant="currentVariant" />
</template>
```

#### 场景 4：手动组装原子区块

```html
<script setup lang="ts">
  import {
    NavbarBlock,
    HeroBlock,
    FeaturesBlock,
    FooterBlock
  } from "vue-blocks";

  // 1. 内容按需局部覆盖
  const heroData = {
    title: "下一代智能协作平台",
    description: "全链路打通工作流，提升企业沟通协同效率。"
  };

  // 2. 样式精准覆盖（基于 tailwind-merge 无冲突合并）
  const featuresStyles = {
    root: "py-28 bg-slate-950 text-white",
    title: "text-5xl text-sky-400 font-black"
  };
</script>

<template>
  <NavbarBlock />
  <HeroBlock variant="2" :data="heroData" />
  <FeaturesBlock :styles="featuresStyles" />
  <FooterBlock />
</template>
```

---

## 📦 组件清单一览

### 1. 页面与站点编排组件

| 组件名称 | 说明 | 适用场景 |
| :--- | :--- | :--- |
| `SiteRenderer` | **全站多页面渲染器** | 完整企业官网、产品矩阵站、包含导航路由的轻量 CMS 全栈站点 |
| `PageRenderer` | **单页面落地页渲染器** | 营销活动页、单页落地页、语义化 `<main>` 正文区数据驱动 |

### 2. 标准落地页区块（22 组）

| 组件名称 | 说明 |
| :--- | :--- |
| `NavbarBlock` | 顶部导航栏（支持下拉菜单、移动端折叠、激活态自动高亮） |
| `HeroBlock` | 主视觉 Hero（内置 4 种风格变体：SaaS极简、波普复古、暗黑网格、大图全屏） |
| `PartnersBlock` | 合作伙伴 / 客户 Logo 墙 |
| `FooterBlock` | 页脚区块 |
| `FeaturesBlock` | 特性列表区块 |
| `TopTextBottomImageBlock` | 上文下图区块 |
| `StatsBlock` | 数据统计区块 |
| `LeftImageRightTextBlock` | 左图右文区块 |
| `RightImageLeftTextBlock` | 左文右图区块 |
| `IconWallBlock` | 图标墙区块 |
| `PricingBlock` | 价格方案区块 |
| `ComparisonTableBlock` | 竞品/版本对比表格 |
| `CtaBlock` | 转化号召区块 |
| `TestimonialsBlock` | 客户评价区块 |
| `FaqBlock` | 常见问题区块（手风琴） |
| `ContactFormBlock` | 联系表单区块 |
| `ServiceListBlock` | 服务列表区块 |
| `ProductListBlock` | 产品列表区块 |
| `CourseListBlock` | 课程列表区块 |
| `TeamBlock` | 核心团队区块 |
| `NewsListBlock` | 资讯列表区块 |
| `NewsDetailBlock` | 资讯详情区块 |

---

## 🛠️ 本地开发

如果你希望在本地贡献代码或修改区块组件，请在项目根目录运行以下命令：

```bash
# 安装依赖
pnpm install

# 启动全量区块与全站演示站点
pnpm dev

# 启动 VitePress 官方文档站点
pnpm docs:dev

# 全量编译构建（组件库 + 示例工程 + 文档站点）
pnpm build:all

# 构建用于 GitHub Pages 部署的产物
pnpm build:pages
```

---

## 📄 开源协议

本项目基于 [MIT License](./package.json) 开放源代码。
