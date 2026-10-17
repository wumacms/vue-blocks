<script setup>
import { ref, computed } from 'vue'
import { THEME_HUES } from '@vue-blocks/utils'
import { useEditorState } from '../state/editorState.js'
import FieldRenderer from '../fields/FieldRenderer.vue'

const editor = useEditorState()
const inspectorTab = ref('content') // 'content' | 'design'

const activePage = computed(() => editor.activePage.value)
const selectedBlock = computed(() => editor.selectedBlock.value)
const selectedBlockManifest = computed(() => editor.selectedBlockManifest.value)

// 页面级变体选项
const VARIANTS = [
  { id: '1', name: '现代极简', alias: 'clean' },
  { id: '2', name: '新粗野主义', alias: 'brutalism' },
  { id: '3', name: '人文纸质', alias: 'editorial' },
  { id: '4', name: '工科极客', alias: 'geek' }
]

function handleUpdateField(fieldName, val) {
  if (selectedBlock.value) {
    editor.updateBlockField(selectedBlock.value.id, fieldName, val)
  }
}

function handleUpdateStylesRoot(val) {
  if (selectedBlock.value) {
    editor.updateBlockStyles(selectedBlock.value.id, 'root', val)
  }
}
</script>

<template>
  <aside
    class="w-88 h-full min-h-0 border-l border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex flex-col z-30 select-none"
  >
    <!-- 头部说明 -->
    <div
      class="p-3.5 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between"
    >
      <div class="flex items-center gap-2">
        <svg
          class="w-4 h-4 text-indigo-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
          />
        </svg>
        <span class="font-bold text-xs text-zinc-900 dark:text-zinc-100">
          {{ selectedBlock ? `${selectedBlockManifest?.title || selectedBlock.type}` : '页面全局配置' }}
        </span>
      </div>

      <button
        v-if="selectedBlock"
        type="button"
        @click="editor.deselectBlock"
        class="text-[11px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition cursor-pointer"
      >
        退出区块
      </button>
    </div>

    <!-- 场景 A：未选中具体区块时，显示页面全局设置 -->
    <div v-if="!selectedBlock" class="flex-1 overflow-y-auto p-4 space-y-5">
      <!-- 页面级 SEO 标题 -->
      <div class="space-y-2">
        <label class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
          页面级 SEO 标题
        </label>
        <input
          :value="activePage?.seo?.title || ''"
          @input="editor.setPageSeo({ title: $event.target.value })"
          type="text"
          class="w-full px-3 py-2 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 text-zinc-800 dark:text-zinc-200"
        />
      </div>

      <!-- 全局风格变体切换 -->
      <div class="space-y-2">
        <label class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
          全站风格变体 (Variant)
        </label>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="v in VARIANTS"
            :key="v.id"
            type="button"
            @click="editor.setPageVariant(v.id)"
            :class="[
              'p-2.5 rounded-xl border text-left transition cursor-pointer',
              activePage?.variant === v.id
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-900 dark:text-indigo-100 shadow-xs'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
            ]"
          >
            <div class="text-[10px] font-mono text-zinc-400">V{{ v.id }}</div>
            <div class="text-xs font-semibold">{{ v.name }}</div>
          </button>
        </div>
      </div>

      <!-- 动态色彩主题 (OKLCH Dynamic Theme) -->
      <div class="space-y-2">
        <label class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
          OKLCH 品牌色相 (Theme Hue)
        </label>
        <div class="grid grid-cols-3 gap-1.5">
          <button
            v-for="hue in Object.keys(THEME_HUES)"
            :key="hue"
            type="button"
            @click="editor.setPageTheme(hue)"
            :class="[
              'px-2 py-1.5 rounded-lg border text-xs capitalize text-center transition cursor-pointer',
              activePage?.theme === hue
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-900 dark:text-indigo-200'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            ]"
          >
            {{ hue }}
          </button>
        </div>
      </div>

      <!-- 深浅色模式 -->
      <div class="space-y-2">
        <label class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
          色彩明暗模式
        </label>
        <div class="flex gap-2">
          <button
            type="button"
            @click="editor.setPageMode('light')"
            :class="[
              'flex-1 py-2 rounded-lg text-xs font-semibold border transition cursor-pointer',
              activePage?.mode === 'light'
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            ]"
          >
            ☀️ 浅色模式
          </button>
          <button
            type="button"
            @click="editor.setPageMode('dark')"
            :class="[
              'flex-1 py-2 rounded-lg text-xs font-semibold border transition cursor-pointer',
              activePage?.mode === 'dark'
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            ]"
          >
            🌙 深色模式
          </button>
        </div>
      </div>
    </div>

    <!-- 场景 B：选中具体区块时，动态渲染内容表单与变体覆盖 -->
    <div v-else class="flex-1 flex flex-col overflow-hidden">
      <!-- 属性面板子标签 -->
      <div
        class="flex border-b border-zinc-200/80 dark:border-zinc-800/80 px-3 pt-2 gap-4 text-xs font-medium bg-zinc-50/50 dark:bg-zinc-900/50"
      >
        <button
          type="button"
          @click="inspectorTab = 'content'"
          :class="[
            'pb-2 border-b-2 transition cursor-pointer',
            inspectorTab === 'content'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
          ]"
        >
          📝 内容配置
        </button>
        <button
          type="button"
          @click="inspectorTab = 'design'"
          :class="[
            'pb-2 border-b-2 transition cursor-pointer',
            inspectorTab === 'design'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
          ]"
        >
          🎨 局部风格
        </button>
      </div>

      <!-- 子标签 1：基于 Schema Form 动态渲染驱动（单向流，无直接对象篡改） -->
      <div v-if="inspectorTab === 'content'" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-if="!selectedBlockManifest || !selectedBlockManifest.fields?.length"
          class="text-xs text-zinc-400 p-4 text-center"
        >
          该区块暂未定义可配置表单字段。
        </div>

        <FieldRenderer
          v-for="field in selectedBlockManifest?.fields || []"
          :key="field.name"
          :field="field"
          :model-value="selectedBlock?.data?.[field.name]"
          :block-data="selectedBlock?.data || {}"
          @update:model-value="(val) => handleUpdateField(field.name, val)"
        />
      </div>

      <!-- 子标签 2：局部风格覆盖 -->
      <div v-else class="flex-1 overflow-y-auto p-4 space-y-4">
        <div class="space-y-2">
          <label class="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
            区块独立风格变体
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              @click="editor.setBlockVariant(selectedBlock.id, undefined, false)"
              :class="[
                'p-2 rounded-lg text-xs font-medium border text-left cursor-pointer transition',
                !selectedBlock.lockVariant
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-900 dark:text-indigo-200 shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              ]"
            >
              继承全局 (V{{ activePage?.variant || '1' }})
            </button>
            <button
              v-for="v in ['1', '2', '3', '4']"
              :key="v"
              type="button"
              @click="editor.setBlockVariant(selectedBlock.id, v, true)"
              :class="[
                'p-2 rounded-lg text-xs font-medium border text-left cursor-pointer transition',
                selectedBlock.lockVariant && String(selectedBlock.variant) === v
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-900 dark:text-indigo-200 shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              ]"
            >
              强制变体 V{{ v }}
            </button>
          </div>
        </div>

        <div class="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <label class="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
            自定义根容器 Class (styles.root)
          </label>
          <input
            :value="selectedBlock.styles?.root || ''"
            @input="handleUpdateStylesRoot($event.target.value)"
            type="text"
            placeholder="例如: py-32 bg-slate-900 text-white"
            class="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 text-zinc-800 dark:text-zinc-200"
          />
          <p class="text-[10px] text-zinc-400 leading-relaxed">
            输入合法的 Tailwind CSS 原子类，将通过 tailwind-merge 无冲突合并到当前区块根节点。
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
