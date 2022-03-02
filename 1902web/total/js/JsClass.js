/**
 * 自定义js的class
 */
class JsClass {
  /**
   * 自定义类的构造函数
   * @param {string} url 地址信息
   * @param {json} param 任意json对象信息
   */
  constructor(url, param) {
    console.log('构造对象：', url, param);
    this.url = url;
    this.param = param;
  }

  /**
   * 自定义方法，显示json参数信息
   * @returns 返回json参数格式化字符串
   */
  toString() {
    return JSON.stringify(this.param, null, 2);
  }
}

export default JsClass;
