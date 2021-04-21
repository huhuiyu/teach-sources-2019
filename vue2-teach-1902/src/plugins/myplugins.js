import server from '../js/server';
import tools from '../js/tools';

let myplugin = {};

myplugin.install = function(Vue) {
  // ajax插件封装
  Vue.prototype.$ajax = function(url, param, callback, method) {
    server.ajax(url, param, callback, method, this);
  };
  // md5加密插件封装
  Vue.prototype.$md5 = function(info) {
    return tools.md5(info);
  };
  // 文件上传插件封装
  Vue.prototype.$sendFile = function(url, file, params, cb) {
    server.sendFile(url, file, params, cb);
  };
  // 文件下载的url获取插件封装
  Vue.prototype.$download = function(fid) {
    // 下载地址
    let url = server.baseUrl + '/file/download';
    // 请求参数
    url = url + '?tbFile.fid=' + fid + '&request_token=' + server.getToken();
    return url;
  };
  // 正则校验器插件封装
  Vue.prototype.$regValidate = function(
    rule, value, callback, reg, message) {
    console.log(rule);
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error(message));
    }
  };
};
export default myplugin;
