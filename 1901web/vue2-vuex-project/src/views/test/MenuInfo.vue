<template>
  <div>
    <div>{{ title }}--{{ comp }}--{{ compInfo }}</div>
    <!-- 菜单部分 -->
    <div>
      <div v-for="m in menus" :key="m.page" @click="toPage(m)" :class="{ active: m.page == compInfo }">
        {{ m.title }}
      </div>
    </div>
    <!-- 动态导入组件部分 -->
    <div v-if="compInfo == '/test/menus/comp01'">
      <menu-comp-01></menu-comp-01>
    </div>
    <div v-else-if="compInfo == '/test/menus/comp02'">
      <menu-comp-02></menu-comp-02>
    </div>
    <div v-else> 没有对应组件！ </div>
  </div>
</template>
<script>
import MenuComp01 from '../../components/MenuComp01.vue'
import MenuComp02 from '../../components/MenuComp02.vue'
export default {
  components: { MenuComp01, MenuComp02 },
  name: 'TestMenuInfo',
  data() {
    return {
      title: '菜单组件效果',
      menus: [
        { page: '/test/menus/comp01', title: '组件一' },
        { page: '/test/menus/comp02', title: '组件二' },
        { page: '/test/menus/abc', title: '不存在的组件' },
      ],
      comp: '',
    }
  },
  methods: {
    toPage(menu) {
      if (menu.page == this.compInfo) {
        return
      }
      this.$router.push(menu.page)
    },
  },
  computed: {
    compInfo() {
      // this.comp = this.$route.params.comp
      // 动态路由的模板是/test/menus/:comp
      // :comp就是this.$route.params.comp
      // 连接起来才是完整page（路径信息）
      return '/test/menus/' + this.$route.params.comp
    },
  },
  created() {
    // 路由是/test/menus/:comp
    // 地址是/test/menus/abc
    // this.$route.params：{comp:'abc'}
    // /:abc/:id
    // /hhhh/1
    // {abc:'hhhh',id:'1'}
    console.log('动态路由信息：', this.$route.params)
    this.comp = this.$route.params.comp
  },
}
</script>
<style scoped>
.active {
  color: red;
}
</style>
