import JsClass from './JsClass.js';
import server from './server.js';
import Vue from './vue.esm.min.js';

new Vue({
  el: '#app',
  data() {
    return {
      title: '模块化vue引用',
      JsClassInfo: ''
    };
  },
  created() {
    console.log('导入对象信息:', server.url);
  },
  methods: {
    showJsClass() {
      // 通过构造函数创建对象实例
      let jc = new JsClass('https://huhuiyu.top', {
        username: '黑暗骑士',
        phone: '15080604020',
        ts: new Date().getTime()
      });
      // 通过对象方法获取信息
      let info = jc.toString();
      console.log('调用方法的结果：', info);
      this.JsClassInfo = info;
    }
  }
});
