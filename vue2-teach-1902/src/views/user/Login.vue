<template>
  <div>
    用户登录
    <div>
      用户名：
      <input type="text" v-model="tbUser.username" />
      密码：
      <input type="password" v-model="tbUser.password" />
      <button @click="login">登录</button>
    </div>
    <div>{{ result }}</div>
  </div>
</template>
<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      tbUser: {
        username: '',
        password: ''
      },
      result: ''
    };
  },
  methods: {
    login() {
      // 密码加密
      this.tbUser.password = this.$md5(this.tbUser.password);
      this.$ajax('/user/login', { tbUser: this.tbUser }, function(data) {
        this.result = data.message;
      });
    }
  }
};
</script>
