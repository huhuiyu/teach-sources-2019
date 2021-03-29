<template>
  <!-- 
    作业：完成班级和学生管理功能，学生所在班级要求显示成名称
  -->
  <div v-loading="loading">
    <div>员工信息管理</div>
    <!-- 查询的表单 -->
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="queryInfo.deptId">
            <el-option label="===请选择===" :value="-1"></el-option>
            <el-option v-for="d in deptList" :key="d.deptId" :value="d.deptId" :label="d.deptName"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="queryInfo.employeeName" placeholder="员工姓名模糊查询"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="queryInfo.phone" placeholder="员工电话模糊查询"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="query">查询</el-button>
          <el-button @click="addVisible = true">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 修改的对话框 -->
    <div>
      <el-dialog title="修改员工信息" :close-on-click-modal="false" :visible.sync="modifyVisible" @closed="query">
        <div>
          <el-form>
            修改信息表单
          </el-form>
        </div>
      </el-dialog>
    </div>

    <!-- 添加的对话框 -->
    <div>
      <el-dialog title="添加员工信息" :close-on-click-modal="false" :visible.sync="addVisible" @closed="query">
        <el-form>
          <el-form-item>
            <el-select v-model="addInfo.deptId">
              <el-option label="===请选择===" :value="-1"></el-option>
              <el-option v-for="d in deptList" :key="d.deptId" :value="d.deptId" :label="d.deptName" :title="d.deptInfo"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input v-model="addInfo.employeeName" placeholder="员工姓名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-input v-model="addInfo.phone" placeholder="员工电话"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="addVisible = false">关闭</el-button>
            <el-button @click="add">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <!-- 查询结果和分页信息 -->
    <div>
      <el-table :data="list">
        <el-table-column label="部门">
          <template slot-scope="scope">
            {{ showDeptName(scope.row.deptId) }}
          </template>
        </el-table-column>

        <el-table-column label="部门过滤器模式">
          <template slot-scope="scope">
            {{ scope.row.deptId }}
            -
            {{ scope.row.deptId | deptName(deptList) }}
          </template>
        </el-table-column>

        <el-table-column label="姓名" prop="employeeName"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>

        <el-table-column label="信息最后更新时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate }}
          </template>
        </el-table-column>

        <el-table-column>
          <template slot-scope="scope">
            <el-button type="danger" @click="del(scope.row)">删除</el-button>
            <el-button type="success" @click="showModify(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <nav>
        <el-pagination :page-size.sync="page.pageSize" :total="page.total" :current-page.sync="page.pageNumber" @current-change="query"></el-pagination>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Employee',
  data() {
    return {
      // 控制加载页面
      loading: false,
      // 分页
      page: {
        pageNumber: 1,
        pageSize: 5
      },
      // 查询过滤条件
      queryInfo: {
        deptId: -1,
        employeeName: '',
        phone: ''
      },
      // 查询结果
      deptList: [],
      list: [],
      // 修改相关
      modifyInfo: {},
      modifyVisible: false,
      // 添加相关
      addInfo: { deptId: -1 },
      addVisible: false
    };
  },
  methods: {
    // 添加员工
    add() {
      // 加载页面
      this.loading = true;
      // ajax请求后端添加数据
      this.$ajax(
        '/employee/add',
        {
          // 添加的数据
          tbEmployee: this.addInfo
        },
        // ajax请求回来的处理
        function(data) {
          // 关闭加载效果
          this.loading = false;
          // 返回结果为成功的情况
          if (data.success) {
            // 重置添加信息
            this.addInfo = { deptId: -1 };
            // 显示服务器端消息
            this.$message(data.message);
            return;
          }
          // 失败的消息显示
          this.$message.error(data.message);
        }
      );
    },
    del(info) {
      console.log(info);
      let app = this;
      app
        .$confirm('是否删除员工：' + info.employeeName, '删除员工', { type: 'warning' })
        .then(function() {
          app.loading = true;
          app.$ajax(
            '/employee/delete',
            {
              'tbEmployee.employeeId': info.employeeId
            },
            function(data) {
              app.loading = false;
              app.$message({
                message: data.message,
                onClose: app.query
              });
            }
          );
        })
        .catch(function() {});
    },
    showModify(info) {
      console.log(info);
      this.modifyVisible = true;
    },
    modify() {},
    showDeptName(deptId) {
      for (let i = 0; i < this.deptList.length; i++) {
        let dept = this.deptList[i];
        if (deptId == dept.deptId) {
          return dept.deptName;
        }
      }
      return deptId;
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
  // created方法是vue对象创建完毕后自动执行的方法
  created() {
    this.query();
  }
};
</script>
