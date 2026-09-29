// 向外按需导出所有的组件
export * from './components/index.js'
export * from './utils/index.js'

// 实现所有组件的全局安装
import components from './components.js'

// 封装并按需向外导出一个插件函数
export const install = (app) => {
  components.forEach((com) => app.use(com))
}
// 默认导出插件函数
export default install
