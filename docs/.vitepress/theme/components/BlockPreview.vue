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
    default: 'desktop'
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
const currentVariant = ref(String(props.variant))
const iframeHeight = ref(props.minHeight || 120)
const iframeRef = ref(null)

watch(
  () => props.variant,
  (newVariant) => {
    currentVariant.value = String(newVariant)
  }
)

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
      (!data.id && data.block === props.name)
    if (!isTarget) return

    if (data.height && data.height > 20) {
      iframeHeight.value = Math.max(data.height, props.minHeight || 0)
    }
  }
}

function notifyAllIframes(msg) {
  try {
    if (iframeRef.value?.contentWindow) {
      iframeRef.value.contentWindow.postMessage(msg, '*')
    }
  } catch (e) {
    // ignore
  }
}

// Sync dark mode changes to iframes
watch(isDark, (newVal) => {
  notifyAllIframes({ type: 'update-theme', isDark: newVal })
})

// 同源直接精准探测高度（消除 postMessage 在初次加载时的微小延迟）
function syncSameOriginHeight() {
  try {
    const iframeEl = iframeRef.value
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
  window.addEventListener('resize', syncSameOriginHeight)
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
  window.removeEventListener('resize', syncSameOriginHeight)
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
      <div class="flex items-center gap-2 min-w-0">
        <span
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs shrink-0">
          <svg class="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          {{ name }}
        </span>
        <span v-if="title" class="text-xs text-zinc-500 dark:text-zinc-400 font-normal truncate hidden sm:inline">
          {{ title }}
        </span>
      </div>

      <div class="flex items-center gap-1.5 shrink-0">
        <!-- 新窗口打开独立页面 -->
        <button type="button" @click="openStandalone"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200/90 dark:border-zinc-700/80 bg-white hover:bg-zinc-50 dark:bg-zinc-800/90 dark:hover:bg-zinc-700/80 text-zinc-700 dark:text-zinc-200 text-xs font-medium transition-colors cursor-pointer shadow-xs"
          title="在新窗口中打开">
          <svg class="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          <span>在新窗口中打开</span>
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
      <button type="button" @click="openStandalone"
        class="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 flex items-center gap-1 cursor-pointer font-medium transition-colors"
        title="在新窗口中打开">
        <span>在新窗口中打开</span>
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </button>
    </div>
  </div>
</template>
