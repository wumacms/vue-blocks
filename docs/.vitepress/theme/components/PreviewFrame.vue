<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
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
  FooterBlock,
  PageRenderer,
  SiteRenderer
} from 'vue-blocks'

const blockMap = {
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
  FooterBlock,
  PageRenderer,
  SiteRenderer
}

const variantsList = [
  { id: '1', name: '现代极简', alias: 'SaaS Clean', desc: '科技产品极简落地页' },
  { id: '2', name: '新粗野主义', alias: 'Neo-brutalist', desc: '粗边框强对比撞色卡片' },
  { id: '3', name: '人文科技纸质风', alias: 'Editorial Tech', desc: 'Anthropic/Claude 暖调叙事典雅' },
  { id: '4', name: '工科极客新粗野风', alias: 'Geek Brutalist', desc: 'DevPath 开发者硬核代码终端风' }
]

function getVariantName(v) {
  const item = variantsList.find((item) => String(item.id) === String(v))
  return item ? item.name : `变体 ${v}`
}

const blockName = ref('FeaturesBlock')
const variant = ref('1')
const previewId = ref('')
const isDark = ref(false)
const currentDevice = ref('desktop') // 'desktop' | 'tablet' | 'mobile'
const isVariantDropdownOpen = ref(false)
const variantDropdownRef = ref(null)

const isStandalone = ref(false)
const iframeHeight = ref(400)
const innerIframeRef = ref(null)

const CurrentComponent = computed(() => blockMap[blockName.value] || null)

function checkStandalone() {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  if (params.get('inner') === '1') return false
  return window.self === window.top || params.get('standalone') === '1'
}

function updateFromQuery() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  if (params.get('block')) blockName.value = params.get('block')
  if (params.get('variant')) variant.value = params.get('variant')
  if (params.get('id')) previewId.value = params.get('id')
  if (params.get('theme')) {
    const shouldBeDark = params.get('theme') === 'dark'
    isDark.value = shouldBeDark
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  } else {
    isDark.value = document.documentElement.classList.contains('dark')
  }
}

// 立即在 setup 阶段同步初始化
isStandalone.value = checkStandalone()
updateFromQuery()

// 内部 iframe 源地址（仅在独立窗口模式下使用）
const innerIframeSrc = computed(() => {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/preview.html'
  const theme = isDark.value ? 'dark' : 'light'
  return `${path}?block=${blockName.value}&variant=${variant.value}&theme=${theme}&inner=1`
})

function updateUrlParam(key, value) {
  if (typeof window === 'undefined') return
  try {
    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    window.history.replaceState({}, '', url.toString())
  } catch {
    // ignore
  }
}

function notifyInnerIframe(msg) {
  try {
    if (innerIframeRef.value?.contentWindow) {
      innerIframeRef.value.contentWindow.postMessage(msg, '*')
    }
  } catch (e) {
    // ignore
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', isDark.value)
  }
  updateUrlParam('theme', isDark.value ? 'dark' : 'light')
  notifyInnerIframe({
    type: 'update-theme',
    isDark: isDark.value
  })
}

function selectVariant(v) {
  variant.value = String(v)
  updateUrlParam('variant', String(v))
  isVariantDropdownOpen.value = false
  notifyInnerIframe({
    type: 'update-variant',
    variant: String(v)
  })
}

function toggleVariantDropdown() {
  isVariantDropdownOpen.value = !isVariantDropdownOpen.value
}

function setDevice(dev) {
  currentDevice.value = dev
  setTimeout(() => {
    syncInnerHeight()
    notifyInnerIframe({ type: 'request-height' })
  }, 100)
  setTimeout(() => {
    syncInnerHeight()
    notifyInnerIframe({ type: 'request-height' })
  }, 350)
}

function syncInnerHeight() {
  try {
    const iframeEl = innerIframeRef.value
    if (!iframeEl) return
    const iframeDoc = iframeEl.contentDocument || iframeEl.contentWindow?.document
    if (!iframeDoc) return
    const rootEl = iframeDoc.getElementById('preview-root')
    if (rootEl) {
      const rect = rootEl.getBoundingClientRect()
      const h = Math.ceil(Math.max(rootEl.scrollHeight, rootEl.offsetHeight, rect.height))
      if (h > 20) {
        iframeHeight.value = h
      }
    }
  } catch (e) {
    // ignore
  }
}

function onInnerIframeLoad() {
  notifyInnerIframe({
    type: 'update-theme',
    isDark: isDark.value
  })
  notifyInnerIframe({
    type: 'update-variant',
    variant: variant.value
  })
  syncInnerHeight()
  setTimeout(syncInnerHeight, 50)
  setTimeout(syncInnerHeight, 150)
  setTimeout(syncInnerHeight, 500)
  setTimeout(syncInnerHeight, 1200)
}

function handleClickOutside(e) {
  if (variantDropdownRef.value && !variantDropdownRef.value.contains(e.target)) {
    isVariantDropdownOpen.value = false
  }
}

function handleKeyDown(e) {
  if (e.key === 'Escape') {
    isVariantDropdownOpen.value = false
  }
}

// --- 内嵌模式高度计算逻辑（用于文档中嵌入 iframe 时自适应高度）---
let lastSentHeight = 0

function sendHeight() {
  if (typeof window === 'undefined' || isStandalone.value) return
  nextTick(() => {
    const rootEl = document.getElementById('preview-root')
    if (!rootEl) return
    const rect = rootEl.getBoundingClientRect()
    const height = Math.ceil(Math.max(rootEl.scrollHeight, rootEl.offsetHeight, rect.height))
    if (height > 20 && Math.abs(height - lastSentHeight) >= 2) {
      lastSentHeight = height
      window.parent?.postMessage({
        type: 'preview-resize',
        id: previewId.value,
        height: height,
        block: blockName.value
      }, '*')
    }
  })
}

function hookImages() {
  if (isStandalone.value) return
  const rootEl = document.getElementById('preview-root')
  if (!rootEl) return
  const imgs = rootEl.querySelectorAll('img')
  imgs.forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', () => sendHeight(), { once: true })
      img.addEventListener('error', () => sendHeight(), { once: true })
    }
  })
}

let resizeObserver = null
let mutationObserver = null

onMounted(() => {
  isStandalone.value = checkStandalone()
  updateFromQuery()

  if (isStandalone.value) {
    if (blockName.value && typeof document !== 'undefined') {
      document.title = `${blockName.value} - 组件独立预览`
    }
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)
  }

  // 挂载消息监听
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return

    if (isStandalone.value) {
      if (data.type === 'preview-resize') {
        if (data.height && data.height > 20) {
          iframeHeight.value = data.height
        }
      }
    } else {
      if (data.type === 'update-block' && data.block) {
        blockName.value = data.block
        if (data.variant) variant.value = String(data.variant)
        nextTick(() => {
          hookImages()
          sendHeight()
        })
      }
      if (data.type === 'update-variant' && data.variant) {
        variant.value = String(data.variant)
        nextTick(() => {
          hookImages()
          sendHeight()
        })
      }
      if (data.type === 'update-theme') {
        isDark.value = !!data.isDark
        document.documentElement.classList.toggle('dark', !!data.isDark)
      }
      if (data.type === 'request-height') {
        sendHeight()
      }
    }
  })

  if (!isStandalone.value) {
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => sendHeight())
    }
    hookImages()

    try {
      if (window.parent && window.parent.document && window.parent !== window) {
        const isParentDark = window.parent.document.documentElement.classList.contains('dark')
        document.documentElement.classList.toggle('dark', isParentDark)
        isDark.value = isParentDark

        const parentObserver = new MutationObserver(() => {
          const dark = window.parent.document.documentElement.classList.contains('dark')
          document.documentElement.classList.toggle('dark', dark)
          isDark.value = dark
        })
        parentObserver.observe(window.parent.document.documentElement, {
          attributes: true,
          attributeFilter: ['class']
        })
      }
    } catch (e) {
      // ignore cross-origin error
    }

    const rootEl = document.getElementById('preview-root')
    if (typeof ResizeObserver !== 'undefined' && rootEl) {
      resizeObserver = new ResizeObserver(() => sendHeight())
      resizeObserver.observe(rootEl)
    }

    if (typeof MutationObserver !== 'undefined' && rootEl) {
      mutationObserver = new MutationObserver(() => {
        hookImages()
        sendHeight()
      })
      mutationObserver.observe(rootEl, { childList: true, subtree: true, attributes: true })
    }

    window.addEventListener('resize', sendHeight)
    window.addEventListener('load', sendHeight)

    const delays = [30, 80, 150, 300, 600, 1200, 2000, 3000]
    delays.forEach((d) => setTimeout(sendHeight, d))
  } else {
    window.addEventListener('resize', syncInnerHeight)
  }
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
  if (mutationObserver) mutationObserver.disconnect()
  window.removeEventListener('resize', sendHeight)
  window.removeEventListener('resize', syncInnerHeight)
  window.removeEventListener('load', sendHeight)
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <!-- 独立新窗口模式：顶部现代化工具栏 + 多设备视口仿真 -->
  <div v-if="isStandalone"
    class="standalone-preview min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
    <!-- 顶部工具栏 -->
    <header
      class="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 sm:px-6 h-13 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shrink-0 select-none">
      <!-- 左侧：组件信息 -->
      <div class="flex items-center gap-2.5 min-w-0">
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs shrink-0">
          <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          {{ blockName }}
        </span>
        <span class="text-xs text-zinc-400 dark:text-zinc-500 font-medium hidden md:inline truncate">
          组件独立视口预览
        </span>
      </div>

      <!-- 中间：响应式设备视口切换器 -->
      <div
        class="flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs">
        <!-- 桌面端 100% -->
        <button type="button" @click="setDevice('desktop')"
          class="preview-device-btn"
          :class="{ 'active': currentDevice === 'desktop' }"
          title="桌面端全宽视口 (100%)" aria-label="桌面端视口">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            :stroke-width="currentDevice === 'desktop' ? '2.25' : '1.75'" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </button>

        <!-- iPad 设备 768px -->
        <button type="button" @click="setDevice('tablet')"
          class="preview-device-btn"
          :class="{ 'active': currentDevice === 'tablet' }"
          title="iPad 设备视口 (768px)" aria-label="iPad视口">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            :stroke-width="currentDevice === 'tablet' ? '2.25' : '1.75'" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2.5" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
        </button>

        <!-- 移动设备 375px -->
        <button type="button" @click="setDevice('mobile')"
          class="preview-device-btn"
          :class="{ 'active': currentDevice === 'mobile' }"
          title="移动设备视口 (375px)" aria-label="移动设备视口">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            :stroke-width="currentDevice === 'mobile' ? '2.25' : '1.75'" stroke-linecap="round" stroke-linejoin="round">
            <rect x="6" y="2" width="12" height="20" rx="2.5" />
            <circle cx="12" cy="18" r="0.75" fill="currentColor" />
          </svg>
        </button>
      </div>

      <!-- 右侧：风格变体切换 + 深浅色模式切换 -->
      <div class="flex items-center gap-2">
        <!-- 变体切换下拉菜单 -->
        <div ref="variantDropdownRef" class="relative">
          <button type="button" @click.stop="toggleVariantDropdown"
            class="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-medium bg-zinc-100/90 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs transition-colors cursor-pointer select-none"
            :class="{ 'ring-1 ring-zinc-400 dark:ring-zinc-500': isVariantDropdownOpen }">
            <svg class="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span class="text-zinc-400 dark:text-zinc-500 font-normal hidden sm:inline">风格:</span>
            <span class="font-semibold text-zinc-800 dark:text-zinc-100">
              {{ getVariantName(variant) }}
            </span>
            <svg class="w-3 h-3 text-zinc-400 dark:text-zinc-500 transition-transform duration-200"
              :class="{ 'rotate-180': isVariantDropdownOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          <!-- 下拉浮层 -->
          <transition enter-active-class="transition duration-150 ease-out origin-top-right"
            enter-from-class="transform scale-95 opacity-0 -translate-y-1"
            enter-to-class="transform scale-100 opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in origin-top-right"
            leave-from-class="transform scale-100 opacity-100 translate-y-0"
            leave-to-class="transform scale-95 opacity-0 -translate-y-1">
            <div v-if="isVariantDropdownOpen"
              class="absolute right-0 mt-1.5 w-60 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-950/10 dark:shadow-black/70 z-50 overflow-hidden">
              <div
                class="px-3 py-1 mb-1 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                <span>风格变体</span>
                <span class="font-mono">{{ variantsList.length }} 种设计</span>
              </div>

              <div class="p-1 space-y-1">
                <button v-for="item in variantsList" :key="item.id" type="button" @click.stop="selectVariant(item.id)"
                  :class="[
                    'w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer',
                    String(variant) === String(item.id)
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200'
                  ]">
                  <div class="flex items-start gap-2.5 min-w-0">
                    <span class="font-mono text-[10px] px-1.5 py-0.5 rounded border shrink-0 mt-0.5 font-bold" :class="String(variant) === String(item.id)
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200/80 dark:border-zinc-700/80'">
                      V{{ item.id }}
                    </span>
                    <div class="flex flex-col min-w-0">
                      <span class="text-xs font-semibold truncate">{{ item.name }}</span>
                      <span class="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">{{ item.desc }}</span>
                    </div>
                  </div>

                  <svg v-if="String(variant) === String(item.id)"
                    class="w-4 h-4 text-zinc-900 dark:text-zinc-100 stroke-[2.5] shrink-0 ml-2" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </div>
            </div>
          </transition>
        </div>

        <!-- 深浅色模式切换按钮 -->
        <button type="button" @click="toggleTheme"
          class="flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-200/80 dark:border-zinc-700/80 bg-zinc-100/90 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 shadow-xs transition-all cursor-pointer"
          :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
          :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'">
          <svg v-if="isDark" class="w-4 h-4 text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg v-else class="w-4 h-4 text-zinc-600 dark:text-zinc-300 transition-transform duration-200 hover:-rotate-12"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- 视图展示区 -->
    <main
      class="flex-1 w-full min-h-[calc(100vh-53px)] flex justify-center items-start transition-colors duration-200"
      :class="[
        currentDevice === 'desktop'
          ? 'p-0 m-0'
          : 'p-6 sm:p-10 bg-zinc-100/90 dark:bg-zinc-950/90 preview-canvas-dots overflow-auto'
      ]">
      <div class="transition-all duration-300 ease-out origin-top mx-auto" :class="[
        currentDevice === 'desktop'
          ? 'w-full h-full'
          : currentDevice === 'mobile'
            ? 'preview-device-frame w-[375px] max-w-full my-6 sm:my-8 rounded-[36px] border-[6px] border-zinc-300/90 dark:border-zinc-700/90 bg-white dark:bg-zinc-950 shadow-2xl shadow-zinc-950/15 dark:shadow-black/70 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden'
            : 'preview-device-frame w-[768px] max-w-full my-6 sm:my-8 rounded-2xl border-[6px] border-zinc-300/90 dark:border-zinc-700/90 bg-white dark:bg-zinc-950 shadow-2xl shadow-zinc-950/15 dark:shadow-black/70 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden'
      ]" :style="[
        currentDevice === 'desktop'
          ? { width: '100%', height: 'calc(100vh - 53px)' }
          : currentDevice === 'mobile'
            ? { width: '375px' }
            : { width: '768px' }
      ]">
        <!-- 内部 iframe 视口 -->
        <div class="w-full h-full transition-all duration-300" :class="[
          currentDevice === 'desktop'
            ? 'h-full'
            : currentDevice === 'mobile'
              ? 'rounded-[30px] overflow-hidden'
              : 'rounded-[10px] overflow-hidden'
        ]">
          <iframe ref="innerIframeRef" :src="innerIframeSrc" :style="{
            height: currentDevice === 'desktop' ? '100%' : Math.max(iframeHeight, 600) + 'px',
            backgroundColor: 'transparent'
          }" :scrolling="currentDevice === 'desktop' ? 'auto' : 'no'" class="w-full border-0 block"
            allowtransparency="true" @load="onInnerIframeLoad" />
        </div>
      </div>
    </main>
  </div>

  <!-- 内嵌 iframe 模式：纯净无工具栏，直接渲染用于文档卡片与仿真视口 -->
  <div v-else id="preview-root"
    :class="[
      (variant === '4' || variant === 'geek' || variant === 'developer')
        ? 'bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100'
        : (variant === '3' || variant === 'editorial' || variant === 'warm')
          ? 'bg-[#faf9f5] dark:bg-[#141413] text-[#141413] dark:text-[#f5f2eb]'
          : 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100',
      'transition-colors duration-200'
    ]"
    style="display: flow-root; width: 100%; height: auto; min-height: 0; box-sizing: border-box;">
    <ClientOnly>
      <component :is="CurrentComponent" v-if="CurrentComponent" :key="blockName + '-' + variant" :variant="variant"
        :route-mode="blockName === 'SiteRenderer' ? 'memory' : undefined"
        :seo="blockName === 'PageRenderer' ? false : undefined" />
      <div v-else class="p-12 text-center text-sm text-gray-400">
        未找到区块组件: {{ blockName }}
      </div>

      <!-- Extra space for Navbar dropdown menus -->
      <div v-if="blockName === 'NavbarBlock'"
        class="py-24 text-center text-xs text-gray-400 dark:text-gray-600 select-none">
        页面内容占位区域（用于演示悬停二级下拉菜单展开与吸顶效果）
      </div>
    </ClientOnly>
  </div>
</template>

<style>
/* 避免 html 和 body 锁死高度，允许真实内容高度自适应流动 */
html,
body {
  margin: 0;
  padding: 0;
  height: auto;
  min-height: 0;
  overflow-x: hidden;
  background-color: transparent !important;
}

html.dark,
body.dark {
  background-color: #09090b !important;
}

.preview-canvas-dots {
  background-image: radial-gradient(circle, rgba(120, 120, 120, 0.18) 1px, transparent 1px);
  background-size: 20px 20px;
}

.preview-device-frame {
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.preview-device-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 2.125rem !important;
  height: 1.875rem !important;
  border-radius: 0.375rem !important;
  border: 1px solid transparent !important;
  background-color: transparent !important;
  color: #71717a !important;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer !important;
  outline: none !important;
}

.preview-device-btn:hover:not(.active) {
  color: #18181b !important;
  background-color: rgba(228, 228, 231, 0.7) !important;
}

.dark .preview-device-btn:hover:not(.active) {
  color: #f4f4f5 !important;
  background-color: rgba(63, 63, 70, 0.7) !important;
}

/* 选中高亮状态：雅致中性高对比度配色（替代鲜艳紫色，与全站规范统一） */
.preview-device-btn.active {
  background-color: #18181b !important;
  color: #ffffff !important;
  border-color: #18181b !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.2) !important;
}

.dark .preview-device-btn.active {
  background-color: #ffffff !important;
  color: #18181b !important;
  border-color: #ffffff !important;
  box-shadow: 0 1px 3px 0 rgba(255, 255, 255, 0.2), 0 1px 2px -1px rgba(255, 255, 255, 0.1) !important;
}

.preview-device-btn svg {
  width: 1rem !important;
  height: 1rem !important;
  color: inherit !important;
  stroke: currentColor !important;
}

#preview-root {
  display: flow-root;
  width: 100%;
  height: auto;
  min-height: 0;
  box-sizing: border-box;
}

/* 彻底中和预览容器内部 min-h-screen 与 100vh 对 iframe 的正反馈自增污染，恢复自然内容高度 */
:where(#preview-root) :is(.min-h-screen, [style*="100vh"], [style*="min-height: calc(100vh"]) {
  min-height: auto !important;
}

/* 彻底清除 VitePress base.css 对 h1-h6、段落等在无图层(unlayered)级别强制施加的 font-size:16px、font-weight:400 污染 */
:where(#preview-root) :is(h1, h2, h3, h4, h5, h6) {
  margin: revert-layer;
  padding: revert-layer;
  border: revert-layer;
  font-size: revert-layer;
  line-height: revert-layer;
  letter-spacing: revert-layer;
  font-weight: revert-layer;
}

:where(#preview-root) :is(p, ul, ol, li, blockquote, hr, table, tr, th, td, strong, b) {
  margin: revert-layer;
  padding: revert-layer;
  border: revert-layer;
  font-size: revert-layer;
  line-height: revert-layer;
  letter-spacing: revert-layer;
  font-weight: revert-layer;
  list-style: revert-layer;
  background-color: revert-layer;
}

:where(#preview-root) :is(button, input, optgroup, select, textarea) {
  border: revert-layer;
  padding: revert-layer;
  line-height: revert-layer;
  color: revert-layer;
  font: revert-layer;
  font-family: revert-layer;
  background-color: revert-layer;
  outline: revert-layer;
}

:where(#preview-root) :is(a) {
  text-decoration: revert-layer;
  color: revert-layer;
  font-weight: revert-layer;
}

/* 彻底清除 VitePress base.css 对 img、video 的 height: auto 导致的 Tailwind 高度类 (.h-12 等) 覆盖污染 */
:where(#preview-root) :is(img, video) {
  height: revert-layer;
  max-width: revert-layer;
}

:where(#preview-root) :is(img, svg, video, canvas, audio, iframe, embed, object) {
  display: revert-layer;
  vertical-align: revert-layer;
}
</style>
