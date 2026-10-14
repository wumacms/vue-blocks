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

- **🎨 OKLCH 4 层动态主题体系（变体 × 色相 × 模式三维解耦）**：
  基于先进 OKLCH 科学感知均匀色彩模型，实现 **4 种风格变体 × 10+ 款色相主题 × 明暗模式** 的完全正交解耦。全系组件内部 **零硬编码色值**，支持传入预设别名（如 `'emerald'`、`'violet'`、`'rose'`、`'amber'`）或 0-360 任意自定义色相数值角，在任何模式下均保持完美文字对比度与视觉张力。

- **🎭 4 大经典设计变体（全系一键换皮）**：
  - **`variant="1"` (`clean` / `modern`)**：SaaS 现代极简风格（圆润卡片、细腻浅淡微渐变与轻量阴影）。
  - **`variant="2"` (`brutalism` / `retro` / `pop`)**：波普复古新粗野主义风格（4px 实体黑粗边框、纯硬阴影 `shadow-[6px_6px_0_var(--color-foreground)]` 与拟物按压反馈）。
  - **`variant="3"` (`editorial` / `warm` / `paper`)**：人文科技暖调纸质叙事风格（OKLCH 天然温润纸质微色度底色、大号古典衬线体标题 `font-serif` 与精致发丝边框）。
  - **`variant="4"` (`geek` / `developer` / `technical`)**：工科极客技术终端风格（自适应前景色工程网格底纹、双色动态终端文字投影与大写等宽字体）。

- **🧩 单模板直出与 DOM 恒定架构**：
  底层采用「纯配置样式驱动 + 单模板直出」架构，风格变体切换仅动态匹配原子样式表，DOM 结构恒定一致。彻底消除了多模板割裂，保证自定义插槽（Slots）在任意风格变体下均能 100% 稳定透传与渲染。

- **⚡ 开箱即用（Zero-Config Preview）**：
  任何区块组件及渲染器未传参即可直接渲染高保真图文与设计排版，极大缩短原型与交付周期。

- **🎨 Tailwind CSS 4 原生驱动**：
  深度适配 Tailwind CSS 4 `@theme inline` 语义令牌架构，零配置自适应 `dark:` 响应式深浅色主题。

- **🔄 三重智能定制机制**：
  - **内容覆盖 (`data`)**：传入 JSON 局部覆写默认文案、图片与列表数据。
  - **样式覆盖 (`styles`)**：传入 Tailwind 类名精准定制视觉样式，内置 `tailwind-merge` 无类名冲突。
  - **插槽扩展 (`slots`)**：通过 Vue 具名作用域插槽彻底接管局部组件结构与交互事件。

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

在主样式文件中引入主题样式与组件扫描路径：

```css
@import "tailwindcss";
@import "vue-blocks/theme.css";
@source "../node_modules/vue-blocks";
```

#### 方式 B：无 Tailwind 环境直接引入预编译 CSS

```js
import "vue-blocks/dist/style.css";
import "vue-blocks/theme.css";
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
  <!-- 支持 hash 路由模式零配置静态托管，并可直接绑定 theme 与 mode -->
  <SiteRenderer
    :data="siteConfig"
    route-mode="hash"
    variant="1"
    theme="emerald"
    mode="light"
  />
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
  <PageRenderer :data="pageData" theme="violet" mode="dark" />
</template>
```

#### 场景 3：一键切换全站风格与动态主题

VueBlocks 全系区块共享统一的变体与主题规范：

```html
<script setup>
  import { ref } from "vue";
  import { SiteRenderer, applyTheme } from "vue-blocks";

  // 风格变体：'1' (modern) | '2' (brutalism) | '3' (editorial) | '4' (geek)
  const currentVariant = ref("brutalism");
  // 主题色相：'emerald' | 'cyan' | 'blue' | 'indigo' | 'purple' | 'pink' | 'red' | 'amber' 等或 0-360 数值
  const currentTheme = ref("emerald");
  // 模式：'light' | 'dark'
  const currentMode = ref("light");
</script>

<template>
  <!-- 变体 × 主题 × 模式完全正交，全站 22 个区块实时联动响应 -->
  <SiteRenderer
    :variant="currentVariant"
    :theme="currentTheme"
    :mode="currentMode"
    route-mode="hash"
  />
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

  <!-- 3. 支持插槽扩展（在任意变体风格下均无损稳定透传） -->
  <HeroBlock variant="clean" :data="heroData">
    <template #actions="{ buttons }">
      <div class="flex gap-4">
        <a
          :href="buttons?.[0]?.btnLink || '#'"
          class="px-8 py-3.5 rounded-full bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-700 transition"
        >
          🚀 立即免费体验
        </a>
      </div>
    </template>
  </HeroBlock>

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

> [!TIP]
> **全系变体支持**：所有 22 个标准区块均原生支持统一的 `variant` 设计体系（默认 `'1'` SaaS 现代简约、`'2'` 波普复古新粗野主义，更多主题持续扩展）。推荐访问 [在线演示 ↗](https://wumacms.github.io/vue-blocks/examples/) 使用右下角悬浮控制台交互式实时切换与预览全量变体！

| 组件名称 | 说明 |
| :--- | :--- |
| `NavbarBlock` | 顶部导航栏（支持下拉菜单、移动端折叠、激活态自动高亮） |
| `HeroBlock` | 主视觉 Hero（支持富文本标题、主次行动按钮与媒体展示） |
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

# 运行规范与机制自动化测试（186 项检测）
pnpm test

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
