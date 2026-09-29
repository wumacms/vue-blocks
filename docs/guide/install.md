# 安装指南

本节介绍如何在您的 Vue 3 项目中安装与配置 **VueBlocks** 区块组件库。

---

## 📦 环境准备

- **Vue**: ^3.4.0 或 ^3.5.0
- **Node.js**: >= 18.0.0
- **Tailwind CSS**: 推荐搭配 Tailwind CSS 4 使用以获得最轻量、最灵活的类名定制体验。

---

## 🚀 安装依赖

使用您喜欢的包管理器安装组件库及样式依赖：

::: code-group

```bash [pnpm]
pnpm add vue-blocks
```

```bash [npm]
npm install vue-blocks
```

```bash [yarn]
yarn add vue-blocks
```

:::

---

## 🎨 配置样式

### 方式一：项目中已启用 Tailwind CSS 4（推荐）

如果您的项目已安装 Tailwind CSS 4，只需在主 CSS 文件中通过 `@source` 声明组件库路径，Tailwind 即可自动提取所有区块的样式：

```css [src/style.css]
@import "tailwindcss";
@source "../node_modules/vue-blocks";
```

### 方式二：零 Tailwind 依赖引入预编译 CSS

如果您的项目没有安装 Tailwind CSS，可直接引入组件库打包好的静态样式：

```js [src/main.js]
import 'vue-blocks/dist/style.css'
```
