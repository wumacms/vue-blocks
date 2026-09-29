import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import nodeResolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import { inputDir, outputEsm, outputCjs } from './common.js'
import FastGlob from 'fast-glob'

// 模块化打包组件
const moduleBuildEntry = async () => {
  const input = await FastGlob('**/*.{js,vue,json}', {
    cwd: inputDir,
    onlyFiles: true,
    absolute: true,
    ignore: ['**/dist/**', '**/node_modules/**']
  })

  // 创建打包器
  const writeBundles = await rollup({
    input,
    plugins: [vue(), nodeResolve(), json(), esbuild()],
    external: ['vue', 'clsx', 'tailwind-merge', 'defu']
  })

  // esm 打包操作
  await writeBundles.write({
    format: 'esm',
    dir: outputEsm,
    exports: 'named',
    entryFileNames: '[name].js',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: inputDir
  })

  // cjs 打包操作
  await writeBundles.write({
    format: 'cjs',
    dir: outputCjs,
    exports: 'named',
    entryFileNames: '[name].js',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: inputDir
  })
}

export const buildModule = async () => {
  return moduleBuildEntry()
}
