/**
 * Command History & Undo/Redo Manager for Visual Builder
 * 支持精确的操作栈记录、输入归并（Debounced Input Batching）与单页面维度状态管理
 */

export class CommandHistory {
  constructor(options = {}) {
    this.maxSize = options.maxSize || 40
    this.stack = []
    this.currentIndex = -1
    this.lastBatchKey = null
    this.lastBatchTime = 0
    this.batchThreshold = options.batchThreshold || 600 // 600ms 内相同 key 的改动归并为单一步进
  }

  get canUndo() {
    return this.currentIndex > 0
  }

  get canRedo() {
    return this.currentIndex < this.stack.length - 1
  }

  /**
   * 提交新的状态快照
   * @param {Object} state - 当前页面完整快照
   * @param {string} [batchKey] - 归并 key（如 'block-hero-title'），用于连续打字归并
   */
  push(state, batchKey = null) {
    const serialized = JSON.stringify(state)
    const now = Date.now()

    // 检查是否符合连续打字归并条件
    if (
      batchKey &&
      this.lastBatchKey === batchKey &&
      now - this.lastBatchTime < this.batchThreshold &&
      this.currentIndex >= 0
    ) {
      // 直接更新当前栈顶帧，避免每个字符产生一个 undo 步进
      this.stack[this.currentIndex] = serialized
      this.lastBatchTime = now
      return
    }

    // 若当前不在栈顶（此前执行过 undo），截断重做历史
    if (this.currentIndex < this.stack.length - 1) {
      this.stack = this.stack.slice(0, this.currentIndex + 1)
    }

    this.stack.push(serialized)
    if (this.stack.length > this.maxSize) {
      this.stack.shift()
    }
    this.currentIndex = this.stack.length - 1

    this.lastBatchKey = batchKey
    this.lastBatchTime = now
  }

  /**
   * 撤销一步
   * @returns {Object|null} 恢复的状态对象
   */
  undo() {
    if (!this.canUndo) return null
    this.currentIndex--
    this.lastBatchKey = null
    return JSON.parse(this.stack[this.currentIndex])
  }

  /**
   * 重做一步
   * @returns {Object|null} 恢复的状态对象
   */
  redo() {
    if (!this.canRedo) return null
    this.currentIndex++
    this.lastBatchKey = null
    return JSON.parse(this.stack[this.currentIndex])
  }

  /**
   * 清空历史栈并初始化首帧
   * @param {Object} initialState
   */
  reset(initialState) {
    this.stack = [JSON.stringify(initialState)]
    this.currentIndex = 0
    this.lastBatchKey = null
    this.lastBatchTime = 0
  }

  clear() {
    this.stack = []
    this.currentIndex = -1
    this.lastBatchKey = null
  }
}
