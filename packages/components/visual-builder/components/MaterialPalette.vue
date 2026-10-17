<script setup>
import { ref, computed } from 'vue'
import { blockRegistry } from '@vue-blocks/utils'
import { CATEGORY_DEFINITIONS } from '../../manifests.js'
import { useEditorState } from '../state/editorState.js'

const editor = useEditorState()

const leftTab = ref('materials') // 'materials' | 'outline'
const activeCategory = ref('all')
const searchQuery = ref('')

const allManifests = computed(() => blockRegistry.getAllManifests())
const blocks = computed(() => editor.activePage.value?.blocks || [])
const selectedBlockId = computed(() => editor.selectedBlockId.value)

const filteredMaterials = computed(() => {
  return allManifests.value.filter((m) => {
    const matchCategory = activeCategory.value === 'all' || m.category === activeCategory.value
    const matchQuery =
      !searchQuery.value ||
      m.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchQuery
  })
})

const emit = defineEmits([
  'selectBlock',
  'addBlock',
  'moveBlock',
  'duplicateBlock',
  'removeBlock'
])

function handleAddBlock(manifest) {
  const newId = editor.addBlock(manifest)
  emit('addBlock', manifest, newId)
}

function handleSelectBlock(id) {
  editor.selectBlock(id, { scroll: true })
  emit('selectBlock', id)
}

function handleMoveBlock(index, direction) {
  editor.moveBlock(index, direction)
  emit('moveBlock', index, direction)
}

function handleDuplicateBlock(index) {
  const newId = editor.duplicateBlock(index)
  emit('duplicateBlock', index, newId)
}

function handleRemoveBlock(index) {
  if (blocks.value.length <= 1) {
    alert('页面至少需要保留一个区块！')
    return
  }
  const targetBlock = blocks.value[index]
  const blockTitle = blockRegistry.get(targetBlock?.type)?.manifest?.title || targetBlock?.type || '该区块'
  if (confirm(`确认要删除区块【${blockTitle}】吗？`)) {
    editor.removeBlock(index)
    emit('removeBlock', index)
  }
}

</script>


<template>
  <aside
    class="w-80 h-full min-h-0 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex flex-col z-30 select-none"
  >
    <!-- 切换 Tab: 物料库 vs 页面大纲 -->
    <div
      class="flex border-b border-zinc-200/80 dark:border-zinc-800/80 p-1.5 gap-1 bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <button
        type="button"
        @click="leftTab = 'materials'"
        :class="[
          'flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5',
          leftTab === 'materials'
            ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
            : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
        ]"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        <span>物料库 ({{ allManifests.length }})</span>
      </button>

      <button
        type="button"
        @click="leftTab = 'outline'"
        :class="[
          'flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5',
          leftTab === 'outline'
            ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
            : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
        ]"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
        <span>页面大纲 ({{ blocks.length }})</span>
      </button>
    </div>

    <!-- Tab 1: 物料库内容 -->
    <div v-if="leftTab === 'materials'" class="flex-1 flex flex-col overflow-hidden">
      <!-- 搜索框 -->
      <div class="p-3 border-b border-zinc-100 dark:border-zinc-800/80">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索区块组件..."
            class="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border-none outline-none focus:ring-2 focus:ring-indigo-500/50 text-zinc-800 dark:text-zinc-200"
          />
          <svg
            class="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      <!-- 分类标签栏 -->
      <div class="flex px-3 py-2 gap-1 overflow-x-auto border-b border-zinc-100 dark:border-zinc-800/80 shrink-0">
        <button
          v-for="cat in CATEGORY_DEFINITIONS"
          :key="cat.id"
          type="button"
          @click="activeCategory = cat.id"
          :class="[
            'px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition cursor-pointer shrink-0',
            activeCategory === cat.id
              ? 'bg-indigo-600 text-white font-semibold'
              : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- 物料卡片列表 -->
      <div class="flex-1 overflow-y-auto p-3 space-y-2.5">
        <div
          v-for="item in filteredMaterials"
          :key="item.name"
          class="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-700/60 bg-white dark:bg-zinc-800/70 shadow-xs hover:border-indigo-500/50 dark:hover:border-indigo-500/60 hover:shadow-md dark:hover:bg-zinc-800 transition-all group flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span class="font-bold text-xs text-zinc-900 dark:text-zinc-100">{{ item.title }}</span>
              </div>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900/90 text-zinc-500 dark:text-zinc-400 border border-transparent dark:border-zinc-700/50">
                {{ item.name }}
              </span>
            </div>
            <p class="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
              {{ item.description }}
            </p>
          </div>

          <button
            type="button"
            @click="handleAddBlock(item)"
            class="w-full py-1.5 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-indigo-600 hover:text-white dark:bg-zinc-700/60 dark:hover:bg-indigo-600 text-zinc-700 dark:text-zinc-200 dark:hover:text-white border border-transparent dark:border-zinc-700/40 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>添加到页面</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Tab 2: 页面大纲内容 -->
    <div v-else class="flex-1 flex flex-col overflow-hidden p-3">
      <div class="flex items-center justify-between text-xs text-zinc-400 mb-2 px-1">
        <span>当前排版顺序 (从上到下)</span>
        <span class="font-mono">{{ blocks.length }} 项</span>
      </div>

      <div class="flex-1 overflow-y-auto space-y-1.5">
        <div
          v-for="(block, idx) in blocks"
          :key="block.id"
          @click="handleSelectBlock(block.id)"
          :class="[
            'p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between',
            selectedBlockId === block.id
              ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold shadow-xs'
              : 'border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300'
          ]"
        >
          <div class="flex items-center gap-2 min-w-0">
            <span
              class="font-mono text-[10px] w-5 h-5 rounded flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 font-bold shrink-0"
            >
              {{ idx + 1 }}
            </span>
            <div class="truncate text-xs">
              <div>{{ blockRegistry.get(block.type)?.manifest?.title || block.type }}</div>
              <div class="text-[10px] text-zinc-400 font-mono font-normal truncate">#{{ block.id }}</div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex items-center gap-1 shrink-0" @click.stop>
            <button
              type="button"
              @click="handleMoveBlock(idx, -1)"
              :disabled="idx === 0"
              class="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded disabled:opacity-20 transition cursor-pointer"
              title="上移"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            </button>
            <button
              type="button"
              @click="handleMoveBlock(idx, 1)"
              :disabled="idx === blocks.length - 1"
              class="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded disabled:opacity-20 transition cursor-pointer"
              title="下移"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <button
              type="button"
              @click="handleDuplicateBlock(idx)"
              class="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded transition cursor-pointer"
              title="复制"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            <button
              type="button"
              @click="handleRemoveBlock(idx)"
              class="p-1 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 rounded transition cursor-pointer"
              title="删除"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
