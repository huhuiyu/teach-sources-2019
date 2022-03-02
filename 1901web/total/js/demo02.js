import Vue from './vue.esm.min.js';
import server from './server.js';
import JsClass from './JsClass.js';
import Ajax from './ajax.js';

let ajax = new Ajax('https://huhuiyu.top/teach-service');

new Vue({
  el: '#app',
  data() {
    return {
      title: 'js模块导入'
    };
  },
  created() {
    // alert(server.url);
    console.log(server.formatDate(new Date().getTime()));
    let myclass = new JsClass('https://huhuiyu.top', { name: '黑暗骑士' });
    console.log(myclass.url);
    console.log(myclass.toString());
    
    // ajax测试
    ajax.send('/', { echo: '黑暗骑士' }, function (data) {
      console.log(data);
    });
  }
});
