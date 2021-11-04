<template>
  <div>
    <div class="pd10 tc">{{ title }}</div>
    <div>
      <van-button type="primary" @click="showToast">Toast</van-button>
      <van-button type="info" @click="showPopup('黑暗骑士')">popup</van-button>
    </div>
    <van-popup v-model="show" closeable position="right">
      <div class="popup-box">
        <div>
          {{ popupInfo }}
        </div>
      </div>
    </van-popup>
    <!-- dialog -->
    <div>
      <van-field v-model="dialogTitle" placeholder="标题"></van-field>
      <van-field v-model="dialogInfo" placeholder="内容"></van-field>
      <van-button @click="showDialog">对话框一</van-button>
      <van-button @click="showConfirm">对话框二</van-button>
      <van-button @click="showCustom">对话框三</van-button>
    </div>
    <van-dialog title="定制对话框" v-model="visiable" :before-close="closeCustom" :show-cancel-button="true" confirm-button-text="保存">
      <div>一个定制版本的对话框</div>
    </van-dialog>
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
      dialogTitle: '',
      dialogInfo: '',
      visiable: false,
    }
  },
  methods: {
    closeCustom(action, done) {
      // action是点击的按钮，done是关闭函数
      console.log(action, done)
      if ('cancel' === action) {
        done()
      } else if ('confirm' === action) {
        setTimeout(done, 2000)
      }
      let a = 1
      let b = '1'
      let c = '1'
      // ==就是java eq ===就是java里面==
      console.log(a == b, a === b, b === c)
    },
    showCustom() {
      this.visiable = true
    },
    showConfirm() {
      // 箭头函数
      this.$dialog
        .confirm({
          title: this.dialogTitle,
          message: this.dialogInfo,
        })
        .then(() => {
          console.log('点击确定：', this)
        })
        .catch(function () {
          console.log('点击取消：', this)
        })
    },
    showDialog() {
      this.$dialog.alert({
        title: this.dialogTitle,
        message: this.dialogInfo,
      })
    },
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
.popup-box {
  width: 60vw;
  height: 90vh;
  display: flex;
  align-items: center;
  // .popup-box > div
  > div {
    width: 100%;
    text-align: center;
    // .popup-box > div:hover
    &:hover {
      color: #ff0000;
      cursor: pointer;
    }
  }
}
</style>
