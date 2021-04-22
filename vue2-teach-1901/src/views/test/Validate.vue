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

        <el-form-item prop="user.username">
          <el-input v-model="formdata.user.username" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item prop="user.password">
          <el-input type="password" v-model="formdata.user.password" placeholder="密码"></el-input>
        </el-form-item>

        <el-form-item prop="pwd2">
          <el-input type="password" v-model="formdata.pwd2" placeholder="确认密码"></el-input>
        </el-form-item>

        <el-form-item prop="user.phone">
          <el-input v-model="formdata.user.phone" placeholder="手机号码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button @click="ok">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>{{ formdata }}</div>
  </div>
</template>
<script>
// 定义vue实例指向对象app
let app = null;

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
        ],
        // 用户名校验
        'user.username': [
          {
            required: true,
            message: '用户名必须填写'
          },
          {
            min: 6,
            max: 16,
            message: '用户名长度必须是6-16'
          }
        ],
        // 密码校验
        'user.password': [
          {
            required: true,
            message: '密码必须填写'
          },
          {
            min: 8,
            max: 16,
            message: '密码长度必须是8-16'
          }
        ],
        // 确认密码校验，需要和密码字段，只能自定义校验
        pwd2: {
          // 自定义校验器
          validator: function(rule, value, cb) {
            console.log(rule);
            // 没有输入值的情况
            // 校验失败，回调函数传入Error对象即可
            // 校验通过，直接无参回调函数
            if (!value || value.trim() == '') {
              cb(new Error('请输入确认密码'));
            } else if (value != app.formdata.user.password) {
              cb(new Error('密码不一致'));
            } else {
              cb();
            }
          }
        },
        // 电话号码校验
        'user.phone': {
          validator: function(rule, value, callback) {
            // 封装的正则校验
            app.$regValidate(rule, value, callback, /^1[3456789]\d{9}$/, '电话号码格式不正确');
            // console.log(rule);
            // // js的正则是界定在两个//中间
            // // 表达式规则和Java基本规则一样
            // // 正则对象的test方法就是校验规则是否匹配
            // let regPhone = /^1[3456789]\d{9}$/;
            // if (regPhone.test(value)) {
            //   callback();
            // } else {
            //   callback(new Error('电话号码格式不正确'));
            // }
          }
        }
      }
    };
  },
  methods: {
    ok() {
      // 获取表单校验状态
      this.$refs['myform'].validate(function(result) {
        console.log('表单校验的结果：', result);
        app.$message('表单校验的结果：' + result);
        // 如果result为真才发起后端接口的请求
      });
    },
    reset() {
      // 通过this.$refs.名称(也就是对应的ref属性的值)
      // 可以获取到指定的组件
      console.log(this.$refs.myform);
      // 重置表单状态到默认状态
      this.$refs.myform.resetFields();
    }
  },
  created() {
    // 最佳的初始化app对象的地方
    app = this;
  }
};
</script>
