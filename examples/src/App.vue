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
const globalVariant = ref('1')
const footerEl = ref(null)

// Custom data override example for Hero
const customHeroData = {
  title: '下一代智能协作平台<br><span class="text-indigo-600 dark:text-indigo-400">连接企业每一个节点</span>',
  description: '全链路打通工作流，提供沉浸式团队沟通、数据智能洞察与开箱即用的落地页区块组件库。'
}

const customHeroDataEditorial = {
  title: '让企业效率<br><span class="text-[#cc785c]">提升 10 倍</span>',
  description: 'NovaStack 帮助企业打通数据孤岛，自动化重复流程，让团队专注于真正创造价值的工作。'
}

// Custom styles override example for Features
const customFeaturesStyles = {
  root: 'py-24 bg-gradient-to-b from-indigo-50/50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'
}

// PageRenderer 数据驱动页面配置（支持响应式关联 globalVariant）
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
      variant: globalVariant.value,
      data: {
        title: globalVariant.value === '3'
          ? '让企业协作<br><span class="text-[#cc785c]">回归专注与理性</span>'
          : '下一代智能协作平台<br><span class="text-indigo-600 dark:text-indigo-400">由 PageRenderer 数据驱动</span>',
        description: '无需繁琐手动引入 22 个组件，仅需一份 JSON 配置即可自动渲染企业级落地页。'
      }
    },
    { id: 'partners', type: 'PartnersBlock', variant: globalVariant.value },
    { id: 'features', type: 'FeaturesBlock', variant: globalVariant.value, styles: globalVariant.value === '1' ? customFeaturesStyles : {} },
    { id: 'top-image', type: 'TopTextBottomImageBlock', variant: globalVariant.value },
    { id: 'stats', type: 'StatsBlock', variant: globalVariant.value },
    { id: 'testimonials', type: 'TestimonialsBlock', variant: globalVariant.value },
    { id: 'pricing', type: 'PricingBlock', variant: globalVariant.value },
    { id: 'faq', type: 'FaqBlock', variant: globalVariant.value },
    { id: 'cta', type: 'CtaBlock', variant: globalVariant.value },
    { id: 'contact', type: 'ContactFormBlock', variant: globalVariant.value }
  ]
}))

function handleContactSubmit(formData, context) {
  const fromInfo = context?.block ? `（来源区块: ${context.block.id || context.block.type}）` : ''
  alert(`提交成功！感谢 ${formData.name} 的留言。\n我们已向 ${formData.email} 发送确认函。${fromInfo}`)
}
</script>

<template>
  <div
    :class="[
      'min-h-screen font-sans transition-colors duration-300',
      globalVariant === '3'
        ? 'bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5]'
        : globalVariant === '2'
          ? 'bg-[#e9e2ff] dark:bg-[#1a103d] text-[#120b48] dark:text-white'
          : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
    ]"
  >
    <!-- 底部悬浮模式切换开关（避开顶部固定/吸顶导航栏，居中展示） -->
    <div
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/90 dark:border-gray-700/90 shadow-2xl rounded-full p-1.5 text-xs font-medium">
      <button
        @click="renderMode = 'site'"
        :class="[
          'px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5',
          renderMode === 'site'
            ? globalVariant === '3'
              ? 'bg-[#cc785c] text-white shadow-sm font-semibold'
              : globalVariant === '2'
                ? 'bg-[#120b48] text-white dark:bg-[#ffb347] dark:text-[#120b48] font-bold shadow-sm'
                : 'bg-indigo-600 text-white shadow-sm font-semibold'
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
            ? globalVariant === '3'
              ? 'bg-[#cc785c] text-white shadow-sm font-semibold'
              : globalVariant === '2'
                ? 'bg-[#120b48] text-white dark:bg-[#ffb347] dark:text-[#120b48] font-bold shadow-sm'
                : 'bg-indigo-600 text-white shadow-sm font-semibold'
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
            ? globalVariant === '3'
              ? 'bg-[#cc785c] text-white shadow-sm font-semibold'
              : globalVariant === '2'
                ? 'bg-[#120b48] text-white dark:bg-[#ffb347] dark:text-[#120b48] font-bold shadow-sm'
                : 'bg-indigo-600 text-white shadow-sm font-semibold'
            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
        ]">
        <span>📑</span>
        <span>手动平铺</span>
      </button>
    </div>

    <!-- 悬浮控制台：主题模式切换与全站/Hero 变体切换（自动避让页脚） -->
    <FloatingToolbar v-model="globalVariant" :footer-el="footerEl" />

    <!-- 模式 1：SiteRenderer 多页面全站渲染（支持通过 floatingToolbar 统一切换变体） -->
    <div v-if="renderMode === 'site'">
      <SiteRenderer :variant="globalVariant" route-mode="hash" />
    </div>

    <!-- 模式 2：PageRenderer 数据驱动渲染（传入可选 navbar 与 footer 参数） -->
    <div v-else-if="renderMode === 'renderer'">
      <PageRenderer
        :variant="globalVariant"
        :data="dynamicPageData"
        :navbar="NavbarBlock"
        :footer="FooterBlock"
        @submit="handleContactSubmit"
      />
    </div>

    <!-- 模式 3：手动平铺全部区块 -->
    <div v-else>
      <!-- 1. 导航栏 -->
      <NavbarBlock :variant="globalVariant" />

      <!-- 2. Hero 区块 -->
      <HeroBlock
        :variant="globalVariant"
        :data="globalVariant === '1' ? customHeroData : globalVariant === '3' ? customHeroDataEditorial : {}"
      >
        <!-- 插槽演示：自定义增强行动按钮，演示跨风格变体无损透传 -->
        <template #actions="{ buttons }">
          <div class="flex flex-wrap gap-4 justify-center items-center">
            <a
              :href="buttons?.[0]?.btnLink || '#'"
              :class="[
                'px-8 py-3.5 transition flex items-center gap-2 cursor-pointer',
                globalVariant === '1'
                  ? 'rounded-full font-bold shadow-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white'
                  : globalVariant === '2'
                    ? 'rounded-full font-bold shadow-[4px_4px_0_#ff5c8a] hover:shadow-[1px_1px_0_#ff5c8a] bg-[#ffb347] text-[#120b48] border-3 border-[#120b48]'
                    : 'rounded-md font-medium text-sm shadow-xs bg-[#cc785c] hover:bg-[#b8684e] text-white'
              ]"
            >
              <span>⚡</span>
              <span>{{ buttons?.[0]?.btnText || '立即免费体验' }} <span class="text-xs opacity-80">(自定义插槽)</span></span>
            </a>
            <a
              :href="buttons?.[1]?.btnLink || '#'"
              :class="[
                'px-6 py-3 transition cursor-pointer',
                globalVariant === '1'
                  ? 'rounded-full font-medium bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  : globalVariant === '2'
                    ? 'rounded-full font-bold bg-white dark:bg-[#2c1b6b] text-[#120b48] dark:text-white border-3 border-[#120b48] dark:border-[#ffb347] shadow-[4px_4px_0_#b47aff]'
                    : 'rounded-md font-medium text-sm border border-[#e6dfd8] dark:border-[#2a2824] bg-[#faf9f5] dark:bg-[#1f1e1b] text-[#141413] dark:text-[#faf9f5] hover:bg-[#f5f0e8] dark:hover:bg-[#252320]'
              ]"
            >
              {{ buttons?.[1]?.btnText || '预约产品演示' }}
            </a>
          </div>
        </template>
      </HeroBlock>

      <!-- 3. 合作伙伴区块 -->
      <PartnersBlock :variant="globalVariant" />

      <!-- 4. 特性区块 -->
      <FeaturesBlock :variant="globalVariant" :styles="globalVariant === '1' ? customFeaturesStyles : {}" />

      <!-- 5. 上文下图区块 -->
      <TopTextBottomImageBlock :variant="globalVariant" />

      <!-- 6. 统计区块 -->
      <StatsBlock :variant="globalVariant" />

      <!-- 7. 左图右文 -->
      <LeftImageRightTextBlock :variant="globalVariant" />

      <!-- 8. 左文右图 -->
      <RightImageLeftTextBlock :variant="globalVariant" />

      <!-- 9. 图标墙区块 -->
      <IconWallBlock :variant="globalVariant" />

      <!-- 10. 服务列表区块 -->
      <ServiceListBlock :variant="globalVariant" />

      <!-- 11. 产品列表区块 -->
      <ProductListBlock :variant="globalVariant" />

      <!-- 12. 课程列表区块 -->
      <CourseListBlock :variant="globalVariant" />

      <!-- 13. 客户评价区块 -->
      <TestimonialsBlock :variant="globalVariant" />

      <!-- 14. 团队区块 -->
      <TeamBlock :variant="globalVariant" />

      <!-- 15. 价格区块 -->
      <PricingBlock :variant="globalVariant" />

      <!-- 16. 对比表格区块 -->
      <ComparisonTableBlock :variant="globalVariant" />

      <!-- 17. 新闻列表区块 -->
      <NewsListBlock :variant="globalVariant" />

      <!-- 18. 新闻详情区块 -->
      <NewsDetailBlock :variant="globalVariant" />

      <!-- 19. 常见问题区块 -->
      <FaqBlock :variant="globalVariant" />

      <!-- 20. 号召区块 (CTA) -->
      <CtaBlock :variant="globalVariant" />

      <!-- 21. 联系表单区块 -->
      <ContactFormBlock :variant="globalVariant" @submit="handleContactSubmit" />

      <!-- 22. 页脚区块 -->
      <div ref="footerEl">
        <FooterBlock :variant="globalVariant" />
      </div>
    </div>
  </div>
</template>
