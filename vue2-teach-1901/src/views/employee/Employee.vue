<template>
  <div>
    <div>员工信息管理</div>
    <!-- 查询的表单 -->
    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="queryInfo.deptId">
            <el-option label="===请选择===" value="-1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Employee',
  data() {
    return {
      page: {
        pageNumber: 1,
        pageSize: 5
      },
      // 查询过滤条件
      queryInfo: {
        deptId: -1,
        employeeName: '',
        phone: ''
      }
    };
  }
};
</script>
