<template>
  <div class="login-form">
    <el-card class="box-card" v-loading="loading">
      <div slot="header">
        用户登录
      </div>
      <div>
        <el-form>
          <el-form-item>
            <el-input placeholder="请输入登录用户名" v-model="tbUser.username">
              <i slot="suffix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input type="password" show-password placeholder="请输入登录密码" v-model="tbUser.password">
              <i slot="suffix" class="el-input__icon iconfont">
                &#xe600;
              </i>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input placeholder="图片校验码" v-model="imgcode"></el-input>
          </el-form-item>

          <el-form-item v-loading="imgloading">
            <img :src="imgSrc" @click="getImgCode" />
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
  name: 'UserLogin',
  data() {
    return {
      imgcode: '',
      imgSrc: '',
      tbUser: {
        username: '',
        password: ''
      },
      loading: false,
      imgloading: false
    };
  },
  methods: {
    login() {
      if (this.tbUser.username.trim() == '') {
        this.$message.error('用户名必须填写！');
        return;
      }
      this.tbUser.password = this.$md5(this.tbUser.password);
      this.loading = true;
      this.$ajax(
        '/user/login',
        {
          imgcode: this.imgcode,
          tbUser: this.tbUser
        },
        function(data) {
          this.loading = false;
          if (data.success) {
            this.$router.push('/main');
          } else {
            this.tbUser.password = '';
            this.getImgCode();
            this.$message({
              message: data.message,
              type: 'error',
              showClose: true
            });
          }
        }
      );
    },
    getImgCode() {
      this.imgloading = true;
      this.$ajax(
        '/tools/imageCode',
        {},
        function(data) {
          this.imgloading = false;
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
<style scoped>
.login-form {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
