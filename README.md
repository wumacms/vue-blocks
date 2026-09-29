<p align="center">
  <img src="docs/public/images/logo.png" width="128" height="128" alt="VueBlocks Logo" />
</p>

<h1 align="center">VueBlocks</h1>

<p align="center">
  基于 <b>Vue 3 + Tailwind CSS 4</b> 的现代化企业级落地页区块组件库<br>
  开箱即用 · 零配置高保真预览 · 双重智能覆盖 · 多变体支持
</p>

<p align="center">
  <a href="https://wumacms.github.io/vue-blocks/">📖 <b>在线文档 ↗</b></a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://wumacms.github.io/vue-blocks/examples/">🎮 <b>在线演示 ↗</b></a>
</p>

---

## 🌟 核心特性

- **⚡ 开箱即用（Zero-Config
  Preview）**：任何区块未传参即可直接渲染高保真图文与设计排版，极大缩短原型与交付周期。

- **🎨 Tailwind CSS 4 原生驱动**：深度适配 Tailwind CSS 4
  架构，零配置自适应`dark:` 响应式深浅色主题。

- **🧩 多变体架构（Multi-Variants）**：

  - **Hero 区块**内置 4 种风格变体：

    `1` SaaS现代简约

    `2` 波普复古风

    `3` 暗黑分割网格

    `4` 全屏大图蒙版

  - 其余 21 组区块均内置独立变体扩展协议，按需自由扩充。

- **🔄 双重智能覆盖机制**：

  - **内容覆盖 (`data`)**：传入 JSON 局部覆写默认文案、图片与列表数据。
  - **样式覆盖 (`styles`)**：传入 Tailwind 类名精准定制视觉样式，内置
    `tailwind-merge` 无类名冲突。

- **🔌 Schema 协议驱动**：每个区块附带标准化字段 Schema，无缝对接无头 CMS
  与可视化低代码构建器。

- **📦 完整 TypeScript
  支持**：提供完备的类型声明文件，现代前端工程开箱即享精准的代码补全与类型检查。

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

### 3. 使用组件

#### 基础用法（零配置直接渲染）

```html
<script setup>
  import {
    FeaturesBlock,
    FooterBlock,
    HeroBlock,
    NavbarBlock,
  } from "vue-blocks";
</script>

<template>
  <NavbarBlock />
  <HeroBlock />
  <FeaturesBlock />
  <FooterBlock />
</template>
```

#### 进阶用法（变体切换与双重覆盖）

```html
<script setup lang="ts">
  import { FeaturesBlock, HeroBlock } from "vue-blocks";

  // 1. 内容按需局部覆盖（未声明字段将自动沿用默认配置）
  const heroData = {
    title: "下一代智能协作平台",
    description: "全链路打通工作流，提升企业沟通协同效率。",
  };

  // 2. 样式精准覆盖（基于 tailwind-merge 无冲突合并）
  const featuresStyles = {
    root: "py-28 bg-slate-950 text-white",
    title: "text-5xl text-sky-400 font-black",
  };
</script>

<template>
  <!-- 切换为波普复古风变体 -->
  <HeroBlock variant="2" />

  <!-- 自定义内容局部覆盖 -->
  <HeroBlock variant="1" :data="heroData" />

  <!-- 自定义样式精准覆盖 -->
  <FeaturesBlock :styles="featuresStyles" />
</template>
```

---

## 📦 22 组区块组件一览

| 组件名称                  | 说明                    |
| ------------------------- | ----------------------- |
| `NavbarBlock`             | 顶部导航栏              |
| `HeroBlock`               | 主视觉 Hero             |
| `PartnersBlock`           | 合作伙伴 / 客户 Logo 墙 |
| `FooterBlock`             | 页脚区块                |
| `FeaturesBlock`           | 特性区块                |
| `TopTextBottomImageBlock` | 上文下图区块            |
| `StatsBlock`              | 数据统计区块            |
| `LeftImageRightTextBlock` | 左图右文区块            |
| `RightImageLeftTextBlock` | 左文右图区块            |
| `IconWallBlock`           | 图标墙区块              |
| `PricingBlock`            | 价格方案区块            |
| `ComparisonTableBlock`    | 竞品/版本对比表格       |
| `CtaBlock`                | 转化号召区块            |
| `TestimonialsBlock`       | 客户评价区块            |
| `FaqBlock`                | 常见问题区块            |
| `ContactFormBlock`        | 联系表单区块            |
| `ServiceListBlock`        | 服务列表区块            |
| `ProductListBlock`        | 产品列表区块            |
| `CourseListBlock`         | 课程列表区块            |
| `TeamBlock`               | 核心团队区块            |
| `NewsListBlock`           | 资讯列表区块            |
| `NewsDetailBlock`         | 资讯详情区块            |

---

## 🛠️ 本地开发

如果你希望在本地贡献代码或修改区块组件，请在项目根目录运行以下命令：

```bash
# 安装依赖
pnpm install

# 启动全量区块演示站点
pnpm dev

# 启动 VitePress 官方文档站点
pnpm docs:dev

# 全量编译构建（组件库 + 示例工程 + 文档站点）
pnpm build:all
```

---

## 📄 开源协议

本项目基于 [MIT License](./package.json) 开放源代码。
