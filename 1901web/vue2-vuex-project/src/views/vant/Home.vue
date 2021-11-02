<template>
  <div>
    <div class="pd10 tc">{{ title }}</div>
    <div class="pd10">
      <van-button type="primary">一个按钮</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VantHome',
  data() {
    return {
      title: '有赞ui-手机版',
    }
  },
}
</script>
