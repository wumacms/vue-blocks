/**
 * 封装组件为可被 Vue app.use() 全局安装的插件
 * @param {import('vue').Component} com
 * @returns {import('vue').Component}
 */
export const componentInstall = (com) => {
  com.install = (app) => {
    app.component(com.name, com)
  }
  return com
}
