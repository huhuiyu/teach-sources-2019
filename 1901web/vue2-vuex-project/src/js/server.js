import axios from 'axios'

//服务器相关信息
let serverInfo = {}
// 本地存储token的key
serverInfo.serverTokenKey = 'teach-server.info.token'
// 后端服务基础地址
serverInfo.serverUrl = 'https://huhuiyu.top/teach-service'

// 本地token信息
serverInfo.saveToken = function (resp) {
  if (resp.data && resp.data.token) {
    localStorage.setItem(serverInfo.serverTokenKey, resp.data.token)
  }
}
serverInfo.loadToken = function () {
  let token = localStorage.getItem(serverInfo.serverTokenKey)
  return token ? token : ''
}

const MAX_FILE_SIZE = 2 * 1024 * 1024
const MAX_FILE_SIZE_MESSAGE = { code: 500, success: false, message: '上传文件大小不能超过2MB' }

serverInfo.empty = function () {}

serverInfo.upload = function (url, param, file, callback, thisArg) {
  if (file.size > MAX_FILE_SIZE) {
    callback.call(thisArg, MAX_FILE_SIZE_MESSAGE)
    return
  }
  url = serverInfo.serverUrl + url
  callback = callback ? callback : serverInfo.empty
  let formdata = new FormData()
  formdata.append('file', file)
  // 需要转换多级json数据为一级的方法，需要判断数据是否为json的方法
  for (let key in param) {
    formdata.append(key, param[key])
  }
  let promise = axios({
    method: 'post',
    url: url,
    data: formdata,
    headers: {
      token: serverInfo.loadToken(),
      'Content-Type': 'multipart/form-data',
    },
  })
  promise
    .then(function (resp) {
      console.log('ajax应答结果：', resp.data)
      serverInfo.saveToken(resp.data)
      callback.call(thisArg, resp.data)
    })
    .catch(function (error) {
      console.log('ajax处理发生错误：', error)
      callback.call(thisArg, { code: 500, success: false, message: '访问数据失败！', error: error })
    })
}

export default serverInfo
