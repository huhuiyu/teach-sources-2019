<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="formdata.imgcode" placeholder="图片校验码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="formdata.user.username" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input type="password" v-model="formdata.user.password" placeholder="登录密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input type="password" v-model="formdata.pwd2" placeholder="确认密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="formdata.user.phone" placeholder="手机号码"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      {{ formdata }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'TestValidate',
  data() {
    return {
      title: '表单校验',
      // 表单数据
      formdata: {
        user: {
          username: '',
          password: '',
          phone: ''
        },
        imgcode: '',
        pwd2: ''
      }
    };
  }
};
</script>
