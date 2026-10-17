/**
 * Field Registry for Visual Builder Form Engine
 * 管理表单控件映射，支持外部插件注册自定义控件（如取色器、Markdown、富文本、图标拾取器等）
 */

import { markRaw } from 'vue'
import TextField from './widgets/TextField.vue'
import TextareaField from './widgets/TextareaField.vue'
import ImageField from './widgets/ImageField.vue'
import BooleanField from './widgets/BooleanField.vue'
import SelectField from './widgets/SelectField.vue'
import RepeaterField from './widgets/RepeaterField.vue'

class FormFieldRegistry {
  constructor() {
    this.widgets = new Map()

    // 默认内置核心控件
    this.register('text', TextField)
    this.register('link', TextField)
    this.register('textarea', TextareaField)
    this.register('image', ImageField)
    this.register('boolean', BooleanField)
    this.register('select', SelectField)
    this.register('repeater', RepeaterField)
  }

  /**
   * 注册表单输入控件
   * @param {string} type - 控件类型标识
   * @param {any} component - Vue 组件
   */
  register(type, component) {
    if (!type || !component) return
    this.widgets.set(type, markRaw(component))
  }

  /**
   * 获取表单控件
   * @param {string} type
   * @returns {any}
   */
  get(type) {
    return this.widgets.get(type) || TextField
  }

  /**
   * 检查是否支持某类型
   * @param {string} type
   */
  has(type) {
    return this.widgets.has(type)
  }
}

export const fieldRegistry = new FormFieldRegistry()
