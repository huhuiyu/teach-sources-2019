<template>
  <div>
    <div>用户首页</div>
    <div>
      欢迎：{{ userinfo.username }}({{ userinfo.nickname }})
      <a href="javascript:void(0)" @click="logout">安全退出</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserMain',
  data() {
    return {
      userinfo: {}
    };
  },
  methods: {
    logout() {
      // 安全退出其实就是告诉后端服务，用户已经下线
      this.$ajax('/user/logout', {}, function(data) {
        console.log(data.message);
        this.$router.push('/user/login');
      });
    },
    queryUserInfo() {
      // 获取登录的用户信息
      this.$ajax('/user/queryUserInfo', {}, function(data) {
        // 用户登录信息存在的判断
        if (data.resultData.tbUser && data.resultData.tbUser.username) {
          this.userinfo = data.resultData.tbUser;
        } else {
          // 没有登录就跳转登录页面
          this.$router.push('/user/login');
        }
      });
    }
  },
  created() {
    this.queryUserInfo();
  }
};
</script>
