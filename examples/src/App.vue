<script setup>
import { ref } from 'vue'
import {
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

function handleContactSubmit(formData) {
  alert(`提交成功！感谢 ${formData.name} 的留言。\n我们已向 ${formData.email} 发送确认函。`)
}
</script>

<template>
  <div
    class="min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- 悬浮控制台：主题模式切换与 Hero 变体切换（自动避让页脚） -->
    <FloatingToolbar v-model="heroVariant" :footer-el="footerEl" />

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
</template>
