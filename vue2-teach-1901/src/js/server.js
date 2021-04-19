// 导入qs和axios库
import qs from 'qs';
import axios from 'axios';

let server = {};
// 后端接口文档地址
// https://huhuiyu.top/teach-demo-service/docs.html
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

// 上传文件大小限制
const MAX_FILE_SIZE = 1.5 * 1024 * 1024;
// ajax文件上传，url，后端api地址，file，上传的文件对象
// params，附加的请求参数（json格式），cb，回调
server.sendFile = function(url, file, params, cb) {
  console.log('文件信息：', file);
  // 必须要有文件
  if (file == null || !file) {
    cb({
      code: 500,
      success: false,
      message: '必须选择文件'
    });
    return;
  }
  // 文件大小限制
  if (file.size > MAX_FILE_SIZE) {
    cb({
      code: 500,
      success: false,
      message: '文件大小超过限制'
    });
    return;
  }
  url = server.baseUrl + url;
  // 上传的数据格式必须是FormData
  let formdata = new FormData();
  // 数据key还是要和后端一致
  formdata.append('file', file);
  // 通过迭代处理附加的json参数，不支持二级的json
  // 示例：let jsono ={name:'abc',test:123};
  // jsono['name']和jsono.name等效
  // 针对json的foreach循环，key取到的就是json的字段名称
  // 一次获取一个，也就是key第一次是name，第二次是test
  // 而params[key]就是key对应的值
  for (let key in params) {
    formdata.append(key, params[key]);
  }
  // ajax请求
  let promise = axios({
    url: url,
    data: formdata,
    method: 'post',
    headers: {
      token: server.getToken(),
      // 必须指定请求信息类型为multipart/form-data
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
        success: false,
        message: '上传发生错误'
      });
    });
};

export default server;
