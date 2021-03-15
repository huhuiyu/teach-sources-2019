<template>
  <div>
    <div>用户首页</div>
    <div>
      欢迎：{{ userinfo.username }}({{ userinfo.nickname }})
      <a href="javascript:void(0)" @click="showPwd = true">修改密码</a>
      |
      <a href="javascript:void(0)" @click="logout">安全退出</a>
    </div>

    <div v-if="showPwd">
      密码：
      <input type="password" v-model="pwd" />
      确认密码：
      <input type="password" v-model="pwd2" />
      <button @click="modifyPwd">修改密码</button>
      <button @click="closePwd">关闭</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserMain',
  data() {
    return {
      userinfo: {},
      pwd: '',
      pwd2: '',
      showPwd: false
    };
  },
  methods: {
    modifyPwd() {
      if (this.pwd.trim() == '') {
        alert('密码必须填写');
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

    closePwd() {
      this.pwd = '';
      this.pwd2 = '';
      this.showPwd = false;
    },
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
