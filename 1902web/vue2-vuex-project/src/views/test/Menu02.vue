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
  name: 'TestMenu02',
  data() {
    return {
      title: '菜单效果演示二',
    }
  },
  created() {
    console.log('menu02创建')
  },
  mounted() {
    console.log('menu02挂载')
  },
}
</script>
