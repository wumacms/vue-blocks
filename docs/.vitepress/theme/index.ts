import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VueBlocks from 'vue-blocks'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueBlocks)
  }
} satisfies Theme
