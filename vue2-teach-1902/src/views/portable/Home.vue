<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <el-button @click="addvisible = true">添加</el-button>
    </div>
    <div>
      <el-dialog :append-to-body="true" title="添加信息" :visible.sync="addvisible" @closed="query" :close-on-click-modal="false">
        <div>
          <el-form>
            <el-form-item>
              <el-input v-model="addInfo.messageGroup" placeholder="请输入信息组" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="addInfo.messageKey" placeholder="请输入信息关键字" />
            </el-form-item>

            <el-form-item>
              <el-select v-model="infoMode">
                <el-option v-for="m in infoModes" :key="m.type" :value="m.type" :label="m.info"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-if="infoMode == 'text'" v-model="addInfo.message" placeholder="请输入信息" />
              <el-button v-else-if="infoMode == 'file'" @click="chooseVisible = true">浏览文件</el-button>
              <my-editor v-else-if="infoMode == 'editor'" @data-change="editorChange"></my-editor>
            </el-form-item>

            <el-form-item>
              <el-button @click="add" type="primary">保存</el-button>
              <el-button type="warning">重置</el-button>
              <!-- {{ addInfo }} -->
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table :data="list">
        <el-table-column label="信息分组" prop="messageGroup"></el-table-column>
        <el-table-column label="信息关键词" prop="messageKey"></el-table-column>
        <el-table-column label="信息内容" prop="message"></el-table-column>
      </el-table>
      <nav>
        <page :page="page" @page-change="query"></page>
      </nav>
    </div>

    <el-dialog top="1rem" title="文件选择" :visible.sync="chooseVisible" :close-on-click-modal="false">
      <file-choose @file-selected="fileSelected"></file-choose>
    </el-dialog>
  </div>
</template>
<script>
import FileChoose from '../../components/FileChoose';
import Page from '../../components/Page';
import MyEditor from '../../components/MyEditor';

export default {
  components: { Page, FileChoose, MyEditor },
  name: 'Portable',
  data() {
    return {
      title: '门户信息管理',
      chooseVisible: false,
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      list: [],
      queryInfo: {
        accessKey: this.$accessKey
        // messageGroup: ''
      },
      addInfo: {
        accessKey: this.$accessKey,
        messageGroup: '',
        messageKey: '',
        message: ''
      },
      addvisible: false,
      infoModes: [
        {
          type: 'text',
          info: '纯文本'
        },
        {
          type: 'file',
          info: '文件引用'
        },
        {
          type: 'editor',
          info: '富文本'
        }
      ],
      infoMode: 'text'
    };
  },
  methods: {
    editorChange(info) {
      this.addInfo.message = info;
    },
    fileSelected(file) {
      this.addInfo.message = file.fid;
      this.chooseVisible = false;
    },
    resetAdd() {
      this.addInfo = {
        accessKey: this.$accessKey,
        messageGroup: '',
        messageKey: '',
        message: ''
      };
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

<style scoped>
.mycell {
  text-overflow: ellipsis;
}
</style>
