<template>
  <div v-loading="loading">
    <div>
      <el-select v-model="pid" @change="queryCity">
        <el-option v-for="p in plist" :key="p.pid" :label="p.province" :value="p.pid"></el-option>
      </el-select>

      <el-select v-model="cid">
        <el-option v-for="c in clist" :key="c.cid" :label="c.city" :value="c.cid"></el-option>
      </el-select>

      {{ pid | province(plist) }}-{{ cid | city(clist) }}
    </div>

    <div>
      <el-select v-model="deptId" @change="queryEmp">
        <el-option v-for="d in deptList" :key="d.deptId" :label="d.deptName" :value="d.deptId"></el-option>
      </el-select>

      <el-table :data="empList">
        <el-table-column label="部门编号">
          <template slot-scope="scope">
            {{ scope.row.deptId | deptName(deptList) }}
          </template>
        </el-table-column>
        <el-table-column label="员工编号" prop="employeeId"></el-table-column>
        <el-table-column label="姓名" prop="employeeName"></el-table-column>
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
  name: 'Links',
  data() {
    return {
      loading: false,
      // 省份列表
      plist: [],
      // 省份选中值
      pid: -1,
      // 城市列表
      clist: [],
      // 城市选中值
      cid: -1,
      deptList: [],
      deptId: -1,
      empList: [],
      employeeId: -1
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
        // 默认选中项
        this.pid = this.plist[this.plist.length / 2].pid;
        this.queryCity();
      });
    }
  },
  created() {
    this.queryProvince();
    this.queryDept();
  }
};
</script>
