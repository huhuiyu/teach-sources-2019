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

// 旧版本的class定义方式
function MyClass(url, data) {
  this.url = url;
  this.data = data;
}
// 定义方法
MyClass.prototype.toString = function () {};

// 新版本
class MyEs6Class {
  constructor(url, data) {
    this.url = url;
    this.data = data;
  }

  toString() {}
}

let myclass = new MyClass('abc', { name: 'df' });
let es6Class = new MyEs6Class('abc', { name: 'df' });

let obj = {};
obj.abc = function () {};

function showInfo(info) {
  console.log(info);
}

showInfo('ddd');

export default JsClass;
