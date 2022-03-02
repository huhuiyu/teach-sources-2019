/**
 * 自定义class
 */
class JsClass {
  /**
   * 一个构造函数演示
   * @param {string} url 服务器地址
   * @param {json} param json配置参数
   */
  constructor(url, param) {
    this.url = url;
    this.param = param;
    console.log('构造信息：', this.url, this.param);
  }
  /**
   * 转换成字符串
   * @returns 本类的字符串格式
   */
  toString() {
    return JSON.stringify(this.param);
  }
}

export default JsClass;
