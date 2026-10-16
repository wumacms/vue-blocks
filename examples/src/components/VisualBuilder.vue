<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import {
  PageRenderer,
  blockRegistry,
  CATEGORY_DEFINITIONS,
  THEME_HUES,
  applyTheme
} from 'vue-blocks'

// 引入拆分后的模块化子组件与存储工具
import BuilderHeader from './builder/BuilderHeader.vue'
import MaterialPalette from './builder/MaterialPalette.vue'
import PropertyInspector from './builder/PropertyInspector.vue'
import JsonExportModal from './builder/JsonExportModal.vue'
import {
  DEFAULT_PAGES,
  DEFAULT_STORAGE_KEY,
  loadStoredPages,
  saveStoredPages
} from '../utils/storage.js'

// 1. 标准组件 Props 与 Emits 契约定义
const props = defineProps({
  // 多页面配置数组输入（支持由宿主系统或 CMS 外部传入）
  pages: {
    type: Array,
    default: undefined
  },
  // 当前激活编辑的页面 ID
  activePageId: {
    type: String,
    default: undefined
  },
  // 本地持久化缓存 key（设为 false 则禁用自动持久化）
  storageKey: {
    type: [String, Boolean],
    default: DEFAULT_STORAGE_KEY
  },
  // 外部保存中状态
  isSaving: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:activePageId',
  'update:pages',
  'save',
  'change',
  'exit'
])

// 补全区块的缺省数据，确保列表项在加载时即完备可用
function hydrateInitialBlocks(blocks = []) {
  return blocks.map((b) => {
    const entry = blockRegistry.get(b.type)
    const defaultData = entry?.defaultData ? JSON.parse(JSON.stringify(entry.defaultData)) : {}
    return {
      ...b,
      data: {
        ...defaultData,
        ...(b.data || {})
      },
      styles: b.styles || {}
    }
  })
}

// 补全所有页面的初始缺省数据
function hydrateAllPages(pageList) {
  return pageList.map((p) => ({
    ...p,
    containerClass: p.containerClass || 'min-h-screen bg-background text-foreground transition-colors duration-300',
    blocks: hydrateInitialBlocks(p.blocks || [])
  }))
}

// 2. 本地响应式多页面配置数据（优先使用 props.pages，次之使用 localStorage，再次使用 DEFAULT_PAGES）
function getInitialPages() {
  if (Array.isArray(props.pages) && props.pages.length > 0) {
    return hydrateAllPages(JSON.parse(JSON.stringify(props.pages)))
  }
  const loaded = loadStoredPages(props.storageKey || DEFAULT_STORAGE_KEY)
  return hydrateAllPages(loaded)
}

const localPages = ref(getInitialPages())
let isSyncingProps = false

// 监听父级传入的 pages 属性变更
watch(
  () => props.pages,
  (newPages) => {
    if (Array.isArray(newPages) && newPages.length > 0) {
      // 避免内容未发生变动时重复全量深拷贝重置对象引用，切断无限回环
      const currentJson = JSON.stringify(localPages.value)
      const newJson = JSON.stringify(newPages)
      if (currentJson !== newJson) {
        isSyncingProps = true
        localPages.value = hydrateAllPages(JSON.parse(newJson))
        nextTick(() => {
          isSyncingProps = false
        })
      }
    }
  },
  { deep: true }
)

// 当前正在编辑的页面 ID
const currentPageId = ref(
  props.activePageId || localPages.value[0]?.id || 'home'
)

watch(
  () => props.activePageId,
  (newId) => {
    if (newId && newId !== currentPageId.value) {
      switchPage(newId)
    }
  }
)

const currentPageIndex = computed(() => {
  return localPages.value.findIndex((p) => p.id === currentPageId.value)
})

const currentPage = computed(() => {
  const idx = currentPageIndex.value
  return idx !== -1 ? localPages.value[idx] : localPages.value[0] || null
})

// 页面级响应式属性便捷双向绑定
const pageVariant = computed({
  get: () => currentPage.value?.variant || '1',
  set: (val) => {
    if (currentPage.value && currentPage.value.variant !== val) {
      currentPage.value.variant = val
      markDirty()
    }
  }
})

const pageTheme = computed({
  get: () => currentPage.value?.theme || 'blue',
  set: (val) => {
    if (currentPage.value && currentPage.value.theme !== val) {
      currentPage.value.theme = val
      markDirty()
    }
  }
})

const pageMode = computed({
  get: () => currentPage.value?.mode || 'light',
  set: (val) => {
    if (currentPage.value && currentPage.value.mode !== val) {
      currentPage.value.mode = val
      markDirty()
    }
  }
})

const pageData = computed(() => {
  return currentPage.value || { blocks: [] }
})

// 3. 响应式视口设备尺寸、模式与侧边栏折叠状态
const currentDevice = ref('desktop') // 'desktop' | 'tablet' | 'mobile'
const isEditMode = ref(true) // 编辑态 vs 纯净预览态
const showJsonModal = ref(false)
const isLeftSidebarOpen = ref(true) // 左侧物料库面板展开/收起
const isRightSidebarOpen = ref(true) // 右侧属性检查器面板展开/收起

// 脏状态标记（未保存修改标记）
const isDirty = ref(false)

function markDirty() {
  isDirty.value = true
  emit('change', {
    pageId: currentPageId.value,
    pageData: currentPage.value,
    allPages: localPages.value
  })
}

// 4. 独立视口 iframe 与 DOM 引用
const iframeRef = ref(null)
const iframeDoc = ref(null)
let headObserver = null

// 5. 撤销 / 重做（Undo / Redo）历史栈管理（页面维度隔离）
const history = ref([])
const historyIndex = ref(-1)
let isHistoryNavigating = false
let historyTimer = null

function pushHistorySnapshot() {
  if (isHistoryNavigating || !currentPage.value) return
  const snapshot = JSON.stringify({
    pageData: currentPage.value,
    variant: pageVariant.value,
    theme: pageTheme.value,
    mode: pageMode.value
  })

  if (historyIndex.value < history.value.length - 1) {
    history.value = history.value.slice(0, historyIndex.value + 1)
  }
  history.value.push(snapshot)
  if (history.value.length > 30) {
    history.value.shift()
  }
  historyIndex.value = history.value.length - 1
}

const canUndo = computed(() => historyIndex.value > 0)
const canRedo = computed(() => historyIndex.value < history.value.length - 1)

function undo() {
  if (!canUndo.value || !currentPage.value) return
  isHistoryNavigating = true
  historyIndex.value--
  const state = JSON.parse(history.value[historyIndex.value])
  Object.assign(currentPage.value, state.pageData)
  pageVariant.value = state.variant
  pageTheme.value = state.theme
  pageMode.value = state.mode
  markDirty()
  applyTheme({ theme: state.theme, mode: state.mode, target: document.documentElement })
  if (iframeDoc.value) {
    syncIframeTheme(iframeDoc.value)
  }
  nextTick(() => {
    isHistoryNavigating = false
    checkTeleportTarget()
    syncSelectionHighlight()
  })
}

function redo() {
  if (!canRedo.value || !currentPage.value) return
  isHistoryNavigating = true
  historyIndex.value++
  const state = JSON.parse(history.value[historyIndex.value])
  Object.assign(currentPage.value, state.pageData)
  pageVariant.value = state.variant
  pageTheme.value = state.theme
  pageMode.value = state.mode
  markDirty()
  applyTheme({ theme: state.theme, mode: state.mode, target: document.documentElement })
  if (iframeDoc.value) {
    syncIframeTheme(iframeDoc.value)
  }
  nextTick(() => {
    isHistoryNavigating = false
    checkTeleportTarget()
    syncSelectionHighlight()
  })
}

let isSwitchingPage = false

// 监听数据变动记录历史并触发脏状态
watch(
  () => currentPage.value,
  () => {
    if (!isHistoryNavigating && !isSwitchingPage && !isSyncingProps) {
      markDirty()
    }
    clearTimeout(historyTimer)
    historyTimer = setTimeout(() => {
      pushHistorySnapshot()
    }, 400)
  },
  { deep: true }
)

// 6. 多页面切换核心方法
function switchPage(pageId) {
  if (!pageId || pageId === currentPageId.value) return
  isSwitchingPage = true
  currentPageId.value = pageId
  emit('update:activePageId', pageId)

  // 清除区块选中状态，防止跨页面找不到对应 ID
  selectedBlockId.value = ''
  selectedBlockEl.value = null

  // 重置单页面隔离的历史栈
  history.value = []
  historyIndex.value = -1
  pushHistorySnapshot()

  // 同步新页面的主题与色彩模式
  if (currentPage.value) {
    applyTheme({
      theme: currentPage.value.theme || 'blue',
      mode: currentPage.value.mode || 'light',
      target: document.documentElement
    })
    if (iframeDoc.value) {
      syncIframeTheme(iframeDoc.value)
    }
  }

  nextTick(() => {
    checkTeleportTarget()
    syncSelectionHighlight()
    isSwitchingPage = false
  })
}

// 7. 选中目标与属性联动
const selectedBlockId = ref('')
const selectedBlockEl = ref(null)

function checkTeleportTarget() {
  if (!iframeDoc.value || !isEditMode.value || !selectedBlockId.value) {
    selectedBlockEl.value = null
    return
  }
  selectedBlockEl.value = iframeDoc.value.querySelector(`[data-wuma-block-id="${selectedBlockId.value}"]`)
}

const selectedBlockIndex = computed(() => {
  if (!currentPage.value) return -1
  return currentPage.value.blocks.findIndex((b) => b.id === selectedBlockId.value)
})

const selectedBlock = computed(() => {
  return selectedBlockIndex.value !== -1 ? currentPage.value.blocks[selectedBlockIndex.value] : null
})

const selectedBlockEntry = computed(() => {
  if (!selectedBlock.value) return null
  return blockRegistry.get(selectedBlock.value.type) || null
})

const selectedBlockManifest = computed(() => {
  return selectedBlockEntry.value?.manifest || null
})

const allManifests = computed(() => blockRegistry.getAllManifests())

// 样式与主题同步至 iframe 沙箱
function syncIframeStyles(doc) {
  if (!doc || !doc.head) return

  // 1. 同步所有外部样式表和 style 节点
  const parentNodes = document.head.querySelectorAll('style, link[rel="stylesheet"], link[rel="preconnect"]')

  // 移除此前同步注入的节点
  doc.head.querySelectorAll('[data-synced-style="true"]').forEach((n) => n.remove())

  parentNodes.forEach((node) => {
    const clone = node.cloneNode(true)
    clone.setAttribute('data-synced-style', 'true')
    doc.head.appendChild(clone)
  })

  // 2. 注入针对 iframe 内部的基础与编辑器辅助样式
  const editorStyle = doc.createElement('style')
  editorStyle.setAttribute('data-synced-style', 'true')
  editorStyle.textContent = `
    html, body {
      margin: 0;
      padding: 0;
      min-height: 100%;
      background-color: transparent;
      overflow-x: hidden;
    }
    /* 画布编辑态高亮选中框与悬浮反馈 */
    [data-wuma-editable="true"] [data-wuma-block-id] {
      position: relative;
      transition: outline 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
    }
    [data-wuma-editable="true"] [data-wuma-block-id]:hover {
      outline: 2px dashed rgba(99, 102, 241, 0.45);
      outline-offset: -2px;
    }
    [data-wuma-editable="true"] [data-wuma-block-id].is-selected-block {
      outline: 2px solid #6366f1 !important;
      outline-offset: -2px;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18) !important;
    }
  `
  doc.head.appendChild(editorStyle)
}

function syncIframeTheme(doc) {
  if (!doc || !currentPage.value) return
  applyTheme({
    theme: currentPage.value.theme || 'blue',
    mode: currentPage.value.mode || 'light',
    target: doc.documentElement
  })
}

function handleIframeLoad() {
  const iframe = iframeRef.value
  if (!iframe) return
  const doc = iframe.contentDocument || iframe.contentWindow?.document
  if (!doc) return
  iframeDoc.value = doc
  syncIframeStyles(doc)
  syncIframeTheme(doc)

  try {
    iframe.contentWindow?.removeEventListener('keydown', handleKeydown)
    iframe.contentWindow?.addEventListener('keydown', handleKeydown)
  } catch (e) {
    // ignore
  }

  nextTick(() => {
    checkTeleportTarget()
    syncSelectionHighlight()
  })
}

function setupHeadObserver() {
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return
  headObserver = new MutationObserver(() => {
    if (iframeDoc.value) {
      syncIframeStyles(iframeDoc.value)
    }
  })
  headObserver.observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true
  })
}

// 8. 画布选中态高亮与浮动操作栏同步
function syncSelectionHighlight() {
  if (!iframeDoc.value) return
  const allBlockEls = iframeDoc.value.querySelectorAll('[data-wuma-block-id]')
  allBlockEls.forEach((el) => {
    if (isEditMode.value && selectedBlockId.value && el.getAttribute('data-wuma-block-id') === selectedBlockId.value) {
      el.classList.add('is-selected-block')
    } else {
      el.classList.remove('is-selected-block')
    }
  })
}

watch([selectedBlockId, isEditMode], () => {
  nextTick(() => {
    checkTeleportTarget()
    syncSelectionHighlight()
  })
})

watch(
  () => currentPage.value?.blocks.map((b) => b.id),
  () => {
    nextTick(() => {
      checkTeleportTarget()
      syncSelectionHighlight()
    })
  }
)

watch([pageTheme, pageMode], ([theme, mode]) => {
  applyTheme({ theme, mode, target: document.documentElement })
  if (iframeDoc.value) {
    syncIframeTheme(iframeDoc.value)
  }
})

// 9. 区块管理操作：添加、移动、复制、删除
function addBlock(manifest, insertIndex = undefined) {
  if (!currentPage.value) return
  const type = manifest.name
  const entry = blockRegistry.get(type)
  const defaultData = entry?.defaultData ? JSON.parse(JSON.stringify(entry.defaultData)) : {}
  const uniqueId = `${type.toLowerCase()}-${Math.random().toString(36).slice(2, 7)}`

  const newBlock = {
    id: uniqueId,
    type: type,
    variant: undefined,
    data: defaultData,
    styles: {}
  }

  const targetIndex = insertIndex !== undefined ? insertIndex : currentPage.value.blocks.length
  currentPage.value.blocks.splice(targetIndex, 0, newBlock)
  selectedBlockId.value = uniqueId
  markDirty()
  scrollToBlock(uniqueId)
}

function removeBlock(index) {
  if (!currentPage.value || currentPage.value.blocks.length <= 1) {
    alert('页面至少需要保留一个区块！')
    return
  }
  const removedId = currentPage.value.blocks[index].id
  currentPage.value.blocks.splice(index, 1)
  markDirty()
  if (selectedBlockId.value === removedId) {
    const nextIndex = Math.min(index, currentPage.value.blocks.length - 1)
    selectedBlockId.value = currentPage.value.blocks[nextIndex].id
  }
}

function duplicateBlock(index) {
  if (!currentPage.value) return
  const source = currentPage.value.blocks[index]
  const clone = JSON.parse(JSON.stringify(source))
  clone.id = `${source.type.toLowerCase()}-${Math.random().toString(36).slice(2, 7)}`
  currentPage.value.blocks.splice(index + 1, 0, clone)
  selectedBlockId.value = clone.id
  markDirty()
  scrollToBlock(clone.id)
}

function moveBlock(index, direction) {
  if (!currentPage.value) return
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= currentPage.value.blocks.length) return
  const item = currentPage.value.blocks.splice(index, 1)[0]
  currentPage.value.blocks.splice(targetIndex, 0, item)
  selectedBlockId.value = item.id
  markDirty()
  scrollToBlock(item.id)
}

function scrollToBlock(id) {
  nextTick(() => {
    if (!iframeDoc.value) return
    const el = iframeDoc.value.querySelector(`[data-wuma-block-id="${id}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      checkTeleportTarget()
      syncSelectionHighlight()
    }
  })
}

// 10. 保存与持久化核心逻辑
function handleSave() {
  isDirty.value = false
  if (props.storageKey) {
    saveStoredPages(localPages.value, props.storageKey)
  }
  emit('save', {
    pageId: currentPageId.value,
    pageData: currentPage.value,
    allPages: localPages.value
  })
  emit('update:pages', localPages.value)
}

// 11. 画布交互：处理点击选择与取消选中
function handleCanvasSelect(payload) {
  if (payload && payload.blockId) {
    selectedBlockId.value = payload.blockId
    if (!isRightSidebarOpen.value) {
      isRightSidebarOpen.value = true
    }
  } else {
    selectedBlockId.value = ''
  }
}

// 点击画布空白背景或非区块区域时取消选中
function handleCanvasBgClick(event) {
  if (!event.target.closest('[data-wuma-block-id]')) {
    selectedBlockId.value = ''
  }
}

// 键盘快捷键支持：按 ESC 键取消区块选中，按 Cmd/Ctrl+S 保存，Cmd+Z/Y 撤销重做
function handleKeydown(event) {
  // ESC 取消选中区块
  if (event.key === 'Escape') {
    selectedBlockId.value = ''
  }
  // Cmd+S / Ctrl+S 触发保存
  if ((event.metaKey || event.ctrlKey) && (event.key === 's' || event.key === 'S')) {
    event.preventDefault()
    handleSave()
  }
  // Cmd+Z 撤销
  if ((event.metaKey || event.ctrlKey) && (event.key === 'z' || event.key === 'Z') && !event.shiftKey) {
    event.preventDefault()
    undo()
  }
  // Cmd+Y 或 Cmd+Shift+Z 重做
  if (
    (event.metaKey || event.ctrlKey) &&
    (event.key === 'y' || event.key === 'Y' || (event.shiftKey && (event.key === 'z' || event.key === 'Z')))
  ) {
    event.preventDefault()
    redo()
  }
}

function handleBeforeUnload(e) {
  if (isDirty.value) {
    e.preventDefault()
    e.returnValue = '您有未保存的页面修改，确定要离开吗？'
    return e.returnValue
  }
}

function handleExit() {
  if (isDirty.value) {
    const confirmed = confirm('当前页面有未保存的修改，确定要离开编辑器返回站点前台吗？')
    if (!confirmed) return
  }
  emit('exit')
}

function resetCurrentPage() {
  if (!currentPage.value) return
  if (confirm(`确认重置页面【${currentPage.value.title}】为初始模板吗？所有未保存的修改将被清除。`)) {
    const defaultPage = DEFAULT_PAGES.find((p) => p.id === currentPageId.value) || DEFAULT_PAGES[0]
    if (defaultPage) {
      currentPage.value.blocks = hydrateInitialBlocks(defaultPage.blocks)
      currentPage.value.variant = defaultPage.variant || '1'
      currentPage.value.theme = defaultPage.theme || 'blue'
      currentPage.value.mode = defaultPage.mode || 'light'
      currentPage.value.seo = JSON.parse(JSON.stringify(defaultPage.seo || {}))
    }
    selectedBlockId.value = currentPage.value.blocks[0]?.id || ''
    markDirty()
    pushHistorySnapshot()
    nextTick(() => {
      checkTeleportTarget()
      syncSelectionHighlight()
    })
  }
}

onMounted(() => {
  pushHistorySnapshot()
  if (currentPage.value) {
    applyTheme({
      theme: currentPage.value.theme || 'blue',
      mode: currentPage.value.mode || 'light',
      target: document.documentElement
    })
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('beforeunload', handleBeforeUnload)
  }
  if (iframeRef.value?.contentDocument) {
    handleIframeLoad()
  }
  setupHeadObserver()

  // 默认选中第一个区块方便属性编辑
  if (currentPage.value?.blocks.length) {
    selectedBlockId.value = currentPage.value.blocks[0].id
  }
})

onUnmounted(() => {
  clearTimeout(historyTimer)
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
  if (headObserver) {
    headObserver.disconnect()
  }
  try {
    iframeRef.value?.contentWindow?.removeEventListener('keydown', handleKeydown)
  } catch (e) {
    // ignore
  }
})
</script>

<template>
  <div
    class="h-screen w-full flex flex-col bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 overflow-hidden font-sans select-none"
  >
    <!-- 顶部统一控制台导航栏组件：已集成多页面下拉菜单与保存按钮 -->
    <BuilderHeader
      v-model:current-device="currentDevice"
      v-model:is-edit-mode="isEditMode"
      v-model:is-left-sidebar-open="isLeftSidebarOpen"
      v-model:is-right-sidebar-open="isRightSidebarOpen"
      :can-undo="canUndo"
      :can-redo="canRedo"
      :block-count="currentPage?.blocks?.length || 0"
      :pages="localPages"
      :active-page-id="currentPageId"
      :is-dirty="isDirty"
      :is-saving="isSaving"
      @update:active-page-id="switchPage"
      @undo="undo"
      @redo="redo"
      @save="handleSave"
      @export-json="showJsonModal = true"
      @reset-page="resetCurrentPage"
      @exit="handleExit"
    />

    <!-- 主工作区：三栏布局（min-h-0 确保 flex 列子容器高度受限，零圆角画布直出） -->
    <div class="flex-1 min-h-0 flex overflow-hidden relative">
      <!-- 1. 左侧面板：物料中心与页面大纲组件（支持平滑折叠/展开，不占用画布空间） -->
      <div
        class="transition-all duration-300 ease-in-out shrink-0 relative flex h-full min-h-0"
        :class="isLeftSidebarOpen ? 'w-80' : 'w-0'"
      >
        <div
          class="w-80 h-full min-h-0 overflow-hidden flex flex-col transition-opacity duration-200"
          :class="{ 'opacity-0 pointer-events-none invisible': !isLeftSidebarOpen }"
        >
          <MaterialPalette
            :all-manifests="allManifests"
            :category-definitions="CATEGORY_DEFINITIONS"
            :blocks="currentPage?.blocks || []"
            :selected-block-id="selectedBlockId"
            @add-block="addBlock"
            @select-block="(id) => { selectedBlockId = id; scrollToBlock(id); }"
            @move-block="moveBlock"
            @duplicate-block="duplicateBlock"
            @remove-block="removeBlock"
          />
        </div>
        <!-- 侧边栏边缘悬浮折叠/展开把手按钮：基准边框严格对齐到画布左侧边框 -->
        <button
          type="button"
          @click="isLeftSidebarOpen = !isLeftSidebarOpen"
          class="absolute left-full -ml-px top-1/2 -translate-y-1/2 z-30 w-5.5 h-12 bg-white/95 dark:bg-zinc-850/95 backdrop-blur-sm border border-zinc-200/90 dark:border-zinc-800/90 rounded-r-md rounded-l-none shadow-xs hover:w-6 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all cursor-pointer"
          :title="isLeftSidebarOpen ? '收起物料大纲面板' : '展开物料大纲面板'"
        >
          <svg
            class="w-3.5 h-3.5 transition-transform duration-200"
            :class="{ 'rotate-180': !isLeftSidebarOpen }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <!-- 2. 中间：多端独立视口 iframe 仿真画布（零圆角设计，真响应式媒体查询隔离） -->
      <main
        class="flex-1 min-h-0 bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center overflow-hidden canvas-container relative"
        :class="currentDevice === 'desktop' ? 'p-0 justify-stretch' : 'p-4 sm:p-6 justify-center'"
        @click="handleCanvasBgClick"
      >
        <!-- 视口容器框架：彻底去除圆角 (rounded-none)，在不同设备模式下呈现精确仿真尺寸 -->
        <div
          class="transition-all duration-300 ease-out origin-top relative shrink-0 rounded-none bg-white dark:bg-zinc-900"
          :class="[
            currentDevice === 'desktop'
              ? 'w-full h-full border-none shadow-none'
              : currentDevice === 'tablet'
                ? 'w-[768px] max-w-full h-full max-h-full border-x-2 border-zinc-300 dark:border-zinc-700 shadow-2xl overflow-hidden'
                : 'w-[375px] max-w-full h-full max-h-full border-x-2 border-zinc-300 dark:border-zinc-700 shadow-2xl overflow-hidden'
          ]"
        >
          <!-- 独立视口 iframe 沙箱：提供真实的 window.innerWidth，真正触发全套 Tailwind 响应式媒体查询 -->
          <iframe
            ref="iframeRef"
            @load="handleIframeLoad"
            class="w-full h-full border-none block rounded-none bg-transparent"
          />

          <!-- 将 PageRenderer 通过 Teleport 挂载到 iframe 沙箱的 body 内部 -->
          <Teleport
            v-if="iframeDoc?.body && currentPage"
            :to="iframeDoc.body"
          >
            <PageRenderer
              :key="currentPage.id"
              :data="currentPage"
              :variant="pageVariant"
              :theme="pageTheme"
              :mode="pageMode"
              :editable="isEditMode"
              @select="handleCanvasSelect"
            />
          </Teleport>

          <!-- 精简快捷操作栏：显示在所选区块内部右上角 -->
          <Teleport
            v-if="selectedBlockEl && selectedBlock"
            :to="selectedBlockEl"
          >
            <div
              @click.stop
              data-wuma-editor-ui="true"
              class="absolute top-3 right-3 z-40 flex items-center gap-0.5 p-1 rounded-lg bg-zinc-900/90 dark:bg-zinc-800/90 backdrop-blur-md text-white shadow-xl border border-white/15 animate-in fade-in zoom-in-95 duration-150 select-none pointer-events-auto"
            >
              <!-- 区块类型小徽章 -->
              <span class="font-medium text-[11px] px-1.5 py-0.5 text-indigo-300 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                {{ selectedBlockManifest?.title || selectedBlock.type }}
              </span>

              <span class="w-px h-3 bg-white/20 mx-0.5"></span>

              <!-- 上移 -->
              <button
                type="button"
                @click="moveBlock(selectedBlockIndex, -1)"
                :disabled="selectedBlockIndex === 0"
                class="w-6 h-6 flex items-center justify-center rounded hover:bg-white/15 disabled:opacity-20 disabled:hover:bg-transparent transition cursor-pointer text-zinc-200"
                title="上移区块"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>

              <!-- 下移 -->
              <button
                type="button"
                @click="moveBlock(selectedBlockIndex, 1)"
                :disabled="selectedBlockIndex === (currentPage?.blocks?.length || 0) - 1"
                class="w-6 h-6 flex items-center justify-center rounded hover:bg-white/15 disabled:opacity-20 disabled:hover:bg-transparent transition cursor-pointer text-zinc-200"
                title="下移区块"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <!-- 复制 -->
              <button
                type="button"
                @click="duplicateBlock(selectedBlockIndex)"
                class="w-6 h-6 flex items-center justify-center rounded hover:bg-white/15 transition cursor-pointer text-zinc-200"
                title="复制区块"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>

              <!-- 删除 -->
              <button
                type="button"
                @click="removeBlock(selectedBlockIndex)"
                class="w-6 h-6 flex items-center justify-center rounded hover:bg-rose-500/25 transition cursor-pointer text-rose-300"
                title="删除区块"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>

              <span class="w-px h-3 bg-white/20 mx-0.5"></span>

              <!-- 取消选中 -->
              <button
                type="button"
                @click="selectedBlockId = ''"
                class="w-6 h-6 flex items-center justify-center rounded hover:bg-white/15 transition cursor-pointer text-zinc-400 hover:text-white"
                title="取消选中 (Esc)"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </Teleport>
        </div>
      </main>

      <!-- 3. 右侧面板：属性检查器组件（支持平滑折叠/展开，不压缩画布响应式宽度） -->
      <div
        class="transition-all duration-300 ease-in-out shrink-0 relative flex h-full min-h-0"
        :class="isRightSidebarOpen ? 'w-88' : 'w-0'"
      >
        <!-- 侧边栏边缘悬浮折叠/展开把手按钮：基准边框严格对齐到画布右侧边框 -->
        <button
          type="button"
          @click="isRightSidebarOpen = !isRightSidebarOpen"
          class="absolute right-full -mr-px top-1/2 -translate-y-1/2 z-30 w-5.5 h-12 bg-white/95 dark:bg-zinc-850/95 backdrop-blur-sm border border-zinc-200/90 dark:border-zinc-800/90 rounded-l-md rounded-r-none shadow-xs hover:w-6 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all cursor-pointer"
          :title="isRightSidebarOpen ? '收起属性检查器' : '展开属性检查器'"
        >
          <svg
            class="w-3.5 h-3.5 transition-transform duration-200"
            :class="{ 'rotate-180': !isRightSidebarOpen }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div
          class="w-88 h-full min-h-0 overflow-hidden flex flex-col transition-opacity duration-200"
          :class="{ 'opacity-0 pointer-events-none invisible': !isRightSidebarOpen }"
        >
          <PropertyInspector
            :selected-block="selectedBlock"
            :selected-block-manifest="selectedBlockManifest"
            :page-data="pageData"
            v-model:page-variant="pageVariant"
            v-model:page-theme="pageTheme"
            v-model:page-mode="pageMode"
            :theme-hues="THEME_HUES"
            @deselect-block="selectedBlockId = ''"
          />
        </div>
      </div>
    </div>

    <!-- 弹窗：导出 PageData JSON 组件 -->
    <JsonExportModal
      v-model="showJsonModal"
      :page-data="pageData"
    />
  </div>
</template>

<style scoped>
/* 画布编辑态高亮选中框与悬浮反馈 */
:deep([data-wuma-editable="true"] [data-wuma-block-id]) {
  position: relative;
  transition: outline 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
}

:deep([data-wuma-editable="true"] [data-wuma-block-id]:hover) {
  outline: 2px dashed rgba(99, 102, 241, 0.45);
  outline-offset: -2px;
}

:deep([data-wuma-editable="true"] [data-wuma-block-id].is-selected-block) {
  outline: 2px solid #6366f1 !important;
  outline-offset: -2px;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18) !important;
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.88; }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
