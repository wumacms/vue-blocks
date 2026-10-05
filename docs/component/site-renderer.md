# SiteRenderer 站点渲染器

`SiteRenderer` 是 `vue-blocks` 组件库中的最高层级容器，支持传入全站配置（包含导航栏、多页面集合、页脚），根据导航栏中的菜单路由无缝调度渲染对应页面，提供开箱即用的企业级多页面网站/官网全套解决方案。

---

## 🎨 实时预览 (零配置)

不传任何参数直接使用，组件默认渲染一套多页面企业官网完整示例。内置导航链接点击拦截与无刷新路由跳转（在文档预览中使用 `route-mode="memory"` 防止干扰文档本身路由）：

<div class="block-preview-box">
  <div class="block-preview-header">
    <span>SiteRenderer 多页面站点零配置预览</span>
  </div>
  <div class="block-preview-body" style="height: 680px; overflow-y: auto;">
    <SiteRenderer route-mode="memory" />
  </div>
</div>

```vue
<!-- 默认使用 hash 路由模式，零配置部署 -->
<SiteRenderer />
```

---

## 📖 核心使用场景

### 1. 极简全合一模式 (单 JSON 文件驱动)

通过单个 `site.json` 描述全站结构，非常适合低代码平台导出、CMS 整体建站或本地配置文件：

```vue
<script setup lang="ts">
import { SiteRenderer, type SiteData } from 'vue-blocks'
import siteConfig from './site.json'
</script>

<template>
  <SiteRenderer :data="siteConfig" />
</template>
```

### 2. 多属性解构模式 (灵活拼装)

如果公共导航栏、页脚与页面数据分别由不同模块维护，可分项传入：

```vue
<script setup lang="ts">
import { SiteRenderer } from 'vue-blocks'
import navbarData from './common/navbar.json'
import footerData from './common/footer.json'
import homePage from './pages/home.json'
import aboutPage from './pages/about.json'
import contactPage from './pages/contact.json'

const pages = {
  '/': homePage,
  '/about': aboutPage,
  '/contact': contactPage
}
</script>

<template>
  <SiteRenderer
    :navbar="navbarData"
    :pages="pages"
    :footer="footerData"
    default-path="/"
  />
</template>
```

### 3. 双向绑定受控模式 (v-model)

宿主应用可利用 `v-model:current-path` 实时获取并控制当前路由，实现外部面包屑、外置切换菜单或权限拦截：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SiteRenderer } from 'vue-blocks'
import siteConfig from './site.json'

const currentPath = ref('/')

function goToAbout() {
  currentPath.value = '/about'
}
</script>

<template>
  <div>
    <button @click="goToAbout">外部控制跳转到关于页</button>
    <SiteRenderer
      v-model:current-path="currentPath"
      :data="siteConfig"
      @page-change="(newPath) => console.log('当前页面切换为:', newPath)"
    />
  </div>
</template>
```

### 4. 异步页面懒加载 (性能优化)

对于页面较多的大型站点，`pages` 的值不仅支持直接传入对象，还支持传入异步加载函数（如 Vite 的动态 `import()` 或 `fetch` 请求），仅在访问特定路由时才按需加载该页面数据：

```vue
<script setup lang="ts">
import { SiteRenderer } from 'vue-blocks'

const pages = {
  '/': () => import('./pages/home.json'),
  '/about': () => import('./pages/about.json'),
  '/contact': () => import('./pages/contact.json')
}
</script>

<template>
  <SiteRenderer :pages="pages" />
</template>
```

### 5. 统一变体模式 (极简全站换皮)

只需在 `SiteRenderer` 传入 `variant` 参数（如 `:variant="siteVariant"`），即可一键控制全站所有区块统一切换到指定变体风格（若某区块暂无该变体，自动优雅降级回默认版）：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SiteRenderer } from 'vue-blocks'

const currentVariant = ref('2') // 1 | 2 | 3 | 4
</script>

<template>
  <!-- 一行参数实现全站风格一键切换 -->
  <SiteRenderer :variant="currentVariant" />
</template>
```

---

## 🧭 路由工作模式 (Route Modes)

`SiteRenderer` 提供三种路由运行策略，适配不同部署环境：

| 模式 | 属性值 | 浏览器地址表现 | 适用场景与优势 |
| :--- | :--- | :--- | :--- |
| **Hash 模式 (默认)** | `route-mode="hash"` | `https://example.com/#/about` | **推荐**。零配置部署！部署在 GitHub Pages、静态 CDN 或未配置 URL Rewrite 的服务器上，刷新绝不 404。 |
| **History 模式** | `route-mode="history"` | `https://example.com/about` | URL 干净，符合大厂企业官网规范（需 Web 服务器配置 fallback 至 index.html）。 |
| **Memory 模式** | `route-mode="memory"` | 不改变浏览器地址栏 | 适用于嵌入在后台管理系统的弹窗/Tab、微前端、低代码平台预览器等场景。 |

---

## 🧩 插槽扩展 (Slots)

### 自定义 404 页面

当访问未知路径时，默认展示内置的 404 兜底卡片；您也可以通过 `#not-found` 插槽完全自定义：

```vue
<SiteRenderer :data="siteData">
  <template #not-found="{ path, navigateTo }">
    <div class="custom-404-box">
      <h2>抱歉，页面 {{ path }} 尚未发布！</h2>
      <button @click="navigateTo('/')">回到主页</button>
    </div>
  </template>
</SiteRenderer>
```

### 全局公告栏插槽 (`#before-navbar`)

```vue
<SiteRenderer :data="siteData">
  <template #before-navbar>
    <div class="bg-indigo-600 text-white text-center py-2 text-sm font-medium">
      🎉 VueBlocks 2.0 正式发布！全站多页面渲染现已可用。
    </div>
  </template>
</SiteRenderer>
```

---

## 📋 API 说明

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `data` | `SiteData` | `defaultData` | 全站配置对象（包含 navbar、footer、pages 等） |
| `variant` | `string \| number` | `undefined` | 全站统一变体标识，一键切换整站所有区块风格（未支持该变体的区块自动降级） |
| `navbar` | `Object \| String \| Function \| Boolean` | `undefined` | 导航栏配置或组件，显式传入时覆盖 `data.navbar`。传 `false` 隐藏 |
| `footer` | `Object \| String \| Function \| Boolean` | `undefined` | 页脚配置或组件，显式传入时覆盖 `data.footer`。传 `false` 隐藏 |
| `pages` | `Record<string, PageData \| AsyncLoader> \| Array` | `undefined` | 页面映射表或列表，显式传入时覆盖 `data.pages` |
| `current-path` / `currentPath` | `string` | `undefined` | 当前激活路由，支持 `v-model:current-path` |
| `route-mode` / `routeMode` | `'hash' \| 'history' \| 'memory'` | `'hash'` | 路由模式 |
| `default-path` / `defaultPath` | `string` | `'/'` | 默认起始访问路径 |
| `site-title` / `siteTitle` | `string` | `''` | 站点全局主标题后缀（自动与页面 title 拼接） |
| `container-class` / `containerClass` | `string` | `'min-h-screen bg-slate-50 flex flex-col'` | 站点最外层包裹容器 class |

### Emits 事件

| 事件名 | 参数 | 说明 |
| :--- | :--- | :--- |
| `update:currentPath` | `(path: string)` | 当前路由发生改变时触发 |
| `update:path` | `(path: string)` | 简写形式的双向绑定同步 |
| `page-change` | `(newPath: string, oldPath: string, pageData: any)` | 成功切换页面后触发 |
| `error` | `(err: { type: '404' \| 'load-failed', path: string, error?: any })` | 路由不存在或页面加载失败时触发 |
| `submit` | `(payload: any, context: SubmitContext)` | 页面内表单区块触发提交时透传 |

### Slots 插槽

| 插槽名 | 作用域参数 | 说明 |
| :--- | :--- | :--- |
| `not-found` | `{ path: string, navigateTo: Function }` | 自定义 404 兜底内容 |
| `before-navbar` | 无 | 导航栏上方区域（如公告栏） |
| `navbar` | `{ activePath: string, navigateTo: Function }` | 自定义全站导航栏 |
| `after-navbar` | 无 | 导航栏下方区域 |
| `before-footer` | 无 | 页脚上方区域 |
| `footer` | `{ activePath: string, navigateTo: Function }` | 自定义全站页脚 |
| `after-footer` | 无 | 页脚下方区域 |
