export const defaultData = {
  containerClass: 'min-h-screen bg-slate-50 text-slate-900 flex flex-col',
  routeMode: 'hash',
  defaultPath: '/',
  siteTitle: 'VueBlocks - 积木式全栈建站组件库',

  // 1. 全站持久化导航栏 (带二级下拉菜单与自动高亮联动)
  navbar: {
    type: 'NavbarBlock',
    variant: '1',
    data: {
      brandName: 'VueBlocks',
      logo: 'https://placehold.co/36x36/4F46E5/white?text=VB',
      navLinks: [
        { text: '首页', link: '/' },
        {
          text: '产品生态',
          children: [
            { text: '区块全景', link: '/features', icon: '🧩' },
            { text: '商业授权', link: '/pricing', icon: '💎' },
            { text: '版本动态', link: '/news', icon: '📰' }
          ]
        },
        { text: '关于团队', link: '/about' },
        { text: '商业咨询', link: '/contact' }
      ],
      buttons: [
        { btnText: '快速开始', btnLink: '/pricing', isPrimary: true, newWindow: false }
      ]
    }
  },

  // 2. 多页面数据集合 (全面围绕 VueBlocks 官网自身定位设计)
  pages: {
    // 首页
    '/': {
      seo: {
        title: '首页',
        description: '基于 Vue 3 + Tailwind CSS 4 的积木式全栈建站组件库，提供 25+ 款商业级高保真落地页原子区块与整站级渲染方案。',
        keywords: ['Vue3', 'TailwindCSS4', 'VueBlocks', '建站组件库', '落地页', 'SiteRenderer', '低代码']
      },
      blocks: [
        {
          type: 'HeroBlock',
          variant: '1',
          data: {
            title: '基于 Vue 3 的积木式全栈建站组件库',
            description: '内置 25+ 款高保真商业级落地页区块，支持单页面与多页面整站渲染、零 CSS 配置全局换肤，让企业官网与产品落地页开发如搭积木般流畅优雅。',
            buttons: [
              { btnText: '浏览区块全景', btnLink: '/features', isPrimary: true, newWindow: false },
              { btnText: '获取商业授权', btnLink: '/pricing', isPrimary: false, newWindow: false }
            ]
          }
        },
        {
          type: 'PartnersBlock',
          variant: '1',
          data: {
            title: '技术生态与开源标准',
            description: '深度融合现代前端主流生态体系，赋能数十万企业与独立开发者',
            partners: [
              { name: 'Vue.js', logo: 'https://placehold.co/120x40/334155/white?text=Vue.js' },
              { name: 'Vite', logo: 'https://placehold.co/120x40/334155/white?text=Vite' },
              { name: 'Tailwind CSS', logo: 'https://placehold.co/120x40/334155/white?text=Tailwind+CSS' },
              { name: 'Nuxt', logo: 'https://placehold.co/120x40/334155/white?text=Nuxt' },
              { name: 'TypeScript', logo: 'https://placehold.co/120x40/334155/white?text=TypeScript' },
              { name: 'VitePress', logo: 'https://placehold.co/120x40/334155/white?text=VitePress' }
            ]
          }
        },
        {
          type: 'FeaturesBlock',
          variant: '1',
          data: {
            title: '为什么选择 VueBlocks 作为官网方案？',
            description: '从底层设计系统到顶层整站渲染，兼顾极致的开发效能与工业级视觉呈现。',
            features: [
              {
                icon: '⚡',
                title: 'Vue 3 + Tailwind CSS 4 原生架构',
                description: '基于现代组合式 API 打造，深度融合 Tailwind 4 引擎，无运行时冗余 CSS，极致轻量快速。'
              },
              {
                icon: '🧩',
                title: '三层渐进式渲染体系',
                description: '提供原子区块（Blocks）、页面编排（PageRenderer）与整站路由（SiteRenderer）三层分层，按需自由引入。'
              },
              {
                icon: '🎨',
                title: '全局变体与换肤系统',
                description: '支持整站一键切换视觉变体（默认、极简、暗黑等），区块风格自适应同步，彻底摆脱同质化设计。'
              },
              {
                icon: '🚀',
                title: '动态 SEO 与无刷新路由',
                description: '集成站内链接拦截、平滑滚动、页面级 Title 与 Meta 自动注入，开箱即拥有专业的搜索引擎优化表现。'
              },
              {
                icon: '🛡️',
                title: '完整类型定义与多产物打包',
                description: '提供完备的 TypeScript .d.ts 类型文件，支持 ESM、UMD、CJS 规范，轻松接入现有工程与微前端。'
              },
              {
                icon: '🔧',
                title: '插槽级灵活定制',
                description: '内置数十个精细化的 Slot 扩展点，不仅能纯声明式配置，也能通过插槽重载任意局部，业务扩展无上限。'
              }
            ]
          }
        },
        {
          type: 'StatsBlock',
          variant: '1',
          data: {
            stats: [
              { label: '开箱即用高保真区块', value: '25+' },
              { label: '前端打包体积开销', value: '< 25KB' },
              { label: '企业官网建站效率提升', value: '10x' },
              { label: 'TypeScript 类型覆盖率', value: '100%' }
            ]
          }
        },
        {
          type: 'TestimonialsBlock',
          variant: '1',
          data: {
            title: '来自架构师与产品团队的评价',
            description: '听听一线技术团队如何使用 VueBlocks 提效落地页研发与官网交付。',
            testimonials: [
              {
                quote: '过去搭建一个高质量企业官网需要前端和设计反复对齐 2 周，现在使用 VueBlocks 的 SiteRenderer，仅需一份 JSON 配置就能半天交付上线，视觉质感直接拉满！',
                name: '李青松',
                position: '前端技术总监',
                company: '智算云联科技',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=30'
              },
              {
                quote: 'VueBlocks 的多变体模式太实用了！传入统一 variant 参数就可以全局换皮，而且插槽设计非常克制优雅，二次定制完全没有枷锁。',
                name: '苏宛晴',
                position: '全栈独立开发者',
                company: 'SaaSKit 创始人',
                avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=30'
              },
              {
                quote: 'Tailwind CSS 4 与 Vue 3 的结合让页面渲染极为丝滑。SEO 自动同步与无刷新页面路由机制，完全省去了搭建额外路由脚手架的精力。',
                name: '张博文',
                position: '高级架构师',
                company: '极客创新实验室',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=30'
              }
            ]
          }
        },
        {
          type: 'CtaBlock',
          variant: '1',
          data: {
            title: '准备好体验高效优雅的积木式建站了吗？',
            description: '告别枯燥重复的 HTML/CSS 切图，使用 VueBlocks 快速构建高转化商业站点。',
            buttons: [
              { btnText: '立即查看授权方案', btnLink: '/pricing', isPrimary: true, newWindow: false },
              { btnText: '在线咨询商务', btnLink: '/contact', isPrimary: false, newWindow: false }
            ]
          }
        }
      ]
    },

    // 产品生态 -> 区块全景
    '/features': {
      seo: {
        title: '产品特性与区块全景',
        description: '全面了解 VueBlocks 的 25+ 款核心原子区块，从主视觉、图文排版、数据展示到表单转化。'
      },
      blocks: [
        {
          type: 'HeroBlock',
          variant: '2',
          data: {
            title: '全场景覆盖的高保真商业区块生态',
            description: '精心打磨每一个像素与交互动效。从 Hero 主视觉、交互式定价卡片、响应式对比表到联系表单与常见问题，让您无需从零编写一行重复代码。',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
            imageAlt: 'VueBlocks 数据可视化与区块编排',
            buttons: [
              { btnText: '查看方案价格', btnLink: '/pricing', isPrimary: true, newWindow: false },
              { btnText: '咨询商务支持', btnLink: '/contact', isPrimary: false, newWindow: false }
            ]
          }
        },
        {
          type: 'ProductListBlock',
          variant: '1',
          data: {
            title: '三层渐进式架构组件',
            description: '满足从单个局部模块定制到全栈企业官网搭建的不同场景需求',
            products: [
              {
                image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
                imageAlt: '原子区块',
                title: 'L1 原子区块 (Atomic Blocks)',
                description: '内置 Hero、Pricing、Faq、Testimonials 等 25+ 款商业级原子区块，开箱即用，支持多变体。',
                tags: [{ text: '25+ 现成区块' }, { text: '多变体' }],
                link: '/pricing',
                newWindow: false,
                badge: '核心基础',
                badgeColor: 'bg-indigo-600'
              },
              {
                image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
                imageAlt: '页面编排',
                title: 'L2 页面编排器 (PageRenderer)',
                description: '纯 JSON 数据驱动整个页面正文区块编排，支持动态组件注册、懒加载以及页面级 SEO 监听自动同步。',
                tags: [{ text: 'JSON 驱动' }, { text: '动态 SEO' }],
                link: '/pricing',
                newWindow: false,
                badge: '页面引擎',
                badgeColor: 'bg-emerald-600'
              },
              {
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
                imageAlt: '整站渲染器',
                title: 'L3 站点渲染器 (SiteRenderer)',
                description: '顶层容器统管导航栏、页脚、跨页面路由调度、站内链接拦截、无刷新切换与 404 兜底。',
                tags: [{ text: '无刷新路由' }, { text: '全站统管' }],
                link: '/pricing',
                newWindow: false,
                badge: '整站发布',
                badgeColor: 'bg-purple-600'
              }
            ]
          }
        },
        {
          type: 'IconWallBlock',
          variant: '1',
          data: {
            title: '开箱即用的模块化能力',
            description: '覆盖现代商业站点 99% 的核心页面需求，自由搭配组装',
            items: [
              {
                icon: '🎯',
                title: '转化型 Hero 主视觉',
                description: '4+ 种不同视觉变体，强力提升落地页首屏转化率'
              },
              {
                icon: '💳',
                title: '智能定价卡片',
                description: '支持推荐标签、多周期计费、清晰特权对照'
              },
              {
                icon: '📊',
                title: '高保真对比表格',
                description: '跨竞品/版本能力维度细致比对，排版自适应响应'
              },
              {
                icon: '📝',
                title: '企业联系表单',
                description: '内置校验与事件拦截，轻松对接后端工单系统'
              }
            ]
          }
        },
        {
          type: 'TopTextBottomImageBlock',
          variant: '1',
          data: {
            title: '多端自适应响应式设计',
            description: '每一个区块组件均经过移动端、平板与桌面端的严格适配测试，在任何设备上都能保持无懈可击的排版美感与流畅体验。',
            image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
            imageAlt: '多端响应式展示'
          }
        },
        {
          type: 'LeftImageRightTextBlock',
          variant: '1',
          data: {
            title: 'SiteRenderer 整站路由引擎',
            description: '无需额外安装复杂的前端路由库，SiteRenderer 内置 Hash、History 与 Memory 模式。支持站内链接无刷新拦截、URL 自动同步、页面级 SEO 动态注入及优雅的 404 兜底机制。',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=30',
            imageAlt: '代码与路由架构分析',
            tags: [
              { text: '✓ 零路由脚手架依赖' },
              { text: '✓ 页面平滑过渡与滚动复位' },
              { text: '✓ 深度集成 SEO 自动注入' }
            ]
          }
        },
        {
          type: 'CtaBlock',
          variant: '1',
          data: {
            title: '发现更多可能，即刻开始',
            description: '选择适合您的方案，一键开启 VueBlocks 现代化建站之旅。',
            buttons: [
              { btnText: '立即查看授权方案', btnLink: '/pricing', isPrimary: true, newWindow: false }
            ]
          }
        }
      ]
    },

    // 产品生态 -> 商业授权
    '/pricing': {
      seo: {
        title: '商业授权与方案价格',
        description: '简单透明的 VueBlocks 授权许可方案。开源版自由免费，商业版与企业版提供终身授权与深度技术答疑支持。'
      },
      blocks: [
        {
          type: 'HeroBlock',
          variant: '3',
          data: {
            title: '简单透明、终身授权<br>助力团队业务飞跃',
            description: '开源版永远自由使用；商业授权提供全量高保真区块、完整 Figma 源文件与专属架构师技术支持，无隐藏费用。',
            image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=60',
            imageAlt: '现代化商务会议室',
            buttons: [
              { btnText: '立即选购方案', btnLink: '#pricing-plans', isPrimary: true, newWindow: false },
              { btnText: '常见问题解答', btnLink: '#pricing-faq', isPrimary: false, newWindow: false }
            ]
          }
        },
        {
          id: 'pricing-plans',
          type: 'PricingBlock',
          variant: '1',
          data: {
            title: '选择适合您的授权方案',
            description: '所有付费方案均为一次性付费，享受终身使用权与版本大更新',
            plans: [
              {
                name: '社区开源版',
                price: '¥0',
                unit: '永久免费',
                showBadge: false,
                btnText: 'GitHub 开源获取',
                btnLink: 'https://github.com/wumacms/vue-blocks',
                newWindow: true,
                isPrimary: false,
                features: '✓ 10+ 款核心基础原子区块\n✓ MIT 开源协议商用允许\n✓ GitHub Issues 社区支持\n✓ 支持 ESM 格式包导入\n✗ 不包含高级整站渲染器\n✗ 不包含 Figma 设计源文件'
              },
              {
                name: '个人专业版',
                price: '¥299',
                unit: '一次性买断',
                showBadge: true,
                btnText: '立即获取个人授权',
                btnLink: '/contact',
                newWindow: false,
                isPrimary: true,
                features: '✓ 25+ 款全量商业级高保真区块\n✓ PageRenderer & SiteRenderer 整站引擎\n✓ 支持多变体全局一键换肤\n✓ 授权单个独立开发者商业项目\n✓ 专属技术支持群与优先答疑\n✓ 终身免费版本更新'
              },
              {
                name: '团队企业版',
                price: '¥999',
                unit: '终身永久授权',
                showBadge: false,
                btnText: '联系商务签约',
                btnLink: '/contact',
                newWindow: false,
                isPrimary: false,
                features: '✓ 包含个人专业版所有权益\n✓ 团队无限开发者与商业项目使用\n✓ 附赠全套官方 Figma 设计规范源文件\n✓ 专属微信技术支持与架构咨询\n✓ 优先需求排期与定制指导\n✓ 增值税普通发票/专用发票'
              }
            ]
          }
        },
        {
          type: 'ComparisonTableBlock',
          variant: '1',
          data: {
            title: '版本权益深度对比',
            description: '全方位对比不同版本的核心特性与服务保障',
            firstColHeader: '功能特性',
            headers: [
              { text: '社区开源版', textColor: 'text-gray-500' },
              { text: '个人专业版', textColor: 'text-indigo-600' },
              { text: '团队企业版', textColor: 'text-indigo-800' }
            ],
            rows: [
              {
                feature: '高保真商业区块数量',
                columns: [
                  { value: '10+ 款', textColor: 'text-gray-600' },
                  { value: '25+ 款全量', textColor: 'text-indigo-600 font-semibold' },
                  { value: '25+ 款全量', textColor: 'text-indigo-800 font-semibold' }
                ]
              },
              {
                feature: 'SiteRenderer 多页路由',
                columns: [
                  { value: '✗', textColor: 'text-red-400' },
                  { value: '✓', textColor: 'text-green-600' },
                  { value: '✓', textColor: 'text-green-600' }
                ]
              },
              {
                feature: '全局多变体一键换肤',
                columns: [
                  { value: '基础变体', textColor: 'text-gray-600' },
                  { value: '✓ 全变体支持', textColor: 'text-green-600' },
                  { value: '✓ 全变体支持', textColor: 'text-green-600' }
                ]
              },
              {
                feature: 'Figma 官方设计源文件',
                columns: [
                  { value: '✗', textColor: 'text-red-400' },
                  { value: '需另购', textColor: 'text-yellow-600' },
                  { value: '✓ 免费赠送', textColor: 'text-green-600 font-semibold' }
                ]
              },
              {
                feature: '授权商业项目数量',
                columns: [
                  { value: '开源项目', textColor: 'text-gray-600' },
                  { value: '个人 3 个商业项目', textColor: 'text-indigo-600' },
                  { value: '企业不限数量', textColor: 'text-green-600 font-semibold' }
                ]
              },
              {
                feature: '专属技术支持与发票',
                columns: [
                  { value: '社区互助', textColor: 'text-gray-600' },
                  { value: '专属技术群', textColor: 'text-indigo-600' },
                  { value: '1对1架构师 + 发票', textColor: 'text-green-600 font-semibold' }
                ]
              }
            ]
          }
        },
        {
          id: 'pricing-faq',
          type: 'FaqBlock',
          variant: '1',
          data: {
            title: '商业授权常见问题',
            faqs: [
              {
                question: '商业授权是一次性付费还是每年续费？',
                answer: 'VueBlocks 的商业授权（个人专业版、团队企业版）均为一次性买断制，没有每年订阅续费压力。购买后可永久使用并享受同大版本内所有后续功能迭代。'
              },
              {
                question: '是否可以将 VueBlocks 用于客户的外包交付项目？',
                answer: '可以。只要购买相应级别的商业授权，您完全可以将其用于为您的客户交付商业官网、推广页及 SaaS 系统前端，无需客户额外支付授权费用。'
              },
              {
                question: '购买企业版后是否可以开具正式发票？',
                answer: '可以。团队企业版支持开具增值税普通发票或增值税专用发票（技术服务费/软件服务费），下单后联系客服即可在线办理。'
              },
              {
                question: '组件库支持私有 npm 源或离线内网部署吗？',
                answer: '完全支持。VueBlocks 产物标准规范，支持私有 Verdaccio、Nexus 等 npm 私有源发布，或者直接作为本地工作区 Package 离线引入使用。'
              }
            ]
          }
        },
        {
          type: 'CtaBlock',
          variant: '1',
          data: {
            title: '开启高效建站，立即联系商务顾问',
            description: '如有特殊定制需求或企业集中采购咨询，欢迎随时联系。',
            buttons: [
              { btnText: '立即联系我们', btnLink: '/contact', isPrimary: true, newWindow: false }
            ]
          }
        }
      ]
    },

    // 产品生态 -> 版本动态
    '/news': {
      seo: {
        title: '版本动态与技术文章',
        description: '追踪 VueBlocks 的最新版本发布、Tailwind CSS 4 最佳实践、动态 SEO 深度解析及架构设计演进。'
      },
      blocks: [
        {
          type: 'HeroBlock',
          variant: '4',
          data: {
            title: '前沿动态与技术洞察',
            description: '深入剖析现代化落地页工程化理念，探索 Vue 3 与 Tailwind CSS 4 的极致设计哲学。',
            bgImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            buttons: [
              { btnText: '浏览精选动态', btnLink: '#news-list', isPrimary: true, newWindow: false }
            ]
          }
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
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=40',
                imageAlt: 'SEO 数据看板',
                category: '技术分享',
                date: '2026-09-15',
                title: '如何利用 Vue 3 动态 SEO 机制实现企业站点的搜索引擎最优抓取',
                summary: '分析单页面应用在搜索引擎优化中的核心痛点，详述 SiteRenderer 如何通过客户端 Meta 实时更新与静态预渲染方案实现完美的 SEO 指标。',
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
          }
        }
      ]
    },

    // 动态文章详情页
    '/news-detail': {
      seo: {
        title: 'VueBlocks v1.2.0 发布：全新 SiteRenderer 整站渲染器与全局变体支持',
        description: '正式推出 L3 级 SiteRenderer 容器，支持多页面统一路由拦截、全局变体统一换肤及动态 SEO 自动同步。'
      },
      blocks: [
        {
          type: 'NewsDetailBlock',
          variant: '1',
          data: {
            category: '重大发布',
            date: '2026-10-05',
            title: 'VueBlocks v1.2.0 发布：全新 SiteRenderer 整站渲染器与全局变体支持',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60',
            imageAlt: 'VueBlocks v1.2.0 发布图',
            body: '<p>我们非常自豪地宣布，VueBlocks v1.2.0 正式发布！在本次重大更新中，我们引入了 L3 级 <strong>SiteRenderer 整站渲染器</strong> 与 <strong>统一全局变体模式</strong>，为企业级官网与落地页搭建带来了全新的里程碑体验。</p><h3>1. 为什么需要 SiteRenderer？</h3><p>过去，开发者在使用原子区块时，仍需要自己搭建导航栏吸顶、处理多页面路由、配置 SEO Meta 以及处理页面切换滚动。SiteRenderer 彻底将这些繁重的样板代码封装为高阶容器，您只需提供一份结构化配置，即可实现拥有无刷新路由拦截、菜单高亮联动、动态 SEO 注入的企业官网。</p><h3>2. 全局统一换肤模式</h3><p>只需在 SiteRenderer 上传入 <code>variant="2"</code> 或 <code>variant="minimal"</code>，整站所有子区块将自适应同步切换风格，彻底告别单调一致的视觉疲劳。</p><h3>3. 完整的 TypeScript 与多格式支持</h3><p>全量更新了 index.d.ts，提供严密的类型提示与自动补全体验。</p>',
            tags: [
              { text: 'VueBlocks' },
              { text: 'SiteRenderer' },
              { text: 'TailwindCSS4' },
              { text: '架构发布' }
            ]
          }
        },
        {
          type: 'CtaBlock',
          variant: '1',
          data: {
            title: '立即使用 VueBlocks 搭建您的企业站点',
            description: '查阅官方文档或直接选购商业授权，享受极速开发体验。',
            buttons: [
              { btnText: '返回文章列表', btnLink: '/news', isPrimary: false, newWindow: false },
              { btnText: '选购商业授权', btnLink: '/pricing', isPrimary: true, newWindow: false }
            ]
          }
        }
      ]
    },

    // 关于团队
    '/about': {
      seo: {
        title: '关于我们与团队愿景',
        description: '了解 VueBlocks 的研发初衷与团队故事，我们致力于打造全球最优雅易用的 Vue 3 落地页与官网组件生态。'
      },
      blocks: [
        {
          type: 'HeroBlock',
          variant: '1',
          data: {
            title: '让每一位开发者都能快速构建世界级的 Web 站点',
            description: 'VueBlocks 诞生于我们对现代商业落地页极致效率与工业级设计美学的追求。我们是一群深耕前端工程与用户体验的工程师与设计师，致力于消除繁复的切图琐事，让官网搭建像拼接积木一样简单纯粹。',
            buttons: [
              { btnText: '加入开发者社区', btnLink: 'https://github.com/wumacms/vue-blocks', isPrimary: true, newWindow: true },
              { btnText: '联系商务团队', btnLink: '/contact', isPrimary: false, newWindow: false }
            ]
          }
        },
        {
          type: 'StatsBlock',
          variant: '1',
          data: {
            stats: [
              { label: '社区关注与 Star', value: '3,200+' },
              { label: '月度 npm 安装下载', value: '50,000+' },
              { label: '覆盖企业级落地站点', value: '1,500+' },
              { label: '代码测试覆盖率', value: '96%' }
            ]
          }
        },
        {
          type: 'TeamBlock',
          variant: '1',
          data: {
            title: '核心创始与研发团队',
            description: '由来自一线互联网大厂的资深前端架构师与设计专家共同倾力打造',
            members: [
              {
                name: '林远航',
                role: '创始人 & 首席架构师',
                avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=128&h=128&fit=crop'
              },
              {
                name: '赵雅静',
                role: '设计系统负责人 (Head of Design)',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop'
              },
              {
                name: '陈峰',
                role: '核心组件库负责人',
                avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=128&h=128&fit=crop'
              },
              {
                name: '韩雪',
                role: '开发者体验 (DX) 工程师',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop'
              }
            ]
          }
        },
        {
          type: 'CourseListBlock',
          variant: '1',
          data: {
            title: '官方实战专栏与最佳实践指南',
            description: '系统掌握 VueBlocks 的高阶架构用法与全链路企业级部署',
            courses: [
              {
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
                tags: [{ text: '官方精选', bgColor: 'bg-indigo-600' }],
                duration: '2 小时',
                chapters: '6 节',
                instructor: '林远航',
                title: 'VueBlocks 实战：从零构建高转化企业官网',
                description: '从零讲解 SiteRenderer 核心机制、数据结构设计与全局多变体定制，手把手完成多页商业站点交付。',
                ratingStars: '★★★★★',
                ratingCount: '198',
                price: '免费公开',
                btnText: '立即学习',
                link: '#',
                newWindow: false
              },
              {
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=60',
                tags: [{ text: '高阶进阶', bgColor: 'bg-emerald-500' }],
                duration: '3.5 小时',
                chapters: '8 节',
                instructor: '陈峰',
                title: 'Tailwind CSS 4 与现代组件库架构设计',
                description: '深入组件库打包工程化、动态样式合并策略与 TypeScript 强类型体系设计，构建工业级前端资产库。',
                ratingStars: '★★★★★',
                ratingCount: '156',
                price: '免费公开',
                btnText: '立即学习',
                link: '#',
                newWindow: false
              }
            ],
            moreText: '返回产品生态',
            moreLink: '/features'
          }
        }
      ]
    },

    // 商业咨询
    '/contact': {
      seo: {
        title: '商业咨询与技术支持',
        description: '如有商业授权购买、企业私有化部署、技术咨询或定制开发需求，欢迎随时与 VueBlocks 官方团队取得联系。'
      },
      blocks: [
        {
          type: 'ContactFormBlock',
          variant: '1',
          data: {
            title: '随时与 VueBlocks 官方团队取得联系',
            description: '请在下方表单中填写您的企业信息与诉求，我们的高级技术顾问将在 2 个工作小时内与您对接。',
            nameLabel: '您的称呼',
            companyLabel: '公司 / 团队名称',
            emailLabel: '工作邮箱',
            subjectLabel: '咨询诉求类型',
            subjectOptions: [
              { label: '商业授权购买咨询', value: 'licensing' },
              { label: '企业私有化部署支持', value: 'enterprise' },
              { label: '专属定制区块开发', value: 'customization' },
              { label: '商务与生态合作', value: 'partnership' }
            ],
            messageLabel: '详细需求描述',
            submitText: '立即提交咨询',
            footerNote: '我们严格保护您的商业隐私，所有信息仅用于本次商务沟通，绝不对外泄露。'
          }
        },
        {
          type: 'FaqBlock',
          variant: '1',
          data: {
            title: '售前常见疑问',
            faqs: [
              {
                question: '提交表单后多久能得到响应？',
                answer: '我们在工作日（周一至周五 9:00 - 18:00）提供 2 小时内的极速邮件与电话响应，非工作日一般在 24 小时内回复。'
              },
              {
                question: '是否支持签订正式的企业采购合同？',
                answer: '支持。团队企业版客户支持线上电子签约或线下纸质合同盖章邮寄，合规便捷。'
              },
              {
                question: '能否安排专属架构师进行远程技术答疑或演示？',
                answer: '对于企业版意向客户，我们提供一次时长 45 分钟的远程腾讯会议/飞书会议产品架构答疑与功能演示。'
              }
            ]
          }
        }
      ]
    },

    // 404 兜底页
    '/404': {
      seo: {
        title: '404 - 页面未找到',
        description: '抱歉，您访问的页面不存在或已被移除。'
      },
      blocks: [
        {
          type: 'HeroBlock',
          variant: '1',
          data: {
            title: '404 - 页面未找到',
            description: '抱歉，您访问的页面不存在或已被移除。您可以返回官方首页或浏览产品生态区块全景。',
            buttons: [
              { btnText: '返回官方首页', btnLink: '/', isPrimary: true, newWindow: false },
              { btnText: '浏览所有区块', btnLink: '/features', isPrimary: false, newWindow: false }
            ]
          }
        }
      ]
    }
  },

  // 3. 全站持久化页脚
  footer: {
    type: 'FooterBlock',
    variant: '1',
    data: {
      brandName: 'VueBlocks',
      logo: 'https://placehold.co/32x32/4F46E5/white?text=VB',
      copyright: '© 2026 VueBlocks. 基于 MIT 开源协议构建 · 企业级全栈积木式建站解决方案 · 保留所有权利。'
    }
  }
}

export default defaultData
