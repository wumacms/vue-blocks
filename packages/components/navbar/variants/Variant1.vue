<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  styles: {
    type: Object,
    required: true
  }
})

const isMobileOpen = ref(false)
</script>

<template>
  <header :class="styles.root">
    <div :class="styles.container">
      <div :class="styles.navWrapper">
        <!-- Logo + 品牌 -->
        <slot name="brand" :data="data">
          <div :class="styles.brandWrapper">
            <img v-if="data.logo" :src="data.logo" :alt="data.brandName || 'Logo'" :class="styles.logo"
              onerror="this.src='https://placehold.co/32x32/4F46E5/white?text=Logo'" />
            <span v-if="data.brandName" :class="styles.brandName">{{ data.brandName }}</span>
          </div>
        </slot>

        <!-- 桌面端菜单导航 -->
        <slot name="nav" :nav-links="data.navLinks">
          <nav :class="styles.menuNav">
            <div v-for="(item, idx) in data.navLinks" :key="idx"
              :class="item.children && item.children.length ? 'relative group' : ''">
              <!-- 带二级菜单 -->
              <template v-if="item.children && item.children.length">
                <button type="button" :class="[styles.dropdownTrigger, item.active ? styles.dropdownTriggerActive : '']">
                  <span>{{ item.text }}</span>
                  <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div :class="styles.dropdownMenu">
                  <a v-for="(child, cIdx) in item.children" :key="cIdx" :href="child.link || '#'"
                    :target="child.newWindow ? '_blank' : '_self'"
                    :class="[styles.dropdownItem, child.active ? styles.dropdownItemActive : '']">
                    <span v-if="child.icon" class="text-base">{{ child.icon }}</span>
                    <span>{{ child.text }}</span>
                  </a>
                </div>
              </template>

              <!-- 普通单级菜单 -->
              <template v-else>
                <a :href="item.link || '#'" :target="item.newWindow ? '_blank' : '_self'"
                  :class="[styles.menuItem, item.active ? styles.menuItemActive : '']">
                  {{ item.text }}
                </a>
              </template>
            </div>
          </nav>
        </slot>

        <!-- 右侧 CTA 按钮与移动端汉堡按钮 -->
        <div :class="styles.actionsWrapper">
          <slot name="actions" :buttons="data.buttons">
            <template v-if="data.buttons && data.buttons.length">
              <a v-for="(btn, bIdx) in data.buttons" :key="bIdx" :href="btn.btnLink || btn.link || '#'"
                :target="btn.newWindow ? '_blank' : '_self'" :class="styles.ctaButton">
                {{ btn.btnText || btn.text }}
              </a>
            </template>
          </slot>

          <button type="button" :class="styles.mobileToggle" @click="isMobileOpen = !isMobileOpen"
            aria-label="Toggle Mobile Menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- 移动端展开菜单 -->
      <div v-show="isMobileOpen" :class="styles.mobileMenu">
        <div v-for="(item, idx) in data.navLinks" :key="'mob-' + idx" :class="styles.mobileMenuGroup">
          <a :href="item.link || '#'" :target="item.newWindow ? '_blank' : '_self'"
            :class="[styles.mobileMenuItem, item.active ? styles.mobileMenuItemActive : '']">
            {{ item.text }}
          </a>
          <div v-if="item.children && item.children.length" :class="styles.mobileDropdownWrapper">
            <a v-for="(child, cIdx) in item.children" :key="'mob-c-' + cIdx" :href="child.link || '#'"
              :class="[styles.mobileDropdownItem, child.active ? styles.mobileDropdownItemActive : '']">
              <span v-if="child.icon">{{ child.icon }}</span>
              <span>{{ child.text }}</span>
            </a>
          </div>
        </div>
        <div v-if="data.buttons && data.buttons.length" :class="styles.mobileButtonWrapper">
          <a v-for="(btn, bIdx) in data.buttons" :key="'mob-btn-' + bIdx" :href="btn.btnLink || btn.link || '#'"
            :class="styles.mobileCtaButton">
            {{ btn.btnText || btn.text }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
