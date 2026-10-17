<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  pageData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const copiedNotice = ref(false)

function closeModal() {
  emit('update:modelValue', false)
}

function copyJsonToClipboard() {
  navigator.clipboard.writeText(JSON.stringify(props.pageData, null, 2)).then(() => {
    copiedNotice.value = true
    setTimeout(() => {
      copiedNotice.value = false
    }, 2000)
  })
}
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none"
    @click.self="closeModal"
  >
    <div
      class="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
    >
      <div
        class="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between"
      >
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm text-zinc-900 dark:text-zinc-100">导出的 PageData 配置 (纯 JSON)</span>
          <span class="text-xs text-zinc-400">可直接存入后端数据库或用于静态发布</span>
        </div>
        <button
          type="button"
          @click="closeModal"
          class="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-lg cursor-pointer transition"
          aria-label="关闭弹窗"
        >
          ✕
        </button>
      </div>

      <div class="flex-1 p-4 overflow-y-auto bg-zinc-950 text-zinc-200 font-mono text-xs leading-relaxed">
        <pre><code>{{ JSON.stringify(pageData, null, 2) }}</code></pre>
      </div>

      <div
        class="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/60"
      >
        <span v-if="copiedNotice" class="text-xs text-emerald-500 font-semibold flex items-center gap-1">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          已成功复制到系统剪贴板！
        </span>
        <span v-else class="text-xs text-zinc-400">
          包含 {{ pageData?.blocks?.length || 0 }} 个区块配置
        </span>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="copyJsonToClipboard"
            class="px-4 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            复制 JSON 内容
          </button>
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
