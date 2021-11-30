<template>
  <div>
    <div>{{ title }}</div>
    <div class="menus">
      <a class="info" href="javascript:void(0)" v-for="m in menus" :key="m.page" @click="toPage(m)" :class="{ active: m.page == path }"> {{ m.title }} </a>
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
        { page: '/test/menu01', title: '测试菜单一' },
        { page: '/test/menu02', title: '测试菜单二' },
      ],
      path: '',
    }
  },
  methods: {
    toPage(menu) {
      // 当前页面没有必要切换
      if (menu.page == this.path) {
        return
      }
      this.$router.push(menu.page)
    },
  },
  created() {
    console.log('创建菜单组件', this.$route.path)
    this.path = this.$route.path
  },
}
</script>
<style scoped>
.menus a {
  display: inline-block;
  margin: 0.5rem 2rem;
}
.menus a.active {
  color: #ff0000;
}
.menus a.info {
  border: 1px solid #ff0000;
}
</style>
