<template>
  <div>
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
          <el-input v-model="queryInfo.contentType" placeholder="文件类型模糊查询"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="query">查询</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="toAdd">上传</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
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
            <el-button @click="del(scope.row)">删除</el-button>
            <el-button v-if="isImage(scope.row)" @click="showImage(scope.row)">
              预览
            </el-button>
            <el-button @click="showFileUrl(scope.row.fid)">
              显示文件地址
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <page :page="page" @page-change="query"></page>
    </div>
    <!-- 图片预览对话框 -->
    <div>
      <el-dialog title="图片预览" :visible.sync="imgDialog">
        <div>
          <img :src="imgUrl" alt="" />
        </div>
      </el-dialog>
    </div>
    <!-- 添加对话框 -->
    <div>
      <el-dialog title="文件上传" :close-on-click-modal="false" @closed="query" :visible.sync="addDialog">
        <div>
          <el-form>
            <el-form-item>
              <el-input v-model="addInfo.fileinfo" placeholder="文件描述"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="openFile">选择文件...</el-button>
              <span v-if="file">{{ file.name }}</span>
            </el-form-item>

            <el-form-item>
              <el-button @click="resetAdd">重置</el-button>
              <el-button @click="upload">上传</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Page from '../../componets/Page';
import tools from '../../js/tools';

export default {
  name: 'FileManage',
  components: { Page },
  data() {
    return {
      title: '文件管理',
      page: {
        pageNumber: 1,
        pageSize: 5
      },
      queryInfo: {
        fileinfo: '',
        filename: '',
        contentType: ''
      },
      list: [],
      loading: false,
      // 预览图片地址
      imgUrl: '',
      imgDialog: false,
      // 添加相关
      file: null,
      addInfo: {
        fileinfo: ''
      },
      addDialog: false
    };
  },
  methods: {
    showFileUrl(fid) {
      let app = this;
      app.$message(app.$getDownloadUrl(fid));
    },
    del(file) {
      let app = this;
      app
        .$confirm('是否删除文件：' + file.filename, '删除文件')
        .then(function() {
          app.$ajax(
            '/file/delete',
            {
              'tbFile.fid': file.fid
            },
            function(data) {
              app.$message({
                message: data.message,
                onClose: app.query,
                showClose: true
              });
            }
          );
        })
        .catch(function() {});
    },
    openFile() {
      let app = this;
      tools.openFile(function(file) {
        app.file = file;
      });
    },
    upload() {
      let app = this;
      app.$sendFile(
        '/file/upload',
        app.file,
        {
          'tbFile.fileinfo': this.addInfo.fileinfo
        },
        function(data) {
          app.$message(data.message);
          if (data.success) {
            app.resetAdd();
          }
        }
      );
    },
    toAdd() {
      this.resetAdd();
      this.addDialog = true;
    },
    resetAdd() {
      this.file = null;
      this.addInfo = {
        fileinfo: ''
      };
    },
    reset() {
      this.page = {
        pageNumber: 1,
        pageSize: 5
      };
      this.queryInfo = {
        fileinfo: '',
        filename: ''
      };
      this.query();
    },
    showImage(file) {
      this.imgUrl = this.$getDownloadUrl(file.fid);
      this.imgDialog = true;
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
<style scoped>
/* 每个饿了么ui的组件都套用了同名的class */
.el-dialog img {
  display: block;
  width: 100%;
  height: auto;
}
</style>
