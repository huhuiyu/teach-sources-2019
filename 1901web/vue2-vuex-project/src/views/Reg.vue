<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="tbAdmin.username" placeholder="姓名" />
      <input type="text" v-model="tbAdmin.password" placeholder="密码" />
      <input type="text" v-model="tbAdmin.nickname" placeholder="昵称" />
      <button @click="reg">注册</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Reg',
  data() {
    return {
      title: '用户注册',
      tbAdmin: {},
    }
  },
  methods: {
    reg() {
      this.tbAdmin.password = this.$md5(this.tbAdmin.password)
      this.$ajax(
        '/user/reg',
        {
          tbAdmin: this.tbAdmin,
        },
        function (data) {
          alert(data.message)
        }
      )
    },
  },
}
</script>
