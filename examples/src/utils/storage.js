// 默认多页面配置预设（与 WumaCMS / SiteRenderer 路由规范保持一致）
export const DEFAULT_PAGES = [
  {
    id: 'home',
    title: '首页',
    path: '/',
    seo: {
      title: '首页 - WumaCMS 可视化搭建引擎',
      description: '基于 Vue 3 + Tailwind CSS 4 的原子化积木式建站引擎。'
    },
    variant: '1',
    theme: 'blue',
    mode: 'light',
    blocks: [
      {
        id: 'hero-init',
        type: 'HeroBlock',
        variant: undefined,
        data: {
          title: 'WumaCMS 可视化搭建引擎<br><span class="text-primary">从原子区块到全栈页面</span>',
          description: '点击任意区块在右侧属性面板实时调整内容与设计变体，支持多端设备仿真与即时渲染。',
          buttons: [
            { btnText: '开始可视化搭建', btnLink: '#', isPrimary: true, newWindow: false },
            { btnText: '查看数据文档', btnLink: '#', isPrimary: false, newWindow: false }
          ]
        },
        styles: {}
      },
      {
        id: 'partners-init',
        type: 'PartnersBlock',
        variant: undefined,
        data: {},
        styles: {}
      },
      {
        id: 'features-init',
        type: 'FeaturesBlock',
        variant: undefined,
        data: {
          title: '为什么选择 WumaCMS 引擎？',
          description: '基于 Vue 3 + Tailwind CSS 4 的单模板直出与纯数据驱动架构'
        },
        styles: {}
      },
      {
        id: 'cta-init',
        type: 'CtaBlock',
        variant: undefined,
        data: {
          title: '立即开始体验高效搭建',
          description: '所有区块均配备标准化 Manifest 协议，与无头 CMS 零摩擦对接。'
        },
        styles: {}
      }
    ]
  },
  {
    id: 'features',
    title: '产品生态',
    path: '/features',
    seo: {
      title: '产品生态 - WumaCMS',
      description: '25+ 款商业级原子区块覆盖各类企业官网与营销落地页场景。'
    },
    variant: '1',
    theme: 'indigo',
    mode: 'light',
    blocks: [
      {
        id: 'features-top',
        type: 'TopTextBottomImageBlock',
        variant: undefined,
        data: {
          title: '丰富且专业的落地页全场景区块',
          description: '自由组合、随心编排，以极高的人效产出媲美专业设计团队的网页。'
        },
        styles: {}
      },
      {
        id: 'features-service',
        type: 'ServiceListBlock',
        variant: undefined,
        data: {},
        styles: {}
      },
      {
        id: 'features-cta',
        type: 'CtaBlock',
        variant: undefined,
        data: {
          title: '体验原子区块的无限扩展可能',
          description: '支持自定义扩展组件注册，物料生态无缝拓展。'
        },
        styles: {}
      }
    ]
  },
  {
    id: 'pricing',
    title: '商业授权',
    path: '/pricing',
    seo: {
      title: '商业授权与定价 - WumaCMS',
      description: '透明清晰的商业授权定价方案，助力团队降本增效。'
    },
    variant: '1',
    theme: 'blue',
    mode: 'light',
    blocks: [
      {
        id: 'pricing-table',
        type: 'PricingBlock',
        variant: undefined,
        data: {},
        styles: {}
      },
      {
        id: 'pricing-faq',
        type: 'FaqBlock',
        variant: undefined,
        data: {},
        styles: {}
      }
    ]
  },
  {
    id: 'about',
    title: '关于团队',
    path: '/about',
    seo: {
      title: '关于团队 - WumaCMS',
      description: '专注打造极致体验的现代 Web 搭建引擎。'
    },
    variant: '1',
    theme: 'emerald',
    mode: 'light',
    blocks: [
      {
        id: 'about-team',
        type: 'TeamBlock',
        variant: undefined,
        data: {},
        styles: {}
      },
      {
        id: 'about-stats',
        type: 'StatsBlock',
        variant: undefined,
        data: {},
        styles: {}
      },
      {
        id: 'about-testimonials',
        type: 'TestimonialsBlock',
        variant: undefined,
        data: {},
        styles: {}
      },
    ]
  },
  {
    id: 'news',
    title: '版本动态',
    path: '/news',
    seo: {
      title: '版本动态与技术文章 - WumaCMS',
      description: '追踪 VueBlocks 的最新版本发布、Tailwind CSS 4 最佳实践、动态 SEO 深度解析及架构设计演进。'
    },
    variant: '1',
    theme: 'blue',
    mode: 'light',
    blocks: [
      {
        id: 'news-hero',
        type: 'HeroBlock',
        variant: '1',
        data: {
          title: '前沿动态与技术洞察',
          description: '深入剖析现代化落地页工程化理念，探索 Vue 3 与 Tailwind CSS 4 的极致设计哲学。',
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
          imageAlt: '技术前沿动态',
          buttons: [
            { btnText: '浏览精选动态', btnLink: '#news-list', isPrimary: true, newWindow: false }
          ]
        },
        styles: {}
      },
      {
        id: 'news-list',
        type: 'NewsListBlock',
        variant: '1',
        data: {
          title: '最新动态与技术文章',
          description: '版本更新 · 架构设计 · 最佳实践',
          news: [
            {
              image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=40',
              imageAlt: 'VueBlocks 架构图谱',
              category: '重大发布',
              date: '2026-10-05',
              title: 'VueBlocks v1.2.0 发布：全新 SiteRenderer 整站渲染器与全局变体支持',
              summary: '正式推出 L3 级 SiteRenderer 容器，支持多页面统一路由拦截、全局变体统一换肤及动态 SEO 自动同步，大幅简化企业官网开发工作流。',
              link: '/news-detail',
              newWindow: false
            },
            {
              image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=40',
              imageAlt: '前端工程代码',
              category: '架构实践',
              date: '2026-09-28',
              title: 'Tailwind CSS 4 在大型商业组件库中的落地实践与性能优化',
              summary: '深度探讨从 Tailwind 3 升级至 Tailwind 4 的现代工具类革新，如何通过按需样式编译消除冗余 CSS 并实现亚毫秒级热更新。',
              link: '#',
              newWindow: false
            },
            {
              image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=40',
              imageAlt: '低代码与设计协同',
              category: '行业洞察',
              date: '2026-09-02',
              title: '从原子区块到整站生成：低代码与研发团队的融合之道',
              summary: '探讨未来企业级前端组件库的发展方向，如何将高度规范化的声明式 JSON 数据流与强扩展性的 Vue 3 组件生态有机融合。',
              link: '#',
              newWindow: false
            }
          ],
          moreText: '回到产品生态',
          moreLink: '/features'
        },
        styles: {}
      }
    ]
  },
  {
    id: 'news-detail',
    title: '文章详情',
    path: '/news-detail',
    seo: {
      title: 'VueBlocks v1.2.0 发布：全新 SiteRenderer 整站渲染器与全局变体支持',
      description: '正式推出 L3 级 SiteRenderer 容器，支持多页面统一路由拦截、全局变体统一换肤及动态 SEO 自动同步。'
    },
    variant: '1',
    theme: 'blue',
    mode: 'light',
    blocks: [
      {
        id: 'news-detail-content',
        type: 'NewsDetailBlock',
        variant: '1',
        data: {
          category: '重大发布',
          date: '2026-10-05',
          title: 'VueBlocks v1.2.0 发布：全新 SiteRenderer 整站渲染器与全局变体支持',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
          imageAlt: 'VueBlocks v1.2.0 发布图',
          body: '<p>我们非常自豪地宣布，VueBlocks v1.2.0 正式发布！在本次重大更新中，我们引入了 L3 级 <strong>SiteRenderer 整站渲染器</strong> 与 <strong>统一全局变体模式</strong>，为企业级官网与落地页搭建带来了全新的里程碑体验。</p><h3>1. 为什么需要 SiteRenderer？</h3><p>过去，开发者在使用原子区块时，仍需要自己搭建导航栏吸顶、处理多页面路由、配置 SEO Meta 以及处理页面切换滚动。SiteRenderer 彻底将这些繁重的样板代码封装为高阶容器，您只需提供一份结构化配置，即可实现拥有无刷新路由拦截、菜单高亮联动、动态 SEO 注入的企业官网。</p><h3>2. 全局统一换肤模式</h3><p>只需在 SiteRenderer 上传入 <code>variant=\"2\"</code> 或 <code>variant=\"minimal\"</code>，整站所有子区块将自适应同步切换风格，彻底告别单调一致的视觉疲劳。</p><h3>3. 完整的 TypeScript 与多格式支持</h3><p>全量更新了 index.d.ts，提供严密的类型提示与自动补全体验。</p>',
          tags: [
            { text: 'VueBlocks' },
            { text: 'SiteRenderer' },
            { text: 'TailwindCSS4' },
            { text: '架构发布' }
          ]
        },
        styles: {}
      },
      {
        id: 'news-detail-cta',
        type: 'CtaBlock',
        variant: '1',
        data: {
          title: '立即使用 VueBlocks 搭建您的企业站点',
          description: '查阅官方文档或直接选购商业授权，享受极速开发体验。',
          buttons: [
            { btnText: '返回文章列表', btnLink: '/news', isPrimary: false, newWindow: false },
            { btnText: '选购商业授权', btnLink: '/pricing', isPrimary: true, newWindow: false }
          ]
        },
        styles: {}
      }
    ]
  },
  {
    id: 'contact',
    title: '商业咨询',
    path: '/contact',
    seo: {
      title: '联系与咨询 - WumaCMS',
      description: '欢迎随时联系我们获取企业级支持与方案咨询。'
    },
    variant: '1',
    theme: 'blue',
    mode: 'light',
    blocks: [
      {
        id: 'contact-form',
        type: 'ContactFormBlock',
        variant: undefined,
        data: {},
        styles: {}
      }
    ]
  }
]

export const DEFAULT_STORAGE_KEY = 'wumacms_builder_pages_v1'

/**
 * 从 LocalStorage 读取多页面配置，若不存在则回退至默认预设
 */
export function loadStoredPages(storageKey = DEFAULT_STORAGE_KEY) {
  if (typeof window === 'undefined' || !storageKey) {
    return JSON.parse(JSON.stringify(DEFAULT_PAGES))
  }
  try {
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        // 自动兼容补充新增的标准页面（如 /news, /news-detail），不覆盖用户已有页面的自定义修改
        const existingPaths = new Set(parsed.map((p) => p.path))
        const missingPages = DEFAULT_PAGES.filter((p) => !existingPaths.has(p.path))
        if (missingPages.length > 0) {
          const merged = [...parsed, ...JSON.parse(JSON.stringify(missingPages))]
          saveStoredPages(merged, storageKey)
          return merged
        }
        return parsed
      }
    }
  } catch (err) {
    console.warn('[Storage] 读取持久化页面失败，使用默认配置:', err)
  }
  return JSON.parse(JSON.stringify(DEFAULT_PAGES))
}

/**
 * 将多页面配置序列化写入 LocalStorage
 */
export function saveStoredPages(pages, storageKey = DEFAULT_STORAGE_KEY) {
  if (typeof window === 'undefined' || !storageKey) return false
  try {
    localStorage.setItem(storageKey, JSON.stringify(pages))
    return true
  } catch (err) {
    console.error('[Storage] 保存持久化页面失败:', err)
    return false
  }
}

/**
 * 清空持久化数据恢复默认
 */
export function resetStoredPages(storageKey = DEFAULT_STORAGE_KEY) {
  if (typeof window === 'undefined' || !storageKey) return
  try {
    localStorage.removeItem(storageKey)
  } catch (err) {
    console.error('[Storage] 清除持久化页面失败:', err)
  }
}
