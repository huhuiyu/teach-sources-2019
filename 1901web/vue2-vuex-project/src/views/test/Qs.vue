<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="info.param1" />
      <input type="text" v-model="info.param2" />
      <button @click="toPage">传递参数</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TestQs',
  data() {
    return {
      title: 'vue版本的传参',
      info: {
        param1: '',
        param2: '',
      },
    }
  },
  methods: {
    toPage() {
      this.$router.push({
        path: '/test/qsinfo',
        query: this.info,
      })
    },
  },
}
</script>
