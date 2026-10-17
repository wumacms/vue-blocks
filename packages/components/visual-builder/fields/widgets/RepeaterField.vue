<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  field: {
    type: Object,
    required: true
  },
  blockData: {
    type: Object,
    default: () => ({})
  },
  parentPath: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const list = computed(() => {
  return Array.isArray(props.modelValue) ? props.modelValue : []
})

function addItem() {
  const currentList = JSON.parse(JSON.stringify(list.value))
  const newItem = {}
  if (Array.isArray(props.field.fields)) {
    props.field.fields.forEach((sub) => {
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
  currentList.push(newItem)
  emit('update:modelValue', currentList)
}

function removeItem(index) {
  const currentList = JSON.parse(JSON.stringify(list.value))
  currentList.splice(index, 1)
  emit('update:modelValue', currentList)
}

function moveItem(index, direction) {
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= list.value.length) return
  const currentList = JSON.parse(JSON.stringify(list.value))
  const item = currentList.splice(index, 1)[0]
  currentList.splice(targetIndex, 0, item)
  emit('update:modelValue', currentList)
}

function updateSubField(itemIndex, subFieldName, value) {
  const currentList = JSON.parse(JSON.stringify(list.value))
  if (currentList[itemIndex]) {
    currentList[itemIndex][subFieldName] = value
    emit('update:modelValue', currentList)
  }
}

function addNestedRepeaterItem(itemIndex, subField) {
  const currentList = JSON.parse(JSON.stringify(list.value))
  const parent = currentList[itemIndex]
  if (!parent) return
  if (!Array.isArray(parent[subField.name])) {
    parent[subField.name] = []
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
    parent[subField.name].push(newSubItem)
  } else {
    parent[subField.name].push({ text: '' })
  }
  emit('update:modelValue', currentList)
}

function removeNestedRepeaterItem(itemIndex, subField, nestedIndex) {
  const currentList = JSON.parse(JSON.stringify(list.value))
  const parent = currentList[itemIndex]
  if (parent && Array.isArray(parent[subField.name])) {
    parent[subField.name].splice(nestedIndex, 1)
    emit('update:modelValue', currentList)
  }
}

function updateNestedScalar(itemIndex, subFieldName, nestedIndex, val) {
  const currentList = JSON.parse(JSON.stringify(list.value))
  const parent = currentList[itemIndex]
  if (parent && Array.isArray(parent[subFieldName])) {
    parent[subFieldName][nestedIndex] = val
    emit('update:modelValue', currentList)
  }
}

function updateNestedObjectField(itemIndex, subFieldName, nestedIndex, key, val) {
  const currentList = JSON.parse(JSON.stringify(list.value))
  const parent = currentList[itemIndex]
  if (parent && Array.isArray(parent[subFieldName]) && parent[subFieldName][nestedIndex]) {
    parent[subFieldName][nestedIndex][key] = val
    emit('update:modelValue', currentList)
  }
}
</script>

<template>
  <div class="space-y-2 pt-1">
    <div
      v-if="!list.length"
      class="text-xs text-zinc-400 py-3 text-center bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-700/60"
    >
      暂无列表项，点击下方按钮添加
    </div>

    <!-- 列表项卡片 -->
    <div
      v-for="(item, rIdx) in list"
      :key="rIdx"
      class="p-2.5 rounded-lg border border-zinc-200/80 dark:border-zinc-700/60 bg-zinc-50/80 dark:bg-zinc-800/50 space-y-2.5 transition-shadow hover:shadow-xs"
    >
      <div
        class="flex items-center justify-between text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 pb-1.5 border-b border-zinc-200/60 dark:border-zinc-700/50"
      >
        <span class="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-200">
          <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          #{{ rIdx + 1 }} 项
        </span>
        <div class="flex items-center gap-1">
          <!-- 上移 -->
          <button
            type="button"
            @click="moveItem(rIdx, -1)"
            :disabled="rIdx === 0"
            class="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded disabled:opacity-20 transition cursor-pointer text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            title="上移"
          >
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <!-- 下移 -->
          <button
            type="button"
            @click="moveItem(rIdx, 1)"
            :disabled="rIdx === list.length - 1"
            class="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded disabled:opacity-20 transition cursor-pointer text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            title="下移"
          >
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <!-- 删除 -->
          <button
            type="button"
            @click="removeItem(rIdx)"
            class="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 text-xs px-1 cursor-pointer transition font-medium"
            title="删除"
          >
            删除
          </button>
        </div>
      </div>

      <!-- 子字段渲染 -->
      <div v-for="subField in field.fields || []" :key="subField.name" class="space-y-1">
        <div class="flex items-center justify-between">
          <label class="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
            {{ subField.label || subField.name }}
          </label>
          <span v-if="subField.type" class="text-[9px] font-mono text-zinc-400 uppercase">
            {{ subField.type }}
          </span>
        </div>

        <!-- 文本 / 链接 -->
        <input
          v-if="subField.type === 'text' || subField.type === 'link'"
          :value="item[subField.name]"
          @input="updateSubField(rIdx, subField.name, $event.target.value)"
          type="text"
          :placeholder="subField.placeholder || ''"
          class="w-full px-2 py-1 rounded text-xs bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-800 dark:text-zinc-200"
        />

        <!-- 多行文本 -->
        <textarea
          v-else-if="subField.type === 'textarea'"
          :value="item[subField.name]"
          @input="updateSubField(rIdx, subField.name, $event.target.value)"
          rows="2"
          class="w-full px-2 py-1 rounded text-xs bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-800 dark:text-zinc-200 resize-y"
        ></textarea>

        <!-- 图片 -->
        <div v-else-if="subField.type === 'image'" class="space-y-1.5">
          <input
            :value="item[subField.name]"
            @input="updateSubField(rIdx, subField.name, $event.target.value)"
            type="text"
            placeholder="图片 URL 地址"
            class="w-full px-2 py-1 rounded text-xs bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-800 dark:text-zinc-200"
          />
          <div
            v-if="item[subField.name]"
            class="h-14 rounded overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900"
          >
            <img :src="item[subField.name]" class="w-full h-full object-cover" alt="Preview" />
          </div>
        </div>

        <!-- 布尔开关 -->
        <div v-else-if="subField.type === 'boolean'" class="flex items-center gap-2 pt-0.5">
          <input
            type="checkbox"
            :checked="Boolean(item[subField.name])"
            @change="updateSubField(rIdx, subField.name, $event.target.checked)"
            class="rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <span class="text-xs text-zinc-600 dark:text-zinc-300">{{ subField.label || '开启' }}</span>
        </div>

        <!-- 下拉单选 -->
        <select
          v-else-if="subField.type === 'select'"
          :value="item[subField.name]"
          @change="updateSubField(rIdx, subField.name, $event.target.value)"
          class="w-full px-2 py-1 rounded text-xs bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:border-indigo-500 text-zinc-800 dark:text-zinc-200"
        >
          <option v-for="opt in subField.options || []" :key="String(opt.value)" :value="opt.value">
            {{ opt.label || opt.value }}
          </option>
        </select>

        <!-- 嵌套 Repeater (如多级二级菜单、表头列等) -->
        <div
          v-else-if="subField.type === 'repeater'"
          class="space-y-1.5 pl-2.5 border-l-2 border-indigo-400/50 dark:border-indigo-500/50 my-1.5"
        >
          <div class="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
            <span>{{ subField.label || subField.name }} ({{ (item[subField.name] || []).length }})</span>
            <button
              type="button"
              @click="addNestedRepeaterItem(rIdx, subField)"
              class="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer font-semibold"
            >
              + 添加子项
            </button>
          </div>

          <div
            v-if="!item[subField.name] || !item[subField.name].length"
            class="text-[10px] text-zinc-400 dark:text-zinc-500 py-1 text-center bg-zinc-100/60 dark:bg-zinc-800/60 rounded"
          >
            暂无子项
          </div>

          <div
            v-for="(subItem, sIdx) in item[subField.name] || []"
            :key="sIdx"
            class="p-2 rounded bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700/70 space-y-1 text-xs"
          >
            <div class="flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 pb-0.5 border-b border-zinc-100 dark:border-zinc-800">
              <span>#{{ sIdx + 1 }}</span>
              <button
                type="button"
                @click="removeNestedRepeaterItem(rIdx, subField, sIdx)"
                class="text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 cursor-pointer"
              >
                删除
              </button>
            </div>

            <!-- 若子项是纯标量/字符串 -->
            <input
              v-if="typeof subItem !== 'object' || subItem === null"
              :value="subItem"
              @input="updateNestedScalar(rIdx, subField.name, sIdx, $event.target.value)"
              type="text"
              class="w-full px-2 py-0.5 rounded text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 outline-none text-zinc-800 dark:text-zinc-200"
            />

            <!-- 若子项是多字段对象 -->
            <template v-else-if="subField.fields">
              <div v-for="ssf in subField.fields" :key="ssf.name" class="space-y-0.5">
                <label class="text-[9px] text-zinc-400 block">{{ ssf.label || ssf.name }}</label>
                <input
                  v-if="ssf.type === 'text' || ssf.type === 'link'"
                  :value="subItem[ssf.name]"
                  @input="updateNestedObjectField(rIdx, subField.name, sIdx, ssf.name, $event.target.value)"
                  type="text"
                  class="w-full px-2 py-0.5 rounded text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 outline-none text-zinc-800 dark:text-zinc-200"
                />
                <select
                  v-else-if="ssf.type === 'select'"
                  :value="subItem[ssf.name]"
                  @change="updateNestedObjectField(rIdx, subField.name, sIdx, ssf.name, $event.target.value)"
                  class="w-full px-2 py-0.5 rounded text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 outline-none cursor-pointer text-zinc-800 dark:text-zinc-200"
                >
                  <option v-for="opt in ssf.options || []" :key="String(opt.value)" :value="opt.value">
                    {{ opt.label || opt.value }}
                  </option>
                </select>
                <div v-else-if="ssf.type === 'boolean'" class="flex items-center gap-1.5 pt-0.5">
                  <input
                    type="checkbox"
                    :checked="Boolean(subItem[ssf.name])"
                    @change="updateNestedObjectField(rIdx, subField.name, sIdx, ssf.name, $event.target.checked)"
                    class="rounded text-indigo-600 cursor-pointer"
                  />
                  <span class="text-[11px] text-zinc-600 dark:text-zinc-300">{{ ssf.label || '开启' }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加项主按钮 -->
    <button
      type="button"
      @click="addItem"
      class="w-full py-1.5 rounded-lg text-xs border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition cursor-pointer flex items-center justify-center gap-1"
    >
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <span>添加{{ field.label || field.name }}项</span>
    </button>
  </div>
</template>
