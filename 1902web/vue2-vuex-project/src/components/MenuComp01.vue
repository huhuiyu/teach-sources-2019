<template>
  <div>
    <div>{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'MenuComp01',
  data() {
    return {
      title: '菜单动态组件1',
    }
  },
  created() {
    console.log('MenuComp01创建')
  },
}
</script>
