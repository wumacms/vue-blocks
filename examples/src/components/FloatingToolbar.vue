<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getThemePresets, applyTheme as applyThemeUtil } from 'vue-blocks'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '1'
  },
  heroVariant: {
    type: [String, Number],
    default: null
  },
  theme: {
    type: [String, Number],
    default: 'blue'
  },
  variants: {
    type: Array,
    default: () => [
      { id: '1', alias: 'clean', name: 'SaaS 现代风格', desc: '科技产品极简落地页' },
      { id: '2', alias: 'brutalism', name: '波普复古新丑风', desc: '粗边框强对比撞色卡片' },
      { id: '3', alias: 'editorial', name: '人文科技纸质风', desc: 'Anthropic/Claude 暖调叙事典雅' },
      { id: '4', alias: 'geek', name: '工科极客新粗野风', desc: 'DevPath 开发者硬核代码终端风' }
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
  'update:theme',
  'changeVariant',
  'changeTheme',
  'changeThemeColor'
])

const isDark = ref(false)
const themeMode = ref('light')
const activePopup = ref(null)
const floatingBarRef = ref(null)
const bottomOffset = ref(24)

const themePresets = getThemePresets()

const currentVariant = computed(() => {
  return String(props.heroVariant ?? props.modelValue)
})

const currentTheme = computed(() => {
  return String(props.theme || 'blue')
})

const currentSwatch = computed(() => {
  const match = themePresets.find((t) => t.key === currentTheme.value)
  return match ? match.swatch : '#3b82f6'
})

function applyMode(mode) {
  themeMode.value = mode
  try {
    localStorage.setItem('vb-mode', mode)
  } catch {}
  if (mode === 'dark') {
    isDark.value = true
  } else {
    isDark.value = false
  }
  applyThemeUtil({ theme: currentTheme.value, mode })
  emit('changeTheme', { mode, isDark: isDark.value })
}

function toggleMode() {
  const nextMode = isDark.value ? 'light' : 'dark'
  applyMode(nextMode)
  activePopup.value = null
}

function selectVariant(v) {
  try {
    localStorage.setItem('vb-variant', String(v))
  } catch {}
  emit('update:modelValue', v)
  emit('update:heroVariant', v)
  emit('changeVariant', v)
  activePopup.value = null
}

function selectThemeColor(key) {
  try {
    localStorage.setItem('vb-theme', key)
  } catch {}
  emit('update:theme', key)
  emit('changeThemeColor', key)
  applyThemeUtil({ theme: key, mode: themeMode.value })
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

function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  const savedMode = localStorage.getItem('vb-mode')
  if (savedMode && ['light', 'dark'].includes(savedMode)) {
    applyMode(savedMode)
  } else {
    const isDarkSys = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    applyMode(isDarkSys ? 'dark' : 'light')
  }

  const savedTheme = localStorage.getItem('vb-theme')
  if (savedTheme) {
    selectThemeColor(savedTheme)
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
    <!-- 1. 弹出色彩主题菜单 (Theme Hues) -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 translate-x-2 scale-95"
      enter-to-class="opacity-100 translate-x-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-x-0 scale-100"
      leave-to-class="opacity-0 translate-x-2 scale-95"
    >
      <div
        v-if="activePopup === 'theme'"
        class="mr-3 mb-0 w-64 bg-card/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-3 text-xs"
      >
        <div class="px-2 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          动态 OKLCH 品牌色相
        </div>
        <div class="grid grid-cols-2 gap-1.5">
          <button
            v-for="t in themePresets"
            :key="t.key"
            @click="selectThemeColor(t.key)"
            :class="[
              'flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all font-medium cursor-pointer border',
              currentTheme === t.key
                ? 'bg-primary/10 border-primary text-primary font-bold'
                : 'border-transparent text-foreground hover:bg-muted'
            ]"
          >
            <span
              class="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs border border-black/10"
              :style="{ backgroundColor: t.swatch }"
            />
            <span class="text-xs truncate">{{ t.name }}</span>
          </button>
        </div>
      </div>
    </transition>

    <!-- 2. 弹出变体选择菜单 (Variants) -->
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
        class="mr-3 mb-0 w-60 bg-card/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl p-2 text-xs"
      >
        <div class="space-y-1">
          <div class="px-2.5 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            全系风格变体切换
          </div>
          <button
            v-for="v in variants"
            :key="v.id"
            @click="selectVariant(v.id)"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors font-medium cursor-pointer',
              currentVariant === String(v.id)
                ? 'bg-primary/10 text-primary font-bold'
                : 'text-foreground hover:bg-muted'
            ]"
          >
            <div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <span
                  :class="[
                    'w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0',
                    currentVariant === String(v.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  ]"
                >{{ v.id }}</span>
                <span class="text-xs">{{ v.name }}</span>
                <span
                  v-if="v.alias"
                  class="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono leading-none"
                >{{ v.alias }}</span>
              </div>
              <div class="text-[10px] text-muted-foreground pl-5 mt-0.5">{{ v.desc }}</div>
            </div>
            <svg
              v-if="currentVariant === String(v.id)"
              class="w-4 h-4 text-primary flex-shrink-0 ml-1"
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

    <!-- 纵向放置连体控制按钮 -->
    <div
      class="flex flex-col bg-card/95 backdrop-blur-md border border-border shadow-2xl rounded-2xl overflow-hidden divide-y divide-border"
    >
      <!-- 切换品牌主题色 (Theme Hue) -->
      <button
        @click="togglePopup('theme')"
        :class="[
          'w-12 h-12 flex flex-col items-center justify-center transition-colors relative group cursor-pointer',
          activePopup === 'theme' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
        ]"
        title="切换品牌色相 (OKLCH Dynamic Hue)"
        aria-label="切换品牌色相"
      >
        <span
          class="w-4 h-4 rounded-full shadow-xs border border-white/40 transition-transform group-hover:scale-110"
          :style="{ backgroundColor: currentSwatch }"
        />
        <span class="text-[9px] font-semibold leading-none mt-1">色彩</span>
      </button>

      <!-- 切换模式开关按钮（直接点击切换深色/浅色） -->
      <button
        @click="toggleMode"
        class="w-12 h-12 flex flex-col items-center justify-center transition-colors relative group cursor-pointer text-foreground hover:bg-muted active:scale-95"
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
          class="w-5 h-5 text-primary transition-transform group-hover:-rotate-12"
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
          activePopup === 'variant' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
        ]"
        title="切换全系风格变体"
        aria-label="切换全系风格变体"
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
        <span class="text-[9px] font-semibold leading-none mt-1">风格</span>
        <span
          class="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center shadow-xs"
        >
          {{ currentVariant }}
        </span>
      </button>

      <!-- 返回顶部按钮 -->
      <button
        @click="scrollToTop"
        class="w-12 h-12 flex flex-col items-center justify-center transition-colors relative group cursor-pointer text-foreground hover:bg-muted active:scale-95"
        title="返回顶部"
        aria-label="返回顶部"
      >
        <svg
          class="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span class="text-[9px] font-semibold leading-none mt-1">顶部</span>
      </button>
    </div>
  </div>
</template>

