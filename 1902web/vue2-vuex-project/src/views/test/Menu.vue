<template>
  <div>
    <div>{{ title }}</div>
    <div class="menus">
      <a class="info" href="javascript:void(0)" v-for="m in menus" :key="m.page" @click="changeMenu(m)" :class="{ active: m.page == currentMenu.page }"> {{ m.title }}---{{ m.page == currentMenu.page }} </a>
    </div>
    <div> 点击的菜单：{{ currentMenu }} </div>
  </div>
</template>
<script>
export default {
  name: 'TestMenus',
  data() {
    return {
      title: '菜单效果演示',
      menus: [
        { page: '/test/qs', title: '查询字符串' },
        { page: '/vant', title: '有赞首页' },
        { page: '/ajax', title: 'ajax' },
        { page: '/test', title: '测试首页' },
      ],
      // 记住点击的菜单
      currentMenu: {},
    }
  },
  methods: {
    changeMenu(menu) {
      console.log('点击的菜单', menu)
      this.currentMenu = menu
    },
  },
  created() {
    // 给定默认值
    this.currentMenu = this.menus[0]
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
