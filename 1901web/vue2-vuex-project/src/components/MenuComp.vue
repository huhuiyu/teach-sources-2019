<template>
  <div>
    <div>{{ title }}</div>
    <div class="main">
      <a href="javascript:void(0)" v-for="m in menus" :key="m.page" @click="toPage(m)" v-text="m.title" :class="{ active: path == m.page }"></a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuComp',
  data() {
    return {
      title: '菜单组件',
      menus: [
        { page: '/test/menu01', title: '菜单测试一' },
        { page: '/test/menu02', title: '菜单测试二' },
      ],
      path: '',
    }
  },
  methods: {
    toPage(menu) {
      // 如果路由和当前切换页相同就要不切换
      if (this.path == menu.page) {
        return
      }
      this.$router.push(menu.page)
    },
  },
  created() {
    console.log('组件创建', this.$route.path)
    this.path = this.$route.path
  },
}
</script>
<style scoped>
.main a {
  display: inline-block;
  margin: 0.5rem 1rem;
}
.main a.active {
  color: #ff0000;
}
</style>
