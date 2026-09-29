import { deleteAsync } from 'del'
import gulp from 'gulp'
import { join } from 'node:path'
import { outputDir, inputDir } from './common.js'

// 删除组件库的输出目录
const deleteUIPackage = () => {
  return deleteAsync(outputDir, { force: true })
}

// 拷贝 README、package.json 和 index.d.ts 类型声明文件
const copyPackageInfo = () => {
  return new Promise((resolve) => {
    gulp
      .src([join(inputDir, 'README.md'), join(inputDir, 'package.json'), join(inputDir, 'index.d.ts')], {
        encoding: false,
        allowEmpty: true
      })
      .pipe(gulp.dest(outputDir))
      .on('end', resolve)
  })
}

// CSS 拷贝已移至 styleBuild.js 统一处理，此处不再重复
export const fileTask = gulp.series(deleteUIPackage, copyPackageInfo)
