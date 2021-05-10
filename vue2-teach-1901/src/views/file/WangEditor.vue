<template>
  <div>
    <div>{{ title }}</div>
    <!-- 富文本编辑器区域 -->
    <div class="wang-editor-container">
      <div></div>
    </div>
    <!-- 值显示 -->
    <textarea rows="5" cols="80" v-model="data" readonly></textarea>
  </div>
</template>
<script>
import wangEditor from 'wangeditor';
let app;

export default {
  name: 'WangEditor',
  data() {
    return {
      title: 'WangEditor富文本编辑器演示',
      editor: null,
      data: ''
    };
  },
  created() {
    app = this;
  },
  beforeDestroy() {
    if (app.editor) {
      app.editor.destroy();
      app.editor = null;
    }
  },
  mounted() {
    let editor = new wangEditor('.wang-editor-container > div');
    editor.config.onchange = function(data) {
      app.data = data;
    };
    editor.config.excludeMenus = ['video', 'table'];
    editor.create();
    app.editor = editor;
  }
};
</script>
<style scoped>
.wang-editor-container {
  padding: 1.5rem;
}
</style>
