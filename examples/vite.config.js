import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      'vue-blocks': path.resolve(__dirname, '../packages'),
      '@vue-blocks/components': path.resolve(__dirname, '../packages/components'),
      '@vue-blocks/utils': path.resolve(__dirname, '../packages/utils')
    }
  },
  server: {
    port: 5173,
    open: false
  }
})
