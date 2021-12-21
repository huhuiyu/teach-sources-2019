<template>
  <div>
    <div>{{ title }}</div>
    <!-- 选择文件对话框 -->
    <button @click="visible = true">图片选择器</button>

    <file-manager></file-manager>

    <div class="dialog" :class="{ 'd-none': !visible }">
      <div>
        <img-chooser @file-choosed="getImg"></img-chooser>
      </div>
    </div>

    <div v-if="imgSrc">
      <img :src="imgSrc" alt="" />
    </div>
  </div>
</template>
<script>
import FileManager from '../../components/FileManager.vue'
import ImgChooser from '../../components/ImgChooser.vue'

export default {
  components: { FileManager, ImgChooser },
  name: 'AntdFile',
  data() {
    return {
      title: '文件组件演示',
      visible: false,
      imgSrc: null,
    }
  },
  methods: {
    getImg(data) {
      console.log('选中的文件：', data)
      this.visible = false
      if (data) {
        this.imgSrc = data.fid
      }
    },
  },
}
</script>
<style scoped>
img {
  max-width: 15rem;
  max-height: 15rem;
}
.dialog {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.6);
}
.dialog > div {
  background-color: #fff;
  padding: 1rem;
  border-radius: 1rem;
}

.d-none {
  display: none !important;
}
</style>
