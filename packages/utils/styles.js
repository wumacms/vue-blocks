import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const VARIANT_ALIASES = {
  clean: '1',
  modern: '1',
  default: '1',
  saas: '1',
  brutalism: '2',
  retro: '2',
  pop: '2'
}

/**
 * Resolve variant string or alias to a canonical variant key
 * @param {string|number} variant
 * @returns {string}
 */
export function resolveVariantKey(variant) {
  if (variant === undefined || variant === null) return '1'
  const str = String(variant).toLowerCase().trim()
  return VARIANT_ALIASES[str] || str || '1'
}

/**
 * Merge class names with clsx and tailwind-merge
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Merge base slot styles with user-provided style overrides
 * @param {Record<string, any>} base
 * @param {Record<string, any>} overrides
 * @returns {Record<string, any>}
 */
export function mergeStyles(base = {}, overrides = {}) {
  if (!overrides || Object.keys(overrides).length === 0) return { ...base }
  const result = { ...base }
  for (const key in overrides) {
    if (overrides[key] !== undefined && overrides[key] !== null) {
      if (typeof overrides[key] === 'string' && typeof result[key] === 'string') {
        result[key] = cn(result[key], overrides[key])
      } else {
        result[key] = overrides[key]
      }
    }
  }
  return result
}

/**
 * Resolve component styles by variant and overrides
 * @param {Record<string, any>} defaultStyles
 * @param {string|number} variant
 * @param {Record<string, any>} overrides
 * @returns {Record<string, any>}
 */
export function resolveStyles(defaultStyles = {}, variant = '1', overrides = {}) {
  const key = resolveVariantKey(variant)
  const base = defaultStyles[key] || defaultStyles['1'] || {}
  return mergeStyles(base, overrides)
}

