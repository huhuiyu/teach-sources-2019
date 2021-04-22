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
  // 下载路径获取的插件封装
  Vue.prototype.$getDownloadUrl = function(fid) {
    // 下载地址的构成
    // 后端服务器地址+下载的api路径?请求参数列表
    // 多个请求参数用&分隔，tbFile.fid
    // 参数包括：tbFile.fid，request_token
    let url = server.baseUrl + '/file/download?';
    url = url + 'tbFile.fid=' + fid;
    url = url + '&request_token=' + server.getToken();
    return url;
  };
  // 上传文件ajax方法插件封装
  Vue.prototype.$sendFile = function(url, file, params, cb) {
    server.sendFile(url, file, params, cb);
  };
  // 将正则校验封装到插件
  Vue.prototype.$regValidate = function(rule, value, cb, reg, message) {
    console.log(rule);
    if (reg.test(value)) {
      cb();
    } else {
      cb(new Error(message));
    }
  };
};
export default myplugin;
