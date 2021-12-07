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
      title: '预加载目标页',
    }
  },
  mounted() {
    // window表示页面所在窗口
    // top表示浏览器顶级窗口
    // 什么时候两者不相等？页面通过iframe加载的时候
    // top始终是指向顶级的，而iframe的window是src加载页面独立的
    console.log('flash页面挂载完成', window, top, window == top)
    if (window != top) {
      console.log('不在顶级窗口中，启动预加载')
      // 跨域向上级窗口推送消息
      // 通过延迟模拟真实加载的缓慢效果
      setTimeout(() => {
        top.postMessage('loaded', '*')
      }, 5000)
    }
  },
}
</script>
