import gulp from 'gulp'
import { join } from 'node:path'
import { inputDir, outputUmd } from './common.js'

// 将编译好的 Tailwind CSS 复制到输出目录
export const buildStyleTask = () => {
  return new Promise((resolve) => {
    gulp
      .src(join(inputDir, 'dist/style.css'), { allowEmpty: true })
      .pipe(gulp.dest(outputUmd))
      .on('end', resolve)
  })
}
