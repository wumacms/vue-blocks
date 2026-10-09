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

const blockName = ref('FeaturesBlock')
const variant = ref('1')
const previewId = ref('')

const CurrentComponent = computed(() => blockMap[blockName.value] || null)

function updateFromQuery() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  if (params.get('block')) blockName.value = params.get('block')
  if (params.get('variant')) variant.value = params.get('variant')
  if (params.get('id')) previewId.value = params.get('id')
  if (params.get('theme')) {
    if (params.get('theme') === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

// 立即在 setup 阶段同步初始化，彻底消除深色模式初绘时的白屏闪烁
updateFromQuery()

let lastSentHeight = 0

function sendHeight() {
  if (typeof window === 'undefined') return
  nextTick(() => {
    const rootEl = document.getElementById('preview-root')
    if (!rootEl) return

    // 严禁测量 document.documentElement 或 body 的 scrollHeight，
    // 因为 iframe 的 viewport 高度会作为其最小值，导致高度无法向下自适应回弹！
    // 采用 display: flow-root 隔离外边距折叠后，精确计算 preview-root 真实内容高度
    const rect = rootEl.getBoundingClientRect()
    const height = Math.ceil(Math.max(rootEl.scrollHeight, rootEl.offsetHeight, rect.height))

    // 阻尼保护：高度变化必须 >= 2px 才向外发送，杜绝浮点抖动与 1px 微循环
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

// 深度监控所有图片资源加载完成（解决图片加载慢导致底部截断）
function hookImages() {
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
  updateFromQuery()

  // 字体渲染完成后重新校准高度
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => sendHeight())
  }

  // 挂载图片监听器
  hookImages()

  // Sync dark class with parent window if same origin
  try {
    if (window.parent && window.parent.document) {
      const isParentDark = window.parent.document.documentElement.classList.contains('dark')
      document.documentElement.classList.toggle('dark', isParentDark)

      // Observe parent class changes
      const parentObserver = new MutationObserver(() => {
        const isDark = window.parent.document.documentElement.classList.contains('dark')
        document.documentElement.classList.toggle('dark', isDark)
      })
      parentObserver.observe(window.parent.document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      })
    }
  } catch (e) {
    // Ignore cross-origin error if any
  }

  // Handle message events
  window.addEventListener('message', (event) => {
    const data = event.data
    if (!data || typeof data !== 'object') return
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
      document.documentElement.classList.toggle('dark', !!data.isDark)
    }
    if (data.type === 'request-height') {
      sendHeight()
    }
  })

  // ResizeObserver 精准监听 preview-root
  const rootEl = document.getElementById('preview-root')
  if (typeof ResizeObserver !== 'undefined' && rootEl) {
    resizeObserver = new ResizeObserver(() => {
      sendHeight()
    })
    resizeObserver.observe(rootEl)
  }

  // MutationObserver 监听任何 DOM 变化与新图片
  if (typeof MutationObserver !== 'undefined' && rootEl) {
    mutationObserver = new MutationObserver(() => {
      hookImages()
      sendHeight()
    })
    mutationObserver.observe(rootEl, { childList: true, subtree: true, attributes: true })
  }

  window.addEventListener('resize', sendHeight)
  window.addEventListener('load', sendHeight)

  // 阶段式定时器保障复杂图层在异步加载后完全展开
  const delays = [30, 80, 150, 300, 600, 1200, 2000, 3000]
  delays.forEach((d) => setTimeout(sendHeight, d))
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
  if (mutationObserver) mutationObserver.disconnect()
  window.removeEventListener('resize', sendHeight)
  window.removeEventListener('load', sendHeight)
})
</script>

<template>
  <div id="preview-root"
    class="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200"
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
