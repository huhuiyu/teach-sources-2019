<template>
  <div>
    <div>{{ title }}</div>
    <!-- 查询功能和添加按钮 -->
    <div style="display:flex;">
      <el-input v-model="queryInfo.messageGroup" placeholder="分组信息"></el-input>
      <el-button @click="query">查询</el-button>
      <el-button @click="addVisible = true">
        <i class="iconfont">&#xe607;</i>
        添加
      </el-button>
    </div>
    <!-- 数据显示的部分 -->
    <div>
      <el-table :data="list">
        <el-table-column label="信息分组" prop="messageGroup"></el-table-column>
        <el-table-column label="关键字" prop="messageKey"></el-table-column>
        <el-table-column label="信息内容" prop="message"></el-table-column>
        <el-table-column label="操纵">
          <template slot-scope="scope">
            <el-button @click="delMessage(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加对话框 -->
    <div>
      <el-dialog :visible.sync="addVisible" :close-on-click-modal="false" @closed="query">
        <div slot="title">
          添加门户信息
        </div>
        <div>
          <el-form>
            <el-form-item>
              <el-input v-model="addInfo.messageGroup" placeholder="信息分组"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="addInfo.messageKey" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="addInfo.message" placeholder="内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="addMessage">添加</el-button>
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
export default {
  name: 'Portable',
  data() {
    return {
      title: '门户信息管理首页',
      list: [],
      page: {
        pageSize: 10,
        pageNumber: 1
      },
      queryInfo: {
        accessKey: this.$accessKey,
        messageGroup: ''
      },
      addInfo: {
        accessKey: this.$accessKey,
        messageGroup: '',
        messageKey: '',
        message: ''
      },
      addVisible: false
    };
  },
  methods: {
    delMessage(info) {
      let app = this;
      app
        .$confirm('是否删除：' + info.messageGroup + '.' + info.messageKey, '确认删除', {
          type: 'warning'
        })
        .then(function() {
          app.$ajax(
            '/portable/message/delete',
            {
              tbPortableMessage: {
                accessKey: info.accessKey,
                pmid: info.pmid
              }
            },
            function(data) {
              app.$message(data.message);
              app.query();
            }
          );
        })
        .catch(function() {});
    },
    addMessage() {
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
          this.list = data.resultData.list;
          this.page = data.resultData.page;
        }
      );
    }
  },
  created() {
    this.query();
  }
};
</script>
