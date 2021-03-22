<template>
  <div>
    <div class="text-center pd10">部门信息管理</div>
    <!-- 添加的表单 -->
    <div class="add-form">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="addInfo.deptName" placeholder="部门名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="addInfo.deptInfo" placeholder="部门信息"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="add">添加</el-button>
          <el-button @click="query" v-loading="loading">刷新</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格和分页 -->
    <div v-loading="loading">
      <div>
        <el-table :data="list" stripe>
          <el-table-column label="部门编号" prop="deptId"></el-table-column>
          <el-table-column label="部门名称" prop="deptName"></el-table-column>
          <el-table-column label="部门信息" prop="deptInfo"></el-table-column>

          <el-table-column label="信息最后修改时间">
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
      </div>
      <nav class="page">
        <el-pagination :total="page.total" :page-size.sync="page.pageSize" :current-page.sync="page.pageNumber" @current-change="query"></el-pagination>
      </nav>
    </div>
    <!-- 修改的对话框 -->
    <div>
      <el-dialog title="信息修改" :visible.sync="modifyVisible" @closed="query">
        <div>
          {{ modifyInfo }}
          <el-form>
            <el-form-item>
              <el-input v-model="modifyInfo.deptName" placeholder="部门名称必须填写"></el-input>
            </el-form-item>

            <el-form-item>
              <el-input v-model="modifyInfo.deptInfo" placeholder="部门信息必须填写"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="modifyVisible = false">取消</el-button>
              <el-button @click="modify">保存</el-button>
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
      modifyVisible: false,
      modifyInfo: {},
      page: {
        pageNumber: 1,
        pageSize: 5
      },
      list: [],
      loading: false,
      addInfo: {
        deptName: '',
        deptInfo: ''
      },
      delInfo: {}
    };
  },
  methods: {
    modify() {
      // 这里应该loading修改界面！！！！！
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
      // vue的model变量自动同步，所以修改应该是副本变量
      this.modifyInfo = JSON.parse(JSON.stringify(info));
      this.modifyVisible = true;
    },
    showDel(info) {
      console.log(info);
      // 删除需要确认对话框
      let app = this;
      // 删除部门会级联删除部门的员工信息！！！！！
      this.$confirm('是否删除：' + info.deptName + '?', '删除', {
        confirmButtonText: '删除',
        type: 'warning'
      }).then(function() {
        app.loading = true;
        app.$ajax(
          '/dept/delete',
          {
            'tbDept.deptId': info.deptId
          },
          function(data) {
            app.loading = false;
            app.$message({
              message: data.message,
              onClose: app.query
            });
          }
        );
      });
    },
    add() {
      this.loading = true;
      this.$ajax('/dept/add', { tbDept: this.addInfo }, function(data) {
        this.loading = false;
        if (data.success) {
          this.addInfo = {
            deptName: '',
            deptInfo: ''
          };
          this.$message({
            onClose: this.query,
            message: data.message
          });
          return;
        }
        this.$message.error(data.message);
      });
    },
    query() {
      this.loading = true;
      this.$ajax('/dept/query', { page: this.page }, function(data) {
        this.loading = false;
        if (!data.success) {
          this.$message.error(data.message);
          return;
        }
        this.page = data.resultData.page;
        this.list = data.resultData.list;
      });
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
}
.add-form {
  display: flex;
  justify-content: flex-end;
}
</style>
