<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <!-- 
        :model指定表单校验的对象
        :rules指定校验规则对象
        ref给组件命名，可以通过this.$refs.名称来访问
      -->
      <el-form :inline="true" :model="formdata" ref="myform" :rules="rules">
        <!-- prop是指定要校验的字段 -->
        <el-form-item prop="imgcode">
          <el-input v-model="formdata.imgcode" placeholder="图片校验码"></el-input>
        </el-form-item>

        <el-form-item prop="user.username">
          <el-input v-model="formdata.user.username" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item prop="user.password">
          <el-input type="password" v-model="formdata.user.password" placeholder="登录密码"></el-input>
        </el-form-item>

        <el-form-item prop="pwd2">
          <el-input type="password" v-model="formdata.pwd2" placeholder="确认密码"></el-input>
        </el-form-item>

        <el-form-item prop="user.phone">
          <el-input v-model="formdata.user.phone" placeholder="手机号码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="reset">重填</el-button>
          <el-button @click="ok">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      {{ formdata }}
    </div>
  </div>
</template>
<script>
// 统一的this对象处理
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
        imgcode: '',
        pwd2: ''
      },
      // 表单校验规则
      rules: {
        // 校验的字段：校验规则对象,也可以是一组
        // 校验规则对象的message是校验失败的提示信息
        // required表示必须填写
        // len是内容的长度约束数值
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
            message: '用户名必须是6-16个字符'
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
            message: '密码必须是8-16个字符'
          }
        ],
        // 确认密码校验
        pwd2: {
          message: '密码不一致',
          validator: function(rule, value, cb) {
            console.log('校验对象：', rule);
            if (value == '') {
              cb(new Error('没有填写确认密码'));
            } else if (value != app.formdata.user.password) {
              cb(new Error('密码不一致'));
            } else {
              cb();
            }
          }
        }, // 手机号码验证
        'user.phone': {
          validator: function(rule, value, callback) {
            // 插件封装版本的校验
            // app.$regValidate(rule, value, callback, /^1[3456789]\d{9}$/, '手机号码不正确');
            console.log(rule);
            // js的正则对象是定义在/中间/
            // ^行开始标识，$行结束标识
            // 单独的字符表示必须是该字符
            // \d表示是数字
            // {}是量词，里面填写数量
            // 单一数字表示固定数量
            // {10,}表示10个或者以上
            // {10,16}表示10-16个
            // [abc]表示字符枚举
            let regPhone = /^1[3456789]\d{9}$/;
            if (regPhone.test(value)) {
              callback();
            } else {
              callback(new Error('手机格式不合法'));
            }
          }
        }
      }
    };
  },
  methods: {
    reset() {
      // 重置表单信息（包括校验状态）
      // this.$refs是所有命名组件的集合
      // resetFields是el-form组件特有方法
      this.$refs.myform.resetFields();
    },
    ok() {
      this.$refs['myform'].validate(function(result) {
        console.log('表单校验结果：', result);
        // 表单校验的结果是真假
        // 如果为真就可以发起后端请求了
      });
    }
  },
  created() {
    // vue实例创建完毕是确定app指向
    app = this;
  }
};
</script>
