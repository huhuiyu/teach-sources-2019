<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="title" />
      <a href="/message/q02">q02</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MessageQ01',
  data() {
    return {
      title: '生命周期',
    }
  },
  // created是vue实例创建成功就触发了，所以this可以正常使用
  // mounted是vue页面已经加载完成，所以要对页面元素操作要在这个之后
  beforeCreate() {
    console.log('beforeCreate====>')
  },
  created() {
    console.log('created====>')
  },
  beforeMount() {
    console.log('beforeMount====>')
  },
  mounted() {
    console.log('mounted====>')
  },
  beforeUpdate() {
    console.log('beforeUpdate====>')
  },
  updated() {
    console.log('updated====>')
  },
  beforeDestroy() {
    console.log('beforeDestroy====>')
  },
  destroyed() {
    console.log('destroyed====>')
  },
}
</script>
