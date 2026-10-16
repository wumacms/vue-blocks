/**
 * Material & Block Registry for WumaCMS Visual Editor and vue-blocks runtime
 */

/**
 * @typedef {Object} BlockManifest
 * @property {string} name
 * @property {string} title
 * @property {string} category
 * @property {string} icon
 * @property {string} description
 * @property {string} [thumbnail]
 * @property {Object} supports
 * @property {boolean} supports.variant
 * @property {boolean} supports.theme
 * @property {Array<{slot: string, label: string, allowedProps?: string[]}>} [supports.styleSlots]
 * @property {Array<{name: string, label: string, description?: string}>} [supports.customSlots]
 * @property {Array<any>} fields
 */

/**
 * @typedef {Object} BlockEntry
 * @property {string} type
 * @property {any} component
 * @property {BlockManifest|Array<any>} [manifest]
 * @property {Record<string, any>} [defaultData]
 * @property {Record<string, any>} [defaultStyles]
 */

export class MaterialRegistry {
  constructor() {
    /** @type {Map<string, BlockEntry>} */
    this.blocks = new Map()
  }

  /**
   * 注册单个区块或物料
   * @param {BlockEntry} entry
   */
  register(entry) {
    if (!entry || !entry.type) {
      console.warn('[BlockRegistry] 无效的区块注册项，必须包含 type 属性。', entry)
      return
    }
    const existing = this.blocks.get(entry.type)
    if (existing) {
      this.blocks.set(entry.type, {
        ...existing,
        ...entry,
        manifest: entry.manifest || entry.schema || existing.manifest || null
      })
      return
    }
    this.blocks.set(entry.type, {
      ...entry,
      manifest: entry.manifest || entry.schema || null
    })
  }

  /**
   * 批量注册区块
   * @param {BlockEntry[]} entries
   */
  registerAll(entries = []) {
    if (Array.isArray(entries)) {
      entries.forEach((e) => this.register(e))
    }
  }

  /**
   * 卸载区块
   * @param {string} type
   */
  unregister(type) {
    return this.blocks.delete(type)
  }

  /**
   * 获取指定类型的区块配置
   * @param {string} type
   * @returns {BlockEntry|undefined}
   */
  get(type) {
    return this.blocks.get(type)
  }

  /**
   * 检查指定类型是否已注册
   * @param {string} type
   * @returns {boolean}
   */
  has(type) {
    return this.blocks.has(type)
  }

  /**
   * 获取区块对应的 Vue 组件对象
   * @param {string} type
   * @returns {any|null}
   */
  getComponent(type) {
    const entry = this.blocks.get(type)
    return entry ? entry.component : null
  }

  /**
   * 获取所有已注册组件映射字典（供 PageRenderer / Vue 动态渲染使用）
   * @returns {Record<string, any>}
   */
  getComponentMap() {
    const map = {}
    this.blocks.forEach((entry, key) => {
      map[key] = entry.component
    })
    return map
  }

  /**
   * 获取所有已注册的区块条目列表
   * @returns {BlockEntry[]}
   */
  getAll() {
    return Array.from(this.blocks.values())
  }

  /**
   * 获取全量物料清单列表（供可视化编辑器物料面板读取）
   * @returns {Array<any>}
   */
  getAllManifests() {
    return this.getAll()
      .map((e) => e.manifest)
      .filter(Boolean)
  }

  /**
   * 按分类获取物料清单列表
   * @param {string} category
   * @returns {Array<any>}
   */
  getManifestsByCategory(category) {
    return this.getAllManifests().filter((m) => m && m.category === category)
  }

  /**
   * 清空所有注册项
   */
  clear() {
    this.blocks.clear()
  }
}

/**
 * 全局单例物料注册中心
 */
export const blockRegistry = new MaterialRegistry()

/**
 * 便捷注册函数
 * @param {BlockEntry} entry
 */
export function registerBlock(entry) {
  blockRegistry.register(entry)
}

/**
 * 便捷获取函数
 * @param {string} type
 */
export function getBlock(type) {
  return blockRegistry.get(type)
}

/**
 * 便捷查询函数
 * @param {string} type
 */
export function hasBlock(type) {
  return blockRegistry.has(type)
}
