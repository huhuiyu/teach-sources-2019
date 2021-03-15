<template>
  <div class="login-form" v-loading="loading">
    <el-card class="box-card">
      <div slot="header">用户登录</div>
      <div>
        <el-form>
          <el-form-item>
            <el-input v-model="tbUser.username" placeholder="登录名">
              <i slot="suffix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input type="password" show-password v-model="tbUser.password" placeholder="密码">
              <i slot="prefix" class="iconfont">&#xe600;</i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="imgcode" placeholder="图片校验码"></el-input>
          </el-form-item>

          <el-form-item v-loading="imgLoading">
            <img :src="imgSrc" alt="" @click="loadImgCode" />
            <a href="javascript:void(0)" @click="loadImgCode">点击更换</a>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="danger">重填</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'EleUserLogin',
  data() {
    return {
      loading: false,
      imgLoading: false,
      imgSrc: '',
      imgcode: '',
      tbUser: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.tbUser.password = this.$md5(this.tbUser.password);
      this.$ajax(
        '/user/login',
        {
          imgcode: this.imgcode,
          tbUser: this.tbUser
        },
        function(data) {
          this.loading = false;
          this.tbUser.password = '';
          if (data.success) {
            this.$router.push('/euser/main');
          } else {
            this.loadImgCode();
            this.$message({
              message: data.message,
              type: 'error',
              showClose: true
            });
          }
        }
      );
    },
    loadImgCode() {
      this.imgLoading = true;
      this.$ajax(
        '/tools/imageCode',
        {},
        function(data) {
          this.imgLoading = false;
          this.imgSrc = data.message;
        },
        'get'
      );
    }
  },
  created() {
    this.loadImgCode();
  }
};
</script>
<style scoped>
.login-form {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
