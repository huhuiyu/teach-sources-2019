import qs from 'qs'
import axios from 'axios'

import logger from '../js/logger'
import SparkMD5 from 'spark-md5'
import tools from '../js/tools'
import serverInfo from '../js/server'

//服务器相关信息
let myplugin = {}

// 空函数
let empty = function () {}

myplugin.install = function (Vue) {
  // 将正则校验封装到插件
  Vue.prototype.$regValidate = function (rule, value, cb, reg, message) {
    console.log(rule)
    if (reg.test(value)) {
      cb()
    } else {
      cb(new Error(message))
    }
  }
  // md5加密
  Vue.prototype.$md5 = function (info) {
    return SparkMD5.hash(info)
  }
  // 日志对象
  Vue.prototype.$logger = logger
  // 服务器信息对象
  Vue.prototype.$serverInfo = serverInfo
  // 封装的几个要素
  // 第一个：为什么需要封装？简单的说就是代码重用
  //    重复的代码不要反复的写，修改起来会变得复杂
  // 第二个：封装的构思，重复的部分抽出成封装代码，
  //    无法获取的信息通过参数或者方法传入
  // 简单的封装例子：
  // 服务器返回的时间信息都是时间戳，页面需要显示正常的时间格式
  // 所以将时间戳转换格式字符串统一封装到了filter解决
  // 

  // ajax请求
  Vue.prototype.$ajax = function () {
    let instance = this
    // 动态参数的版本
    // 如果是一个参数的，参数格式是配置的json
    // {url:'',param:{},cb:function,method:'post'}
    // 如果是三个参数，参数分别就是url,param,cb
    // 如果是四个参数，参数分别就是url,param,cb,method
    let args = arguments
    instance.$logger.debug('ajax请求参数：', args)
    // 将多种不同参数模式都转换成json配置参数
    let config = {}
    if (args.length == 1) {
      config = args[0]
      config.method = config.method ? config.method : 'post'
      config.param = config.param ? config.param : {}
    } else if (args.length == 3) {
      config.method = 'post'
      config.url = args[0]
      config.param = args[1]
      config.cb = args[2]
    } else if (args.length == 4) {
      config.method = args[3]
      config.url = args[0]
      config.param = args[1]
      config.cb = args[2]
    }
    // 补全url
    config.url = config.url ? serverInfo.serverUrl + config.url : serverInfo.serverUrl + ''
    // 回调参数处理
    config.cb = config.cb ? config.cb : empty
    //后端参数处理
    config.param = config.param ? config.param : {}
    // method默认是post
    config.method = config.method ? config.method : 'post'
    config.param.ts = new Date().getTime()
    // 转换参数
    config.param = qs.stringify(config.param, { allowDots: true })
    instance.$logger.debug('ajax请求最终参数：', config)
    // 发起请求
    axios({
      method: config.method,
      url: config.url,
      data: config.param,
      headers: {
        token: serverInfo.loadToken(),
      },
    })
      .then(function (resp) {
        instance.$logger.debug('ajax请求结果：', resp)
        // 保存token信息
        serverInfo.saveToken(resp)
        config.cb.call(instance, resp.data)
      })
      .catch(function (error) {
        instance.$logger.debug('ajax请求错误：', error)
        config.cb.call(instance, { code: 500, success: false, message: '访问数据失败！', error: error })
      })
  }

  // 文件上传委托
  Vue.prototype.$upload = function (url, param, file, cb) {
    let thisArg = this
    serverInfo.upload(url, param, file, cb, thisArg)
  }

  // 获取文件下载地址url
  Vue.prototype.$getFileUrl = function (fid) {
    let url = serverInfo.serverUrl + '/file/download?tbFile.fid=' + fid
    return url
  }

  // 打开文件
  Vue.prototype.$openFile = function (cb) {
    let instance = this
    tools.openFile(cb, instance)
  }
  // 获取文件信息
  Vue.prototype.$getFileInfo = tools.getFileInfo
  // 获取oss文件地址
  Vue.prototype.$getOssUrl = tools.getOssUrl
  // 复制文件的方法
  Vue.prototype.$CopyText = tools.CopyText
}

export default myplugin
