<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '1'
  },
  heroVariant: {
    type: [String, Number],
    default: null
  },
  variants: {
    type: Array,
    default: () => [
      { id: '1', name: 'SaaS 现代风格', desc: '科技产品落地页' },
      { id: '2', name: '波普复古风', desc: '新丑风粗边框卡片' }
    ]
  },
  footerEl: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'update:modelValue',
  'update:heroVariant',
  'changeVariant',
  'changeTheme'
])

const isDark = ref(false)
const themeMode = ref('light')
const activePopup = ref(null)
const floatingBarRef = ref(null)
const bottomOffset = ref(24)

const currentVariant = computed(() => {
  return String(props.heroVariant ?? props.modelValue)
})

function applyTheme(mode) {
  themeMode.value = mode
  localStorage.setItem('vb-theme', mode)
  if (mode === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
  emit('changeTheme', { mode, isDark: isDark.value })
}

function toggleTheme() {
  const nextMode = isDark.value ? 'light' : 'dark'
  applyTheme(nextMode)
  activePopup.value = null
}

function selectVariant(v) {
  emit('update:modelValue', v)
  emit('update:heroVariant', v)
  emit('changeVariant', v)
  activePopup.value = null
}

function togglePopup(type) {
  activePopup.value = activePopup.value === type ? null : type
}

function handleOutsideClick(event) {
  if (floatingBarRef.value && !floatingBarRef.value.contains(event.target)) {
    activePopup.value = null
  }
}

function getFooterTarget() {
  if (props.footerEl) {
    return props.footerEl.$el || props.footerEl
  }
  return document.querySelector('footer')
}

function updateBottomOffset() {
  const el = getFooterTarget()
  if (!el) return
  const rect = el.getBoundingClientRect()
  const windowHeight = window.innerHeight
  if (rect.top < windowHeight) {
    const visibleFooterHeight = windowHeight - rect.top
    bottomOffset.value = Math.max(24, visibleFooterHeight + 16)
  } else {
    bottomOffset.value = 24
  }
}

onMounted(() => {
  const saved = localStorage.getItem('vb-theme')
  if (saved && ['light', 'dark'].includes(saved)) {
    applyTheme(saved)
  } else {
    const hasDarkClass = document.documentElement.classList.contains('dark')
    themeMode.value = hasDarkClass ? 'dark' : 'light'
    isDark.value = hasDarkClass
  }

  document.addEventListener('click', handleOutsideClick)
  window.addEventListener('scroll', updateBottomOffset, { passive: true })
  window.addEventListener('resize', updateBottomOffset, { passive: true })
  updateBottomOffset()
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('scroll', updateBottomOffset)
  window.removeEventListener('resize', updateBottomOffset)
})
</script>

<template>
  <!-- 悬浮控制台：纵向连体按钮与弹出菜单（自动避让页脚） -->
  <div
    ref="floatingBarRef"
    class="fixed right-6 z-50 flex items-end transition-[bottom] duration-150 ease-out"
    :style="{ bottom: `${bottomOffset}px` }"
  >
    <!-- 弹出选择项菜单（仅保留变体选择） -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-x-2 scale-95"
      enter-to-class="opacity-100 translate-x-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-x-0 scale-100"
      leave-to-class="opacity-0 translate-x-2 scale-95"
    >
      <div
        v-if="activePopup === 'variant'"
        class="mr-3 mb-0 w-52 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/90 dark:border-gray-700/90 shadow-2xl rounded-2xl p-2 text-xs"
      >
        <div class="space-y-1">
          <div class="px-2.5 py-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Hero 变体选择
          </div>
          <button
            v-for="v in variants"
            :key="v.id"
            @click="selectVariant(v.id)"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors font-medium cursor-pointer',
              currentVariant === String(v.id)
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60'
            ]"
          >
            <div>
              <div class="flex items-center gap-1.5">
                <span
                  :class="[
                    'w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold',
                    currentVariant === String(v.id)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  ]"
                >{{ v.id }}</span>
                <span class="text-xs">{{ v.name }}</span>
              </div>
              <div class="text-[10px] text-gray-400 dark:text-gray-500 pl-5">{{ v.desc }}</div>
            </div>
            <svg
              v-if="currentVariant === String(v.id)"
              class="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </transition>

    <!-- 纵向放置两个连体按钮 -->
    <div
      class="flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-200/90 dark:border-gray-700/90 shadow-2xl rounded-2xl overflow-hidden divide-y divide-gray-200/80 dark:divide-gray-700/80"
    >
      <!-- 切换模式开关按钮（直接点击切换深色/浅色） -->
      <button
        @click="toggleTheme"
        class="w-12 h-12 flex flex-col items-center justify-center transition-colors relative group cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60 active:scale-95"
        :title="isDark ? '当前为深色模式，点击切换至浅色模式' : '当前为浅色模式，点击切换至深色模式'"
        :aria-label="isDark ? '切换至浅色模式' : '切换至深色模式'"
      >
        <svg
          v-if="!isDark"
          class="w-5 h-5 text-amber-500 transition-transform group-hover:rotate-45"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <svg
          v-else
          class="w-5 h-5 text-indigo-400 transition-transform group-hover:-rotate-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <span class="text-[9px] font-semibold leading-none mt-1">{{ isDark ? '深色' : '浅色' }}</span>
      </button>

      <!-- 切换变体按钮 -->
      <button
        @click="togglePopup('variant')"
        :class="[
          'w-12 h-12 flex flex-col items-center justify-center transition-colors relative group cursor-pointer',
          activePopup === 'variant'
            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60'
        ]"
        title="切换Hero变体"
        aria-label="切换Hero变体"
      >
        <svg
          class="w-5 h-5 transition-transform group-hover:scale-110"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <span class="text-[9px] font-semibold leading-none mt-1">变体</span>
        <span
          class="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs"
        >
          {{ currentVariant }}
        </span>
      </button>
    </div>
  </div>
</template>
