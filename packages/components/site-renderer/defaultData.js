export const defaultData = {
  containerClass: 'min-h-screen bg-slate-50 text-slate-900 flex flex-col',
  routeMode: 'hash',
  defaultPath: '/',
  siteTitle: 'VueBlocks 官方网站',

  // 全站持久化导航栏
  navbar: {
    type: 'NavbarBlock',
    variant: '1',
    data: {
      brandName: 'VueBlocks',
      logo: 'https://placehold.co/36x36/4F46E5/white?text=VB',
      navLinks: [
        { text: '首页', link: '/' },
        { text: '产品特性', link: '/features' },
        { text: '关于我们', link: '/about' },
        { text: '联系咨询', link: '/contact' }
      ],
      buttons: [
        { btnText: '立即体验', btnLink: '/contact', isPrimary: true, newWindow: false }
      ]
    }
  },

  // 多页面数据集合
  pages: {
    '/': {
      seo: {
        title: '首页',
        description: '基于 Vue 3 + Tailwind CSS 的积木式全栈建站解决方案，高保真开箱即用。',
        keywords: ['Vue3', 'TailwindCSS', '落地页', '组件库', '低代码']
      },
      blocks: [
        {
          type: 'HeroBlock',
          variant: '1',
          data: {
            title: '构建高转化企业官网的积木式组件库',
            description: '基于 Vue 3 和 Tailwind CSS 4 设计，数十款高保真区块，从单页面到多页面站点一键渲染。',
            buttons: [
              { btnText: '探索特性', btnLink: '/features', isPrimary: true },
              { btnText: '联系我们', btnLink: '/contact', isPrimary: false }
            ]
          }
        },
        {
          type: 'StatsBlock',
          variant: '1'
        },
        {
          type: 'FeaturesBlock',
          variant: '1',
          data: {
            title: '为什么选择 VueBlocks',
            description: '为现代 Web 应用量身定制，兼顾极致的开发体验与设计美学。'
          }
        },
        {
          type: 'CtaBlock',
          variant: '1',
          data: {
            title: '立即开始搭建属于您的企业官方站点',
            description: '只需准备一份结构化 JSON 数据，即可通过 SiteRenderer 完成整站发布。',
            buttons: [
              { btnText: '快速开始', btnLink: '/contact', isPrimary: true }
            ]
          }
        }
      ]
    },
    '/features': {
      seo: {
        title: '产品特性',
        description: '深入了解 VueBlocks 的组件体系与核心能力。'
      },
      blocks: [
        {
          type: 'HeroBlock',
          variant: '2',
          data: {
            title: '丰富、模块化、高可定制的区块生态',
            description: '涵盖 Hero 主视觉、特性介绍、定价方案、数据统计等全链路官网需求。'
          }
        },
        {
          type: 'FeaturesBlock',
          variant: '1'
        }
      ]
    },
    '/about': {
      seo: {
        title: '关于我们',
        description: '了解 VueBlocks 的研发初衷与团队故事。'
      },
      blocks: [
        {
          type: 'HeroBlock',
          variant: '3',
          data: {
            title: '赋能每一位开发者与企业轻松建站',
            description: '我们致力于打造最优雅易用的 Vue 3 落地页与官网组件生态。'
          }
        },
        {
          type: 'TeamBlock',
          variant: '1'
        }
      ]
    },
    '/contact': {
      seo: {
        title: '联系咨询',
        description: '与我们的业务与技术专家取得联系。'
      },
      blocks: [
        {
          type: 'ContactFormBlock',
          variant: '1',
          data: {
            title: '随时与我们取得联系',
            description: '请填写下方表单，我们的专属顾问将在 24 小时内与您联系。'
          }
        },
        {
          type: 'FaqBlock',
          variant: '1'
        }
      ]
    }
  },

  // 全站持久化页脚
  footer: {
    type: 'FooterBlock',
    variant: '1',
    data: {
      brandName: 'VueBlocks',
      logo: 'https://placehold.co/32x32/4F46E5/white?text=VB',
      copyright: '© 2026 VueBlocks. 基于 MIT 协议开源。保留所有权利。'
    }
  }
}

export default defaultData
