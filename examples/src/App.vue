<script setup>
import { ref, computed } from 'vue'
import {
  SiteRenderer,
  PageRenderer,
  NavbarBlock,
  HeroBlock,
  PartnersBlock,
  FeaturesBlock,
  TopTextBottomImageBlock,
  StatsBlock,
  LeftImageRightTextBlock,
  RightImageLeftTextBlock,
  IconWallBlock,
  ServiceListBlock,
  ProductListBlock,
  CourseListBlock,
  TestimonialsBlock,
  PricingBlock,
  ComparisonTableBlock,
  NewsListBlock,
  NewsDetailBlock,
  FaqBlock,
  CtaBlock,
  ContactFormBlock,
  TeamBlock,
  FooterBlock
} from 'vue-blocks'
import FloatingToolbar from './components/FloatingToolbar.vue'

const renderMode = ref('site') // 'site' | 'renderer' | 'manual'
const heroVariant = ref('1')
const footerEl = ref(null)

// Custom data override example for Hero
const customHeroData = {
  title: '下一代智能协作平台<br><span class="text-indigo-600 dark:text-indigo-400">连接企业每一个节点</span>',
  description: '全链路打通工作流，提供沉浸式团队沟通、数据智能洞察与开箱即用的落地页区块组件库。'
}

// Custom styles override example for Features
const customFeaturesStyles = {
  root: 'py-24 bg-gradient-to-b from-indigo-50/50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'
}

// PageRenderer 数据驱动页面配置（支持响应式关联 heroVariant）
const dynamicPageData = computed(() => ({
  seo: {
    title: 'VueBlocks - 数据驱动落地页渲染示例',
    description: '无需繁琐手动引入组件，仅需一份 JSON 配置即可自动渲染企业级落地页。',
    keywords: 'Vue3, TailwindCSS, 落地页, PageRenderer'
  },
  containerClass: 'space-y-0',
  blocks: [
    {
      id: 'hero',
      type: 'HeroBlock',
      variant: heroVariant.value,
      data: {
        title: '下一代智能协作平台<br><span class="text-indigo-600 dark:text-indigo-400">由 PageRenderer 数据驱动</span>',
        description: '无需繁琐手动引入 22 个组件，仅需一份 JSON 配置即可自动渲染企业级落地页。'
      }
    },
    { id: 'partners', type: 'PartnersBlock' },
    { id: 'features', type: 'FeaturesBlock', variant: '1', styles: customFeaturesStyles },
    { id: 'stats', type: 'StatsBlock' },
    { id: 'pricing', type: 'PricingBlock' },
    { id: 'faq', type: 'FaqBlock' },
    { id: 'contact', type: 'ContactFormBlock' }
  ]
}))

function handleContactSubmit(formData, context) {
  const fromInfo = context?.block ? `（来源区块: ${context.block.id || context.block.type}）` : ''
  alert(`提交成功！感谢 ${formData.name} 的留言。\n我们已向 ${formData.email} 发送确认函。${fromInfo}`)
}
</script>

<template>
  <div
    class="min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- 底部悬浮模式切换开关（避开顶部固定/吸顶导航栏，居中展示） -->
    <div
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/90 dark:border-gray-700/90 shadow-2xl rounded-full p-1.5 text-xs font-medium">
      <button
        @click="renderMode = 'site'"
        :class="[
          'px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5',
          renderMode === 'site'
            ? 'bg-indigo-600 text-white shadow-sm font-semibold'
            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
        ]">
        <span>🌐</span>
        <span>SiteRenderer 多页面站点</span>
      </button>
      <button
        @click="renderMode = 'renderer'"
        :class="[
          'px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5',
          renderMode === 'renderer'
            ? 'bg-indigo-600 text-white shadow-sm font-semibold'
            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
        ]">
        <span>🚀</span>
        <span>PageRenderer 单页</span>
      </button>
      <button
        @click="renderMode = 'manual'"
        :class="[
          'px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5',
          renderMode === 'manual'
            ? 'bg-indigo-600 text-white shadow-sm font-semibold'
            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
        ]">
        <span>📑</span>
        <span>手动平铺</span>
      </button>
    </div>

    <!-- 悬浮控制台：主题模式切换与全站/Hero 变体切换（自动避让页脚） -->
    <FloatingToolbar v-model="heroVariant" :footer-el="footerEl" />

    <!-- 模式 1：SiteRenderer 多页面全站渲染（支持通过 floatingToolbar 统一切换变体） -->
    <div v-if="renderMode === 'site'">
      <SiteRenderer :variant="heroVariant" route-mode="hash" />
    </div>

    <!-- 模式 2：PageRenderer 数据驱动渲染（传入可选 navbar 与 footer 参数） -->
    <div v-else-if="renderMode === 'renderer'">
      <PageRenderer
        :data="dynamicPageData"
        :navbar="NavbarBlock"
        :footer="FooterBlock"
        @submit="handleContactSubmit"
      />
    </div>

    <!-- 模式 3：手动平铺全部区块 -->
    <div v-else>
      <!-- 1. 导航栏 (零配置渲染) -->
      <NavbarBlock />

      <!-- 2. Hero 区块 (支持变体切换 + 数据与样式覆盖测试) -->
      <HeroBlock :variant="heroVariant" :data="heroVariant === '1' ? customHeroData : {}" />

      <!-- 3. 合作伙伴区块 -->
      <PartnersBlock />

      <!-- 4. 特性区块 (样式覆盖测试) -->
      <FeaturesBlock :styles="customFeaturesStyles" />

      <!-- 5. 上文下图区块 -->
      <TopTextBottomImageBlock />

      <!-- 6. 统计区块 -->
      <StatsBlock />

      <!-- 7. 左图右文 -->
      <LeftImageRightTextBlock />

      <!-- 8. 左文右图 -->
      <RightImageLeftTextBlock />

      <!-- 9. 图标墙区块 -->
      <IconWallBlock />

      <!-- 10. 服务列表区块 -->
      <ServiceListBlock />

      <!-- 11. 产品列表区块 -->
      <ProductListBlock />

      <!-- 12. 课程列表区块 -->
      <CourseListBlock />

      <!-- 13. 客户评价区块 -->
      <TestimonialsBlock />

      <!-- 14. 团队区块 -->
      <TeamBlock />

      <!-- 15. 价格区块 -->
      <PricingBlock />

      <!-- 16. 对比表格区块 -->
      <ComparisonTableBlock />

      <!-- 17. 新闻列表区块 -->
      <NewsListBlock />

      <!-- 18. 新闻详情区块 -->
      <NewsDetailBlock />

      <!-- 19. 常见问题区块 (交互式折叠手风琴) -->
      <FaqBlock />

      <!-- 20. 号召区块 (CTA) -->
      <CtaBlock />

      <!-- 21. 联系表单区块 (支持响应式表单事件) -->
      <ContactFormBlock @submit="handleContactSubmit" />

      <!-- 22. 页脚区块 -->
      <div ref="footerEl">
        <FooterBlock />
      </div>
    </div>
  </div>
</template>
