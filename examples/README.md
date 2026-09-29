# VueBlocks 演示站点

VueBlocks 组件库演示项目。完整展示全部 **22 个区块组件**
的零配置渲染效果，并提供实时的深浅色模式切换与 Hero 变体切换器。

## 技术栈

- **Vue 3** + `<script setup>` 组合式 API
- **Vite 7** 开发构建
- **Tailwind CSS 4** (`@tailwindcss/vite` 插件集成)

## 快速启动

```bash
# 在项目根目录执行
pnpm -C examples dev

# 或进入 examples 目录后执行
pnpm run dev
```

启动后访问
[http://localhost:5173](http://localhost:5173)（若端口被占用会自动递增）。

## 可用命令

| 命令               | 说明                               |
| ------------------ | ---------------------------------- |
| `pnpm run dev`     | 启动 Vite 开发服务器（HMR 热更新） |
| `pnpm run build`   | 构建生产环境产物至 `dist/`         |
| `pnpm run preview` | 本地预览生产构建产物               |

## 演示功能

### 🌗 深浅色模式切换

页面右下角悬浮控制台提供一键切换，验证所有区块组件的 `dark:`
响应式主题适配效果。

### 🎨 Hero 变体实时切换

支持在 4 种 Hero 风格变体间实时切换：

| 变体 | 风格              |
| ---- | ----------------- |
| `1`  | SaaS 现代简约     |
| `2`  | 波普复古 / 新丑风 |
| `3`  | 暗黑分割网格      |
| `4`  | 全屏大图蒙版      |

### 📝 覆盖机制演示

- **数据覆盖** — Hero 变体 1 展示了通过 `data` prop 传入自定义标题与描述
- **样式覆盖** — Features 区块展示了通过 `styles` prop 覆盖根容器背景渐变
- **事件交互** — ContactForm 区块展示了 `@submit` 事件的表单数据回传

## 区块组件渲染顺序

本演示站点按以下顺序依次渲染全部 22 个区块：

1. `NavbarBlock` — 导航栏
2. `HeroBlock` — 主视觉（变体切换）
3. `PartnersBlock` — 合作伙伴
4. `FeaturesBlock` — 特性卡片（样式覆盖）
5. `TopTextBottomImageBlock` — 上文下图
6. `StatsBlock` — 数据统计
7. `LeftImageRightTextBlock` — 左图右文
8. `RightImageLeftTextBlock` — 左文右图
9. `IconWallBlock` — 图标墙
10. `ServiceListBlock` — 服务列表
11. `ProductListBlock` — 产品列表
12. `CourseListBlock` — 课程列表
13. `TestimonialsBlock` — 客户评价
14. `TeamBlock` — 核心团队
15. `PricingBlock` — 价格方案
16. `ComparisonTableBlock` — 对比表格
17. `NewsListBlock` — 资讯列表
18. `NewsDetailBlock` — 资讯详情
19. `FaqBlock` — 常见问题
20. `CtaBlock` — 行动号召
21. `ContactFormBlock` — 联系表单（事件交互）
22. `FooterBlock` — 页脚

## 目录结构

```
examples/
├── index.html          # HTML 入口
├── package.json        # 项目依赖与脚本
├── vite.config.js      # Vite 配置（含 workspace alias）
├── public/             # 静态资源
└── src/
    ├── main.js         # Vue 应用入口（全局安装组件库）
    ├── style.css       # Tailwind CSS 入口（含 @source 扫描路径）
    └── App.vue         # 主页面（全部 22 个区块 + 控制台）
```
