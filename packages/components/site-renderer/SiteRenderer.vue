<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import PageRenderer from '../page-renderer/PageRenderer.vue'
import NavbarBlock from '../navbar/NavbarBlock.vue'
import FooterBlock from '../footer/FooterBlock.vue'
import { builtInBlocks } from '../page-renderer/blockMap'
import { defaultData } from './defaultData'

defineOptions({
  name: 'SiteRenderer'
})

const props = defineProps({
  data: {
    type: Object,
    default: () => defaultData
  },
  variant: {
    type: [String, Number],
    default: undefined
  },
  navbar: {
    type: [Object, String, Function, Boolean],
    default: undefined
  },
  footer: {
    type: [Object, String, Function, Boolean],
    default: undefined
  },
  pages: {
    type: [Object, Array],
    default: undefined
  },
  currentPath: {
    type: String,
    default: undefined
  },
  routeMode: {
    type: String,
    default: undefined,
    validator: (val) => ['hash', 'history', 'memory'].includes(val)
  },
  defaultPath: {
    type: String,
    default: undefined
  },
  siteTitle: {
    type: String,
    default: undefined
  },
  containerClass: {
    type: String,
    default: undefined
  },
  transition: {
    type: [String, Object, Boolean],
    default: 'fade'
  },
  keepAlive: {
    type: [Boolean, Array],
    default: false
  }
})

const emit = defineEmits([
  'update:currentPath',
  'update:path',
  'page-change',
  'error',
  'submit'
])

// 1. 规范化基础配置
const resolvedRouteMode = computed(() => {
  return props.routeMode || props.data?.routeMode || 'hash'
})

const resolvedDefaultPath = computed(() => {
  return props.defaultPath || props.data?.defaultPath || '/'
})

const resolvedSiteTitle = computed(() => {
  return props.siteTitle ?? props.data?.siteTitle ?? ''
})

const resolvedVariant = computed(() => {
  if (props.variant !== undefined) return String(props.variant)
  if (props.data?.variant !== undefined) return String(props.data?.variant)
  return undefined
})

const resolvedContainerClass = computed(() => {
  return props.containerClass ?? props.data?.containerClass ?? 'min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300'
})

// 2. 路由路径标准化工具函数
function normalizePath(raw) {
  if (!raw) return '/'
  let p = String(raw).trim()
  if (p.startsWith('#/')) {
    p = p.slice(1)
  } else if (p.startsWith('#')) {
    p = p.slice(1)
  }
  if (!p.startsWith('/')) {
    p = '/' + p
  }
  // 保持单斜杠首页为 '/'，其他路径去掉末尾斜杠
  if (p.length > 1 && p.endsWith('/')) {
    p = p.slice(0, -1)
  }
  return p
}

// 3. 读取浏览器当前路径
function getBrowserPath() {
  if (typeof window === 'undefined') return resolvedDefaultPath.value

  if (resolvedRouteMode.value === 'hash') {
    const hash = window.location.hash
    return hash ? normalizePath(hash) : resolvedDefaultPath.value
  }

  if (resolvedRouteMode.value === 'history') {
    const path = window.location.pathname
    return path ? normalizePath(path) : resolvedDefaultPath.value
  }

  return resolvedDefaultPath.value
}

// 内部当前路由状态
const activePath = ref(
  props.currentPath ? normalizePath(props.currentPath) : getBrowserPath()
)

// 4. 标准化 pages 集合为字典映射表
const normalizedPages = computed(() => {
  const raw = props.pages || props.data?.pages || {}
  const map = {}

  if (Array.isArray(raw)) {
    raw.forEach((item) => {
      if (item && item.path) {
        map[normalizePath(item.path)] = item
      }
    })
  } else if (typeof raw === 'object' && raw !== null) {
    Object.keys(raw).forEach((key) => {
      map[normalizePath(key)] = raw[key]
    })
  }

  return map
})

// 页面加载与 404 状态
const isLoading = ref(false)
const is404 = ref(false)
const currentPageData = ref(null)

// 5. 动态计算当前页面的 SEO，无缝注入全站标题后缀
const currentPageSeo = computed(() => {
  if (!currentPageData.value) return undefined

  const rawSeo = currentPageData.value.seo || {}
  const rawTitle = rawSeo.title || currentPageData.value.title || ''
  const suffix = resolvedSiteTitle.value

  let fullTitle = rawTitle
  if (suffix) {
    if (rawTitle) {
      fullTitle = rawTitle.includes(suffix) ? rawTitle : `${rawTitle} - ${suffix}`
    } else {
      fullTitle = suffix
    }
  }

  return {
    ...rawSeo,
    title: fullTitle,
    description: rawSeo.description || currentPageData.value.description,
    keywords: rawSeo.keywords || currentPageData.value.keywords
  }
})

// 6. 核心页面加载调度逻辑
async function loadPage(targetPath, oldPath = '') {
  const path = normalizePath(targetPath)
  const pageDef = normalizedPages.value[path]

  // 1. 匹配到页面配置
  if (pageDef) {
    is404.value = false

    // 支持异步懒加载函数 (如 () => import('./about.json'))
    if (typeof pageDef === 'function') {
      isLoading.value = true
      try {
        const result = await pageDef()
        currentPageData.value = result?.default || result
        emit('page-change', path, oldPath, currentPageData.value)
      } catch (err) {
        emit('error', { type: 'load-failed', path, error: err })
      } finally {
        isLoading.value = false
      }
    } else {
      currentPageData.value = pageDef
      emit('page-change', path, oldPath, currentPageData.value)
    }
  } else {
    // 2. 未匹配到路由，进入 404 检查
    const notFoundDef = normalizedPages.value['/404'] || normalizedPages.value['404']
    if (notFoundDef) {
      if (typeof notFoundDef === 'function') {
        isLoading.value = true
        try {
          const res = await notFoundDef()
          currentPageData.value = res?.default || res
        } catch (err) {
          currentPageData.value = null
        } finally {
          isLoading.value = false
        }
      } else {
        currentPageData.value = notFoundDef
      }
    } else {
      currentPageData.value = null
    }

    is404.value = true
    emit('error', { type: '404', path })
    emit('page-change', path, oldPath, null)
  }

  // 切换页面后平滑滚动回顶部
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// 7. 同步浏览器地址栏 URL
function syncBrowserUrl(path) {
  if (typeof window === 'undefined') return

  if (resolvedRouteMode.value === 'hash') {
    const targetHash = path === '/' ? '#/' : `#${path}`
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash
    }
  } else if (resolvedRouteMode.value === 'history') {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path)
    }
  }
}

// 8. 统一页面跳转导航方法
function navigateTo(targetPath, shouldSyncUrl = true) {
  const nextPath = normalizePath(targetPath)
  if (nextPath === activePath.value && !is404.value) return

  const oldPath = activePath.value
  activePath.value = nextPath

  if (shouldSyncUrl) {
    syncBrowserUrl(nextPath)
  }

  emit('update:currentPath', nextPath)
  emit('update:path', nextPath)

  loadPage(nextPath, oldPath)
}

// 9. 全局点击事件拦截（Event Delegation）
function handleContainerClick(e) {
  const link = e.target.closest('a')
  if (!link) return

  // 忽略在新窗口打开、下载附件等非站内导航行为
  if (link.target === '_blank' || link.hasAttribute('download')) return

  const href = link.getAttribute('href')
  if (!href || href === '#' || href.startsWith('javascript:')) return

  // 忽略外链协议
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return
  }

  // 页面内纯锚点滚动处理 (如 href="#pricing")
  if (href.startsWith('#') && !href.startsWith('#/')) {
    const anchorId = href.slice(1)
    const targetEl = document.getElementById(anchorId)
    if (targetEl) {
      e.preventDefault()
      targetEl.scrollIntoView({ behavior: 'smooth' })
    }
    return
  }

  // 站内路由跳转无刷新拦截
  e.preventDefault()
  const targetRoute = normalizePath(href)
  navigateTo(targetRoute)
}

// 10. 解析公共导航栏与页脚组件
function resolveBlock(type) {
  if (!type) return null
  return builtInBlocks[type] || type
}

function resolveComponentConfig(input, defaultFallback, defaultType) {
  if (input === false || input === null) return null
  const source = input !== undefined ? input : defaultFallback
  if (source === false || source === null) return null
  if (!source) return null

  // 1. 直接传入组件对象或渲染函数
  if (
    typeof source === 'function' ||
    (typeof source === 'object' && !source.type && !source.is && (source.render || source.setup || source.__vccOpts || source.name))
  ) {
    return { component: source, props: {} }
  }

  // 2. 字符串组件名
  if (typeof source === 'string') {
    const comp = resolveBlock(source)
    return comp ? { component: comp, props: {} } : null
  }

  // 3. 区块配置对象
  if (typeof source === 'object') {
    const compType = source.type || source.is || defaultType
    const comp = typeof compType === 'string' ? resolveBlock(compType) : compType
    if (!comp) return null
    return {
      component: comp,
      props: {
        id: source.id,
        variant: resolvedVariant.value || source.variant,
        data: source.data,
        styles: source.styles
      }
    }
  }

  return null
}

const resolvedNavbar = computed(() => {
  const base = resolveComponentConfig(props.navbar, props.data?.navbar, 'NavbarBlock')
  if (!base) return null

  // 深度注入 active 状态，实现导航栏菜单与当前路由的无缝高亮联动
  if (base.props && base.props.data) {
    const rawData = base.props.data
    const current = activePath.value

    let navLinks = rawData.navLinks
    if (Array.isArray(navLinks)) {
      navLinks = navLinks.map((item) => {
        const itemRoute = item.link ? normalizePath(item.link) : ''
        const isCurrent = Boolean(itemRoute && itemRoute === current)
        const hasActiveChild = Boolean(
          Array.isArray(item.children) &&
          item.children.some((child) => child.link && normalizePath(child.link) === current)
        )

        const children = Array.isArray(item.children)
          ? item.children.map((child) => ({
              ...child,
              active: child.link ? normalizePath(child.link) === current : false
            }))
          : item.children

        return {
          ...item,
          active: isCurrent || hasActiveChild,
          children
        }
      })
    }

    return {
      ...base,
      props: {
        ...base.props,
        data: {
          ...rawData,
          navLinks
        }
      }
    }
  }

  return base
})

const resolvedFooter = computed(() => {
  return resolveComponentConfig(props.footer, props.data?.footer, 'FooterBlock')
})

// 11. 浏览器导航事件监听
function onHashChange() {
  if (resolvedRouteMode.value !== 'hash') return
  const currentBrowserPath = normalizePath(window.location.hash)
  if (currentBrowserPath !== activePath.value) {
    navigateTo(currentBrowserPath, false)
  }
}

function onPopState() {
  if (resolvedRouteMode.value !== 'history') return
  const currentBrowserPath = normalizePath(window.location.pathname)
  if (currentBrowserPath !== activePath.value) {
    navigateTo(currentBrowserPath, false)
  }
}

// 监听外部 v-model:currentPath 同步
watch(
  () => props.currentPath,
  (newVal) => {
    if (newVal !== undefined && normalizePath(newVal) !== activePath.value) {
      navigateTo(newVal, true)
    }
  }
)

// 监听配置数据源动态变化
watch(
  () => normalizedPages.value,
  () => {
    loadPage(activePath.value)
  },
  { deep: true }
)

onMounted(() => {
  if (typeof window !== 'undefined') {
    if (resolvedRouteMode.value === 'hash') {
      window.addEventListener('hashchange', onHashChange)
      if (!window.location.hash) {
        syncBrowserUrl(activePath.value)
      }
    } else if (resolvedRouteMode.value === 'history') {
      window.addEventListener('popstate', onPopState)
    }
  }

  // 初始化加载首屏页面
  loadPage(activePath.value)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('hashchange', onHashChange)
    window.removeEventListener('popstate', onPopState)
  }
})
</script>

<template>
  <div class="v-site-renderer relative flex-1 flex flex-col" :class="resolvedContainerClass" @click="handleContainerClick">
    <!-- 导航栏上方插槽（如全站公告栏） -->
    <slot name="before-navbar" />

    <!-- 全站公共导航栏 -->
    <slot name="navbar" :active-path="activePath" :navigate-to="navigateTo">
      <component
        :is="resolvedNavbar.component"
        v-if="resolvedNavbar"
        v-bind="resolvedNavbar.props"
      />
    </slot>

    <!-- 导航栏下方插槽 -->
    <slot name="after-navbar" />

    <!-- 页面核心渲染区 -->
    <div class="site-main-wrapper flex-1 flex flex-col" :style="{ minHeight: 'calc(100vh - 140px)' }">
      <!-- 页面加载中指示器 -->
      <div v-if="isLoading" class="flex-1 flex items-center justify-center py-24">
        <div class="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-xl shadow-lg border border-slate-200/80 dark:border-slate-700/80">
          <svg class="animate-spin h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">页面加载中...</span>
        </div>
      </div>

      <!-- 404 兜底展示 -->
      <div v-else-if="is404 && !currentPageData" class="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <slot name="not-found" :path="activePath" :navigate-to="navigateTo">
          <div class="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <span class="inline-block text-6xl mb-4">🔍</span>
            <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">404</h1>
            <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">页面未找到</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 break-all">
              抱歉，您访问的路径 <code class="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-indigo-600">{{ activePath }}</code> 不存在或已被移除。
            </p>
            <button
              type="button"
              class="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click="navigateTo('/')"
            >
              返回网站首页
            </button>
          </div>
        </slot>
      </div>

      <!-- 正式页面内容渲染（复用 PageRenderer 并托管 SEO、主体区块与统一变体） -->
      <PageRenderer
        v-else-if="currentPageData"
        :key="`${activePath}_${resolvedVariant || 'default'}`"
        :data="currentPageData"
        :variant="resolvedVariant"
        :navbar="false"
        :footer="false"
        :seo="currentPageSeo"
        @submit="(payload, ctx) => emit('submit', payload, ctx)"
      />
    </div>

    <!-- 页脚上方插槽 -->
    <slot name="before-footer" />

    <!-- 全站公共页脚 -->
    <slot name="footer" :active-path="activePath" :navigate-to="navigateTo">
      <component
        :is="resolvedFooter.component"
        v-if="resolvedFooter"
        v-bind="resolvedFooter.props"
      />
    </slot>

    <!-- 页脚下方插槽 -->
    <slot name="after-footer" />
  </div>
</template>
