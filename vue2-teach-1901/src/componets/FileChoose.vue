<template>
  <div>
    <!-- 查询表单 -->
    <div>
      <el-form :inline="true">
        <!-- <el-form-item>
          <el-input v-model="queryInfo.filename" placeholder="文件名模糊查询"></el-input>
        </el-form-item> -->
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
        <!-- <el-table-column label="文件编号" prop="fid"></el-table-column> -->
        <!-- <el-table-column label="文件名称" prop="filename"></el-table-column> -->
        <el-table-column label="文件描述" prop="fileinfo"></el-table-column>
        <el-table-column label="类型/预览">
          <template slot-scope="scope">
            <img style="width:3rem" v-if="isImage(scope.row)" :src="scope.row.fid | fileurl" />
            <span v-else>
              {{ scope.row.contentType }}
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="大小" prop="fileSize"></el-table-column> -->
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate('MM-dd hh:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="selectFile(scope.row)">选择</el-button>
            <!-- <el-button v-if="isImage(scope.row)">
              预览
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <page :page="page" @page-change="query"></page>
    </div>
    <!-- 添加对话框 -->
    <div>
      <el-dialog :append-to-body="true" title="文件上传" :close-on-click-modal="false" @closed="query" :visible.sync="addDialog">
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
import tools from '../js/tools';
import Page from '../componets/Page';

export default {
  components: { Page },
  name: 'FileChoose',
  data() {
    return {
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
    selectFile(file) {
      this.$emit('file-selected', file);
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
    isImage(file) {
      return file.contentType.substr(0, 6) == 'image/';
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
