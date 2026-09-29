# VueBlocks

基于 **Vue 3 + Tailwind CSS 4**
的现代化企业级落地页区块组件库。专为快速搭建现代企业官网、产品落地页、SaaS营销页打造。

开箱即用 · 零配置高保真预览 · 双重智能覆盖 · 多变体支持 · 完整 TypeScript 支持

---

## 📦 安装

```bash
pnpm add vue-blocks
# 或
npm install vue-blocks
```

---

## 🎨 配置样式

### 方式 A：项目中已启用 Tailwind CSS 4（推荐）

在主样式文件（如 `src/style.css`）中声明组件库路径，Tailwind
即可自动按需编译对应样式：

```css
@import "tailwindcss";
@source "../node_modules/vue-blocks";
```

### 方式 B：无 Tailwind 环境直接引入预编译 CSS

```js
import "vue-blocks/dist/style.css";
```

---

## 🚀 快速上手

```html
<script setup>
  import {
    FaqBlock,
    FeaturesBlock,
    FooterBlock,
    HeroBlock,
    NavbarBlock,
    PricingBlock,
  } from "vue-blocks";

  // 按需自定义内容覆盖
  const featuresData = {
    title: '企业级核心特性',
    subtitle: '全链路打通工作流，提升数字化交付效率。'
  };
</script>

<template>
  <!-- 1. 零配置默认渲染 -->
  <NavbarBlock />

  <!-- 2. 指定变体切换 (Hero 支持 1/2/3/4) -->
  <HeroBlock variant="2" />

  <!-- 3. 自定义内容覆盖 -->
  <FeaturesBlock :data="featuresData" />

  <PricingBlock />
  <FaqBlock />
  <FooterBlock />
</template>
```

---

## 📄 开源协议

本项目基于 [MIT License](./package.json) 开放源代码。
