<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="info.id" placeholder="id" />
      <input type="text" v-model="info.nickname" placeholder="nickname" />
      <button @click="qsinfo">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TestQs',
  data() {
    return {
      title: 'vue跨页面传递参数',
      info: {
        id: '',
        nickname: '',
      },
    }
  },
  methods: {
    qsinfo() {
      // vue传递页面值（get方式）
      this.$router.push({
        path: '/test/qsinfo',
        query: this.info,
      })
    },
  },
}
</script>
