<template>
  <div>
    <div>用户首页</div>
    <div> 欢迎：{{ userinfo.username }}({{ userinfo.nickname }}) </div>
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
    queryUserInfo() {
      //查询用户登录信息
      this.$ajax('/user/queryUserInfo', {}, function(data) {
        console.log(data);
        // 判断用户登录信息是否存在
        this.userinfo = data.resultData.tbUser;
        if (data.success && this.userinfo && this.userinfo.username) {
          return;
        }
        // 没有就跳转到登录
        this.$router.push('/user/login');
      });
    }
  },
  created() {
    this.queryUserInfo();
  }
};
</script>
