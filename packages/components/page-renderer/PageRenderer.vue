<script setup>
import { computed, watchEffect, onUnmounted } from 'vue'
import { builtInBlocks } from './blockMap'
import { defaultData } from './defaultData'

defineOptions({
  name: 'PageRenderer'
})

const props = defineProps({
  data: {
    type: [Object, Array],
    default: () => defaultData
  },
  navbar: {
    type: [Object, String, Function, Boolean],
    default: undefined
  },
  footer: {
    type: [Object, String, Function, Boolean],
    default: undefined
  },
  seo: {
    type: [Object, Boolean],
    default: undefined
  }
})

const emit = defineEmits(['submit'])

// 规范化配置数据，安全兼顾 Array 与 Object 结构
const pageConfig = computed(() => {
  const raw = props.data
  if (Array.isArray(raw)) {
    return {
      seo: undefined,
      navbar: undefined,
      containerClass: '',
      mainClass: '',
      blocks: raw,
      footer: undefined
    }
  }
  return {
    seo: raw?.seo,
    title: raw?.title,
    description: raw?.description,
    keywords: raw?.keywords,
    navbar: raw?.navbar,
    containerClass: raw?.containerClass || '',
    mainClass: raw?.mainClass || '',
    blocks: Array.isArray(raw?.blocks) ? raw.blocks : [],
    footer: raw?.footer
  }
})

// 解析区块组件：内置组件优先，未匹配时交由 Vue 全局解析（支持外部扩展）
function resolveBlock(type) {
  if (!type) return null
  return builtInBlocks[type] || type
}

// 统一解析导航栏或页脚配置，支持传入组件对象、组件名字符串、配置对象或布尔值
function resolveBlockConfig(input, defaultType) {
  if (input === false || input === null) return null
  if (input === true) {
    const comp = resolveBlock(defaultType)
    return comp ? { component: comp, props: {}, raw: { type: defaultType } } : null
  }
  if (!input) return null

  // 1. 如果传入的是 Vue 组件（对象或函数，且没有 type / is 字段）
  if (
    typeof input === 'function' ||
    (typeof input === 'object' && !input.type && !input.is && (input.render || input.setup || input.__vccOpts || input.name))
  ) {
    return {
      component: input,
      props: {},
      raw: input
    }
  }

  // 2. 如果传入的是字符串，如 "NavbarBlock"
  if (typeof input === 'string') {
    const comp = resolveBlock(input)
    return comp ? { component: comp, props: {}, raw: { type: input } } : null
  }

  // 3. 如果传入的是区块配置对象，如 { type: 'NavbarBlock', variant: '1', data: { ... }, styles: { ... } }
  if (typeof input === 'object') {
    const compType = input.type || input.is
    const comp = typeof compType === 'string' ? resolveBlock(compType) : compType
    if (!comp) return null
    return {
      component: comp,
      props: {
        id: input.id,
        variant: input.variant,
        data: input.data,
        styles: input.styles
      },
      raw: input
    }
  }

  return null
}

const resolvedNavbar = computed(() => {
  const target = props.navbar !== undefined ? props.navbar : pageConfig.value.navbar
  return resolveBlockConfig(target, 'NavbarBlock')
})

const resolvedFooter = computed(() => {
  const target = props.footer !== undefined ? props.footer : pageConfig.value.footer
  return resolveBlockConfig(target, 'FooterBlock')
})

// 解析页面 SEO 配置信息
const resolvedSeo = computed(() => {
  if (props.seo === false) return null
  if (props.seo && typeof props.seo === 'object') return props.seo

  const raw = pageConfig.value
  if (raw.seo) return raw.seo
  if (raw.title || raw.description || raw.keywords) {
    return {
      title: raw.title,
      description: raw.description,
      keywords: raw.keywords
    }
  }
  return null
})

// 响应式应用页面级 SEO 信息（设置 document.title 和 meta 标签）
watchEffect(() => {
  const seo = resolvedSeo.value
  if (!seo || typeof document === 'undefined') return

  if (seo.title && typeof seo.title === 'string') {
    document.title = seo.title
  }

  const setMetaTag = (attrName, attrValue, content) => {
    if (!content) return
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attrName, attrValue)
      el.setAttribute('data-v-blocks-seo', 'true')
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  if (seo.description) {
    setMetaTag('name', 'description', seo.description)
  }

  if (seo.keywords) {
    const kw = Array.isArray(seo.keywords) ? seo.keywords.join(', ') : seo.keywords
    setMetaTag('name', 'keywords', kw)
  }

  if (Array.isArray(seo.meta)) {
    seo.meta.forEach((item) => {
      if (item && item.content) {
        const key = item.name ? 'name' : item.property ? 'property' : 'name'
        const val = item.name || item.property
        if (val) {
          setMetaTag(key, val, item.content)
        }
      }
    })
  } else if (typeof seo.meta === 'object' && seo.meta !== null) {
    Object.entries(seo.meta).forEach(([key, val]) => {
      if (typeof val === 'string') {
        const attr = key.startsWith('og:') || key.startsWith('twitter:') ? 'property' : 'name'
        setMetaTag(attr, key, val)
      }
    })
  }
})

onUnmounted(() => {
  if (typeof document === 'undefined') return
  document.querySelectorAll('meta[data-v-blocks-seo="true"]').forEach((el) => el.remove())
})

function handleSubmit(payload, block, index) {
  emit('submit', payload, { block, index })
}
</script>

<template>
  <!-- 页面全局根容器（挂载 containerClass，统一控制整页背景、字体、最小高度等全局样式） -->
  <div :class="pageConfig.containerClass">
    <!-- 1. 可选导航栏组件（独立于 <main> 外部，属于全局视口头部） -->
    <slot name="navbar">
      <component
        :is="resolvedNavbar.component"
        v-if="resolvedNavbar"
        v-bind="resolvedNavbar.props"
        @submit="(payload) => handleSubmit(payload, resolvedNavbar.raw, 'navbar')"
      />
    </slot>

    <!-- 2. 页面主体内容区（严格使用语义化 <main> 标签包裹核心区块） -->
    <main :class="pageConfig.mainClass">
      <template
        v-for="(block, index) in pageConfig.blocks"
        :key="block?.id || `${block?.type || 'block'}_${index}`"
      >
        <component
          :is="resolveBlock(block?.type)"
          v-if="block?.type"
          :id="block.id"
          :variant="block.variant"
          :data="block.data"
          :styles="block.styles"
          @submit="(payload) => handleSubmit(payload, block, index)"
        />
      </template>
    </main>

    <!-- 3. 可选页脚组件（独立于 <main> 外部，属于全局视口底部） -->
    <slot name="footer">
      <component
        :is="resolvedFooter.component"
        v-if="resolvedFooter"
        v-bind="resolvedFooter.props"
        @submit="(payload) => handleSubmit(payload, resolvedFooter.raw, 'footer')"
      />
    </slot>
  </div>
</template>
