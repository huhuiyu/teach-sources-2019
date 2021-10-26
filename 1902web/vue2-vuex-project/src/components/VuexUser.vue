<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ userinfo }}</div>
  </div>
</template>
<script>
export default {
  name: 'VuexUser',
  data() {
    return {
      title: '组件获取用户信息',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo
    },
  },
}
</script>
