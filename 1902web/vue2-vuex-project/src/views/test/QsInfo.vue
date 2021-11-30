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
      title: 'vue查询字符串获取信息页面',
      info: {},
    }
  },
  created() {
    this.info = this.$route.query
  },
}
</script>
