import server from '../js/server'
import logger from '../js/logger'
import AutoConnetWebSocket from '../js/websocket'
import tools from '../js/tools'

let myplugin = {}
const wsMap = new Map()

myplugin.install = function (Vue) {
  // 复制文本的方法
  Vue.prototype.$copyText = function (str) {
    let input = document.createElement('input')
    input.readOnly = 'readonly'
    input.value = str
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, input.value.length)
    document.execCommand('Copy')
    document.body.removeChild(input)
  }

  // 获取上传的文件地址
  Vue.prototype.$getFileUrl = function (fid) {
    return server.serverUrl + '/file/download?tbFile.fid=' + fid
  }
  // ajax插件封装
  Vue.prototype.$ajax = function (url, param, callback, method) {
    server.app = this
    server.ajax(url, param, callback, method)
  }
  // ajax上传文件封装
  Vue.prototype.$upload = function (url, param, file, callback) {
    server.app = this
    server.upload(url, param, file, callback)
  }
  // ajax相关服务信息
  Vue.prototype.$serverInfo = server.info()
  // 日志对象
  Vue.prototype.$logger = logger
  // 获取websocket对象
  Vue.prototype.$getWebSocket = function (app = '/ws/echo') {
    return new WebSocket(server.webSocketUrl + app)
  }
  // 获取自动重连的WebSocket对象
  Vue.prototype.$getAutoConnetWs = function (app) {
    if (!app) {
      return null
    }
    if (wsMap.has(app)) {
      return wsMap.get(app)
    }
    let ws = new AutoConnetWebSocket(app)
    wsMap.set(app, ws)
    return ws
  }
  // md5加密
  Vue.prototype.$md5 = tools.md5
}
export default myplugin
