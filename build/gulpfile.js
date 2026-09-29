import gulp from 'gulp'
import { buildUmd, fileTask, buildStyleTask, buildModule } from './src/index.js'

// 任务序列，任务从前到后依次执行
export default gulp.series(fileTask, buildUmd, buildStyleTask, buildModule)
