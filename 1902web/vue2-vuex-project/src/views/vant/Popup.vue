<template>
  <div>
    <div class="pd10 tc">{{ title }}</div>
    <div>
      <van-button type="primary" @click="showToast">Toast</van-button>
      <van-button type="info" @click="showPopup('黑暗骑士')">popup</van-button>
    </div>
    <van-popup v-model="show" position="right">
      <div>
        {{ popupInfo }}
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'VantPopup',
  data() {
    return {
      title: '有赞ui-弹出层',
      show: false,
      popupInfo: '',
    }
  },
  methods: {
    showPopup(info) {
      this.popupInfo = info
      this.show = true
    },
    showToast() {
      this.$toast.success('toast弹出信息')
    },
  },
}
</script>

<style lang="less" scoped>
</style>
