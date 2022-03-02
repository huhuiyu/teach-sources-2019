// ajax请求的封装
import Qs from './qs.js';
import axios from './axios.js';

/**
 * ajax请求处理类
 */
class Ajax {
  /**
   * 构造ajax请求处理类
   * @param {string}} serverUrl api接口的公用根地址
   */
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  /**
   * 发送ajax请求（接受三到四个参数模式）
   * 1:后端api的接口地址
   * 2:后端请求的参数
   * 3:应答回调函数,参数是应答结果
   * 4:可选参数，请求的方式（method），不传就是post
   */
  send() {
    console.log('send的参数：', arguments);
    // 请求的完整地址
    let url = this.serverUrl + arguments[0];
    // 请求的参数数据
    let param = Qs.stringify(arguments[1], { allowDots: true });
    // 回调函数
    let cb = arguments[2];
    // method
    let method = arguments[3] ? arguments[3] : 'post';
    // 请求信息
    console.log('请求的信息：', url, param, cb, method);
    // ajax请求
    let promise = axios({
      url: url,
      method: method,
      data: param
    });
    promise
      .then((resp) => {
        // 正确的响应就回调应答的服务器数据
        cb(resp.data);
      })
      .catch((err) => {
        // 错误的响应就记录错误并回调错误结果
        console.error(err);
        cb({ success: false, message: '应答错误', code: 500 });
      });
  }
}

export default Ajax;
