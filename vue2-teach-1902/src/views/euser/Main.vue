<template>
  <!-- 作业，完成饿了么ui版本的用户注册，完成注册登录的跳转，完成表单重置 -->
  <div v-loading="loading">
    <div class="userinfo">
      <el-dropdown split-button @command="handleMenu">
        <span>{{ userinfo.username }}({{ userinfo.nickname }})</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
          <el-dropdown-item command="exit">安全退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码的对话框 -->
    <el-dialog title="修改用户密码" :visible.sync="pwdVisible">
      <div>
        <el-form>
          <el-form-item>
            <el-input type="password" placeholder="密码" v-model="pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="确认密码" v-model="pwd2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="modifyPwd">保存</el-button>
            <el-button @click="pwdVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UserMain',
  data() {
    return {
      userinfo: {},
      loading: false,
      pwdVisible: false,
      pwd: '',
      pwd2: ''
    };
  },
  methods: {
    modifyPwd() {
      this.loading = true;
      this.pwd = this.$md5(this.pwd);
      this.$ajax(
        '/user/modifyPwd',
        {
          'tbUser.password': this.pwd
        },
        function(data) {
          this.loading = false;
          this.pwd = '';
          this.pwd2 = '';
          if (data.success) {
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
    // 下拉菜单的处理
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
  padding: 0.2rem;
  border-bottom: 1px solid #dcdcdc;
}
</style>
