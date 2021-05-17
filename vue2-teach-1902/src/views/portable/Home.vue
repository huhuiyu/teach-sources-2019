<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <el-button @click="addvisible = true">添加</el-button>
    </div>
    <div>
      <el-dialog title="添加信息" :visible.sync="addvisible" @closed="query" :close-on-click-modal="false">
        <div>
          <el-form>
            <el-form-item>
              <el-input v-model="addInfo.messageGroup" placeholder="请输入信息组" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="addInfo.messageKey" placeholder="请输入信息关键字" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="addInfo.message" placeholder="请输入信息" />
            </el-form-item>

            <el-form-item>
              <el-button @click="add" type="primary">保存</el-button>
              <el-button type="warning">重置</el-button>
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
  </div>
</template>
<script>
import Page from '../../components/Page';

export default {
  components: { Page },
  name: 'Portable',
  data() {
    return {
      title: '门户信息管理',
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
      addvisible: false
    };
  },
  methods: {
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
