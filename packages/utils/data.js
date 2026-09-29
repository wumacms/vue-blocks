import { createDefu } from 'defu'

// Custom defu: when both obj[key] and value are arrays, user value replaces default array
const customDefu = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
})

/**
 * Deep merge default block data with user partial data overrides
 * @param {Record<string, any>} defaultData
 * @param {Record<string, any>} userData
 * @returns {Record<string, any>}
 */
export function mergeData(defaultData = {}, userData = {}) {
  if (!userData || Object.keys(userData).length === 0) {
    return structuredClone(defaultData)
  }
  return customDefu(userData, defaultData)
}
