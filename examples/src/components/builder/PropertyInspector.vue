<script setup>
import { ref, watch } from 'vue'
import { blockRegistry } from 'vue-blocks'

const props = defineProps({
  selectedBlock: {
    type: Object,
    default: null
  },
  selectedBlockManifest: {
    type: Object,
    default: null
  },
  pageData: {
    type: Object,
    required: true
  },
  pageVariant: {
    type: String,
    default: '1'
  },
  pageTheme: {
    type: String,
    default: 'blue'
  },
  pageMode: {
    type: String,
    default: 'light'
  },
  themeHues: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits([
  'update:pageVariant',
  'update:pageTheme',
  'update:pageMode',
  'deselectBlock'
])

const inspectorTab = ref('content') // 'content' | 'design'

// 确保当前选中区块具有合法的 styles 与 data 响应式对象，并自动补齐缺省数据
watch(
  () => [props.selectedBlock, props.selectedBlockManifest],
  ([block, manifest]) => {
    if (!block) return
    if (!block.styles || typeof block.styles !== 'object') {
      block.styles = {}
    }
    if (!block.data || typeof block.data !== 'object') {
      block.data = {}
    }

    // 从全局物料注册表中获取 defaultData 进行安全自动补全，避免属性与列表项因缺省值而无法在面板中展示
    const entry = blockRegistry.get(block.type)
    const defaultData = entry?.defaultData
    if (defaultData) {
      Object.keys(defaultData).forEach((key) => {
        if (block.data[key] === undefined) {
          block.data[key] = JSON.parse(JSON.stringify(defaultData[key]))
        }
      })
    }

    // 根据 manifest.fields 协议进一步兜底所有字段
    if (manifest?.fields) {
      manifest.fields.forEach((f) => {
        if (block.data[f.name] === undefined) {
          if (f.default !== undefined) {
            block.data[f.name] = JSON.parse(JSON.stringify(f.default))
          } else if (f.type === 'repeater') {
            block.data[f.name] = []
          } else if (f.type === 'boolean') {
            block.data[f.name] = false
          } else {
            block.data[f.name] = ''
          }
        }
      })
    }
  },
  { immediate: true }
)

function updateStylesRoot(val) {
  if (!props.selectedBlock) return
  if (!props.selectedBlock.styles || typeof props.selectedBlock.styles !== 'object') {
    props.selectedBlock.styles = {}
  }
  props.selectedBlock.styles.root = val
}

// 设置区块独立风格变体（强制变体时锁定 lockVariant，避免被全局变体覆盖；继承全局时释放锁定）
function setBlockVariant(v) {
  if (!props.selectedBlock) return
  if (v === undefined || v === null) {
    props.selectedBlock.variant = undefined
    props.selectedBlock.lockVariant = false
  } else {
    props.selectedBlock.variant = String(v)
    props.selectedBlock.lockVariant = true
  }
}

// 安全添加 Repeater 项：读取 schema 默认值填充，避免空对象导致属性丢失
function addRepeaterItem(field) {
  if (!props.selectedBlock) return
  if (!props.selectedBlock.data) {
    props.selectedBlock.data = {}
  }
  if (!Array.isArray(props.selectedBlock.data[field.name])) {
    props.selectedBlock.data[field.name] = []
  }

  const newItem = {}
  if (Array.isArray(field.fields)) {
    field.fields.forEach((sub) => {
      if (sub.default !== undefined) {
        newItem[sub.name] = JSON.parse(JSON.stringify(sub.default))
      } else if (sub.type === 'boolean') {
        newItem[sub.name] = false
      } else if (sub.type === 'select' && sub.options?.length) {
        newItem[sub.name] = sub.options[0].value
      } else if (sub.type === 'repeater') {
        newItem[sub.name] = []
      } else {
        newItem[sub.name] = ''
      }
    })
  }
  props.selectedBlock.data[field.name].push(newItem)
}

function removeRepeaterItem(field, index) {
  if (props.selectedBlock?.data?.[field.name]) {
    props.selectedBlock.data[field.name].splice(index, 1)
  }
}

// 嵌套 Repeater 项添加与删除
function addNestedRepeaterItem(parentItem, subField) {
  if (!Array.isArray(parentItem[subField.name])) {
    parentItem[subField.name] = []
  }
  if (subField.fields && subField.fields.length) {
    const newSubItem = {}
    subField.fields.forEach((ssf) => {
      if (ssf.default !== undefined) {
        newSubItem[ssf.name] = JSON.parse(JSON.stringify(ssf.default))
      } else if (ssf.type === 'boolean') {
        newSubItem[ssf.name] = false
      } else if (ssf.type === 'select' && ssf.options?.length) {
        newSubItem[ssf.name] = ssf.options[0].value
      } else {
        newSubItem[ssf.name] = ''
      }
    })
    parentItem[subField.name].push(newSubItem)
  } else {
    parentItem[subField.name].push({ text: '' })
  }
}

function removeNestedRepeaterItem(parentItem, subField, index) {
  if (Array.isArray(parentItem[subField.name])) {
    parentItem[subField.name].splice(index, 1)
  }
}
</script>

<template>
  <aside
    class="w-88 h-full min-h-0 border-l border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex flex-col z-30 select-none"
  >
    <!-- 头部说明 -->
    <div class="p-3.5 border-b border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        @click="$emit('deselectBlock')"
        class="text-[11px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition cursor-pointer"
      >
        退出区块
      </button>
    </div>

    <!-- 场景 A：未选中具体区块时，显示页面全局设置 -->
    <div v-if="!selectedBlock" class="flex-1 overflow-y-auto p-4 space-y-5">
      <div class="space-y-2">
        <label class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">页面级 SEO 标题</label>
        <input
          v-model="pageData.seo.title"
          type="text"
          class="w-full px-3 py-2 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
      </div>

      <!-- 全局风格变体切换 -->
      <div class="space-y-2">
        <label class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">全站风格变体 (Variant)</label>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="v in [
              { id: '1', name: '现代极简', alias: 'clean' },
              { id: '2', name: '新粗野主义', alias: 'brutalism' },
              { id: '3', name: '人文纸质', alias: 'editorial' },
              { id: '4', name: '工科极客', alias: 'geek' }
            ]"
            :key="v.id"
            type="button"
            @click="$emit('update:pageVariant', v.id)"
            :class="[
              'p-2.5 rounded-xl border text-left transition cursor-pointer',
              pageVariant === v.id
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
        <label class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">OKLCH 品牌色相 (Theme Hue)</label>
        <div class="grid grid-cols-3 gap-1.5">
          <button
            v-for="hue in Object.keys(themeHues)"
            :key="hue"
            type="button"
            @click="$emit('update:pageTheme', hue)"
            :class="[
              'px-2 py-1.5 rounded-lg border text-xs capitalize text-center transition cursor-pointer',
              pageTheme === hue
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
        <label class="text-xs font-bold uppercase tracking-wider text-zinc-400 block">色彩明暗模式</label>
        <div class="flex gap-2">
          <button
            type="button"
            @click="$emit('update:pageMode', 'light')"
            :class="[
              'flex-1 py-2 rounded-lg text-xs font-semibold border transition cursor-pointer',
              pageMode === 'light'
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            ]"
          >
            ☀️ 浅色模式
          </button>
          <button
            type="button"
            @click="$emit('update:pageMode', 'dark')"
            :class="[
              'flex-1 py-2 rounded-lg text-xs font-semibold border transition cursor-pointer',
              pageMode === 'dark'
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

      <!-- 子标签 1：基于 Schema 协议自动生成的交互表单 -->
      <div v-if="inspectorTab === 'content'" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div
          v-if="!selectedBlockManifest || !selectedBlockManifest.fields?.length"
          class="text-xs text-zinc-400 p-4 text-center"
        >
          该区块暂未定义可配置表单字段。
        </div>

        <div v-for="field in selectedBlockManifest.fields" :key="field.name" class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              {{ field.label || field.name }}
              <span v-if="field.type === 'repeater'" class="text-[10px] text-zinc-400 font-mono ml-1">
                ({{ (selectedBlock.data[field.name] || []).length }} 项)
              </span>
            </label>
            <span v-if="field.type" class="text-[10px] font-mono text-zinc-400 uppercase">
              {{ field.type }}
            </span>
          </div>

          <!-- 1. 单行文本 (text) -->
          <input
            v-if="field.type === 'text'"
            v-model="selectedBlock.data[field.name]"
            type="text"
            class="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50"
          />

          <!-- 2. 多行富文本 (textarea) -->
          <textarea
            v-else-if="field.type === 'textarea'"
            v-model="selectedBlock.data[field.name]"
            rows="3"
            class="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y"
          ></textarea>

          <!-- 3. 图片选择 (image) -->
          <div v-else-if="field.type === 'image'" class="space-y-2">
            <input
              v-model="selectedBlock.data[field.name]"
              type="text"
              placeholder="图片 URL 地址"
              class="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <div
              v-if="selectedBlock.data[field.name]"
              class="h-20 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
            >
              <img :src="selectedBlock.data[field.name]" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- 4. 布尔开关 (boolean) -->
          <div
            v-else-if="field.type === 'boolean'"
            class="flex items-center justify-between p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800"
          >
            <span class="text-xs text-zinc-700 dark:text-zinc-300 font-medium">开启状态</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                v-model="selectedBlock.data[field.name]"
                class="sr-only peer"
              />
              <div
                class="w-9 h-5 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-indigo-600"
              ></div>
            </label>
          </div>

          <!-- 5. 下拉单选 (select) -->
          <select
            v-else-if="field.type === 'select'"
            v-model="selectedBlock.data[field.name]"
            class="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
          >
            <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
              {{ opt.label || opt.value }}
            </option>
          </select>

          <!-- 6. 重复器列表 (repeater: 按钮或卡片清单) -->
          <div v-else-if="field.type === 'repeater'" class="space-y-2 pt-1">
            <div
              v-if="!selectedBlock.data[field.name] || !selectedBlock.data[field.name].length"
              class="text-xs text-zinc-400 py-2.5 text-center bg-zinc-50 dark:bg-zinc-850 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800"
            >
              暂无列表项，点击下方按钮添加
            </div>

            <div
              v-for="(item, rIdx) in selectedBlock.data[field.name]"
              :key="rIdx"
              class="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 space-y-2.5"
            >
              <div class="flex items-center justify-between text-[11px] font-semibold text-zinc-500 pb-1 border-b border-zinc-200/60 dark:border-zinc-800">
                <span class="flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  #{{ rIdx + 1 }} 项
                </span>
                <button
                  type="button"
                  @click="removeRepeaterItem(field, rIdx)"
                  class="text-rose-500 hover:text-rose-700 text-xs cursor-pointer transition font-medium"
                >
                  删除
                </button>
              </div>

              <div v-for="subField in field.fields" :key="subField.name" class="space-y-1">
                <div class="flex items-center justify-between">
                  <label class="text-[10px] text-zinc-400 block font-medium">{{ subField.label || subField.name }}</label>
                  <span v-if="subField.type" class="text-[9px] font-mono text-zinc-400 uppercase">{{ subField.type }}</span>
                </div>

                <!-- 文本 / 链接 -->
                <input
                  v-if="subField.type === 'text' || subField.type === 'link'"
                  v-model="item[subField.name]"
                  type="text"
                  :placeholder="subField.placeholder || ''"
                  class="w-full px-2 py-1 rounded text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500"
                />

                <!-- 多行文本 -->
                <textarea
                  v-else-if="subField.type === 'textarea'"
                  v-model="item[subField.name]"
                  rows="2"
                  class="w-full px-2 py-1 rounded text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
                ></textarea>

                <!-- 图片 -->
                <div v-else-if="subField.type === 'image'" class="space-y-1.5">
                  <input
                    v-model="item[subField.name]"
                    type="text"
                    placeholder="图片 URL 地址"
                    class="w-full px-2 py-1 rounded text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <div
                    v-if="item[subField.name]"
                    class="h-16 rounded overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900"
                  >
                    <img :src="item[subField.name]" class="w-full h-full object-cover" />
                  </div>
                </div>

                <!-- 布尔开关 -->
                <div v-else-if="subField.type === 'boolean'" class="flex items-center gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    v-model="item[subField.name]"
                    class="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span class="text-xs text-zinc-600 dark:text-zinc-300">{{ subField.label || '开启' }}</span>
                </div>

                <!-- 下拉选择 -->
                <select
                  v-else-if="subField.type === 'select'"
                  v-model="item[subField.name]"
                  class="w-full px-2 py-1 rounded text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer focus:ring-1 focus:ring-indigo-500"
                >
                  <option v-for="opt in subField.options" :key="opt.value" :value="opt.value">
                    {{ opt.label || opt.value }}
                  </option>
                </select>

                <!-- 嵌套 Repeater (如多级菜单、表头列、标签列表等) -->
                <div
                  v-else-if="subField.type === 'repeater'"
                  class="space-y-1.5 pl-2.5 border-l-2 border-indigo-400/50 dark:border-indigo-600/50 my-1.5"
                >
                  <div class="flex items-center justify-between text-[10px] text-zinc-500 font-medium">
                    <span>{{ subField.label || subField.name }} ({{ item[subField.name]?.length || 0 }})</span>
                    <button
                      type="button"
                      @click="addNestedRepeaterItem(item, subField)"
                      class="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer font-semibold"
                    >
                      + 添加子项
                    </button>
                  </div>

                  <div
                    v-if="!item[subField.name] || !item[subField.name].length"
                    class="text-[10px] text-zinc-400 py-1 text-center bg-zinc-100/60 dark:bg-zinc-800/40 rounded"
                  >
                    暂无子项
                  </div>

                  <div
                    v-for="(subItem, sIdx) in item[subField.name]"
                    :key="sIdx"
                    class="p-2 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 space-y-1 text-xs"
                  >
                    <div class="flex items-center justify-between text-[10px] text-zinc-400 pb-0.5 border-b border-zinc-100 dark:border-zinc-700/60">
                      <span>#{{ sIdx + 1 }}</span>
                      <button
                        type="button"
                        @click="removeNestedRepeaterItem(item, subField, sIdx)"
                        class="text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        删除
                      </button>
                    </div>

                    <!-- 若子项是纯标量/字符串 -->
                    <input
                      v-if="typeof subItem !== 'object' || subItem === null"
                      v-model="item[subField.name][sIdx]"
                      type="text"
                      class="w-full px-2 py-0.5 rounded text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 outline-none"
                    />

                    <!-- 若子项是多字段对象 -->
                    <template v-else-if="subField.fields">
                      <div v-for="ssf in subField.fields" :key="ssf.name" class="space-y-0.5">
                        <label class="text-[9px] text-zinc-400 block">{{ ssf.label || ssf.name }}</label>
                        <input
                          v-if="ssf.type === 'text' || ssf.type === 'link'"
                          v-model="subItem[ssf.name]"
                          type="text"
                          class="w-full px-2 py-0.5 rounded text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 outline-none"
                        />
                        <select
                          v-else-if="ssf.type === 'select'"
                          v-model="subItem[ssf.name]"
                          class="w-full px-2 py-0.5 rounded text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer"
                        >
                          <option v-for="opt in ssf.options" :key="opt.value" :value="opt.value">
                            {{ opt.label || opt.value }}
                          </option>
                        </select>
                        <div v-else-if="ssf.type === 'boolean'" class="flex items-center gap-1.5 pt-0.5">
                          <input
                            type="checkbox"
                            v-model="subItem[ssf.name]"
                            class="rounded text-indigo-600 cursor-pointer"
                          />
                          <span class="text-[11px] text-zinc-500">{{ ssf.label || '开启' }}</span>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              @click="addRepeaterItem(field)"
              class="w-full py-1.5 rounded-lg text-xs border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 text-zinc-500 hover:text-indigo-600 transition cursor-pointer"
            >
              + 添加{{ field.label || field.name }}项
            </button>
          </div>

          <!-- 帮助提示文本 -->
          <p v-if="field.help" class="text-[10px] text-zinc-400">
            {{ field.help }}
          </p>
        </div>
      </div>

      <!-- 子标签 2：局部风格覆盖 -->
      <div v-else class="flex-1 overflow-y-auto p-4 space-y-4">
        <div class="space-y-2">
          <label class="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">区块独立风格变体</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              @click="setBlockVariant(undefined)"
              :class="[
                'p-2 rounded-lg text-xs font-medium border text-left cursor-pointer transition',
                !selectedBlock.lockVariant
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-900 dark:text-indigo-200 shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              ]"
            >
              继承全局 (V{{ pageVariant }})
            </button>
            <button
              v-for="v in ['1', '2', '3', '4']"
              :key="v"
              type="button"
              @click="setBlockVariant(v)"
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
            @input="updateStylesRoot($event.target.value)"
            type="text"
            placeholder="例如: py-32 bg-slate-900 text-white"
            class="w-full px-3 py-1.5 rounded-lg text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <p class="text-[10px] text-zinc-400 leading-relaxed">
            输入合法的 Tailwind CSS 原子类，将通过 tailwind-merge 无冲突合并到当前区块根节点。
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
