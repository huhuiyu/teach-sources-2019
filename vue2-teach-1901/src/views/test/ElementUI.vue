<template>
  <div>
    <div v-loading="loading">
      <div>测试饿了么ui框架</div>
      <div>
        <el-button @click="showMessage">默认按钮</el-button>
        <el-button type="danger" @click="loadInfo">样式按钮</el-button>
      </div>
    </div>

    <h1>ajax和饿了么ui</h1>
    <div>
      
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
    loadInfo() {
      let app = this;
      // 通过延迟执行模拟远程加载数据的效果
      app.loading = true;
      setTimeout(function() {
        app.loading = false;
      }, 2000);
    },
    showMessage() {
      this.$message('弹出式消息！');
    }
  }
};
</script>
