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
      </a-form>
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
import tools from '../js/tools'
let app
export default {
  name: 'ImageChooser',
  data() {
    return {
      title: '图片选择器',
      fileinfo: '',
      fi: null,
      loading: false,
      list: [],
      cols: [
        { title: '文件名', dataIndex: 'filename' },
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
    openUrl(fid, data) {
      console.log(fid, data)
      console.log('文件下载地址：', this.$getFileUrl(fid))
      // 复制到剪贴板
      this.$copyText(this.$getFileUrl(fid))
      this.$emit('file-choosed', {
        data: data,
        url: this.$getFileUrl(fid),
      })
    },
    query() {
      app.loading = true
      app.$ajax(
        '/file/query',
        {
          tbFile: {
            contentType: 'image/',
          },
        },
        function (data) {
          app.loading = false
          if (data.success) {
            app.list = data.resultData.list
          } else {
            app.$notification.info({
              message: data.message,
            })
          }
        }
      )
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
</script>
