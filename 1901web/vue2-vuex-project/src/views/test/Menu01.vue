<template>
  <div>
    <menu-comp></menu-comp>
    <div>{{ title }}</div>
  </div>
</template>
<script>
import MenuComp from '../../components/MenuComp.vue'
export default {
  components: { MenuComp },
  name: 'TestMenu01',
  data() {
    return {
      title: '菜单页面一',
    }
  },
  created() {
    console.log('菜单测试页面一')
  },
}
</script>
