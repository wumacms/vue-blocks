<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
  SiteRenderer,
  PageRenderer,
  NavbarBlock,
  FooterBlock,
  THEME_HUES
} from 'vue-blocks'
import FloatingToolbar from './components/FloatingToolbar.vue'
import VisualBuilder from './components/VisualBuilder.vue'
import { loadStoredPages, saveStoredPages } from './utils/storage.js'

// 1. 独立路由机制（解耦模式切换与全屏搭建界面）
// 支持直接访问 http://localhost:5173/#/builder 或 http://localhost:5173/#/builder?page=pricing
const currentHash = ref(typeof window !== 'undefined' ? window.location.hash || '#/' : '#/')

function updateCurrentHash() {
  currentHash.value = window.location.hash || '#/'
}

onMounted(() => {
  window.addEventListener('hashchange', updateCurrentHash)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', updateCurrentHash)
})

const isBuilderRoute = computed(() => {
  return currentHash.value.startsWith('#/builder')
})

// 从 hash query 中解析当前指定编辑的页面 ID
const builderActivePageId = computed(() => {
  if (!isBuilderRoute.value) return 'home'
  const queryIndex = currentHash.value.indexOf('?')
  if (queryIndex !== -1) {
    const params = new URLSearchParams(currentHash.value.slice(queryIndex))
    return params.get('page') || 'home'
  }
  return 'home'
})

// 2. 多页面数据源持久化管理（不引入 Pinia，基于 Vue 3 响应式 + localStorage）
const builderPages = ref(loadStoredPages())

// 保存成功提示状态
const saveToast = ref({ show: false, message: '' })
let toastTimer = null

function handleBuilderSave({ allPages }) {
  builderPages.value = allPages
  saveStoredPages(allPages)
  saveToast.value = { show: true, message: '🎉 页面配置已成功保存！' }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    saveToast.value.show = false
  }, 2500)
}

function handleBuilderChange({ allPages }) {
  // 草稿态变更由 VisualBuilder 内部自治响应，仅在用户显式保存(@save)时由 handleBuilderSave 统一持久化，彻底打破无限回环
}

function exitBuilder() {
  window.location.hash = '#/'
}

// 3. 前台展示模式配置（SiteRenderer 多页面站点 vs PageRenderer 单页）
const SITE_MODES = [
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

// 持久化存储状态：展示模式、全局风格变体与动态色彩主题
const renderMode = ref(getStoredValue('vb-render-mode', ['site', 'renderer'], 'site'))
const globalVariant = ref(getStoredValue('vb-variant', ['1', '2', '3', '4'], '1'))
const globalTheme = ref(getStoredValue('vb-theme', Object.keys(THEME_HUES), 'blue'))
const globalMode = ref(getStoredValue('vb-mode', ['light', 'dark'], 'light'))

// 监听变动并实时保存至 localStorage
watch(renderMode, (newVal) => {
  setStoredValue('vb-render-mode', newVal)
})

watch(globalVariant, (newVal) => {
  setStoredValue('vb-variant', newVal)
})

watch(globalTheme, (newVal) => {
  setStoredValue('vb-theme', newVal)
})

watch(globalMode, (newVal) => {
  setStoredValue('vb-mode', newVal)
})

// 4. 变体与主题容器背景样式映射
const themeContainerClass = computed(() => {
  const map = {
    '4': 'bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100',
    '3': 'bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#faf9f5]',
    '2': 'bg-[#e9e2ff] dark:bg-[#1a103d] text-[#120b48] dark:text-white',
    '1': 'bg-background text-foreground'
  }
  return map[globalVariant.value] || map['1']
})

// 5. 模式切换按钮高亮色映射
const activeTabClass = computed(() => {
  const map = {
    '4': 'bg-primary text-primary-foreground font-bold shadow-sm',
    '3': 'bg-[#cc785c] text-white shadow-sm font-semibold',
    '2': 'bg-[#120b48] text-white dark:bg-[#ffb347] dark:text-[#120b48] font-bold shadow-sm',
    '1': 'bg-primary text-primary-foreground shadow-sm font-semibold'
  }
  return map[globalVariant.value] || map['1']
})

// 6. 自定义样式覆盖示例（以 FeaturesBlock 渐变背景为例）
const customFeaturesStyles = {
  root: 'py-24 bg-linear-to-b from-primary/10 via-background to-muted/40'
}

// 7. Hero 标语随变体自适应
const heroTitleMap = {
  '4': '从零到架构师<br><span class="text-primary">实战 就业</span>',
  '3': '让企业协作<br><span class="text-primary">回归专注与理性</span>',
  '2': '突破规则束缚<br><span class="text-primary">重构数字视觉体验</span>',
  '1': '下一代智能协作平台<br><span class="text-primary">由 PageRenderer 数据驱动</span>'
}

// 8. PageRenderer 数据驱动配置（所有子区块自动继承外层 PageRenderer 的 :variant 全局渗透）
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
  <!-- 分支 1：独立路由渲染 WumaCMS 可视化搭建引擎（全屏独立界面，拥有完整视口与零冲突） -->
  <div v-if="isBuilderRoute" class="fixed inset-0 z-50 overflow-hidden bg-background">
    <VisualBuilder
      :pages="builderPages"
      :active-page-id="builderActivePageId"
      @save="handleBuilderSave"
      @change="handleBuilderChange"
      @exit="exitBuilder"
    />

    <!-- 保存成功提示 Toast -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-3"
    >
      <div
        v-if="saveToast.show"
        class="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 pointer-events-none"
      >
        <span>{{ saveToast.message }}</span>
      </div>
    </Transition>
  </div>

  <!-- 分支 2：站点前台演示视图（SiteRenderer 多页面 / PageRenderer 单页） -->
  <div v-else :class="['min-h-screen font-sans transition-colors duration-300', themeContainerClass]">
    <!-- 悬浮控制台：主题色彩切换、明暗切换与全站/Hero 变体切换（前台演示专用） -->
    <FloatingToolbar
      v-model="globalVariant"
      v-model:theme="globalTheme"
      v-model:mode="globalMode"
    />

    <!-- 模式 1：SiteRenderer 多页面全站渲染（展示官方标杆演示站点） -->
    <div v-if="renderMode === 'site'">
      <SiteRenderer
        :variant="globalVariant"
        :theme="globalTheme"
        :mode="globalMode"
        route-mode="hash"
      />
    </div>

    <!-- 模式 2：PageRenderer 数据驱动渲染（传入可选 navbar 与 footer 参数） -->
    <div v-else-if="renderMode === 'renderer'">
      <PageRenderer
        :variant="globalVariant"
        :theme="globalTheme"
        :mode="globalMode"
        :data="dynamicPageData"
        :navbar="NavbarBlock"
        :footer="FooterBlock"
        @submit="handleContactSubmit"
      />
    </div>

    <!-- 底部悬浮模式切换开关：前台模式切换 + 独立搭建器入口导航 -->
    <div
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 bg-card/95 backdrop-blur-md border border-border shadow-2xl rounded-full p-1.5 text-xs font-medium"
      role="tablist"
      aria-label="页面渲染模式切换"
    >
      <button
        v-for="mode in SITE_MODES"
        :key="mode.value"
        role="tab"
        :aria-selected="renderMode === mode.value"
        @click="renderMode = mode.value"
        :class="[
          'px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5',
          renderMode === mode.value
            ? activeTabClass
            : 'text-muted-foreground hover:text-primary'
        ]"
      >
        <span>{{ mode.icon }}</span>
        <span>{{ mode.label }}</span>
      </button>

      <div class="h-4 w-px bg-border/80 mx-1"></div>

      <!-- 进入独立可视化搭建器路由入口 -->
      <a
        href="#/builder"
        class="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-500/25 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
        title="进入 WumaCMS 独立全屏可视化搭建引擎"
      >
        <span>🛠️</span>
        <span>可视化搭建</span>
      </a>
    </div>
  </div>
</template>
