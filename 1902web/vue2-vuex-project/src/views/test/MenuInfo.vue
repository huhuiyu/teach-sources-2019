<template>
  <div>
    <div>{{ title }}</div>
    <h1>菜单的部分-{{ comp }}--{{ compInfo }}</h1>
    <div>
      <div v-for="m in menus" :key="m.page" :class="{ active: m.page == compInfo }" @click="toPage(m)">
        {{ m.title }}
      </div>
    </div>

    <h1>组件切换的部分</h1>

    <div v-if="compInfo == 'comp01'">
      <menu-comp-01></menu-comp-01>
    </div>
    <div v-else-if="compInfo == 'comp02'">
      <menu-comp-02></menu-comp-02>
    </div>
    <div v-else> 没有指定的组件 </div>
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
      title: '动态组件',
      baseUrl: '/test/menus/',
      comp: '',
      menus: [
        {
          page: 'comp01',
          title: '组件一',
        },
        {
          page: 'comp02',
          title: '组件二',
        },
        {
          page: 'nothing',
          title: '不存在的组件',
        },
      ],
    }
  },
  methods: {
    toPage(menu) {
      // 不用重复点击同一个菜单
      if (menu.page == this.compInfo) {
        return
      }
      this.$router.push(this.baseUrl + menu.page)
    },
  },
  computed: {
    compInfo() {
      // 路由变化因为效率问题，不会重新创建本实例
      // 所以需要computed方法监听路由的参数变化
      return this.$route.params.comp
    },
  },
  created() {
    console.log(this.$route.params)
    this.comp = this.$route.params.comp
    console.log('MenuInfo创建')
  },
}
</script>

<style scoped>
.active {
  color: #ff0000;
}
</style>
