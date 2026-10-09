# 组件预览沙箱问题分析与解决方案记录

本文档记录了在 VitePress 组件预览沙箱 (`PreviewFrame.vue`) 中遇到的两个核心问题（图片尺寸异常、Hydration 报错导致样式错乱）的产生原因、深度分析及修复方案。

这两个问题均在引入独立 iframe 沙箱架构的重构提交（`5301024`）中引入。

---

## 问题一：Hero 组件预览图片缩小（CSS 权重问题）

### 现象描述
在 `Hero` 组件的文档预览页中，原本应该铺满容器或按比例缩放的图片，尺寸变得不受控制（变小）。

### 原因分析
为了防止 VitePress 的全局基础样式（`base.css`）污染沙箱内的组件，开发者在 `PreviewFrame.vue` 中编写了强力的 CSS 样式重置规则：
```css
#preview-root :is(img, video) {
  height: revert-layer;
  max-width: revert-layer;
}
```
**权重冲突：** 
由于使用了 ID 选择器 `#preview-root`，该规则的 CSS 权重高达 `100`。而组件中用于控制图片尺寸的 Tailwind 实用类（如 `.h-auto`, `.w-full`）属于类选择器，权重仅为 `10`。
这导致高权重的复原规则（`revert-layer`）“误杀”了 Tailwind 工具类，图片的宽度和高度被强制复原，失去了原本应有的响应式尺寸控制。

### 解决方案
使用 CSS 的 `:where()` 伪类来降低重置规则的权重。
```css
:where(#preview-root) :is(img, video) {
  height: revert-layer;
  max-width: revert-layer;
}
```
**:where() 的作用：** 该伪类会将其内部选择器的权重降为 `0`。修改后，这行清除污染的规则依然生效，但权重极低，能够被 Tailwind 的工具类（权重 10）正常覆盖，从而恢复了对组件内部图片尺寸的精准控制。

---

## 问题二：Hydration 报错与 Stats 组件文字不可见

### 现象描述
1. 浏览器控制台出现警告报错：`framework.xxx.js:13 Hydration completed but contains mismatches.`
2. 在 `StatsBlock`（数据统计）组件页面，浅色模式下组件的文字不可见（呈现为白底白字）。

### 原因分析
这两个现象的根本原因是同一个：**Vue SSR（服务端渲染）与客户端激活（Hydration）时的状态不匹配。**

在 `PreviewFrame.vue` 的实现中，通过 `new URLSearchParams(window.location.search)` 获取当前应渲染的组件名。
1. **服务端渲染（SSR）时的死角：** VitePress 在构建生成静态 HTML 时，Node.js 环境中不存在 `window` 对象，获取不到 URL 参数。因此，服务端会直接按照代码里的初始默认值渲染出 `FeaturesBlock`（该组件外层默认带有浅灰/白色背景 `bg-gray-50`）。
2. **客户端激活（Hydration）冲突：** 浏览器加载页面后，客户端 Vue 开始接管 DOM，此时能读取到 URL 参数（例如 `?block=StatsBlock`），Vue 认为当前该渲染 `StatsBlock`。
3. **DOM 修补机制异常（BUG 表现）：** Vue 尝试用 `StatsBlock` 的虚拟 DOM 去修补服务端生成的 `FeaturesBlock` 真实 DOM 时发生严重错位。Vue 成功更新了内部的文本节点（将白色的“500+”文本替换了进去），却**未能成功更新根节点 `<section>` 上的 `class` 属性**。
4. **视觉灾难：** 最终渲染的 DOM 结构保留了服务端的浅色背景（`bg-gray-50`），但填充了客户端的白色文字（`text-white`），导致浅色模式下文字完全不可见。

### 解决方案
使用 VitePress 提供的 `<ClientOnly>` 组件将沙箱中的动态内容包裹起来：
```vue
<ClientOnly>
  <component
    :is="CurrentComponent"
    :variant="variant"
  />
</ClientOnly>
```
**原理：** 
由于这是专门用于 iframe 的独立预览页面，不需要 SEO 支持。包裹 `<ClientOnly>` 后，强制 VitePress 在 SSR 构建阶段跳过该区域的渲染。浏览器在初次挂载时会从零开始渲染完整的组件树，彻底消除了服务端与客户端的 DOM 结构不匹配问题，所有的 Tailwind 样式类（包括 `StatsBlock` 预设的深色背景 `bg-indigo-600`）都能被正确地挂载。
