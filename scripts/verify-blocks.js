import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolveStyles, resolveVariantKey, mergeStyles, VARIANT_ALIASES } from '../packages/utils/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const componentsDir = path.resolve(__dirname, '../packages/components')

console.log('🧪 开始运行 VueBlocks 组件库一致性与完整性校验...\n')

let errors = 0
let checks = 0

function assert(condition, message) {
  checks++
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`)
    errors++
  } else {
    console.log(`✅ [PASS] ${message}`)
  }
}

// 1. 验证 utils 中的主题与别名机制
assert(resolveVariantKey('clean') === '1', "resolveVariantKey('clean') 应解析为 '1'")
assert(resolveVariantKey('modern') === '1', "resolveVariantKey('modern') 应解析为 '1'")
assert(resolveVariantKey('brutalism') === '2', "resolveVariantKey('brutalism') 应解析为 '2'")
assert(resolveVariantKey('retro') === '2', "resolveVariantKey('retro') 应解析为 '2'")
assert(resolveVariantKey('editorial') === '3', "resolveVariantKey('editorial') 应解析为 '3'")
assert(resolveVariantKey('warm') === '3', "resolveVariantKey('warm') 应解析为 '3'")
assert(resolveVariantKey(3) === '3', "resolveVariantKey(3) 应解析为 '3'")

const testStyles = {
  '1': { root: 'bg-white', strokeWidth: 2 },
  '2': { root: 'bg-purple-500', strokeWidth: 3 }
}

const resolved1 = resolveStyles(testStyles, '1', { root: 'p-4' })
assert(resolved1.root.includes('bg-white') && resolved1.root.includes('p-4'), 'resolveStyles 变体 1 样式合并正确')
assert(resolved1.strokeWidth === 2, 'resolveStyles 基础数字属性保留正确')

const resolved2 = resolveStyles(testStyles, 'brutalism', { strokeWidth: 4 })
assert(resolved2.root === 'bg-purple-500', 'resolveStyles 变体 2 别名匹配正确')
assert(resolved2.strokeWidth === 4, 'resolveStyles 数字属性覆盖正确')

// 2. 验证所有 22 个区块组件的完整性与单模板规范
const compDirs = fs
  .readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !['node_modules', 'page-renderer', 'site-renderer'].includes(d.name))
  .map((d) => d.name)

assert(compDirs.length === 22, `应具有 22 个核心区块组件，当前检测到 ${compDirs.length} 个`)

for (const comp of compDirs) {
  const dir = path.join(componentsDir, comp)
  const files = fs.readdirSync(dir)

  // 必须具备的核心文件
  assert(files.includes('defaultData.js'), `${comp} 必须包含 defaultData.js`)
  assert(files.includes('defaultStyles.js'), `${comp} 必须包含 defaultStyles.js`)
  if (files.includes('defaultStyles.js')) {
    const stylesContent = fs.readFileSync(path.join(dir, 'defaultStyles.js'), 'utf-8')
    assert(stylesContent.includes("'3':"), `${comp} defaultStyles.js 必须包含变体 3`)
  }
  assert(files.includes('schema.json'), `${comp} 必须包含 schema.json`)
  assert(files.includes('index.js'), `${comp} 必须包含 index.js`)

  const blockFile = files.find((f) => f.endsWith('Block.vue'))
  assert(Boolean(blockFile), `${comp} 必须包含主入口 *Block.vue 文件`)

  // 确保不存在冗余的 variants 目录
  assert(!files.includes('variants'), `${comp} 不应再包含废弃的 variants 冗余目录`)

  if (blockFile) {
    const blockContent = fs.readFileSync(path.join(dir, blockFile), 'utf-8')
    assert(blockContent.includes('resolveStyles'), `${comp}/${blockFile} 应使用 resolveStyles 进行纯配置样式绑定`)
    assert(blockContent.includes('<template>'), `${comp}/${blockFile} 应具备内联的单模板结构`)
  }
}

console.log(`\n📊 校验完成: 共执行 ${checks} 项检测, ${errors} 项失败。`)

if (errors > 0) {
  process.exit(1)
} else {
  console.log('🎉 全部组件规范与主题机制检测通过！\n')
}
