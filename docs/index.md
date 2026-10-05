---
layout: home

hero:
  name: "VueBlocks"
  text: "企业级落地页与全栈站点组件库"
  tagline: 基于 Vue 3 + Tailwind CSS 4 构建，从 22 组高阶原子区块到单页编排（PageRenderer）、再到多页面全栈站点（SiteRenderer），支持全站路由调度与一键全局换皮。
  image:
    src: /images/logo.png
    alt: VueBlocks Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/install
    - theme: alt
      text: 浏览组件
      link: /component/site-renderer
    - theme: alt
      text: 在线演示 ↗
      link: /examples/
      target: _blank

features:
  - title: 站点与页面编排引擎
    details: 内置 SiteRenderer 与 PageRenderer，一份 JSON 驱动多页面站点渲染，内置无刷新路由拦截（Hash/History/Memory）与响应式 SEO 动态同步。
  - title: 极简统一变体（全站换皮）
    details: 支持顶层传入统一 variant 参数，全站所有区块一键切换设计风格，未配置变体自动优雅降级，大幅提升官网原型与交付效率。
  - title: 零配置高保真预览
    details: 不传任何参数也能直接预览精美的落地页区块，默认数据源自行业设计规范，大幅缩短原型与交付周期。
  - title: 强大的双重覆盖机制
    details: 支持传入内容 JSON 局部覆写文本与多媒体，支持传入 Tailwind 类名精准覆盖样式，结合 tailwind-merge 无冲突。
  - title: 丰富的变体支持 (Hero 4变体)
    details: Hero 区块内置 SaaS现代、复古波普、暗黑分割网格、全屏背景图 4 大风格变体，所有区块预留变体扩展插槽。
  - title: Tailwind CSS v4 原生驱动
    details: 原生适配最新 Tailwind CSS 4 架构，零配置深色模式（dark:）与响应式断点深度适配。
---
