<template>
  <div>
    <div> {{ title }} <i class="iconfont">&#xe684;</i> </div>
    <div>
      <el-input v-model="echo"></el-input>
      <el-button @click="ajaxTest">ajax测试</el-button>
    </div>
    <div>{{ result }}</div>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data() {
    return {
      title: '测试页',
      echo: '',
      result: {}
    };
  },
  methods: {
    ajaxTest() {
      this.$ajax('/', { echo: this.echo }, function(data) {
        this.result = data;
      });
    }
  }
};
</script>
