// 导入qs和axios库
import qs from 'qs';
import axios from 'axios';

let server = {};

// 后台接口文档地址 https://huhuiyu.top/teach-demo-service/docs.html
// 后台服务基础地址
server.baseUrl = 'https://huhuiyu.top/teach-demo-service';
// 服务token参数名称
server.tokenKey = 'token';
// 本地保存token参数名称
server.localTokeyKey = 'localToken';

// 获取本地保存的token
server.getToken = function() {
  // 读取本地token信息
  let localTokey = localStorage.getItem(server.localTokeyKey);
  localTokey = localTokey ? localTokey : '';
  return localTokey;
};

// 本地保存token
server.saveToken = function(data) {
  if (data && data.token) {
    localStorage.setItem(server.localTokeyKey, data.token);
  }
};

// 封装ajax请求
// url：后端api地址，param：发送给后端请求的参数（json格式），通过qs转换成查询字符串格式
// cb：ajax请求回调处理函数，method：请求方式（默认为post）,thisArg：回调函数的this作用域对象，默认为当前对象
server.ajax = function(url, param, cb, method, thisArg) {
  // 处理this参数，默认为当前对象
  thisArg = thisArg ? thisArg : this;
  // 转换成查询字符串格式, allowDots: true参数表示将多级json转换成.连接格式，例如{a:{b:'cc'}}转换为a.b=cc
  param = qs.stringify(param, { allowDots: true });
  // 默认是post
  method = method ? method : 'post';
  // 完整后台服务请求地址
  url = server.baseUrl + url;
  let promise = axios({
    method: method,
    url: url,
    data: param,
    // token信息通过header发送
    headers: {
      token: server.getToken()
    }
  });
  promise
    .then(function(resp) {
      server.saveToken(resp.data);
      // 正确应答结果回调处理
      cb.call(thisArg, resp.data);
    })
    .catch(function(error) {
      // 错误应答结果回调处理
      cb.call(thisArg, { code: 500, success: false, message: '访问数据失败！', error: error });
    });
};

const MAX_FILE_SIZE = 2 * 1024 * 1024;
// 上传文件的ajax请求,url:后端地址，file，上传的文件对象
// params：附件的请求参数，cb，应答的回调函数
server.sendFile = function(url, file, params, cb) {
  // 限制文件上传大小
  if (file.size > MAX_FILE_SIZE) {
    cb({ message: '文件大小超过限制', code: 500, success: false });
    return;
  }
  // 完整地址
  url = server.baseUrl + url;
  // 数据必须是FormData传递
  let formdata = new FormData();
  formdata.append('file', file);
  // 附加的json参数通过迭代添加
  // 如果需要支持多级字段，需要对json属性做递归处理
  for (let key in params) {
    formdata.append(key, params[key]);
  }
  // { name:'abc',info:1 },key就是name,info
  // json对象[字段名称]等同于json对象.字段名称
  // 文件ajax请求
  let promise = axios({
    // 必须是post请求
    method: 'POST',
    url: url,
    // 数据为FormData
    data: formdata,
    headers: {
      // 必要的token参数
      token: server.getToken(),
      // 必要内容类型
      'Content-Type': 'multipart/form-data'
    }
  });
  promise
    .then(function(resp) {
      server.saveToken(resp.data);
      cb(resp.data);
    })
    .catch(function(error) {
      console.error('上传发生错误', error);
      cb({
        code: 500,
        message: '上传发生错误',
        success: false,
        error: error
      });
    });
};

export default server;
