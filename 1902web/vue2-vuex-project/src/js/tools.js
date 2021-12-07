import logger from './logger'
import md5 from 'spark-md5'

let tools = {}

// md5加密
tools.md5 = function (info) {
  return md5.hash(info)
}

// 格式化日期
tools.formatDate = function (value, format) {
  try {
    // 获取日期格式参数
    format = format ? format : 'yyyy-MM-dd hh:mm:ss'
    if (!isNaN(value) && !(value instanceof Date)) {
      let time = new Date()
      time.setTime(parseInt(value))
      value = time
    }
    let year = value.getFullYear() + ''
    let month = value.getMonth() + 1
    let day = value.getDate()
    let hour = value.getHours()
    let minute = value.getMinutes()
    let second = value.getSeconds()
    month = month < 10 ? '0' + month : '' + month
    day = day < 10 ? '0' + day : '' + day
    hour = hour < 10 ? '0' + hour : '' + hour
    minute = minute < 10 ? '0' + minute : '' + minute
    second = second < 10 ? '0' + second : '' + second
    format = format.replace(/yyyy/g, year)
    format = format.replace(/MM/g, month)
    format = format.replace(/dd/g, day)
    format = format.replace(/hh/g, hour)
    format = format.replace(/mm/g, minute)
    format = format.replace(/ss/g, second)
    return format
  } catch (ex) {
    logger.error(ex)
    return ''
  }
}

// 是否为手机模式
tools.isMobile = function () {
  return tools.getBrowserInfo().versions.mobile
}

// 是否为ios
tools.isIos = function () {
  return tools.getBrowserInfo().versions.ios
}
// 是否为android
tools.isAndroid = function () {
  return tools.getBrowserInfo().versions.android
}
// 是否为weixin
tools.isWx = function () {
  return tools.getBrowserInfo().versions.weixin
}

// 获取浏览器信息
tools.getBrowserInfo = function () {
  let browser = {
    versions: (function () {
      let u = navigator.userAgent
      // let app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == ' qq', //是否QQ
      }
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  }

  return browser
}

// json格式化
const styles = {
  key: 'color: red',
  string: 'color: fuchsia',
  number: 'color: green',
  boolean: 'color: maroon',
  other: 'color: maroon',
}

tools.formatJson = function (json, highlight) {
  // 缩进显示json字符串
  const result = JSON.stringify(json, undefined, 4)
  if (highlight) {
    return tools.jsonSyntaxHighlight(result)
  }
  return result
}

tools.jsonSyntaxHighlight = function (json) {
  // 格式化显示json
  // json语法高亮
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
    let style = 'number'
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        style = 'key'
      } else {
        style = 'string'
      }
    } else if (/true|false/.test(match)) {
      style = 'boolean'
    } else if (/null/.test(match)) {
      style = 'other'
    }
    return '<span style="' + styles[style] + '">' + match + '</span>'
  })
  return json
}

// 获取大类型名称
tools.getFileType = function (type) {
  let index = type.indexOf('/')
  return index > -1 ? type.substring(0, index) : type
}

// 读取图片文件为data数据
tools.readImgFile = function (file, cb) {
  if (tools.getFileType(file.type) != 'image') {
    cb('')
    return
  }
  let reader = new FileReader()
  //读取文件过程方法
  reader.onloadstart = function () {
    logger.debug('开始读取....')
  }
  reader.onprogress = function () {
    logger.debug('正在读取中....')
  }
  reader.onabort = function () {
    logger.debug('中断读取....')
    cb('')
  }
  reader.onerror = function () {
    logger.debug('读取异常....')
    cb('')
  }
  reader.onload = function (e) {
    logger.debug('成功读取....')
    cb(e.target.result)
  }
  reader.readAsDataURL(file)
}

// 打开文件功能
tools.openFile = function (cb) {
  let result = { el: null, file: null, type: '' }
  let file = document.createElement('input')
  file.setAttribute('type', 'file')
  result.el = file
  // 文件改变事件
  file.addEventListener('change', function () {
    logger.debug('文件选中变化', file.files)
    if (file.files && file.files.length == 1) {
      result.file = file.files[0]
      result.type = tools.getFileType(result.file.type)
      cb(result)
      return
    }
    cb(null)
  })
  file.addEventListener('cancel', function () {
    logger.debug('文件选中取消')
    cb(null)
  })
  file.click()
}

// 通用表单正则校验
tools.regValidator = function (rule, value, callback, reg, message) {
  console.log(rule)
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error(message))
  }
}

// 监听window的大小变化
tools.resize = function (cb) {
  window.addEventListener('resize', function () {
    cb(document.documentElement.clientWidth, document.documentElement.clientHeight)
  })
}

// 通过本地存储传递信息，一般用于无法追踪的网站
// 例如跳转到其它网站页面后再跳转回来（微信支付，跨站统一登录认证等等）
const UMID_KEY = 'huhuiyu.top.umid'

tools.setLocalUmid = function (umid) {
  sessionStorage.setItem(UMID_KEY, umid)
}

tools.getLocalUmid = function () {
  // 一般获取到之后就清理掉，也就是只要一次使用
  let umid = sessionStorage.getItem(UMID_KEY)
  sessionStorage.removeItem(UMID_KEY)
  return umid
}

export default tools
