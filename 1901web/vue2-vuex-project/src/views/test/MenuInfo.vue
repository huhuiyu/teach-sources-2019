<template>
  <div>
    <div>{{ title }}--{{ comp }}--{{ compInfo }}</div>
    <!-- 菜单部分 -->
    <div>
      <div v-for="m in menus" :key="m.page" @click="toPage(m)">
        {{ m.title }}
      </div>
    </div>
    <!-- 动态导入组件部分 -->
    <div>
      <menu-comp-01></menu-comp-01>
    </div>
    <div>
      <menu-comp-02></menu-comp-02>
    </div>
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
      this.$router.push(menu.page)
    },
  },
  computed: {
    compInfo() {
      // this.comp = this.$route.params.comp
      return this.$route.params.comp
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
