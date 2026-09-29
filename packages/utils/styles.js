import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with clsx and tailwind-merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Merge base slot styles with user-provided style overrides
 * @param {Record<string, string>} base
 * @param {Record<string, string>} overrides
 * @returns {Record<string, string>}
 */
export function mergeStyles(base = {}, overrides = {}) {
  if (!overrides || Object.keys(overrides).length === 0) return { ...base }
  const result = { ...base }
  for (const key in overrides) {
    if (overrides[key] !== undefined && overrides[key] !== null) {
      result[key] = result[key] ? cn(result[key], overrides[key]) : overrides[key]
    }
  }
  return result
}
