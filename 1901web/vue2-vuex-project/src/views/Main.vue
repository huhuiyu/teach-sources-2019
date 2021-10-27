<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ userinfo }}</div>
    <div>
      <a href="javascript:void(0)" @click="toPage('/test')">去测试页</a>
    </div>
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
    toPage(page) {
      this.$router.push(page)
    },
    queryUserInfo() {
      // 查询登录用户的信息
      this.$ajax('/user/getUserLoginInfo', {}, function (data) {
        if (data.success) {
          this.userinfo = data.resultData.loginInfo
          // 保存到vuex
          this.$store.commit('setUser', this.userinfo)
        } else {
          // 没有登录的情况
          this.$router.push('/login')
        }
      })
    },
  },
  created() {
    this.queryUserInfo()
  },
}
// 练习一：完成用户登出的效果（需要同步清除vuex中的用户信息）
// 练习1.5：完成登录用信息的显示界面
// 练习二和作业：完成用户邮箱留言的全部功能
// 演示效果请查看后端接口的演示网站
</script>

