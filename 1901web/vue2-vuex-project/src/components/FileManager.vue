<template>
  <div>
    <div>{{ title }}</div>
    <!-- 上传的部分 -->
    <div>
      <a-form layout="inline">
        <a-form-item>
          <a-input :disabled="loading" v-model="fileinfo" placeholder="文件描述"></a-input>
        </a-form-item>

        <a-form-item>
          <a-button :loading="loading" @click="openFile" type="primary">打开文件</a-button>
        </a-form-item>

        <a-form-item v-if="file && file.file"> 选中的文件：{{ file.file.name }} </a-form-item>

        <a-form-item>
          <a-button :loading="loading" @click="upload" type="primary" :disabled="!file.type">上传文件</a-button>
        </a-form-item>
      </a-form>
    </div>
    <!-- 数据显示 -->
    <div>
      {{ list[0] }}
      <a-table rowKey="fid" :pagination="page" @change="handleTableChange" :columns="cols" :dataSource="list">
        <a slot="fid" slot-scope="text, record" @click="showFid(text, record)">打开</a>
      </a-table>
    </div>
  </div>
</template>
<script>
import tools from '../js/tools'

let app

export default {
  name: 'FileManager',
  data() {
    return {
      title: '文件管理组件',
      fileinfo: '',
      file: {},
      loading: false,
      page: { pageSize: 2 },
      list: [],
      cols: [
        {
          dataIndex: 'filename',
          // key: 'fid',
          title: '文件名',
        },
        {
          dataIndex: 'contentType',
          // key: 'fid',
          title: '文件类型',
        },
        {
          dataIndex: 'fileSize',
          // key: 'fid',
          title: '文件大小',
        },
        {
          dataIndex: 'fileinfo',
          // key: 'fid',
          title: '描述',
        },
        {
          dataIndex: 'lastupdate',
          // key: 'fid',
          title: '上传时间',
        },
        {
          dataIndex: 'fid',
          title: '打开',
          scopedSlots: { customRender: 'fid' },
        },
      ],
    }
  },
  methods: {
    handleTableChange(pageinfo) {
      console.log(pageinfo)
      app.page.pageNumber = pageinfo.current
      app.query()
    },
    showFid(fid, data) {
      console.log(fid, data)
      this.$CopyText(this.$getFileUrl(fid))
      window.open(this.$getFileUrl(fid))
    },
    query() {
      this.loading = true
      this.$ajax(
        '/file/query',
        {
          page: app.page,
        },
        function (data) {
          this.loading = false
          if (data.success) {
            app.page = data.resultData.page
            app.list = data.resultData.list
            app.page.current = app.page.pageNumber
          } else {
            this.$notification.open({
              message: data.message,
            })
          }
        }
      )
    },
    openFile() {
      tools.openFile((file) => {
        console.log('选中的文件：', file)
        if (file) {
          app.file = file
        }
      })
    },
    upload() {
      this.loading = true
      this.$upload(
        '/file/upload',
        {
          'tbFile.fileinfo': app.fileinfo,
        },
        app.file.file,
        function (data) {
          this.loading = false
          console.log(data)
          if (data.success) {
            // 成功就清除文件信息
            app.file = {}
            app.fileinfo = ''
          }
          this.$notification.open({
            message: data.message,
          })
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
