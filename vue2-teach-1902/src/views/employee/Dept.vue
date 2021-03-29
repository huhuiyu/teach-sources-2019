<template>
  <div>
    <div class="text-center pd10">部门信息管理</div>
    <!-- 添加的表单 -->
    <div class="add-form" v-loading="addLoading">
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
      // 修改表单是否呈现的控制变量
      modifyVisible: false,
      // 要修改的部门信息对象
      modifyInfo: {},
      // 分页查询参数信息
      page: {
        // 当前页码
        pageNumber: 1,
        // 分页大小
        pageSize: 5
      },
      // 部门列表
      list: [],
      // 查询加载控制变量
      loading: false,
      // 添加信息加载控制变量
      addLoading: false,
      // 部门添加信息对象
      addInfo: {
        deptName: '',
        deptInfo: ''
      },
      // 删除部门信息对象
      delInfo: {}
    };
  },
  methods: {
    // 修改部门信息功能
    modify() {
      // 进入加载模式
      this.loading = true;
      // 发起ajax请求，接口信息请查阅后端api文档
      this.$ajax(
        '/dept/update',
        {
          // 修改需要传递部门信息
          tbDept: this.modifyInfo
        },
        function(data) {
          // ajax应答回来的结果
          // 退出加载模式
          this.loading = false;
          // 对话框显示服务器应答消息
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
    // 添加部门的功能
    add() {
      // 进入添加的加载模式
      this.addLoading = true;
      // 发起添加的ajax请求
      this.$ajax('/dept/add', { tbDept: this.addInfo }, function(data) {
        // 退出添加的加载模式
        this.addLoading = false;
        // 添加成功的情况
        if (data.success) {
          // 清空用户填写的部门信息
          this.addInfo = {
            deptName: '',
            deptInfo: ''
          };
          // 显示成功的信息，关闭后启动查询更新页面数据
          this.$message({
            onClose: this.query,
            message: data.message
          });
          return;
        }
        // 失败就显示错误信息
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
