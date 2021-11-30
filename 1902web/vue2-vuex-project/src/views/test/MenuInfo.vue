<template>
  <div>
    <div>{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'TestMenuInfo',
  data() {
    return {
      title: '动态组件',
    }
  },
  created() {
    console.log(this.$route.params)
  },
}
</script>
