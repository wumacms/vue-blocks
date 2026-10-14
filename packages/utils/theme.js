export const THEME_HUES = {
  red: 25,
  orange: 55,
  yellow: 85,
  green: 145,
  emerald: 155,
  cyan: 200,
  blue: 255,
  indigo: 270,
  purple: 300,
  pink: 345
}

export const THEME_NAMES = {
  blue: '科技蓝',
  indigo: '经典靛蓝',
  purple: '奢华紫',
  cyan: '极客青',
  green: '生态绿',
  emerald: '翡翠绿',
  yellow: '活力黄',
  orange: '暖阳橙',
  red: '热情红',
  pink: '先锋粉'
}

/**
 * 获取所有预设主题列表
 * @returns {Array<{ key: string, name: string, hue: number, swatch: string }>}
 */
export function getThemePresets() {
  const swatches = {
    red: '#ef4444',
    orange: '#f97316',
    yellow: '#eab308',
    green: '#22c55e',
    emerald: '#10b981',
    cyan: '#06b6d4',
    blue: '#3b82f6',
    indigo: '#6366f1',
    purple: '#a855f7',
    pink: '#ec4899'
  }

  return Object.entries(THEME_HUES).map(([key, hue]) => ({
    key,
    name: THEME_NAMES[key] || key,
    hue,
    swatch: swatches[key] || '#3b82f6'
  }))
}

/**
 * 解析主题名称或色相数值
 * @param {string|number} theme
 * @returns {{ key: string, hue: number, isCustom: boolean }}
 */
export function resolveTheme(theme) {
  if (theme === undefined || theme === null || theme === '') {
    return { key: 'blue', hue: 255, isCustom: false }
  }

  if (typeof theme === 'number') {
    return { key: 'custom', hue: theme, isCustom: true }
  }

  const str = String(theme).toLowerCase().trim()
  if (THEME_HUES[str] !== undefined) {
    return { key: str, hue: THEME_HUES[str], isCustom: false }
  }

  const parsedNum = Number(str)
  if (!Number.isNaN(parsedNum)) {
    return { key: 'custom', hue: parsedNum, isCustom: true }
  }

  return { key: 'blue', hue: 255, isCustom: false }
}

/**
 * 响应式应用动态主题和明暗模式至目标元素或根文档
 * @param {Object} options
 * @param {string|number} [options.theme] - 主题别名 (如 'blue', 'green') 或任意数字色相 (0~360)
 * @param {'light'|'dark'} [options.mode] - 明暗模式
 * @param {HTMLElement} [options.target] - 目标挂载元素（默认为 document.documentElement）
 */
export function applyTheme({ theme, mode, target } = {}) {
  const el = target || (typeof document !== 'undefined' ? document.documentElement : null)
  if (!el) return

  if (theme !== undefined && theme !== null) {
    const resolved = resolveTheme(theme)
    if (resolved.isCustom) {
      el.dataset.theme = 'custom'
      el.style.setProperty('--hue', String(resolved.hue))
    } else {
      el.dataset.theme = resolved.key
      el.style.removeProperty('--hue')
    }
  }

  if (mode !== undefined && mode !== null) {
    el.dataset.mode = mode
    if (mode === 'dark') {
      el.classList.add('dark')
    } else {
      el.classList.remove('dark')
    }
  }
}
