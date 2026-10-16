<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  currentDevice: {
    type: String,
    default: 'desktop'
  },
  isEditMode: {
    type: Boolean,
    default: true
  },
  canUndo: {
    type: Boolean,
    default: false
  },
  canRedo: {
    type: Boolean,
    default: false
  },
  blockCount: {
    type: Number,
    default: 0
  },
  isLeftSidebarOpen: {
    type: Boolean,
    default: true
  },
  isRightSidebarOpen: {
    type: Boolean,
    default: true
  },
  // 多页面配置与激活页面
  pages: {
    type: Array,
    default: () => []
  },
  activePageId: {
    type: String,
    default: ''
  },
  // 保存与脏状态
  isDirty: {
    type: Boolean,
    default: false
  },
  isSaving: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:currentDevice',
  'update:isEditMode',
  'update:isLeftSidebarOpen',
  'update:isRightSidebarOpen',
  'update:activePageId',
  'undo',
  'redo',
  'save',
  'exportJson',
  'resetPage',
  'exit'
])

// 页面下拉菜单开关
const isPageMenuOpen = ref(false)
const pageMenuRef = ref(null)

const activePage = computed(() => {
  return props.pages.find((p) => p.id === props.activePageId) || props.pages[0] || null
})

function handlePageSelect(pageId) {
  isPageMenuOpen.value = false
  if (pageId !== props.activePageId) {
    emit('update:activePageId', pageId)
  }
}

function handleOutsideClick(e) {
  if (pageMenuRef.value && !pageMenuRef.value.contains(e.target)) {
    isPageMenuOpen.value = false
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleOutsideClick)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleOutsideClick)
  }
})
</script>

<template>
  <header
    class="h-14 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-3.5 flex items-center justify-between gap-3 shrink-0 z-40 select-none"
  >
    <!-- 左侧：Logo、多页面切换下拉与撤销重做 -->
    <div class="flex items-center gap-2.5">
      <!-- 品牌标识与返回站点链接 -->
      <a
        href="#/"
        @click.prevent="$emit('exit')"
        class="flex items-center gap-2 group cursor-pointer"
        title="返回站点前台"
      >
        <div
          class="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 font-black text-sm group-hover:scale-105 transition-transform"
        >
          W
        </div>
        <div class="hidden xl:block">
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-xs tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              WumaCMS
            </span>
            <span
              class="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60"
            >
              PRO
            </span>
          </div>
          <span class="text-[10px] text-zinc-400 leading-none block">可视化建站引擎</span>
        </div>
      </a>

      <div class="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block"></div>

      <!-- 核心升级：多页面切换下拉菜单 (Page Switcher) -->
      <div v-if="pages && pages.length" ref="pageMenuRef" class="relative">
        <button
          type="button"
          @click.stop="isPageMenuOpen = !isPageMenuOpen"
          class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-zinc-200/90 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-850/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs transition-colors cursor-pointer group"
          :title="`当前编辑: ${activePage?.title || '页面'} (${pages.length} 个页面可切换)`"
          aria-haspopup="listbox"
          :aria-expanded="isPageMenuOpen"
        >
          <svg class="w-3.5 h-3.5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span class="font-semibold text-zinc-800 dark:text-zinc-200 max-w-[110px] truncate">
            {{ activePage?.title || '选择页面' }}
          </span>
          <span class="text-[10px] font-mono text-zinc-400 hidden md:inline">
            {{ activePage?.path }}
          </span>
          <svg
            class="w-3.5 h-3.5 text-zinc-400 transition-transform duration-200"
            :class="{ 'rotate-180': isPageMenuOpen }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <!-- 页面下拉卡片 -->
        <div
          v-if="isPageMenuOpen"
          class="absolute left-0 top-full mt-1.5 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div class="px-2 py-1 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800/80 mb-1 flex items-center justify-between">
            <span>切换编辑页面</span>
            <span class="font-mono">{{ pages.length }} 个页面</span>
          </div>

          <div class="max-h-60 overflow-y-auto space-y-0.5" role="listbox" aria-label="页面列表">
            <button
              v-for="p in pages"
              :key="p.id"
              type="button"
              role="option"
              :aria-selected="p.id === activePageId"
              @click="handlePageSelect(p.id)"
              :class="[
                'w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer',
                p.id === activePageId
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              ]"
            >
              <div class="flex items-center gap-2 truncate">
                <span
                  class="w-1.5 h-1.5 rounded-full shrink-0"
                  :class="p.id === activePageId ? 'bg-indigo-500 ring-2 ring-indigo-300 dark:ring-indigo-700' : 'bg-zinc-300 dark:bg-zinc-700'"
                ></span>
                <span class="truncate">{{ p.title }}</span>
              </div>
              <span class="text-[10px] font-mono text-zinc-400 shrink-0 ml-2">
                {{ p.path }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1 hidden sm:block"></div>

      <!-- 撤销 / 重做 -->
      <div class="flex items-center gap-0.5 hidden sm:flex">
        <button
          type="button"
          @click="$emit('undo')"
          :disabled="!canUndo"
          class="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
          title="撤销 (Undo - Cmd+Z)"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 14L4 9l5-5" />
            <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
          </svg>
        </button>
        <button
          type="button"
          @click="$emit('redo')"
          :disabled="!canRedo"
          class="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
          title="重做 (Redo - Cmd+Y)"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 14l5-5-5-5" />
            <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13" />
          </svg>
        </button>

        <!-- 物料面板折叠切换 -->
        <button
          type="button"
          @click="$emit('update:isLeftSidebarOpen', !isLeftSidebarOpen)"
          :class="[
            'p-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 text-xs ml-1',
            isLeftSidebarOpen
              ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-indigo-600 dark:text-indigo-400 font-semibold'
              : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
          ]"
          :title="isLeftSidebarOpen ? '收起物料大纲面板' : '展开物料大纲面板'"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          <span class="hidden 2xl:inline text-[11px]">物料</span>
        </button>
      </div>
    </div>

    <!-- 中间：多端视口仿真切换器 -->
    <div
      class="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs"
    >
      <button
        type="button"
        @click="$emit('update:currentDevice', 'desktop')"
        :class="[
          'px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer',
          currentDevice === 'desktop'
            ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
            : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
        ]"
        title="桌面全宽 (100%)"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <span class="hidden md:inline">桌面端</span>
      </button>

      <button
        type="button"
        @click="$emit('update:currentDevice', 'tablet')"
        :class="[
          'px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer',
          currentDevice === 'tablet'
            ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
            : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
        ]"
        title="iPad 平板 (768px)"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="10" y1="18" x2="14" y2="18" />
        </svg>
        <span class="hidden md:inline">平板 768px</span>
      </button>

      <button
        type="button"
        @click="$emit('update:currentDevice', 'mobile')"
        :class="[
          'px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer',
          currentDevice === 'mobile'
            ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold'
            : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
        ]"
        title="移动手机 (375px)"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="2" width="12" height="20" rx="2.5" />
          <circle cx="12" cy="18" r="0.75" fill="currentColor" />
        </svg>
        <span class="hidden md:inline">手机 375px</span>
      </button>
    </div>

    <!-- 右侧：保存、编辑态切换与工具操作 -->
    <div class="flex items-center gap-2">
      <!-- 核心升级：状态化保存按钮 -->
      <button
        type="button"
        @click="$emit('save')"
        :disabled="isSaving"
        :class="[
          'px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs',
          isSaving
            ? 'bg-indigo-400 text-white cursor-not-allowed opacity-80'
            : isDirty
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white font-semibold ring-2 ring-indigo-500/30 animate-pulse-subtle'
              : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
        ]"
        :title="isDirty ? '有未保存修改 (Cmd+S / Ctrl+S)' : '当前内容已保存'"
      >
        <!-- 保存中状态 -->
        <svg v-if="isSaving" class="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <!-- 未保存脏状态小圆点 -->
        <span v-else-if="isDirty" class="w-2 h-2 rounded-full bg-amber-300"></span>
        <!-- 已保存对勾状态 -->
        <svg v-else class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>

        <span>{{ isSaving ? '保存中...' : isDirty ? '保存修改' : '已保存' }}</span>
        <span class="text-[10px] opacity-60 hidden sm:inline font-mono">⌘S</span>
      </button>

      <!-- 编辑态 / 预览态切换 -->
      <button
        type="button"
        @click="$emit('update:isEditMode', !isEditMode)"
        :class="[
          'px-2.5 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition cursor-pointer',
          isEditMode
            ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
            : 'bg-emerald-500 text-white border-emerald-600 shadow-sm font-semibold'
        ]"
      >
        <span class="w-2 h-2 rounded-full" :class="isEditMode ? 'bg-amber-500' : 'bg-white animate-pulse'"></span>
        <span>{{ isEditMode ? '编辑态' : '预览中' }}</span>
      </button>

      <!-- 导出 JSON 按钮 -->
      <button
        type="button"
        @click="$emit('exportJson')"
        class="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 shadow-xs transition cursor-pointer flex items-center gap-1.5"
        title="查看/导出当前页面完整 JSON"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        <span class="hidden xl:inline">JSON</span>
      </button>

      <!-- 属性面板折叠切换 -->
      <button
        type="button"
        @click="$emit('update:isRightSidebarOpen', !isRightSidebarOpen)"
        :class="[
          'p-1.5 rounded-lg border transition cursor-pointer flex items-center gap-1 text-xs',
          isRightSidebarOpen
            ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-indigo-600 dark:text-indigo-400 font-semibold'
            : 'border-transparent text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
        ]"
        :title="isRightSidebarOpen ? '收起属性配置面板' : '展开属性配置面板'"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="15" y1="3" x2="15" y2="21" />
        </svg>
        <span class="hidden 2xl:inline text-[11px]">属性</span>
      </button>

      <!-- 重置页面 -->
      <button
        type="button"
        @click="$emit('resetPage')"
        class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition cursor-pointer"
        title="重置当前页面为初始模板"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
    </div>
  </header>
</template>
