<template>
  <div>
    <div>{{ title }}</div>
    <div> {{ paramUmid }}==={{ queryUmid }}==={{ storeUmid }} </div>
  </div>
</template>
<script>
import tools from '../../js/tools'

export default {
  name: 'MessageDetail',
  data() {
    return {
      title: '留言详情',
      paramUmid: -1,
      queryUmid: -1,
      storeUmid: -1,
    }
  },
  created() {
    this.paramUmid = this.$route.params.umid
    this.queryUmid = this.$route.query.umid
    this.storeUmid = tools.getLocalUmid()
  },
}
</script>
