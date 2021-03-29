<template>
  <!-- 
    作业，完成班级和学生信息管理功能
    学生所在班级需要显示成班级名称
  -->
  <div v-loading="loading">
    <div>员工管理</div>
    <!-- 查询表单 -->
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="queryInfo.deptId">
            <el-option label="===请选择部门===" :value="-1"></el-option>
            <el-option v-for="d in deptList" :key="d.deptId" :value="d.deptId" :label="d.deptName"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="queryInfo.employeeName" placeholder="员工姓名模糊查询"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="queryInfo.phone" placeholder="电话模糊查询"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="query">查询</el-button>
          <el-button @click="addVisible = true">添加员工</el-button>
        </el-form-item>
        <!-- {{ queryInfo.deptId }} -->
      </el-form>
    </div>

    <!-- 添加的表单对话框 -->
    <div>
      <el-dialog title="添加员工" @closed="query" :visible.sync="addVisible" :close-on-click-modal="false">
        <el-form>
          <el-form-item>
            <el-select v-model="addInfo.deptId">
              <el-option label="===请选择部门===" :value="-1"></el-option>
              <el-option v-for="d in deptList" :key="d.deptId" :value="d.deptId" :label="d.deptName"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input v-model="addInfo.employeeName" placeholder="员工姓名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="addInfo.phone" placeholder="电话"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="addVisible = false">关闭</el-button>
            <el-button @click="add">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 员工信息表格和分页 -->
    <div>
      <el-table :data="list">
        <el-table-column label="所属部门">
          <template slot-scope="scope">
            {{ scope.row.deptId }}
            -
            {{ showDeptName(scope.row.deptId) }}
          </template>
        </el-table-column>

        <el-table-column label="过滤器版本部门">
          <template slot-scope="scope">
            <!-- 给过滤器传入当前页面的部门列表给过滤器处理信息 -->
            {{ scope.row.deptId | showDeptName(deptList) }}
          </template>
        </el-table-column>

        <el-table-column label="姓名" prop="employeeName"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>

        <el-table-column label="最后修改时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate() }}
          </template>
        </el-table-column>

        <el-table-column>
          <template slot-scope="scope">
            <el-button type="danger" @click="del(scope.row)">删除</el-button>
            <el-button type="info" @click="showModify(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <nav class="page">
        <el-pagination :total="page.total" :page-size.sync="page.pageSize" :current-page.sync="page.pageNumber" @current-change="query"></el-pagination>
      </nav>
    </div>

    <!-- 修改对话框 -->
    <div>
      <el-dialog title="员工信息修改" :visible.sync="modifyVisible" :close-on-click-modal="false" @closed="query">
        <div>
          <el-form>
            <!-- element-ui-helper -->
            <el-form-item>
              <el-select v-model="modifyInfo.deptId">
                <el-option v-for="d in deptList" :key="d.deptId" :value="d.deptId" :label="d.deptName"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="modifyInfo.employeeName"></el-input>
            </el-form-item>

            <el-form-item>
              <el-input v-model="modifyInfo.phone"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button @click="modifyVisible = false">关闭</el-button>
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
  name: 'Employee',
  data() {
    return {
      modifyVisible: false,
      modifyInfo: {},
      addVisible: false,
      addInfo: {
        deptId: -1,
        employeeName: '',
        phone: ''
      },
      loading: false,
      page: {
        pageNumber: 1,
        pageSize: 5
      },
      queryInfo: {
        deptId: -1,
        employeeName: '',
        phone: ''
      },
      deptList: [],
      list: []
    };
  },
  methods: {
    //通过方法完成部门编号到部门名称的显示
    showDeptName(deptId) {
      for (let i = 0; i < this.deptList.length; i++) {
        let dept = this.deptList[i];
        if (dept.deptId == deptId) {
          return dept.deptName;
        }
      }
      return '查无部门';
    },
    del(info) {
      console.log(info);
      let app = this;
      this.$confirm('是否删除员工：' + info.employeeName, '员工删除', { type: 'warning' })
        .then(function() {
          app.$ajax(
            '/employee/delete',
            {
              'tbEmployee.employeeId': info.employeeId
            },
            function(data) {
              app.$message(data.message);
            }
          );
        })
        .catch(function() {});
    },
    showModify(info) {
      console.log(info);
      this.modifyInfo = JSON.parse(JSON.stringify(info));
      this.modifyVisible = true;
    },
    modify() {
      this.loading = true;
      this.$ajax(
        '/employee/update',
        {
          tbEmployee: this.modifyInfo
        },
        function(data) {
          this.loading = false;
          this.$message(data.message);
        }
      );
    },
    add() {
      this.loading = true;
      this.$ajax(
        '/employee/add',
        {
          tbEmployee: this.addInfo
        },
        function(data) {
          this.loading = false;
          this.$message(data.message);
        }
      );
    },
    query() {
      this.loading = true;
      this.$ajax(
        '/employee/queryAll',
        {
          page: this.page,
          tbEmployee: this.queryInfo
        },
        function(data) {
          this.loading = false;
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.page = data.resultData.page;
          this.deptList = data.resultData.deptList;
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
.page {
  display: flex;
  justify-content: center;
}
</style>
