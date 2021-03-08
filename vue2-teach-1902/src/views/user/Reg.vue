<template>
  <div>
    用户注册
    <div>
      用户名：<input type="text" v-model="tbUser.username" /> 密码：<input type="password" v-model="tbUser.password" /> 昵称：<input type="text" v-model="tbUser.nickname" />
      <button @click="reg">注册</button>
      <button @click="reset">重填</button>
    </div>
    <div>{{ tbUser }}</div>
    <div>{{ result }}</div>
  </div>
</template>

<script>
import server from '../../js/server';
import tools from '../../js/tools';

export default {
  name: 'UserReg',
  data() {
    return {
      tbUser: {
        username: '',
        password: '',
        nickname: ''
      },
      result: ''
    };
  },
  methods: {
    reset() {
      this.tbUser = {
        username: '',
        password: '',
        nickname: ''
      };
    },
    reg() {
      let app = this;
      // 处理密码需要md5加密
      this.tbUser.password = tools.md5(this.tbUser.password);
      server.ajax(
        '/user/reg',
        {
          tbUser: this.tbUser
        },
        function(data) {
          console.log(data);
          app.result = data.message;
          app.tbUser.password = '';
        }
      );
    }
  }
};
</script>
