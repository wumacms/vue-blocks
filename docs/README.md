# VueBlocks 官方文档工程

本项目是 **VueBlocks**（基于 Vue 3 + Tailwind CSS 4 的企业落地页与全栈站点区块组件库）的官方交互式文档站点，基于 [VitePress](https://vitepress.dev/) 搭建。

---

## 🌟 文档站点特性

- **📚 完整文档体系**：覆盖安装指引、快速上手、OKLCH 4 层主题与变体架构解析、单页与多站编排引擎说明。
- **🎮 交互式组件预览**：全量 22 个区块组件的独立文档与多变体渲染演示。
- **🎨 OKLCH 动态主题体系**：深度集成 `vue-blocks/theme.css`，支持明暗模式与 OKLCH 感知均匀色彩系统。
- **⚡ 热更新开发体验**：直接通过 Vite workspace alias 引用 `packages/` 源码，修改组件即刻热更新。

---

## 🛠 本地开发与调试

### 1. 启动文档开发服务器

在项目根目录下执行：

```bash
pnpm run docs:dev
```

或者进入 `docs` 子工程目录执行：

```bash
cd docs
pnpm run docs:dev
```

服务默认运行在 `http://localhost:5174`（或由 VitePress 自动分配端口）。

### 2. 构建生产静态站点

```bash
pnpm run docs:build
```

打包生成的静态资源将输出到 `docs/.vitepress/dist/` 目录下。

### 3. 本地预览生产产物

```bash
pnpm run docs:preview
```

---

## 📁 目录结构说明

```
docs/
├── .vitepress/          # VitePress 站点核心配置与主题定制
│   ├── config.mts       # 站点元数据、导航栏、侧边栏配置
│   ├── theme/           # 自定义主题入口与全局样式 (集成 packages/theme.css 与 Tailwind v4)
│   └── cache/           # 本地构建缓存
├── guide/               # 入门与架构指南
│   ├── install.md       # 安装说明与样式引入
│   ├── quickstart.md    # 快速上手与 4 种变体使用
│   └── architecture.md  # 4 层 OKLCH 动态主题体系与三级覆盖机制
├── component/           # 区块组件与编排容器文档 (22 个区块 + 2 大渲染引擎)
│   ├── site-renderer.md # 多页面全站编排容器
│   ├── page-renderer.md # 单页面落地页编排引擎
│   ├── navbar.md        # 顶部导航栏
│   ├── hero.md          # 主视觉首屏
│   ├── pricing.md       # 价格方案
│   └── ...              # 其他区块独立文档
├── public/              # 站点图标与静态图片
├── index.md             # 文档首页 (VitePress Home Hero 布局)
├── env.d.ts             # TypeScript 类型声明与模块拓展
└── package.json         # 文档工程依赖配置
```

---

## 💡 开发提示

- 文档中通过 Vite 别名直接引用根目录 `packages/` 源码，修改组件源码可实时反映在文档预览中。
- 文档样式入口 `docs/.vitepress/theme/style.css` 已全局引入 `packages/theme.css`，支持与 VitePress 自身的明暗切换联动。
