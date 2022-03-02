import Qs from './qs.js';
import axios from './axios.js';

/**
 * ajax请求服务器对象
 */
class Server {
  /**
   * 构造ajax请求服务器对象
   * @param {string} serverUrl 服务器基础url地址
   */
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  /**
   * 发送ajax请求
   * 必须是3-4个参数
   * 1:请求的api地址
   * 2:请求的参数（json）
   * 3:回调函数
   * 4:可选参数method，不传入就是post
   */
  send() {
    console.log('方法的参数信息：', this.serverUrl, arguments);
    // 分析参数
    let url = this.serverUrl + arguments[0];
    let param = Qs.stringify(arguments[1], { allowDots: true });
    let cb = arguments[2];
    let method = arguments.length == 4 ? arguments[3] : 'post';
    console.log('ajax参数信息：', url, param, cb, method);

    // ajax请求
    let promise = axios({
      url: url,
      data: param,
      method: method
    });
    promise.then().catch();
  }
}

export default Server;
