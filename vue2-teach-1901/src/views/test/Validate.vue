<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <!-- 
        :model指定表单校验的数据对象
        ref属性是标识表单对象（简单的说就是命名）
        :rules指定校验规则对象（data中定义）
      -->
      <el-form :model="formdata" ref="myform" :rules="rules" :inline="true">
        <!-- prop指定要校验的字段名称 -->
        <el-form-item prop="imgcode">
          <el-input v-model="formdata.imgcode" placeholder="图片校验码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="formdata.user.username" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input type="password" v-model="formdata.user.password" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input type="password" v-model="formdata.pwd2" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formdata.user.phone" placeholder="手机号码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>{{ formdata }}</div>
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
        pwd2: '',
        imgcode: ''
      },
      rules: {
        // 单一校验规格是一个json，多校验需要数组格式
        // 校验的错误信息都是message指定，
        //    如果不给会有一个默认的错误提示信息
        // required: true 表示该字段必须填写
        // len:数值 表示字段的长度必须是指定的数值大小
        imgcode: [
          {
            required: true,
            message: '图片校验码必须填写'
          },
          {
            len: 5,
            message: '图片校验码长度是5'
          }
        ]
      }
    };
  },
  methods: {
    reset() {
      // 通过this.$refs.名称(也就是对应的ref属性的值)
      // 可以获取到指定的组件
      console.log(this.$refs.myform);
      // 重置表单状态到默认状态
      this.$refs.myform.resetFields();
    }
  }
};
</script>
