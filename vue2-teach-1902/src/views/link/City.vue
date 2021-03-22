<template>
  <div v-loading="loading">
    <!--  
      作业：完成两种模式（两个select和select+table）的班级学生数据联动
    -->
    <div>省份城市联动</div>
    <div>
      <el-select v-model="pid" @change="queryCity">
        <el-option v-for="p in plist" :key="p.pid" :label="p.province" :value="p.pid"></el-option>
      </el-select>

      <el-select v-model="cid">
        <el-option v-for="c in clist" :key="c.cid" :label="c.city" :value="c.cid"></el-option>
      </el-select>
      <hr />

      <el-select v-model="deptId" @change="queryEmp">
        <el-option v-for="d in deptList" :key="d.deptId" :label="d.deptName" :value="d.deptId"></el-option>
      </el-select>

      <el-table :data="empList" stripe>
        <el-table-column label="部门编号" prop="deptId"></el-table-column>
        <el-table-column label="员工编号" prop="employeeId"></el-table-column>
        <el-table-column label="员工姓名" prop="employeeName"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="信息最后修改时间">
          <template slot-scope="scope">
            {{ scope.row.lastupdate | formatDate }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LinkCity',
  data() {
    return {
      loading: false,
      // 省份城市的数据
      plist: [],
      pid: -1,
      clist: [],
      cid: -1,
      // 部门员工的数据
      deptList: [],
      deptId: -1,
      empList: []
    };
  },
  methods: {
    queryEmp() {
      this.loading = true;
      this.$ajax(
        '/linkinfo/queryEmployeeByDept',
        {
          'tbEmployee.deptId': this.deptId
        },
        function(data) {
          this.loading = false;
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.empList = data.resultData.list;
        }
      );
    },
    queryDept() {
      this.loading = true;
      this.$ajax('/linkinfo/queryAllDept', {}, function(data) {
        this.loading = false;
        if (!data.success) {
          this.$message.error(data.message);
          return;
        }
        this.deptList = data.resultData.list;
        this.deptId = this.deptList[0].deptId;
        this.queryEmp();
      });
    },
    queryProvince() {
      this.loading = true;
      this.$ajax('/linkinfo/queryAllProvince', {}, function(data) {
        this.loading = false;
        if (!data.success) {
          this.$message.error(data.message);
          return;
        }
        this.plist = data.resultData.list;
        // 默认选中中间值
        this.pid = this.plist[this.plist.length / 2].pid;
        this.queryCity();
      });
    },
    queryCity() {
      this.loading = true;
      this.$ajax(
        '/linkinfo/queryCityByProvince',
        {
          'tbCity.pid': this.pid
        },
        function(data) {
          this.loading = false;
          if (!data.success) {
            this.$message.error(data.message);
            return;
          }
          this.clist = data.resultData.list;
          this.cid = this.clist[0].cid;
        }
      );
    }
  },
  created() {
    this.queryProvince();
    this.queryDept();
  }
};
</script>
