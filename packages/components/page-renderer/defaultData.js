export const defaultData = {
  seo: {
    title: 'VueBlocks - 高性能企业级落地页组件库',
    description: '无需从零手写，仅需一份 JSON 配置即可自动渲染高保真、语义化、无障碍的企业级落地页。',
    keywords: 'Vue3, TailwindCSS, 落地页, 页面渲染器, PageRenderer'
  },
  containerClass: 'min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100',
  navbar: {
    type: 'NavbarBlock'
  },
  blocks: [
    {
      id: 'hero',
      type: 'HeroBlock',
      variant: '1'
    },
    {
      id: 'features',
      type: 'FeaturesBlock',
      variant: '1'
    },
    {
      id: 'contact',
      type: 'ContactFormBlock'
    }
  ],
  footer: {
    type: 'FooterBlock'
  }
}

export default defaultData
