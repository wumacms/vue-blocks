import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VueBlocks from 'vue-blocks'
import BlockPreview from './components/BlockPreview.vue'
import PreviewFrame from './components/PreviewFrame.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueBlocks)
    app.component('BlockPreview', BlockPreview)
    app.component('PreviewFrame', PreviewFrame)
  }
} satisfies Theme

