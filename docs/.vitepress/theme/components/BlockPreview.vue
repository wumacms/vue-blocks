<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  variant: {
    type: [String, Number],
    default: '1'
  },
  title: {
    type: String,
    default: ''
  },
  variants: {
    type: Array,
    default: () => []
  },
  initialDevice: {
    type: String,
    default: 'desktop' // 'desktop' | 'tablet' | 'mobile'
  },
  minHeight: {
    type: Number,
    default: 0
  }
})

const { site, isDark } = useData()

// 唯一实例标识，彻底消除同页面多个同名区块的 postMessage 交叉串扰
const instanceId = `bp-${Math.random().toString(36).slice(2, 9)}`

// State
const currentDevice = ref(props.initialDevice)
const currentVariant = ref(String(props.variant))
const iframeHeight = ref(props.minHeight || 120)
const isFullscreen = ref(false)
const isVariantDropdownOpen = ref(false)

const iframeRef = ref(null)
const fullscreenIframeRef = ref(null)
const variantDropdownRef = ref(null)

// Available variants
const resolvedVariants = computed(() => {
  if (props.variants && props.variants.length) return props.variants
  return ['1', '2']
})

// Variant labels
const variantLabels = {
  '1': '现代极简',
  '2': '新粗野主义'
}

function getVariantName(v) {
  return variantLabels[String(v)] || `变体 ${v}`
}

// Iframe source URL (携带 instanceId 唯一定位目标通信)
const iframeSrc = computed(() => {
  const base = site.value?.base || '/'
  const cleanBase = base.endsWith('/') ? base : base + '/'
  const theme = isDark.value ? 'dark' : 'light'
  return `${cleanBase}preview.html?block=${props.name}&variant=${currentVariant.value}&theme=${theme}&id=${instanceId}`
})

// Receive height message from iframe
function handleMessage(event) {
  const data = event.data
  if (!data || typeof data !== 'object') return
  if (data.type === 'preview-resize') {
    // 严格匹配：来自当前 iframe 窗口源 或 携带精确的 instanceId，杜绝其他区块篡改高度
    const isTarget = (data.id && data.id === instanceId) ||
      (iframeRef.value && event.source === iframeRef.value.contentWindow) ||
      (fullscreenIframeRef.value && event.source === fullscreenIframeRef.value.contentWindow) ||
      (!data.id && data.block === props.name)
    if (!isTarget) return

    if (data.height && data.height > 20) {
      iframeHeight.value = Math.max(data.height, props.minHeight || 0)
    }
  }
}

// Switch variant
function selectVariant(v) {
  currentVariant.value = String(v)
  notifyAllIframes({ type: 'update-variant', variant: String(v) })
}

function toggleVariantDropdown() {
  isVariantDropdownOpen.value = !isVariantDropdownOpen.value
}

function handleVariantClick(v) {
  selectVariant(v)
  isVariantDropdownOpen.value = false
}

// Switch device
function setDevice(dev) {
  currentDevice.value = dev
  setTimeout(() => {
    syncSameOriginHeight()
    notifyAllIframes({ type: 'request-height' })
  }, 100)
  setTimeout(() => {
    syncSameOriginHeight()
    notifyAllIframes({ type: 'request-height' })
  }, 350)
}

function notifyAllIframes(msg) {
  try {
    if (iframeRef.value?.contentWindow) {
      iframeRef.value.contentWindow.postMessage(msg, '*')
    }
    if (fullscreenIframeRef.value?.contentWindow) {
      fullscreenIframeRef.value.contentWindow.postMessage(msg, '*')
    }
  } catch (e) {
    // ignore
  }
}

// Sync dark mode changes to iframes
watch(isDark, (newVal) => {
  notifyAllIframes({ type: 'update-theme', isDark: newVal })
})

function openFullscreen() {
  currentDevice.value = 'desktop'
  isFullscreen.value = true
  isVariantDropdownOpen.value = false
}

function closeFullscreen() {
  isFullscreen.value = false
  isVariantDropdownOpen.value = false
}

// Lock body scrolling when in fullscreen
watch(isFullscreen, (val) => {
  if (typeof document !== 'undefined') {
    if (val) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        notifyAllIframes({ type: 'request-height' })
      }, 150)
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      setTimeout(() => {
        notifyAllIframes({ type: 'request-height' })
      }, 150)
    }
  }
})

// Dismiss dropdown when clicking outside
function handleClickOutside(e) {
  if (variantDropdownRef.value && !variantDropdownRef.value.contains(e.target)) {
    isVariantDropdownOpen.value = false
  }
}

// Key listener for fullscreen exit
function handleKeyDown(e) {
  if (e.key === 'Escape') {
    if (isVariantDropdownOpen.value) {
      isVariantDropdownOpen.value = false
    } else if (isFullscreen.value) {
      closeFullscreen()
    }
  }
}

// 同源直接精准探测高度（消除 postMessage 在初次加载时的微小延迟）
function syncSameOriginHeight() {
  try {
    const iframeEl = (isFullscreen.value && fullscreenIframeRef.value) ? fullscreenIframeRef.value : iframeRef.value
    if (!iframeEl) return
    const iframeDoc = iframeEl.contentDocument || iframeEl.contentWindow?.document
    if (!iframeDoc) return
    const rootEl = iframeDoc.getElementById('preview-root')
    if (rootEl) {
      const rect = rootEl.getBoundingClientRect()
      const h = Math.ceil(Math.max(rootEl.scrollHeight, rootEl.offsetHeight, rect.height))
      if (h > 20 && Math.abs(h - iframeHeight.value) >= 2) {
        iframeHeight.value = Math.max(h, props.minHeight || 0)
      }
    }
  } catch (e) {
    // 跨域时自动降级依赖 postMessage 传输
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', syncSameOriginHeight)
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', syncSameOriginHeight)
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }
})

function onIframeLoad() {
  notifyAllIframes({
    type: 'update-theme',
    isDark: isDark.value
  })

  // 立即探测 + 多阶段延迟重测（针对网络图片与字体加载完毕后的尺寸二次校准）
  syncSameOriginHeight()
  setTimeout(syncSameOriginHeight, 50)
  setTimeout(syncSameOriginHeight, 150)
  setTimeout(syncSameOriginHeight, 400)
  setTimeout(syncSameOriginHeight, 1000)
  setTimeout(syncSameOriginHeight, 2000)

  notifyAllIframes({ type: 'request-height' })
  setTimeout(() => notifyAllIframes({ type: 'request-height' }), 100)
  setTimeout(() => notifyAllIframes({ type: 'request-height' }), 500)
  setTimeout(() => notifyAllIframes({ type: 'request-height' }), 1500)
}

function openStandalone() {
  window.open(iframeSrc.value, '_blank')
}
</script>

<template>
  <!-- 正常的文档内嵌入预览容器 -->
  <div
    class="block-preview-container my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
    <!-- 顶部标题栏 -->
    <div
      class="flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-md">
      <div class="flex items-center gap-2">
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs">
          <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          {{ name }}
        </span>
      </div>

      <div class="flex items-center gap-1.5">
        <!-- 全屏预览按钮 -->
        <button type="button" @click="openFullscreen"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-medium transition-colors cursor-pointer shadow-xs"
          title="全屏预览">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
          <span>全屏预览</span>
        </button>

        <!-- 新窗口打开独立页面 -->
        <button type="button" @click="openStandalone"
          class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          title="在新窗口中打开">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 内嵌预览展示区 -->
    <div class="w-full overflow-hidden bg-white dark:bg-zinc-950">
      <iframe ref="iframeRef" :src="iframeSrc" :style="{ height: iframeHeight + 'px', backgroundColor: 'transparent' }"
        class="w-full border-0 block" allowtransparency="true" @load="onIframeLoad" scrolling="no" />
    </div>

    <!-- 底部状态说明条 -->
    <div
      class="flex items-center justify-between px-4 py-2 text-[11px] text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/50">
      <span class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        高保真独立沙箱预览
      </span>
      <button type="button" @click="openFullscreen"
        class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 cursor-pointer font-medium transition-colors">
        <span>点击全屏</span>
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>

  <!-- 全屏沉浸式视口预览模态层 (直接 Teleport 到 body，彻底脱离 VitePress 任何层叠上下文) -->
  <Teleport to="body">
    <div v-if="isFullscreen" class="fixed inset-0 flex flex-col bg-white dark:bg-zinc-950 overflow-hidden"
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100vw; height: 100vh; z-index: 9999999; margin: 0; padding: 0;">
      <!-- 全屏顶部综合控制栏 (精细度媲美 Apple / Linear / Vercel) -->
      <header
        class="flex items-center justify-between gap-4 px-4 sm:px-6 h-12 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shrink-0 select-none z-30">
        <!-- 左侧：组件标识与标题 -->
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">{{ name
              }}</span>
            <span class="text-zinc-300 dark:text-zinc-700 text-xs">/</span>
            <span class="text-xs text-zinc-500 dark:text-zinc-400 font-normal truncate max-w-[120px] sm:max-w-none">
              {{ title || '全屏沉浸预览' }}
            </span>
          </div>
        </div>

        <!-- 中间：响应式设备视口切换器 (极简纯图标分段控制) -->
        <div
          class="flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80">
          <!-- 桌面端 100% -->
          <button type="button" @click="setDevice('desktop')" :class="[
            'flex items-center justify-center w-8 h-7 rounded-md transition-all duration-150 cursor-pointer',
            currentDevice === 'desktop'
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
              : 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
          ]" title="桌面端全屏视口 (100%)" aria-label="桌面端视口">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </button>

          <!-- 平板端 768px -->
          <button type="button" @click="setDevice('tablet')" :class="[
            'flex items-center justify-center w-8 h-7 rounded-md transition-all duration-150 cursor-pointer',
            currentDevice === 'tablet'
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
              : 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
          ]" title="平板设备视口 (768px)" aria-label="平板设备视口">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2.5" />
              <line x1="10" y1="18" x2="14" y2="18" />
            </svg>
          </button>

          <!-- 手机端 375px -->
          <button type="button" @click="setDevice('mobile')" :class="[
            'flex items-center justify-center w-8 h-7 rounded-md transition-all duration-150 cursor-pointer',
            currentDevice === 'mobile'
              ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
              : 'text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300'
          ]" title="手机设备视口 (375px)" aria-label="手机设备视口">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
              stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="2" width="12" height="20" rx="2.5" />
              <circle cx="12" cy="18" r="0.75" fill="currentColor" />
            </svg>
          </button>

          <!-- 视口宽度徽标 -->
          <span class="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 px-2 select-none hidden sm:inline">
            {{ currentDevice === 'desktop' ? '100%' : currentDevice === 'tablet' ? '768px' : '375px' }}
          </span>
        </div>

        <!-- 右侧：风格变体下拉框与退出按钮 -->
        <div class="flex items-center gap-2">
          <!-- 变体切换下拉菜单 -->
          <div v-if="resolvedVariants.length > 1" ref="variantDropdownRef" class="relative">
            <button type="button" @click.stop="toggleVariantDropdown"
              class="inline-flex items-center gap-1.5 h-7.5 px-2.5 rounded-lg text-xs font-medium bg-zinc-100/90 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs transition-colors cursor-pointer select-none"
              :class="{ 'ring-1 ring-zinc-400 dark:ring-zinc-500': isVariantDropdownOpen }">
              <svg class="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span class="text-zinc-400 dark:text-zinc-500 font-normal">风格:</span>
              <span class="font-semibold text-zinc-800 dark:text-zinc-100">
                {{ getVariantName(currentVariant) }}
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
                class="absolute right-0 mt-1.5 w-44 py-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-950/10 dark:shadow-black/70 z-50 overflow-hidden">
                <div
                  class="px-2.5 py-1 mb-0.5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                  <span>风格变体</span>
                  <span class="font-mono">{{ resolvedVariants.length }} 种</span>
                </div>

                <div class="p-2 space-y-2">
                  <button v-for="v in resolvedVariants" :key="v" type="button" @click.stop="handleVariantClick(v)"
                    :class="[
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer',
                      currentVariant === String(v)
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200'
                    ]">
                    <div class="flex items-center gap-2">
                      <span class="font-mono text-[10px] px-1 py-0.2 rounded border" :class="currentVariant === String(v)
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent font-bold'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-200/80 dark:border-zinc-700/80'">
                        V{{ v }}
                      </span>
                      <span>{{ getVariantName(v) }}</span>
                    </div>

                    <svg v-if="currentVariant === String(v)"
                      class="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-100 stroke-[2.5]" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- 新窗口独立打开 -->
          <button type="button" @click="openStandalone"
            class="flex items-center justify-center w-7.5 h-7.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="在新窗口中打开">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
              stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>

          <!-- 退出全屏按钮 -->
          <button type="button" @click="closeFullscreen"
            class="flex items-center gap-1.5 h-7.5 px-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs font-medium transition-colors cursor-pointer shadow-xs"
            title="退出全屏">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>退出全屏</span>
          </button>
        </div>
      </header>

      <!-- 全屏视图展示区 -->
      <div
        class="flex-1 w-full h-[calc(100vh-48px)] overflow-auto flex justify-center items-start transition-colors duration-200"
        :class="[
          currentDevice === 'desktop'
            ? 'p-0 m-0 bg-white dark:bg-zinc-950'
            : 'p-6 sm:p-10 bg-zinc-100/90 dark:bg-zinc-950/90 preview-canvas-dots'
        ]">
        <!-- 统一仿真外壳 / 视口容器（单 iframe 架构，切换设备无需销毁重建，杜绝白屏闪烁） -->
        <div class="relative transition-all duration-300 ease-out origin-top mx-auto" :class="[
          currentDevice === 'desktop'
            ? 'w-full h-full m-0 p-0 border-0 rounded-none shadow-none ring-0 bg-transparent'
            : currentDevice === 'mobile'
              ? 'preview-device-frame rounded-[32px] p-2.5 bg-zinc-900 dark:bg-zinc-800 shadow-2xl ring-1 ring-black/20 dark:ring-white/10'
              : 'preview-device-frame rounded-[20px] p-2 bg-zinc-900 dark:bg-zinc-800 shadow-2xl ring-1 ring-black/20 dark:ring-white/10'
        ]" :style="[
          currentDevice === 'desktop'
            ? { width: '100%', height: '100%' }
            : currentDevice === 'mobile'
              ? { width: '375px' }
              : { width: '768px' }
        ]">
          <!-- 手机灵动胶囊 -->
          <div v-if="currentDevice === 'mobile'"
            class="w-16 h-3 bg-black dark:bg-zinc-950 rounded-full mx-auto mb-2 opacity-80" />

          <!-- 内部 iframe 裁切遮罩 -->
          <div class="relative w-full overflow-hidden transition-all duration-300" :class="[
            currentDevice === 'desktop'
              ? 'h-full rounded-none bg-transparent'
              : currentDevice === 'mobile'
                ? 'rounded-[22px] bg-white dark:bg-zinc-950'
                : 'rounded-[14px] bg-white dark:bg-zinc-950'
          ]">
            <iframe ref="fullscreenIframeRef" :src="iframeSrc" :style="{
              height: currentDevice === 'desktop' ? '100%' : Math.max(iframeHeight, 600) + 'px',
              backgroundColor: 'transparent'
            }" :scrolling="currentDevice === 'desktop' ? 'auto' : 'no'" class="w-full border-0 block"
              allowtransparency="true" @load="onIframeLoad" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.preview-canvas-dots {
  background-image: radial-gradient(circle, rgba(120, 120, 120, 0.15) 1px, transparent 1px);
  background-size: 20px 20px;
}
</style>
