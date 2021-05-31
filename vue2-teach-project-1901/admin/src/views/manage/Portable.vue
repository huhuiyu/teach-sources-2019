<template>
  <div>
    <div>{{ title }}</div>
    <!-- 查询的部分 -->
    <div>
      <el-button @click="addVisible = true">添加信息</el-button>
    </div>
    <!-- 添加的对话框 -->
    <div>
      <el-dialog top="1rem" title="添加信息" :visible.sync="addVisible" :close-on-click-modal="false" @closed="query">
        <el-form>
          <el-form-item>
            <el-input v-model="addInfo.messageGroup" placeholder="信息分组" />
          </el-form-item>

          <el-form-item>
            <el-input v-model="addInfo.messageKey" placeholder="信息关键字" />
          </el-form-item>

          <el-form-item>
            <el-select v-model="type">
              <el-option v-for="t in types" :key="t.key" :value="t.key" :label="t.info"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            {{ addInfo.message }}
            <el-input v-if="type == 'text'" v-model="addInfo.message" placeholder="信息内容" />
            <el-button v-else-if="type == 'file'" @click="fileVisible = true">
              浏览文件...
            </el-button>
            <my-editor v-else-if="type == 'editor'" @data-change="editorChange"></my-editor>
          </el-form-item>

          <el-form-item>
            <el-button @click="add" type="primary">保存</el-button>
            <el-button type="warning">重置</el-button>
            <!-- {{addInfo}} -->
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 数据显示部分 -->
    <div>
      <el-table :data="list">
        <el-table-column prop="messageGroup" label="信息分组"></el-table-column>
        <el-table-column prop="messageKey" label="信息关键字"></el-table-column>
        <el-table-column prop="message" label="信息内容"></el-table-column>
      </el-table>

      <nav>
        <page :page="page" @page-change="query"></page>
      </nav>
    </div>

    <!-- 文件浏览对话框 -->
    <div>
      <el-dialog top="1rem" :close-on-click-modal="false" :visible.sync="fileVisible" title="文件选择对话框">
        <div>
          <file-choose @file-selected="fileSelected"></file-choose>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Page from '../../components/Page';
import FileChoose from '../../components/FileChoose';
import MyEditor from '../../components/MyEditor';

export default {
  components: { Page, FileChoose, MyEditor },
  name: 'Portable',
  data() {
    return {
      title: '门户信息管理',
      fileVisible: false,
      queryInfo: {
        accessKey: this.$accessKey
      },
      page: {
        pageSize: 5,
        pageNumber: 1
      },
      list: [],
      addInfo: {
        accessKey: this.$accessKey,
        messageGroup: '',
        messageKey: '',
        message: ''
      },
      addVisible: false,
      // 信息类型选项
      types: [
        {
          key: 'text',
          info: '文本信息'
        },
        {
          key: 'file',
          info: '文件'
        },
        {
          key: 'editor',
          info: '富文本'
        }
      ],
      type: 'text'
    };
  },
  methods: {
    editorChange(info) {
      this.addInfo.message = info;
    },
    fileSelected(file) {
      this.addInfo.message = file.fid;
      this.fileVisible = false;
    },
    add() {
      this.$ajax(
        '/portable/message/add',
        {
          tbPortableMessage: this.addInfo
        },
        function(data) {
          this.$message(data.message);
        }
      );
    },
    query() {
      this.$ajax(
        '/portable/message/queryAll',
        {
          tbPortableMessage: this.queryInfo,
          page: this.page
        },
        function(data) {
          console.log(data);
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.page = data.resultData.page;
          this.list = data.resultData.list;
        }
      );
    }
  },
  created() {
    this.query();
  }
};
</script>
