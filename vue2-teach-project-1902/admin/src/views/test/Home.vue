<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <i class="iconfont">&#xe684;</i>
    </div>
    <div>
      <el-input v-model="echo"></el-input>
      <el-button @click="ajaxTest">发送</el-button>
      <div>{{ result }}</div>
      <div v-if="result.resultData">
        {{ result.resultData.time | formatDate }}
      </div>
    </div>
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
      this.$ajax(
        '/',
        {
          echo: this.$md5(this.echo)
        },
        function(data) {
          this.result = data;
        }
      );
    }
  }
};
</script>
