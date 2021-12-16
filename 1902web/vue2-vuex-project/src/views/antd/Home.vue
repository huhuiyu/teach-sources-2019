<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <a-button @click="openFile" type="primary">按钮</a-button>
      <img :src="imgInfo" alt="" />

      <!-- <input type="file"> -->
    </div>
  </div>
</template>
<script>
import tools from '../../js/tools'
export default {
  name: 'Antd',
  data() {
    return {
      title: 'antd-vue',
      imgInfo: '',
    }
  },
  methods: {
    openFile() {
      let app = this
      tools.openFile((fi) => {
        console.log('获取的文件信息', fi)

        tools.readImgFile(fi.file, (data) => {
          console.log('图片信息：', data)
          if (data) {
            app.imgInfo = data
          }
        })
      })
    },
  },
}
</script>

<style scoped>
img {
  width: 15rem;
}
</style>
