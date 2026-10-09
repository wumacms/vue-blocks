import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'
import { join } from 'node:path'

const base = (process.env.VITEPRESS_BASE || '/') as `/${string}/` | '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  title: 'VueBlocks',
  description: '基于 Vue 3 + Tailwind CSS 4 的企业落地页区块组件库',
  head: [['link', { rel: 'icon', href: `${base}images/favicon.ico` }]],
  themeConfig: {
    logo: '/images/logo.png',
    siteTitle: 'VueBlocks',
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3]
    },
    nav: [
      { text: '指南', link: '/guide/install' },
      { text: '区块组件', link: '/component/navbar' },
      {
        text: '在线演示',
        link: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : '/examples/',
        target: '_blank'
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '安装指南', link: '/guide/install' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '架构与覆盖规范', link: '/guide/architecture' }
          ]
        }
      ],
      '/component/': [
        {
          text: '页面与站点编排',
          items: [
            { text: 'SiteRenderer 站点渲染器', link: '/component/site-renderer' },
            { text: 'PageRenderer 页面渲染器', link: '/component/page-renderer' }
          ]
        },
        {
          text: '基础区块',
          items: [
            { text: 'Navbar 导航栏', link: '/component/navbar' },
            { text: 'Hero 主视觉', link: '/component/hero' },
            { text: 'Partners 合作伙伴', link: '/component/partners' },
            { text: 'Footer 页脚', link: '/component/footer' }
          ]
        },
        {
          text: '内容展示区块',
          items: [
            { text: 'Features 特性卡片', link: '/component/features' },
            { text: 'TopTextBottomImage 上文下图', link: '/component/top-text-bottom-image' },
            { text: 'Stats 数据统计', link: '/component/stats' },
            { text: 'LeftImageRightText 左图右文', link: '/component/left-image-right-text' },
            { text: 'RightImageLeftText 左文右图', link: '/component/right-image-left-text' },
            { text: 'IconWall 生产力图标墙', link: '/component/icon-wall' }
          ]
        },
        {
          text: '业务与转化区块',
          items: [
            { text: 'Pricing 价格方案', link: '/component/pricing' },
            { text: 'ComparisonTable 对比表格', link: '/component/comparison-table' },
            { text: 'Cta 行动号召', link: '/component/cta' },
            { text: 'Testimonials 客户评价', link: '/component/testimonials' },
            { text: 'Faq 常见问题 (手风琴)', link: '/component/faq' },
            { text: 'ContactForm 联系表单', link: '/component/contact-form' }
          ]
        },
        {
          text: '列表与资讯区块',
          items: [
            { text: 'ServiceList 服务列表', link: '/component/service-list' },
            { text: 'ProductList 产品列表', link: '/component/product-list' },
            { text: 'CourseList 课程列表', link: '/component/course-list' },
            { text: 'Team 核心团队', link: '/component/team' },
            { text: 'NewsList 资讯列表', link: '/component/news-list' },
            { text: 'NewsDetail 资讯详情', link: '/component/news-detail' }
          ]
        }
      ]
    },

    footer: {
      message: '基于 MIT 协议开放源码',
      copyright: 'Copyright © 2026-present VueBlocks'
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/wumacms/vue-blocks' }]
  },

  vite: {
    plugins: [
      tailwindcss() as any
    ],
    resolve: {
      alias: {
        'vue-blocks': join(__dirname, '../../packages'),
        '@vue-blocks/components': join(__dirname, '../../packages/components'),
        '@vue-blocks/utils': join(__dirname, '../../packages/utils')
      }
    }
  }
})
