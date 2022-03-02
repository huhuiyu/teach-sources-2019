import Qs from './qs.js';
import axios from './axios.js';
import Vue from './vue.esm.min.js';
import Ajax from './ajax.js';

let ajax = new Ajax('https://huhuiyu.top/teach-service');
let newAjax = new Ajax('https://huhuiyu.top/teach_project_service');

let app = new Vue({
  el: '#app',
  data() {
    return {
      title: '黑暗骑士的vue模块处理',
      code: '',
      email: ''
    };
  },
  created() {
    ajax.send('/', { echo: '黑暗骑士' }, (data) => {
      console.log(data);
    });
    newAjax.send(
      '/?echo=DarkKnight',
      {},
      (data) => {
        console.log('新后端的data：', data);
      },
      'get'
    );
  },
  methods: {
    sendEmailCode() {
      // 发送邮箱验证码
      newAjax.send(
        '/tool/sendEmailCode',
        {
          email: app.email
        },
        function (data) {
          alert(data.message);
        }
      );
    }
  }
});
