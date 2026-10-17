<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import PageRenderer from '../page-renderer/index.js'
import { applyTheme } from '@vue-blocks/utils'


import {
  createEditorState,
  provideEditorState
} from './state/editorState.js'
import {
  LocalStorageAdapter,
  DEFAULT_STORAGE_KEY
} from './state/storageAdapter.js'
import { DEFAULT_PAGES } from './state/defaultPages.js'

import BuilderHeader from './components/BuilderHeader.vue'
import MaterialPalette from './components/MaterialPalette.vue'
import PropertyInspector from './components/PropertyInspector.vue'
import JsonExportModal from './components/JsonExportModal.vue'

defineOptions({
  name: 'VisualBuilder'
})

// 1. 标准 Props 与 Emits 契约定义
const props = defineProps({
  // 多页面配置数组输入（支持由宿主系统外部传入）
  pages: {
    type: Array,
    default: undefined
  },
  // 当前激活编辑的页面 ID
  activePageId: {
    type: String,
    default: undefined
  },
  // 持久化存储 key（设为 false 则禁用自动持久化）
  storageKey: {
    type: [String, Boolean],
    default: DEFAULT_STORAGE_KEY
  },
  // 自定义持久化适配器（可选扩展）
  storageAdapter: {
    type: Object,
    default: undefined
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

// 初始化持久化适配器
const effectiveAdapter = props.storageAdapter || (
  props.storageKey !== false
    ? new LocalStorageAdapter(typeof props.storageKey === 'string' ? props.storageKey : DEFAULT_STORAGE_KEY)
    : undefined
)

// 2. 初始化核心编辑器单向状态机并注入上下文
const editor = createEditorState({
  pages: props.pages,
  activePageId: props.activePageId,
  storageAdapter: effectiveAdapter
})

provideEditorState(editor)

// 注册画布滚动处理器至状态控制器
editor.setScrollHandler(scrollToBlock)

// 外部属性同步

let isSyncingProps = false
watch(
  () => props.pages,
  (newPages) => {
    if (Array.isArray(newPages) && newPages.length > 0) {
      const currentJson = JSON.stringify(editor.pages.value)
      const newJson = JSON.stringify(newPages)
      if (currentJson !== newJson) {
        isSyncingProps = true
        editor.pages.value = JSON.parse(newJson)
        nextTick(() => {
          isSyncingProps = false
        })
      }
    }
  },
  { deep: true }
)

watch(
  () => props.activePageId,
  (newId) => {
    if (newId && newId !== editor.activePageId.value) {
      editor.switchPage(newId)
    }
  }
)

watch(
  () => editor.activePageId.value,
  (newId) => {
    emit('update:activePageId', newId)
  }
)

watch(
  () => editor.isDirty.value,
  (dirty) => {
    if (dirty && !isSyncingProps) {
      emit('change', {
        pageId: editor.activePageId.value,
        pageData: editor.activePage.value,
        allPages: editor.pages.value
      })
    }
  }
)

// 外部 isSaving 绑定
watch(
  () => props.isSaving,
  (val) => {
    editor.isSaving.value = Boolean(val)
  },
  { immediate: true }
)

// 3. 独立视口 iframe 与 DOM 引用
const iframeRef = ref(null)
const iframeDoc = ref(null)
let headObserver = null
const showJsonModal = ref(false)

const activePage = computed(() => editor.activePage.value)
const selectedBlockId = computed(() => editor.selectedBlockId.value)
const selectedBlock = computed(() => editor.selectedBlock.value)
const selectedBlockIndex = computed(() => editor.selectedBlockIndex.value)
const selectedBlockManifest = computed(() => editor.selectedBlockManifest.value)
const selectedBlockEl = ref(null)

function checkTeleportTarget() {
  if (!iframeDoc.value || !editor.isEditMode.value || !selectedBlockId.value) {
    selectedBlockEl.value = null
    return
  }
  selectedBlockEl.value = iframeDoc.value.querySelector(
    `[data-wuma-block-id="${selectedBlockId.value}"]`
  )
}

function syncSelectionHighlight() {
  if (!iframeDoc.value) return
  const allBlockEls = iframeDoc.value.querySelectorAll('[data-wuma-block-id]')
  allBlockEls.forEach((el) => {
    if (
      editor.isEditMode.value &&
      selectedBlockId.value &&
      el.getAttribute('data-wuma-block-id') === selectedBlockId.value
    ) {
      el.classList.add('is-selected-block')
    } else {
      el.classList.remove('is-selected-block')
    }
  })
}

// 样式与主题同步至 iframe 沙箱
function syncIframeStyles(doc) {
  if (!doc || !doc.head) return

  // 1. 同步所有外部样式表和 style 节点
  const parentNodes = document.head.querySelectorAll(
    'style, link[rel="stylesheet"], link[rel="preconnect"]'
  )

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
  if (!doc || !activePage.value) return
  applyTheme({
    theme: activePage.value.theme || 'blue',
    mode: activePage.value.mode || 'light',
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

// 监听选中项与变体同步
watch(
  [selectedBlockId, () => editor.isEditMode.value],
  () => {
    nextTick(() => {
      checkTeleportTarget()
      syncSelectionHighlight()
    })
  }
)

watch(
  () => activePage.value?.blocks.map((b) => b.id),
  () => {
    nextTick(() => {
      checkTeleportTarget()
      syncSelectionHighlight()
    })
  }
)

watch(
  [() => activePage.value?.theme, () => activePage.value?.mode],
  ([theme, mode]) => {
    applyTheme({ theme, mode, target: document.documentElement })
    if (iframeDoc.value) {
      syncIframeTheme(iframeDoc.value)
    }
  }
)

// 画布交互：处理点击选择与取消选中
function handleCanvasSelect(payload) {
  if (payload && payload.blockId) {
    editor.selectBlock(payload.blockId)
  } else {
    editor.deselectBlock()
  }
}

function handleCanvasBgClick(event) {
  if (!event.target.closest('[data-wuma-block-id]')) {
    editor.deselectBlock()
  }
}

function scrollToBlock(id = selectedBlockId.value) {
  if (!id) return
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


// 键盘快捷键支持：按 ESC 键取消选中，Cmd+S 保存，Cmd+Z/Y 撤销重做
function handleKeydown(event) {
  if (event.key === 'Escape') {
    editor.deselectBlock()
  }
  if ((event.metaKey || event.ctrlKey) && (event.key === 's' || event.key === 'S')) {
    event.preventDefault()
    handleSave()
  }
  if ((event.metaKey || event.ctrlKey) && (event.key === 'z' || event.key === 'Z') && !event.shiftKey) {
    event.preventDefault()
    editor.undo()
    nextTick(() => {
      checkTeleportTarget()
      syncSelectionHighlight()
    })
  }
  if (
    (event.metaKey || event.ctrlKey) &&
    (event.key === 'y' || event.key === 'Y' || (event.shiftKey && (event.key === 'z' || event.key === 'Z')))
  ) {
    event.preventDefault()
    editor.redo()
    nextTick(() => {
      checkTeleportTarget()
      syncSelectionHighlight()
    })
  }
}

function handleBeforeUnload(e) {
  if (editor.isDirty.value) {
    e.preventDefault()
    e.returnValue = '您有未保存的页面修改，确定要离开吗？'
    return e.returnValue
  }
}

function handleExit() {
  if (editor.isDirty.value) {
    const confirmed = confirm('当前页面有未保存的修改，确定要离开编辑器返回站点前台吗？')
    if (!confirmed) return
  }
  emit('exit')
}

function handleSave() {
  const result = editor.save()
  emit('save', result)
  emit('update:pages', editor.pages.value)
}

function handleDeleteSelectedBlock() {
  if (!activePage.value || activePage.value.blocks.length <= 1) {
    alert('页面至少需要保留一个区块！')
    return
  }
  const blockTitle = selectedBlockManifest.value?.title || selectedBlock.value?.type || '该区块'
  if (confirm(`确认要删除区块【${blockTitle}】吗？`)) {
    editor.removeBlock(selectedBlockIndex.value)
  }
}


function handleResetPage() {
  if (!activePage.value) return
  if (confirm(`确认重置页面【${activePage.value.title}】为初始模板吗？所有未保存的修改将被清除。`)) {
    const defaultPage = DEFAULT_PAGES.find((p) => p.id === editor.activePageId.value) || DEFAULT_PAGES[0]
    editor.resetActivePage(defaultPage)
    nextTick(() => {
      checkTeleportTarget()
      syncSelectionHighlight()
    })
  }
}

onMounted(() => {
  if (activePage.value) {
    applyTheme({
      theme: activePage.value.theme || 'blue',
      mode: activePage.value.mode || 'light',
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

  // 默认高亮首个区块
  if (activePage.value?.blocks?.length) {
    editor.selectBlock(activePage.value.blocks[0].id)
  }
})

onUnmounted(() => {
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
    <!-- 顶部统一控制台导航栏组件 -->
    <BuilderHeader
      @export-json="showJsonModal = true"
      @reset-page="handleResetPage"
      @exit="handleExit"
    />

    <!-- 主工作区：三栏布局 -->
    <div class="flex-1 min-h-0 flex overflow-hidden relative">
      <!-- 1. 左侧面板：物料中心与页面大纲组件 -->
      <div
        class="transition-all duration-300 ease-in-out shrink-0 relative flex h-full min-h-0"
        :class="editor.isLeftSidebarOpen.value ? 'w-80' : 'w-0'"
      >
        <div
          class="w-80 h-full min-h-0 overflow-hidden flex flex-col transition-opacity duration-200"
          :class="{ 'opacity-0 pointer-events-none invisible': !editor.isLeftSidebarOpen.value }"
        >
          <MaterialPalette
            @select-block="scrollToBlock"
            @add-block="(_, newId) => scrollToBlock(newId)"
            @duplicate-block="(_, newId) => scrollToBlock(newId)"
            @move-block="() => scrollToBlock(selectedBlockId)"
          />

        </div>

        <!-- 侧边栏边缘悬浮折叠/展开把手按钮 -->
        <button
          type="button"
          @click="editor.isLeftSidebarOpen.value = !editor.isLeftSidebarOpen.value"
          class="absolute left-full -ml-px top-1/2 -translate-y-1/2 z-30 w-5.5 h-12 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm border border-zinc-200/90 dark:border-zinc-800/90 rounded-r-md rounded-l-none shadow-xs hover:w-6 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all cursor-pointer"
          :title="editor.isLeftSidebarOpen.value ? '收起物料大纲面板' : '展开物料大纲面板'"
        >
          <svg
            class="w-3.5 h-3.5 transition-transform duration-200"
            :class="{ 'rotate-180': !editor.isLeftSidebarOpen.value }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      <!-- 2. 中间：多端独立视口 iframe 仿真画布 -->
      <main
        class="flex-1 min-h-0 bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center overflow-hidden canvas-container relative"
        :class="editor.device.value === 'desktop' ? 'p-0 justify-stretch' : 'p-4 sm:p-6 justify-center'"
        @click="handleCanvasBgClick"
      >
        <div
          class="transition-all duration-300 ease-out origin-top relative shrink-0 rounded-none bg-white dark:bg-zinc-900"
          :class="[
            editor.device.value === 'desktop'
              ? 'w-full h-full border-none shadow-none'
              : editor.device.value === 'tablet'
                ? 'w-[768px] max-w-full h-full max-h-full border-x-2 border-zinc-300 dark:border-zinc-700 shadow-2xl overflow-hidden'
                : 'w-[375px] max-w-full h-full max-h-full border-x-2 border-zinc-300 dark:border-zinc-700 shadow-2xl overflow-hidden'
          ]"
        >
          <!-- 独立视口 iframe 沙箱：提供真实的 window.innerWidth -->
          <iframe
            ref="iframeRef"
            @load="handleIframeLoad"
            class="w-full h-full border-none block rounded-none bg-transparent"
          />

          <!-- 将 PageRenderer 通过 Teleport 挂载到 iframe 沙箱内部 -->
          <Teleport
            v-if="iframeDoc?.body && activePage"
            :to="iframeDoc.body"
          >
            <PageRenderer
              :key="activePage.id"
              :data="activePage"
              :variant="activePage.variant"
              :theme="activePage.theme"
              :mode="activePage.mode"
              :editable="editor.isEditMode.value"
              @select="handleCanvasSelect"
            />
          </Teleport>

          <!-- 快捷操作栏：显示在所选区块内部右上角 -->
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
                @click="editor.moveBlock(selectedBlockIndex, -1); scrollToBlock(selectedBlock.id)"
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
                @click="editor.moveBlock(selectedBlockIndex, 1); scrollToBlock(selectedBlock.id)"
                :disabled="selectedBlockIndex === (activePage?.blocks?.length || 0) - 1"
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
                @click="const newId = editor.duplicateBlock(selectedBlockIndex); scrollToBlock(newId)"
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
                @click="handleDeleteSelectedBlock"
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
                @click="editor.deselectBlock()"
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

      <!-- 3. 右侧面板：属性检查器组件 -->
      <div
        class="transition-all duration-300 ease-in-out shrink-0 relative flex h-full min-h-0"
        :class="editor.isRightSidebarOpen.value ? 'w-88' : 'w-0'"
      >
        <!-- 侧边栏边缘悬浮折叠/展开把手按钮 -->
        <button
          type="button"
          @click="editor.isRightSidebarOpen.value = !editor.isRightSidebarOpen.value"
          class="absolute right-full -mr-px top-1/2 -translate-y-1/2 z-30 w-5.5 h-12 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-sm border border-zinc-200/90 dark:border-zinc-800/90 rounded-l-md rounded-r-none shadow-xs hover:w-6 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-all cursor-pointer"
          :title="editor.isRightSidebarOpen.value ? '收起属性检查器' : '展开属性检查器'"
        >
          <svg
            class="w-3.5 h-3.5 transition-transform duration-200"
            :class="{ 'rotate-180': !editor.isRightSidebarOpen.value }"
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
          :class="{ 'opacity-0 pointer-events-none invisible': !editor.isRightSidebarOpen.value }"
        >
          <PropertyInspector />
        </div>
      </div>
    </div>

    <!-- 弹窗：导出 PageData JSON 组件 -->
    <JsonExportModal
      v-model="showJsonModal"
      :page-data="activePage"
    />
  </div>
</template>

