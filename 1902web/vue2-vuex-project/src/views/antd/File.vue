<template>
  <div>
    <div>{{ title }}</div>
    <!-- 文件上传表单 -->
    <div>
      <a-form layout="inline">
        <a-form-item>
          <a-input type="text" v-model="fileinfo" placeholder="描述" />
        </a-form-item>

        <a-form-item>
          <a-button :loading="loading" @click="openFile" type="primary">浏览文件...</a-button>
        </a-form-item>

        <a-form-item>
          <a-button :loading="loading" @click="upload" :disabled="!fi" type="danger">上传</a-button>
        </a-form-item>

        <a-form-item v-if="fi && fi.file">
          {{ fi.file.name }}
        </a-form-item>

        <a-form-item>
          <a-button type="danger" @click="visible = true">图片选择器</a-button>
        </a-form-item>

        <!-- 文件上传bug：越权访问，描述必填 -->
      </a-form>
    </div>

    <div class="divImageChooser" :class="{ 'd-flex': visible, 'd-none': !visible }">
      <image-chooser @file-choosed="imgInfo"></image-chooser>
    </div>

    <!-- 文件列表 -->
    <div>
      <a-table :columns="cols" rowKey="fid" :dataSource="list">
        <a-button slot="fid" type="primary" slot-scope="fid, record" @click="openUrl(fid, record)">获取地址</a-button>
      </a-table>
    </div>
  </div>
</template>
<script>
import ImageChooser from '../../components/ImageChooser.vue'
import tools from '../../js/tools'
let app

export default {
  components: { ImageChooser },
  name: 'AntdFile',
  data() {
    return {
      fileinfo: '',
      title: '文件管理',
      // 选中的文件信息
      fi: null,
      loading: false,
      visible: false,
      list: [],
      cols: [
        { title: '文件名', dataIndex: 'filename' },
        { title: '文件类型', dataIndex: 'contentType' },
        { title: '文件大小', dataIndex: 'fileSize' },
        { title: '描述', dataIndex: 'fileinfo' },
        {
          title: '操作',
          dataIndex: 'fid',
          slots: { fid: 'deleteAndUpdate' },
          scopedSlots: { customRender: 'fid' },
        },
      ],
    }
  },
  methods: {
    imgInfo(img) {
      console.log('图片组件选中：', img)
      this.visible = false
    },
    openUrl(fid, data) {
      console.log(fid, data)
      console.log('文件下载地址：', this.$getFileUrl(fid))
      // 复制到剪贴板
      this.$copyText(this.$getFileUrl(fid))
      // 下载文件
      // window.open(this.$getFileUrl(fid))
    },
    query() {
      app.loading = true
      app.$ajax('/file/query', {}, function (data) {
        app.loading = false
        if (data.success) {
          app.list = data.resultData.list
        } else {
          app.$notification.info({
            message: data.message,
          })
        }
      })
    },
    openFile() {
      tools.openFile((fi) => {
        app.fi = fi
      })
    },
    upload() {
      app.loading = true
      this.$upload(
        '/file/upload',
        {
          'tbFile.fileinfo': app.fileinfo,
        },
        app.fi.file,
        function (data) {
          app.loading = false
          if (data.success) {
            app.fi = null
            app.fileinfo = ''
            app.$notification.info({
              message: data.message,
            })
          } else {
            app.$notification.error({
              message: data.message,
            })
          }
        }
      )
    },
  },
  created() {
    app = this
    app.query()
  },
}
// app-admin admin
</script>

<style scoped>
.divImageChooser {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.divImageChooser > div {
  background-color: #fff;
  padding: 1rem;
  border-radius: 1rem;
}
.d-flex {
  display: flex !important;
}
.d-none {
  display: none !important;
}
</style>
