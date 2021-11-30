<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ info }}</div>
  </div>
</template>
<script>
export default {
  name: 'TestQsInfo',
  data() {
    return {
      title: '参数获取页面',
      info: {},
    }
  },
  created() {
    // console.log(this.$route)
    this.info = this.$route.query
  },
}
</script>
