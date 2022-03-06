import Vue from './vue.esm.min.js';
import server from './server.js';
import JsClass from './JsClass.js';
import Ajax from './ajax.js';
import AutoWebSocket from './AutoWebSocket.js';

let ajax = new Ajax('https://huhuiyu.top/teach-service');

let ws = new AutoWebSocket('wss://huhuiyu.top/teach_project_service/ws/chat');

new Vue({
  el: '#app',
  data() {
    return {
      title: 'js模块导入',
      chatInfo: {
        name: '黑暗骑士',
        info: ''
      },
      infos: []
    };
  },
  methods: {
    send() {
      // 发送聊天信息
      if (ws.isConnect) {
        ws.send(this.chatInfo);
        this.chatInfo.info = '';
      }
    }
  },
  created() {
    let app = this;
    // alert(server.url);
    console.log(server.formatDate(new Date().getTime()));
    let myclass = new JsClass('https://huhuiyu.top', { name: '黑暗骑士' });
    console.log(myclass.url);
    console.log(myclass.toString());

    // ajax测试
    ajax.send('/', { echo: '正版黑暗骑士' }, function (data) {
      console.log('正确请求的部分：', data);
    });

    // 错误的ajax请求测试
    // ajax.send('/dddd', { echo: '黑暗骑士' }, function (data) {
    //   console.log('错误的ajax请求测试：', data);
    // });

    // 回调处理发生错误的ajax请求测试
    // ajax.send('/', { echo: '黑暗骑士' }, function (data) {
    //   console.log('错误的ajax请求测试：', data);

    //   console.log(data.info.abc);
    // });

    // 设置websocket的监听器
    ws.addListener('open', (ev) => {
      console.log('连接已经打开', ev);
    });
    ws.addListener('close', (ev) => {
      console.log('连接已经关闭', ev);
    });

    ws.addListener('message', (ev) => {
      console.log('消息：', ev);
      // 收到服务器发送的聊天信息
      if (ev.type == 'chat') {
        app.infos = [ev.message].concat(app.infos);
      }
    });

    // 开始连接服务器
    ws.connect();

    // 新知识点set(集合元素，特征是不可以添加两个相同的元素)
    let myset = new Set();
    // 添加数据
    myset.add('黑暗骑士');
    myset.add('百特曼');
    myset.add('黑暗骑士');
    myset.add('百特曼');
    myset.add('杰伦的小迷妹');

    // each循环显示
    myset.forEach((setinfo) => {
      console.log('set的迭代循环', setinfo);
    });
  }
});
