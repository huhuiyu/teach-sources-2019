<template>
  <div>
    用户登录
    <div>
      用户名：
      <input type="text" v-model="tbUser.username" />
      密码：
      <input type="password" v-model="tbUser.password" />
      图片校验码：
      <input type="text" v-model="imgcode" />
      <img :src="imgSrc" @click="getImgCode" title="点击更换" />
      <button @click="login">登录</button>
      <!-- 使用链接方式跳转，强烈不推荐 -->
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
      tbUser: {
        username: '',
        password: ''
      },
      imgcode: '',
      imgSrc: '',
      result: ''
    };
  },
  methods: {
    login() {
      // 密码加密
      this.tbUser.password = this.$md5(this.tbUser.password);
      this.$ajax(
        '/user/login',
        {
          tbUser: this.tbUser,
          imgcode: this.imgcode
        },
        function(data) {
          this.getImgCode();
          this.tbUser.password = '';
          this.result = data.message;
          if (data.success) {
            // 登录成功就跳转首页
            this.$router.push('/user/main');
          }
        }
      );
    },
    getImgCode() {
      // 获取图片校验码
      this.$ajax(
        '/tools/imageCode',
        {},
        function(data) {
          this.imgSrc = data.message;
        },
        'get'
      );
    }
  },
  created() {
    this.getImgCode();
  }
};
</script>
