<script setup>
import { ref, computed, watch } from 'vue'
import {
  SiteRenderer,
  PageRenderer,
  NavbarBlock,
  FooterBlock
} from 'vue-blocks'
import FloatingToolbar from './components/FloatingToolbar.vue'

// 1. 渲染模式配置
const MODES = [
  { value: 'site', label: 'SiteRenderer 多页面站点', icon: '🌐' },
  { value: 'renderer', label: 'PageRenderer 单页', icon: '🚀' }
]

// 安全读取 localStorage
function getStoredValue(key, validValues, fallback) {
  try {
    const val = localStorage.getItem(key)
    if (val && validValues.includes(val)) {
      return val
    }
  } catch {
    // 忽略安全沙箱或隐身模式异常
  }
  return fallback
}

// 安全写入 localStorage
function setStoredValue(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // 忽略配额或安全沙箱异常
  }
}

// 持久化存储状态：渲染模式与全局风格变体
const renderMode = ref(getStoredValue('vb-render-mode', ['site', 'renderer'], 'site'))
const globalVariant = ref(getStoredValue('vb-variant', ['1', '2', '3', '4'], '1'))

// 监听变动并实时保存至 localStorage
watch(renderMode, (newVal) => {
  setStoredValue('vb-render-mode', newVal)
})

watch(globalVariant, (newVal) => {
  setStoredValue('vb-variant', newVal)
})

// 2. 变体与主题容器背景样式映射
const themeContainerClass = computed(() => {
  const map = {
    '4': 'bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100',
    '3': 'bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5]',
    '2': 'bg-[#e9e2ff] dark:bg-[#1a103d] text-[#120b48] dark:text-white',
    '1': 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
  }
  return map[globalVariant.value] || map['1']
})

// 3. 模式切换按钮高亮色映射
const activeTabClass = computed(() => {
  const map = {
    '4': 'bg-indigo-800 text-white dark:bg-indigo-500 font-bold shadow-sm',
    '3': 'bg-[#cc785c] text-white shadow-sm font-semibold',
    '2': 'bg-[#120b48] text-white dark:bg-[#ffb347] dark:text-[#120b48] font-bold shadow-sm',
    '1': 'bg-indigo-600 text-white shadow-sm font-semibold'
  }
  return map[globalVariant.value] || map['1']
})

// 4. 自定义样式覆盖示例（以 FeaturesBlock 渐变背景为例）
const customFeaturesStyles = {
  root: 'py-24 bg-gradient-to-b from-indigo-50/50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'
}

// 5. Hero 标语随变体自适应
const heroTitleMap = {
  '4': '从零到架构师<br><span class="text-amber-400">实战 就业</span>',
  '3': '让企业协作<br><span class="text-[#cc785c]">回归专注与理性</span>',
  '2': '突破规则束缚<br><span class="text-[#ff5c8a]">重构数字视觉体验</span>',
  '1': '下一代智能协作平台<br><span class="text-indigo-600 dark:text-indigo-400">由 PageRenderer 数据驱动</span>'
}

// 6. PageRenderer 数据驱动配置（所有子区块自动继承外层 PageRenderer 的 :variant 全局渗透）
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
      data: {
        title: heroTitleMap[globalVariant.value] || heroTitleMap['1'],
        description: '无需繁琐手动引入 22 个组件，仅需一份 JSON 配置即可自动渲染企业级落地页。'
      }
    },
    { id: 'partners', type: 'PartnersBlock' },
    {
      id: 'features',
      type: 'FeaturesBlock',
      styles: globalVariant.value === '1' ? customFeaturesStyles : {}
    },
    { id: 'top-image', type: 'TopTextBottomImageBlock' },
    { id: 'stats', type: 'StatsBlock' },
    { id: 'left-image', type: 'LeftImageRightTextBlock' },
    { id: 'right-image', type: 'RightImageLeftTextBlock' },
    { id: 'icon-wall', type: 'IconWallBlock' },
    { id: 'service-list', type: 'ServiceListBlock' },
    { id: 'product-list', type: 'ProductListBlock' },
    { id: 'course-list', type: 'CourseListBlock' },
    { id: 'testimonials', type: 'TestimonialsBlock' },
    { id: 'team', type: 'TeamBlock' },
    { id: 'pricing', type: 'PricingBlock' },
    { id: 'comparison', type: 'ComparisonTableBlock' },
    { id: 'news-list', type: 'NewsListBlock' },
    { id: 'news-detail', type: 'NewsDetailBlock' },
    { id: 'faq', type: 'FaqBlock' },
    { id: 'cta', type: 'CtaBlock' },
    { id: 'contact', type: 'ContactFormBlock' }
  ]
}))

function handleContactSubmit(formData, context) {
  const fromInfo = context?.block ? `（来源区块: ${context.block.id || context.block.type}）` : ''
  alert(`提交成功！感谢 ${formData.name} 的留言。\n我们已向 ${formData.email} 发送确认函。${fromInfo}`)
}
</script>

<template>
  <div :class="['min-h-screen font-sans transition-colors duration-300', themeContainerClass]">
    <!-- 底部悬浮模式切换开关（避开顶部固定/吸顶导航栏，居中展示） -->
    <div
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/90 dark:border-gray-700/90 shadow-2xl rounded-full p-1.5 text-xs font-medium"
      role="tablist" aria-label="页面渲染模式切换">
      <button v-for="mode in MODES" :key="mode.value" role="tab" :aria-selected="renderMode === mode.value"
        @click="renderMode = mode.value" :class="[
          'px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5',
          renderMode === mode.value
            ? activeTabClass
            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
        ]">
        <span>{{ mode.icon }}</span>
        <span>{{ mode.label }}</span>
      </button>
    </div>

    <!-- 悬浮控制台：主题模式切换与全站/Hero 变体切换（自动避让页脚） -->
    <FloatingToolbar v-model="globalVariant" />

    <!-- 模式 1：SiteRenderer 多页面全站渲染（支持通过 floatingToolbar 统一切换变体） -->
    <div v-if="renderMode === 'site'">
      <SiteRenderer :variant="globalVariant" route-mode="hash" />
    </div>

    <!-- 模式 2：PageRenderer 数据驱动渲染（传入可选 navbar 与 footer 参数） -->
    <div v-else>
      <PageRenderer :variant="globalVariant" :data="dynamicPageData" :navbar="NavbarBlock" :footer="FooterBlock"
        @submit="handleContactSubmit" />
    </div>
  </div>
</template>
