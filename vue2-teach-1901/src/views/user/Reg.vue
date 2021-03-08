<template>
  <div>
    <div>用户注册</div>
    <div>
      登录名称：
      <input type="text" v-model="tbUser.username" />
      登录密码：
      <input type="password" v-model="tbUser.password" />
      昵称：
      <input type="text" v-model="tbUser.nickname" />
      <button @click="reg">注册</button>
      <button @click="reset">重置</button>
      <a href="javascript:void(0)" @click="toLogin">返回登陆</a>
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
        nickname: '',
        password: '',
        username: ''
      },
      result: ''
    };
  },
  methods: {
    reset() {
      this.tbUser = {
        nickname: '',
        password: '',
        username: ''
      };
    },
    reg() {
      // 密码需要md5加密
      this.tbUser.password = tools.md5(this.tbUser.password);
      let app = this;
      server.ajax(
        '/user/reg',
        {
          tbUser: this.tbUser
        },
        function(data) {
          app.result = data.message;
          app.tbUser.password = '';
        }
      );
    },
    toLogin() {
      // 通过路由对象跳转页面，推荐方式，参数就是路由配置的path
      this.$router.push('/user/login');
    }
  }
};
</script>
