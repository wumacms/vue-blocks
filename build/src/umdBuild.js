import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import { join } from 'node:path'
import { inputDir, outputUmd } from './common.js'

// umd 全量打包的入口函数
const umdBuildEntry = async (isMinify = false) => {
  const writeBundles = await rollup({
    input: join(inputDir, 'index.js'),
    plugins: [vue(), nodeResolve(), json(), esbuild({ minify: isMinify, sourceMap: true })],
    external: ['vue']
  })

  await writeBundles.write({
    format: 'umd',
    file: join(outputUmd, `index.full${isMinify ? '.min' : ''}.js`),
    name: 'VueBlocks',
    exports: 'named',
    globals: { vue: 'Vue' }
  })
}

export const buildUmd = async () => {
  return Promise.all([
    umdBuildEntry(),
    umdBuildEntry(true)
  ])
}
