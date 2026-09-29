import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueBlocks from 'vue-blocks'

const app = createApp(App)
app.use(VueBlocks)
app.mount('#app')
