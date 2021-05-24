<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <el-button @click="fileVisible = true">
        浏览文件
      </el-button>
      {{ file }}
    </div>
    <div>
      <el-dialog top="1rem" :close-on-click-modal="false" :visible.sync="fileVisible" title="文件选择对话框">
        <div>
          <file-choose @file-selected="fileSelected"></file-choose>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import FileChoose from '../../componets/FileChoose';
export default {
  name: 'TestFileSelector',
  components: { FileChoose },
  data() {
    return {
      title: '文件选择组件测试',
      fileVisible: false,
      file: {}
    };
  },
  methods: {
    fileSelected(file) {
      this.file = file;
      this.fileVisible = false;
    }
  }
};
</script>
