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
          <el-button @click="showAdd">上传</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div>
      <el-table :data="list">
        <el-table-column label="文件名称" prop="filename"></el-table-column>
        <el-table-column label="文件描述" prop="fileinfo"></el-table-column>
        <el-table-column label="文件类型" prop="contentType">
          <template slot-scope="scope">
            <span v-if="isImage(scope.row)">
              <img :src="scope.row.fid | fileurl" alt="" />
            </span>
            <span v-else>
              {{ scope.row.contentType }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate('MM-dd hh:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="selecFile(scope.row)">选择文件</el-button>
            <!-- <el-button v-if="isImage(scope.row)" @click="showImg(scope.row)">预览</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <page :page="page" :layout="'prev,total,next,sizes'" :sizes="[5, 50, 100]" @page-change="query"></page>
    </div>
    <!-- 文件上传对话框 -->
    <div>
      <el-dialog :append-to-body="true" :close-on-click-modal="false" @closed="query" title="文件上传" :visible.sync="addDialog">
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
  </div>
</template>
<script>
import tools from '../js/tools';
import Page from '../components/Page';

export default {
  name: 'FileChoose',
  components: { Page },
  data() {
    return {
      page: {
        pageSize: 5,
        pageNumber: 1
      },
      queryInfo: {
        fileinfo: '',
        filename: '',
        contentType: ''
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
    selecFile(file) {
      this.$emit('file-selected', file);
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
img {
  width: 3rem;
}
</style>
