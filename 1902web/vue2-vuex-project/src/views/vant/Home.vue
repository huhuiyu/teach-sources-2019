<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <van-button type="info">按钮</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VantHome',
  data() {
    return {
      title: '有赞ui演示-手机版',
    }
  },
}
</script>
