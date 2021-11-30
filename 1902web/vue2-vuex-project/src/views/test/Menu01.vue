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
      title: '菜单效果演示一',
    }
  },
  created() {
    console.log('menu01创建')
  },
  mounted() {
    console.log('menu01挂载')
  },
}
</script>
