<template>
  <div v-loading="loading">
    <div>{{ title }}</div>
    <div>
      <el-table :data="list">
        <el-table-column label="文件名称" prop="filename"></el-table-column>
        <el-table-column label="文件描述" prop="fileinfo"></el-table-column>
        <el-table-column label="文件类型" prop="contentType"></el-table-column>
        <el-table-column label="文件大小">
          <template slot-scope="scope">
            {{ scope.row.fileSize | filesize }}
          </template>
        </el-table-column>
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="download(scope.row.fid)">下载</el-button>
            <img v-if="isImage(scope.row)" style="width:5rem" :src="showImg(scope.row)" alt="" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      {{ page }}
      <br />
      {{ list }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'FileManage',
  data() {
    return {
      title: '文件上传管理',
      page: {
        pageSize: 5,
        pageNumber: 1
      },
      queryInfo: {
        fileinfo: '',
        filename: ''
      },
      list: [],
      loading: false
    };
  },
  methods: {
    isImage(file) {
      return file.contentType.substr(0, 6) == 'image/';
    },
    showImg(file) {
      return this.$download(file.fid);
    },
    download(fid) {
      console.log('要下载的文件id', fid);
      // 完整的下载地址：
      // 后端的服务器完整地址+下载api地址+get请求参数
      // get请求参数有fid和token信息
      // 地址和token信息都要去server里面拿取
      console.log('完整下载请求地址', this.$download(fid));
      window.open(this.$download(fid));
    },
    query() {
      this.loading = true;
      this.$ajax(
        '/file/query',
        {
          page: this.page,
          tbFile: this.queryInfo
        },
        function(data) {
          this.loading = false;
          if (data.success) {
            this.list = data.resultData.list;
            this.page = data.resultData.page;
            return;
          }
          this.$message.error(data.message);
        }
      );
    }
  },
  created() {
    this.query();
  }
};
</script>
