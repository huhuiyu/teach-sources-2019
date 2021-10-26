<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="tbAdmin.username" placeholder="用户名" />
      <input type="password" v-model="tbAdmin.password" placeholder="密码" />
      <button @click="login">登录</button>
      <!-- user user-pwd -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      title: '模板页',
      tbAdmin: {},
    }
  },
  methods: {
    login() {
      this.tbAdmin.password = this.$md5(this.tbAdmin.password)
      this.$ajax(
        '/user/login',
        {
          tbAdmin: this.tbAdmin,
        },
        function (data) {
          if (data.success) {
            console.log('成功的信息', data)
            this.$router.push('/main')
          } else {
            this.tbAdmin.password = ''
            alert(data.message)
          }
        }
      )
    },
  },
}
</script>
