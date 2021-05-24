<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <el-button @click="chooseVisible = true">浏览文件...</el-button>
      {{ selectedFile }}
    </div>
    <el-dialog top="1rem" title="文件选择" :visible.sync="chooseVisible" :close-on-click-modal="false">
      <file-choose @file-selected="fileSelected"></file-choose>
    </el-dialog>
  </div>
</template>
<script>
import FileChoose from '../../components/FileChoose';
export default {
  name: 'TestFileSelector',
  components: { FileChoose },
  data() {
    return {
      title: '文件选择器测试页',
      selectedFile: {},
      chooseVisible: false
    };
  },
  methods: {
    fileSelected(file) {
      this.selectedFile = file;
      this.chooseVisible = false;
    }
  }
};
</script>
