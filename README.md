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
- **🎨 Tailwind CSS 4 原生驱动**：深度适配 Tailwind CSS 4 架构，零配置自适应
  `dark:` 响应式深浅色主题。
- **🧩 多变体架构（Multi-Variants）**：
  - **Hero 区块**内置 4 种风格变体：`1` (SaaS现代简约)、`2`
    (波普复古/新丑风)、`3` (暗黑分割网格)、`4` (全屏大图蒙版)。
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

```vue
<script setup lang="ts">
import { HeroBlock, FeaturesBlock } from 'vue-blocks'

// 1. 内容按需局部覆盖（未声明字段将自动沿用默认配置）
const heroData = {
  title: '下一代智能协作平台',
  description: '全链路打通工作流，提升企业沟通协同效率。'
}

// 2. 样式精准覆盖（基于 tailwind-merge 无冲突合并）
const featuresStyles = {
  root: 'py-28 bg-slate-950 text-white',
  title: 'text-5xl text-sky-400 font-black'
}
</script>

<template>
  <!-- 切换为波普复古/新丑风变体 -->
  <HeroBlock variant="2" />

  <!-- 自定义内容局部覆盖 -->
  <HeroBlock variant="1" :data="heroData" />

  <!-- 自定义样式精准覆盖 -->
  <FeaturesBlock :styles="featuresStyles" />
</template>
```

---

## 📦 22 组区块组件一览

| 分类         | 组件名称                  | 说明                                     | 变体支持           |
| ------------ | ------------------------- | ---------------------------------------- | ------------------ |
| **基础区块** | `NavbarBlock`             | 顶部导航栏（支持下拉菜单与移动端折叠）   | `1`                |
|              | `HeroBlock`               | 主视觉 Hero（核心转化入口）              | `1`, `2`, `3`, `4` |
|              | `PartnersBlock`           | 合作伙伴 / 客户 Logo 墙（悬浮高亮）      | `1`                |
|              | `FooterBlock`             | 页脚区块（品牌信息与版权声明）           | `1`                |
| **内容展示** | `FeaturesBlock`           | 特性区块（四列响应式卡片网格）           | `1`                |
|              | `TopTextBottomImageBlock` | 上文下图区块（大图看板展示）             | `1`                |
|              | `StatsBlock`              | 数据统计区块（四列大数字关键指标）       | `1`                |
|              | `LeftImageRightTextBlock` | 左图右文区块（带对勾特性列表）           | `1`                |
|              | `RightImageLeftTextBlock` | 左文右图区块（带对勾特性列表）           | `1`                |
|              | `IconWallBlock`           | 图标墙区块（六大生产力功能卡片）         | `1`                |
| **业务转化** | `PricingBlock`            | 价格方案区块（三档套餐与推荐卡片高亮）   | `1`                |
|              | `ComparisonTableBlock`    | 竞品/版本对比表格（矩阵特性对勾）        | `1`                |
|              | `CtaBlock`                | 转化号召区块（行动倡议与双操作按钮）     | `1`                |
|              | `TestimonialsBlock`       | 客户心声 / 评价区块（星级、引言、头像）  | `1`                |
|              | `FaqBlock`                | 常见问题区块（交互式折叠手风琴）         | `1`                |
|              | `ContactFormBlock`        | 联系表单区块（响应式表单与提交事件）     | `1`                |
| **列表资讯** | `ServiceListBlock`        | 服务列表区块（企业全链路服务卡片）       | `1`                |
|              | `ProductListBlock`        | 产品列表区块（矩阵产品卡片与购买动作）   | `1`                |
|              | `CourseListBlock`         | 课程列表区块（丰富教学与讲师卡片）       | `1`                |
|              | `TeamBlock`               | 核心团队区块（成员头像、职称、社交链接） | `1`                |
|              | `NewsListBlock`           | 资讯/博客列表区块（标签、日期、封面）    | `1`                |
|              | `NewsDetailBlock`         | 资讯详情区块（富文本正文排版）           | `1`                |

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

> 持续集成、GitHub Actions 与 GitHub Pages 部署说明请参阅
> [DEPLOY.md](./DEPLOY.md)。

---

## 📄 开源协议

本项目基于 [MIT License](./package.json) 开放源代码。
