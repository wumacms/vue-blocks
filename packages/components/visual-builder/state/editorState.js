/**
 * Visual Builder 统一响应式状态管理器
 * 遵循严格的单向数据流（Unidirectional Data Flow），收口所有 Mutation 操作
 */

import { ref, computed, provide, inject } from 'vue'

import { blockRegistry, applyTheme } from '@vue-blocks/utils'
import { CommandHistory } from './commandHistory.js'
import { defaultStorageAdapter } from './storageAdapter.js'

export const EDITOR_STATE_KEY = Symbol('WUMA_EDITOR_STATE')

/**
 * 补全区块缺省数据
 */
export function hydrateInitialBlocks(blocks = []) {
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

/**
 * 补全所有页面缺省数据
 */
export function hydrateAllPages(pageList = []) {
  return pageList.map((p) => ({
    ...p,
    containerClass:
      p.containerClass ||
      'min-h-screen bg-background text-foreground transition-colors duration-300',
    blocks: hydrateInitialBlocks(p.blocks || [])
  }))
}

/**
 * 创建编辑器状态实例
 */
export function createEditorState(options = {}) {
  const storageAdapter = options.storageAdapter || defaultStorageAdapter
  const initialPages = options.pages && options.pages.length > 0
    ? hydrateAllPages(JSON.parse(JSON.stringify(options.pages)))
    : hydrateAllPages(storageAdapter.loadPages())

  // 1. 核心状态
  const pages = ref(initialPages)
  const activePageId = ref(
    options.activePageId || pages.value[0]?.id || 'home'
  )
  const selectedBlockId = ref('')
  const device = ref('desktop') // 'desktop' | 'tablet' | 'mobile'
  const isEditMode = ref(true)
  const isDirty = ref(false)
  const isLeftSidebarOpen = ref(true)
  const isRightSidebarOpen = ref(true)
  const isSaving = ref(false)

  // 历史栈管理器
  const history = new CommandHistory()
  const historyTrigger = ref(0) // 用于驱动 canUndo/canRedo 响应式更新

  // 2. 衍生计算属性
  const activePageIndex = computed(() => {
    return pages.value.findIndex((p) => p.id === activePageId.value)
  })

  const activePage = computed(() => {
    const idx = activePageIndex.value
    return idx !== -1 ? pages.value[idx] : pages.value[0] || null
  })

  const selectedBlockIndex = computed(() => {
    if (!activePage.value) return -1
    return activePage.value.blocks.findIndex((b) => b.id === selectedBlockId.value)
  })

  const selectedBlock = computed(() => {
    const idx = selectedBlockIndex.value
    return idx !== -1 ? activePage.value.blocks[idx] : null
  })

  const selectedBlockEntry = computed(() => {
    if (!selectedBlock.value) return null
    return blockRegistry.get(selectedBlock.value.type) || null
  })

  const selectedBlockManifest = computed(() => {
    return selectedBlockEntry.value?.manifest || null
  })

  const canUndo = computed(() => {
    // 依赖 historyTrigger 触发计算
    // eslint-disable-next-line no-unused-expressions
    historyTrigger.value
    return history.canUndo
  })

  const canRedo = computed(() => {
    // eslint-disable-next-line no-unused-expressions
    historyTrigger.value
    return history.canRedo
  })

  // 3. 内部辅助函数
  function getPageSnapshot() {
    if (!activePage.value) return null
    return {
      page: JSON.parse(JSON.stringify(activePage.value))
    }
  }

  function commitHistory(batchKey = null) {
    if (!activePage.value) return
    isDirty.value = true
    history.push(getPageSnapshot(), batchKey)
    historyTrigger.value++
  }

  function restoreSnapshot(snapshot) {
    if (!snapshot || !activePage.value) return
    const targetIdx = activePageIndex.value
    if (targetIdx !== -1) {
      pages.value[targetIdx] = snapshot.page
    }
    isDirty.value = true
    historyTrigger.value++
  }

  // 4. 对外受控操作 API (Actions)
  function switchPage(pageId) {
    if (!pageId || pageId === activePageId.value) return
    const target = pages.value.find((p) => p.id === pageId)
    if (!target) return

    activePageId.value = pageId
    selectedBlockId.value = ''
    history.reset(getPageSnapshot())
    historyTrigger.value++

    // 默认高亮首个区块
    if (target.blocks?.length) {
      selectedBlockId.value = target.blocks[0].id
    }
  }

  function setPageVariant(variant) {
    if (activePage.value && activePage.value.variant !== variant) {
      activePage.value.variant = String(variant)
      commitHistory(`page-variant-${variant}`)
    }
  }

  function setPageTheme(theme) {
    if (activePage.value && activePage.value.theme !== theme) {
      activePage.value.theme = theme
      commitHistory(`page-theme-${theme}`)
    }
  }

  function setPageMode(mode) {
    if (activePage.value && activePage.value.mode !== mode) {
      activePage.value.mode = mode
      commitHistory(`page-mode-${mode}`)
    }
  }

  function setPageSeo(seoData = {}) {
    if (!activePage.value) return
    if (!activePage.value.seo) {
      activePage.value.seo = {}
    }
    Object.assign(activePage.value.seo, seoData)
    commitHistory('page-seo')
  }

  let scrollHandler = null

  function setScrollHandler(fn) {
    scrollHandler = fn
  }

  function scrollToBlock(id) {
    if (scrollHandler && id) {
      scrollHandler(id)
    }
  }

  function selectBlock(blockId, options = {}) {
    selectedBlockId.value = blockId || ''
    if (blockId && !isRightSidebarOpen.value) {
      isRightSidebarOpen.value = true
    }
    if (options.scroll && blockId) {
      scrollToBlock(blockId)
    }
  }

  function deselectBlock() {
    selectedBlockId.value = ''
  }

  function addBlock(manifest, insertIndex = undefined) {
    if (!activePage.value) return
    const type = manifest.name
    const entry = blockRegistry.get(type)
    const defaultData = entry?.defaultData ? JSON.parse(JSON.stringify(entry.defaultData)) : {}
    const uniqueId = `${type.toLowerCase()}-${Math.random().toString(36).slice(2, 7)}`

    const newBlock = {
      id: uniqueId,
      type: type,
      variant: undefined,
      lockVariant: false,
      data: defaultData,
      styles: {}
    }

    const targetIndex = insertIndex !== undefined ? insertIndex : activePage.value.blocks.length
    activePage.value.blocks.splice(targetIndex, 0, newBlock)
    selectBlock(uniqueId, { scroll: true })
    commitHistory(`add-block-${type}`)
    return uniqueId
  }

  function removeBlock(index) {
    if (!activePage.value || activePage.value.blocks.length <= 1) {
      return false
    }
    const removedId = activePage.value.blocks[index].id
    activePage.value.blocks.splice(index, 1)

    if (selectedBlockId.value === removedId) {
      const nextIndex = Math.min(index, activePage.value.blocks.length - 1)
      selectedBlockId.value = activePage.value.blocks[nextIndex]?.id || ''
    }
    commitHistory(`remove-block-${removedId}`)
    return true
  }

  function duplicateBlock(index) {
    if (!activePage.value) return
    const source = activePage.value.blocks[index]
    const clone = JSON.parse(JSON.stringify(source))
    clone.id = `${source.type.toLowerCase()}-${Math.random().toString(36).slice(2, 7)}`
    activePage.value.blocks.splice(index + 1, 0, clone)
    selectBlock(clone.id, { scroll: true })
    commitHistory(`duplicate-block-${source.id}`)
    return clone.id
  }

  function moveBlock(index, direction) {
    if (!activePage.value) return
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= activePage.value.blocks.length) return
    const item = activePage.value.blocks.splice(index, 1)[0]
    activePage.value.blocks.splice(targetIndex, 0, item)
    selectBlock(item.id, { scroll: true })
    commitHistory(`move-block-${item.id}`)
  }


  /**
   * 安全更新指定区块的数据字段，杜绝直接篡改对象引用
   */
  function updateBlockField(blockId, fieldPath, value) {
    const block = activePage.value?.blocks.find((b) => b.id === blockId)
    if (!block) return
    if (!block.data) {
      block.data = {}
    }

    // 支持嵌套路径写入，如 'items.0.title'
    if (fieldPath.includes('.')) {
      const parts = fieldPath.split('.')
      let curr = block.data
      for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i]
        if (curr[key] === undefined || curr[key] === null) {
          curr[key] = isNaN(Number(parts[i + 1])) ? {} : []
        }
        curr = curr[key]
      }
      curr[parts[parts.length - 1]] = value
    } else {
      block.data[fieldPath] = value
    }

    commitHistory(`field-${blockId}-${fieldPath}`)
  }

  /**
   * 安全更新指定区块的样式槽位
   */
  function updateBlockStyles(blockId, slot, value) {
    const block = activePage.value?.blocks.find((b) => b.id === blockId)
    if (!block) return
    if (!block.styles) {
      block.styles = {}
    }
    block.styles[slot] = value
    commitHistory(`style-${blockId}-${slot}`)
  }

  /**
   * 设置区块的独立风格变体及锁定标记
   */
  function setBlockVariant(blockId, variant, isLocked = false) {
    const block = activePage.value?.blocks.find((b) => b.id === blockId)
    if (!block) return
    if (variant === undefined || variant === null) {
      block.variant = undefined
      block.lockVariant = false
    } else {
      block.variant = String(variant)
      block.lockVariant = Boolean(isLocked)
    }
    commitHistory(`variant-${blockId}`)
  }

  function undo() {
    const prev = history.undo()
    if (prev) {
      restoreSnapshot(prev)
      return true
    }
    return false
  }

  function redo() {
    const next = history.redo()
    if (next) {
      restoreSnapshot(next)
      return true
    }
    return false
  }

  function save() {
    isDirty.value = false
    storageAdapter.savePages(pages.value)
    return {
      activePageId: activePageId.value,
      activePage: activePage.value,
      allPages: pages.value
    }
  }

  function resetActivePage(defaultTemplate) {
    if (!activePage.value || !defaultTemplate) return
    const hydrated = JSON.parse(JSON.stringify(defaultTemplate))
    hydrated.blocks = hydrateInitialBlocks(hydrated.blocks || [])
    pages.value[activePageIndex.value] = hydrated
    selectedBlockId.value = hydrated.blocks[0]?.id || ''
    commitHistory('reset-page')
  }

  // 初始化首帧快照
  history.reset(getPageSnapshot())
  historyTrigger.value++

  // 默认选中第一个区块
  if (activePage.value?.blocks?.length) {
    selectedBlockId.value = activePage.value.blocks[0].id
  }

  return {
    // 状态
    pages,
    activePageId,
    activePageIndex,
    activePage,
    selectedBlockId,
    selectedBlockIndex,
    selectedBlock,
    selectedBlockEntry,
    selectedBlockManifest,
    device,
    isEditMode,
    isDirty,
    isLeftSidebarOpen,
    isRightSidebarOpen,
    isSaving,
    canUndo,
    canRedo,
    storageAdapter,

    // 方法
    switchPage,
    setPageVariant,
    setPageTheme,
    setPageMode,
    setPageSeo,
    selectBlock,
    deselectBlock,
    addBlock,
    removeBlock,
    duplicateBlock,
    moveBlock,
    updateBlockField,
    updateBlockStyles,
    setBlockVariant,
    undo,
    redo,
    save,
    resetActivePage,
    setScrollHandler,
    scrollToBlock
  }
}


export function provideEditorState(state) {
  provide(EDITOR_STATE_KEY, state)
}

export function useEditorState() {
  const state = inject(EDITOR_STATE_KEY)
  if (!state) {
    throw new Error('useEditorState() 必须在 provideEditorState() 的子组件上下文中调用。')
  }
  return state
}
