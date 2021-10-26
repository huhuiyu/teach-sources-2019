<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ userinfo }}</div>
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      title: '用户信息测试页',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo
    },
  },
}
</script>
