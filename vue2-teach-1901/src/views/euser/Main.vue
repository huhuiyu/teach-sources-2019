<template>
  <!--
    作业：用element-ui完成注册页面
    完成登录界面的重填功能
    完成登录和注册相互跳转功能
  -->
  <div v-loading="loading">
    <div class="userinfo">
      <el-dropdown split-button @command="handleMenu">
        <span> {{ userinfo.username }}({{ userinfo.nickname }})</span>
        <el-dropdown-menu>
          <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改登录密码" :visible.sync="pwdVisible" :close-on-click-modal="false">
      <div>
        <el-form>
          <el-form-item>
            <el-input type="password" v-model="pwd" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="pwd2" placeholder="确认密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="modifyPwd">修改密码</el-button>
            <el-button @click="pwdVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'EleUserMain',
  data() {
    return {
      userinfo: {},
      loading: false,
      pwd: '',
      pwd2: '',
      pwdVisible: false
    };
  },
  methods: {
    modifyPwd() {
      if (this.pwd.trim() == '') {
        // this.$message.error('密码必须填写');
        this.$message({ message: '密码必须填写', type: 'error' });
        return;
      }
      if (this.pwd != this.pwd2) {
        this.$message({ message: '密码不一致', type: 'error' });
        return;
      }
      this.loading = true;
      this.pwd = this.$md5(this.pwd);
      this.$ajax(
        '/user/modifyPwd',
        {
          'tbUser.password': this.pwd
        },
        function(data) {
          this.loading = false;
          if (data.success) {
            this.pwd = this.pwd2 = '';
            this.$message(data.message);
          } else {
            this.$message.error(data.message);
          }
        }
      );
    },
    logout() {
      this.loading = true;
      this.$ajax('/user/logout', {}, function() {
        this.loading = false;
        this.$router.push('/euser/login');
      });
    },
    handleMenu(command) {
      console.log(command);
      if (command == 'exit') {
        this.logout();
      } else if (command == 'pwd') {
        this.pwdVisible = true;
      }
    },
    queryUserInfo() {
      this.loading = true;
      this.$ajax('/user/queryUserInfo', {}, function(data) {
        this.loading = false;
        // 用户不存在的情况
        if (!data.resultData.tbUser || !data.resultData.tbUser.username) {
          this.$router.push('/euser/login');
          return;
        }
        this.userinfo = data.resultData.tbUser;
      });
    }
  },
  created() {
    this.queryUserInfo();
  }
};
</script>
<style scoped>
.userinfo {
  display: flex;
  justify-content: flex-end;
  padding: 0.3rem;
  border-bottom: 1px solid #dcdcdc;
}
</style>
