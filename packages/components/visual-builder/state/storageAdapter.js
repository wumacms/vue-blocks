/**
 * Visual Builder 统一持久化存储适配器架构
 * 支持 LocalStorage、内存存储以及未来无头 CMS/RESTful API 适配扩展
 */

import { DEFAULT_PAGES } from './defaultPages.js'

export const DEFAULT_STORAGE_KEY = 'wumacms_builder_pages_v1'

/**
 * 存储适配器抽象基类
 */
export class BaseStorageAdapter {
  async loadPages() {
    throw new Error('Method not implemented: loadPages')
  }

  async savePages(pages) {
    throw new Error('Method not implemented: savePages')
  }

  async resetPages() {
    throw new Error('Method not implemented: resetPages')
  }
}

/**
 * LocalStorage 默认持久化适配器
 */
export class LocalStorageAdapter extends BaseStorageAdapter {
  constructor(storageKey = DEFAULT_STORAGE_KEY, fallbackPages = DEFAULT_PAGES) {
    super()
    this.storageKey = storageKey
    this.fallbackPages = fallbackPages
  }

  loadPages() {
    if (typeof window === 'undefined' || !this.storageKey) {
      return JSON.parse(JSON.stringify(this.fallbackPages))
    }
    try {
      const raw = localStorage.getItem(this.storageKey)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // 自动检测并兼容补充新增的标准页面，不覆盖用户已有页面的自定义修改
          const existingPaths = new Set(parsed.map((p) => p.path))
          const missingPages = this.fallbackPages.filter((p) => !existingPaths.has(p.path))
          if (missingPages.length > 0) {
            const merged = [...parsed, ...JSON.parse(JSON.stringify(missingPages))]
            this.savePages(merged)
            return merged
          }
          return parsed
        }
      }
    } catch (err) {
      console.warn('[LocalStorageAdapter] 读取失败，回退至初始默认配置:', err)
    }
    return JSON.parse(JSON.stringify(this.fallbackPages))
  }

  savePages(pages) {
    if (typeof window === 'undefined' || !this.storageKey) return false
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(pages))
      return true
    } catch (err) {
      console.error('[LocalStorageAdapter] 写入失败:', err)
      return false
    }
  }

  resetPages() {
    if (typeof window === 'undefined' || !this.storageKey) return
    try {
      localStorage.removeItem(this.storageKey)
    } catch (err) {
      console.error('[LocalStorageAdapter] 清理失败:', err)
    }
  }
}

/**
 * 内存存储适配器（用于单测、无痕或无状态演示环境）
 */
export class MemoryStorageAdapter extends BaseStorageAdapter {
  constructor(initialPages = DEFAULT_PAGES) {
    super()
    this.pages = JSON.parse(JSON.stringify(initialPages))
  }

  loadPages() {
    return JSON.parse(JSON.stringify(this.pages))
  }

  savePages(pages) {
    this.pages = JSON.parse(JSON.stringify(pages))
    return true
  }

  resetPages() {
    this.pages = JSON.parse(JSON.stringify(DEFAULT_PAGES))
  }
}

export const defaultStorageAdapter = new LocalStorageAdapter()

export function loadStoredPages(storageKey = DEFAULT_STORAGE_KEY) {
  const adapter = new LocalStorageAdapter(storageKey)
  return adapter.loadPages()
}

export function saveStoredPages(pages, storageKey = DEFAULT_STORAGE_KEY) {
  const adapter = new LocalStorageAdapter(storageKey)
  return adapter.savePages(pages)
}

export function resetStoredPages(storageKey = DEFAULT_STORAGE_KEY) {
  const adapter = new LocalStorageAdapter(storageKey)
  return adapter.resetPages()
}

