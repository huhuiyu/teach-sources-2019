<template>
  <div>
    <div>用户首页</div>

    <div>
      <span> 欢迎：{{ userinfo.username }}({{ userinfo.nickname }}) </span>
      <button @click="showPwd = true">修改密码</button>
      <a href="javascript:void(0)" @click="logout">安全退出</a>
    </div>

    <!-- 修改密码的页面部分 -->
    <div v-if="showPwd">
      新密码：
      <input type="password" v-model="pwd" />
      确认密码：
      <input type="password" v-model="pwd2" />
      <button>确定</button>
      <button @click="cancelPwd">取消</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserMain',
  data() {
    return {
      userinfo: {},
      // 新密码
      pwd: '',
      // 新密码确认
      pwd2: '',
      // 是否呈现密码修改界面
      showPwd: false
    };
  },
  methods: {
    modifyPwd() {
      if (this.pwd.trim() == '') {
        alert('密码不能为空');
        return;
      }
      if (this.pwd != this.pwd2) {
        alert('密码不一致');
        return;
      }
      this.pwd = this.$md5(this.pwd);
      this.$ajax(
        '/user/modifyPwd',
        {
          'tbUser.password': this.pwd
        },
        function(data) {
          this.pwd = '';
          this.pwd2 = '';
          alert(data.message);
        }
      );
    },
    cancelPwd() {
      // 取消密码修改的显示
      this.pwd = '';
      this.pwd2 = '';
      this.showPwd = false;
    },
    logout() {
      this.$ajax('/user/logout', {}, function(data) {
        console.log(data);
        this.$router.push('/user/login');
      });
    },
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
