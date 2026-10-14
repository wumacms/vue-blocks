# VueBlocks 演示站点

VueBlocks 组件库全功能交互式演示项目。完整展示全部 **22 个企业级区块组件** 的高保真渲染效果，并内置悬浮控制台，支持**实时明暗模式**、**4 大设计风格变体**与 **OKLCH 动态色彩主题** 联动切换。

---

## 🛠 技术栈

- **Vue 3** + `<script setup>` 组合式 API
- **Vite 7** 开发构建与 HMR 热更新
- **Tailwind CSS 4** (`@tailwindcss/vite` 插件集成)
- **VueBlocks** 本地工作区实时联动 (`packages/`)

---

## 🚀 快速启动

```bash
# 在项目根目录执行
pnpm -C examples dev

# 或进入 examples 目录后执行
pnpm run dev
```

启动后访问 [http://localhost:5173](http://localhost:5173)（若端口被占用会自动递增）。

---

## 💻 可用命令

| 命令               | 说明                               |
| ------------------ | ---------------------------------- |
| `pnpm run dev`     | 启动 Vite 开发服务器（支持 HMR 热更新） |
| `pnpm run build`   | 构建生产环境产物至 `dist/`         |
| `pnpm run preview` | 本地预览生产构建产物               |

---

## 🎛 悬浮控制台交互功能

页面右下角内置悬浮交互控制台，可实时操纵并验证全系组件的主题与变体渲染：

### 1. 🌗 深浅色模式一键切换
实时切换浅色（`light`）与深色（`dark`）模式，验证所有区块组件的语义化暗色对比度与自适应背景。

### 2. 🎭 4 大设计风格变体联动切换（全局一键换皮）
支持在 4 套正交独立的设计风格变体间一键联动切换：

| 变体代号 | 语义别名 (`alias`) | 视觉设计风格特征 |
| :------- | :--------------------------------------------- | :------------------------------------- |
| `'1'` | `clean` / `modern` / `saas` | **SaaS 现代极简**：圆润卡片、细腻微渐变与轻量投影 |
| `'2'` | `brutalism` / `retro` / `pop` | **波普复古新粗野主义**：4px 实体黑粗边框、纯硬阴影与按压反馈 |
| `'3'` | `editorial` / `warm` / `paper` / `anthropic` | **人文科技纸质叙事**：OKLCH 暖调温润底色、古典衬线体与发丝边框 |
| `'4'` | `geek` / `developer` / `technical` / `code` | **工科极客技术终端**：自适应工程网格底纹、双色终端文字投影与等宽字体 |

### 3. 🌈 OKLCH 动态色彩主题切换
支持实时调节主色相：
- **10 款官方预设色彩**：`slate`、`blue`、`indigo`、`violet`、`rose`、`orange`、`amber`、`emerald`、`teal`、`cyan`。
- **0° ~ 360° 色相环无级微调**：基于 OKLCH 感知均匀色彩模型，无级滑动色相环，全站色彩明度与对比度保持恒定平衡，按钮高对比度文字自动匹配。

### 4. 📝 覆盖与定制机制演示
- **数据驱动覆盖** — Hero 区块展示了通过 `data` prop 随全局风格变体自适应个性化标题与描述。
- **样式覆盖** — Features 区块展示了通过 `styles` prop 精准覆盖根容器背景与边框。
- **事件交互** — ContactForm 区块展示了 `@submit` 事件的表单数据回传与弹窗反馈。

---

## 📦 区块组件渲染顺序

演示站点按标准企业级官网落地页逻辑，依次渲染全部 22 个区块组件：

1. **基础骨架**：`NavbarBlock`（顶部导航栏，含移动端抽屉与下拉菜单）
2. **首屏视觉**：`HeroBlock`（主视觉首屏，支持 4 种风格形态）
3. **生态伙伴**：`PartnersBlock`（合作伙伴/客户墙）
4. **核心亮点**：`FeaturesBlock`（特性卡片网格）
5. **图文结构**：`TopTextBottomImageBlock`（上文下图）
6. **数据背书**：`StatsBlock`（核心数据统计指标）
7. **图文排版**：`LeftImageRightTextBlock`（左图右文）
8. **图文排版**：`RightImageLeftTextBlock`（右图左文）
9. **能力矩阵**：`IconWallBlock`（核心能力图标墙）
10. **服务矩阵**：`ServiceListBlock`（全套专业服务列表）
11. **产品展示**：`ProductListBlock`（产品列表与标签筛选）
12. **培训学习**：`CourseListBlock`（课程与知识图谱列表）
13. **口碑评价**：`TestimonialsBlock`（客户口碑评价轮播与卡片）
14. **团队风采**：`TeamBlock`（核心团队成员展示）
15. **商业变现**：`PricingBlock`（分层价格订阅方案）
16. **能力对比**：`ComparisonTableBlock`（多版本功能详细对比表格）
17. **资讯动态**：`NewsListBlock`（新闻资讯分类列表）
18. **深度图文**：`NewsDetailBlock`（新闻资讯深度详情页）
19. **答疑解惑**：`FaqBlock`（折叠手风琴常见问题）
20. **转化激励**：`CtaBlock`（强力行动号召横幅）
21. **交互留资**：`ContactFormBlock`（咨询留资与意向收集表单）
22. **底座骨架**：`FooterBlock`（全站页脚与法律信息）

---

## 📁 目录结构

```
examples/
├── index.html          # HTML 入口
├── package.json        # 项目依赖与开发脚本
├── vite.config.js      # Vite 配置（含 workspace 源码别名）
├── public/             # 静态资源与占位图
└── src/
    ├── main.js         # Vue 应用入口（全量安装组件库）
    ├── style.css       # Tailwind CSS 4 与 theme.css 入口
    └── App.vue         # 演示主页面（22 个区块 + 悬浮控制台）
```
