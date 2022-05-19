import Vue from 'vue'
//快速剪切文本的插件
import Clipboard from 'clipboard'

/**
 * @description: 剪切成功的message
 * @return {void}
 */
function clipboardSuccess() {
  Vue.prototype.$message({
    message: '复制成功',
    type: 'success',
    duration: 1500
  })
}
/**
 * @description: 剪切失败的message
 * @return {void}
 */
function clipboardError() {
  Vue.prototype.$message({
    message: '复制失败',
    type: 'error'
  })
}

/**
 * @description: 处理剪切的情况，根据情况返回相应的message
 * @param {String} text 剪切的文本
 * @param {Event} event 事件对象
 * @return {*}
 */
export default function handleClipboard(text, event) {
  //创建Clipboard对象
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  // 剪切成功---
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  // 剪切失败
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
