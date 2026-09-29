# VueBlocks 官方文档工程

本项目是 **VueBlocks**（基于 Vue 3 + Tailwind CSS 4 的企业落地页区块组件库）的官方交互式文档站点，基于 [VitePress](https://vitepress.dev/) 搭建。

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
│   ├── theme/           # 自定义主题入口与全局样式 (Tailwind v4 集成)
│   └── cache/           # 本地构建缓存
├── guide/               # 入门指南文档
│   ├── install.md       # 安装说明
│   ├── quickstart.md    # 快速上手
│   └── architecture.md  # 架构设计与覆盖机制规范
├── component/           # 22 个区块组件的独立演示与文档
│   ├── navbar.md        # 导航栏
│   ├── hero.md          # 主视觉 Hero（4种变体）
│   ├── pricing.md       # 价格方案
│   └── ...              # 其他区块
├── index.md             # 文档首页 (VitePress Home Layout)
├── env.d.ts             # TypeScript 类型声明与模块拓展
└── package.json         # 文档工程依赖配置
```

---

## 💡 开发提示

- 文档中通过 Vite 别名直接引用根目录 `packages/` 源码，修改组件源码可实时热更新反映在文档预览中。
- 文档支持深色模式切换，与 Tailwind CSS 4 的 `dark:` 变量深度适配。
