<template>
  <div>
    <div class="pd10 tc">{{ title }}</div>
    <div class="pd10">
      <van-button type="info" @click="showToast">toast</van-button>
      <van-button type="info" @click="showPopup('黑暗骑士')">popup </van-button>
    </div>
    <div>
      <van-field v-model="dialogTitle" placeholder="标题"></van-field>
      <van-field v-model="dialogInfo" placeholder="内容"></van-field>
      <van-button type="primary" @click="showDialog">显示对话框</van-button>
    </div>
    <!-- popup -->
    <van-popup v-model="show" round closeable position="left">
      <div class="popup-box">
        <div>{{ showInfo }}</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'VantPopup',
  data() {
    return {
      title: '有赞ui弹出层',
      show: false,
      showInfo: '',
      dialogTitle: '',
      dialogInfo: '',
    }
  },
  methods: {
    showDialog() {
      this.$dialog.alert({
        message: this.dialogInfo,
        title: this.dialogTitle,
      })
    },
    showPopup(info) {
      this.showInfo = info
      this.show = true
    },
    showToast() {
      this.$toast.success('一个toast消息')
    },
  },
}
</script>
<style lang="less" scoped>
.popup-box {
  height: 90vh;
  width: 60vw;
  display: flex;
  align-items: center;
  // .popup-box>div
  > div {
    width: 100%;
    text-align: center;
    // .popup-box>div:hover
    &:hover {
      color: #ff0000;
    }
  }
}
</style>
