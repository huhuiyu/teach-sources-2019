<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="md5" />
      md5:{{ md5info }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data() {
    return {
      title: '测试页',
      md5: '',
    }
  },
  computed: {
    md5info() {
      return this.$md5(this.md5)
    },
  },
}
</script>
