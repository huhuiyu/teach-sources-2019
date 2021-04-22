<template>
  <div class="login-form" v-loading="loading">
    <el-card class="box-card">
      <div slot="header">用户登录</div>
      <div>
        <el-form :model="formdata" :rules="rules" ref="myform">
          <el-form-item prop="tbUser.username">
            <el-input v-model="formdata.tbUser.username" placeholder="登录名">
              <i slot="suffix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="tbUser.password">
            <el-input type="password" show-password v-model="formdata.tbUser.password" placeholder="密码">
              <i slot="prefix" class="iconfont">&#xe600;</i>
            </el-input>
          </el-form-item>

          <el-form-item prop="imgcode">
            <el-input v-model="formdata.imgcode" placeholder="图片校验码"></el-input>
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
let app = null;
export default {
  name: 'EleUserLogin',
  data() {
    return {
      loading: false,
      imgLoading: false,
      imgSrc: '',
      formdata: {
        imgcode: '',
        tbUser: {
          username: '',
          password: ''
        }
      },
      rules: {
        imgcode: [
          {
            required: true,
            message: '图片校验码必须填写'
          },
          {
            len: 5,
            message: '图片校验码长度是5个'
          }
        ],
        'tbUser.username': [
          {
            required: true,
            message: '用户名必须填写'
          },
          {
            min: 3,
            max: 15,
            message: '用户长度是3-15'
          }
        ],
        'tbUser.password': {
          validator: function(rule, value, cb) {
            app.$regValidate(rule, value, cb, /^[A-Za-z0-9]{3,14}$/, '密码是长度为3-14的字符数字和_-');
          }
        }
      }
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.formdata.tbUser.password = this.$md5(this.formdata.tbUser.password);
      this.$ajax(
        '/user/login',
        {
          imgcode: this.formdata.imgcode,
          tbUser: this.formdata.tbUser
        },
        function(data) {
          this.loading = false;
          this.formdata.tbUser.password = '';
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
    app = this;
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
