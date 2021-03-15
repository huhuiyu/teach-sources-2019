<template>
  <div v-loading="loading">
    <div>饿了么组件测试</div>
    <div>
      <el-button type="primary" @click="testLoading">按钮一</el-button>
      <el-button @click="testDialog">按钮二</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TestElementUI',
  data() {
    return {
      loading: false
    };
  },
  methods: {
    testDialog() {
      this.$message({
        message: '饿了么对话框',
        type: 'error',
        showClose: true
      });
    },
    testLoading() {
      this.loading = true;
      let app = this;
      setTimeout(function() {
        app.loading = false;
      }, 2000);
    }
  }
};
</script>
