<template>
  <div>
    <div>用户登录</div>
    <div>
      用户名：
      <input type="text" v-model="tbUser.username" />
      密码：
      <input type="password" v-model="tbUser.password" />
      图片校验码：
      <input type="text" v-model="imgcode" />
      <img :src="imgSrc" title="点击更换图片" @click="changeImg" />
      <button @click="login">登陆</button>
      <!-- 直接用路由地址跳转，不推荐 -->
      <a href="/#/user/reg">我要注册</a>
    </div>
    <div>{{ result }}</div>
  </div>
</template>
<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      imgcode: '',
      tbUser: {
        username: '',
        password: ''
      },
      result: '',
      // 图片src信息
      imgSrc: ''
    };
  },
  methods: {
    changeImg() {
      this.$ajax(
        '/tools/imageCode',
        { ts: new Date().getTime() },
        function(data) {
          this.imgSrc = data.message;
        },
        'get'
      );
    },
    login() {
      this.tbUser.password = this.$md5(this.tbUser.password);
      this.$ajax(
        '/user/login',
        {
          imgcode: this.imgcode,
          tbUser: this.tbUser
        },
        function(data) {
          this.result = data.message;
          this.tbUser.password = '';
          this.changeImg();
          // 如果登录成功路由跳转到用户首页
          if (data.success) {
            this.$router.push('/user/main');
          }
        }
      );
    }
  },
  created() {
    this.changeImg();
  }
};
</script>
