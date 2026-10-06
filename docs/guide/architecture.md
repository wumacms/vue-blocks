# 架构与覆盖规范

VueBlocks 采用**“变体 + 属性覆盖 + 插槽兜底”**三层递进架构设计。

---

## 🏗️ 三层设计理念

1. **第一层：变体选择 (`variant`)**
   - 解决跨区块全局或局部的系统级设计风格差异。
   - 全系 22 组区块内置统一的变体主题规范：
     - **`variant="1"`**：**SaaS 现代极简风格**（默认），采用柔和阴影、精致浅灰边框与现代科技排版。
     - **`variant="2"`**：**波普复古 / 新粗野主义风格**（Neo-Brutalism），采用高反差撞色（梦幻紫、暖金橘、浆果粉）、4px 粗描边轮廓、实体硬阴影与拟物按压微交互。
   - 变体体系在顶层渲染器与原子区块间无缝级联透传，无需为每个变体查阅繁复配置，保持文档与调用界面的精简。
2. **第二层：属性智能合并 (`data` & `styles`)**
   - **`data`（内容覆写）**：采用深度合并算法，仅覆盖用户显式传入的字段。
   - **`styles`（样式覆写）**：内置 `tailwind-merge`。解决类名冲突（例如将默认的 `text-gray-900` 覆盖为 `text-white`，不会产生特异性问题）。
3. **第三层：插槽完全自定义 (`slots`)**
   - 当 JSON 配置与样式覆盖无法满足深度定制需求时（如接入第三方富文本、动效库、弹窗或自定义交互组件），可通过 Vue 模板插槽直接替换局部 DOM 结构。
   - **透传机制**：顶层 `*Block` 组件通过 `$slots` 自动将所有插槽及作用域参数（Slot Props）完整转发给激活的变体（Variant）组件。
   - **作用域插槽**：变体组件向插槽注入上下文数据（如 `:title="data.title"`、`:buttons="data.buttons"`），在自定义内容的同时仍可复用传入的数据字段。

```vue
<template>
  <HeroBlock :data="customData">
    <!-- 使用具名插槽替换标题，并接收 title 作用域参数 -->
    <template #title="{ title }">
      <h1 class="gradient-text">{{ title }}</h1>
    </template>

    <!-- 自定义媒体展示区域（例如替换为 3D 模型或视频播放器） -->
    <template #media="{ image }">
      <MyVideoPlayer :poster="image" src="/demo.mp4" />
    </template>
  </HeroBlock>
</template>
```

---

## 📋 Schema 协议机制

每个区块均内聚一份与设计完全一致的 `schema.json`：

- `name`: 属性名称（如 `title`, `buttons`, `image` 等）
- `type`: 控件类型（如 `text`, `textarea`, `image`, `repeater`, `boolean` 等）
- `label`: 字段显示标签
- `default`: 默认值

这份 Schema 既作为组件运行时的默认数据源，也可以直接导出给低代码页面搭建引擎、CMS 界面生成器使用。
