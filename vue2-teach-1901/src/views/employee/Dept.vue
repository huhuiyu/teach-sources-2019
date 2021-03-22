<template>
  <div>
    <div>部门信息管理</div>
    <!-- 添加表单 -->
    <div class="add-form" v-loading="addLoading">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="addInfo.deptName" placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="addInfo.deptInfo" placeholder="请输入部门描述"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="add" type="success">添加</el-button>
          <el-button @click="query" v-loading="loading">刷新</el-button>
        </el-form-item>
      </el-form>
      <!-- {{ addInfo }} -->
    </div>
    <!-- 数据显示和分页 -->
    <div v-loading="loading">
      <el-table :data="list" stripe>
        <el-table-column label="部门名称" prop="deptName"></el-table-column>
        <el-table-column label="部门信息" prop="deptInfo"></el-table-column>

        <el-table-column label="最后修改时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="showDel(scope.row)">删除</el-button>
            <el-button type="info" @click="showModify(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <nav class="page">
        <el-pagination :total="page.total" :page-size.sync="page.pageSize" :current-page.sync="page.pageNumber" :page-sizes="[2, 5, 10]" layout="prev,pager,sizes,next,total" @size-change="query" @current-change="query"></el-pagination>
      </nav>
    </div>
    <!-- 修改的对话框 -->
    <div>
      <el-dialog title="修改信息" :close-on-click-modal="false" :visible.sync="modifyVisible" @closed="query">
        <div>
          <el-form>
            <el-form-item>
              <el-input v-model="modifyInfo.deptName" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="modifyInfo.deptInfo" placeholder="描述"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="modifyVisible = false">取消</el-button>
              <el-button type="primary" @click="modify">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dept',
  data() {
    return {
      loading: false,
      page: {
        pageNumber: 1,
        pageSize: 5
      },
      list: [],
      addInfo: {},
      addLoading: false,
      modifyInfo: {},
      modifyVisible: false
    };
  },
  methods: {
    modify() {
      this.loading = true;
      this.$ajax(
        '/dept/update',
        {
          tbDept: this.modifyInfo
        },
        function(data) {
          this.loading = false;
          this.$message(data.message);
        }
      );
    },
    showModify(info) {
      // 修改的值对象应该是副本，因为vue试图模型是同步的
      this.modifyInfo = JSON.parse(JSON.stringify(info));
      this.modifyVisible = true;
    },
    showDel(info) {
      let app = this;
      this.$confirm('是否删除：' + info.deptName, '删除信息', {
        type: 'warning',
        confirmButtonText: '删除'
      })
        .then(function() {
          // 删除动作
          app.loading = false;
          app.$ajax(
            '/dept/delete',
            {
              'tbDept.deptId': info.deptId
            },
            function(data) {
              app.$message({
                message: data.message,
                onClose: app.query
              });
            }
          );
        })
        .catch(function() {});
    },
    add() {
      // 这里应该是修改成局部loading效果
      this.addLoading = true;
      this.$ajax(
        '/dept/add',
        {
          tbDept: this.addInfo
        },
        function(data) {
          this.addLoading = false;
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.addInfo = {};
          this.$message({
            showClose: true,
            message: data.message,
            onClose: this.query
          });
          // this.query();
        }
      );
    },
    query() {
      this.loading = true;
      this.$ajax(
        '/dept/query',
        {
          page: this.page
        },
        function(data) {
          this.loading = false;
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

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 0.2rem;
}
.add-form {
  display: flex;
  justify-content: flex-end;
  padding: 0.2rem;
}
</style>
