<template>
  <div>
    <div>{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'MessageFlash',
  data() {
    return {
      title: '跨站回跳页面',
    }
  },
  mounted() {
    // window表示当前页面所在窗口
    // top表示顶级浏览器窗口
    // 什么时候下不相同？
    console.log('flash页面挂载完毕', window, top, window == top)
    if (window != top) {
      // 给顶级窗口（一般是跨域）发送消息
      top.postMessage('loaded', '*')
    }
  },
}
</script>
