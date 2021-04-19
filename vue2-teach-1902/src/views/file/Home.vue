<template>
  <div v-loading="loading">
    <div>{{ title }}</div>
    <!-- 查询表单 -->
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="queryInfo.filename" placeholder="文件名模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryInfo.fileinfo" placeholder="文件描述模糊查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="query">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="showAdd">上传</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
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
            <el-button @click="del(scope.row)">删除</el-button>
            <el-button v-if="isImage(scope.row)" @click="showImg(scope.row)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 最简单调用版本 -->
      <page :page="page" @page-change="query"></page>
      <!-- 可以定制的调用版本 -->
      <page :page="page" :layout="'prev,total,next,sizes'" :sizes="[5, 50, 100]" @page-change="query"></page>
    </div>

    <!-- 图片预览对话框 -->
    <div>
      <el-dialog title="图片预览" :visible.sync="imgDialog">
        <div>
          <img :src="imgUrl" alt="" />
        </div>
      </el-dialog>
    </div>

    <!-- 文件上传对话框 -->
    <div>
      <el-dialog :close-on-click-modal="false" @closed="query" title="文件上传" :visible.sync="addDialog">
        <div>
          <el-form>
            <el-form-item>
              <el-input v-model="addInfo.fileinfo" placeholder="文件描述信息"></el-input>
            </el-form-item>
            <el-form-item>
              <span v-if="addFile">{{ addFile.name }}</span>
              <el-button @click="openFile">浏览文件</el-button>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetAdd">重置</el-button>
              <el-button @click="upload">上传</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- <div>
      {{ page }}
      <br />
      {{ list }}
    </div> -->
  </div>
</template>
<script>
import tools from '../../js/tools';
import Page from '../../components/Page';

export default {
  name: 'FileManage',
  components: { Page },
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
      loading: false,
      // 图片预览相关
      imgDialog: false,
      imgUrl: '',
      // 上传文件相关
      addInfo: {
        fileinfo: ''
      },
      addDialog: false,
      addFile: null
    };
  },
  methods: {
    del(file) {
      let app = this;
      this.$confirm('是否删除：' + file.filename, '删除文件')
        .then(function() {
          app.loading = true;
          app.$ajax(
            '/file/delete',
            {
              'tbFile.fid': file.fid
            },
            function(data) {
              app.loading = false;
              app.$message({
                message: data.message,
                onClose: app.query
              });
            }
          );
        })
        .catch(function() {});
    },
    upload() {
      this.loading = true;
      let app = this;
      this.$sendFile(
        '/file/upload',
        this.addFile,
        {
          'tbFile.fileinfo': this.addInfo.fileinfo
        },
        function(data) {
          app.loading = false;
          app.$message(data.message);
          if (data.success) {
            app.resetAdd();
          }
        }
      );
    },
    openFile() {
      let app = this;
      tools.openFile(function(file) {
        app.addFile = file;
      });
    },
    resetAdd() {
      // 重置表单信息
      this.addInfo = {
        fileinfo: ''
      };
      this.addFile = null;
    },
    showAdd() {
      this.resetAdd();
      this.addDialog = true;
    },
    reset() {
      this.queryInfo = {
        fileinfo: '',
        filename: ''
      };
      this.page = {
        pageSize: 5,
        pageNumber: 1
      };
      this.query();
    },
    isImage(file) {
      return file.contentType.substr(0, 6) == 'image/';
    },
    showImg(file) {
      //return this.$download(file.fid);
      this.imgUrl = this.$download(file.fid);
      this.imgDialog = true;
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

<style scoped>
.el-dialog img {
  max-width: 25rem;
  height: auto;
  display: block;
}
</style>
