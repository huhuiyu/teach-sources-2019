<template>
  <div>
    <div>{{ title }}</div>

    <div>
      <el-table :data="list">
        <el-table-column label="文件名称" prop="filename"></el-table-column>
        <el-table-column label="文件描述" prop="fileinfo"></el-table-column>
        <el-table-column label="类型" prop="contentType"></el-table-column>
        <el-table-column label="大小" prop="fileSize"></el-table-column>
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="download(scope.row.fid)">下载</el-button>
            <el-button v-if="isImage(scope.row)" @click="showImage(scope.row)">
              预览
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>{{ imgUrl }}</div>
    <!-- <div>
      {{ page }}
      <br />
      {{ list }}
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'FileManage',
  data() {
    return {
      title: '文件管理',
      page: {
        pageNumber: 1,
        pageSize: 5
      },
      queryInfo: {
        fileinfo: '',
        filename: ''
      },
      list: [],
      loading: false,
      // 预览图片地址
      imgUrl: ''
    };
  },
  methods: {
    showImage(file) {
      this.imgUrl = this.$getDownloadUrl(file.fid);
    },
    isImage(file) {
      return file.contentType.substr(0, 6) == 'image/';
    },
    download(fid) {
      console.log('下载的文件id：', fid);
      // 下载是get请求，需要后端服务器完整地址
      // 需要传递请求参数，其中包括文件的id和token
      // 除了文件id，其它信息都在ajax封装类中可以拿到
      console.log('下载的请求地址：', this.$getDownloadUrl(fid));
      window.open(this.$getDownloadUrl(fid));
    },
    query() {
      this.loading = true;
      this.$ajax(
        '/file/query',
        {
          tbFile: this.queryInfo,
          page: this.page
        },
        function(data) {
          this.loading = false;
          if (data.success) {
            this.page = data.resultData.page;
            this.list = data.resultData.list;
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
