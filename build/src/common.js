import { join } from 'node:path'

// 当前模块所处的路径
const _dirname = import.meta.dirname
// UI 组件库的名称
export const uiLibraryName = 'vue-blocks'

// 项目根目录
export const monorepoDir = join(_dirname, '../../')
// 组件库打包的入口目录
export const inputDir = join(monorepoDir, 'packages')

// 组件库打包后的输出目录
export const outputDir = join(monorepoDir, uiLibraryName)
export const outputUmd = join(outputDir, 'dist')
export const outputCjs = join(outputDir, 'lib')
export const outputEsm = join(outputDir, 'es')
