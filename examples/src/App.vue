<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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

const isDark = ref(false)
const themeMode = ref('light')
const heroVariant = ref('1')
const activePopup = ref(null)
const floatingBarRef = ref(null)

const heroVariants = [
  { id: '1', name: 'SaaS 现代风格', desc: '科技产品落地页' },
  { id: '2', name: '波普复古风', desc: '新丑风粗边框卡片' },
  { id: '3', name: '暗黑分割网格', desc: '极客技术网格风' },
  { id: '4', name: '全屏大图蒙版', desc: '沉浸式视觉焦点' }
]

const themeOptions = [
  { id: 'light', name: '浅色模式' },
  { id: 'dark', name: '深色模式' },
  { id: 'system', name: '跟随系统' }
]

function applyTheme(mode) {
  themeMode.value = mode
  localStorage.setItem('vb-theme', mode)
  if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = prefersDark
    document.documentElement.classList.toggle('dark', prefersDark)
  } else if (mode === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
}

function selectTheme(mode) {
  applyTheme(mode)
  activePopup.value = null
}

function selectVariant(v) {
  heroVariant.value = v
  activePopup.value = null
}

function togglePopup(type) {
  activePopup.value = activePopup.value === type ? null : type
}

function handleOutsideClick(event) {
  if (floatingBarRef.value && !floatingBarRef.value.contains(event.target)) {
    activePopup.value = null
  }
}

onMounted(() => {
  const saved = localStorage.getItem('vb-theme')
  if (saved && ['light', 'dark', 'system'].includes(saved)) {
    applyTheme(saved)
  } else {
    const hasDarkClass = document.documentElement.classList.contains('dark')
    themeMode.value = hasDarkClass ? 'dark' : 'light'
    isDark.value = hasDarkClass
  }
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

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
    <!-- 悬浮控制台：纵向连体按钮与弹出菜单 -->
    <div ref="floatingBarRef" class="fixed bottom-24 right-6 z-50 flex items-end">
      <!-- 弹出选择项菜单 -->
      <transition enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 translate-x-2 scale-95" enter-to-class="opacity-100 translate-x-0 scale-100"
        leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100 translate-x-0 scale-100"
        leave-to-class="opacity-0 translate-x-2 scale-95">
        <div v-if="activePopup"
          class="mr-3 mb-0 w-52 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/90 dark:border-gray-700/90 shadow-2xl rounded-2xl p-2 text-xs">
          <!-- 切换模式弹窗 -->
          <div v-if="activePopup === 'mode'" class="space-y-1">
            <div
              class="px-2.5 py-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              主题模式
            </div>
            <button v-for="opt in themeOptions" :key="opt.id" @click="selectTheme(opt.id)" :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors font-medium cursor-pointer',
              themeMode === opt.id
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            ]">
              <div class="flex items-center gap-2.5">
                <svg v-if="opt.id === 'light'" class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <svg v-else-if="opt.id === 'dark'" class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg v-else class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ opt.name }}</span>
              </div>
              <svg v-if="themeMode === opt.id" class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>

          <!-- 切换变体弹窗 -->
          <div v-if="activePopup === 'variant'" class="space-y-1">
            <div
              class="px-2.5 py-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Hero 变体选择
            </div>
            <button v-for="v in heroVariants" :key="v.id" @click="selectVariant(v.id)" :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors font-medium cursor-pointer',
              heroVariant === v.id
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            ]">
              <div>
                <div class="flex items-center gap-1.5">
                  <span :class="[
                    'w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold',
                    heroVariant === v.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  ]">{{ v.id }}</span>
                  <span class="text-xs">{{ v.name }}</span>
                </div>
                <div class="text-[10px] text-gray-400 dark:text-gray-500 pl-5">{{ v.desc }}</div>
              </div>
              <svg v-if="heroVariant === v.id" class="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 ml-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
      </transition>

      <!-- 纵向放置两个连体按钮 -->
      <div
        class="flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/90 dark:border-gray-700/90 shadow-2xl rounded-2xl overflow-hidden divide-y divide-gray-200/80 dark:divide-gray-700/80">
        <!-- 切换模式按钮 -->
        <button @click="togglePopup('mode')" :class="[
          'w-12 h-12 flex flex-col items-center justify-center transition-colors relative group cursor-pointer',
          activePopup === 'mode'
            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
        ]" title="切换模式" aria-label="切换模式">
          <svg v-if="!isDark" class="w-5 h-5 text-amber-500 transition-transform group-hover:rotate-45" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-5 h-5 text-indigo-400 transition-transform group-hover:-rotate-12" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <span class="text-[9px] font-semibold leading-none mt-1">模式</span>
        </button>

        <!-- 切换变体按钮 -->
        <button @click="togglePopup('variant')" :class="[
          'w-12 h-12 flex flex-col items-center justify-center transition-colors relative group cursor-pointer',
          activePopup === 'variant'
            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
        ]" title="切换Hero变体" aria-label="切换Hero变体">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span class="text-[9px] font-semibold leading-none mt-1">变体</span>
          <span
            class="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
            {{ heroVariant }}
          </span>
        </button>
      </div>
    </div>

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
    <FooterBlock />
  </div>
</template>
