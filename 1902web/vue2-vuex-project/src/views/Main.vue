<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ userinfo }}</div>
  </div>
</template>
<script>
export default {
  name: 'Main',
  data() {
    return {
      title: '用户首页',
      userinfo: {},
    }
  },
  methods: {
    queryUser() {
      this.$ajax('/user/getUserLoginInfo', {}, function (data) {
        if (data.success) {
          console.log(data)
          this.userinfo = data.resultData.loginInfo
          this.$store.commit('setUserInfo', this.userinfo)
        } else {
          this.$router.push('/login')
        }
      })
    },
  },
  created() {
    this.queryUser()
  },
}
</script>
